import { type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

type FullBleedShrinkProps = {
  children: ReactNode;
  className?: string;
  /** How far the sticky image stays pinned (in vh). Default 80. */
  dwellVh?: number;
};

/**
 * Viewport-sized sticky image section.
 * Pure CSS sticky — no JS, no scrub, no pin tricks.
 * Image fills 100vw × 100vh and stays fixed while the page scrolls naturally.
 * Next section scrolls over it, Framer-tutorial style.
 */
export function FullBleedShrink({ children, className, dwellVh = 80 }: FullBleedShrinkProps) {
  return (
    <section
      className={cn('relative w-full', className)}
      style={{ height: `${100 + dwellVh}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[var(--color-bg-muted)]">
        {children}
      </div>
    </section>
  );
}
