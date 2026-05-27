import { getLocale, getTranslations } from 'next-intl/server';
import { Container } from '@/components/atoms/Container';
import { Section } from '@/components/atoms/Section';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { fetchReviews, fetchHotel } from '@/sanity/lib/fetch';
import { ReviewsCarousel } from '@/components/molecules/ReviewsCarousel';

/**
 * Home "guests say" — refonte §32 #121 (2026-05-27).
 *
 * Before : 3-card grid (slice 0-3) with a "Voir tous les avis" link to
 * /avis. The user found the design slop ; the truncation hid the social
 * proof (we have 32 verified reviews on TripAdvisor) and the card style
 * was generic.
 *
 * After : (1) verified-review counter "32 avis vérifiés depuis 2018" as
 * trust signal up top, (2) horizontal Embla scroll of the 9 curated
 * quotes (no slice — they're all good), (3) two outbound CTAs : /avis
 * for the editorial archive + TripAdvisor for the full feed.
 *
 * Cards use the Contra / MasterClass premium card style (Mobbin §32 #121
 * inspiration set) : white card, source pill top, big « guillemet,
 * display-serif quote line-clamped 7 lines, hair-rule + author+date.
 */
export async function Reviews() {
  const locale = await getLocale();
  const [reviews, HOTEL, t] = await Promise.all([
    fetchReviews(locale),
    fetchHotel(locale),
    getTranslations('Reviews'),
  ]);

  const hasCount = HOTEL.rating.count != null;
  const sources = HOTEL.rating.sources.join(' / ');

  return (
    <Section id="reviews" divider>
      <Container>
        <div className="mx-auto max-w-[1280px]">
          {/* Header — H2 + verified-review stat counter */}
          <ScrollReveal className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-12">
            <h2 className="font-display font-light text-[var(--color-text)] text-[44px] md:text-[56px] leading-[1] tracking-[-0.03em] balance max-w-[640px]">
              {t('h2')}
            </h2>

            {/* Stat — only renders if HOTEL.rating.count is set
                (cardinal rule §3 : no fake numbers without source).
                §34 (2026-05-27 afternoon) : dropped the trailing
                "depuis 2018" — the hotel actually opened in September
                2014, and the year hint was misleading. Sources line
                stays so the platforms read at a glance. */}
            {hasCount ? (
              <div className="md:text-right">
                <div className="font-display font-light text-[var(--color-text)] text-[40px] md:text-[48px] leading-[1] tracking-[-0.025em] tabular-nums">
                  {HOTEL.rating.count}
                </div>
                <div className="mt-2 caption text-[var(--color-text-muted)]">
                  {t('statSince', { sources })}
                </div>
              </div>
            ) : null}
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
