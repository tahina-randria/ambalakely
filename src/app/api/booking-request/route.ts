import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { FROM_EMAIL, HOTEL_INBOX, HOTEL_REPLY_TO, getResend } from '@/lib/email/client';
import { BookingRequest } from '@/lib/email/templates/BookingRequest';
import { BookingAck, BOOKING_ACK_SUBJECT } from '@/lib/email/templates/BookingAck';

export const runtime = 'nodejs';

const BookingSchema = z.object({
  arrival: z.iso.date(),
  departure: z.iso.date(),
  guests: z.coerce.number().int().min(1).max(20),
  roomType: z.enum(['any', 'superieure', 'confort', 'standard']).optional(),
  name: z.string().trim().min(2).max(100),
  email: z.email().max(200),
  phone: z.string().trim().max(50).optional().or(z.literal('')),
  message: z.string().trim().max(2000).optional().or(z.literal('')),
  company: z.string().max(0).optional(),
  locale: z.enum(['fr', 'en', 'no']).optional().default('fr'),
});

type Locale = 'fr' | 'en' | 'no';

/** Error strings per locale. Returned in JSON body so the client can
 * display them directly via `setErrorMsg(data.error)`. §38 i18n sweep —
 * before this, all errors were FR-only even on /en + /no, so a NO visitor
 * hitting a rate limit got a French message they couldn't read. */
const ERRORS: Record<Locale, {
  rateLimit: string;
  validation: string;
  dateRange: string;
  serviceUnavailable: string;
  sendFailed: string;
  internal: string;
}> = {
  fr: {
    rateLimit: 'Trop de requêtes. Veuillez réessayer plus tard.',
    validation: 'Données invalides.',
    dateRange: "La date de départ doit être après la date d'arrivée.",
    serviceUnavailable: 'Service email non configuré.',
    sendFailed: "L'envoi du mail a échoué.",
    internal: 'Erreur interne.',
  },
  en: {
    rateLimit: 'Too many requests. Please try again later.',
    validation: 'Invalid data.',
    dateRange: 'Check-out date must be after check-in date.',
    serviceUnavailable: 'Email service not configured.',
    sendFailed: 'Email delivery failed.',
    internal: 'Internal error.',
  },
  no: {
    rateLimit: 'For mange forespørsler. Prøv igjen senere.',
    validation: 'Ugyldige data.',
    dateRange: 'Avreisedato må være etter ankomstdato.',
    serviceUnavailable: 'E-posttjeneste ikke konfigurert.',
    sendFailed: 'E-postsending mislyktes.',
    internal: 'Intern feil.',
  },
};

/** Room-type labels per locale — used for both the staff notification
 * subject (always FR for hotel staff) and the visitor ack body via
 * `normalized.roomType`. "Indifférent" / "No preference" / "Ingen
 * preferanse" is the only one that genuinely translates ; the three
 * category names (Supérieure / Confort / Standard) are brand names. */
const ROOM_TYPE_LABELS: Record<Locale, Record<string, string>> = {
  fr: { any: 'Indifférent', superieure: 'Supérieure', confort: 'Confort', standard: 'Standard' },
  en: { any: 'No preference', superieure: 'Superior', confort: 'Comfort', standard: 'Standard' },
  no: { any: 'Ingen preferanse', superieure: 'Superior', confort: 'Komfort', standard: 'Standard' },
};
// Staff notification (hotel inbox) is always FR — the team works in French.
const ROOM_TYPE_LABELS_FR = ROOM_TYPE_LABELS.fr;

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

/** Best-effort locale extraction from a partially-parsed body. Used
 * before validation so rate-limit and parsing errors can be returned in
 * the visitor's language without trusting unvalidated input downstream. */
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

  const parsed = BookingSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: E.validation, issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const data = parsed.data;

  if (data.company) {
    return NextResponse.json({ ok: true });
  }

  if (new Date(data.arrival) >= new Date(data.departure)) {
    return NextResponse.json({ error: E.dateRange }, { status: 400 });
  }

  const resend = getResend();
  if (!resend) {
    console.error('[booking] RESEND_API_KEY not configured');
    return NextResponse.json({ error: E.serviceUnavailable }, { status: 503 });
  }

  const visitorRoomLabels = ROOM_TYPE_LABELS[data.locale];

  const normalized = {
    arrival: data.arrival,
    departure: data.departure,
    guests: data.guests,
    roomType: data.roomType ? visitorRoomLabels[data.roomType] : undefined,
    name: data.name,
    email: data.email,
    phone: data.phone || undefined,
    message: data.message || undefined,
  };

  // Staff notification keeps FR room-type label so the team always reads
  // the same wording, regardless of which locale the visitor used.
  const staffRoomType = data.roomType ? ROOM_TYPE_LABELS_FR[data.roomType] : undefined;

  try {
    const [notif, ack] = await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: HOTEL_INBOX,
        replyTo: normalized.email,
        subject: `Demande de réservation — ${normalized.name} · ${normalized.guests} pers.${staffRoomType ? ` · ${staffRoomType}` : ''}`,
        react: BookingRequest({ ...normalized, roomType: staffRoomType }),
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: normalized.email,
        replyTo: HOTEL_REPLY_TO,
        subject: BOOKING_ACK_SUBJECT[data.locale],
        react: BookingAck({ ...normalized, locale: data.locale }),
      }),
    ]);

    if (notif.error || ack.error) {
      console.error('[booking] Resend error:', notif.error ?? ack.error);
      return NextResponse.json({ error: E.sendFailed }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[booking] Unexpected error:', err);
    return NextResponse.json({ error: E.internal }, { status: 500 });
  }
}
