'use client';

import { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils/cn';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  /** Image source (full URL, expects landscape) */
  src: string;
  alt: string;
  /** Top-left caption (e.g. "The room", "Rooms · 01 of 03") */
  caption?: React.ReactNode;
  /** Title — pass an array of lines for line-by-line mask reveal */
  title: string | string[];
  /** Optional subtitle below title */
  subtitle?: React.ReactNode;
  /** 100vh by default, override with className */
  className?: string;
};

/**
 * Cinematic page hero with parallax background + line-by-line title reveal.
 * Used on /rooms, /rooms/[category], /about, /dining.
 *
 * - Image scales down 1.08 → 1 over 1.6s on mount (settle)
 * - Image translates up at 30% of scroll speed (parallax)
 * - Title reveals line-by-line with overflow mask, 90ms stagger
 * - Subtitle fades up after title completes
 */
export function PageHero({ src, alt, caption, title, subtitle, className }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const lines = Array.isArray(title) ? title : [title];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const img = imageRef.current;
    if (!section || !img) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Parallax: image translates up as section scrolls past
      gsap.to(img, {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cn(
        'relative h-[100vh] w-full overflow-hidden bg-[var(--color-sand-12)]',
        className,
      )}
    >
      {/* Parallax image wrapper — sized 110% to allow vertical translate without gap */}
      <div
        ref={imageRef}
        className="absolute inset-0 h-[120%] -top-[10%] hero-bg-settle"
        style={{ willChange: 'transform' }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
      </div>

      {/* Cinematic gradient — top fade for nav legibility, bottom for title */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/55"
      />

      <div className="relative h-full mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12 flex flex-col text-white">
        {/* Top caption */}
        {caption ? (
          <div
            className="pt-[100px] md:pt-[128px] hero-fade-up"
            style={{ ['--fade-delay' as string]: '0.2s' }}
          >
            <div className="caption text-white/75">{caption}</div>
          </div>
        ) : null}

        {/* Title — line by line mask reveal */}
        <div className="mt-auto pb-14 md:pb-20 max-w-[1100px]">
          <h1 className="font-display font-light tracking-[-0.04em] text-white text-[64px] leading-[0.92] md:text-[120px] md:leading-[0.9] lg:text-[180px] lg:leading-[0.9]">
            {lines.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <span
                  className="block hero-line-reveal"
                  style={{ ['--line-delay' as string]: `${0.35 + i * 0.09}s` }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          {subtitle ? (
            <div
              className="mt-6 md:mt-8 hero-fade-up text-white/80 text-[16px] md:text-[18px] leading-[1.5]"
              style={{ ['--fade-delay' as string]: `${0.35 + lines.length * 0.09 + 0.4}s` }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
