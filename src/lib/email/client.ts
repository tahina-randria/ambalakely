import { Resend } from 'resend';

/**
 * Resend client singleton. Returns null when RESEND_API_KEY is absent so
 * the API routes can degrade gracefully (return 503) instead of crashing.
 *
 * In dev without a verified domain, set:
 *   RESEND_FROM_EMAIL="Hôtel Ambalakely <onboarding@resend.dev>"
 * In prod with hotelambalakely.com verified in Resend:
 *   RESEND_FROM_EMAIL="Hôtel Ambalakely <hello@hotelambalakely.com>"
 */

let cached: Resend | null = null;

export function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!cached) cached = new Resend(key);
  return cached;
}

export const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? 'Hôtel Ambalakely <onboarding@resend.dev>';

export const HOTEL_INBOX = 'hello@hotelambalakely.com';

export const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID ?? null;
