'use client';

import { useRef, useLayoutEffect, type ReactNode } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(SplitText, ScrollTrigger);
}

type SplitRevealProps = {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div';
  className?: string;
  /** split by 'chars' | 'words' | 'lines'. Default 'lines'. */
  splitBy?: 'chars' | 'words' | 'lines';
  /** Total stagger duration spread across elements. */
  staggerAmount?: number;
  /** Delay before animation starts (seconds). */
  delay?: number;
  /** Duration per element (seconds). */
  duration?: number;
  /** Trigger on scroll instead of load. */
  onScroll?: boolean;
};

export function SplitReveal({
  children,
  as: Tag = 'h2',
  className = '',
  splitBy = 'lines',
  staggerAmount = 0.4,
  delay = 0,
  duration = 0.88,
  onScroll = false,
}: SplitRevealProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let split: SplitText | null = null;
    let trigger: ScrollTrigger | null = null;

    // Wait for fonts before splitting (prevents reflow)
    const run = () => {
      if (!ref.current) return;

      split = new SplitText(ref.current, {
        type: splitBy === 'chars' ? 'lines,chars' : splitBy,
        linesClass: 'split-line overflow-hidden',
        mask: 'lines',
      });

      const targets =
        splitBy === 'chars' ? split.chars : splitBy === 'words' ? split.words : split.lines;

      gsap.set(targets, { yPercent: 110 });

      const tween = gsap.to(targets, {
        yPercent: 0,
        duration,
        ease: 'expo.out',
        stagger: { amount: staggerAmount, from: 'start' },
        delay,
        paused: onScroll,
      });

      if (onScroll && ref.current) {
        trigger = ScrollTrigger.create({
          trigger: ref.current,
          start: 'top 82%',
          once: true,
          onEnter: () => tween.play(),
        });
      }
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(run);
    } else {
      run();
    }

    return () => {
      split?.revert();
      trigger?.kill();
    };
  }, [splitBy, staggerAmount, delay, duration, onScroll]);

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={{ willChange: 'transform' }}
    >
      {children}
    </Tag>
  );
}
