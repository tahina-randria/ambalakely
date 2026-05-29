'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils/cn';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * §57 — "constellation" gallery, stolen 1:1 from waabi.ai : un titre centré
 * encadré par des COLONNES pleine hauteur de tuiles carrées 133×133 (rounded
 * 12px). Les colonnes extérieures défilent plus vite que les intérieures
 * (parallaxe d'amplitudes différentes = profondeur / « delay »), plus deux
 * tuiles centrées au-dessus et en dessous du texte. Piloté au scroll (GSAP,
 * lissé Lenis). Colonnes intérieures masquées sous xl pour ne pas chevaucher
 * le titre. Mobile + reduced-motion : titre + mosaïque 2 colonnes, sans
 * parallaxe.
 */
const TILE = 133;

type Col = { side: 'left' | 'right'; offset: string; amp: number; show: string; seed: number };

// amp = parallax travel in px (sign = direction). Outer columns travel far
// (fast), inner columns gently. show = breakpoint at which the column appears.
const COLUMNS: Col[] = [
  { side: 'left', offset: '1.5%', amp: 200, show: 'lg:flex', seed: 0 }, // outer-left, fast
  { side: 'left', offset: '16%', amp: -86, show: 'hidden xl:flex', seed: 5 }, // inner-left, slow
  { side: 'right', offset: '16%', amp: 86, show: 'hidden xl:flex', seed: 9 }, // inner-right, slow
  { side: 'right', offset: '1.5%', amp: -200, show: 'lg:flex', seed: 12 }, // outer-right, fast
];
const PER_COL = 9;

function Tile({ src, size = TILE }: { src: string; size?: number }) {
  return (
    <div
      aria-hidden
      className="relative shrink-0 overflow-hidden rounded-[12px] bg-[var(--color-bg-muted)]"
      style={{ width: size, height: size }}
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
  const accentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const st = {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        } as const;
        COLUMNS.forEach((c, i) => {
          const el = colRefs.current[i];
          if (el) gsap.fromTo(el, { y: -c.amp }, { y: c.amp, ease: 'none', scrollTrigger: st });
        });
        // Centre accents drift gently, opposite each other.
        if (accentRefs.current[0])
          gsap.fromTo(accentRefs.current[0], { y: -44 }, { y: 44, ease: 'none', scrollTrigger: st });
        if (accentRefs.current[1])
          gsap.fromTo(accentRefs.current[1], { y: 44 }, { y: -44, ease: 'none', scrollTrigger: st });
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
      {/* DESKTOP — column constellation around a centred title */}
      <div className="relative hidden lg:block" style={{ height: '150vh' }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Parallax columns (extend past top/bottom so no gaps appear). */}
          {COLUMNS.map((c, ci) => (
            <div
              key={ci}
              ref={(el) => {
                colRefs.current[ci] = el;
              }}
              aria-hidden
              className={cn(
                'absolute top-[-260px] bottom-[-260px] hidden flex-col justify-center gap-4 will-change-transform',
                c.show,
              )}
              style={{ [c.side]: c.offset, width: TILE } as React.CSSProperties}
            >
              {Array.from({ length: PER_COL }).map((_, t) => (
                <Tile key={t} src={images[(c.seed + t) % images.length]} />
              ))}
            </div>
          ))}

          {/* Centre accents — one above, one below the title. */}
          <div
            ref={(el) => {
              accentRefs.current[0] = el;
            }}
            aria-hidden
            className="absolute left-1/2 top-[8%] -translate-x-1/2 will-change-transform"
          >
            <Tile src={images[3 % images.length]} size={116} />
          </div>
          <div
            ref={(el) => {
              accentRefs.current[1] = el;
            }}
            aria-hidden
            className="absolute bottom-[8%] left-1/2 -translate-x-1/2 will-change-transform"
          >
            <Tile src={images[7 % images.length]} size={116} />
          </div>

          {/* Centred title */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center">
            <div className="caption mb-4">{kicker}</div>
            <h2 className="font-display font-light text-[var(--color-text)] text-[44px] md:text-[56px] xl:text-[64px] leading-[1] md:leading-[0.98] tracking-[-0.03em] balance max-w-[560px]">
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
