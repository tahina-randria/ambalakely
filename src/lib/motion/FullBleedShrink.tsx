'use client';

import { useRef, useLayoutEffect, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils/cn';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type FullBleedShrinkProps = {
  children: ReactNode;
  className?: string;
  /** Final border radius in pixels. */
  endRadius?: number;
  /** Scroll distance during pin, in vh. */
  scrollDistance?: number;
  /** Final frame width in vw (final state, centered). */
  endWidth?: number;
  /** Final frame height in vh (final state, centered). */
  endHeight?: number;
};

/**
 * Cinematic full-bleed → contained shrink.
 * Uses GPU-only transforms (scale + translate) — no width/height animation,
 * no layout recalc per frame. Buttery smooth even on trackpad.
 */
export function FullBleedShrink({
  children,
  className,
  endRadius = 40,
  scrollDistance = 260,
  endWidth = 82,
  endHeight = 84,
}: FullBleedShrinkProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    if (!section || !frame) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      gsap.set(frame, {
        scale: 1,
        borderRadius: endRadius,
      });
      return;
    }

    // Compute initial scale so the frame covers the viewport entirely.
    // cover = max(width ratio, height ratio) + tiny overshoot.
    const initialScale = Math.max(100 / endWidth, 100 / endHeight) * 1.02;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        frame,
        {
          scale: initialScale,
          borderRadius: 0,
        },
        {
          scale: 1,
          borderRadius: endRadius,
          ease: 'power2.inOut',    // premium — slow start, confident middle, slow end
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: `+=${scrollDistance}vh`,
            scrub: 1.8,              // strong smoothing buffer
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, [endRadius, scrollDistance, endWidth, endHeight]);

  return (
    <section
      ref={sectionRef}
      className={cn('relative w-full overflow-hidden bg-[var(--color-bg)]', className)}
      style={{ height: '100vh' }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={frameRef}
          className="relative overflow-hidden bg-[var(--color-bg-muted)]"
          style={{
            width: `${endWidth}vw`,
            height: `${endHeight}vh`,
            borderRadius: 0,
            transformOrigin: 'center center',
            willChange: 'transform, border-radius',
          }}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
