'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils/cn';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type Item = { title: string; body: string; image: string };

/**
 * §65 — "Showcase" : fusion constellation + programmes en UNE section épinglée,
 * calquée sur waabi « Unlocking scale ». Mécanique (desktop, mesurée 1:1) :
 *  1. SCATTER : tuiles éparpillées + phrase d'intro centrée.
 *  2. CONVERGENCE (FLIP) : LA tuile « média » voyage (translate + scale) depuis
 *     sa position éparpillée jusqu'au slot image du bloc (à gauche). Les autres
 *     tuiles + l'intro s'effacent, la liste des piliers apparaît à droite.
 *  3. STEPS : les 4 piliers défilent (crossfade image + texte actif).
 * Mobile / reduced-motion : empilement simple (intro + mosaïque + piliers).
 */

// Decorative scatter tiles (desktop) — positions in viewport %, they fade out
// as the section converges. The travelling media tile is rendered separately.
type Scatter = { src: string; left?: string; right?: string; top: string; size: number };

export function CommunityShowcase({
  items,
  introLead,
  introRest,
  scatterImages,
}: {
  items: Item[];
  introLead: string;
  introRest: string;
  scatterImages: string[];
}) {
  const total = items.length;
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const tileRef = useRef<HTMLDivElement>(null); // travelling media tile
  const slotRef = useRef<HTMLDivElement>(null); // final block image slot (placeholder)
  const listRef = useRef<HTMLUListElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const scatterRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);

  useLayoutEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const mm = gsap.matchMedia();
    const TRAVEL = 0.3; // first 30 % of the pin = scatter → block convergence

    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      if (!section) return;
      const ctx = gsap.context(() => {
        const tile = tileRef.current!;
        const slot = slotRef.current!;
        const sticky = stickyRef.current!;

        // Size/position the travelling tile onto the final block slot, then FLIP
        // it back to a scattered start (translate + scale, origin top-left).
        const place = () => {
          const sRect = sticky.getBoundingClientRect();
          const fRect = slot.getBoundingClientRect();
          const slotLeft = fRect.left - sRect.left;
          const slotTop = fRect.top - sRect.top;
          gsap.set(tile, {
            top: slotTop,
            left: slotLeft,
            width: fRect.width,
            height: fRect.height,
            transformOrigin: 'top left',
          });
          const vw = window.innerWidth;
          const vh = window.innerHeight;
          const startSize = Math.min(160, vw * 0.115);
          const startLeft = vw * 0.13;
          const startTop = vh * 0.3;
          return {
            x: startLeft - slotLeft,
            y: startTop - slotTop,
            scale: startSize / fRect.width,
          };
        };

        let I = place();
        const ease = gsap.parseEase('power2.inOut');
        gsap.set(tile, { x: I.x, y: I.y, scale: I.scale });
        gsap.set(listRef.current, { opacity: 0, xPercent: 6 });

        // One scrubbed ScrollTrigger drives the whole choreography from scroll
        // progress, deterministically :
        //   0 → TRAVEL : tile FLIPs scatter→slot, decor+intro fade, list reveals
        //   TRAVEL → 1 : the four pillars step (image crossfade + active text)
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true,
          onRefresh: () => {
            I = place();
          },
          onUpdate: (self) => {
            const p = self.progress;
            const tp = ease(Math.min(1, p / TRAVEL));
            gsap.set(tile, {
              x: I.x * (1 - tp),
              y: I.y * (1 - tp),
              scale: I.scale + (1 - I.scale) * tp,
            });
            gsap.set(scatterRef.current, { opacity: 1 - Math.min(1, p / (TRAVEL * 0.8)) });
            const ip = Math.min(1, p / (TRAVEL * 0.7));
            gsap.set(introRef.current, { opacity: 1 - ip, yPercent: -8 * ip });
            const lp = Math.min(1, Math.max(0, (p - TRAVEL * 0.5) / (TRAVEL * 0.5)));
            gsap.set(listRef.current, { opacity: lp, xPercent: 6 * (1 - lp) });
            const sp = Math.max(0, (p - TRAVEL) / (1 - TRAVEL));
            const idx = Math.min(total - 1, Math.floor(sp * total));
            setActive((prev) => (prev === idx ? prev : idx));
          },
        });
      }, section);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, [total]);

  const goToStep = (i: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const range = section.offsetHeight - window.innerHeight;
    const TRAVEL = 0.3;
    const p = TRAVEL + ((i + 0.5) / total) * (1 - TRAVEL);
    window.scrollTo(0, Math.round(top + p * range));
  };

  // Scatter layout (desktop). The first decorative tile sits where the
  // travelling tile starts, so the convergence reads as "this tile flies in".
  const scatter: Scatter[] = [
    { src: scatterImages[2 % scatterImages.length], left: '6%', top: '15%', size: 150 },
    { src: scatterImages[5 % scatterImages.length], left: '24%', top: '63%', size: 132 },
    { src: scatterImages[7 % scatterImages.length], right: '7%', top: '17%', size: 158 },
    { src: scatterImages[9 % scatterImages.length], right: '17%', top: '60%', size: 138 },
    { src: scatterImages[11 % scatterImages.length], left: '43%', top: '10%', size: 116 },
    { src: scatterImages[13 % scatterImages.length], right: '31%', top: '9%', size: 116 },
  ];

  const heightVh = 130 + total * 56;

  return (
    <section
      ref={sectionRef}
      className={cn('relative w-full bg-[var(--color-bg-subtle)]', reduced ? '' : 'lg:z-10')}
    >
      {/* DESKTOP — pinned scatter → block → steps */}
      <div
        className={cn(reduced ? 'hidden' : 'hidden lg:block')}
        style={{ height: `${heightVh}vh` }}
      >
        <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden">
          {/* Decorative scattered tiles (fade out on convergence) */}
          <div ref={scatterRef} aria-hidden className="absolute inset-0">
            {scatter.map((s, i) => (
              <div
                key={i}
                className="absolute overflow-hidden rounded-[12px] bg-[var(--color-bg-muted)]"
                style={{
                  left: s.left,
                  right: s.right,
                  top: s.top,
                  width: s.size,
                  height: s.size,
                }}
              >
                <Image src={s.src} alt="" fill sizes="160px" className="object-cover" />
              </div>
            ))}
          </div>

          {/* Intro statement — centred, fades out */}
          <div
            ref={introRef}
            className="absolute inset-0 z-10 flex items-center justify-center px-8 text-center"
          >
            <p className="font-display font-light text-[21px] md:text-[25px] leading-[1.34] tracking-[-0.02em] max-w-[600px]">
              <span className="text-[var(--color-text-muted)]">{introLead} </span>
              <span className="text-[var(--color-text)]">{introRest}</span>
            </p>
          </div>

          {/* Block layout : left = slot (placeholder), right = pillar list */}
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="mx-auto w-full max-w-[1200px] px-8 lg:px-12">
              <div className="grid w-full grid-cols-2 items-center gap-14 xl:gap-20">
                <div ref={slotRef} className="aspect-square w-full" aria-hidden />
                <ul ref={listRef} className="flex flex-col gap-5 opacity-0">
                  {items.map((it, i) => {
                    const on = i === active;
                    return (
                      <li key={it.title}>
                        <button
                          type="button"
                          onClick={() => goToStep(i)}
                          aria-current={on ? 'true' : undefined}
                          className="block w-full text-left"
                        >
                          <span
                            className={cn(
                              'font-display font-light text-[32px] xl:text-[40px] leading-[1.1] tracking-[-0.03em] transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)]',
                              on ? 'text-[var(--color-text)]' : 'text-[var(--color-text-muted)]',
                            )}
                          >
                            {it.title}
                          </span>
                          <div
                            className={cn(
                              'grid transition-all duration-[var(--duration-slow)] ease-[var(--ease-standard)]',
                              on ? 'mt-2 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                            )}
                          >
                            <div className="overflow-hidden">
                              <p className="prose-editorial max-w-[44ch] pb-1">{it.body}</p>
                            </div>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          {/* Travelling media tile — absolute; FLIPs from scatter to slot, then
              crossfades through the pillar images while stepping. z above the
              empty slot, below nothing important. */}
          <div
            ref={tileRef}
            aria-hidden
            className="absolute z-20 overflow-hidden rounded-[16px] bg-[var(--color-bg-muted)] will-change-transform"
          >
            {items.map((it, i) => (
              <div
                key={it.title}
                className="absolute inset-0 transition-opacity duration-[700ms] ease-[var(--ease-standard)]"
                style={{ opacity: i === active ? 1 : 0 }}
              >
                <Image src={it.image} alt="" fill sizes="50vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE / reduced-motion — intro + mosaic + stacked pillars */}
      <div className={cn(reduced ? 'block' : 'lg:hidden', 'px-5 py-24 md:px-8 md:py-32')}>
        <div className="text-center">
          <p className="font-display font-light text-[19px] md:text-[22px] leading-[1.4] tracking-[-0.015em] mx-auto max-w-[460px]">
            <span className="text-[var(--color-text-muted)]">{introLead} </span>
            <span className="text-[var(--color-text)]">{introRest}</span>
          </p>
        </div>
        <div className="mt-12 space-y-16">
          {items.map((it) => (
            <article key={it.title}>
              <div className="relative aspect-square w-full overflow-hidden rounded-[16px] bg-[var(--color-bg-muted)]">
                <Image src={it.image} alt="" fill sizes="100vw" className="object-cover" />
              </div>
              <h3 className="mt-5 font-display font-light text-[28px] leading-[1.1] tracking-[-0.02em] text-[var(--color-text)]">
                {it.title}
              </h3>
              <p className="mt-2 prose-editorial">{it.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
