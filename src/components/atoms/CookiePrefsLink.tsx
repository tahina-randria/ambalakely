'use client';

import { useTranslations } from 'next-intl';
import { useConsent } from '@/lib/consent';

/**
 * Footer link that re-opens the cookie banner so users can change
 * their consent choice. Calling `reset()` clears the stored choice
 * and the `CookieBanner` re-mounts on the next render.
 */
export function CookiePrefsLink() {
  const { reset } = useConsent();
  const t = useTranslations('Footer');
  return (
    <button
      type="button"
      onClick={reset}
      className="font-display italic font-light text-[15px] tracking-[0] text-[var(--color-sand-3)] underline-offset-4 hover:text-[var(--color-sand-1)] hover:underline transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)]"
    >
      {t('cookiesManage')}
    </button>
  );
}
