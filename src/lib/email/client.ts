import { Resend } from 'resend';

/**
 * Resend client singleton. Returns null when RESEND_API_KEY is absent so
 * the API routes can degrade gracefully (return 503) instead of crashing.
 *
 * Sending domain: Resend's free tier limits one custom domain per account
 * and mita-studio.com is already taken by the parent studio, so we send
 * from an alias on that verified domain and use HOTEL_REPLY_TO so guests
 * still reach hello@hotelambalakely.com when they hit Reply. Migration
 * to a real hotelambalakely.com sender = swap RESEND_FROM_EMAIL when the
 * upgrade lands.
 *
 * Example:
 *   RESEND_FROM_EMAIL="Hôtel Ambalakely <ambalakely@mita-studio.com>"
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

export const HOTEL_REPLY_TO = 'hello@hotelambalakely.com';
