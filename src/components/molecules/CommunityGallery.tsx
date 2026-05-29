'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * §58 — "constellation" gallery, mesurée 1:1 sur waabi.ai au DOM (Playwright,
 * viewport 1440×900). Le vrai modèle waabi :
 *  - Section haute de 150vh, NON épinglée — elle défile, le titre la traverse.
 *  - 4 colonnes `absolute h-[150vh] flex-col justify-between`, 4 tuiles carrées
 *    chacune → pitch ~406px (gros vides). Tuiles fluides : 133/1440·100vw.
 *  - Positions : extérieures à 1.667% des bords, intérieures à 16.667% →
 *    deux paires serrées qui collent les bords G/D, grand centre vide.
 *  - Parallaxe : SEULES les colonnes extérieures bougent (translateY +600→−600
 *    @900vh, soit ±0.667·vh, même sens). Les intérieures + tuiles centrales
 *    sont STATIQUES (ty=0 mesuré sur tout le scroll).
 *  - Deux tuiles centrales encadrent le titre (haut/bas), statiques.
 * Scrub GSAP lissé par Lenis (plus fluide que le rAF de waabi qui « bug »).
 * Mobile + reduced-motion : titre + mosaïque 2 colonnes.
 */
const TILE = 'min(9.236vw, 150px)'; // 133px @1440, fluide comme waabi
const PER_COL = 4;

type Col = { side: 'left' | 'right'; offset: string; parallax: boolean; seed: number };
const COLUMNS: Col[] = [
  { side: 'left', offset: '1.667%', parallax: true, seed: 0 }, // outer-left, drifts
  { side: 'left', offset: '16.667%', parallax: false, seed: 4 }, // inner-left, static
  { side: 'right', offset: '16.667%', parallax: false, seed: 8 }, // inner-right, static
  { side: 'right', offset: '1.667%', parallax: true, seed: 12 }, // outer-right, drifts
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
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      // waabi : ty +600 → −600 sur une fenêtre 900px → ±0.667·vh, même sens
      // pour les deux colonnes extérieures. Intérieures statiques.
      const amp = window.innerHeight * (600 / 900);
      const ctx = gsap.context(() => {
        const st = { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1 } as const;
        COLUMNS.forEach((c, i) => {
          if (!c.parallax) return;
          const el = colRefs.current[i];
          if (el) gsap.fromTo(el, { y: amp }, { y: -amp, ease: 'none', scrollTrigger: st });
        });
      }, section);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hair-rule relative w-full overflow-clip bg-[var(--color-bg-subtle)]"
      aria-label={kicker}
    >
      {/* DESKTOP — sparse edge-hugging constellation around a centred title.
          150vh tall, NOT pinned : the section scrolls past, only the outer
          columns drift (1:1 with waabi). */}
      <div className="relative hidden h-[150vh] w-full lg:block">
        {COLUMNS.map((c, ci) => (
          <div
            key={ci}
            ref={(el) => {
              colRefs.current[ci] = el;
            }}
            aria-hidden
            className="absolute top-0 flex h-[150vh] flex-col justify-between will-change-transform"
            style={{ [c.side]: c.offset, width: TILE } as React.CSSProperties}
          >
            {Array.from({ length: PER_COL }).map((_, t) => (
              <Tile key={t} src={images[(c.seed + t) % images.length]} />
            ))}
          </div>
        ))}

        {/* Centre accents — one above, one below the title (static, per user). */}
        <div
          aria-hidden
          className="absolute left-1/2 top-[16%] -translate-x-1/2"
          style={{ width: TILE }}
        >
          <Tile src={images[2 % images.length]} />
        </div>
        <div
          aria-hidden
          className="absolute bottom-[16%] left-1/2 -translate-x-1/2"
          style={{ width: TILE }}
        >
          <Tile src={images[10 % images.length]} />
        </div>

        {/* Centred title — centred across the full 150vh, scrolls with it. */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-8 text-center">
          <div className="caption mb-4">{kicker}</div>
          <h2 className="font-display font-light text-[var(--color-text)] text-[44px] md:text-[56px] leading-[1] md:leading-[0.98] tracking-[-0.03em] balance max-w-[560px]">
            {title}
          </h2>
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
