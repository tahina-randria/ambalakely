'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { CaretDown, Check, Globe } from '@phosphor-icons/react/dist/ssr';
import { Link, usePathname } from '@/i18n/navigation';
import { routing, type AppLocale } from '@/i18n/routing';
import { cn } from '@/lib/utils/cn';

const shortLabels: Record<AppLocale, string> = {
  fr: 'FR',
  en: 'EN',
  no: 'NO',
};

const fullLabels: Record<AppLocale, string> = {
  fr: 'Français',
  en: 'English',
  no: 'Norsk',
};

/**
 * Locale dropdown — globe icon + current short code + caret. Opens a
 * panel listing all locales by their native name. Mobbin pattern used by
 * Aman, Six Senses, etc. Replaces the older inline FR · EN · NO trio.
 *
 * Accessible : role=menu, aria-expanded, ESC closes, click outside closes.
 * Scrolled prop tints the trigger : light text on the hero image, dark
 * once the Nav has its solid background.
 */
export function LanguageSwitcher({ scrolled }: { scrolled: boolean }) {
  const current = useLocale() as AppLocale;
  const pathname = usePathname();
  const t = useTranslations('Nav');
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click + ESC
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="relative hidden sm:block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`${t('switchLanguage')} — ${fullLabels[current]}`}
        className={cn(
          'inline-flex items-center gap-1.5 px-2.5 py-1.5',
          'font-mono text-[11px] uppercase tracking-[0.08em]',
          'border border-transparent rounded-none',
          'transition-colors duration-[var(--duration-fast)]',
          scrolled
            ? 'text-[var(--color-text)] hover:bg-[var(--color-bg-subtle)]'
            : 'text-white hover:bg-white/10',
        )}
      >
        <Globe size={13} weight="regular" aria-hidden />
        <span className="tabular-nums">{shortLabels[current]}</span>
        <CaretDown
          size={10}
          weight="bold"
          aria-hidden
          className={cn(
            'transition-transform duration-[var(--duration-fast)]',
            open && 'rotate-180',
          )}
        />
      </button>

      {open ? (
        <div
          role="menu"
          aria-label={t('switchLanguage')}
          className={cn(
            'absolute right-0 top-full mt-2 min-w-[160px]',
            'bg-[var(--color-bg)] border border-[var(--color-border)]',
            'shadow-lg shadow-black/5',
          )}
        >
          <ul className="py-1.5">
            {routing.locales.map((loc) => {
              const isActive = loc === current;
              return (
                <li key={loc}>
                  {isActive ? (
                    <span
                      role="menuitemradio"
                      aria-checked
                      className="flex items-center justify-between gap-3 px-4 py-2 text-[13px] font-display tracking-[-0.005em] text-[var(--color-text)] bg-[var(--color-bg-subtle)]"
                    >
                      <span>{fullLabels[loc]}</span>
                      <Check size={13} weight="regular" aria-hidden />
                    </span>
                  ) : (
                    <Link
                      role="menuitemradio"
                      aria-checked={false}
                      href={pathname}
                      locale={loc}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between gap-3 px-4 py-2 text-[13px] font-display tracking-[-0.005em] text-[var(--color-text)] hover:bg-[var(--color-bg-subtle)] transition-colors duration-[var(--duration-fast)]"
                    >
                      <span>{fullLabels[loc]}</span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                        {shortLabels[loc]}
                      </span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
