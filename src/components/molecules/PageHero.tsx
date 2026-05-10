'use client';

import { useRef, useLayoutEffect, type ReactNode } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from '@phosphor-icons/react/dist/ssr';
import { cn } from '@/lib/utils/cn';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  /** Image source (full URL, expects landscape) */
  src: string;
  alt: string;
  /** Title — pass an array of lines for line-by-line mask reveal */
  title: string | string[];
  /**
   * Optional CTA override. By default a 'Check availability' button opens
   * the booking drawer.
   */
  cta?: ReactNode;
  /** Hide the default CTA entirely (rare, e.g. journal article hero) */
  hideCta?: boolean;
  /** 100vh by default, override with className */
  className?: string;
};

/**
 * Cinematic page hero with parallax background + line-by-line title reveal.
 * Used on /rooms, /rooms/[category], /about, /dining, /community, /experiences,
 * /plan-your-trip, /journal, /faq.
 *
 * Hero only contains : H1 title (massive) + CTA. No caption, no subtitle.
 */
export function PageHero({
  src,
  alt,
  title,
  cta,
  hideCta = false,
  className,
}: Props) {
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

  const openBooking = () => window.dispatchEvent(new Event('open-booking'));

  const ctaDelay = `${0.35 + lines.length * 0.09 + 0.3}s`;

  return (
    <section
      ref={sectionRef}
      className={cn(
        'relative h-[100vh] w-full overflow-hidden bg-[var(--color-sand-12)]',
        className,
      )}
    >
      {/* Parallax image wrapper */}
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

      {/* Cinematic gradient */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/55"
      />

      <div className="relative h-full mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12 flex flex-col text-white">
        {/* Title bottom-left + CTA */}
        <div className="mt-auto pb-14 md:pb-20 max-w-[920px]">
          <h1 className="font-display font-light tracking-[-0.03em] text-white text-[56px] leading-[1] balance">
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

          {!hideCta ? (
            <div
              className="mt-10 md:mt-14 hero-fade-up"
              style={{ ['--fade-delay' as string]: ctaDelay }}
            >
              {cta ?? (
                <button
                  type="button"
                  onClick={openBooking}
                  className="group inline-flex items-center gap-2 h-12 px-7 bg-white text-[var(--color-sand-12)] font-body text-[15px] font-medium transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:bg-[var(--color-sand-3)]"
                >
                  Check availability
                  <ArrowDown
                    size={16}
                    className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-y-0.5"
                  />
                </button>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
