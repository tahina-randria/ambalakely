import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { BreadcrumbJsonLd } from '@/components/atoms/JsonLd';
import { BookingButton } from '@/components/atoms/BookingButton';
import { PageHero } from '@/components/molecules/PageHero';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

export const metadata: Metadata = {
  title: 'Community',
  description:
    'Hope for the Future. A school for the children of Tanambao, the quartier of Ambalakely, Madagascar. A portion of every stay at the hotel supports it.',
  alternates: { canonical: '/community' },
  openGraph: {
    title: 'Community · Hotel Ambalakely',
    description:
      'Hope for the Future. A school for the children of Tanambao, Ambalakely.',
    url: '/community',
    images: [
      {
        url: 'https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/38aeed61-0d50-4cde-a210-1c6363f4139c/HFF2.jpg?format=1500w',
        width: 1500,
        height: 1200,
        alt: 'Hope for the Future school in Tanambao, Ambalakely',
      },
    ],
  },
};

const numbers = [
  { value: '10', label: 'Years' },
  { value: '130', label: 'Children' },
  { value: '4 000', label: 'Inhabitants' },
  { value: '1', label: 'Quartier' },
];

const missions = [
  {
    title: 'Education',
    body:
      'Tutoring after the public school day. French, Malagasy, maths. Arts and music in the afternoons. A hot meal at noon on school days.',
  },
  {
    title: 'Health',
    body:
      'A small clinic on Mondays. The nurse comes from Fianarantsoa. People bring their children to be weighed, vaccinated, reassured. The medicines come at a reduced price from a partner pharmacy.',
  },
  {
    title: 'Environment',
    body:
      'A water spring restored in 2022 above the village, with new piping and a small concrete tank, now used by three hundred and forty people. A tree-planting programme each November.',
  },
];

const timeline = [
  {
    year: '2014',
    title: 'A borrowed room',
    body:
      'We start with six children in a room lent to us by a family in Tanambao. A retired teacher carries a blackboard from a closed school in Fianarantsoa.',
  },
  {
    year: '2018',
    title: 'The hotel opens',
    body:
      'Hotel Ambalakely opens in October. From the first night, two percent of every booking goes to the school next door.',
  },
  {
    year: '2019',
    title: 'A small clinic',
    body:
      'Two rooms, a nurse from Fianarantsoa on Mondays. People bring their children to be weighed, vaccinated, reassured. Medicines from a partner pharmacy at a reduced price.',
  },
  {
    year: '2022',
    title: 'The water spring',
    body:
      'A spring above the village, untouched for twenty years, is cleaned out. New pipe, a small concrete tank. Three hundred and forty people now use the tap.',
  },
  {
    year: 'Today',
    title: 'A hundred and thirty children',
    body:
      'Three of them have come back as teachers. The same Wednesday and Saturday afternoons, ten years on.',
  },
];

export default function CommunityPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Community', url: '/community' },
        ]}
      />
      <Nav />
      <main id="main">
        <PageHero
          src="https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/38aeed61-0d50-4cde-a210-1c6363f4139c/HFF2.jpg?format=2500w"
          alt="Hope for the Future school in Tanambao village, Ambalakely"
          title={['Hope for the Future,', 'the school of Ambalakely.']}
        />

        {/* INTRO — centered */}
        <section className="py-32 md:py-48 lg:py-56">
          <div className="mx-auto max-w-[700px] px-5 md:px-8">
            <ScrollReveal>
              <p className="font-display font-light text-[var(--color-text)] text-[28px] md:text-[36px] leading-[1.2] tracking-[-0.025em] balance">
                A school for the children of our quartier. Ten years, started before
                we opened the rooms.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <div className="mt-14 prose-editorial space-y-6">
                <p>
                  Hope for the Future is the small charity we started ten years
                  ago in the quartier of Tanambao, in the village of Ambalakely.
                  The village has around four thousand inhabitants and sits twelve
                  kilometres north of Fianarantsoa, on a hill at the edge of the
                  rice fields.
                </p>
                <p>
                  We had been working in tourism for years. We had seen children
                  begging on the road in every region we travelled through. When
                  we walked our own quartier in the middle of the day, we counted
                  the same thing : children at home or in the streets, not in
                  school. A short survey told us about a hundred and thirty
                  children from Tanambao were rarely or never going to the public
                  school.
                </p>
                <p>
                  When we built the hotel four years later, we already knew what
                  the hotel would pay for next door.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* NUMBERS — bg-subtle alternance */}
        <section className="py-24 md:py-32 hair-rule bg-[var(--color-bg-subtle)]">
          <div className="mx-auto max-w-[1100px] px-5 md:px-8 lg:px-12">
            <ScrollReveal>
              <div className="caption text-center mb-12 md:mb-16">In numbers</div>
            </ScrollReveal>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
              {numbers.map((n, i) => (
                <ScrollReveal key={n.label} delay={i * 0.04}>
                  <li className="text-center">
                    <div className="font-display font-light text-[var(--color-text)] text-[48px] md:text-[64px] lg:text-[80px] leading-[1] tracking-[-0.03em] tabular-nums whitespace-nowrap">
                      {n.value}
                    </div>
                    <div className="mt-4 caption text-[var(--color-text-muted)]">
                      {n.label}
                    </div>
                  </li>
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </section>

        {/* TIMELINE — vertical, hairline rules */}
        <section className="py-32 md:py-48 lg:py-56 hair-rule">
          <div className="mx-auto max-w-[1100px] px-5 md:px-8 lg:px-12">
            <ScrollReveal>
              <div className="caption text-center mb-4">Timeline</div>
              <h2 className="font-display font-light text-[var(--color-text)] text-[40px] md:text-[56px] leading-[1] tracking-[-0.03em] balance text-center mx-auto max-w-[680px]">
                Ten years in five moments.
              </h2>
            </ScrollReveal>

            <ul className="mt-20 md:mt-28 mx-auto max-w-[860px] border-t border-[var(--color-border-subtle)]">
              {timeline.map((t, i) => (
                <ScrollReveal key={t.year} delay={i * 0.05}>
                  <li className="grid grid-cols-12 gap-6 py-10 md:py-14 border-b border-[var(--color-border-subtle)]">
                    <div className="col-span-3 md:col-span-2">
                      <div className="font-mono text-[12px] tabular-nums text-[var(--color-text-muted)] tracking-[0.05em] uppercase">
                        {t.year}
                      </div>
                    </div>
                    <div className="col-span-9 md:col-span-10 max-w-[640px]">
                      <h3 className="font-display font-light text-[var(--color-text)] text-[24px] md:text-[32px] leading-[1.05] tracking-[-0.025em]">
                        {t.title}
                      </h3>
                      <p className="mt-4 prose-editorial text-[15px] md:text-[16px]">
                        {t.body}
                      </p>
                    </div>
                  </li>
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </section>

        {/* MISSIONS — bg-subtle alternance, 3 pillars */}
        <section className="py-32 md:py-48 lg:py-56 hair-rule bg-[var(--color-bg-subtle)]">
          <div className="mx-auto max-w-[1100px] px-5 md:px-8 lg:px-12">
            <ScrollReveal>
              <div className="caption text-center mb-4">What we do</div>
              <h2 className="font-display font-light text-[var(--color-text)] text-[40px] md:text-[56px] leading-[1] tracking-[-0.03em] balance text-center mx-auto max-w-[680px]">
                Three pillars.
              </h2>
            </ScrollReveal>
            <ul className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
              {missions.map((m, i) => (
                <ScrollReveal key={m.title} delay={i * 0.05}>
                  <li>
                    <div className="caption text-[var(--color-text-muted)] mb-4">
                      0{i + 1}
                    </div>
                    <h3 className="font-display font-light text-[var(--color-text)] text-[28px] md:text-[36px] leading-[1.05] tracking-[-0.025em]">
                      {m.title}
                    </h3>
                    <p className="mt-5 prose-editorial text-[15px] md:text-[16px]">
                      {m.body}
                    </p>
                  </li>
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </section>

        {/* IMAGE — full bleed */}
        <section className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-[var(--color-bg-muted)]">
          <Image
            src="https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/38aeed61-0d50-4cde-a210-1c6363f4139c/HFF2.jpg?format=2500w"
            alt="Hope for the Future, children of Tanambao"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </section>

        {/* PULL QUOTE — centered */}
        <section className="py-32 md:py-48 hair-rule">
          <div className="mx-auto max-w-[1000px] px-5 md:px-8 lg:px-12 text-center">
            <ScrollReveal>
              <p className="pull-quote mx-auto max-w-[28ch]">
                &ldquo;We knew the hotel would pay for the work next door before
                we built the hotel.&rdquo;
              </p>
              <div className="mt-12 inline-flex items-center gap-4">
                <div className="w-12 border-t border-[var(--color-sand-12)]" />
                <div className="font-display text-[18px] tracking-[-0.005em] text-[var(--color-text)]">
                  Hasina
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* VISIT — bg-subtle alternance */}
        <section className="py-32 md:py-48 lg:py-56 hair-rule bg-[var(--color-bg-subtle)]">
          <div className="mx-auto max-w-[760px] px-5 md:px-8 text-center">
            <ScrollReveal>
              <div className="caption mb-4">Visit</div>
              <h2 className="font-display font-light text-[var(--color-text)] text-[40px] md:text-[56px] leading-[1] tracking-[-0.03em] balance">
                Guests are welcome to come along.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <div className="mt-12 prose-editorial space-y-6 text-left">
                <p>
                  Half-days on Tuesdays or Thursdays. We arrange a driver and one
                  of the team to walk you through. There is no formal tour. You
                  meet the teachers, you see the classroom, you have a tea. If
                  you bring something to give, we ask you to give it directly to
                  the school, not to the children.
                </p>
                <p>
                  Tell us at booking if you want this in your stay. There is no
                  cost.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* HOW A STAY SUPPORTS */}
        <section className="py-32 md:py-48 lg:py-56 hair-rule">
          <div className="mx-auto max-w-[760px] px-5 md:px-8 text-center">
            <ScrollReveal>
              <div className="caption mb-4">Your stay</div>
              <h2 className="font-display font-light text-[var(--color-text)] text-[40px] md:text-[56px] leading-[1] tracking-[-0.03em] balance">
                Two percent of every stay.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <div className="mt-12 prose-editorial space-y-6 text-left">
                <p>
                  Two percent of every room booked at Hotel Ambalakely goes
                  directly to Hope for the Future. It pays for the teachers, the
                  materials, the meal at noon, and the small clinic that opens on
                  Mondays.
                </p>
                <p>
                  The rest comes from a few private donors and Hasina&rsquo;s
                  Norwegian network. We publish a short audited summary every
                  January, available on request at the desk.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 md:py-48 lg:py-64 hair-rule bg-[var(--color-bg-subtle)]">
          <div className="mx-auto max-w-[920px] px-5 md:px-8 text-center">
            <ScrollReveal>
              <div className="caption mb-4">Stay with us</div>
              <h2 className="font-display font-light text-[var(--color-text)] text-[40px] md:text-[56px] leading-[1] tracking-[-0.03em] balance">
                A night here is a week of school there.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="mt-12 inline-flex flex-wrap items-baseline gap-x-10 gap-y-6 justify-center">
                <BookingButton>Check availability</BookingButton>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-3 font-body text-[15px] font-medium text-[var(--color-text)]"
                >
                  Read about the house
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1.5"
                  />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
