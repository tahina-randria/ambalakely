import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/atoms/Container';
import { Section } from '@/components/atoms/Section';
import { Heading } from '@/components/atoms/Heading';
import { Kicker } from '@/components/atoms/Kicker';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { BreadcrumbJsonLd } from '@/components/atoms/JsonLd';
import { BookingButton } from '@/components/atoms/BookingButton';
import { ArrowRight, Check } from '@phosphor-icons/react/dist/ssr';
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
      <main>
        {/* Hero — full bleed image */}
        <section className="relative h-[80vh] md:h-[88vh] w-full overflow-hidden">
          <Image
            src={cat.heroImage}
            alt={cat.name}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50" />

          <div className="relative h-full mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12 flex flex-col justify-end pb-14 md:pb-20 text-white">
            <div className="font-mono text-[12px] uppercase tracking-[0.12em] opacity-80">
              <Link href="/rooms" className="hover:opacity-100 underline-offset-4 hover:underline">
                Rooms
              </Link>
              {' / '}
              {cat.number} · {cat.count}
            </div>
            <h1 className="mt-6 font-display font-light tracking-[-0.035em] text-[56px] leading-[1.02] md:text-[88px] md:leading-[1] lg:text-[120px] lg:leading-[1] max-w-[1100px]">
              {cat.name}
            </h1>
          </div>
        </section>

        {/* Specs strip */}
        <Section divider className="py-16 md:py-20 lg:py-24">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8">
              {[
                { label: 'Size', value: cat.size },
                { label: 'Capacity', value: cat.capacity },
                { label: 'View', value: cat.view },
                { label: 'From', value: `${formatMga(cat.priceMga)} Ar / ≈ ${cat.priceEur} €` },
              ].map((spec) => (
                <div key={spec.label}>
                  <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
                    {spec.label}
                  </div>
                  <div className="mt-3 font-display text-[20px] md:text-[24px] tracking-[-0.01em] text-[var(--color-text)]">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Editorial split */}
        <Section divider>
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              <div className="lg:col-span-5">
                <ScrollReveal>
                  <Kicker>About the room</Kicker>
                  <Heading variant="h2" className="mt-6 max-w-[460px]">
                    What you wake up to.
                  </Heading>
                </ScrollReveal>
              </div>
              <div className="lg:col-span-7">
                <ScrollReveal delay={0.05}>
                  <p className="text-[19px] md:text-[21px] leading-[1.55] text-[var(--color-text)] max-w-[640px]">
                    {cat.longDescription}
                  </p>
                  <p className="mt-8 text-[16px] leading-[1.6] text-[var(--color-text-muted)] max-w-[640px]">
                    {cat.bedSetup}
                  </p>
                </ScrollReveal>
              </div>
            </div>
          </Container>
        </Section>

        {/* Features list */}
        <Section divider className="bg-[var(--color-bg-subtle)]">
          <Container>
            <ScrollReveal>
              <Kicker>What is included</Kicker>
              <Heading variant="h2" className="mt-6 max-w-[760px]">
                Everything in every room.
              </Heading>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <ul className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5 max-w-[860px]">
                {cat.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 py-3 border-b border-[var(--color-border-subtle)]">
                    <Check size={16} weight="regular" className="mt-1 shrink-0 text-[var(--color-text-muted)]" />
                    <span className="text-[15px] text-[var(--color-text)]">{f}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </Container>
        </Section>

        {/* Gallery */}
        <Section divider>
          <Container>
            <ScrollReveal>
              <Kicker>Gallery</Kicker>
              <Heading variant="h2" className="mt-6 max-w-[760px]">
                More views of the {cat.name.toLowerCase()}.
              </Heading>
            </ScrollReveal>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5">
              {cat.gallery.map((src, i) => (
                <div
                  key={i}
                  className={`relative bg-[var(--color-bg-muted)] overflow-hidden ${
                    i === 0 ? 'md:col-span-2 aspect-[4/3]' : 'aspect-[3/4]'
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${cat.name} ${i + 1}`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Booking CTA */}
        <Section className="bg-[var(--color-sand-12)] text-[var(--color-sand-1)]">
          <Container>
            <ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
                <div className="md:col-span-7">
                  <div className="font-mono text-[12px] uppercase tracking-[0.12em] opacity-70">
                    Reserve
                  </div>
                  <h2 className="mt-6 font-display font-light tracking-[-0.03em] text-[40px] leading-[1.05] md:text-[56px] md:leading-[1.02] max-w-[760px]">
                    Book a {cat.name.toLowerCase()} room. From {formatMga(cat.priceMga)} Ariary
                    per night.
                  </h2>
                </div>
                <div className="md:col-span-5">
                  <BookingButton variant="solid-light">Check availability</BookingButton>
                </div>
              </div>
            </ScrollReveal>
          </Container>
        </Section>

        {/* Other categories */}
        <Section divider>
          <Container>
            <ScrollReveal>
              <Kicker>Other rooms</Kicker>
              <Heading variant="h2" className="mt-6 max-w-[760px]">
                Two other ways to stay.
              </Heading>
            </ScrollReveal>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/rooms/${o.slug}`}
                  className="group flex flex-col"
                >
                  <div className="relative aspect-[5/4] overflow-hidden bg-[var(--color-bg-muted)]">
                    <Image
                      src={o.heroImage}
                      alt={o.name}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="mt-6 flex items-baseline justify-between">
                    <div>
                      <div className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--color-text-muted)]">
                        {o.number} · {o.count}
                      </div>
                      <div className="mt-2 font-display text-[28px] tracking-[-0.02em] text-[var(--color-text)]">
                        {o.name}
                      </div>
                    </div>
                    <ArrowRight
                      size={18}
                      className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1 text-[var(--color-text-muted)]"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
