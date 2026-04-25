'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils/cn';

type Item = {
  id: string;
  number: string;
  label: string;
};

const items: Item[] = [
  { id: 'overview', number: '01', label: 'Overview' },
  { id: 'stay', number: '02', label: 'Stay' },
  { id: 'dining', number: '03', label: 'Dining' },
  { id: 'experiences', number: '04', label: 'Experiences' },
  { id: 'about', number: '05', label: 'About' },
  { id: 'reviews', number: '06', label: 'Guests' },
  { id: 'trust', number: '07', label: 'Engagements' },
  { id: 'location', number: '08', label: 'Location' },
  { id: 'journal', number: '09', label: 'Journal' },
  { id: 'book', number: '10', label: 'Book' },
];

/**
 * Vertical breadcrumb rail — fixed on the right side, hidden on mobile.
 * Highlights the current section based on viewport position.
 * Provides click-to-scroll navigation.
 */
export function SectionRail() {
  const [activeId, setActiveId] = useState<string>('overview');
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show after hero (when scrolled past 80vh)
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Track which section is in view
    const observers: IntersectionObserver[] = [];
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
              setActiveId(item.id);
            }
          });
        },
        { threshold: [0.3, 0.5, 0.7], rootMargin: '-20% 0px -40% 0px' },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className={cn(
        'fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:block',
        'transition-opacity duration-[var(--duration-slow)] ease-[var(--ease-standard)]',
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none',
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <ul className="flex flex-col gap-1.5">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  'group flex items-center justify-end gap-3 h-7 transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)]',
                  isActive
                    ? 'text-[var(--color-text)]'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]',
                )}
              >
                {/* Label — slides in on hover */}
                <span
                  className={cn(
                    'font-mono text-[12px] uppercase tracking-[0.1em] whitespace-nowrap',
                    'transition-all duration-[var(--duration-base)] ease-[var(--ease-standard)]',
                    hovered
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-2 pointer-events-none',
                  )}
                >
                  {item.label}
                </span>

                {/* Number — always visible */}
                <span className="font-mono text-[11px] tabular-nums tracking-tight w-7 text-right">
                  {item.number}
                </span>

                {/* Indicator line */}
                <span
                  className={cn(
                    'block h-px transition-all duration-[var(--duration-base)] ease-[var(--ease-standard)]',
                    isActive
                      ? 'w-6 bg-[var(--color-text)]'
                      : 'w-3 bg-[var(--color-border)]',
                    'group-hover:bg-[var(--color-text)]',
                  )}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
