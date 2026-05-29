'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * §55 — hero cinématique copié de waabi.ai (réf. user) pour distinguer Hope
 * for the Future. Plein écran épinglé (CSS sticky, motif FullBleedToSide) :
 * le titre 2 lignes descend puis s'efface, et le média « dézoome » vers une
 * grande carte arrondie centrée, le tout piloté au scroll (GSAP, lissé Lenis).
 * Mobile + reduced-motion : hero plein écran statique, sans pin (md:h-[230vh]
 * → h-svh sous md et en motion-reduce, donc aucune zone vide).
 */
export function CommunityHero({
  src,
  alt,
  title,
}: {
  src: string;
  alt: string;
  title: string[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const media = mediaRef.current;
    const titleEl = titleRef.current;
    if (!section || !media || !titleEl) return;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        // Title — descends then fades over the first stretch.
        gsap.to(titleEl, {
          y: 160,
          opacity: 0,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top top', end: '42% top', scrub: 1 },
        });
        // Media — holds, then zooms out to a centred rounded card.
        gsap.fromTo(
          media,
          { scale: 1, borderRadius: 0 },
          {
            scale: 0.62,
            borderRadius: 26,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: section, start: '12% top', end: 'bottom bottom', scrub: 1 },
          },
        );
      }, section);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-svh md:h-[230vh] md:motion-reduce:h-svh"
    >
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        {/* Media layer — full-bleed, zooms out on scroll. */}
        <div
          ref={mediaRef}
          className="absolute inset-0 overflow-hidden bg-[var(--color-bg-muted)] will-change-transform"
          style={{ transformOrigin: 'center center' }}
        >
          <Image src={src} alt={alt} fill priority sizes="100vw" className="object-cover" />
          {/* Scrim for title legibility. */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/15"
          />
        </div>

        {/* Title — bottom-left, descends + fades. */}
        <div
          ref={titleRef}
          className="absolute inset-x-0 bottom-0 px-5 pb-16 md:px-10 md:pb-20 lg:px-16 will-change-[transform,opacity]"
        >
          <h1 className="font-display font-light text-white text-[clamp(40px,7.5vw,120px)] leading-[0.92] tracking-[-0.03em] max-w-[18ch]">
            {title.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>
        </div>
      </div>
    </section>
  );
}
