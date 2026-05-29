'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils/cn';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * §59 — Hero "qui passe petit" + constellation, modelé 1:1 sur waabi.ai
 * (mesuré au DOM, Playwright). L'image plein écran RÉTRÉCIT au scroll jusqu'à
 * la taille d'une tuile et se fond dans la constellation éparpillée — exactement
 * comme la vidéo waabi qui passe de 1440×900 à ~213×133 centrée.
 *
 * Choré (timeline GSAP scrubée, lissée par Lenis) :
 *  1) le titre h1 (taille standard 56px) monte + s'efface (0 → 0.25)
 *  2) l'image se scale 1 → 0.15 et remonte vers le slot tuile-centre-haut
 *     (0.28 → 0.62) — waabi : scale figé jusqu'à ~0.67 puis chute eased ;
 *     nous compressons un peu et lissons.
 *  3) la constellation (tuiles + texte HFF) apparaît autour (0.5 → 0.8)
 *  4) léger drift de parallaxe sur les colonnes extérieures dans la queue.
 * Mobile + reduced-motion : hero statique + texte + mosaïque (pas de pin).
 */
const TILE = 'min(9.236vw, 150px)';
const PER_COL = 4;

type Col = { side: 'left' | 'right'; offset: string; parallax: boolean; seed: number };
const COLUMNS: Col[] = [
  { side: 'left', offset: '1.667%', parallax: true, seed: 0 },
  { side: 'left', offset: '16.667%', parallax: false, seed: 4 },
  { side: 'right', offset: '16.667%', parallax: false, seed: 8 },
  { side: 'right', offset: '1.667%', parallax: true, seed: 12 },
];

function Tile({ src }: { src: string }) {
  return (
    <div
      aria-hidden
      className="relative aspect-square w-full shrink-0 overflow-hidden rounded-[12px] bg-[var(--color-bg-muted)]"
    >
      <Image src={src} alt="" fill sizes="160px" className="object-cover" />
    </div>
  );
}

export function CommunityHero({
  heroSrc,
  heroAlt,
  heroTitle,
  title,
  body,
  images,
}: {
  heroSrc: string;
  heroAlt: string;
  heroTitle: string[];
  title: string;
  body: string;
  images: string[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLDivElement>(null);
  const constRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [reduced, setReduced] = useState(false);

  useLayoutEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useLayoutEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const vh = window.innerHeight;
      const endScale = 0.15; // 900·0.15 = 135px tall ≈ one tile (waabi 0.148)
      const riseY = -(0.27 * vh); // image centre rises to the top-centre tile slot
      const drift = 0.16 * vh; // subtle outer-column parallax in the tail

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scroller,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
          },
        });
        // 1) hero title rises + fades away early
        tl.fromTo(
          heroTitleRef.current,
          { yPercent: 0, opacity: 1 },
          { yPercent: -45, opacity: 0, ease: 'power1.in', duration: 0.25 },
          0,
        );
        // 2) image shrinks to a tile and rises to the top-centre slot.
        // borderRadius 0 → 80px so that, once scaled by 0.15, the visual radius
        // is ~12px — matching the constellation tiles.
        tl.fromTo(
          imgRef.current,
          { scale: 1, y: 0, borderRadius: 0 },
          { scale: endScale, y: riseY, borderRadius: 80, ease: 'power2.inOut', duration: 0.34 },
          0.28,
        );
        // 3) constellation (tiles + text) materialises around it
        tl.fromTo(constRef.current, { opacity: 0 }, { opacity: 1, ease: 'none', duration: 0.28 }, 0.5);
        // 4) gentle parallax drift on the outer columns through the tail
        COLUMNS.forEach((c, i) => {
          if (!c.parallax) return;
          const el = colRefs.current[i];
          if (el) tl.fromTo(el, { y: drift }, { y: -drift, ease: 'none', duration: 0.38 }, 0.62);
        });
      }, scroller);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      className="relative overflow-clip bg-[var(--color-bg-subtle)]"
      aria-label={heroTitle.join(' ')}
    >
      {/* DESKTOP — pinned hero→constellation transition */}
      <div
        ref={scrollRef}
        className={cn('relative', reduced ? 'hidden' : 'hidden lg:block')}
        style={{ height: '280vh' }}
      >
        <div ref={stageRef} className="sticky top-0 h-screen overflow-hidden">
          {/* CONSTELLATION — assembles in */}
          <div ref={constRef} className="absolute inset-0 opacity-0">
            {COLUMNS.map((c, ci) => (
              <div
                key={ci}
                ref={(el) => {
                  colRefs.current[ci] = el;
                }}
                aria-hidden
                className="absolute flex flex-col justify-between will-change-transform"
                style={
                  { [c.side]: c.offset, top: '-25vh', height: '150vh', width: TILE } as React.CSSProperties
                }
              >
                {Array.from({ length: PER_COL }).map((_, t) => (
                  <Tile key={t} src={images[(c.seed + t) % images.length]} />
                ))}
              </div>
            ))}
            {/* bottom-centre accent (the top-centre slot is the shrunk hero image) */}
            <div
              aria-hidden
              className="absolute bottom-[15%] left-1/2 -translate-x-1/2"
              style={{ width: TILE }}
            >
              <Tile src={images[10 % images.length]} />
            </div>
            {/* HFF statement — one size, lead greyed + body dark */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-8 text-center">
              <p className="font-display font-light text-[21px] md:text-[25px] leading-[1.34] tracking-[-0.02em] max-w-[600px]">
                <span className="text-[var(--color-text-muted)]">{title} </span>
                <span className="text-[var(--color-text)]">{body}</span>
              </p>
            </div>
          </div>

          {/* HERO IMAGE — full-bleed, scales down to become the top-centre tile */}
          <div
            ref={imgRef}
            className="absolute inset-0 z-20 overflow-hidden will-change-transform [transform-origin:50%_50%]"
          >
            <Image src={heroSrc} alt={heroAlt} fill priority sizes="100vw" className="object-cover" />
          </div>

          {/* HERO TITLE — standard 56px h1, bottom-left, leaves early */}
          <div ref={heroTitleRef} className="absolute inset-0 z-30 will-change-transform">
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/15" />
            <div className="relative mx-auto flex h-full max-w-[1440px] flex-col px-5 md:px-8 lg:px-12">
              <div className="mt-auto pb-16 md:pb-24 max-w-[920px]">
                <h1 className="font-display font-light text-white text-[56px] leading-[1] tracking-[-0.03em] balance">
                  {heroTitle.map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE / reduced-motion — static hero + statement + mosaic */}
      <div className={cn(reduced ? 'block' : 'lg:hidden')}>
        <div className="relative h-[85vh] min-h-[560px] w-full overflow-hidden">
          <Image src={heroSrc} alt={heroAlt} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/20" />
          <div className="absolute inset-0 mx-auto flex max-w-[1440px] flex-col px-5 md:px-8">
            <div className="mt-auto pb-14 md:pb-20 max-w-[820px]">
              <h1 className="font-display font-light text-white text-[44px] md:text-[56px] leading-[1] tracking-[-0.03em] balance">
                {heroTitle.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </h1>
            </div>
          </div>
        </div>
        <div className="px-5 py-24 md:px-8 md:py-28">
          <p className="font-display font-light text-[19px] md:text-[22px] leading-[1.4] tracking-[-0.015em] mx-auto max-w-[460px] text-center">
            <span className="text-[var(--color-text-muted)]">{title} </span>
            <span className="text-[var(--color-text)]">{body}</span>
          </p>
          <div className="mx-auto mt-12 grid max-w-[520px] grid-cols-2 gap-3">
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
      </div>
    </section>
  );
}
