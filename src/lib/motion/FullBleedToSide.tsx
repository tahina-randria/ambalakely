'use client';

import { useRef, useLayoutEffect, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils/cn';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type FullBleedToSideProps = {
  image: ReactNode;
  info: ReactNode;
  className?: string;
  infoSide?: 'left' | 'right';
  /** How far the sticky content stays pinned (in vh). Higher = more dwell time. */
  dwellVh?: number;
};

/**
 * Sticky viewport-sized image with info panel on one side.
 * Uses native CSS `position: sticky` — no JS pin, no scrub.
 * Next section scrolls naturally over the top, Framer-tutorial style.
 *
 * The image stays at 100vw × 100vh (viewport-filling) the whole time.
 * Info panel fades in on viewport enter.
 */
export function FullBleedToSide({
  image,
  info,
  className,
  infoSide = 'right',
  dwellVh = 120,
}: FullBleedToSideProps) {
  const infoRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = infoRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 70%',
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className={cn('relative w-full', className)}
      style={{ height: `${100 + dwellVh}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Full-bleed image — viewport-sized, no scale, no shrink */}
        <div className="absolute inset-0">{image}</div>

        {/* Gradient overlay — readable side */}
        <div
          aria-hidden="true"
          className={cn(
            'absolute inset-0 pointer-events-none',
            infoSide === 'right'
              ? 'bg-gradient-to-r from-transparent via-transparent to-black/65'
              : 'bg-gradient-to-l from-transparent via-transparent to-black/65',
          )}
        />

        {/* Info panel */}
        <div
          className={cn(
            'absolute inset-y-0 flex items-center',
            infoSide === 'right' ? 'right-5 md:right-8 lg:right-12' : 'left-5 md:left-8 lg:left-12',
          )}
        >
          <div
            ref={infoRef}
            className="max-w-[440px] text-white will-change-[opacity,transform]"
            style={{ opacity: 0, transform: 'translate3d(0, 16px, 0)' }}
          >
            {info}
          </div>
        </div>
      </div>
    </section>
  );
}
