import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { BreadcrumbJsonLd } from '@/components/atoms/JsonLd';
import { BookingButton } from '@/components/atoms/BookingButton';
import { RoomComparison } from '@/components/molecules/RoomComparison';
import { PageHero } from '@/components/molecules/PageHero';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { categories } from '@/lib/data/categories';

export const metadata: Metadata = {
  title: 'Rooms',
  description:
    'Ten rooms across three categories. Supérieure, Confort, Standard. Rates from 182 000 Ariary per night.',
  alternates: { canonical: '/rooms' },
  openGraph: {
    title: 'Rooms · Hotel Ambalakely',
    description: 'Ten rooms across three categories. Supérieure, Confort, Standard.',
    url: '/rooms',
    images: [
      {
        url: 'https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg?format=1500w',
        width: 1500,
        height: 1200,
        alt: 'Supérieure room at Hotel Ambalakely',
      },
    ],
  },
};

const fmt = (n: number) => n.toLocaleString('fr-FR').replace(/\s/g, ' ');

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
        <PageHero
          src={categories[0].heroImage}
          alt="View of the Supérieure rooms over the rice fields"
          title={['Ten rooms', 'at Ambalakely.']}
        />

        {/* ════════════════════════════════════════════════════════════
            EDITORIAL OPENING
        ════════════════════════════════════════════════════════════ */}
        <section className="py-32 md:py-48 lg:py-64">
          <div className="mx-auto max-w-[700px] px-5 md:px-8">
            <ScrollReveal>
              <p className="font-display font-light text-[var(--color-text)] text-[28px] md:text-[40px] leading-[1.2] tracking-[-0.025em] balance">
                Same sand walls, same dark wood floors, same hot water bottles
                at night. The difference is space, view and bed.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <div className="mt-14 prose-editorial">
                <p>
                  Ten rooms in two buildings. Two of them sit on the front of
                  the main house and look down over the rice fields. Four are
                  in the middle range, with a desk by the window and a king
                  bed. Four more were the original rooms we opened with in
                  2018. Choose by what you want from the window.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            COMPARISON GRID — same criteria across all 3, quick scan
        ════════════════════════════════════════════════════════════ */}
        <section className="py-24 md:py-32 lg:py-40 hair-rule">
          <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12">
            <ScrollReveal className="mb-10 md:mb-14">
              <div className="caption">At a glance</div>
              <h2 className="mt-6 font-display font-light text-[var(--color-text)] text-[32px] md:text-[44px] leading-[1.05] tracking-[-0.025em] max-w-[760px]">
                Twelve points to choose by.
              </h2>
            </ScrollReveal>
            <ScrollReveal>
              <RoomComparison />
            </ScrollReveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            CATEGORY SEQUENCE — photo-essay, no cards
            For each category: full-bleed image + magazine-style chapter
        ════════════════════════════════════════════════════════════ */}
        {categories.map((cat) => (
          <div key={cat.slug}>
            {/* Full-bleed image with title overlay */}
            <section className="relative h-[80vh] md:h-[100vh] w-full overflow-hidden bg-[var(--color-sand-12)]">
              <Image
                src={cat.heroImage}
                alt={cat.name}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"
              />
              <div className="relative h-full mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12 flex flex-col text-white">
                <div className="pt-[100px] md:pt-[128px]">
                  <div className="caption text-white/75">
                    Chapter {cat.number} · {cat.count}
                  </div>
                </div>
                <div className="mt-auto pb-14 md:pb-20">
                  <h2 className="font-display font-light tracking-[-0.04em] text-white text-[56px] leading-[0.95] md:text-[112px] md:leading-[0.9] lg:text-[160px] lg:leading-[0.9]">
                    {cat.name}
                  </h2>
                </div>
              </div>
            </section>

            {/* Editorial chapter — single column prose */}
            <section className="py-32 md:py-48 lg:py-56">
              <div className="mx-auto max-w-[700px] px-5 md:px-8">
                <ScrollReveal>
                  <p className="font-display font-light text-[var(--color-text)] text-[24px] md:text-[32px] leading-[1.25] tracking-[-0.02em] balance">
                    {cat.shortDescription}
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.05}>
                  <p className="mt-12 font-display font-light italic text-[18px] leading-[1.55] text-[var(--color-text-muted)]">
                    {cat.size}, {cat.capacity.toLowerCase()}. {cat.bedSetup} From{' '}
                    <span className="not-italic tabular-nums text-[var(--color-text)]">
                      {fmt(cat.priceMga)} Ariary
                    </span>{' '}
                    per night.
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.1}>
                  <Link
                    href={`/rooms/${cat.slug}`}
                    className="group mt-12 inline-flex items-center gap-3 font-display font-light text-[var(--color-text)] text-[28px] md:text-[36px] tracking-[-0.025em] leading-[1.05]"
                  >
                    Read about the {cat.name}
                    <ArrowRight
                      size={24}
                      className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-2"
                    />
                  </Link>
                </ScrollReveal>
              </div>
            </section>
          </div>
        ))}

        {/* ════════════════════════════════════════════════════════════
            RESERVE — minimal, no dark panel
        ════════════════════════════════════════════════════════════ */}
        <section className="py-32 md:py-48 lg:py-64 hair-rule">
          <div className="mx-auto max-w-[920px] px-5 md:px-8">
            <ScrollReveal>
              <div className="caption">Reserve</div>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h2 className="mt-8 font-display font-light text-[var(--color-text)] text-[48px] leading-[0.98] md:text-[80px] md:leading-[0.95] lg:text-[112px] lg:leading-[0.92] tracking-[-0.04em] balance">
                Direct booking.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="mt-12 flex flex-wrap items-baseline gap-x-10 gap-y-6">
                <BookingButton>Check availability</BookingButton>
                <p className="text-[14px] leading-[1.55] text-[var(--color-text-muted)] max-w-[400px]">
                  Free cancellation up to thirty days before arrival. No deposit
                  for stays of two nights or fewer.
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
