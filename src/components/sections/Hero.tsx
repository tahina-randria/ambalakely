'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { PHOTOS } from '@/lib/data/photos';

const VIDEO_SRC = '/videos/hero.mp4';
// Desktop fallback only — the actual mobile hero now uses the editorial
// PHOTOS.hero (p23) so users on cellular get a real photo of the building +
// rice paddies rather than a frozen frame of the video.
const VIDEO_POSTER = '/videos/hero-poster.webp';
const MOBILE_HERO = PHOTOS.hero.path;

export function Hero() {
  const t = useTranslations('Hero');
  const tCommon = useTranslations('Common');
  const videoRef = useRef<HTMLVideoElement>(null);
  const lines = t.raw('lines') as string[];

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
    <section className="relative h-[100svh] md:h-screen w-full overflow-hidden text-white isolate">
      {/* Mobile : editorial photo (PHOTOS.hero / p23) instead of the video
          poster frame. Saves the 2 MB MP4 on cellular AND ditches the
          "frozen video" look — users see the actual hotel + rice paddies
          composition that was curated as the canonical hero shot.
          object-[20%_55%] : pushed left to keep the wooden balcony at the
          edge of the building visible alongside the banana trees and the
          rice terraces, instead of mostly vegetation. */}
      <Image
        src={MOBILE_HERO}
        alt=""
        fill
        priority
        sizes="100vw"
        className="md:hidden -z-20 object-cover object-[20%_55%] hero-bg-settle"
      />

      {/* Desktop : autoplay loop video.
          `media` attribute on the source means the MP4 is only requested
          on viewports ≥ 768 px ; mobile users never download the file
          even though the <video> tag is in the DOM (CSS-hidden).
          preload="metadata" caps the bandwidth on desktop until autoplay
          decides to fetch frames — a polite default. */}
      <video
        ref={videoRef}
        aria-hidden="true"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={VIDEO_POSTER}
        className="hidden md:block absolute inset-0 -z-20 h-full w-full object-cover object-center hero-bg-settle"
      >
        <source src={VIDEO_SRC} type="video/mp4" media="(min-width: 768px)" />
      </video>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/35 via-black/10 to-black/60"
      />

      <div className="relative h-full w-full mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12 flex flex-col text-white">
        <div className="mt-auto pb-14 md:pb-20 max-w-[920px]">
          {/* H1 — multi-line, SEO-rich */}
          <h1 className="font-display font-light tracking-[-0.03em] text-white text-[44px] leading-[1.02] sm:text-[56px] sm:leading-[1] md:text-[68px] md:leading-[0.98] balance">
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

          {/* Subtitle */}
          <div
            className="hero-fade-up mt-6 md:mt-8 max-w-[640px] font-display font-light text-white/85 text-[18px] md:text-[22px] leading-[1.4] tracking-[-0.01em] balance"
            style={{ ['--fade-delay' as string]: '0.7s' }}
          >
            {t('subtitle')}
          </div>

          {/* CTA — single primary action. Social proof and stars are
              editorial noise in a hero; reviews live in the Reviews section. */}
          <div
            className="hero-fade-up mt-10 md:mt-12"
            style={{ ['--fade-delay' as string]: '0.95s' }}
          >
            <button
              type="button"
              onClick={openBooking}
              className="inline-flex items-center justify-center h-12 px-7 bg-white text-[var(--color-sand-12)] font-body text-[15px] font-medium transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:bg-[var(--color-sand-3)]"
            >
              {tCommon('checkAvailability')}
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}
