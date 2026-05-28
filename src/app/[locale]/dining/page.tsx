import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/atoms/Container';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { BreadcrumbJsonLd, RestaurantJsonLd } from '@/components/atoms/JsonLd';
import { BookingButton } from '@/components/atoms/BookingButton';
import { PageHero } from '@/components/molecules/PageHero';
import {
  Sun,
  SunHorizon,
  Moon,
  Pizza,
} from '@phosphor-icons/react/dist/ssr';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import { fetchHotel } from '@/sanity/lib/fetch';
import { formatMga } from '@/lib/utils/format';
import { PHOTOS } from '@/lib/data/photos';
import { localizedAlternates } from '@/lib/i18n/alternates';

type LocaleParam = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: LocaleParam): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'DiningPage' });
  const alt = localizedAlternates(locale, '/dining');
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: alt,
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: alt.canonical,
      images: [
        {
          url: PHOTOS.diningHero.url,
          width: 2560,
          height: 1707,
          alt: t('imageAlt'),
        },
      ],
    },
  };
}

export default async function DiningPage({ params }: LocaleParam) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [HOTEL, t] = await Promise.all([fetchHotel(locale), getTranslations('DiningPage')]);

  const heroTitle = t.raw('heroTitle') as string[];

  const meals = [
    { label: t('mealBreakfastMalagasy'), priceMga: 25000 },
    { label: t('mealBreakfastFull'), priceMga: 38000 },
    { label: t('meal1Course'), priceMga: 40000 },
    { label: t('meal2Course'), priceMga: 59000 },
    { label: t('meal3Course'), priceMga: 72000 },
    { label: t('mealPicnic'), priceMga: 50000 },
  ];

  const mealExtras = [t('extraChild'), t('extraChildFree')];

  const hours: { label: string; value: string; Icon: PhosphorIcon }[] = [
    { label: t('hourBreakfast'), value: HOTEL.hours.breakfast, Icon: Sun },
    { label: t('hourLunch'), value: HOTEL.hours.lunch, Icon: SunHorizon },
    { label: t('hourDinner'), value: HOTEL.hours.dinner, Icon: Moon },
    { label: t('hourPizzaTerrace'), value: HOTEL.hours.pizzaTerrace, Icon: Pizza },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: t('breadcrumbHome'), url: '/' },
          { name: t('breadcrumbDining'), url: '/dining' },
        ]}
      />
      <RestaurantJsonLd />
      <Nav />
      <main id="main">
        <PageHero
          src={PHOTOS.diningHero.path}
          alt={t('heroAlt')}
          title={heroTitle}
        />

        {/* INTRO + KEY FACTS */}
        <section className="py-32 md:py-48 lg:py-56">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-3 lg:sticky lg:top-32 self-start">
                <ScrollReveal>
                  <div className="caption">{t('introKicker')}</div>
                </ScrollReveal>
              </div>
              <div className="lg:col-span-9">
                <ScrollReveal>
                  <p className="lede max-w-[34ch]">{t('introLede')}</p>
                </ScrollReveal>
                <ScrollReveal delay={0.05}>
                  <div className="mt-12 prose-editorial">
                    <p>{t('introP1')}</p>
                    <p>{t('introP2')}</p>
                  </div>
                </ScrollReveal>
                {/* The 4-fact grid with Users / ForkKnife / Door / Clock
                    icons was removed §32 #123 (2026-05-27). The facts
                    were already in the prose (50 couverts in introLede,
                    1-3 services in introP2, 24 h advance in ctaNote) and
                    "Open to: Residents and visitors" read as gatekeeping.
                    The hours + pricing live a section below with their
                    own dense list. */}
              </div>
            </div>
          </Container>
        </section>

        {/* FULL-BLEED IMAGE */}
        <section className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-[var(--color-bg-muted)]">
          <Image
            src={PHOTOS.diningLounge.path}
            alt={t('loungeAlt')}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute bottom-5 right-5 md:bottom-7 md:right-7 caption text-white/85 mix-blend-difference"
          >
            {t('loungeCaption')}
          </div>
        </section>

        {/* HOURS + PRICING */}
        <section className="py-32 md:py-48 lg:py-56 hair-rule bg-[var(--color-bg-subtle)]">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-3 lg:sticky lg:top-32 self-start">
                <ScrollReveal>
                  <div className="caption">{t('hoursKicker')}</div>
                  <h2 className="mt-6 font-display font-light text-[var(--color-text)] text-[28px] md:text-[36px] leading-[1.05] tracking-[-0.025em] max-w-[260px]">
                    {t('hoursH2')}
                  </h2>
                </ScrollReveal>
              </div>
              <div className="lg:col-span-9 space-y-16 md:space-y-20">
                {/* Hours */}
                <ScrollReveal>
                  <div>
                    <div className="caption mb-8">{t('hoursLabel')}</div>
                    <ul className="border-t border-[var(--color-border-subtle)]">
                      {hours.map((h) => {
                        const Icon = h.Icon;
                        return (
                          <li
                            key={h.label}
                            className="flex items-center justify-between gap-4 py-5 md:py-6 border-b border-[var(--color-border-subtle)]"
                          >
                            <div className="flex items-center gap-4">
                              <Icon
                                size={20}
                                weight="light"
                                className="text-[var(--color-text-muted)]"
                                aria-hidden
                              />
                              <span className="font-display font-light text-[var(--color-text)] text-[16px] md:text-[18px]">
                                {h.label}
                              </span>
                            </div>
                            <span className="text-[14px] md:text-[15px] tabular-nums text-[var(--color-text)]">
                              {h.value}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </ScrollReveal>

                {/* Pricing */}
                <ScrollReveal delay={0.05}>
                  <div>
                    <div className="caption mb-8">{t('pricingLabel')}</div>
                    <ul className="border-t border-[var(--color-border-subtle)]">
                      {meals.map((m) => (
                        <li
                          key={m.label}
                          className="flex items-baseline justify-between gap-4 py-5 md:py-6 border-b border-[var(--color-border-subtle)]"
                        >
                          <span className="font-display font-light text-[var(--color-text)] text-[16px] md:text-[18px] tracking-[-0.005em]">
                            {m.label}
                          </span>
                          <span className="font-display font-light text-[var(--color-text)] text-[18px] md:text-[22px] tabular-nums shrink-0">
                            {formatMga(m.priceMga)}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <ul className="mt-6 space-y-2 caption text-[var(--color-text-muted)]">
                      {mealExtras.map((extra) => (
                        <li key={extra}>· {extra}</li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </Container>
        </section>

        {/* RESERVATION CTA */}
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
                <BookingButton>{t('ctaButton')}</BookingButton>
                <p className="text-[14px] leading-[1.55] text-[var(--color-text-muted)] max-w-[400px]">
                  {t('ctaNote')}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
