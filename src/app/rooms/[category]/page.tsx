import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { BreadcrumbJsonLd } from '@/components/atoms/JsonLd';
import { BookingButton } from '@/components/atoms/BookingButton';
import { FeatureIcon } from '@/components/atoms/FeatureIcon';
import { PageHero } from '@/components/molecules/PageHero';
import { StickyReserveBar } from '@/components/molecules/StickyReserveBar';
import { StickyScrubImage } from '@/components/molecules/StickyScrubImage';
import { ArrowRight, Bed, ArrowsOut, Users, Mountains } from '@phosphor-icons/react/dist/ssr';
import type { Category } from '@/lib/data/categories';
import { fetchCategories, fetchCategoryBySlug, fetchHotel } from '@/sanity/lib/fetch';
import { formatMga } from '@/lib/utils/format';

type Params = { category: string };

export async function generateStaticParams() {
  const categories = await fetchCategories();
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category } = await params;
  const [cat, HOTEL] = await Promise.all([fetchCategoryBySlug(category), fetchHotel()]);
  if (!cat) return { title: 'Room not found' };

  return {
    title: `${cat.name} room`,
    description: `${cat.shortDescription} ${cat.size}, ${cat.capacity}. From ${cat.priceMga.toLocaleString('fr-FR')} Ariary per night.`,
    alternates: { canonical: `/rooms/${cat.slug}` },
    openGraph: {
      title: `${cat.name} · ${HOTEL.shortName}`,
      description: cat.shortDescription,
      url: `/rooms/${cat.slug}`,
      images: [{ url: cat.heroImage, width: 1500, height: 1200, alt: cat.name }],
    },
  };
}

async function HotelOfferJsonLd({ category }: { category: Category | undefined }) {
  if (!category) return null;
  const HOTEL = await fetchHotel();
  const data = {
    '@context': 'https://schema.org',
    '@type': 'HotelRoom',
    name: `${category.name} room`,
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
  const { category } = await params;
  const [cat, allCategories] = await Promise.all([
    fetchCategoryBySlug(category),
    fetchCategories(),
  ]);
  if (!cat) notFound();

  const others = allCategories.filter((c) => c.slug !== cat.slug);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Rooms', url: '/rooms' },
          { name: cat.name, url: `/rooms/${cat.slug}` },
        ]}
      />
      <HotelOfferJsonLd category={cat} />
      <Nav />
      <StickyReserveBar name={cat.name} priceMga={cat.priceMga} />
      <main id="main">
        <PageHero
          src={cat.heroImage}
          alt={`${cat.name} room at Hotel Ambalakely`}
          title={[cat.name, 'room.']}
        />

        {/* ════════════════════════════════════════════════════════════
            EDITORIAL OPENING — lede + key facts spec sheet + long prose
        ════════════════════════════════════════════════════════════ */}
        <section className="py-32 md:py-48 lg:py-64">
          <div className="mx-auto max-w-[920px] px-5 md:px-8">
            <ScrollReveal>
              <p className="lede-display max-w-[700px]">
                {cat.shortDescription}
              </p>
            </ScrollReveal>

            {/* Quick facts — magazine spec sheet, hairline rules */}
            <ScrollReveal delay={0.05}>
              <dl className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 border-y border-[var(--color-border-subtle)] divide-x divide-[var(--color-border-subtle)]">
                <SpecItem Icon={Bed} label="Bed" value={cat.bedSetup} />
                <SpecItem Icon={ArrowsOut} label="Size" value={cat.size} />
                <SpecItem Icon={Users} label="Capacity" value={cat.capacity} />
                <SpecItem Icon={Mountains} label="View" value={cat.view} />
              </dl>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="mt-16 md:mt-20 max-w-[700px] prose-editorial">
                <p>{cat.longDescription}</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p className="mt-10 max-w-[700px] font-display font-light italic text-[var(--color-text-muted)] text-[17px] md:text-[19px] leading-[1.55]">
                {cat.count} in the house. From{' '}
                <span className="not-italic tabular-nums text-[var(--color-text)]">
                  {formatMga(cat.priceMga)} Ariary
                </span>{' '}
                per night.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            STICKY SCRUB MOMENT — image full-bleed → contained as you scroll
        ════════════════════════════════════════════════════════════ */}
        <StickyScrubImage
          src={cat.gallery[1] ?? cat.heroImage}
          alt={`${cat.name} interior, morning light`}
          caption={`Plate · ${cat.name}`}
        />

        {/* ════════════════════════════════════════════════════════════
            FEATURES — clean two-column list with Phosphor icons
        ════════════════════════════════════════════════════════════ */}
        <section className="py-32 md:py-48 lg:py-64">
          <div className="mx-auto max-w-[920px] px-5 md:px-8">
            <ScrollReveal>
              <div className="caption mb-12 md:mb-16">In every room</div>
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

        {/* ════════════════════════════════════════════════════════════
            FULL-BLEED PHOTO 02
        ════════════════════════════════════════════════════════════ */}
        <section className="relative h-[80vh] md:h-[100vh] w-full bg-[var(--color-bg-muted)]">
          <Image
            src={cat.gallery[2] ?? cat.gallery[1] ?? cat.heroImage}
            alt={cat.name}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </section>

        {/* ════════════════════════════════════════════════════════════
            CONCIERGE NOTE — single column, signed
        ════════════════════════════════════════════════════════════ */}
        <section className="py-32 md:py-48 lg:py-64">
          <div className="mx-auto max-w-[760px] px-5 md:px-8">
            <ScrollReveal>
              <div className="caption">A note from {cat.concierge.signed}</div>
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

        {/* ════════════════════════════════════════════════════════════
            RESERVE — inline minimal, no dark panel
        ════════════════════════════════════════════════════════════ */}
        <section className="py-32 md:py-48 lg:py-64 hair-rule">
          <div className="mx-auto max-w-[920px] px-5 md:px-8">
            <ScrollReveal>
              <div className="caption">Reserve</div>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h2 className="mt-8 font-display font-light text-[var(--color-text)] text-[44px] leading-[1] md:text-[56px] md:leading-[0.98] tracking-[-0.03em] balance">
                A {cat.name.toLowerCase()} room, from{' '}
                <span className="tabular-nums">{formatMga(cat.priceMga)}</span>{' '}
                Ariary.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="mt-12 flex flex-wrap items-baseline gap-x-10 gap-y-6">
                <BookingButton>Check availability</BookingButton>
                <p className="text-[14px] leading-[1.55] text-[var(--color-text-muted)] max-w-[400px]">
                  Per night. Free cancellation up to thirty days before arrival.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            CONTINUE — inline links, no cards
        ════════════════════════════════════════════════════════════ */}
        <section className="py-32 md:py-48 lg:py-56 hair-rule">
          <div className="mx-auto max-w-[920px] px-5 md:px-8">
            <ScrollReveal>
              <div className="caption">Or another room</div>
            </ScrollReveal>
            <ul className="mt-12">
              {others.map((o, i) => (
                <ScrollReveal key={o.slug} delay={0.05 * i}>
                  <li className="border-t border-[var(--color-border-subtle)] last:border-b">
                    <Link
                      href={`/rooms/${o.slug}`}
                      className="group block py-8 md:py-10 grid grid-cols-12 gap-6 items-center"
                    >
                      {/* Thumbnail */}
                      <div className="col-span-4 md:col-span-3">
                        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-bg-muted)]">
                          <Image
                            src={o.heroImage}
                            alt={`${o.name} room`}
                            fill
                            sizes="(min-width: 768px) 25vw, 33vw"
                            className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-[1.04]"
                          />
                        </div>
                      </div>

                      {/* Caption number */}
                      <div className="hidden md:block md:col-span-1">
                        <div className="caption text-[var(--color-text-muted)]">
                          {o.number}
                        </div>
                      </div>

                      {/* Name + short description + price */}
                      <div className="col-span-8 md:col-span-7">
                        <h3 className="font-display font-light text-[var(--color-text)] text-[28px] md:text-[40px] leading-[1.05] tracking-[-0.03em] group-hover:translate-x-2 transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)]">
                          {o.name}
                        </h3>
                        <p className="mt-3 text-[14px] md:text-[15px] leading-[1.55] text-[var(--color-text-muted)] max-w-[480px]">
                          {o.shortDescription}
                        </p>
                        <p className="mt-2 text-[14px] md:text-[15px] text-[var(--color-text-muted)]">
                          From{' '}
                          <span className="tabular-nums text-[var(--color-text)]">
                            {formatMga(o.priceMga)} Ariary
                          </span>
                        </p>
                      </div>

                      {/* Arrow */}
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

/**
 * SpecItem — one cell of the key-facts spec sheet.
 * Icon + label small caps on top, value as display type below.
 */
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
