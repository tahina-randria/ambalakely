import { Container } from '@/components/atoms/Container';
import { Section } from '@/components/atoms/Section';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { Star } from '@phosphor-icons/react/dist/ssr';
import { reviews } from '@/lib/data/rooms';
import { HOTEL } from '@/lib/data/hotel';

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
            <h2 className="font-display font-light text-[var(--color-text)] text-[44px] md:text-[56px] leading-[1] tracking-[-0.03em] balance max-w-[720px]">
              What people say.
            </h2>
            {HOTEL.rating.value && HOTEL.rating.count ? (
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
                  {HOTEL.rating.value} sur 5 — {HOTEL.rating.count} avis sur{' '}
                  {HOTEL.rating.sources.join(' et ')}
                </div>
              </div>
            ) : (
              <div className="mt-8 caption text-[var(--color-text-muted)]">
                Avis vérifiés sur {HOTEL.rating.sources.join(' et ')}
              </div>
            )}
          </ScrollReveal>

          {/* Quotes — vertical stack with hairline rules.
              Magazine pull-quote treatment : large display type, single
              source label small caps on top, attribution under the quote
              with a thin connecting rule. */}
          <ul className="border-t border-[var(--color-border-subtle)]">
            {reviews.map((review, i) => (
              <ScrollReveal key={`${review.author}-${i}`} delay={i * 0.05}>
                <li className="border-b border-[var(--color-border-subtle)]">
                  <figure className="py-16 md:py-24 max-w-[920px]">
                    <div className="caption text-[var(--color-text-muted)]">
                      {review.source}
                    </div>
                    <blockquote className="mt-6 md:mt-8 font-display font-light text-[var(--color-text)] text-[26px] md:text-[36px] lg:text-[44px] leading-[1.25] md:leading-[1.2] tracking-[-0.02em] balance">
                      &ldquo;{review.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-8 md:mt-10 flex items-center gap-4">
                      <div className="w-10 border-t border-[var(--color-sand-12)]" />
                      <div className="font-display text-[16px] tracking-[-0.005em] text-[var(--color-text)]">
                        {review.author}
                      </div>
                      <div className="caption text-[var(--color-text-muted)]">
                        {review.city}
                      </div>
                    </figcaption>
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
