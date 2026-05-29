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
 * §60 — Hero "qui passe petit", mécanique exacte de waabi.ai (mesurée au DOM) :
 *  - Section 250vh, ÉPINGLÉE (sticky h-screen). Fond transparent.
 *  - L'image plein écran se réduit SUR PLACE, CENTRÉE (scale 1 → 0.15,
 *    transform-origin centre — waabi reste pile au centre 720,450). Départ
 *    retardé (~42 %) puis chute eased, comme waabi (image figée pleine page
 *    jusqu'à ~⅔ du scroll).
 *  - Le titre h1 (taille standard, centré) monte + s'efface tôt.
 *  - `mb-[-75vh]` : la constellation (section séparée, en dessous, z inférieur)
 *    remonte par TRANSPARENCE pendant que l'image rétrécit, puis le hero
 *    s'efface et la constellation défile avec sa parallaxe.
 * Mobile + reduced-motion : hero statique centré, pas de pin.
 */
export function CommunityScrollHero({
  src,
  alt,
  title,
}: {
  src: string;
  alt: string;
  title: string[];
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useLayoutEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: 1 },
        });
        // title rises + fades away early (waabi: title scrolls off in the first third)
        tl.fromTo(
          titleRef.current,
          { yPercent: 0, opacity: 1 },
          { yPercent: -55, opacity: 0, ease: 'power1.in', duration: 0.3 },
          0,
        );
        // image shrinks IN PLACE, centred (waabi: scale 1→0.148, stays at centre),
        // delayed then eased so it stays full-bleed through the first ~40%.
        tl.fromTo(
          imgRef.current,
          { scale: 1 },
          { scale: 0.15, ease: 'power2.inOut', duration: 0.5 },
          0.42,
        );
      }, section);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cn('relative w-full', reduced ? '' : 'hidden lg:block lg:z-20 lg:mb-[-75vh] lg:h-[250vh]')}
      aria-label={title.join(' ')}
    >
      {/* DESKTOP — pinned, transparent stage; image shrinks centred */}
      <div className="hidden h-full lg:block">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div
            ref={imgRef}
            className="absolute inset-0 [transform-origin:50%_50%] overflow-hidden will-change-transform"
          >
            <Image src={src} alt={alt} fill priority sizes="100vw" className="object-cover" />
          </div>
          <div
            ref={titleRef}
            className="absolute inset-0 z-10 flex items-center justify-center will-change-transform"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-black/25" />
            <h1 className="relative max-w-[900px] px-6 text-center font-display font-light text-white text-[44px] md:text-[56px] leading-[1.02] tracking-[-0.03em] balance">
              {title.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>
          </div>
        </div>
      </div>

      {/* MOBILE / reduced-motion — static centred hero */}
      <div
        className={cn(
          reduced ? 'block' : 'lg:hidden',
          'relative h-[85vh] min-h-[560px] w-full overflow-hidden',
        )}
      >
        <Image src={src} alt={alt} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-black/25" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="max-w-[820px] px-6 text-center font-display font-light text-white text-[40px] md:text-[52px] leading-[1.04] tracking-[-0.03em] balance">
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
