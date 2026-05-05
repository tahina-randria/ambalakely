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
  title: 'Dining',
  description:
    'Hasina cooks Madagascan and Norwegian dishes in equal measure. Fifty seats, one set menu each evening, mostly from the garden.',
  alternates: { canonical: '/dining' },
  openGraph: {
    title: 'Dining · Ambalakely',
    description: 'A small restaurant. Mostly from the garden.',
    url: '/dining',
  },
};

const courses = [
  {
    section: 'Starters',
    items: [
      {
        name: 'Garden soup of the day',
        body: 'Whatever is best from the morning pick. Often pumpkin, often watercress.',
      },
      {
        name: 'Trondra fried in zebu fat',
        body: 'Local river fish, lemon from the tree by the kitchen.',
      },
      {
        name: 'Tomato salad with mint',
        body: 'Heirloom varieties from the garden. Two kinds of basil.',
      },
    ],
  },
  {
    section: 'Mains',
    items: [
      {
        name: 'Zébu Marengo',
        body: 'Slow-braised local beef in tomato and white wine, served with red rice.',
      },
      {
        name: 'Kjøttkaker',
        body: 'Norwegian meatballs in brown sauce, with potato purée and lingonberry from a friend in Oslo.',
      },
      {
        name: 'Ravitoto with coconut',
        body: 'Pounded cassava leaves, slow-cooked with pork and coconut milk. The way Hasina’s grandmother made it.',
      },
      {
        name: 'Garden vegetable plate',
        body: 'A vegetarian option each evening, drawn from whatever the garden gives that day.',
      },
    ],
  },
  {
    section: 'Sweet',
    items: [
      {
        name: 'Krumkake',
        body: 'Rolled Norwegian wafer, filled with cream and a touch of vanilla.',
      },
      {
        name: 'Homemade ice cream',
        body: 'Hasina’s most asked-for dessert. Often vanilla, sometimes mango or tamarind.',
      },
      {
        name: 'Caramelised banana',
        body: 'Madagascan vanilla, a little rum from the village.',
      },
    ],
  },
];

const facts = [
  { label: 'Seats', value: '50' },
  { label: 'Service', value: 'One set menu each evening' },
  { label: 'From', value: 'Garden + within 15 km' },
  { label: 'Open to', value: 'Hotel guests + day visitors' },
];

const drinks = [
  { name: 'Garden infusions', body: 'Lemongrass, ginger, Madagascan cinnamon.' },
  { name: 'Local wines', body: 'A small selection from Soavita and Lazan’i Betsileo.' },
  { name: 'Madagascan rum', body: 'Dzama Vieux. The good one.' },
  { name: 'Coffee from Sahambavy', body: 'Roasted in Fianarantsoa, ground each morning.' },
];

export default function DiningPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Dining', url: '/dining' },
        ]}
      />
      <Nav />
      <main>
        {/* Page hero */}
        <Section bleed className="pt-[160px] md:pt-[200px] pb-24 md:pb-32 lg:pb-40">
          <Container>
            <ScrollReveal>
              <Kicker>The restaurant</Kicker>
              <Heading variant="display" className="mt-6 max-w-[1100px]">
                A small kitchen between Madagascar and Norway.
              </Heading>
              <p className="mt-12 max-w-[680px] text-[19px] leading-[1.55] text-[var(--color-text-muted)]">
                Hasina cooks one set menu each evening. Most of what arrives on the plate
                comes from the garden behind the kitchen, the rice fields below, and the
                village market on Tuesdays. The rest comes from a few suppliers within
                fifteen kilometres.
              </p>
            </ScrollReveal>
          </Container>
        </Section>

        {/* Hero image */}
        <section className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-[var(--color-bg-muted)] overflow-hidden">
          <Image
            src="https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg?format=2500w"
            alt="The dining room"
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        </section>

        {/* Facts strip */}
        <Section divider className="py-16 md:py-20 lg:py-24">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8">
              {facts.map((f) => (
                <div key={f.label}>
                  <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
                    {f.label}
                  </div>
                  <div className="mt-3 font-display text-[20px] md:text-[24px] tracking-[-0.01em] text-[var(--color-text)]">
                    {f.value}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Menu */}
        <Section divider>
          <Container>
            <ScrollReveal>
              <Kicker>This week</Kicker>
              <Heading variant="h2" className="mt-6 max-w-[760px]">
                The menu changes with the garden.
              </Heading>
              <p className="mt-8 max-w-[560px] text-[15px] leading-[1.65] text-[var(--color-text-muted)]">
                One set menu each evening. Three courses. Vegetarian on request.
                Allergies, with a day’s notice.
              </p>
            </ScrollReveal>

            <div className="mt-20 space-y-20">
              {courses.map((c) => (
                <ScrollReveal key={c.section}>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                    <div className="lg:col-span-3">
                      <div className="font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--color-text-muted)] sticky top-24">
                        {c.section}
                      </div>
                    </div>
                    <ul className="lg:col-span-9 border-t border-[var(--color-border-subtle)]">
                      {c.items.map((item) => (
                        <li
                          key={item.name}
                          className="py-8 border-b border-[var(--color-border-subtle)] grid grid-cols-1 md:grid-cols-12 gap-4"
                        >
                          <div className="md:col-span-5 font-display text-[22px] md:text-[26px] tracking-[-0.02em] text-[var(--color-text)]">
                            {item.name}
                          </div>
                          <div className="md:col-span-7 text-[15px] leading-[1.6] text-[var(--color-text-muted)]">
                            {item.body}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </Section>

        {/* Drinks */}
        <Section divider className="bg-[var(--color-bg-subtle)]">
          <Container>
            <ScrollReveal>
              <Kicker>To drink</Kicker>
              <Heading variant="h2" className="mt-6 max-w-[760px]">
                A short list, well chosen.
              </Heading>
            </ScrollReveal>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-[860px]">
              {drinks.map((d, i) => (
                <ScrollReveal key={d.name} delay={0.04 * i}>
                  <div className="border-t border-[var(--color-border-subtle)] pt-6">
                    <div className="font-display text-[22px] tracking-[-0.02em] text-[var(--color-text)]">
                      {d.name}
                    </div>
                    <p className="mt-2 text-[15px] leading-[1.6] text-[var(--color-text-muted)]">
                      {d.body}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </Section>

        {/* Garden note */}
        <Section divider>
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              <div className="lg:col-span-5">
                <ScrollReveal>
                  <Kicker>The garden</Kicker>
                  <Heading variant="h2" className="mt-6 max-w-[420px]">
                    Where most of dinner comes from.
                  </Heading>
                </ScrollReveal>
              </div>
              <div className="lg:col-span-7">
                <ScrollReveal delay={0.05}>
                  <p className="text-[18px] leading-[1.6] text-[var(--color-text)] max-w-[620px]">
                    A working garden, not a decorative one. Tomatoes, herbs, leafy
                    greens, root vegetables, fruit trees. A small orchard further down
                    the slope. Eggs from the chickens. Honey from a neighbour.
                  </p>
                  <p className="mt-6 text-[16px] leading-[1.65] text-[var(--color-text-muted)] max-w-[620px]">
                    Guests can walk through with one of the team in the morning. Pick
                    something for the kitchen if you want to.
                  </p>
                </ScrollReveal>
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
                    Reserve a table
                  </div>
                  <h2 className="mt-6 font-display font-light tracking-[-0.03em] text-[40px] leading-[1.05] md:text-[56px] md:leading-[1.02] max-w-[760px]">
                    Day visitors welcome. Reserve at least 24 hours in advance.
                  </h2>
                </div>
                <div className="md:col-span-4">
                  <BookingButton variant="solid-light">Reserve</BookingButton>
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
