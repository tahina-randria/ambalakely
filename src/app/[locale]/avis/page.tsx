import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { BreadcrumbJsonLd } from '@/components/atoms/JsonLd';
import { BookingButton } from '@/components/atoms/BookingButton';
import { PageHero } from '@/components/molecules/PageHero';
import { Star } from '@phosphor-icons/react/dist/ssr';
import { PHOTOS } from '@/lib/data/photos';
import { fetchHotel, fetchReviews } from '@/sanity/lib/fetch';

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
                    {t('ratingLine', {
                      value: HOTEL.rating.value,
                      count: HOTEL.rating.count,
                      sources: HOTEL.rating.sources.join(' / '),
                    })}
                  </div>
                </div>
              </ScrollReveal>
            ) : null}
          </div>
        </section>

        {/* Editorial stack of all reviews */}
        <section className="hair-rule">
          <div className="mx-auto max-w-[1100px] px-5 md:px-8 lg:px-12">
            <ul className="border-t border-[var(--color-border-subtle)]">
              {reviews.map((review, i) => (
                <ScrollReveal key={`${review.author}-${i}`} delay={i * 0.04}>
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
                        {review.city ? (
                          <div className="caption text-[var(--color-text-muted)]">
                            {review.city}
                          </div>
                        ) : null}
                      </figcaption>
                    </figure>
                  </li>
                </ScrollReveal>
              ))}
            </ul>
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
