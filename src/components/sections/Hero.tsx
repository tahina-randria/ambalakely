'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lineInners = root.querySelectorAll<HTMLElement>('[data-line-inner]');
    const sub = root.querySelector<HTMLElement>('[data-sub]');
    const meta = root.querySelector<HTMLElement>('[data-meta]');
    const bg = root.querySelector<HTMLElement>('[data-bg]');

    const ctx = gsap.context(() => {
      // Background subtle zoom-out on load (cinematic entrance)
      if (bg) {
        gsap.fromTo(
          bg,
          { scale: 1.08 },
          {
            scale: 1,
            duration: 2.4,
            ease: 'expo.out',
          },
        );
      }

      // Title lines rise from hard bottom, staggered
      gsap.to(lineInners, {
        yPercent: 0,
        duration: 1.4,
        ease: 'expo.out',
        stagger: 0.09,
        delay: 0.2,
      });

      // Sub + meta fade in after
      if (sub) {
        gsap.to(sub, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          delay: 1.0,
        });
      }
      if (meta) {
        gsap.to(meta, {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          delay: 1.3,
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  const lines = ['Ambalakely.', 'Ten rooms in the highlands', 'of Madagascar.'];

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden text-white isolate"
    >
      {/* Background image — slightly enlarged at load, settles via GSAP */}
      <div
        data-bg
        aria-hidden="true"
        className="absolute inset-0 -z-20 will-change-transform"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=2400&q=90')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: 'scale(1.08)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/25 via-black/10 to-black/55"
      />

      {/* Content */}
      <div className="relative h-full w-full mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12 flex flex-col justify-end pb-14 md:pb-20">
        <h1 className="font-display font-light tracking-[-0.035em] text-white text-[44px] leading-[1.05] md:text-[64px] md:leading-[1.02] lg:text-[80px] lg:leading-[1.02] max-w-[900px]">
          {lines.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <span
                data-line-inner
                className="block will-change-transform"
                style={{ transform: 'translate3d(0, 101%, 0)' }}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div
          data-sub
          className="mt-8 md:mt-12 flex items-center gap-3 font-mono uppercase text-[13px] leading-[16px] tracking-[0.08em] font-medium text-white/85 will-change-[opacity,transform]"
          style={{ opacity: 0, transform: 'translate3d(0, 12px, 0)' }}
        >
          <span className="text-white/60">00</span>
          <span className="h-px w-6 bg-white/40" />
          Fianarantsoa · Est. 2018
        </div>
      </div>

      {/* Scroll hint */}
      <div
        data-meta
        className="absolute bottom-6 right-5 md:right-8 lg:right-12 font-mono text-[11px] uppercase tracking-[0.1em] text-white/70 will-change-[opacity]"
        style={{ opacity: 0 }}
      >
        Scroll ↓
      </div>
    </section>
  );
}
