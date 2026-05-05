import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/atoms/Container';
import { Section } from '@/components/atoms/Section';
import { Heading } from '@/components/atoms/Heading';
import { Kicker } from '@/components/atoms/Kicker';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal, Stagger, StaggerItem } from '@/lib/motion/ScrollReveal';
import { BreadcrumbJsonLd } from '@/components/atoms/JsonLd';
import { BookingButton } from '@/components/atoms/BookingButton';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
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

function formatMga(n: number) {
  return n.toLocaleString('fr-FR').replace(/\s/g, ' ');
}

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
      <main>
        {/* Page hero */}
        <Section bleed className="pt-[160px] md:pt-[200px] pb-24 md:pb-32 lg:pb-40">
          <Container>
            <ScrollReveal>
              <Kicker>The rooms</Kicker>
              <Heading
                variant="display"
                className="mt-6 max-w-[1100px] text-[var(--color-text)]"
              >
                Ten rooms. Three categories. One house.
              </Heading>
              <p className="mt-10 max-w-[640px] text-[18px] leading-[1.55] text-[var(--color-text-muted)]">
                Each room shares the same sand walls, dark wood floors and hot water bottles
                at night. The difference is space, view and bed setup. Choose by what you
                want from the window.
              </p>
            </ScrollReveal>
          </Container>
        </Section>

        {/* Categories list */}
        <Section divider>
          <Container>
            <Stagger className="space-y-32 md:space-y-48">
              {categories.map((cat, i) => (
                <StaggerItem key={cat.slug}>
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                      i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                    }`}
                  >
                    {/* Image */}
                    <Link
                      href={`/rooms/${cat.slug}`}
                      className="lg:col-span-7 group block relative aspect-[5/4] overflow-hidden bg-[var(--color-bg-muted)]"
                    >
                      <Image
                        src={cat.heroImage}
                        alt={cat.name}
                        fill
                        sizes="(min-width: 1024px) 58vw, 100vw"
                        className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-[1.03]"
                        priority={i === 0}
                      />
                    </Link>

                    {/* Content */}
                    <div className="lg:col-span-5 flex flex-col">
                      <div className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--color-text-muted)]">
                        {cat.number} · {cat.count}
                      </div>
                      <h2 className="mt-5 font-display font-light text-[var(--color-text)] text-[40px] md:text-[52px] leading-[1.02] tracking-[-0.03em]">
                        {cat.name}
                      </h2>

                      <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 max-w-[420px]">
                        <div>
                          <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-text-muted)]">
                            Size
                          </div>
                          <div className="mt-1.5 text-[15px] text-[var(--color-text)]">
                            {cat.size}
                          </div>
                        </div>
                        <div>
                          <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-text-muted)]">
                            Capacity
                          </div>
                          <div className="mt-1.5 text-[15px] text-[var(--color-text)]">
                            {cat.capacity}
                          </div>
                        </div>
                        <div>
                          <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-text-muted)]">
                            View
                          </div>
                          <div className="mt-1.5 text-[15px] text-[var(--color-text)]">
                            {cat.view}
                          </div>
                        </div>
                        <div>
                          <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-text-muted)]">
                            From
                          </div>
                          <div className="mt-1.5 text-[15px] text-[var(--color-text)]">
                            {formatMga(cat.priceMga)} Ar
                            <span className="text-[var(--color-text-muted)]"> · ≈ {cat.priceEur} €</span>
                          </div>
                        </div>
                      </div>

                      <p className="mt-8 text-[16px] leading-[1.6] text-[var(--color-text-muted)] max-w-[480px]">
                        {cat.shortDescription}
                      </p>

                      <Link
                        href={`/rooms/${cat.slug}`}
                        className="mt-10 group inline-flex items-center gap-2 font-body text-[15px] font-medium text-[var(--color-text)] self-start"
                      >
                        See the {cat.name} rooms
                        <ArrowRight
                          size={18}
                          className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1"
                        />
                      </Link>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </Section>

        {/* Booking CTA */}
        <Section divider className="bg-[var(--color-bg-subtle)]">
          <Container>
            <ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
                <div className="md:col-span-7">
                  <Kicker>Reserve</Kicker>
                  <Heading variant="h2" className="mt-6 max-w-[760px]">
                    Direct booking. Instant answer within 24 hours.
                  </Heading>
                </div>
                <div className="md:col-span-5">
                  <BookingButton>Check availability</BookingButton>
                </div>
              </div>
            </ScrollReveal>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
