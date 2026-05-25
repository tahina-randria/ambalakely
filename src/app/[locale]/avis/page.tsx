import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { BreadcrumbJsonLd } from '@/components/atoms/JsonLd';
import { BookingButton } from '@/components/atoms/BookingButton';
import { PageHero } from '@/components/molecules/PageHero';
import { PHOTOS } from '@/lib/data/photos';
import { fetchHotel, fetchReviews } from '@/sanity/lib/fetch';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';

type LocaleParam = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: LocaleParam): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AvisPage' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: '/avis' },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: '/avis',
    },
  };
}

export default async function AvisPage({ params }: LocaleParam) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [HOTEL, reviews, t] = await Promise.all([
    fetchHotel(),
    fetchReviews(),
    getTranslations('AvisPage'),
  ]);

  const heroTitle = t.raw('heroTitle') as string[];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: t('breadcrumbHome'), url: '/' },
          { name: t('breadcrumbAvis'), url: '/avis' },
        ]}
      />
      <Nav />
      <main id="main">
        <PageHero
          src={PHOTOS.story.path}
          alt={t('heroAlt')}
          title={heroTitle}
          hideCta
        />

        {/* Intro */}
        <section className="py-32 md:py-48 lg:py-56">
          <div className="mx-auto max-w-[700px] px-5 md:px-8">
            <ScrollReveal>
              <p className="lede-display">{t('intro', { count: reviews.length })}</p>
            </ScrollReveal>
            {HOTEL.rating.value && HOTEL.rating.count ? (
              <ScrollReveal delay={0.05}>
                <div className="mt-8 caption text-[var(--color-text-muted)]">
                  {t('ratingLine', {
                    value: HOTEL.rating.value,
                    count: HOTEL.rating.count,
                    sources: HOTEL.rating.sources.join(' / '),
                  })}
                </div>
              </ScrollReveal>
            ) : null}
          </div>
        </section>

        {/* Editorial stack of all reviews — each entry is a tall figure
            with a big decorative guillemet, the full quote in display
            serif, and a hair-rule before the attribution. */}
        <section className="hair-rule">
          <div className="mx-auto max-w-[1100px] px-5 md:px-8 lg:px-12">
            <ul className="border-t border-[var(--color-border-subtle)]">
              {reviews.map((review, i) => (
                <ScrollReveal key={`${review.author}-${i}`} delay={i * 0.04}>
                  <li className="border-b border-[var(--color-border-subtle)]">
                    <figure className="py-16 md:py-24 max-w-[920px]">
                      {/* Decorative guillemet — large pull-quote mark */}
                      <span
                        aria-hidden="true"
                        className="block font-display font-light text-[var(--color-sand-7)] text-[96px] md:text-[128px] leading-[0.5] tracking-[-0.05em] mb-4 md:mb-6 select-none"
                      >
                        «
                      </span>
                      <blockquote className="font-display font-light text-[var(--color-text)] text-[26px] md:text-[36px] lg:text-[44px] leading-[1.25] md:leading-[1.2] tracking-[-0.02em] balance">
                        {review.quote}
                      </blockquote>
                      <figcaption className="mt-10 md:mt-12 flex flex-col gap-2">
                        <div className="flex items-center gap-4">
                          <div className="w-10 border-t border-[var(--color-sand-12)]" />
                          <div className="font-display text-[16px] md:text-[18px] tracking-[-0.005em] text-[var(--color-text)]">
                            {review.author}
                          </div>
                        </div>
                        <div className="pl-14 caption text-[var(--color-text-muted)]">
                          {[review.city, review.date, review.source].filter(Boolean).join(' · ')}
                        </div>
                      </figcaption>
                    </figure>
                  </li>
                </ScrollReveal>
              ))}
            </ul>

            {/* Link to the full TripAdvisor page — for guests who want all
                32 reviews, not just our curated 9. */}
            {HOTEL.reviewUrls?.tripadvisor && HOTEL.rating.count ? (
              <ScrollReveal className="mt-16 md:mt-20 mb-12">
                <a
                  href={HOTEL.reviewUrls.tripadvisor}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 font-body text-[15px] font-medium text-[var(--color-text)]"
                >
                  {t('viewAllOnTripadvisor', { count: HOTEL.rating.count })}
                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </ScrollReveal>
            ) : null}
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 md:py-48 lg:py-64 hair-rule">
          <div className="mx-auto max-w-[920px] px-5 md:px-8">
            <ScrollReveal>
              <div className="caption">{t('ctaKicker')}</div>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h2 className="mt-8 font-display font-light text-[var(--color-text)] text-[44px] leading-[1] md:text-[56px] md:leading-[0.98] tracking-[-0.03em] balance">
                {t('ctaH2')}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="mt-12 flex flex-wrap items-baseline gap-x-10 gap-y-6">
                <BookingButton>{t('ctaCheck')}</BookingButton>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
