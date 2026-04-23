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
  /** Height multiplier in vh (image stays sticky across this range). */
  dwellVh?: number;
  /** Final border-radius on image (px). */
  endRadius?: number;
  /** Final image scale (1 = no shrink). Slight shrink adds depth. */
  endScale?: number;
};

/**
 * Sticky + scroll-linked transforms (Framer pattern).
 *
 * Outer section is taller than viewport. Inner sticky (100vh) stays pinned
 * naturally via CSS sticky. Inside, the image transforms (scale + radius)
 * as scroll progresses through the outer section. No GSAP pin — pure CSS
 * sticky is the smoothest possible pinning.
 *
 * `scrub: 1.2` adds a light lerp so the animation catches up gracefully
 * even with jittery input.
 */
export function FullBleedToSide({
  image,
  info,
  className,
  infoSide = 'right',
  dwellVh = 160,
  endRadius = 48,
  endScale = 0.9,
}: FullBleedToSideProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    const infoEl = infoRef.current;
    if (!section || !frame || !infoEl) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      gsap.set(frame, { scale: endScale, borderRadius: endRadius });
      gsap.set(infoEl, { opacity: 1, x: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      });

      // Image: full viewport → slightly shrunk + rounded
      tl.fromTo(
        frame,
        { scale: 1, borderRadius: 0 },
        { scale: endScale, borderRadius: endRadius, ease: 'power4.out' },
        0,
      );

      // Info panel: fade in + subtle slide, lags the image slightly
      tl.fromTo(
        infoEl,
        { opacity: 0, x: infoSide === 'right' ? 30 : -30 },
        { opacity: 1, x: 0, ease: 'power4.out' },
        0.2,
      );
    }, section);

    return () => ctx.revert();
  }, [endRadius, endScale, infoSide]);

  return (
    <section
      ref={sectionRef}
      className={cn('relative w-full', className)}
      style={{ height: `${dwellVh}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[var(--color-bg)]">
        {/* Image frame — transforms via GSAP scrub */}
        <div
          ref={frameRef}
          className="absolute inset-0 overflow-hidden bg-[var(--color-bg-muted)]"
          style={{
            transformOrigin: 'center center',
            willChange: 'transform, border-radius',
          }}
        >
          {image}
          {/* Gradient overlay for readability */}
          <div
            aria-hidden="true"
            className={cn(
              'absolute inset-0 pointer-events-none',
              infoSide === 'right'
                ? 'bg-gradient-to-r from-transparent via-transparent to-black/55'
                : 'bg-gradient-to-l from-transparent via-transparent to-black/55',
            )}
          />
        </div>

        {/* Info panel — positioned relative to the sticky container, not the frame */}
        <div
          className={cn(
            'absolute inset-y-0 flex items-center',
            infoSide === 'right' ? 'right-5 md:right-10 lg:right-16' : 'left-5 md:left-10 lg:left-16',
          )}
        >
          <div
            ref={infoRef}
            className="max-w-[440px] text-white will-change-[opacity,transform]"
            style={{ opacity: 0, transform: 'translate3d(30px, 0, 0)' }}
          >
            {info}
          </div>
        </div>
      </div>
    </section>
  );
}
