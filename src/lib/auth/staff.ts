import 'server-only';

/**
 * Staff allowlist — the ONLY gate deciding who may enter /admin.
 *
 * Source of truth is the server-only env var STAFF_EMAILS (comma-separated).
 * Kept out of the database on purpose for now: a tiny hotel team, and an env
 * allowlist is impossible to escalate from the app surface (no self-signup can
 * grant access). Authentication (magic link) proves *who* you are; this proves
 * you're *allowed*. Both are required.
 *
 * Secure default: empty/unset → nobody is staff (deny-all).
 */
export function staffEmails(): string[] {
  return (process.env.STAFF_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isStaffEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return staffEmails().includes(email.toLowerCase());
}
