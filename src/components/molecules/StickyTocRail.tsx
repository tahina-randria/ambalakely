'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils/cn';

type TocItem = {
  /** Anchor id of the section (must exist in the DOM as id). */
  id: string;
  /** Display number — e.g. "01", "02". */
  number: string;
  /** Short label shown on hover. */
  label: string;
};

/**
 * Sticky right-rail table-of-contents — Mobbin/Aman pattern for long
 * editorial pages. Lists section numbers as small dots; the dot that
 * matches the section currently in the viewport gets emphasised, and
 * its label appears as a tooltip on hover.
 *
 * Pure progressive enhancement: hidden on mobile (use the in-page
 * quick-nav instead). Only renders on lg+ where horizontal space is
 * cheap.
 *
 * Active section is tracked via IntersectionObserver — no scroll
 * listeners, no GSAP, very lightweight.
 */
export function StickyTocRail({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    if (items.length === 0) return;

    const elements = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    // rootMargin: trigger when section center crosses the viewport center.
    // -40% top, -40% bottom leaves a 20% sweet spot in the middle.
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the highest intersection ratio that's still
        // in the sweet spot — guards against duplicate triggers.
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const top = visible.reduce((acc, cur) =>
          cur.intersectionRatio > acc.intersectionRatio ? cur : acc,
        );
        setActiveId(top.target.id);
      },
      {
        rootMargin: '-40% 0px -40% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="hidden lg:flex fixed right-6 xl:right-10 top-1/2 -translate-y-1/2 z-30 flex-col items-end gap-3"
    >
      <ul className="flex flex-col gap-2.5">
        {items.map((it) => {
          const isActive = it.id === activeId;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className={cn(
                  'group flex items-center gap-3 transition-opacity duration-[var(--duration-base)] ease-[var(--ease-standard)]',
                  isActive ? 'opacity-100' : 'opacity-50 hover:opacity-100',
                )}
                aria-current={isActive ? 'true' : undefined}
              >
                {/* Hover-revealed label */}
                <span
                  className={cn(
                    'font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-text)]',
                    'opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--duration-fast)]',
                    isActive && 'opacity-100',
                  )}
                >
                  {it.label}
                </span>
                {/* Number / dot */}
                <span
                  className={cn(
                    'font-mono text-[10px] tabular-nums w-7 h-7 inline-flex items-center justify-center',
                    'border transition-colors duration-[var(--duration-base)]',
                    isActive
                      ? 'border-[var(--color-text)] bg-[var(--color-text)] text-[var(--color-bg)]'
                      : 'border-[var(--color-border)] text-[var(--color-text)] group-hover:border-[var(--color-text)]',
                  )}
                >
                  {it.number}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
