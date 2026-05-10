'use client';

import { useState } from 'react';
import { Container } from '@/components/atoms/Container';
import { Section } from '@/components/atoms/Section';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { ArrowLeft, ArrowRight, Star } from '@phosphor-icons/react/dist/ssr';
import { reviews } from '@/lib/data/rooms';

/**
 * Single rotating quote.
 * Header bar (rating + nav) is fixed at top so arrows don't shift when
 * quote length changes. Quote min-height keeps the layout stable.
 */
export function Reviews() {
  const [index, setIndex] = useState(0);
  const total = reviews.length;
  const current = reviews[index];

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <Section id="reviews" divider>
      <Container>
        <div className="max-w-[1100px]">
          {/* Header bar : caption + rating left, counter + arrows right.
              Fixed position, doesn't move when quote changes. */}
          <ScrollReveal>
            <div className="pb-8 md:pb-10 border-b border-[var(--color-border-subtle)] flex items-center justify-between gap-6 flex-wrap">
              <div className="flex items-center gap-6">
                <div className="caption">Guests</div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        weight="fill"
                        className="text-[var(--color-text)]"
                      />
                    ))}
                  </div>
                  <div className="caption text-[var(--color-text-muted)]">
                    4.9 · 127 reviews
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="font-mono text-[12px] tabular-nums uppercase tracking-[0.1em] text-[var(--color-text-muted)]">
                  {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous quote"
                    className="h-10 w-10 inline-flex items-center justify-center border border-[var(--color-border)] hover:border-[var(--color-text)] transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)]"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next quote"
                    className="h-10 w-10 inline-flex items-center justify-center border border-[var(--color-border)] hover:border-[var(--color-text)] transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)]"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Quote — min-height keeps layout stable across review lengths */}
          <ScrollReveal>
            <figure className="pt-12 md:pt-16 pb-10 min-h-[460px] md:min-h-[520px] lg:min-h-[560px] flex flex-col">
              <blockquote className="font-display font-light tracking-[-0.025em] text-[var(--color-text)] text-[28px] leading-[1.2] md:text-[40px] md:leading-[1.15] lg:text-[52px] lg:leading-[1.1] balance flex-1">
                &ldquo;{current.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-12 pt-6 border-t border-[var(--color-border-subtle)]">
                <div className="font-body text-[16px] font-medium text-[var(--color-text)]">
                  {current.author}
                </div>
                <div className="mt-1 font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--color-text-muted)]">
                  {current.city} · {current.source}
                </div>
              </figcaption>
            </figure>
          </ScrollReveal>
        </div>
      </Container>
    </Section>
  );
}
