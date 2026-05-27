import { getLocale, getTranslations } from 'next-intl/server';
import { Container } from '@/components/atoms/Container';
import { Section } from '@/components/atoms/Section';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { fetchReviews, fetchHotel } from '@/sanity/lib/fetch';
import { ReviewsCarousel } from '@/components/molecules/ReviewsCarousel';

/**
 * Home "guests say" — current state after §35 (2026-05-27 evening) :
 * H2 + Embla horizontal carousel of 11 trilingual quotes (9 TripAdvisor
 * + 2 Google) + two outbound CTAs (TripAdvisor / Google). The verified-
 * review stat counter ("32") that previously sat top-right was removed
 * per user direction "retire le nombre d'avis" — the source pill on
 * each card and the two outbound links already carry the trust signal.
 *
 * Cards use the Contra / MasterClass premium card pattern (Mobbin §32
 * inspiration set) : white card, source pill top, Phosphor Quotes icon,
 * display-serif quote line-clamped 7 lines, hair-rule + author+date.
 */
export async function Reviews() {
  const locale = await getLocale();
  const [reviews, HOTEL, t] = await Promise.all([
    fetchReviews(locale),
    fetchHotel(locale),
    getTranslations('Reviews'),
  ]);

  // The outbound CTA block is gated on `hasCount` so we only flex
  // "read the rest on TripAdvisor / Google" once we have a verified
  // count from HOTEL.rating (cardinal rule §3 : no fake claims).
  const hasCount = HOTEL.rating.count != null;

  return (
    <Section id="reviews" divider>
      <Container>
        <div className="mx-auto max-w-[1280px]">
          {/* Header — H2 only. §35 (2026-05-27 evening) the verified-
              review stat counter ("32" + caption) was removed per user
              direction "retire le nombre d'avis". Each card already
              shows its source pill (TripAdvisor / Google), the H2
              speaks for itself, and the outbound links below cover
              the trust signal. */}
          <ScrollReveal className="mb-12 md:mb-16">
            <h2 className="font-display font-light text-[var(--color-text)] text-[44px] md:text-[56px] leading-[1] tracking-[-0.03em] balance max-w-[720px]">
              {t('h2')}
            </h2>
          </ScrollReveal>

          {/* Carousel — pass localized data + a11y labels */}
          <ScrollReveal>
            <ReviewsCarousel
              reviews={reviews}
              prevLabel={t('prevReview')}
              nextLabel={t('nextReview')}
            />
          </ScrollReveal>

          {/* Outbound CTAs — both review platforms (TripAdvisor +
              Google) get an outbound link §34 (2026-05-27 afternoon)
              user direction "et pas mettre que tripadvisor en lien".
              Each opens the live feed in a new tab. The /avis dedicated
              page was killed §32bis — the carousel covers our curated
              quotes, the outbound links cover the long-tail. */}
          {hasCount ? (
            <ScrollReveal className="mt-12 md:mt-16 flex flex-wrap items-baseline gap-x-10 gap-y-4">
              {HOTEL.reviewUrls?.tripadvisor ? (
                <a
                  href={HOTEL.reviewUrls.tripadvisor}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 font-body text-[15px] font-medium text-[var(--color-text)]"
                >
                  {t('readOnTripadvisor')}
                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              ) : null}
              {HOTEL.reviewUrls?.google ? (
                <a
                  href={HOTEL.reviewUrls.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 font-body text-[15px] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors duration-[var(--duration-base)]"
                >
                  {t('readOnGoogle')}
                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              ) : null}
            </ScrollReveal>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
