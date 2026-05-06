import Link from 'next/link';
import { Check, Minus, ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { FeatureIcon } from '@/components/atoms/FeatureIcon';
import { comparison } from '@/lib/data/comparison';
import { categories } from '@/lib/data/categories';

const fmt = (n: number) => n.toLocaleString('fr-FR').replace(/\s/g, ' ');

/**
 * Quick-scan comparison grid. Same criteria across all 3 categories.
 * Hairline-ruled rows, icons in column 1, values in 3 columns.
 *
 * Boolean true → checkmark · Boolean false → em-dash · String → typographic value
 */
export function RoomComparison() {
  return (
    <div className="w-full">
      {/* Sticky-on-scroll category header (mobile-first then enhanced) */}
      <div className="sticky top-[72px] z-10 bg-[var(--color-bg)]/95 backdrop-blur-[8px] border-b border-[var(--color-border-subtle)]">
        <div className="grid grid-cols-12 gap-4 py-5">
          <div className="col-span-3 hidden md:block">
            <div className="caption">Compare</div>
          </div>
          {categories.map((cat) => (
            <div
              key={cat.slug}
              className="col-span-4 md:col-span-3 px-2 md:px-4"
            >
              <div className="caption text-[var(--color-text-muted)]">
                {cat.number}
              </div>
              <Link
                href={`/rooms/${cat.slug}`}
                className="group inline-flex items-baseline gap-2 mt-1.5"
              >
                <span className="font-display font-light text-[18px] md:text-[24px] tracking-[-0.015em] text-[var(--color-text)]">
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
      <div>
        {comparison.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-12 gap-4 py-5 md:py-6 border-b border-[var(--color-border-subtle)] items-baseline"
          >
            {/* Label + icon */}
            <div className="col-span-12 md:col-span-3 flex items-center gap-3">
              <FeatureIcon
                name={row.icon}
                size={18}
                className="shrink-0 text-[var(--color-text-muted)]"
              />
              <span className="font-display font-light text-[16px] md:text-[18px] tracking-[-0.005em] text-[var(--color-text)]">
                {row.label}
              </span>
            </div>

            {/* Values */}
            {(['superieure', 'confort', 'standard'] as const).map((slug) => {
              const v = row.values[slug];
              return (
                <div key={slug} className="col-span-4 md:col-span-3 px-2 md:px-4">
                  {typeof v === 'boolean' ? (
                    v ? (
                      <Check
                        size={20}
                        weight="light"
                        className="text-[var(--color-text)]"
                        aria-label="Included"
                      />
                    ) : (
                      <Minus
                        size={20}
                        weight="light"
                        className="text-[var(--color-sand-7)]"
                        aria-label="Not included"
                      />
                    )
                  ) : (
                    <span className="font-display font-light text-[15px] md:text-[18px] tracking-[-0.005em] text-[var(--color-text)] leading-[1.35]">
                      {v}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}

        {/* Price row */}
        <div className="grid grid-cols-12 gap-4 py-7 md:py-9 items-baseline">
          <div className="col-span-12 md:col-span-3">
            <span className="caption">From</span>
          </div>
          {categories.map((cat) => (
            <div key={cat.slug} className="col-span-4 md:col-span-3 px-2 md:px-4">
              <div className="font-display font-light text-[var(--color-text)] text-[22px] md:text-[32px] tracking-[-0.02em] leading-[1] tabular-nums">
                {fmt(cat.priceMga)}
              </div>
              <div className="mt-1 caption text-[var(--color-text-muted)]">
                Ariary · per night
              </div>
            </div>
          ))}
        </div>

        {/* Reserve row — quick CTA per category */}
        <div className="grid grid-cols-12 gap-4 pb-2 items-baseline">
          <div className="col-span-12 md:col-span-3" />
          {categories.map((cat) => (
            <div key={cat.slug} className="col-span-4 md:col-span-3 px-2 md:px-4">
              <Link
                href={`/rooms/${cat.slug}`}
                className="group inline-flex items-center gap-2 font-body text-[14px] font-medium text-[var(--color-text)]"
              >
                Read more
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
