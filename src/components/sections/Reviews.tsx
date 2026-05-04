'use client';

import { useState } from 'react';
import { Container } from '@/components/atoms/Container';
import { Section } from '@/components/atoms/Section';
import { Kicker } from '@/components/atoms/Kicker';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { ArrowLeft, ArrowRight, Star } from '@phosphor-icons/react/dist/ssr';
import { reviews } from '@/lib/data/rooms';

/**
 * Single rotating quote (Aman/Soneva pattern).
 * One large editorial quote at a time. Arrows to navigate. Quiet anticipation.
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
        <ScrollReveal className="mb-20 md:mb-24 flex items-end justify-between gap-8 flex-wrap">
          <Kicker>Guests</Kicker>

          <div className="flex items-center gap-3">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  weight="fill"
                  className="text-[var(--color-text)]"
                />
              ))}
            </div>
            <div className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--color-text-muted)]">
              4.9 · 127 reviews
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <figure className="max-w-[1100px]">
            <blockquote className="font-display font-light tracking-[-0.025em] text-[var(--color-text)] text-[32px] leading-[1.15] md:text-[48px] md:leading-[1.1] lg:text-[60px] lg:leading-[1.08] balance">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            <figcaption className="mt-16 pt-6 border-t border-[var(--color-border-subtle)] flex items-end justify-between gap-6">
              <div>
                <div className="font-body text-[16px] font-medium text-[var(--color-text)]">
                  {current.author}
                </div>
                <div className="mt-1 font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--color-text-muted)]">
                  {current.city} · {current.source}
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
            </figcaption>
          </figure>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
