import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { notFound } from 'next/navigation';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { BreadcrumbJsonLd } from '@/components/atoms/JsonLd';
import { BookingButton } from '@/components/atoms/BookingButton';
import { FeatureIcon } from '@/components/atoms/FeatureIcon';
import { PageHero } from '@/components/molecules/PageHero';
import { StickyReserveBar } from '@/components/molecules/StickyReserveBar';
import { ArrowRight, Bed, ArrowsOut, Users, Mountains } from '@phosphor-icons/react/dist/ssr';
import type { Category } from '@/lib/data/categories';
import { fetchCategories, fetchCategoryBySlug, fetchHotel } from '@/sanity/lib/fetch';
import { formatMga } from '@/lib/utils/format';

type Params = { locale: string; category: string };

export async function generateStaticParams() {
  const categories = await fetchCategories();
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, category } = await params;
  const t = await getTranslations({ locale, namespace: 'RoomCategory' });
  const [cat, HOTEL] = await Promise.all([fetchCategoryBySlug(category, locale), fetchHotel(locale)]);
  if (!cat) return { title: t('notFoundTitle') };

  return {
    title: t('metaTitle', { name: cat.name }),
    description: t('metaDescription', {
      shortDescription: cat.shortDescription,
      size: cat.size,
      capacity: cat.capacity,
      price: cat.priceMga.toLocaleString(locale === 'fr' ? 'fr-FR' : locale === 'no' ? 'nb-NO' : 'en-US'),
    }),
    alternates: { canonical: `/rooms/${cat.slug}` },
    openGraph: {
      title: `${cat.name} · ${HOTEL.shortName}`,
      description: cat.shortDescription,
      url: `/rooms/${cat.slug}`,
      images: [{ url: cat.heroImage, width: 1500, height: 1200, alt: cat.name }],
    },
  };
}

async function HotelOfferJsonLd({ category, locale }: { category: Category | undefined; locale: string }) {
  if (!category) return null;
  const HOTEL = await fetchHotel(locale);
  const data = {
    '@context': 'https://schema.org',
    '@type': 'HotelRoom',
    name: `${category.name}`,
    description: category.longDescription,
    occupancy: {
      '@type': 'QuantitativeValue',
      maxValue: category.capacity.match(/\d+(?=\s*guests?)/)?.[0] || 4,
    },
    floorSize: {
      '@type': 'QuantitativeValue',
      value: parseInt(category.size, 10),
      unitCode: 'MTK',
    },
    image: category.heroImage,
    offers: {
      '@type': 'Offer',
      price: category.priceMga,
      priceCurrency: 'MGA',
      availability: 'https://schema.org/InStock',
      url: `${HOTEL.url}/rooms/${category.slug}`,
    },
    bed: { '@type': 'BedDetails', typeOfBed: category.bedSetup },
    amenityFeature: category.features.map((f) => ({
      '@type': 'LocationFeatureSpecification',
      name: f.label,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function RoomCategoryPage({ params }: { params: Promise<Params> }) {
  const { locale, category } = await params;
  setRequestLocale(locale);
  const [cat, allCategories, t, tPractical, HOTEL] = await Promise.all([
    fetchCategoryBySlug(category, locale),
    fetchCategories(locale),
    getTranslations('RoomCategory'),
    getTranslations('Practical'),
    fetchHotel(locale),
  ]);
  if (!cat) notFound();

  const others = allCategories.filter((c) => c.slug !== cat.slug);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: t('breadcrumbHome'), url: '/' },
          { name: t('breadcrumbRooms'), url: '/rooms' },
          { name: cat.name, url: `/rooms/${cat.slug}` },
        ]}
      />
      <HotelOfferJsonLd category={cat} locale={locale} />
      <Nav />
      <StickyReserveBar name={cat.name} priceMga={cat.priceMga} />
      <main id="main">
        <PageHero
          src={cat.heroImage}
          alt={t('heroAlt', { name: cat.name })}
          title={[t('heroTitle1'), `${cat.name}.`]}
        />

        {/* EDITORIAL OPENING */}
        <section className="py-32 md:py-48 lg:py-64">
          <div className="mx-auto max-w-[920px] px-5 md:px-8">
            <ScrollReveal>
              <p className="lede-display max-w-[700px]">{cat.shortDescription}</p>
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <dl className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 border-y border-[var(--color-border-subtle)] divide-x divide-[var(--color-border-subtle)]">
                <SpecItem Icon={Bed} label={t('specBed')} value={cat.bedSetup} />
                <SpecItem Icon={ArrowsOut} label={t('specSize')} value={cat.size} />
                <SpecItem Icon={Users} label={t('specCapacity')} value={cat.capacity} />
                <SpecItem Icon={Mountains} label={t('specView')} value={cat.view} />
              </dl>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="mt-16 md:mt-20 max-w-[700px] prose-editorial">
                <p>{cat.longDescription}</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p className="mt-10 max-w-[700px] font-display font-light text-[var(--color-text-muted)] text-[17px] md:text-[19px] leading-[1.55]">
                {t('countLine', { count: cat.count })}{' '}
                <span className="tabular-nums text-[var(--color-text)]">
                  {formatMga(cat.priceMga)} Ariary
                </span>{' '}
                {t('perNight')}.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* FULL-BLEED IMAGE — simple, no GSAP scrub (Mobbin / Aman pattern) */}
        <section className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-[var(--color-bg-muted)]">
          <Image
            src={cat.gallery[1] ?? cat.heroImage}
            alt={t('scrubAlt', { name: cat.name })}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute bottom-5 right-5 md:bottom-7 md:right-7 caption text-white/85 mix-blend-difference"
          >
            {t('scrubCaption', { name: cat.name })}
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-32 md:py-48 lg:py-64">
          <div className="mx-auto max-w-[920px] px-5 md:px-8">
            <ScrollReveal>
              <div className="caption mb-12 md:mb-16">{t('inRoomKicker')}</div>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 border-t border-[var(--color-border-subtle)]">
                {cat.features.map((f) => (
                  <li
                    key={f.label}
                    className="flex items-start gap-4 py-5 md:py-6 border-b border-[var(--color-border-subtle)]"
                  >
                    <FeatureIcon
                      name={f.icon}
                      size={20}
                      className="text-[var(--color-text-muted)] shrink-0 mt-0.5"
                    />
                    <span className="font-display font-light text-[var(--color-text)] text-[16px] md:text-[17px] leading-[1.45] tracking-[-0.005em]">
                      {f.label}
                    </span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </section>

        {/* FULL-BLEED PHOTO 02 */}
        <section className="relative h-[80vh] md:h-[100vh] w-full bg-[var(--color-bg-muted)]">
          <Image
            src={cat.gallery[2] ?? cat.gallery[1] ?? cat.heroImage}
            alt={cat.name}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </section>

        {/* CONCIERGE NOTE */}
        <section className="py-32 md:py-48 lg:py-64">
          <div className="mx-auto max-w-[760px] px-5 md:px-8">
            <ScrollReveal>
              <div className="caption">{t('conciergeKicker', { signed: cat.concierge.signed })}</div>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <p className="mt-10 font-display font-light italic text-[var(--color-text)] text-[26px] md:text-[36px] leading-[1.3] tracking-[-0.02em]">
                &ldquo;{cat.concierge.body}&rdquo;
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="mt-12 flex items-center gap-4">
                <div className="w-12 border-t border-[var(--color-sand-12)]" />
                <div className="font-display text-[18px] tracking-[-0.005em] text-[var(--color-text)]">
                  {cat.concierge.signed}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* RESERVE */}
        <section className="py-32 md:py-48 lg:py-64 hair-rule">
          <div className="mx-auto max-w-[920px] px-5 md:px-8">
            <ScrollReveal>
              <div className="caption">{t('reserveKicker')}</div>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h2 className="mt-8 font-display font-light text-[var(--color-text)] text-[44px] leading-[1] md:text-[56px] md:leading-[0.98] tracking-[-0.03em] balance">
                {t('reserveH2', { name: cat.name })}{' '}
                <span className="tabular-nums">{formatMga(cat.priceMga)}</span>{' '}
                {t('reservePerNight')}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="mt-12 flex flex-wrap items-baseline gap-x-10 gap-y-6">
                <BookingButton>{t('reserveCheck')}</BookingButton>
                <p className="text-[14px] leading-[1.55] text-[var(--color-text-muted)] max-w-[400px]">
                  {t('reserveNote')}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* PRACTICAL — verified facts from the official 2025-2026 tariff
            sheet : cancellation ladder, check-in/out windows, payment
            methods.  Replaces the earlier "Annulation gratuite jusqu'à
            30 jours + aucun acompte ≤ 2 nuits" claim that contradicted
            the source document. */}
        <section className="py-32 md:py-48 lg:py-56 hair-rule">
          <div className="mx-auto max-w-[920px] px-5 md:px-8">
            <ScrollReveal>
              <h2 className="font-display font-light text-[var(--color-text)] text-[44px] leading-[1] md:text-[56px] md:leading-[0.98] tracking-[-0.03em] balance">
                {tPractical('h2')}
              </h2>
            </ScrollReveal>

            <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              <ScrollReveal delay={0.05}>
                <div className="caption mb-5">{tPractical('cancellationLabel')}</div>
                <ul className="space-y-2 text-[15px] leading-[1.5] text-[var(--color-text)]">
                  <li>{tPractical('cancelOver10')}</li>
                  <li>{tPractical('cancelBetween10and7')}</li>
                  <li>{tPractical('cancelBetween7and5')}</li>
                  <li>{tPractical('cancelUnder5')}</li>
                  <li>{tPractical('cancelNoShow')}</li>
                </ul>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="caption mb-5">{tPractical('checkinLabel')}</div>
                <p className="text-[15px] leading-[1.5] text-[var(--color-text)]">
                  {tPractical('checkinValue', {
                    checkIn: HOTEL.hours.checkIn,
                    checkOut: HOTEL.hours.checkOut,
                  })}
                </p>

                <div className="caption mt-10 mb-5">{tPractical('paymentLabel')}</div>
                <p className="text-[15px] leading-[1.5] text-[var(--color-text)]">
                  {tPractical('paymentMethods')}
                </p>
                <p className="mt-2 text-[13px] leading-[1.5] text-[var(--color-text-muted)]">
                  {tPractical('paymentNote')}
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* CONTINUE */}
        <section className="py-32 md:py-48 lg:py-56 hair-rule">
          <div className="mx-auto max-w-[920px] px-5 md:px-8">
            <ScrollReveal>
              <div className="caption">{t('othersKicker')}</div>
            </ScrollReveal>
            <ul className="mt-12">
              {others.map((o, i) => (
                <ScrollReveal key={o.slug} delay={0.05 * i}>
                  <li className="border-t border-[var(--color-border-subtle)] last:border-b">
                    <Link
                      href={`/rooms/${o.slug}`}
                      className="group block py-8 md:py-10 grid grid-cols-12 gap-6 items-center"
                    >
                      <div className="col-span-4 md:col-span-3">
                        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-bg-muted)]">
                          <Image
                            src={o.heroImage}
                            alt={t('othersAlt', { name: o.name })}
                            fill
                            sizes="(min-width: 768px) 25vw, 33vw"
                            className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-[1.04]"
                          />
                        </div>
                      </div>

                      <div className="col-span-8 md:col-span-8">
                        <h3 className="font-display font-light text-[var(--color-text)] text-[28px] md:text-[40px] leading-[1.05] tracking-[-0.03em] group-hover:translate-x-2 transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)]">
                          {o.name}
                        </h3>
                        <p className="mt-3 text-[14px] md:text-[15px] leading-[1.55] text-[var(--color-text-muted)] max-w-[480px]">
                          {o.shortDescription}
                        </p>
                        <p className="mt-2 text-[14px] md:text-[15px] text-[var(--color-text-muted)]">
                          {t('othersFrom')}{' '}
                          <span className="tabular-nums text-[var(--color-text)]">
                            {formatMga(o.priceMga)} Ariary
                          </span>
                        </p>
                      </div>

                      <div className="hidden md:flex md:col-span-1 md:justify-end">
                        <ArrowRight
                          size={24}
                          className="text-[var(--color-text-muted)] transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-2 group-hover:text-[var(--color-text)]"
                        />
                      </div>
                    </Link>
                  </li>
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function SpecItem({
  Icon,
  label,
  value,
}: {
  Icon: typeof Bed;
  label: string;
  value: string;
}) {
  return (
    <div className="px-4 md:px-6 py-8 md:py-10 flex flex-col items-start">
      <Icon
        size={20}
        weight="light"
        className="text-[var(--color-text-muted)] mb-5"
        aria-hidden
      />
      <div className="caption text-[var(--color-text-muted)] mb-2">
        {label}
      </div>
      <div className="font-display font-light text-[var(--color-text)] text-[17px] md:text-[19px] leading-[1.3] tracking-[-0.01em]">
        {value}
      </div>
    </div>
  );
}
