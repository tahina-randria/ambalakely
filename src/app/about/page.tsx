import type { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/atoms/Container';
import { Section } from '@/components/atoms/Section';
import { Heading } from '@/components/atoms/Heading';
import { Kicker } from '@/components/atoms/Kicker';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { BreadcrumbJsonLd } from '@/components/atoms/JsonLd';
import { BookingButton } from '@/components/atoms/BookingButton';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Mamy and Hasina Randriamahazo opened Ambalakely in 2018. Ten rooms, a restaurant, a garden, and the koselig idea of a small hotel that feels like a home.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About · Ambalakely',
    description: 'Mamy and Hasina, since 2018.',
    url: '/about',
  },
};

const milestones = [
  {
    year: '2015',
    title: 'The land',
    body: 'Mamy buys the hill above Ambalakely village. A view across the rice fields. He plants the first trees of what will become the garden.',
  },
  {
    year: '2018',
    title: 'Opening',
    body: 'The first four rooms open in October. Hasina takes the kitchen. Friends from Norway and France are the first guests.',
  },
  {
    year: '2021',
    title: 'Six more rooms',
    body: 'A second building. The Confort and Supérieure rooms add space and views. The garden begins supplying most of the restaurant.',
  },
  {
    year: '2024',
    title: 'Hope for the Future',
    body: 'The community programme reaches its tenth year of work — schools, clinics, water access in villages around Fianarantsoa.',
  },
];

const values = [
  {
    title: 'Slow travel',
    body:
      'A stay here is meant for two nights or more. Time to walk to the village, time to eat without rushing, time for the garden to give what it gives.',
  },
  {
    title: 'Real food',
    body:
      'Most of what arrives on the table comes from within fifteen kilometres. The garden, the rice fields, the village market on Tuesdays.',
  },
  {
    title: 'Stay small',
    body:
      'Ten rooms is the right number. Enough to make sense, small enough that nothing feels processed.',
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
      <main>
        {/* Page hero */}
        <Section bleed className="pt-[160px] md:pt-[200px] pb-24 md:pb-32 lg:pb-40">
          <Container>
            <ScrollReveal>
              <Kicker>The house</Kicker>
              <Heading variant="display" className="mt-6 max-w-[1100px]">
                A small hotel in the highlands. Ten rooms, a garden, a restaurant.
              </Heading>
              <p className="mt-12 max-w-[680px] text-[19px] leading-[1.55] text-[var(--color-text-muted)]">
                Mamy and Hasina Randriamahazo opened Ambalakely in October 2018. The idea
                was simple. A hotel that feels like a home, on a quiet hill ten kilometres
                south of Fianarantsoa, on the road between the capital and the south.
              </p>
            </ScrollReveal>
          </Container>
        </Section>

        {/* Founders portrait */}
        <Section divider>
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-7 relative aspect-[4/5] bg-[var(--color-bg-muted)] overflow-hidden">
                <Image
                  src="https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg?format=2000w"
                  alt="The garden at Ambalakely"
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  priority
                  className="object-cover"
                />
              </div>
              <div className="lg:col-span-5">
                <ScrollReveal>
                  <Kicker>Mamy and Hasina</Kicker>
                  <Heading variant="h2" className="mt-6 max-w-[420px]">
                    Two people, one house.
                  </Heading>
                  <div className="mt-8 space-y-5 text-[16px] leading-[1.65] text-[var(--color-text-muted)] max-w-[460px]">
                    <p>
                      Mamy grew up in Fianarantsoa, trained in agronomy and spent fifteen
                      years working in development across Madagascar. The garden, the
                      orchard, the way the buildings sit on the land — this is his work.
                    </p>
                    <p>
                      Hasina is from the Betsileo highlands, with a Norwegian godmother and
                      a slow education in cooking that took her from Antananarivo to Oslo
                      and back. The kitchen, the menu, the bread — this is her work.
                    </p>
                    <p>
                      They live on site with their two children. The hotel is the family
                      home as much as it is a place for guests.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </Container>
        </Section>

        {/* Timeline */}
        <Section divider>
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              <div className="lg:col-span-4">
                <ScrollReveal>
                  <Kicker>Timeline</Kicker>
                  <Heading variant="h2" className="mt-6 max-w-[360px]">
                    Ten years in four moments.
                  </Heading>
                </ScrollReveal>
              </div>
              <ul className="lg:col-span-8 border-t border-[var(--color-border-subtle)]">
                {milestones.map((m) => (
                  <li key={m.year} className="grid grid-cols-12 gap-6 py-10 border-b border-[var(--color-border-subtle)]">
                    <div className="col-span-3 md:col-span-2 font-mono text-[14px] tabular-nums text-[var(--color-text-muted)]">
                      {m.year}
                    </div>
                    <div className="col-span-9 md:col-span-10">
                      <div className="font-display text-[24px] md:text-[28px] tracking-[-0.02em] text-[var(--color-text)]">
                        {m.title}
                      </div>
                      <p className="mt-3 text-[15px] leading-[1.6] text-[var(--color-text-muted)] max-w-[640px]">
                        {m.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </Section>

        {/* Values */}
        <Section divider className="bg-[var(--color-bg-subtle)]">
          <Container>
            <ScrollReveal>
              <Kicker>How we work</Kicker>
              <Heading variant="h2" className="mt-6 max-w-[760px]">
                Three things we keep coming back to.
              </Heading>
            </ScrollReveal>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
              {values.map((v, i) => (
                <ScrollReveal key={v.title} delay={0.06 * i}>
                  <div className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--color-text-muted)]">
                    0{i + 1}
                  </div>
                  <h3 className="mt-4 font-display text-[24px] tracking-[-0.02em] text-[var(--color-text)]">
                    {v.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-[1.65] text-[var(--color-text-muted)]">
                    {v.body}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </Section>

        {/* Hope for the Future */}
        <Section divider>
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-5">
                <ScrollReveal>
                  <Kicker>Hope for the Future</Kicker>
                  <Heading variant="h2" className="mt-6 max-w-[420px]">
                    A second life next door.
                  </Heading>
                  <p className="mt-8 text-[16px] leading-[1.65] text-[var(--color-text-muted)] max-w-[460px]">
                    Hope for the Future is a community programme that has run for ten years
                    in the villages around Fianarantsoa. Schools, clinics, water access. A
                    portion of every stay supports its work — guests are welcome to visit.
                  </p>
                </ScrollReveal>
              </div>
              <div className="lg:col-span-7 relative aspect-[5/4] bg-[var(--color-bg-muted)] overflow-hidden">
                <Image
                  src="https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg?format=2000w"
                  alt="Around the hotel"
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Container>
        </Section>

        {/* Booking CTA */}
        <Section className="bg-[var(--color-sand-12)] text-[var(--color-sand-1)]">
          <Container>
            <ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
                <div className="md:col-span-8">
                  <div className="font-mono text-[12px] uppercase tracking-[0.12em] opacity-70">
                    Stay with us
                  </div>
                  <h2 className="mt-6 font-display font-light tracking-[-0.03em] text-[40px] leading-[1.05] md:text-[56px] md:leading-[1.02] max-w-[760px]">
                    Two nights or more. The garden gives more if you wait.
                  </h2>
                </div>
                <div className="md:col-span-4">
                  <BookingButton variant="solid-light">Check availability</BookingButton>
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
