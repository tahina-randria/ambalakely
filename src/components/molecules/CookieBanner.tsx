'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { X } from '@phosphor-icons/react/dist/ssr';
import { useConsent } from '@/lib/consent';
import { cn } from '@/lib/utils/cn';

/**
 * GDPR cookie banner. Renders only when the user has not made a choice
 * yet. Two main actions ("Tout accepter" / "Refuser") plus a
 * "Personnaliser" toggle for per-category controls.
 *
 * Footer-fixed, slim, non-blocking. Sand-12 surface on the dark site,
 * sand-1 typography. French copy per HANDOFF rule 13.
 */
export function CookieBanner() {
  const t = useTranslations('Cookie');
  const { hasChosen, accept, refuse } = useConsent();
  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [errorTracking, setErrorTracking] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || hasChosen) return null;

  const onSave = () => accept({ analytics, errorTracking });

  return (
    <div
      role="dialog"
      aria-label={t('manage')}
      className="fixed inset-x-0 bottom-0 z-[150] pointer-events-none"
    >
      <div className="mx-auto max-w-[680px] px-3 pb-3 md:px-4 md:pb-6 pointer-events-auto">
        <div className="bg-[var(--color-sand-12)] text-[var(--color-sand-1)] border border-[var(--color-sand-10)] shadow-2xl">
          <div className="px-4 md:px-7 py-3.5 md:py-6">
            {/* Header — title + close. Title hidden on mobile when not expanded to save space. */}
            <div className={cn('flex items-start justify-between gap-3', expanded ? 'mb-3' : 'mb-0 md:mb-0')}>
              <div className={cn(
                'font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-sand-7)]',
                expanded ? 'block' : 'hidden md:block',
              )}>
                {t('title')}
              </div>
              <button
                type="button"
                onClick={refuse}
                aria-label={t('closeAria')}
                className="ml-auto -mr-1 p-1 text-[var(--color-sand-7)] hover:text-[var(--color-sand-1)] transition-colors duration-[var(--duration-fast)]"
              >
                <X size={16} weight="regular" />
              </button>
            </div>

            {/* Body — shorter line height + smaller on mobile */}
            <p className="mt-1 md:mt-3 text-[13px] md:text-[14px] leading-[1.5] md:leading-[1.55] text-[var(--color-sand-3)] max-w-[520px]">
              {t('body')}
            </p>

            {expanded ? (
              <fieldset className="mt-4 md:mt-5 flex flex-col gap-3 border-t border-[var(--color-sand-10)] pt-4 md:pt-5">
                <legend className="sr-only">{t('categoriesLegend')}</legend>
                <CategoryRow
                  id="cookie-analytics"
                  label={t('categoryAnalytics')}
                  description={t('categoryAnalyticsDesc')}
                  checked={analytics}
                  onChange={setAnalytics}
                />
                <CategoryRow
                  id="cookie-errors"
                  label={t('categoryErrors')}
                  description={t('categoryErrorsDesc')}
                  checked={errorTracking}
                  onChange={setErrorTracking}
                />
              </fieldset>
            ) : null}

            {/* Actions — buttons full-width on mobile to fit, inline on desktop */}
            <div className="mt-3.5 md:mt-5 flex flex-wrap items-center gap-2 md:gap-3">
              <button
                type="button"
                onClick={() => accept()}
                className="h-9 md:h-10 px-4 md:px-5 bg-[var(--color-sand-1)] text-[var(--color-sand-12)] font-body text-[13px] md:text-[14px] font-medium transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:bg-[var(--color-sand-3)]"
              >
                {t('acceptAll')}
              </button>
              <button
                type="button"
                onClick={refuse}
                className="h-9 md:h-10 px-4 md:px-5 border border-[var(--color-sand-7)] text-[var(--color-sand-1)] font-body text-[13px] md:text-[14px] font-medium transition-[color,border-color] duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:border-[var(--color-sand-1)]"
              >
                {t('refuse')}
              </button>
              {expanded ? (
                <button
                  type="button"
                  onClick={onSave}
                  className="h-9 md:h-10 px-3 md:px-5 text-[var(--color-sand-1)] font-body text-[13px] md:text-[14px] font-medium underline-offset-4 hover:underline transition-colors duration-[var(--duration-base)]"
                >
                  {t('save')}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setExpanded(true)}
                  className={cn(
                    'h-9 md:h-10 px-1 md:px-2 text-[var(--color-sand-5)] font-body text-[13px] md:text-[14px]',
                    'underline-offset-4 hover:underline hover:text-[var(--color-sand-1)]',
                    'transition-colors duration-[var(--duration-base)]',
                  )}
                >
                  {t('customize')}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryRow({
  id,
  label,
  description,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <label htmlFor={id} className="flex items-start gap-3 cursor-pointer">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 accent-[var(--color-sand-1)]"
      />
      <span className="flex flex-col gap-0.5">
        <span className="text-[14px] font-medium text-[var(--color-sand-1)]">
          {label}
        </span>
        <span className="text-[13px] leading-[1.5] text-[var(--color-sand-5)]">
          {description}
        </span>
      </span>
    </label>
  );
}
