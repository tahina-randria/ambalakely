'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * Premium entrance loader.
 * Full-screen sand overlay with a thin counter.
 * Slides up with expo.inOut when page is ready — signature luxury brand entry.
 */
export function Loader() {
  const [hidden, setHidden] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setHidden(true);
      return;
    }

    const root = rootRef.current;
    const counter = counterRef.current;
    const label = labelRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const counterState = { value: 0 };

      const tl = gsap.timeline({
        onComplete: () => setHidden(true),
      });

      // Label fade in
      if (label) {
        tl.fromTo(
          label,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          0,
        );
      }

      // Counter 0 → 100
      tl.to(
        counterState,
        {
          value: 100,
          duration: 1.3,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (counter) {
              counter.textContent = String(Math.round(counterState.value)).padStart(3, '0');
            }
          },
        },
        0.2,
      );

      // Hold briefly
      tl.to({}, { duration: 0.15 });

      // Curtain slides up (reveals page)
      tl.to(
        root,
        {
          yPercent: -100,
          duration: 1.1,
          ease: 'expo.inOut',
        },
        '>-0.05',
      );
    }, root);

    return () => ctx.revert();
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="fixed inset-0 z-[100] bg-[var(--color-sand-1)] flex flex-col justify-between p-5 md:p-8 lg:p-12 will-change-transform"
    >
      <div
        ref={labelRef}
        className="font-mono uppercase text-[12px] tracking-[0.1em] text-[var(--color-text)] will-change-[opacity,transform]"
      >
        Ambalakely · Fianarantsoa · Madagascar
      </div>

      <div className="flex items-end justify-between gap-6">
        <div
          ref={counterRef}
          className="font-mono tabular-nums text-[120px] leading-[1] md:text-[200px] lg:text-[280px] tracking-[-0.04em] text-[var(--color-text)] font-light"
        >
          000
        </div>
        <div className="font-mono uppercase text-[11px] tracking-[0.1em] text-[var(--color-text-muted)] pb-3 md:pb-5 lg:pb-8">
          Loading
        </div>
      </div>
    </div>
  );
}
