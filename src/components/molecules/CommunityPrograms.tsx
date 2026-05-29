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
export function CommunityPrograms({ items }: { items: Item[] }) {
  const total = items.length;
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);

  useLayoutEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const idx = Math.min(total - 1, Math.floor(self.progress * total));
          setActive((prev) => (prev === idx ? prev : idx));
        },
      });
      return () => st.kill();
    });
    return () => mm.revert();
  }, [total]);

  // Click a title → jump to the middle of that step's scroll slice.
  const goToStep = (i: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const range = section.offsetHeight - window.innerHeight;
    window.scrollTo(0, Math.round(top + ((i + 0.5) / total) * range));
  };

  // First viewport reads the section; each step then costs ~50vh of scroll.
  const heightVh = 100 + total * 50;

  return (
    <section className="bg-[var(--color-bg-subtle)]">
      {/* DESKTOP — waabi-style pinned scrollytelling (header lives in the
          CommunityGallery section directly above). */}
      <div
        ref={sectionRef}
        className={cn('relative', reduced ? 'hidden' : 'hidden lg:block')}
        style={{ height: `${heightVh}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="mx-auto flex h-full max-w-[1200px] items-center px-8 lg:px-12">
            <div className="grid w-full grid-cols-2 items-center gap-14 xl:gap-20">
              {/* Media — crossfading rounded square */}
              <div className="relative aspect-square w-full overflow-hidden rounded-[12px] bg-[var(--color-bg-muted)]">
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
              <ul className="flex flex-col gap-1.5">
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
                            'font-display font-light text-[26px] xl:text-[32px] leading-[1.15] tracking-[-0.02em] transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)]',
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
              <div className="relative aspect-square w-full overflow-hidden rounded-[12px] bg-[var(--color-bg-muted)]">
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
