'use client';

import { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Kicker } from '@/components/atoms/Kicker';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { PHOTOS } from '@/lib/data/photos';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const tonight = [
  'Zébu Marengo, herbes du jardin et vin de Fianar',
  'Kjøttkaker, haricots des rizières',
  'Krumkake, sorbet maison',
];

export function Dining() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    const text = textRef.current;
    if (!section || !frame || !text) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      gsap.set(frame, {
        top: '12vh',
        left: '6vw',
        right: '30vw',
        bottom: '12vh',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
      });
      gsap.set(text, { opacity: 1, x: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      });

      tl.fromTo(
        frame,
        {
          top: '0vh',
          left: '0vw',
          right: '0vw',
          bottom: '0vh',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        },
        {
          top: '12vh',
          left: '6vw',
          right: '30vw',
          bottom: '12vh',
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          ease: 'power4.out',
        },
        0,
      );

      tl.fromTo(
        text,
        { opacity: 0, x: 32 },
        { opacity: 1, x: 0, ease: 'power3.out' },
        0.2,
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="dining"
      className="relative"
      style={{ height: '220vh' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[var(--color-bg)]">
        <div
          ref={frameRef}
          className="absolute overflow-hidden bg-[var(--color-bg-muted)]"
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            willChange: 'top, left, right, bottom, border-radius',
          }}
        >
          <Image
            src={PHOTOS.diningSection.path}
            alt="Salle à manger du restaurant Toko Telo"
            fill
            sizes="100vw"
            className="object-cover"
            priority={false}
          />
        </div>

        <div
          ref={textRef}
          className="absolute flex flex-col justify-center will-change-[opacity,transform]"
          style={{
            right: '6vw',
            left: '74vw',
            top: '12vh',
            bottom: '12vh',
            opacity: 0,
            transform: 'translate3d(32px, 0, 0)',
          }}
        >
          <Kicker>Restaurant</Kicker>

          <h2 className="mt-8 font-display font-light tracking-[-0.03em] text-[var(--color-text)] text-[44px] leading-[1] md:text-[56px] md:leading-[0.98]">
            Toko Telo.
          </h2>

          <p className="mt-6 text-[16px] leading-[1.55] text-[var(--color-text-muted)]">
            Cinquante couverts. Produits des Tantsaha, les maraîchers d&apos;à
            côté. Cuisine malgache, française et norvégienne au même menu.
          </p>

          <div className="mt-8 pt-6 border-t border-[var(--color-border-subtle)]">
            <div className="font-mono text-[13px] uppercase tracking-[0.1em] text-[var(--color-text-muted)]">
              Ce soir
            </div>
            <ul className="mt-4 flex flex-col gap-2">
              {tonight.map((dish) => (
                <li
                  key={dish}
                  className="font-display text-[17px] tracking-[-0.01em] text-[var(--color-text)] italic leading-[1.35]"
                >
                  {dish}
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/dining"
            className="mt-10 inline-flex items-center gap-2 font-body text-[15px] font-medium text-[var(--color-text)] group"
          >
            Lire sur Toko Telo
            <ArrowRight
              size={16}
              className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
