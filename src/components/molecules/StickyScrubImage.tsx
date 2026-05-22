'use client';

import { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils/cn';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  src: string;
  alt: string;
  /** Caption shown small at bottom of image */
  caption?: string;
  className?: string;
};

/**
 * Cinematic sticky scrub : image starts edge-to-edge full-bleed, then on scroll
 * shrinks to a centered frame with rounded top corners (like the existing
 * Dining section pattern). 220vh container, sticky inside.
 *
 * Replicates the world-class "image grand puis se decale" effect.
 */
export function StickyScrubImage({ src, alt, caption, className }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    if (!section || !frame) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      gsap.set(frame, {
        top: '8vh',
        left: '8vw',
        right: '8vw',
        bottom: '8vh',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      }).fromTo(
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
          top: '8vh',
          left: '8vw',
          right: '8vw',
          bottom: '8vh',
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          ease: 'power4.out',
        },
        0,
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cn('relative', className)}
      style={{ height: '180vh' }}
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
          <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
        </div>
        {caption ? (
          <div
            aria-hidden
            className="absolute bottom-6 right-6 md:bottom-10 md:right-12 caption text-white/85 mix-blend-difference z-10"
          >
            {caption}
          </div>
        ) : null}
      </div>
    </section>
  );
}
