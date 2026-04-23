'use client';

import { useRef, useLayoutEffect, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils/cn';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type ParallaxRevealProps = {
  children: ReactNode;
  className?: string;
  /** Start radius in pixels — unfurls to 0 as element enters view. */
  startRadius?: number;
  /** Parallax strength (% of container height). Positive = image moves up slower. */
  parallax?: number;
  /** Optional rounded "start" state kept (no flattening). Rare. */
  keepRadius?: boolean;
};

/**
 * World-class scroll reveal:
 * 1. Container border-radius animates from `startRadius` → 0 as it enters the viewport.
 * 2. Inner image has subtle parallax (slower than scroll).
 *
 * Respects prefers-reduced-motion (both effects disabled).
 */
export function ParallaxReveal({
  children,
  className,
  startRadius = 120,
  parallax = 12,
  keepRadius = false,
}: ParallaxRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      gsap.set(container, { borderRadius: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Border-radius unfurl — crisp, scrubbed, ends flat before mid-viewport
      if (!keepRadius) {
        gsap.fromTo(
          container,
          { borderRadius: startRadius },
          {
            borderRadius: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top 92%',
              end: 'top 42%',
              scrub: 0.6,
            },
          },
        );
      }

      // 2. Parallax — image rises slower than scroll
      gsap.fromTo(
        inner,
        { yPercent: parallax / 2 },
        {
          yPercent: -parallax / 2,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    }, container);

    return () => ctx.revert();
  }, [startRadius, parallax, keepRadius]);

  const overflowScale = 1 + parallax / 100;

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden bg-[var(--color-bg-muted)]', className)}
      style={{ borderRadius: startRadius }}
    >
      <div
        ref={innerRef}
        className="relative w-full h-full"
        style={{
          height: `${overflowScale * 100}%`,
          marginTop: `-${(parallax / 2)}%`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
