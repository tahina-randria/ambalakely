import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { FROM_EMAIL, HOTEL_INBOX, HOTEL_REPLY_TO, getResend } from '@/lib/email/client';
import { BookingRequest } from '@/lib/email/templates/BookingRequest';
import { BookingAck } from '@/lib/email/templates/BookingAck';

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
});

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

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Trop de requêtes. Veuillez réessayer plus tard.' },
      { status: 429 },
    );
  }

  const raw = await req.json().catch(() => null);
  const parsed = BookingSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Données invalides.', issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const data = parsed.data;

  if (data.company) {
    return NextResponse.json({ ok: true });
  }

  if (new Date(data.arrival) >= new Date(data.departure)) {
    return NextResponse.json(
      { error: 'La date de départ doit être après la date d\'arrivée.' },
      { status: 400 },
    );
  }

  const resend = getResend();
  if (!resend) {
    console.error('[booking] RESEND_API_KEY not configured');
    return NextResponse.json(
      { error: 'Service email non configuré.' },
      { status: 503 },
    );
  }

  const roomTypeLabels: Record<string, string> = {
    any: 'Indifférent',
    superieure: 'Supérieure',
    confort: 'Confort',
    standard: 'Standard',
  };

  const normalized = {
    arrival: data.arrival,
    departure: data.departure,
    guests: data.guests,
    roomType: data.roomType ? roomTypeLabels[data.roomType] : undefined,
    name: data.name,
    email: data.email,
    phone: data.phone || undefined,
    message: data.message || undefined,
  };

  try {
    const [notif, ack] = await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: HOTEL_INBOX,
        replyTo: normalized.email,
        subject: `Demande de réservation — ${normalized.name} · ${normalized.guests} pers.${normalized.roomType ? ` · ${normalized.roomType}` : ''}`,
        react: BookingRequest(normalized),
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: normalized.email,
        replyTo: HOTEL_REPLY_TO,
        subject: 'Votre demande à l\'Hôtel Ambalakely',
        react: BookingAck(normalized),
      }),
    ]);

    if (notif.error || ack.error) {
      console.error('[booking] Resend error:', notif.error ?? ack.error);
      return NextResponse.json(
        { error: 'L\'envoi du mail a échoué.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[booking] Unexpected error:', err);
    return NextResponse.json({ error: 'Erreur interne.' }, { status: 500 });
  }
}
