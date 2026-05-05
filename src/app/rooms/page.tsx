import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/atoms/Container';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { BreadcrumbJsonLd } from '@/components/atoms/JsonLd';
import { BookingButton } from '@/components/atoms/BookingButton';
import { PriceDisplay } from '@/components/atoms/PriceDisplay';
import { ArrowRight, Bed, Mountains } from '@phosphor-icons/react/dist/ssr';
import { categories } from '@/lib/data/categories';

export const metadata: Metadata = {
  title: 'Rooms',
  description:
    'Ten rooms across three categories. Supérieure, Confort, Standard. Rates from 182 000 Ariary per night.',
  alternates: { canonical: '/rooms' },
  openGraph: {
    title: 'Rooms · Ambalakely',
    description: 'Ten rooms across three categories.',
    url: '/rooms',
  },
};

export default function RoomsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Rooms', url: '/rooms' },
        ]}
      />
      <Nav />
      <main id="main">
        {/* ────────────────────────────────────────────────────────────
            01 · HERO — full viewport, single image, title overlay
        ──────────────────────────────────────────────────────────── */}
        <section className="relative h-[90vh] md:h-[100vh] w-full overflow-hidden bg-[var(--color-sand-12)]">
          <Image
            src={categories[0].heroImage}
            alt="Rooms at Ambalakely"
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/55"
          />

          <div className="relative h-full mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12 flex flex-col text-white">
            <div className="pt-[100px] md:pt-[128px]">
              <div className="caption text-white/75">The rooms</div>
            </div>
            <div className="mt-auto pb-14 md:pb-20 max-w-[1100px]">
              <h1 className="font-display font-light tracking-[-0.04em] text-white text-[56px] leading-[0.98] md:text-[96px] md:leading-[0.95] lg:text-[136px] lg:leading-[0.92]">
                Ten rooms.
                <br />
                Three ways.
              </h1>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────
            02 · INTRO
        ──────────────────────────────────────────────────────────── */}
        <section className="py-32 md:py-48 lg:py-56">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-3 lg:sticky lg:top-32 self-start">
                <ScrollReveal>
                  <div className="caption">Overview</div>
                </ScrollReveal>
              </div>

              <div className="lg:col-span-9 max-w-[760px]">
                <ScrollReveal>
                  <p className="lede max-w-[34ch]">
                    Same sand walls, same dark wood floors, same hot water bottles
                    at night. The difference is space, view and bed.
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.05}>
                  <div className="mt-12 prose-editorial">
                    <p>
                      Ten rooms in two buildings. Two of them, the Supérieure, sit
                      on the front of the main house and look down over the rice
                      fields. Four are in the middle range, the Confort, with a
                      desk by the window and a king bed. Four more, the Standard,
                      were the original rooms we opened with in 2018. Choose by
                      what you want from the window.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </Container>
        </section>

        {/* ────────────────────────────────────────────────────────────
            03 · CATEGORY EDITORIAL LIST
            Magazine-style. Each category gets a numbered chapter,
            full-bleed image, prose with breath, link to detail.
        ──────────────────────────────────────────────────────────── */}
        {categories.map((cat, i) => (
          <section
            key={cat.slug}
            className={`hair-rule py-24 md:py-32 lg:py-40 ${
              i === 1 ? 'bg-[var(--color-bg-subtle)]' : ''
            }`}
          >
            <Container>
              {/* Chapter header */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 md:mb-20">
                <div className="lg:col-span-3">
                  <ScrollReveal>
                    <div className="caption">
                      Chapter {cat.number}
                    </div>
                    <div className="mt-4 caption text-[var(--color-text-muted)]">
                      {cat.count} · {cat.size}
                    </div>
                  </ScrollReveal>
                </div>
                <div className="lg:col-span-9">
                  <ScrollReveal delay={0.05}>
                    <h2 className="font-display font-light text-[var(--color-text)] text-[56px] leading-[0.95] md:text-[96px] md:leading-[0.92] lg:text-[120px] lg:leading-[0.92] tracking-[-0.04em]">
                      {cat.name}
                    </h2>
                  </ScrollReveal>
                </div>
              </div>

              {/* Body — image + prose, alternating side */}
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 ${
                  i % 2 === 1 ? '' : ''
                }`}
              >
                <ScrollReveal
                  className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-2' : ''}`}
                >
                  <Link
                    href={`/rooms/${cat.slug}`}
                    className="group block relative aspect-[4/5] md:aspect-[5/4] overflow-hidden bg-[var(--color-bg-muted)]"
                  >
                    <Image
                      src={cat.heroImage}
                      alt={cat.name}
                      fill
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      priority={i === 0}
                      className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-[1.03]"
                    />
                  </Link>
                </ScrollReveal>

                <div
                  className={`lg:col-span-5 lg:flex lg:flex-col lg:justify-center ${
                    i % 2 === 1 ? 'lg:order-1' : ''
                  }`}
                >
                  <ScrollReveal delay={0.06}>
                    <p className="lede max-w-[28ch]">{cat.shortDescription}</p>
                  </ScrollReveal>

                  {/* 2 key specs with icons */}
                  <ScrollReveal delay={0.1}>
                    <div className="mt-12">
                      {[
                        { Icon: Bed, label: 'Bed', value: cat.bedSetup },
                        { Icon: Mountains, label: 'View', value: cat.view },
                      ].map((row) => (
                        <div key={row.label} className="spec-row">
                          <div className="spec-row__label flex items-center gap-2.5">
                            <row.Icon
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

                  {/* Price + CTA */}
                  <ScrollReveal delay={0.14}>
                    <div className="mt-12 flex flex-wrap items-end gap-x-12 gap-y-8">
                      <PriceDisplay mga={cat.priceMga} eur={cat.priceEur} size="md" />
                      <Link
                        href={`/rooms/${cat.slug}`}
                        className="group inline-flex items-center gap-3 font-body text-[15px] font-medium text-[var(--color-text)] self-end pb-2"
                      >
                        Read the room
                        <ArrowRight
                          size={18}
                          className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1.5"
                        />
                      </Link>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </Container>
          </section>
        ))}

        {/* ────────────────────────────────────────────────────────────
            04 · BOOKING CTA
        ──────────────────────────────────────────────────────────── */}
        <section className="py-32 md:py-48 lg:py-56 hair-rule bg-[var(--color-sand-12)] text-[var(--color-sand-1)]">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
              <div className="lg:col-span-8">
                <ScrollReveal>
                  <div className="caption text-[var(--color-sand-6)]">Reserve</div>
                  <h2 className="mt-6 font-display font-light tracking-[-0.035em] text-[44px] leading-[1.02] md:text-[64px] md:leading-[1] lg:text-[80px] lg:leading-[0.98] max-w-[860px]">
                    Direct booking.
                    <br />
                    Reply within two hours.
                  </h2>
                </ScrollReveal>
              </div>
              <div className="lg:col-span-4 lg:flex lg:justify-end">
                <ScrollReveal>
                  <BookingButton variant="solid-light">Check availability</BookingButton>
                </ScrollReveal>
              </div>
            </div>
            <ScrollReveal>
              <p className="mt-10 max-w-[440px] text-[14px] leading-[1.6] text-[var(--color-sand-5)]">
                Free cancellation up to thirty days before arrival. No deposit
                required for stays of two nights or fewer.
              </p>
            </ScrollReveal>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
