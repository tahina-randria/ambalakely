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
 * §61 — Hero "qui passe petit", mécanique waabi (mesurée au DOM) :
 *  - Section 250vh épinglée, FOND BEIGE (var --color-bg-subtle) — l'image se
 *    réduit dessus sur fond beige cohérent avec la constellation (pas de blanc).
 *  - L'image plein écran se réduit SUR PLACE, CENTRÉE (scale 1 → 0.15) et prend
 *    des coins arrondis (borderRadius 0 → 80px → ~12px visuel à l'échelle), comme
 *    les tuiles. mb-[-75vh] : la constellation (section séparée) remonte juste
 *    après et défile avec sa parallaxe.
 *  - Le titre h1 (taille standard) reste EN BAS À GAUCHE (comme PageHero) et
 *    s'efface tôt ; voile uniquement en bas (dégradé), qui part avec le titre.
 * Mobile + reduced-motion : hero statique bas-gauche, pas de pin.
 */
export function CommunityScrollHero({
  src,
  alt,
  title,
  subtitle,
}: {
  src: string;
  alt: string;
  title: string[];
  subtitle: string;
}) {
  const desktopRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useLayoutEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useLayoutEffect(() => {
    const trigger = desktopRef.current;
    if (!trigger) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger, start: 'top top', end: 'bottom bottom', scrub: 1 },
        });
        // title (bottom-left) rises + fades away early
        tl.fromTo(
          titleRef.current,
          { yPercent: 0, opacity: 1 },
          { yPercent: -45, opacity: 0, ease: 'power1.in', duration: 0.3 },
          0,
        );
        // image shrinks IN PLACE centred + rounds its corners (12px @ scale 0.15)
        tl.fromTo(
          imgRef.current,
          { scale: 1, borderRadius: 0 },
          { scale: 0.15, borderRadius: 80, ease: 'power2.inOut', duration: 0.5 },
          0.42,
        );
      }, trigger);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  const titleBlock = (
    <div className="mx-auto flex h-full max-w-[1440px] flex-col px-5 md:px-8 lg:px-12">
      <div className="mt-auto max-w-[920px] pb-14 md:pb-20">
        <h1 className="font-display font-light text-white text-[40px] md:text-[56px] leading-[1.02] tracking-[-0.03em] balance">
          {title.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h1>
        <p className="mt-4 max-w-[520px] font-body text-[15px] text-white/85 md:text-[17px]">
          {subtitle}
        </p>
      </div>
    </div>
  );

  return (
    <section
      className={cn(
        // Transparent: the beige comes from the wrapper behind, so the
        // constellation (z-10) shows THROUGH the hero as the image shrinks
        // (no opaque hero clipping the rising text).
        'relative w-full',
        reduced ? '' : 'lg:z-20 lg:mb-[-75vh]',
      )}
      aria-label={title.join(' ')}
    >
      {/* DESKTOP — pinned, beige stage; image shrinks centred with rounded corners */}
      <div ref={desktopRef} className={cn('h-[250vh]', reduced ? 'hidden' : 'hidden lg:block')}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <div
            ref={imgRef}
            className="absolute inset-0 [transform-origin:50%_50%] overflow-hidden will-change-transform"
          >
            <Image src={src} alt={alt} fill priority sizes="100vw" className="object-cover" />
          </div>
          <div ref={titleRef} className="absolute inset-0 z-10 will-change-transform">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/45 to-transparent" />
            <div className="relative h-full">{titleBlock}</div>
          </div>
        </div>
      </div>

      {/* MOBILE / reduced-motion — static hero, bottom-left */}
      <div
        className={cn(
          reduced ? 'block' : 'lg:hidden',
          'relative h-[85vh] min-h-[560px] w-full overflow-hidden',
        )}
      >
        <Image src={src} alt={alt} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <div className="absolute inset-0">{titleBlock}</div>
      </div>
    </section>
  );
}
