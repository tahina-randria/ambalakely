import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/atoms/Container';
import { Section } from '@/components/atoms/Section';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { fetchReviews } from '@/sanity/lib/fetch';

/**
 * Homepage "guests say" — 3 quotes max in a dense grid.
 * Pattern Stripe/Pasaia : compact, source-labeled, attribution clear.
 * Full set of 9 lives at `/avis`.
 *
 * Data: Sanity (with .ts fallback via fetchReviews/fetchHotel).
 */
export async function Reviews() {
  const [allReviews, t] = await Promise.all([
    fetchReviews(),
    getTranslations('Reviews'),
  ]);
  const reviews = allReviews.slice(0, 3);
  return (
    <Section id="reviews" divider>
      <Container>
        <div className="mx-auto max-w-[1280px]">
          {/* Header */}
          <ScrollReveal className="mb-12 md:mb-16">
            <h2 className="font-display font-light text-[var(--color-text)] text-[44px] md:text-[56px] leading-[1] tracking-[-0.03em] balance max-w-[720px]">
              {t('h2')}
            </h2>
            {/* "Avis vérifiés sur TripAdvisor & Booking" rating caption
                removed — each quote already shows its source label above
                the quote ("TripAdvisor", "Booking"). The repetition added
                noise without trust value. i18n keys ratingWithNumber and
                ratingNoNumber preserved for /avis where this line still
                makes sense. */}
          </ScrollReveal>

          {/* Three quotes in a 3-col grid (md+). Premium editorial card :
              big decorative guillemet pull-mark, larger quote, attribution
              with author + city · date · source on one line below a hair
              rule.  No inner padding hierarchy — each card breathes on its
              own grid cell. */}
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 border-t border-[var(--color-border-subtle)] pt-14 md:pt-20">
            {reviews.map((review, i) => (
              <ScrollReveal key={`${review.author}-${i}`} delay={i * 0.06}>
                <li>
                  <figure className="flex flex-col">
                    {/* Big decorative guillemet — pull-quote signal, aria-hidden */}
                    <span
                      aria-hidden="true"
                      className="font-display font-light text-[var(--color-sand-7)] text-[64px] leading-[0.5] tracking-[-0.05em] mb-3 select-none"
                    >
                      «
                    </span>
                    <blockquote className="font-display font-light text-[var(--color-text)] text-[20px] md:text-[22px] leading-[1.4] tracking-[-0.015em] balance">
                      {review.quote}
                    </blockquote>
                    <figcaption className="mt-8 flex flex-col gap-1.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 border-t border-[var(--color-sand-12)]" />
                        <div className="font-display text-[15px] tracking-[-0.005em] text-[var(--color-text)]">
                          {review.author}
                        </div>
                      </div>
                      <div className="pl-11 caption text-[var(--color-text-muted)]">
                        {[review.city, review.date, review.source].filter(Boolean).join(' · ')}
                      </div>
                    </figcaption>
                  </figure>
                </li>
              </ScrollReveal>
            ))}
          </ul>

          <ScrollReveal className="mt-12 md:mt-16">
            <Link
              href="/avis"
              className="group inline-flex items-center gap-2 font-body text-[15px] font-medium text-[var(--color-text)]"
            >
              {t('viewAll', { count: allReviews.length })}
              <ArrowRight
                size={18}
                className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1.5"
              />
            </Link>
          </ScrollReveal>
        </div>
      </Container>
    </Section>
  );
}
