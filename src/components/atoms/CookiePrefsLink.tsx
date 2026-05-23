'use client';

import { useConsent } from '@/lib/consent';

/**
 * Footer link that re-opens the cookie banner so users can change
 * their consent choice. Calling `reset()` clears the stored choice
 * and the `CookieBanner` re-mounts on the next render.
 */
export function CookiePrefsLink() {
  const { reset } = useConsent();
  return (
    <button
      type="button"
      onClick={reset}
      className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--color-text-muted)] underline-offset-4 hover:text-[var(--color-text)] hover:underline transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)]"
    >
      Gérer les cookies
    </button>
  );
}
