import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { dbWrite } from '@/lib/db';
import { createReservation } from '@/lib/db/reservations';
import { FROM_EMAIL, HOTEL_INBOX, HOTEL_REPLY_TO, getResend } from '@/lib/email/client';
import { BookingRequest } from '@/lib/email/templates/BookingRequest';
import { BookingAck, BOOKING_ACK_SUBJECT } from '@/lib/email/templates/BookingAck';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// A real booking: a specific category is required (no "any") so the engine can
// hold inventory. Guest name split for the guest record. Honeypot = `company`.
const Schema = z.object({
  checkIn: z.iso.date(),
  checkOut: z.iso.date(),
  guests: z.coerce.number().int().min(1).max(20),
  roomType: z.enum(['superieure', 'confort', 'standard']),
  firstName: z.string().trim().min(1).max(60),
  lastName: z.string().trim().min(1).max(60),
  email: z.email().max(200),
  phone: z.string().trim().max(50).optional().or(z.literal('')),
  message: z.string().trim().max(2000).optional().or(z.literal('')),
  company: z.string().max(0).optional(),
  locale: z.enum(['fr', 'en', 'no']).optional().default('fr'),
});

type Locale = 'fr' | 'en' | 'no';

// Errors are returned in the visitor's language so the drawer can show them
// verbatim via setErrorMsg(data.error).
const ERRORS: Record<
  Locale,
  { rateLimit: string; validation: string; dateRange: string; soldOut: string; capacity: string; internal: string }
> = {
  fr: {
    rateLimit: 'Trop de requêtes. Veuillez réessayer plus tard.',
    validation: 'Données invalides.',
    dateRange: "La date de départ doit être après la date d'arrivée.",
    soldOut: 'Cette chambre vient d’être réservée pour ces dates. Merci de rafraîchir les disponibilités.',
    capacity: 'Trop de voyageurs pour cette catégorie de chambre.',
    internal: 'Une erreur est survenue. Réessayez ou écrivez-nous directement.',
  },
  en: {
    rateLimit: 'Too many requests. Please try again later.',
    validation: 'Invalid data.',
    dateRange: 'Check-out date must be after check-in date.',
    soldOut: 'This room was just booked for these dates. Please refresh availability.',
    capacity: 'Too many guests for this room category.',
    internal: 'Something went wrong. Try again or write to us directly.',
  },
  no: {
    rateLimit: 'For mange forespørsler. Prøv igjen senere.',
    validation: 'Ugyldige data.',
    dateRange: 'Avreisedato må være etter ankomstdato.',
    soldOut: 'Dette rommet ble nettopp booket for disse datoene. Oppdater tilgjengeligheten.',
    capacity: 'For mange gjester for denne romkategorien.',
    internal: 'Noe gikk galt. Prøv igjen eller skriv til oss direkte.',
  },
};

// Category names: brand names mostly, except the localized ones are only a
// nicety for the guest ack. Staff notification always reads FR.
const ROOM_LABELS: Record<Locale, Record<'superieure' | 'confort' | 'standard', string>> = {
  fr: { superieure: 'Supérieure', confort: 'Confort', standard: 'Standard' },
  en: { superieure: 'Superior', confort: 'Comfort', standard: 'Standard' },
  no: { superieure: 'Superior', confort: 'Komfort', standard: 'Standard' },
};

// Naive in-memory limiter — per instance, best-effort (same posture as
// /api/booking-request). Good enough to blunt accidental double-submits and
// casual abuse; a durable limiter is a later hardening.
const ratelimit = new Map<string, number[]>();
const RATE_LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000;
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const arr = (ratelimit.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  ratelimit.set(ip, arr);
  return arr.length <= RATE_LIMIT;
}

function extractLocale(raw: unknown): Locale {
  if (raw && typeof raw === 'object' && 'locale' in raw) {
    const v = (raw as { locale?: unknown }).locale;
    if (v === 'fr' || v === 'en' || v === 'no') return v;
  }
  return 'fr';
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  const raw = await req.json().catch(() => null);
  const locale = extractLocale(raw);
  const E = ERRORS[locale];

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: E.rateLimit }, { status: 429 });
  }

  const parsed = Schema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: E.validation, issues: parsed.error.issues }, { status: 400 });
  }
  const d = parsed.data;

  // Honeypot: a filled `company` means a bot — accept silently, create nothing.
  if (d.company) return NextResponse.json({ ok: true });

  if (new Date(d.checkIn) >= new Date(d.checkOut)) {
    return NextResponse.json({ error: E.dateRange }, { status: 400 });
  }

  // 1) Source of truth: create the pending reservation (48 h hold). The engine
  //    re-checks availability inside a serializable tx, so a race that would
  //    oversell the last room throws `indisponible` → 409.
  let reservation;
  try {
    reservation = await createReservation(dbWrite, {
      checkIn: d.checkIn,
      checkOut: d.checkOut,
      guest: {
        firstName: d.firstName,
        lastName: d.lastName,
        email: d.email,
        phone: d.phone || undefined,
      },
      rooms: [{ roomTypeSlug: d.roomType, adults: d.guests }],
      channel: 'direct',
      notes: d.message || undefined,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : '';
    if (msg.includes('indisponible')) {
      return NextResponse.json({ error: E.soldOut }, { status: 409 });
    }
    if (msg.includes('capacité')) {
      return NextResponse.json({ error: E.capacity }, { status: 400 });
    }
    console.error('[api/reservations] createReservation', err);
    return NextResponse.json({ error: E.internal }, { status: 500 });
  }

  // 2) Notify hotel + acknowledge guest. Best-effort: the hold already exists,
  //    so an email hiccup must not fail the booking.
  const resend = getResend();
  if (resend) {
    const normalized = {
      arrival: d.checkIn,
      departure: d.checkOut,
      guests: d.guests,
      name: `${d.firstName} ${d.lastName}`.trim(),
      email: d.email,
      phone: d.phone || undefined,
      message: d.message || undefined,
    };
    try {
      const [notif, ack] = await Promise.all([
        resend.emails.send({
          from: FROM_EMAIL,
          to: HOTEL_INBOX,
          replyTo: d.email,
          subject: `Réservation ${reservation.reference} — ${normalized.name} · ${d.guests} pers. · ${ROOM_LABELS.fr[d.roomType]}`,
          react: BookingRequest({ ...normalized, roomType: ROOM_LABELS.fr[d.roomType] }),
        }),
        resend.emails.send({
          from: FROM_EMAIL,
          to: d.email,
          replyTo: HOTEL_REPLY_TO,
          subject: BOOKING_ACK_SUBJECT[d.locale],
          react: BookingAck({ ...normalized, locale: d.locale, reference: reservation.reference }),
        }),
      ]);
      if (notif.error || ack.error) console.error('[api/reservations] email', notif.error ?? ack.error);
    } catch (err) {
      console.error('[api/reservations] email send failed', err);
    }
  } else {
    console.error('[api/reservations] RESEND_API_KEY missing — reservation created, no email sent');
  }

  return NextResponse.json({
    ok: true,
    reference: reservation.reference,
    status: reservation.status,
    holdHours: 48,
  });
}
