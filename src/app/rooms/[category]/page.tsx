import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/atoms/Container';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { BreadcrumbJsonLd } from '@/components/atoms/JsonLd';
import { BookingButton } from '@/components/atoms/BookingButton';
import { FeatureIcon } from '@/components/atoms/FeatureIcon';
import { PriceDisplay } from '@/components/atoms/PriceDisplay';
import { ArrowRight, Bed, ArrowsOut, Mountains, Users, Sparkle } from '@phosphor-icons/react/dist/ssr';
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
      price: category.priceEur,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: `${HOTEL.url}/rooms/${category.slug}`,
    },
    bed: { '@type': 'BedDetails', typeOfBed: category.bedSetup },
    amenityFeature: category.features.map((f) => ({
      '@type': 'LocationFeatureSpecification',
      name: f,
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
      <main id="main">
        {/* ────────────────────────────────────────────────────────────
            01 · HERO
            Full viewport, single image, minimal type overlay.
            Kicker top, title bottom-left. No scroll indicator
            (none of Aman/Singita/Belmond/Nihi use them).
        ──────────────────────────────────────────────────────────── */}
        <section className="relative h-[100vh] w-full overflow-hidden bg-[var(--color-sand-12)]">
          <Image
            src={cat.heroImage}
            alt={cat.name}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/55"
          />

          <div className="relative h-full mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12 flex flex-col text-white">
            {/* Top breadcrumb */}
            <div className="pt-[100px] md:pt-[128px]">
              <div className="caption text-white/75">
                <Link href="/rooms" className="hover:text-white transition-colors">
                  Rooms
                </Link>
                <span className="mx-3 text-white/40">·</span>
                <span>
                  {cat.number} of 03
                </span>
              </div>
            </div>

            {/* Bottom-left title block */}
            <div className="mt-auto pb-14 md:pb-20 max-w-[1100px]">
              <h1 className="font-display font-light tracking-[-0.04em] text-white text-[64px] leading-[0.95] md:text-[112px] md:leading-[0.92] lg:text-[160px] lg:leading-[0.92]">
                {cat.name}
              </h1>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────
            02 · INTRO + SPECS (single cohesive section)
            Aman pattern: short intro paragraph, then two stacked
            bullet lists right under it. ~100 words total prose.
        ──────────────────────────────────────────────────────────── */}
        <section className="py-32 md:py-48 lg:py-56">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              {/* Left rail — section label */}
              <div className="lg:col-span-3 lg:sticky lg:top-32 self-start">
                <ScrollReveal>
                  <div className="caption">The room</div>
                  <div className="mt-4 font-display font-light text-[var(--color-text)] text-[28px] tracking-[-0.02em] leading-[1.05]">
                    0{cat.number.replace('0', '')}
                    <span className="text-[var(--color-text-muted)]"> / 03</span>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right column — intro + specs */}
              <div className="lg:col-span-9">
                <ScrollReveal>
                  <p className="lede max-w-[40ch]">{cat.shortDescription}</p>
                </ScrollReveal>

                <ScrollReveal delay={0.05}>
                  <div className="mt-12 prose-editorial">
                    <p>{cat.longDescription}</p>
                  </div>
                </ScrollReveal>

                {/* Particulars + price block */}
                <div className="mt-20 md:mt-24 grid grid-cols-1 md:grid-cols-12 gap-x-16 gap-y-14">
                  {/* Spec rows with icons */}
                  <ScrollReveal className="md:col-span-7">
                    <div className="caption mb-4">Particulars</div>
                    <div>
                      {[
                        { icon: Bed, label: 'Bed', value: cat.bedSetup },
                        {
                          icon: Mountains,
                          label: 'Setting',
                          value: cat.view,
                        },
                        {
                          icon: Sparkle,
                          label: 'Best for',
                          value: cat.bestFor,
                        },
                        {
                          icon: ArrowsOut,
                          label: 'Size',
                          value: `${cat.size}`,
                        },
                        {
                          icon: Users,
                          label: 'Capacity',
                          value: cat.capacity,
                        },
                      ].map((row) => (
                        <div key={row.label} className="spec-row">
                          <div className="spec-row__label flex items-center gap-2.5">
                            <row.icon
                              size={14}
                              weight="light"
                              className="text-[var(--color-text-muted)]"
                              aria-hidden
                            />
                            {row.label}
                          </div>
                          <div className="spec-row__value">{row.value}</div>
                        </div>
                      ))}
                    </div>
                  </ScrollReveal>

                  {/* Price block — typographic, prominent */}
                  <ScrollReveal delay={0.05} className="md:col-span-5">
                    <div className="md:sticky md:top-32 border-t border-[var(--color-border-subtle)] pt-8 md:border-0 md:pt-0">
                      <PriceDisplay
                        mga={cat.priceMga}
                        eur={cat.priceEur}
                        size="lg"
                      />
                      <div className="mt-10">
                        <BookingButton>Check availability</BookingButton>
                      </div>
                      <p className="mt-6 text-[14px] leading-[1.55] text-[var(--color-text-muted)] max-w-[300px]">
                        Free cancellation up to thirty days before arrival.
                        We answer within two hours during the day.
                      </p>
                    </div>
                  </ScrollReveal>
                </div>

                {/* In every room — features with icons */}
                <ScrollReveal>
                  <div className="mt-24 md:mt-32 pt-16 hair-rule">
                    <div className="caption mb-8">In every room</div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-1">
                      {cat.features.map((f) => (
                        <li
                          key={f.label}
                          className="flex items-start gap-4 py-5 border-b border-[var(--color-border-subtle)]"
                        >
                          <FeatureIcon
                            name={f.icon}
                            size={20}
                            className="shrink-0 mt-0.5 text-[var(--color-text-muted)]"
                          />
                          <span className="font-display font-light text-[16px] md:text-[17px] tracking-[-0.005em] text-[var(--color-text)] leading-[1.5]">
                            {f.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </Container>
        </section>

        {/* ────────────────────────────────────────────────────────────
            03 · FULL-BLEED IMAGE — atmospheric pause
        ──────────────────────────────────────────────────────────── */}
        <section className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-[var(--color-bg-muted)]">
          <Image
            src={cat.gallery[1] ?? cat.heroImage}
            alt={`${cat.name}, view 02`}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute bottom-5 right-5 md:bottom-7 md:right-7 caption text-white/85 mix-blend-difference"
          >
            Plate 01 · {cat.name}
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────
            04 · CONCIERGE NOTE
            Our differentiator — none of Aman/Singita/Belmond do this.
            A real signed note from the host.
        ──────────────────────────────────────────────────────────── */}
        <section className="py-32 md:py-48 lg:py-64 hair-rule">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-3">
                <ScrollReveal>
                  <div className="caption">A note from {cat.concierge.signed}</div>
                </ScrollReveal>
              </div>
              <div className="lg:col-span-8 lg:col-start-4">
                <ScrollReveal delay={0.05}>
                  <p className="concierge-note max-w-[58ch]">
                    &ldquo;{cat.concierge.body}&rdquo;
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.1}>
                  <div className="mt-10 flex items-center gap-4">
                    <div className="w-10 border-t border-[var(--color-sand-12)]" />
                    <div className="font-display text-[16px] tracking-[-0.005em] text-[var(--color-text)]">
                      {cat.concierge.signed}
                    </div>
                    <div className="caption text-[var(--color-text-muted)]">
                      {cat.concierge.signed === 'Mamy' ? 'Host' : 'Kitchen'}
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </Container>
        </section>

        {/* ────────────────────────────────────────────────────────────
            05 · ASYMMETRIC IMAGE PAIR
        ──────────────────────────────────────────────────────────── */}
        <section className="py-24 md:py-32">
          <Container>
            <div className="grid grid-cols-12 gap-3 md:gap-5">
              <ScrollReveal className="col-span-12 md:col-span-7">
                <div className="relative aspect-[4/5] bg-[var(--color-bg-muted)] overflow-hidden">
                  <Image
                    src={cat.heroImage}
                    alt={`${cat.name}, morning`}
                    fill
                    sizes="(min-width: 768px) 58vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="mt-3 caption">Plate 02 · Morning</div>
              </ScrollReveal>
              <ScrollReveal
                delay={0.06}
                className="col-span-12 md:col-span-5 md:mt-32 lg:mt-48"
              >
                <div className="relative aspect-[3/4] bg-[var(--color-bg-muted)] overflow-hidden">
                  <Image
                    src={cat.gallery[2] ?? cat.gallery[1] ?? cat.heroImage}
                    alt={`${cat.name}, evening`}
                    fill
                    sizes="(min-width: 768px) 42vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="mt-3 caption">Plate 03 · Evening</div>
              </ScrollReveal>
            </div>
          </Container>
        </section>

        {/* ────────────────────────────────────────────────────────────
            06 · BOOKING CTA — dark sand-12 panel with hero price
        ──────────────────────────────────────────────────────────── */}
        <section className="py-32 md:py-48 lg:py-56 bg-[var(--color-sand-12)] text-[var(--color-sand-1)]">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              <div className="lg:col-span-7">
                <ScrollReveal>
                  <div className="caption text-[var(--color-sand-6)]">Reserve</div>
                  <h2 className="mt-6 font-display font-light tracking-[-0.035em] text-[44px] leading-[1.02] md:text-[64px] md:leading-[1] lg:text-[80px] lg:leading-[0.98] max-w-[640px]">
                    The {cat.name.toLowerCase()} room.
                  </h2>
                </ScrollReveal>
                <ScrollReveal delay={0.05}>
                  <p className="mt-8 max-w-[440px] text-[15px] leading-[1.6] text-[var(--color-sand-5)]">
                    {cat.shortDescription} {cat.count} of ten in the house, from{' '}
                    <span className="tabular-nums">{formatMga(cat.priceMga)} Ariary</span>{' '}
                    per night.
                  </p>
                </ScrollReveal>
              </div>
              <div className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-[var(--color-sand-10)]">
                <ScrollReveal delay={0.08}>
                  <PriceDisplay
                    mga={cat.priceMga}
                    eur={cat.priceEur}
                    size="hero"
                    variant="dark"
                  />
                  <div className="mt-10">
                    <BookingButton variant="solid-light">Check availability</BookingButton>
                  </div>
                  <p className="mt-6 text-[13px] leading-[1.6] text-[var(--color-sand-6)] max-w-[280px]">
                    Free cancellation up to thirty days before arrival. Reply within
                    two hours during the day.
                  </p>
                </ScrollReveal>
              </div>
            </div>
          </Container>
        </section>

        {/* ────────────────────────────────────────────────────────────
            07 · ADJACENT ROOMS — peer grid
        ──────────────────────────────────────────────────────────── */}
        <section className="py-32 md:py-48 lg:py-56">
          <Container>
            <ScrollReveal>
              <div className="caption">Continue</div>
              <h2 className="mt-6 font-display font-light text-[var(--color-text)] text-[36px] md:text-[52px] leading-[1.02] tracking-[-0.03em] max-w-[760px]">
                Or stay another way.
              </h2>
            </ScrollReveal>
            <div className="mt-20 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              {others.map((o, i) => (
                <ScrollReveal key={o.slug} delay={0.06 * i}>
                  <Link href={`/rooms/${o.slug}`} className="group block">
                    <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-bg-muted)]">
                      <Image
                        src={o.heroImage}
                        alt={o.name}
                        fill
                        sizes="(min-width: 768px) 48vw, 100vw"
                        className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="mt-6 flex items-start justify-between gap-6">
                      <div className="flex-1">
                        <div className="caption text-[var(--color-text-muted)]">
                          {o.number} · {o.count}
                        </div>
                        <h3 className="mt-3 font-display font-light text-[var(--color-text)] text-[36px] md:text-[44px] tracking-[-0.025em] leading-[1.05]">
                          {o.name}
                        </h3>
                        <p className="mt-3 text-[15px] leading-[1.55] text-[var(--color-text-muted)] max-w-[420px]">
                          {o.shortDescription}
                        </p>
                        <div className="mt-5">
                          <PriceDisplay mga={o.priceMga} eur={o.priceEur} size="sm" />
                        </div>
                      </div>
                      <ArrowRight
                        size={22}
                        className="shrink-0 mt-2 text-[var(--color-text-muted)] transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1.5 group-hover:text-[var(--color-text)]"
                      />
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
