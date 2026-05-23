'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { routing, type AppLocale } from '@/i18n/routing';
import { cn } from '@/lib/utils/cn';

const labels: Record<AppLocale, string> = {
  fr: 'FR',
  en: 'EN',
  no: 'NO',
};

/**
 * Minimal inline locale switcher — FR · EN · NO trio.
 * Preserves the current pathname when switching (next-intl Link).
 */
export function LanguageSwitcher({ scrolled }: { scrolled: boolean }) {
  const current = useLocale() as AppLocale;
  const pathname = usePathname();
  return (
    <ul className="hidden sm:flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em]">
      {routing.locales.map((loc, i) => (
        <li key={loc} className="flex items-center">
          {i > 0 ? (
            <span
              aria-hidden
              className={cn(
                'mx-2 opacity-40',
                scrolled ? 'text-[var(--color-text-muted)]' : 'text-white/70',
              )}
            >
              ·
            </span>
          ) : null}
          {loc === current ? (
            <span
              aria-current="true"
              className={cn(
                'opacity-100',
                scrolled ? 'text-[var(--color-text)]' : 'text-white',
              )}
            >
              {labels[loc]}
            </span>
          ) : (
            <Link
              href={pathname}
              locale={loc}
              aria-label={`Switch to ${labels[loc]}`}
              className={cn(
                'opacity-60 hover:opacity-100 transition-opacity duration-[var(--duration-fast)]',
                scrolled ? 'text-[var(--color-text)]' : 'text-white',
              )}
            >
              {labels[loc]}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
