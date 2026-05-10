import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { BreadcrumbJsonLd } from '@/components/atoms/JsonLd';
import { BookingButton } from '@/components/atoms/BookingButton';
import { PageHero } from '@/components/molecules/PageHero';
import { StickyReserveBar } from '@/components/molecules/StickyReserveBar';
import { StickyScrubImage } from '@/components/molecules/StickyScrubImage';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { categories, getCategory } from '@/lib/data/categories';
import { HOTEL } from '@/lib/data/hotel';

type Params = { category: string };

export async function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
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

function formatMga(n: number) {
  return n.toLocaleString('fr-FR').replace(/\s/g, ' ');
}

function HotelOfferJsonLd({ category }: { category: ReturnType<typeof getCategory> }) {
  if (!category) return null;
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
  const cat = getCategory(category);
  if (!cat) notFound();

  const others = categories.filter((c) => c.slug !== cat.slug);

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
            EDITORIAL OPENING — single column prose, magazine voice
        ════════════════════════════════════════════════════════════ */}
        <section className="py-32 md:py-48 lg:py-64">
          <div className="mx-auto max-w-[700px] px-5 md:px-8">
            <ScrollReveal>
              <p className="font-display font-light text-[var(--color-text)] text-[28px] md:text-[40px] leading-[1.2] tracking-[-0.025em] balance">
                {cat.shortDescription}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <div className="mt-14 prose-editorial">
                <p>{cat.longDescription}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              {/* Inline specs — woven into prose, not a sheet */}
              <p className="mt-12 font-display font-light italic text-[18px] md:text-[20px] leading-[1.55] text-[var(--color-text-muted)] max-w-[60ch]">
                {cat.size}, {cat.capacity.toLowerCase()}. {cat.bedSetup} {cat.count}{' '}
                in the house. From{' '}
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
            EDITORIAL CONTINUATION — what's in the room, as prose
        ════════════════════════════════════════════════════════════ */}
        <section className="py-32 md:py-48 lg:py-64">
          <div className="mx-auto max-w-[700px] px-5 md:px-8">
            <ScrollReveal>
              <div className="caption mb-8">In every room</div>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <p className="prose-editorial">
                {cat.features.map((f, i) => (
                  <span key={f.label}>
                    {f.label}
                    {i < cat.features.length - 1 ? '. ' : '.'}
                  </span>
                ))}
              </p>
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
              <p className="mt-10 font-display font-light italic text-[var(--color-text)] text-[26px] md:text-[36px] lg:text-[42px] leading-[1.3] tracking-[-0.02em]">
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
                      className="group block py-10 md:py-14 grid grid-cols-12 gap-6 items-baseline"
                    >
                      <div className="col-span-12 md:col-span-2">
                        <div className="caption text-[var(--color-text-muted)]">
                          {o.number}
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-9">
                        <h3 className="font-display font-light text-[var(--color-text)] text-[32px] md:text-[44px] leading-[1.05] tracking-[-0.03em] group-hover:translate-x-2 transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)]">
                          {o.name}
                        </h3>
                        <p className="mt-4 text-[15px] leading-[1.55] text-[var(--color-text-muted)] max-w-[480px]">
                          {o.shortDescription} From{' '}
                          <span className="tabular-nums text-[var(--color-text)]">
                            {formatMga(o.priceMga)} Ar
                          </span>
                          .
                        </p>
                      </div>
                      <div className="col-span-12 md:col-span-1 md:flex md:justify-end">
                        <ArrowRight
                          size={28}
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
