'use client';

import { useEffect, useRef } from 'react';
import { ArrowDown } from '@phosphor-icons/react/dist/ssr';

const VIDEO_SRC = '/videos/hero.mp4';
const VIDEO_POSTER = '/videos/hero-poster.webp';

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lines = [
    'Hôtel Ambalakely.',
    'Ten rooms in the highlands',
    'of Madagascar.',
  ];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause();
    }
  }, []);

  const openBooking = () => {
    window.dispatchEvent(new Event('open-booking'));
  };

  return (
    <section className="relative h-screen w-full overflow-hidden text-white isolate">
      <video
        ref={videoRef}
        aria-hidden="true"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={VIDEO_POSTER}
        className="absolute inset-0 -z-20 h-full w-full object-cover hero-bg-settle"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/35 via-black/10 to-black/60"
      />

      <div className="relative h-full w-full mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12 flex flex-col text-white">
        <div className="mt-auto pb-14 md:pb-20 max-w-[920px]">
          {/* H1 — multi-line, SEO-rich */}
          <h1 className="font-display font-light tracking-[-0.03em] text-white text-[56px] leading-[1] balance">
            {lines.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <span
                  className="block hero-line-reveal"
                  style={{ ['--line-delay' as string]: `${0.25 + i * 0.09}s` }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          {/* CTA */}
          <div
            className="hero-fade-up mt-10 md:mt-14"
            style={{ ['--fade-delay' as string]: '0.95s' }}
          >
            <button
              type="button"
              onClick={openBooking}
              className="group inline-flex items-center gap-2 h-12 px-7 bg-white text-[var(--color-sand-12)] font-body text-[15px] font-medium transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:bg-[var(--color-sand-3)]"
            >
              Check availability
              <ArrowDown
                size={16}
                className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-y-0.5"
              />
            </button>
          </div>
        </div>
      </div>

      <div
        className="hero-fade-up absolute bottom-8 right-5 md:right-8 lg:right-12 text-white/70 text-[20px] leading-none"
        style={{ ['--fade-delay' as string]: '1.2s' }}
        aria-hidden="true"
      >
        ↓
      </div>
    </section>
  );
}
