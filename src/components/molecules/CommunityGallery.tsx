'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type Tile = { pos: React.CSSProperties; size: number; speed: number };

/**
 * §54 — "constellation" gallery modelée sur la section image de waabi.ai : un
 * titre centré encadré par une nuée de tuiles carrées (rounded 12px) dans les
 * gouttières gauche/droite, chacune avec un parallaxe vertical (vitesses
 * variées = profondeur) piloté au scroll (GSAP, lissé par Lenis). Donne la
 * densité d'images "gallery" de waabi. Mobile + reduced-motion : titre centré
 * + mosaïque 2 colonnes, sans parallaxe.
 */
const TILES: Tile[] = [
  { pos: { left: '1%', top: '9%' }, size: 144, speed: 90 },
  { pos: { left: '13%', top: '31%' }, size: 104, speed: -60 },
  { pos: { left: '4%', top: '54%' }, size: 128, speed: 140 },
  { pos: { left: '16%', top: '73%' }, size: 96, speed: -100 },
  { pos: { left: '2%', top: '85%' }, size: 116, speed: 64 },
  { pos: { left: '19%', top: '4%' }, size: 80, speed: -130 },
  { pos: { left: '23%', top: '50%' }, size: 66, speed: 112 },
  { pos: { right: '1%', top: '11%' }, size: 150, speed: -80 },
  { pos: { right: '13%', top: '33%' }, size: 100, speed: 120 },
  { pos: { right: '4%', top: '57%' }, size: 132, speed: -140 },
  { pos: { right: '16%', top: '75%' }, size: 92, speed: 84 },
  { pos: { right: '2%', top: '86%' }, size: 116, speed: -56 },
  { pos: { right: '18%', top: '5%' }, size: 84, speed: 128 },
  { pos: { right: '23%', top: '52%' }, size: 68, speed: -108 },
];

export function CommunityGallery({
  kicker,
  title,
  images,
}: {
  kicker: string;
  title: string;
  images: string[];
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        TILES.forEach((t, i) => {
          const el = tileRefs.current[i];
          if (!el) return;
          gsap.fromTo(
            el,
            { y: t.speed },
            {
              y: -t.speed,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            },
          );
        });
      }, section);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hair-rule relative overflow-clip bg-[var(--color-bg-subtle)]"
      aria-label={kicker}
    >
      {/* DESKTOP — parallax constellation around a centred title */}
      <div className="relative hidden lg:block" style={{ height: '128vh' }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          {TILES.map((t, i) => (
            <div
              key={i}
              ref={(el) => {
                tileRefs.current[i] = el;
              }}
              aria-hidden
              className="absolute overflow-hidden rounded-[12px] bg-[var(--color-bg-muted)] shadow-[0_18px_50px_-30px_rgba(0,0,0,0.45)] will-change-transform"
              style={{ ...t.pos, width: t.size, height: t.size }}
            >
              <Image
                src={images[i % images.length]}
                alt=""
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>
          ))}

          <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center">
            <div className="caption mb-4">{kicker}</div>
            <h2 className="font-display font-light text-[var(--color-text)] text-[44px] md:text-[56px] xl:text-[64px] leading-[1] md:leading-[0.98] tracking-[-0.03em] balance max-w-[640px]">
              {title}
            </h2>
          </div>
        </div>
      </div>

      {/* MOBILE / reduced-motion — centred title + compact mosaic */}
      <div className="px-5 py-28 md:px-8 md:py-36 lg:hidden">
        <div className="text-center">
          <div className="caption mb-4">{kicker}</div>
          <h2 className="font-display font-light text-[var(--color-text)] text-[40px] md:text-[52px] leading-[1.02] tracking-[-0.03em] balance mx-auto max-w-[520px]">
            {title}
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-3">
          {images.slice(0, 6).map((src, i) => (
            <div
              key={i}
              aria-hidden
              className="relative aspect-square overflow-hidden rounded-[12px] bg-[var(--color-bg-muted)]"
            >
              <Image src={src} alt="" fill sizes="50vw" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
