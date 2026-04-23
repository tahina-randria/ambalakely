'use client';

import { useRef, useLayoutEffect, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils/cn';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
};

/**
 * GSAP fade + rise. Shares Lenis ticker = fully synced scroll.
 * Inline initial state prevents FOUC. clearProps on complete frees compositor.
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 16,
  duration = 0.56,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      gsap.set(el, { clearProps: 'all' });
      el.style.opacity = '1';
      el.style.transform = 'none';
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: 'power3.out',
        overwrite: 'auto',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
        onComplete: () => {
          // Free the compositor — drop will-change
          el.style.willChange = 'auto';
        },
      });
    }, el);

    return () => ctx.revert();
  }, [delay, y, duration]);

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: 0,
        transform: `translate3d(0, ${y}px, 0)`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
};

export function Stagger({ children, className, stagger = 0.06, y = 16 }: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = el.querySelectorAll<HTMLElement>('[data-stagger-item]');
    if (items.length === 0) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      items.forEach((item) => {
        item.style.opacity = '1';
        item.style.transform = 'none';
        item.style.willChange = 'auto';
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.52,
        ease: 'power3.out',
        stagger,
        overwrite: 'auto',
        scrollTrigger: {
          trigger: el,
          start: 'top 82%',
          once: true,
        },
        onComplete: () => {
          items.forEach((item) => {
            item.style.willChange = 'auto';
          });
        },
      });
    }, el);

    return () => ctx.revert();
  }, [stagger, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      data-stagger-item
      className={cn(className)}
      style={{
        opacity: 0,
        transform: 'translate3d(0, 16px, 0)',
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}
