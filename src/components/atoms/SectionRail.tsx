'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils/cn';

type Item = {
  id: string;
  number: string;
  label: string;
};

/**
 * Numbered destinations only. Aligned with Kicker numbers in each section.
 * Context sections (Hero, Overview, About/Story, Engagements/Trust) are
 * not in the rail — they appear as you scroll but aren't navigation targets.
 */
const items: Item[] = [
  { id: 'stay', number: '01', label: 'Stay' },
  { id: 'dining', number: '02', label: 'Dining' },
  { id: 'experiences', number: '03', label: 'Experiences' },
  { id: 'reviews', number: '04', label: 'Guests' },
  { id: 'location', number: '05', label: 'Location' },
  { id: 'journal', number: '06', label: 'Journal' },
  { id: 'book', number: '07', label: 'Book' },
];

/**
 * Vertical breadcrumb rail — fixed on the right, hidden on mobile.
 * Highlights the current destination based on viewport position.
 */
export function SectionRail() {
  const [activeId, setActiveId] = useState<string>('stay');
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

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

                <span className="font-mono text-[11px] tabular-nums tracking-tight w-7 text-right">
                  {item.number}
                </span>

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
