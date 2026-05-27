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
import { ArrowUpRight, Quotes } from '@phosphor-icons/react/dist/ssr';

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
    fetchHotel(locale),
    fetchReviews(locale),
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

        {/* Intro + stat counter — same trust pattern as the home Reviews
            section §32 #122 (2026-05-27 refonte). The previous full-bleed
            XL editorial stack was beautiful but stale + inconsistent
            with the new home card direction. Now /avis = the SEO-readable
            archive of all 9 curated quotes in the same card grid as the
            home carousel, with the verified-review count surfaced top. */}
        <section className="py-24 md:py-32 lg:py-40">
          <div className="mx-auto max-w-[1100px] px-5 md:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-7">
                <ScrollReveal>
                  <p className="lede-display max-w-[34ch]">
                    {t('intro', { count: reviews.length })}
                  </p>
                </ScrollReveal>
              </div>
              {HOTEL.rating.count != null ? (
                <div className="lg:col-span-5 lg:text-right">
                  <ScrollReveal delay={0.05}>
                    <div className="font-display font-light text-[var(--color-text)] text-[64px] md:text-[88px] leading-[1] tracking-[-0.03em] tabular-nums">
                      {HOTEL.rating.count}
                    </div>
                    <div className="mt-3 caption text-[var(--color-text-muted)] max-w-[260px] lg:ml-auto">
                      {t('ratingLine', {
                        value: HOTEL.rating.value ?? '—',
                        count: HOTEL.rating.count,
                        sources: HOTEL.rating.sources.join(' / '),
                      })}
                    </div>
                  </ScrollReveal>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {/* Cards grid — same card design as the home carousel, but in a
            3-col responsive grid (1 → 2 → 3 across breakpoints) for the
            archive flavour. Each card is its own self-contained figure. */}
        <section className="hair-rule py-16 md:py-24">
          <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12">
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
              {reviews.map((review, i) => (
                <ScrollReveal key={`${review.author}-${i}`} delay={(i % 3) * 0.06}>
                  <li className="h-full">
                    <figure className="h-full flex flex-col bg-[var(--color-bg)] border border-[var(--color-border-subtle)] p-7 md:p-9">
                      <div className="caption text-[var(--color-text-muted)] mb-6">
                        {review.source}
                      </div>
                      <Quotes
                        size={26}
                        weight="light"
                        className="text-[var(--color-sand-9)] mb-5"
                        aria-hidden
                      />
                      <blockquote className="font-display font-light text-[var(--color-text)] text-[17px] md:text-[19px] leading-[1.45] tracking-[-0.01em] balance mb-8 flex-1">
                        {review.quote}
                      </blockquote>
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
                </ScrollReveal>
              ))}
            </ul>

            {/* Outbound to the full TripAdvisor feed (32 reviews live there,
                we curate 9). */}
            {HOTEL.reviewUrls?.tripadvisor && HOTEL.rating.count != null ? (
              <ScrollReveal className="mt-16 md:mt-20">
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
