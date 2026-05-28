import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { FROM_EMAIL, HOTEL_REPLY_TO, getResend } from '@/lib/email/client';
import {
  NewsletterWelcome,
  NEWSLETTER_SUBJECT,
} from '@/lib/email/templates/NewsletterWelcome';

export const runtime = 'nodejs';

const NewsletterSchema = z.object({
  email: z.email().max(200),
  company: z.string().max(0).optional(),
  locale: z.enum(['fr', 'en', 'no']).optional().default('fr'),
});

type Locale = 'fr' | 'en' | 'no';

/** Error strings per locale — see booking-request/route.ts for the
 * §38 rationale. Strings localized so /en + /no visitors see errors
 * in their own language instead of FR fallback. */
const ERRORS: Record<Locale, {
  rateLimit: string;
  validation: string;
  serviceUnavailable: string;
  signupFailed: string;
  internal: string;
}> = {
  fr: {
    rateLimit: 'Trop de requêtes.',
    validation: 'Email invalide.',
    serviceUnavailable: 'Service email non configuré.',
    signupFailed: 'Inscription impossible.',
    internal: 'Erreur interne.',
  },
  en: {
    rateLimit: 'Too many requests.',
    validation: 'Invalid email.',
    serviceUnavailable: 'Email service not configured.',
    signupFailed: 'Sign-up failed.',
    internal: 'Internal error.',
  },
  no: {
    rateLimit: 'For mange forespørsler.',
    validation: 'Ugyldig e-postadresse.',
    serviceUnavailable: 'E-posttjeneste ikke konfigurert.',
    signupFailed: 'Påmelding mislyktes.',
    internal: 'Intern feil.',
  },
};

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

  const parsed = NewsletterSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: E.validation }, { status: 400 });
  }

  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const email = parsed.data.email.toLowerCase().trim();
  const visitorLocale = parsed.data.locale;

  const resend = getResend();
  if (!resend) {
    console.error('[newsletter] RESEND_API_KEY not configured');
    return NextResponse.json({ error: E.serviceUnavailable }, { status: 503 });
  }

  try {
    const contact = await resend.contacts.create({
      email,
      unsubscribed: false,
    });

    const alreadyExists =
      contact.error?.name === 'validation_error' &&
      /already exists/i.test(contact.error?.message ?? '');

    if (contact.error && !alreadyExists) {
      console.error('[newsletter] Resend contact error:', contact.error);
      return NextResponse.json({ error: E.signupFailed }, { status: 502 });
    }

    if (!alreadyExists) {
      const welcome = await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        replyTo: HOTEL_REPLY_TO,
        subject: NEWSLETTER_SUBJECT[visitorLocale],
        react: NewsletterWelcome({ locale: visitorLocale }),
      });
      if (welcome.error) {
        console.error('[newsletter] Welcome email error:', welcome.error);
      }
    }

    return NextResponse.json({ ok: true, alreadyExists });
  } catch (err) {
    console.error('[newsletter] Unexpected error:', err);
    return NextResponse.json({ error: E.internal }, { status: 500 });
  }
}
