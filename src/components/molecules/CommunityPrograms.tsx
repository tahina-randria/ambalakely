'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils/cn';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type Item = { title: string; body: string; image?: string };

/**
 * §53 — "Ce qu'on fait" en scrollytelling épinglé, modelé sur waabi.ai (réf.
 * user). Desktop : la section se fixe (CSS sticky, comme FullBleedToSide) ;
 * à gauche un cadre média carré (rounded 12px) fait un crossfade entre les
 * activités, à droite la liste des titres — l'actif passe en sombre et révèle
 * sa description, les autres restent en gris. Pas de compteur. L'étape active
 * est calculée depuis la progression du scroll (GSAP ScrollTrigger, lissé par
 * Lenis). Mobile + reduced-motion : empilement simple image + titre + texte,
 * pas de pin (waabi lui-même n'épingle que sous `md:`).
 */
export function CommunityPrograms({
  items,
  kicker,
  title,
}: {
  items: Item[];
  kicker?: string;
  title?: string;
}) {
  const total = items.length;
  const sectionRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);

  useLayoutEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const mm = gsap.matchMedia();
    const INTRO = 0.24; // first slice of the pin = image shrinks + list reveals

    // Heading reveals word by word on enter (waabi-style), all viewports.
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const words = headingRef.current?.querySelectorAll('[data-word]');
      if (!words || !words.length) return;
      const tween = gsap.from(words, {
        opacity: 0,
        yPercent: 50,
        duration: 0.55,
        ease: 'power3.out',
        stagger: 0.05,
        scrollTrigger: { trigger: headingRef.current, start: 'top 88%', once: true },
      });
      return () => tween.scrollTrigger?.kill();
    });

    // Desktop: the media "dégrossit" (1.22 → 1) while the list reveals, then the
    // pillars step through the remaining scroll — mirrors waabi's "Unlocking
    // scale" block (big image first, shrinks, then the steps play).
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      if (!section) return;
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: 1 },
        });
        tl.fromTo(mediaRef.current, { scale: 1.22 }, { scale: 1, ease: 'power2.out', duration: INTRO }, 0);
        tl.fromTo(
          listRef.current,
          { opacity: 0, xPercent: 6 },
          { opacity: 1, xPercent: 0, ease: 'power2.out', duration: INTRO * 0.85 },
          0.03,
        );
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: (self) => {
            const p = Math.max(0, (self.progress - INTRO) / (1 - INTRO));
            const idx = Math.min(total - 1, Math.floor(p * total));
            setActive((prev) => (prev === idx ? prev : idx));
          },
        });
      }, section);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [total]);

  // Click a title → jump to the middle of that step's scroll slice.
  const goToStep = (i: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const range = section.offsetHeight - window.innerHeight;
    const INTRO = 0.24;
    const p = INTRO + ((i + 0.5) / total) * (1 - INTRO);
    window.scrollTo(0, Math.round(top + p * range));
  };

  // First viewport reads the section; each step then costs ~50vh of scroll.
  const heightVh = 100 + total * 50;

  return (
    <section className="bg-[var(--color-bg-subtle)]">
      {/* Section header — introduces the eight programs. The gallery above now
          carries the Hope for the Future intro, so the heading lives here. */}
      {(kicker || title) && (
        <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12 pt-28 md:pt-36 lg:pt-44 text-center">
          {kicker && <div className="caption mb-4">{kicker}</div>}
          {title && (
            <h2
              ref={headingRef}
              className="font-display font-light text-[var(--color-text)] text-[44px] md:text-[56px] leading-[1] md:leading-[0.98] tracking-[-0.03em] balance mx-auto max-w-[680px]"
            >
              {title.split(' ').map((w, i, arr) => (
                <span key={i} data-word className="inline-block will-change-[transform,opacity]">
                  {w}
                  {i < arr.length - 1 ? ' ' : ''}
                </span>
              ))}
            </h2>
          )}
        </div>
      )}

      {/* DESKTOP — waabi-style pinned scrollytelling. */}
      <div
        ref={sectionRef}
        className={cn('relative', reduced ? 'hidden' : 'hidden lg:block')}
        style={{ height: `${heightVh}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="mx-auto flex h-full max-w-[1200px] items-center px-8 lg:px-12">
            <div className="grid w-full grid-cols-2 items-center gap-14 xl:gap-20">
              {/* Media — crossfading rounded square; "dégrossit" (shrinks) on enter */}
              <div
                ref={mediaRef}
                className="relative aspect-square w-full overflow-hidden rounded-[16px] bg-[var(--color-bg-muted)] [transform-origin:50%_50%] will-change-transform"
              >
                {items.map((it, i) => (
                  <div
                    key={it.title}
                    aria-hidden={i !== active}
                    className="absolute inset-0 transition-opacity duration-[700ms] ease-[var(--ease-standard)]"
                    style={{ opacity: i === active ? 1 : 0 }}
                  >
                    {it.image ? (
                      <Image src={it.image} alt="" fill sizes="50vw" className="object-cover" />
                    ) : null}
                  </div>
                ))}
              </div>

              {/* Stepping list — active = dark + description, rest greyed. */}
              <ul ref={listRef} className="flex flex-col gap-5">
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
                            on
                              ? 'text-[var(--color-text)]'
                              : 'text-[var(--color-text-muted)]',
                          )}
                        >
                          {it.title}
                        </span>
                        {/* Description — smooth grid-rows expand for the active item. */}
                        <div
                          className={cn(
                            'grid transition-all duration-[var(--duration-base)] ease-[var(--ease-standard)]',
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
      </div>

      {/* MOBILE / reduced-motion — stacked, no pin (waabi drops sticky < md). */}
      <div className={cn('mt-12 pb-32 md:pb-40', reduced ? 'block' : 'lg:hidden')}>
        <div className="mx-auto max-w-[680px] px-5 md:px-8 space-y-16 md:space-y-20">
          {items.map((it) => (
            <article key={it.title}>
              <div className="relative aspect-square w-full overflow-hidden rounded-[16px] bg-[var(--color-bg-muted)]">
                {it.image ? (
                  <Image src={it.image} alt="" fill sizes="100vw" className="object-cover" />
                ) : null}
              </div>
              <h3 className="mt-6 font-display font-light text-[var(--color-text)] text-[28px] leading-[1.1] tracking-[-0.02em]">
                {it.title}
              </h3>
              <p className="mt-3 prose-editorial">{it.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
