'use client';

import { useRef, useLayoutEffect, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils/cn';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type FullBleedToSideProps = {
  image: ReactNode;
  info: ReactNode;
  className?: string;
  endRadius?: number;
  scrollDistance?: number;
  infoSide?: 'left' | 'right';
  imageWidth?: number;
  imageHeight?: number;
  edgePadding?: number;
};

export function FullBleedToSide({
  image,
  info,
  className,
  endRadius = 32,
  scrollDistance = 280,
  infoSide = 'right',
  imageWidth = 62,
  imageHeight = 86,
  edgePadding = 5,
}: FullBleedToSideProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const imageSide: 'left' | 'right' = infoSide === 'right' ? 'left' : 'right';

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    const infoEl = infoRef.current;
    if (!section || !frame || !infoEl) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 1023px)').matches;

    if (prefersReduced || isMobile) {
      gsap.set(frame, { scale: 1, x: 0, borderRadius: endRadius });
      gsap.set(infoEl, { opacity: 1, x: 0 });
      return;
    }

    const scaleX = 100 / imageWidth;
    const scaleY = 100 / imageHeight;
    const initialScale = Math.max(scaleX, scaleY) * 1.02;

    const finalLeftVw =
      imageSide === 'left' ? edgePadding : 100 - edgePadding - imageWidth;
    const finalCenterVw = finalLeftVw + imageWidth / 2;
    const initialXOffsetVw = 50 - finalCenterVw;
    const infoStartX = infoSide === 'right' ? 30 : -30;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' }, // premium ease — slow start/end, confident middle
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${scrollDistance}vh`,
          scrub: 1.8,                        // strong smoothing buffer — premium feel
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      });

      // Hold full-bleed briefly at start, animate through middle, settle at end
      tl.fromTo(
        frame,
        {
          scale: initialScale,
          x: `${initialXOffsetVw}vw`,
          borderRadius: 0,
        },
        {
          scale: 1,
          x: '0vw',
          borderRadius: endRadius,
        },
        0,
      );

      tl.fromTo(
        infoEl,
        { opacity: 0, x: infoStartX },
        { opacity: 1, x: 0, ease: 'power2.out' },
        0.45, // starts after image is already moving
      );
    }, section);

    return () => ctx.revert();
  }, [endRadius, scrollDistance, infoSide, imageWidth, imageHeight, edgePadding, imageSide]);

  const scaleX = 100 / imageWidth;
  const scaleY = 100 / imageHeight;
  const initialScale = Math.max(scaleX, scaleY) * 1.02;
  const finalLeftVw =
    imageSide === 'left' ? edgePadding : 100 - edgePadding - imageWidth;
  const finalCenterVw = finalLeftVw + imageWidth / 2;
  const initialXOffsetVw = 50 - finalCenterVw;

  const frameStyle: React.CSSProperties = {
    position: 'absolute',
    top: `${(100 - imageHeight) / 2}vh`,
    [imageSide]: `${edgePadding}vw`,
    width: `${imageWidth}vw`,
    height: `${imageHeight}vh`,
    transformOrigin: 'center center',
    transform: `translate3d(${initialXOffsetVw}vw, 0, 0) scale(${initialScale})`,
    borderRadius: 0,
    willChange: 'transform, border-radius',
  };

  const infoPos = infoSide === 'right'
    ? { right: `${edgePadding + 1}vw` }
    : { left: `${edgePadding + 1}vw` };

  return (
    <section
      ref={sectionRef}
      className={cn('relative w-full overflow-hidden bg-[var(--color-bg)]', className)}
      style={{ height: '100vh' }}
    >
      {/* Mobile stacked */}
      <div className="lg:hidden flex flex-col h-full">
        <div className="relative flex-1 overflow-hidden min-h-[55vh]">{image}</div>
        <div className="px-5 py-12 flex flex-col justify-center">{info}</div>
      </div>

      {/* Desktop pinned + animated */}
      <div className="hidden lg:block absolute inset-0">
        <div
          ref={frameRef}
          className="overflow-hidden bg-[var(--color-bg-muted)]"
          style={frameStyle}
        >
          {image}
        </div>

        <div
          ref={infoRef}
          className={cn(
            'absolute top-[10vh] bottom-[10vh] w-[34vw] flex flex-col justify-center',
          )}
          style={{
            ...infoPos,
            opacity: 0,
            transform: `translate3d(${infoSide === 'right' ? 30 : -30}px, 0, 0)`,
            willChange: 'opacity, transform',
          }}
        >
          {info}
        </div>
      </div>
    </section>
  );
}
