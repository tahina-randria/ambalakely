import { Container } from '@/components/atoms/Container';
import { Section } from '@/components/atoms/Section';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { Star } from '@phosphor-icons/react/dist/ssr';
import { reviews } from '@/lib/data/rooms';

/**
 * Editorial 'what guests say' page.
 * All four real quotes visible at once, hairline-ruled list.
 * No rotation, no arrows. Confident magazine treatment.
 */
export function Reviews() {
  return (
    <Section id="reviews" divider>
      <Container>
        <div className="mx-auto max-w-[1100px]">
          {/* Header */}
          <ScrollReveal className="mb-16 md:mb-24">
            <div className="caption mb-6">Guests</div>
            <h2 className="font-display font-light text-[var(--color-text)] text-[44px] md:text-[64px] leading-[1] tracking-[-0.03em] balance max-w-[720px]">
              What people say.
            </h2>
            <div className="mt-8 flex items-center gap-3">
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
              <div className="caption text-[var(--color-text-muted)]">
                4.9 average across 127 reviews on TripAdvisor and Booking
              </div>
            </div>
          </ScrollReveal>

          {/* Quotes — vertical stack with hairline rules */}
          <ul className="border-t border-[var(--color-border-subtle)]">
            {reviews.map((review, i) => (
              <ScrollReveal key={`${review.author}-${i}`} delay={i * 0.05}>
                <li className="border-b border-[var(--color-border-subtle)]">
                  <figure className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 py-12 md:py-16">
                    {/* Source label, top-left */}
                    <div className="lg:col-span-3">
                      <div className="caption text-[var(--color-text-muted)]">
                        {review.source}
                      </div>
                      <div className="mt-3 font-display text-[18px] tracking-[-0.005em] text-[var(--color-text)]">
                        {review.author}
                      </div>
                      <div className="mt-1 caption text-[var(--color-text-muted)]">
                        {review.city}
                      </div>
                    </div>

                    {/* Quote */}
                    <blockquote className="lg:col-span-9 font-display font-light text-[var(--color-text)] text-[22px] md:text-[28px] lg:text-[32px] leading-[1.35] tracking-[-0.015em] balance max-w-[820px]">
                      &ldquo;{review.quote}&rdquo;
                    </blockquote>
                  </figure>
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
