'use client';

/**
 * Horizontal scroll of verified guest reviews — Contra / MasterClass
 * inspired (Mobbin §32 #121). Embla-powered (already in deps from §19
 * stack install). Server parent passes the locale-aware quotes array;
 * this component handles motion + buttons only — no data fetching.
 *
 * Why Embla and not CSS scroll-snap : Embla gives us proper previous /
 * next buttons that disable at edges, a clean snap, and no native
 * scrollbar UI. The library is ~3 kB gzipped and is a one-shot import
 * already paid for at the page level.
 */

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight, Quotes } from '@phosphor-icons/react/dist/ssr';
import type { Review } from '@/lib/data/reviews';

type Props = {
  reviews: readonly Review[];
  prevLabel: string;
  nextLabel: string;
};

export function ReviewsCarousel({ reviews, prevLabel, nextLabel }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    skipSnaps: false,
    dragFree: false,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative">
      {/* Carousel viewport — viewport is the clipped strip; container holds
          the slides side-by-side. */}
      <div className="overflow-hidden -mx-5 md:-mx-8 px-5 md:px-8" ref={emblaRef}>
        <ul className="flex gap-5 md:gap-7">
          {reviews.map((review, i) => (
            <li
              key={`${review.author}-${i}`}
              className="shrink-0 w-[85vw] sm:w-[420px] md:w-[440px]"
            >
              <figure className="h-full flex flex-col bg-[var(--color-bg)] border border-[var(--color-border-subtle)] p-7 md:p-9">
                {/* Source pill — micro caps, sand color */}
                <div className="caption text-[var(--color-text-muted)] mb-6">
                  {review.source}
                </div>

                {/* Phosphor Quotes icon — discreet design-y marker, replaces
                    the orphan « that read unfinished (no closing »). Light
                    weight, sand-9 to stay subtle against the editorial
                    quote text. §32bis (2026-05-27 user feedback). */}
                <Quotes
                  size={26}
                  weight="light"
                  className="text-[var(--color-sand-9)] mb-5"
                  aria-hidden
                />


                {/* Quote — display serif, line-clamp 7 to keep card heights even */}
                <blockquote className="font-display font-light text-[var(--color-text)] text-[17px] md:text-[19px] leading-[1.45] tracking-[-0.01em] balance line-clamp-[7] mb-8 flex-1">
                  {review.quote}
                </blockquote>

                {/* Attribution — hair rule + author + date */}
                <figcaption className="pt-5 border-t border-[var(--color-border-subtle)] flex flex-col gap-1">
                  <div className="font-display text-[15px] tracking-[-0.005em] text-[var(--color-text)]">
                    {review.author}
                  </div>
                  <div className="caption text-[var(--color-text-muted)]">
                    {[review.city, review.date].filter(Boolean).join(' · ')}
                  </div>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      {/* Navigation arrows — hidden on touch (where users swipe), shown
          on md+ where mouse / trackpad users need affordance. Disabled
          state goes opacity-30 + cursor-not-allowed. */}
      <div className="hidden md:flex items-center gap-3 mt-8 md:mt-10">
        <button
          type="button"
          onClick={scrollPrev}
          disabled={!canPrev}
          aria-label={prevLabel}
          className="size-12 inline-flex items-center justify-center border border-[var(--color-border-subtle)] hover:border-[var(--color-sand-12)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)]"
        >
          <ArrowLeft size={18} className="text-[var(--color-text)]" aria-hidden />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          disabled={!canNext}
          aria-label={nextLabel}
          className="size-12 inline-flex items-center justify-center border border-[var(--color-border-subtle)] hover:border-[var(--color-sand-12)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)]"
        >
          <ArrowRight size={18} className="text-[var(--color-text)]" aria-hidden />
        </button>
      </div>
    </div>
  );
}
