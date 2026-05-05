import type { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/atoms/Container';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { BreadcrumbJsonLd } from '@/components/atoms/JsonLd';
import { BookingButton } from '@/components/atoms/BookingButton';
import {
  Users,
  ForkKnife,
  Door,
  Clock,
  Leaf,
  Wine,
  Coffee,
  Cookie,
} from '@phosphor-icons/react/dist/ssr';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';

export const metadata: Metadata = {
  title: 'Dining',
  description:
    'Hasina cooks one set menu each evening. Most of what arrives on the plate comes from the garden, the rice fields below, and the village market.',
  alternates: { canonical: '/dining' },
  openGraph: {
    title: 'Dining · Ambalakely',
    description: 'A small kitchen between Madagascar and Norway.',
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
        body:
          'Slow-braised local beef in tomato and white wine, served with red rice.',
      },
      {
        name: 'Kjøttkaker',
        body:
          'Norwegian meatballs in brown sauce, with potato purée and lingonberry from a friend in Oslo.',
      },
      {
        name: 'Ravitoto with coconut',
        body:
          'Pounded cassava leaves, slow-cooked with pork and coconut milk. The way Hasina’s grandmother made it.',
      },
      {
        name: 'Garden vegetable plate',
        body:
          'A vegetarian option each evening, drawn from whatever the garden gives that day.',
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
        body:
          'Hasina’s most asked-for dessert. Often vanilla, sometimes mango or tamarind.',
      },
      {
        name: 'Caramelised banana',
        body: 'Madagascan vanilla, a little rum from the village.',
      },
    ],
  },
];

const drinks: { label: string; body: string; Icon: PhosphorIcon }[] = [
  {
    label: 'Garden infusions',
    body: 'Lemongrass, ginger, Madagascan cinnamon.',
    Icon: Leaf,
  },
  {
    label: 'Local wines',
    body: 'A small selection from Soavita and Lazan’i Betsileo.',
    Icon: Wine,
  },
  {
    label: 'Madagascan rum',
    body: 'Dzama Vieux, served straight or in a digestif.',
    Icon: Cookie,
  },
  {
    label: 'Coffee',
    body: 'From Sahambavy, roasted in Fianarantsoa, ground each morning.',
    Icon: Coffee,
  },
];

const facts: { label: string; value: string; Icon: PhosphorIcon }[] = [
  { label: 'Seats', value: 'Fifty', Icon: Users },
  {
    label: 'Service',
    value: 'One set menu, three courses',
    Icon: ForkKnife,
  },
  {
    label: 'Open to',
    value: 'Hotel guests and day visitors',
    Icon: Door,
  },
  { label: 'Reservation', value: '24 hours in advance', Icon: Clock },
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
      <main id="main">
        {/* ────────────────────────────────────────────────────────────
            01 · HERO — kitchen image
        ──────────────────────────────────────────────────────────── */}
        <section className="relative h-[90vh] md:h-[100vh] w-full overflow-hidden bg-[var(--color-sand-12)]">
          <Image
            src="https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/d200532b-8f27-4564-9f43-9339dc083af5/DSC_0421.jpg?format=2500w"
            alt="The kitchen at Ambalakely"
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
              <div className="caption text-white/75">The restaurant</div>
            </div>
            <div className="mt-auto pb-14 md:pb-20 max-w-[1100px]">
              <h1 className="font-display font-light tracking-[-0.04em] text-white text-[56px] leading-[0.98] md:text-[96px] md:leading-[0.95] lg:text-[136px] lg:leading-[0.92]">
                Toko Telo.
              </h1>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────
            02 · INTRO + KEY FACTS
        ──────────────────────────────────────────────────────────── */}
        <section className="py-32 md:py-48 lg:py-56">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-3 lg:sticky lg:top-32 self-start">
                <ScrollReveal>
                  <div className="caption">Hasina’s kitchen</div>
                </ScrollReveal>
              </div>
              <div className="lg:col-span-9">
                <ScrollReveal>
                  <p className="lede max-w-[34ch]">
                    A small kitchen between Madagascar and Norway. One set
                    menu each evening, mostly from the garden.
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.05}>
                  <div className="mt-12 prose-editorial">
                    <p>
                      Most of what arrives on the plate comes from the garden
                      behind the kitchen, the rice fields below, and the
                      village market on Tuesdays. The rest comes from a few
                      suppliers within fifteen kilometres. Three courses, table
                      open from seven, last orders at nine.
                    </p>
                  </div>
                </ScrollReveal>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-2 max-w-[640px]">
                  {facts.map((row) => (
                    <ScrollReveal key={row.label}>
                      <div className="spec-row">
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
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ────────────────────────────────────────────────────────────
            03 · FULL-BLEED IMAGE
        ──────────────────────────────────────────────────────────── */}
        <section className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-[var(--color-bg-muted)]">
          <Image
            src="https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg?format=2500w"
            alt="The dining room at Toko Telo"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute bottom-5 right-5 md:bottom-7 md:right-7 caption text-white/85 mix-blend-difference"
          >
            Plate 01 · The dining room
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────
            04 · MENU
        ──────────────────────────────────────────────────────────── */}
        <section className="py-32 md:py-48 lg:py-56 hair-rule">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-3 lg:sticky lg:top-32 self-start">
                <ScrollReveal>
                  <div className="caption">This week</div>
                  <h2 className="mt-6 font-display font-light text-[var(--color-text)] text-[28px] md:text-[36px] leading-[1.05] tracking-[-0.025em] max-w-[260px]">
                    The menu changes with the garden.
                  </h2>
                  <p className="mt-6 prose-editorial text-[15px]">
                    Vegetarian on request. Allergies, with a day’s notice.
                  </p>
                </ScrollReveal>
              </div>

              <div className="lg:col-span-9 space-y-20 md:space-y-28">
                {courses.map((c) => (
                  <ScrollReveal key={c.section}>
                    <div>
                      <div className="caption mb-6 md:mb-8">{c.section}</div>
                      <ul className="border-t border-[var(--color-border-subtle)]">
                        {c.items.map((item) => (
                          <li
                            key={item.name}
                            className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 py-7 md:py-8 border-b border-[var(--color-border-subtle)]"
                          >
                            <div className="md:col-span-5 font-display font-light text-[22px] md:text-[28px] tracking-[-0.02em] leading-[1.15] text-[var(--color-text)]">
                              {item.name}
                            </div>
                            <p className="md:col-span-7 text-[15px] md:text-[16px] leading-[1.6] text-[var(--color-text-muted)] max-w-[520px]">
                              {item.body}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* ────────────────────────────────────────────────────────────
            05 · CONCIERGE NOTE — Hasina
        ──────────────────────────────────────────────────────────── */}
        <section className="py-32 md:py-48 lg:py-64 hair-rule bg-[var(--color-bg-subtle)]">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-3">
                <ScrollReveal>
                  <div className="caption">A note from Hasina</div>
                </ScrollReveal>
              </div>
              <div className="lg:col-span-8 lg:col-start-4">
                <ScrollReveal delay={0.05}>
                  <p className="concierge-note max-w-[58ch]">
                    &ldquo;I do not write the menu the night before. I write it the
                    morning of, after I have walked the garden. The pomelo tree
                    drops something in March. The watercress comes in May. The
                    menu follows.&rdquo;
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.1}>
                  <div className="mt-10 flex items-center gap-4">
                    <div className="w-10 border-t border-[var(--color-sand-12)]" />
                    <div className="font-display text-[16px] tracking-[-0.005em] text-[var(--color-text)]">
                      Hasina
                    </div>
                    <div className="caption text-[var(--color-text-muted)]">Kitchen</div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </Container>
        </section>

        {/* ────────────────────────────────────────────────────────────
            06 · DRINKS — typographic spec rows
        ──────────────────────────────────────────────────────────── */}
        <section className="py-32 md:py-48 lg:py-56 hair-rule">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-3 lg:sticky lg:top-32 self-start">
                <ScrollReveal>
                  <div className="caption">To drink</div>
                  <h2 className="mt-6 font-display font-light text-[var(--color-text)] text-[28px] md:text-[36px] leading-[1.05] tracking-[-0.025em] max-w-[260px]">
                    Short list, well chosen.
                  </h2>
                </ScrollReveal>
              </div>
              <div className="lg:col-span-9 max-w-[760px]">
                {drinks.map((d) => (
                  <ScrollReveal key={d.label}>
                    <div className="spec-row">
                      <div className="spec-row__label flex items-center gap-2.5">
                        <d.Icon
                          size={14}
                          weight="light"
                          className="text-[var(--color-text-muted)]"
                          aria-hidden
                        />
                        {d.label}
                      </div>
                      <div className="spec-row__value">{d.body}</div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* ────────────────────────────────────────────────────────────
            07 · CTA — reserve a table
        ──────────────────────────────────────────────────────────── */}
        <section className="py-32 md:py-48 lg:py-56 hair-rule bg-[var(--color-sand-12)] text-[var(--color-sand-1)]">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
              <div className="lg:col-span-8">
                <ScrollReveal>
                  <div className="caption text-[var(--color-sand-6)]">Reserve a table</div>
                  <h2 className="mt-6 font-display font-light tracking-[-0.035em] text-[44px] leading-[1.02] md:text-[64px] md:leading-[1] lg:text-[80px] lg:leading-[0.98] max-w-[860px]">
                    Day visitors welcome.
                    <br />
                    Reserve at least 24 hours ahead.
                  </h2>
                </ScrollReveal>
              </div>
              <div className="lg:col-span-4 lg:flex lg:justify-end">
                <ScrollReveal>
                  <BookingButton variant="solid-light">Reserve</BookingButton>
                </ScrollReveal>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
