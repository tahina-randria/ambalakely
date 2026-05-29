'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ImagePlaceholder } from '@/components/atoms/ImagePlaceholder';
import { cn } from '@/lib/utils/cn';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type Item = { title: string; body: string; image?: string };

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * §52 — "Ce qu'on fait" en carrousel plein écran piloté au scroll (demande
 * user, remplace le sticky-split §48). Desktop : la section se fixe (CSS
 * sticky, comme FullBleedToSide) et le scroll vertical fait défiler les diapos
 * à l'horizontale (GSAP scrub, synchronisé Lenis). Mobile + reduced-motion :
 * carrousel natif scroll-snap (swipe), pas de pin. Chaque diapo est un panneau
 * sombre éditorial — l'ImagePlaceholder tient lieu de photo en attendant les
 * vraies (#99) ; une vraie <Image fill> viendra derrière le dégradé.
 */
function Slide({
  index,
  total,
  title,
  body,
  image,
  className,
}: {
  index: number;
  total: number;
  title: string;
  body: string;
  image?: string;
  className?: string;
}) {
  return (
    <article
      className={cn(
        'relative shrink-0 overflow-hidden bg-[var(--color-sand-12)] text-[var(--color-sand-1)]',
        className,
      )}
    >
      {/* Image — interim non-contractual Unsplash visual (#99). Falls back to
          the brand placeholder if no URL. */}
      {image ? (
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1024px) 100vw, 84vw"
          className="object-cover"
        />
      ) : (
        <ImagePlaceholder tone="dark" bare />
      )}
      {/* Scrims — flat darken + bottom gradient keep white text readable over
          any photo. */}
      <div aria-hidden className="absolute inset-0 bg-black/25" />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"
      />
      {/* Content — bottom-left editorial block. */}
      <div className="relative flex h-full flex-col justify-end p-8 md:p-14 lg:p-20">
        <div className="caption tabular-nums text-[var(--color-sand-4)]">
          {pad(index + 1)}
          <span className="text-[var(--color-sand-6)]"> / {pad(total)}</span>
        </div>
        <h3 className="mt-4 max-w-[18ch] font-display font-light text-[clamp(34px,5vw,64px)] leading-[1.02] tracking-[-0.03em]">
          {title}
        </h3>
        <p className="mt-5 max-w-[52ch] text-[16px] md:text-[18px] leading-[1.55] text-[var(--color-sand-3)]">
          {body}
        </p>
      </div>
    </article>
  );
}

export function CommunityPrograms({
  kicker,
  h2,
  items,
}: {
  kicker: string;
  h2: string;
  items: Item[];
}) {
  const total = items.length;
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  // Detect reduced-motion once on mount — used to swap the pinned desktop
  // variant for the native swipe carousel (which also serves mobile).
  useLayoutEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  // Desktop scrub — only on lg+ with motion allowed. gsap.matchMedia handles
  // enable/disable on breakpoint + reduced-motion changes, plus cleanup.
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.to(track, {
        // Translate the full track left by (its width − one viewport), i.e.
        // (N−1)×100vw, so the last slide lands flush. Function-based + invalidate
        // recompute on resize.
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });
    });

    return () => mm.revert();
  }, [total]);

  // First viewport shows slide 1; each subsequent slide costs ~90vh of scroll.
  const heightVh = 100 + (total - 1) * 90;

  return (
    <section className="hair-rule bg-[var(--color-bg-subtle)]" aria-label={kicker}>
      {/* Header */}
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12 pt-32 md:pt-48 lg:pt-56">
        <div className="caption text-center mb-4">{kicker}</div>
        <h2 className="font-display font-light text-[var(--color-text)] text-[44px] md:text-[56px] leading-[1] md:leading-[0.98] tracking-[-0.03em] balance text-center mx-auto max-w-[680px]">
          {h2}
        </h2>
      </div>

      {/* Desktop — pinned, scroll-scrubbed horizontal carousel. */}
      <div
        ref={sectionRef}
        className={cn('relative mt-20', reduced ? 'hidden' : 'hidden lg:block')}
        style={{ height: `${heightVh}vh` }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div ref={trackRef} className="flex h-full w-max will-change-transform">
            {items.map((it, i) => (
              <Slide
                key={it.title}
                index={i}
                total={total}
                title={it.title}
                body={it.body}
                image={it.image}
                className="h-full w-screen"
              />
            ))}
          </div>

          {/* Progress bar — pinned bottom, fills as the track scrubs. The
              per-slide number lives in each slide, so no counter here. */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 px-8 md:px-14 lg:px-20 pb-7">
            <div className="relative h-px w-full bg-[var(--color-sand-10)]">
              <div
                ref={progressRef}
                className="absolute inset-0 origin-left bg-[var(--color-sand-1)]"
                style={{ transform: 'scaleX(0)' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / reduced-motion — native swipe carousel. */}
      <div className={cn('mt-12 pb-32 md:pb-40', reduced ? 'block' : 'lg:hidden')}>
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-5 md:px-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((it, i) => (
            <Slide
              key={it.title}
              index={i}
              total={total}
              title={it.title}
              body={it.body}
              image={it.image}
              className="h-[70vh] w-[84vw] snap-center sm:w-[68vw] md:w-[56vw]"
            />
          ))}
          {/* Trailing spacer so the last card can settle past the edge. */}
          <div aria-hidden className="w-px shrink-0" />
        </div>
      </div>
    </section>
  );
}
