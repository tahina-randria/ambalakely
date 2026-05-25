import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { BreadcrumbJsonLd } from '@/components/atoms/JsonLd';
import { BookingButton } from '@/components/atoms/BookingButton';
import { PageHero } from '@/components/molecules/PageHero';
import { StickyTocRail } from '@/components/molecules/StickyTocRail';
import { ArrowRight, Clock, MapTrifold } from '@phosphor-icons/react/dist/ssr';
import { fetchItineraries } from '@/sanity/lib/fetch';
import { PHOTOS } from '@/lib/data/photos';

type LocaleParam = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: LocaleParam): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PlanTrip' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: '/plan-your-trip' },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: '/plan-your-trip',
      images: [
        {
          url: PHOTOS.planTrip.url,
          width: 2560,
          height: 1707,
          alt: t('imageAlt'),
        },
      ],
    },
  };
}

export default async function PlanYourTripPage({ params }: LocaleParam) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [itineraries, t, tPractical] = await Promise.all([
    fetchItineraries(),
    getTranslations('PlanTrip'),
    getTranslations('Practical'),
  ]);

  const heroTitle = t.raw('heroTitle') as string[];

  const tocItems = itineraries.map((it, i) => ({
    id: it.slug,
    number: String(i + 1).padStart(2, '0'),
    label: it.title,
  }));

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: t('breadcrumbHome'), url: '/' },
          { name: t('breadcrumbPlan'), url: '/plan-your-trip' },
        ]}
      />
      <Nav />
      <StickyTocRail items={tocItems} />
      <main id="main">
        <PageHero
          src={PHOTOS.planTrip.path}
          alt={t('heroAlt')}
          title={heroTitle}
        />

        {/* INTRO */}
        <section className="py-32 md:py-48 lg:py-56">
          <div className="mx-auto max-w-[700px] px-5 md:px-8">
            <ScrollReveal>
              <p className="lede-display">{t('introLede')}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <div className="mt-12 prose-editorial">
                <p>{t('introP1')}</p>
                <p>{t('introP2')}</p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* TRANSFERS — official PDF prices, so the "we organise chauffeurs"
            promise lands with a number, not a vague claim. */}
        <section className="hair-rule py-16 md:py-20">
          <div className="mx-auto max-w-[920px] px-5 md:px-8">
            <ScrollReveal>
              <div className="caption mb-5">{tPractical('transfersLabel')}</div>
              <ul className="space-y-2 text-[15px] leading-[1.5] text-[var(--color-text)]">
                <li>{tPractical('transferAirport')}</li>
                <li>{tPractical('transferCity')}</li>
              </ul>
              <p className="mt-3 text-[13px] leading-[1.5] text-[var(--color-text-muted)]">
                {tPractical('transfersNote')}
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* QUICK NAV — card-style picks for the three itineraries */}
        <section className="hair-rule py-16 md:py-20">
          <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12">
            <ScrollReveal>
              <div className="caption mb-8 md:mb-10">{t('quickNavKicker')}</div>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                {itineraries.map((it) => (
                  <li key={it.slug}>
                    <Link
                      href={`#${it.slug}`}
                      className="group block h-full p-6 md:p-7 border border-[var(--color-border-subtle)] hover:border-[var(--color-text)] hover:bg-[var(--color-bg-subtle)] transition-[border-color,background-color] duration-[var(--duration-base)] ease-[var(--ease-standard)]"
                    >
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <span className="inline-flex items-center gap-2 caption text-[var(--color-text-muted)]">
                          <Clock size={13} weight="regular" aria-hidden />
                          {it.duration}
                        </span>
                        <ArrowRight
                          size={16}
                          className="text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-[color,transform] duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1"
                        />
                      </div>
                      <div className="font-display font-light text-[var(--color-text)] text-[24px] md:text-[28px] tracking-[-0.02em] leading-[1.15]">
                        {it.title}
                      </div>
                      <div className="mt-3 inline-flex items-center gap-2 caption text-[var(--color-text-muted)]">
                        <MapTrifold size={13} weight="regular" aria-hidden />
                        {it.totalKm}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </section>

        {/* EACH ITINERARY */}
        {itineraries.map((it) => (
          <div key={it.slug}>
            <section className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-[var(--color-bg-muted)]">
              <Image
                src={it.image}
                alt={t('imageAltItinerary', { title: it.title, duration: it.duration })}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute bottom-5 right-5 md:bottom-8 md:right-8 caption text-white/85 mix-blend-difference"
              >
                {it.duration}
              </div>
            </section>

            <section
              id={it.slug}
              className="hair-rule py-32 md:py-48 lg:py-56"
            >
              <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20 md:mb-28">
                  <div className="lg:col-span-3">
                    <ScrollReveal>
                      <div className="caption">{it.duration}</div>
                      <div className="mt-4 caption text-[var(--color-text-muted)]">
                        {it.totalKm}
                      </div>
                      <div className="mt-2 caption text-[var(--color-text-muted)]">
                        {t('idealFor')} : {it.best}
                      </div>
                    </ScrollReveal>
                  </div>
                  <div className="lg:col-span-9 max-w-[760px]">
                    <ScrollReveal delay={0.05}>
                      <h2 className="font-display font-light text-[var(--color-text)] text-[44px] leading-[1] md:text-[56px] md:leading-[0.98] tracking-[-0.03em] balance">
                        {it.title}
                      </h2>
                    </ScrollReveal>
                    <ScrollReveal delay={0.1}>
                      <p className="mt-10 prose-editorial">{it.pitch}</p>
                    </ScrollReveal>
                  </div>
                </div>

                <ul className="border-t border-[var(--color-border-subtle)]">
                  {it.days.map((d, i) => (
                    <ScrollReveal key={d.day} delay={i * 0.04}>
                      <li className="grid grid-cols-12 gap-6 py-10 md:py-14 border-b border-[var(--color-border-subtle)]">
                        <div className="col-span-3 md:col-span-2">
                          <div className="text-[13px] font-medium text-[var(--color-text-muted)] tabular-nums">
                            {t('dayLabel')} {d.day}
                          </div>
                        </div>
                        <div className="col-span-9 md:col-span-10 max-w-[760px]">
                          <h3 className="font-display font-light text-[var(--color-text)] text-[24px] md:text-[32px] tracking-[-0.025em] leading-[1.1]">
                            {d.title}
                          </h3>
                          <p className="mt-5 prose-editorial">{d.body}</p>
                          {d.transit ? (
                            <p className="mt-4 caption text-[var(--color-text-muted)]">
                              {d.transit}
                            </p>
                          ) : null}
                        </div>
                      </li>
                    </ScrollReveal>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        ))}

        {/* BOOKING CTA */}
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
              <p className="mt-10 prose-editorial">{t('ctaBody')}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="mt-12 flex flex-wrap items-baseline gap-x-10 gap-y-6">
                <BookingButton>{t('ctaCheck')}</BookingButton>
                <Link
                  href="/rooms"
                  className="group inline-flex items-center gap-3 font-display font-light text-[var(--color-text)] text-[24px] md:text-[28px] tracking-[-0.02em] leading-[1.05]"
                >
                  {t('ctaRooms')}
                  <ArrowRight
                    size={22}
                    className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1.5"
                  />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
