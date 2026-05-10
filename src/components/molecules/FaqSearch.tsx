'use client';

import { useState, useMemo } from 'react';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import {
  MagnifyingGlass,
  X,
  CalendarBlank,
  Airplane,
  Bed,
  ForkKnife,
  MapPin,
  Wallet,
  FirstAid,
  Lightbulb,
} from '@phosphor-icons/react/dist/ssr';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import { faq } from '@/lib/data/faq';
import { cn } from '@/lib/utils/cn';

/** Slug to icon — Phosphor icon per FAQ category for fast scanning. */
const categoryIcon: Record<string, PhosphorIcon> = {
  booking: CalendarBlank,
  arrival: Airplane,
  rooms: Bed,
  food: ForkKnife,
  nearby: MapPin,
  money: Wallet,
  health: FirstAid,
  practical: Lightbulb,
};

/**
 * Searchable FAQ with category pill filter.
 * - Sticky search input at top
 * - Pills for each category, click to filter
 * - Live filter as you type, matches across question + answer text
 */
export function FaqSearch() {
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
      {/* Sticky search + pills bar */}
      <div className="sticky top-[72px] z-10 bg-[var(--color-bg)]/95 backdrop-blur-[8px] border-b border-[var(--color-border-subtle)] -mx-5 md:-mx-8 lg:-mx-12 px-5 md:px-8 lg:px-12">
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
              placeholder="Search the FAQ..."
              aria-label="Search the FAQ"
              className="w-full h-12 pl-8 pr-10 bg-transparent border-0 border-b border-[var(--color-border)] focus:border-[var(--color-sand-12)] focus:outline-none font-display font-light text-[18px] md:text-[22px] tracking-[-0.01em] text-[var(--color-text)] placeholder-[var(--color-text-muted)] transition-colors"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
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
                'px-3.5 md:px-4 py-1.5 md:py-2 caption transition-colors duration-[var(--duration-fast)]',
                activeCategory === null
                  ? 'bg-[var(--color-sand-12)] text-[var(--color-sand-1)]'
                  : 'border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-sand-12)]',
              )}
            >
              All
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
            ? 'No matches. Try a different search or category.'
            : `${totalMatches} ${totalMatches === 1 ? 'match' : 'matches'}`}
        </div>
      ) : null}

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="py-24 md:py-32">
          <p className="font-display font-light text-[var(--color-text)] text-[28px] md:text-[36px] leading-[1.2] tracking-[-0.025em] text-center max-w-[480px] mx-auto">
            No matches. Write to us instead.
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
              <div className="lg:col-span-3 lg:sticky lg:top-[200px] self-start">
                <ScrollReveal>
                  <div className="caption">{cat.label}</div>
                  <div className="mt-4 font-display font-light text-[var(--color-text-muted)] text-[15px]">
                    {cat.entries.length}{' '}
                    {cat.entries.length === 1 ? 'question' : 'questions'}
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
