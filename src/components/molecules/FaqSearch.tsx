'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import {
  MagnifyingGlass,
  X,
  CalendarBlank,
  Bed,
  MapTrifold,
} from '@phosphor-icons/react/dist/ssr';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import type { FaqCategory } from '@/lib/data/faq';
import { cn } from '@/lib/utils/cn';

/** Slug to icon — Phosphor icon per FAQ category for fast scanning.
 *  Updated dec-2026 : FAQ reorg from 8 to 3 categories (booking, stay,
 *  logistics) — icons aligned. Old slugs (arrival, rooms, food, nearby,
 *  money, health, practical) merged into the three above. */
const categoryIcon: Record<string, PhosphorIcon> = {
  booking: CalendarBlank,
  stay: Bed,
  logistics: MapTrifold,
};

/**
 * Searchable FAQ with category pill filter.
 * - Sticky search input at top
 * - Pills for each category, click to filter
 * - Live filter as you type, matches across question + answer text
 */
export function FaqSearch({ faq }: { faq: FaqCategory[] }) {
  const t = useTranslations('Faq');
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const lowerQuery = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    return faq
      .map((cat) => ({
        ...cat,
        entries: cat.entries.filter((entry) => {
          if (activeCategory && cat.slug !== activeCategory) return false;
          if (!lowerQuery) return true;
          return (
            entry.q.toLowerCase().includes(lowerQuery) ||
            entry.a.toLowerCase().includes(lowerQuery)
          );
        }),
      }))
      .filter((cat) => cat.entries.length > 0);
  }, [lowerQuery, activeCategory]);

  const totalMatches = filtered.reduce((acc, cat) => acc + cat.entries.length, 0);

  return (
    <div>
      {/* Search + pills bar — static, not sticky */}
      <div className="border-b border-[var(--color-border-subtle)]">
        <div className="py-5 md:py-6 flex flex-col gap-5">
          {/* Search input */}
          <label className="relative">
            <MagnifyingGlass
              size={18}
              weight="light"
              className="absolute left-0 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('search')}
              aria-label={t('searchAria')}
              className="w-full h-12 pl-8 pr-10 bg-transparent border-0 border-b border-[var(--color-border)] focus:border-[var(--color-sand-12)] focus:outline-none font-display font-light text-[18px] md:text-[22px] tracking-[-0.01em] text-[var(--color-text)] placeholder-[var(--color-text-muted)] transition-colors"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label={t('clearAria')}
                className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-8 inline-flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
              >
                <X size={16} weight="light" />
              </button>
            ) : null}
          </label>

          {/* Category pills */}
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              className={cn(
                'px-3.5 md:px-4 py-1.5 md:py-2 font-medium text-[14px] tracking-[0] transition-colors duration-[var(--duration-fast)]',
                activeCategory === null
                  ? 'bg-[var(--color-sand-12)] text-[var(--color-sand-1)]'
                  : 'border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-sand-12)]',
              )}
            >
              {t('all')}
            </button>
            {faq.map((cat) => {
              const Icon = categoryIcon[cat.slug];
              return (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => setActiveCategory(cat.slug)}
                  className={cn(
                    'inline-flex items-center gap-2 px-3.5 md:px-4 py-1.5 md:py-2 caption transition-colors duration-[var(--duration-fast)]',
                    activeCategory === cat.slug
                      ? 'bg-[var(--color-sand-12)] text-[var(--color-sand-1)]'
                      : 'border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-sand-12)]',
                  )}
                >
                  {Icon ? (
                    <Icon size={14} weight="regular" className="shrink-0" />
                  ) : null}
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Match count */}
      {lowerQuery || activeCategory ? (
        <div className="py-6 caption text-[var(--color-text-muted)]">
          {totalMatches === 0
            ? t('noMatchesShort')
            : totalMatches === 1
              ? t('matchesOne', { n: totalMatches })
              : t('matchesMany', { n: totalMatches })}
        </div>
      ) : null}

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="py-24 md:py-32">
          <p className="font-display font-light text-[var(--color-text)] text-[28px] md:text-[36px] leading-[1.2] tracking-[-0.025em] text-center max-w-[480px] mx-auto">
            {t('noMatchesLong')}
          </p>
        </div>
      ) : (
        filtered.map((cat) => (
          <section
            key={cat.slug}
            id={cat.slug}
            className="py-16 md:py-20 lg:py-24 border-t border-[var(--color-border-subtle)]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-3 lg:sticky lg:top-32 self-start">
                <ScrollReveal>
                  <div className="caption">{cat.label}</div>
                  <div className="mt-4 font-display font-light text-[var(--color-text-muted)] text-[15px]">
                    {cat.entries.length === 1
                      ? t('questionsOne', { n: cat.entries.length })
                      : t('questionsMany', { n: cat.entries.length })}
                  </div>
                </ScrollReveal>
              </div>

              <div className="lg:col-span-9">
                <ul className="border-t border-[var(--color-border-subtle)]">
                  {cat.entries.map((entry, i) => (
                    <ScrollReveal key={entry.q} delay={i * 0.03}>
                      <li className="grid grid-cols-12 gap-6 py-10 md:py-12 border-b border-[var(--color-border-subtle)]">
                        <div className="col-span-12 md:col-span-5">
                          <h3 className="font-display font-light text-[var(--color-text)] text-[22px] md:text-[26px] tracking-[-0.02em] leading-[1.2] balance">
                            {entry.q}
                          </h3>
                        </div>
                        <div className="col-span-12 md:col-span-7">
                          <p className="prose-editorial text-[16px] md:text-[17px] leading-[1.65]">
                            {entry.a}
                          </p>
                        </div>
                      </li>
                    </ScrollReveal>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))
      )}
    </div>
  );
}
