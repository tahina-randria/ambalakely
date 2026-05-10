import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/atoms/Container';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { BreadcrumbJsonLd } from '@/components/atoms/JsonLd';
import { BookingButton } from '@/components/atoms/BookingButton';
import { PageHero } from '@/components/molecules/PageHero';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Mamy and Hasina Randriamahazo opened Ambalakely in October 2018. Ten rooms, a kitchen, a garden, on a hill twelve kilometres north of Fianarantsoa.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About · Hotel Ambalakely',
    description: 'Mamy and Hasina, since 2018.',
    url: '/about',
    images: [
      {
        url: 'https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg?format=1500w',
        width: 1500,
        height: 1200,
        alt: 'Hotel Ambalakely garden, Fianarantsoa Madagascar',
      },
    ],
  },
};

const milestones = [
  {
    year: '2015',
    title: 'The land',
    body:
      'Mamy buys the hill above Ambalakely village and plants the first trees of what will become the garden.',
  },
  {
    year: '2018',
    title: 'Opening',
    body:
      'Four rooms open in October. Hasina runs the menu and the welcome. Friends from Norway and France are the first guests.',
  },
  {
    year: '2021',
    title: 'A second building',
    body:
      'The Confort and Supérieure rooms open. The garden begins supplying most of what the kitchen needs.',
  },
  {
    year: '2024',
    title: 'Hope for the Future, ten years',
    body:
      'The community programme reaches its tenth year of work in the villages around Fianarantsoa.',
  },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'About', url: '/about' },
        ]}
      />
      <Nav />
      <main id="main">
        <PageHero
          src="https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg?format=2500w"
          alt="Hotel Ambalakely garden, Fianarantsoa Madagascar"
          title={['Mamy and Hasina,', 'founders of Ambalakely.']}
        />

        {/* ────────────────────────────────────────────────────────────
            02 · INTRO — short lede paragraph
        ──────────────────────────────────────────────────────────── */}
        <section className="py-32 md:py-48 lg:py-56">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-3 lg:sticky lg:top-32 self-start">
                <ScrollReveal>
                  <div className="caption">Since 2018</div>
                </ScrollReveal>
              </div>
              <div className="lg:col-span-9 max-w-[760px]">
                <ScrollReveal>
                  <p className="lede max-w-[34ch]">
                    A hotel that feels like a home, on a hill twelve kilometres
                    north of Fianarantsoa.
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.05}>
                  <div className="mt-12 prose-editorial">
                    <p>
                      Mamy and Hasina Randriamahazo opened Ambalakely in October
                      2018. Ten rooms, a kitchen, a garden, a small team. The
                      house is theirs and they live on site with their two
                      children. It is a working hotel, not a boutique idea.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </Container>
        </section>

        {/* ────────────────────────────────────────────────────────────
            03 · FOUNDERS — image + prose, asymmetric
        ──────────────────────────────────────────────────────────── */}
        <section id="founders" className="hair-rule">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 relative aspect-[4/5] lg:aspect-auto lg:min-h-[80vh] bg-[var(--color-bg-muted)] overflow-hidden">
              <Image
                src="https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg?format=2500w"
                alt="Garden room at Hotel Ambalakely, founders Mamy and Hasina Randriamahazo"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="lg:col-span-5 px-5 md:px-12 lg:px-16 py-20 md:py-32 flex flex-col justify-center">
              <ScrollReveal>
                <div className="caption">The founders</div>
                <h2 className="mt-6 font-display font-light text-[var(--color-text)] text-[36px] md:text-[52px] leading-[1.02] tracking-[-0.03em] max-w-[420px]">
                  Two people, one house.
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.05}>
                <div className="mt-10 prose-editorial max-w-[460px]">
                  <p>
                    Mamy grew up in Fianarantsoa, trained in agronomy, and spent
                    fifteen years working in development across Madagascar. The
                    garden, the orchard, the way the buildings sit on the land.
                    This is his work.
                  </p>
                  <p>
                    Hasina is from the Betsileo highlands, with a Norwegian
                    godmother and a slow education in hospitality that took her
                    from Antananarivo to Oslo and back. The menu, the welcome,
                    the rooms, the rhythm of the house. This is her work. The
                    restaurant, <Link href="/dining" className="underline-offset-4 hover:underline">Toko Telo</Link>,
                    is hers in concept. The kitchen team cooks it.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────
            04 · TIMELINE — elegant typographic list
        ──────────────────────────────────────────────────────────── */}
        <section className="py-32 md:py-48 lg:py-56 hair-rule">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-3 lg:sticky lg:top-32 self-start">
                <ScrollReveal>
                  <div className="caption">Timeline</div>
                  <h2 className="mt-6 font-display font-light text-[var(--color-text)] text-[28px] md:text-[36px] leading-[1.05] tracking-[-0.025em] max-w-[260px]">
                    Ten years in four moments.
                  </h2>
                </ScrollReveal>
              </div>
              <div className="lg:col-span-9">
                <ul className="border-t border-[var(--color-border-subtle)]">
                  {milestones.map((m, i) => (
                    <ScrollReveal key={m.year} delay={i * 0.04}>
                      <li className="grid grid-cols-12 gap-6 py-10 md:py-14 border-b border-[var(--color-border-subtle)]">
                        <div className="col-span-3 md:col-span-2">
                          <div className="font-mono text-[12px] tabular-nums text-[var(--color-text-muted)] tracking-[0.05em]">
                            {m.year}
                          </div>
                        </div>
                        <div className="col-span-9 md:col-span-10 max-w-[640px]">
                          <h3 className="font-display font-light text-[var(--color-text)] text-[28px] md:text-[40px] leading-[1.05] tracking-[-0.025em]">
                            {m.title}
                          </h3>
                          <p className="mt-4 prose-editorial">{m.body}</p>
                        </div>
                      </li>
                    </ScrollReveal>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>

        {/* ────────────────────────────────────────────────────────────
            05 · PULL QUOTE — concierge voice
        ──────────────────────────────────────────────────────────── */}
        <section className="py-32 md:py-48 hair-rule bg-[var(--color-bg-subtle)]">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-start-3 lg:col-span-9">
                <ScrollReveal>
                  <p className="pull-quote max-w-[22ch]">
                    &ldquo;The hotel is the family home as much as it is a place for
                    guests.&rdquo;
                  </p>
                  <div className="mt-10 flex items-center gap-4">
                    <div className="w-10 border-t border-[var(--color-sand-12)]" />
                    <div className="font-display text-[16px] tracking-[-0.005em] text-[var(--color-text)]">
                      Hasina
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </Container>
        </section>

        {/* ────────────────────────────────────────────────────────────
            06 · HOPE FOR THE FUTURE
        ──────────────────────────────────────────────────────────── */}
        <section id="hope" className="hair-rule">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 px-5 md:px-12 lg:px-16 py-20 md:py-32 lg:order-1 flex flex-col justify-center">
              <ScrollReveal>
                <div className="caption">Hope for the Future</div>
                <h2 className="mt-6 font-display font-light text-[var(--color-text)] text-[36px] md:text-[52px] leading-[1.02] tracking-[-0.03em] max-w-[420px]">
                  The work next door.
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.05}>
                <div className="mt-10 prose-editorial max-w-[460px]">
                  <p>
                    A school for the children of Tanambao, the quartier of
                    Ambalakely. Started in 2014, four years before the hotel.
                    A hundred and thirty children, ten years of the same
                    Wednesday and Saturday afternoons.
                  </p>
                  <p>
                    Two percent of every room booked goes to the work.
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <Link
                  href="/community"
                  className="mt-12 group inline-flex items-center gap-2 font-body text-[15px] font-medium text-[var(--color-text)]"
                >
                  Read about Hope for the Future
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1.5"
                  />
                </Link>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-7 lg:order-2 relative aspect-[4/5] lg:aspect-auto lg:min-h-[70vh] bg-[var(--color-bg-muted)] overflow-hidden">
              <Image
                src="https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/38aeed61-0d50-4cde-a210-1c6363f4139c/HFF2.jpg?format=2500w"
                alt="Hope for the Future, the school in Tanambao"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            BOOKING CTA — minimal inline, no dark panel
        ════════════════════════════════════════════════════════════ */}
        <section className="py-32 md:py-48 lg:py-64 hair-rule">
          <div className="mx-auto max-w-[920px] px-5 md:px-8">
            <ScrollReveal>
              <div className="caption">Stay with us</div>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h2 className="mt-8 font-display font-light text-[var(--color-text)] text-[48px] leading-[0.98] md:text-[80px] md:leading-[0.95] lg:text-[112px] lg:leading-[0.92] tracking-[-0.04em] balance">
                Two nights or more. The garden gives more if you wait.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="mt-12 flex flex-wrap items-baseline gap-x-10 gap-y-6">
                <BookingButton>Check availability</BookingButton>
                <p className="text-[14px] leading-[1.55] text-[var(--color-text-muted)] max-w-[400px]">
                  Free cancellation up to thirty days before arrival.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────
            08 · CONTINUE — link to rooms
        ──────────────────────────────────────────────────────────── */}
        <section className="py-32 md:py-48">
          <Container>
            <ScrollReveal>
              <Link
                href="/rooms"
                className="group inline-flex items-baseline gap-6 font-display font-light text-[var(--color-text)] text-[40px] md:text-[64px] tracking-[-0.03em] leading-[1.02]"
              >
                <span>The rooms</span>
                <ArrowRight
                  size={32}
                  className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-2 self-center"
                />
              </Link>
            </ScrollReveal>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
