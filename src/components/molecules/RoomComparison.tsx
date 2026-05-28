'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Check, Minus, ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { FeatureIcon } from '@/components/atoms/FeatureIcon';
import { getComparison } from '@/lib/data/comparison';
import { getCategories } from '@/lib/data/categories';
import { formatMga } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';

/**
 * Quick-scan comparison grid. Same criteria across all 3 categories.
 *
 * Desktop (md+): hairline-ruled 3-column table — best for side-by-side scan.
 * Mobile (<md): tabs to flip between categories, single column of values.
 * Cramming 3 columns into 390px makes the text unreadable.
 *
 * Boolean true → checkmark · Boolean false → em-dash · String → typographic value
 *
 * §38 (2026-05-28) — passed at locale level. Before, `comparison` data
 * and the UI strings (Comparer / À partir de / Lire la suite / Inclus /
 * Non inclus / Ariary · par nuit) were hardcoded FR, leaking into /en
 * and /no. Now the data file exposes `getComparison(locale)` and the
 * UI strings come from the `RoomsPage` + `Common` namespaces.
 */
export function RoomComparison() {
  const locale = useLocale();
  const t = useTranslations('RoomsPage');
  const tCommon = useTranslations('Common');
  const categories = getCategories(locale);
  const comparison = getComparison(locale);

  const [activeSlug, setActiveSlug] = useState<typeof categories[number]['slug']>(
    categories[0].slug,
  );
  const slugs = ['superieure', 'confort', 'standard'] as const;
  const activeCategory = categories.find((c) => c.slug === activeSlug) ?? categories[0];

  const includedLabel = tCommon('included');
  const notIncludedLabel = tCommon('notIncluded');
  const readMoreLabel = tCommon('readMore');
  const fromLabel = tCommon('from');
  const priceUnit = t('priceUnit');
  const compareAria = t('compareAria');
  const compareKicker = t('compareKicker');

  return (
    <div className="w-full">
      {/* ════════════════════════════════════════════════════════════
          MOBILE — tabs + single-column values
      ════════════════════════════════════════════════════════════ */}
      <div className="md:hidden">
        {/* Tabs */}
        <div className="sticky top-[72px] z-10 bg-[var(--color-bg)]/95 backdrop-blur-[8px] border-b border-[var(--color-border-subtle)]">
          <div role="tablist" aria-label={compareAria} className="flex">
            {categories.map((cat) => {
              const isActive = cat.slug === activeSlug;
              return (
                <button
                  key={cat.slug}
                  role="tab"
                  aria-selected={isActive}
                  type="button"
                  onClick={() => setActiveSlug(cat.slug)}
                  className={cn(
                    'flex-1 py-4 font-display font-light text-[16px] tracking-[-0.005em] transition-colors duration-[var(--duration-fast)]',
                    isActive
                      ? 'text-[var(--color-text)] border-b-2 border-[var(--color-text)]'
                      : 'text-[var(--color-text-muted)] border-b-2 border-transparent',
                  )}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active category link */}
        <div className="py-5 border-b border-[var(--color-border-subtle)]">
          <Link
            href={`/rooms/${activeCategory.slug}`}
            className="group inline-flex items-baseline gap-2"
          >
            <span className="font-display font-light text-[22px] tracking-[-0.02em] text-[var(--color-text)]">
              {activeCategory.name}
            </span>
            <ArrowUpRight
              size={14}
              className="text-[var(--color-text-muted)] transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        {/* Rows — single column */}
        {comparison.map((row) => {
          const v = row.values[activeSlug];
          return (
            <div
              key={row.label}
              className="flex items-center justify-between gap-4 py-4 border-b border-[var(--color-border-subtle)]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <FeatureIcon
                  name={row.icon}
                  size={18}
                  className="shrink-0 text-[var(--color-text-muted)]"
                />
                <span className="font-display font-light text-[15px] tracking-[-0.005em] text-[var(--color-text)]">
                  {row.label}
                </span>
              </div>
              <div className="text-right shrink-0">
                {typeof v === 'boolean' ? (
                  v ? (
                    <Check size={20} weight="light" className="text-[var(--color-text)] inline-block" aria-label={includedLabel} />
                  ) : (
                    <Minus size={20} weight="light" className="text-[var(--color-sand-7)] inline-block" aria-label={notIncludedLabel} />
                  )
                ) : (
                  <span className="font-display font-light text-[15px] tracking-[-0.005em] text-[var(--color-text)] leading-[1.35]">
                    {v}
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {/* Price + CTA */}
        <div className="pt-6 pb-2 flex items-end justify-between gap-4">
          <div>
            <span className="caption text-[var(--color-text-muted)]">{fromLabel}</span>
            <div className="mt-1 font-display font-light text-[var(--color-text)] text-[28px] tracking-[-0.02em] leading-[1] tabular-nums">
              {formatMga(activeCategory.priceMga)}
            </div>
            <div className="mt-1 caption text-[var(--color-text-muted)]">
              {priceUnit}
            </div>
          </div>
          <Link
            href={`/rooms/${activeCategory.slug}`}
            className="group inline-flex items-center gap-2 font-body text-[14px] font-medium text-[var(--color-text)]"
          >
            {readMoreLabel}
            <ArrowUpRight
              size={14}
              className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          DESKTOP (md+) — original 3-column table
      ════════════════════════════════════════════════════════════ */}
      <div className="hidden md:block">
        {/* Sticky category header */}
        <div className="sticky top-[72px] z-10 bg-[var(--color-bg)]/95 backdrop-blur-[8px] border-b border-[var(--color-border-subtle)]">
          <div className="grid grid-cols-12 gap-4 py-5">
            <div className="col-span-3">
              <div className="caption">{compareKicker}</div>
            </div>
            {categories.map((cat) => (
              <div key={cat.slug} className="col-span-3 px-4">
                <Link
                  href={`/rooms/${cat.slug}`}
                  className="group inline-flex items-baseline gap-2"
                >
                  <span className="font-display font-light text-[24px] tracking-[-0.015em] text-[var(--color-text)]">
                    {cat.name}
                  </span>
                  <ArrowUpRight
                    size={14}
                    className="text-[var(--color-text-muted)] transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Rows */}
        {comparison.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-12 gap-4 py-6 border-b border-[var(--color-border-subtle)] items-baseline"
          >
            <div className="col-span-3 flex items-center gap-3">
              <FeatureIcon
                name={row.icon}
                size={18}
                className="shrink-0 text-[var(--color-text-muted)]"
              />
              <span className="font-display font-light text-[18px] tracking-[-0.005em] text-[var(--color-text)]">
                {row.label}
              </span>
            </div>
            {slugs.map((slug) => {
              const v = row.values[slug];
              return (
                <div key={slug} className="col-span-3 px-4">
                  {typeof v === 'boolean' ? (
                    v ? (
                      <Check size={20} weight="light" className="text-[var(--color-text)]" aria-label={includedLabel} />
                    ) : (
                      <Minus size={20} weight="light" className="text-[var(--color-sand-7)]" aria-label={notIncludedLabel} />
                    )
                  ) : (
                    <span className="font-display font-light text-[18px] tracking-[-0.005em] text-[var(--color-text)] leading-[1.35]">
                      {v}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}

        {/* Price row */}
        <div className="grid grid-cols-12 gap-4 py-9 items-baseline">
          <div className="col-span-3">
            <span className="caption">{fromLabel}</span>
          </div>
          {categories.map((cat) => (
            <div key={cat.slug} className="col-span-3 px-4">
              <div className="font-display font-light text-[var(--color-text)] text-[32px] tracking-[-0.02em] leading-[1] tabular-nums">
                {formatMga(cat.priceMga)}
              </div>
              <div className="mt-1 caption text-[var(--color-text-muted)]">
                {priceUnit}
              </div>
            </div>
          ))}
        </div>

        {/* Reserve row */}
        <div className="grid grid-cols-12 gap-4 pb-2 items-baseline">
          <div className="col-span-3" />
          {categories.map((cat) => (
            <div key={cat.slug} className="col-span-3 px-4">
              <Link
                href={`/rooms/${cat.slug}`}
                className="group inline-flex items-center gap-2 font-body text-[14px] font-medium text-[var(--color-text)]"
              >
                {readMoreLabel}
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
