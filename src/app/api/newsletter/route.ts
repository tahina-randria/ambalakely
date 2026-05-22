import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { AUDIENCE_ID, FROM_EMAIL, getResend } from '@/lib/email/client';
import { NewsletterWelcome } from '@/lib/email/templates/NewsletterWelcome';

export const runtime = 'nodejs';

const NewsletterSchema = z.object({
  email: z.email().max(200),
  company: z.string().max(0).optional(),
});

const ratelimit = new Map<string, number[]>();
const RATE_LIMIT = 10;
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
      { error: 'Trop de requêtes.' },
      { status: 429 },
    );
  }

  const raw = await req.json().catch(() => null);
  const parsed = NewsletterSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Email invalide.' }, { status: 400 });
  }

  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const email = parsed.data.email.toLowerCase().trim();

  const resend = getResend();
  if (!resend) {
    console.error('[newsletter] RESEND_API_KEY not configured');
    return NextResponse.json(
      { error: 'Service email non configuré.' },
      { status: 503 },
    );
  }

  if (!AUDIENCE_ID) {
    console.error('[newsletter] RESEND_AUDIENCE_ID not configured');
    return NextResponse.json(
      { error: 'Audience non configurée.' },
      { status: 503 },
    );
  }

  try {
    const contact = await resend.contacts.create({
      email,
      audienceId: AUDIENCE_ID,
      unsubscribed: false,
    });

    const alreadyExists =
      contact.error?.name === 'validation_error' &&
      /already exists/i.test(contact.error?.message ?? '');

    if (contact.error && !alreadyExists) {
      console.error('[newsletter] Resend contact error:', contact.error);
      return NextResponse.json(
        { error: 'Inscription impossible.' },
        { status: 502 },
      );
    }

    if (!alreadyExists) {
      const welcome = await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: 'Bienvenue dans la lettre saisonnière d\'Ambalakely',
        react: NewsletterWelcome(),
      });
      if (welcome.error) {
        console.error('[newsletter] Welcome email error:', welcome.error);
      }
    }

    return NextResponse.json({ ok: true, alreadyExists });
  } catch (err) {
    console.error('[newsletter] Unexpected error:', err);
    return NextResponse.json({ error: 'Erreur interne.' }, { status: 500 });
  }
}
