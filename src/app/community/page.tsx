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
  { value: '4 000', label: 'Inhabitants' },
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

        {/* INTRO — Hasina voice, real story */}
        <section className="py-32 md:py-48 lg:py-64">
          <div className="mx-auto max-w-[700px] px-5 md:px-8">
            <ScrollReveal>
              <p className="font-display font-light text-[var(--color-text)] text-[28px] md:text-[40px] leading-[1.2] tracking-[-0.025em] balance">
                A school for the children of our quartier. Ten years, started before
                we opened the rooms.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <div className="mt-14 prose-editorial space-y-6">
                <p>
                  Hope for the Future is the small charity we started ten years ago
                  in the quartier of Tanambao, in the village of Ambalakely. The
                  village has around four thousand inhabitants and sits twelve
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

        {/* NUMBERS */}
        <section className="hair-rule py-24 md:py-32">
          <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12">
            <ScrollReveal>
              <div className="caption mb-12">In numbers</div>
            </ScrollReveal>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
              {numbers.map((n, i) => (
                <ScrollReveal key={n.label} delay={i * 0.04}>
                  <li>
                    <div className="font-display font-light text-[var(--color-text)] text-[48px] md:text-[72px] lg:text-[88px] leading-[1] tracking-[-0.03em] tabular-nums whitespace-nowrap">
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

        {/* MISSIONS — three pillars */}
        <section className="py-32 md:py-48 lg:py-56 hair-rule">
          <div className="mx-auto max-w-[1100px] px-5 md:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-3 lg:sticky lg:top-32 self-start">
                <ScrollReveal>
                  <div className="caption">What we do</div>
                  <h2 className="mt-6 font-display font-light text-[var(--color-text)] text-[28px] md:text-[36px] leading-[1.05] tracking-[-0.025em] max-w-[260px]">
                    Three pillars.
                  </h2>
                </ScrollReveal>
              </div>
              <div className="lg:col-span-9">
                <ul className="border-t border-[var(--color-border-subtle)]">
                  {missions.map((m, i) => (
                    <ScrollReveal key={m.title} delay={i * 0.04}>
                      <li className="grid grid-cols-12 gap-6 py-10 md:py-14 border-b border-[var(--color-border-subtle)]">
                        <div className="col-span-3 md:col-span-2 caption text-[var(--color-text-muted)] uppercase mt-1">
                          0{i + 1}
                        </div>
                        <div className="col-span-9 md:col-span-10 max-w-[640px]">
                          <h3 className="font-display font-light text-[var(--color-text)] text-[28px] md:text-[40px] leading-[1.05] tracking-[-0.025em]">
                            {m.title}
                          </h3>
                          <p className="mt-5 prose-editorial">{m.body}</p>
                        </div>
                      </li>
                    </ScrollReveal>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* IMAGE — community photo */}
        <section className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-[var(--color-bg-muted)]">
          <Image
            src="https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/38aeed61-0d50-4cde-a210-1c6363f4139c/HFF2.jpg?format=2500w"
            alt="Hope for the Future, children of Tanambao"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </section>

        {/* PULL QUOTE — Hasina */}
        <section className="py-32 md:py-48 hair-rule">
          <div className="mx-auto max-w-[1000px] px-5 md:px-8 lg:px-12">
            <ScrollReveal>
              <p className="pull-quote max-w-[28ch]">
                &ldquo;We knew the hotel would pay for the work next door before we
                built the hotel.&rdquo;
              </p>
              <div className="mt-12 flex items-center gap-4">
                <div className="w-12 border-t border-[var(--color-sand-12)]" />
                <div className="font-display text-[18px] tracking-[-0.005em] text-[var(--color-text)]">
                  Hasina
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* VISIT */}
        <section className="py-32 md:py-48 lg:py-56 hair-rule bg-[var(--color-bg-subtle)]">
          <div className="mx-auto max-w-[1100px] px-5 md:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-3 lg:sticky lg:top-32 self-start">
                <ScrollReveal>
                  <div className="caption">Visit</div>
                </ScrollReveal>
              </div>
              <div className="lg:col-span-9 max-w-[760px]">
                <ScrollReveal>
                  <h2 className="font-display font-light text-[var(--color-text)] text-[36px] md:text-[56px] lg:text-[72px] leading-[1] tracking-[-0.035em] balance">
                    Guests are welcome to come along.
                  </h2>
                </ScrollReveal>
                <ScrollReveal delay={0.05}>
                  <div className="mt-10 prose-editorial space-y-6">
                    <p>
                      Half-days on Tuesdays or Thursdays. We arrange a driver and
                      one of the team to walk you through. There is no formal
                      tour. You meet the teachers, you see the classroom, you have
                      a tea. If you bring something to give, we ask you to give it
                      directly to the school, not to the children.
                    </p>
                    <p>
                      Tell us at booking if you want this in your stay. There is
                      no cost.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* HOW A STAY SUPPORTS */}
        <section className="py-32 md:py-48 lg:py-56 hair-rule">
          <div className="mx-auto max-w-[1100px] px-5 md:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-3 lg:sticky lg:top-32 self-start">
                <ScrollReveal>
                  <div className="caption">Your stay</div>
                </ScrollReveal>
              </div>
              <div className="lg:col-span-9 max-w-[760px]">
                <ScrollReveal>
                  <h2 className="font-display font-light text-[var(--color-text)] text-[36px] md:text-[56px] lg:text-[72px] leading-[1] tracking-[-0.035em] balance">
                    Two percent of every stay.
                  </h2>
                </ScrollReveal>
                <ScrollReveal delay={0.05}>
                  <div className="mt-10 prose-editorial space-y-6">
                    <p>
                      Two percent of every room booked at Hotel Ambalakely goes
                      directly to Hope for the Future. It pays for the teachers,
                      the materials, the meal at noon, and the small clinic that
                      opens on Mondays.
                    </p>
                    <p>
                      The rest comes from a few private donors and Hasina&rsquo;s
                      Norwegian network. We publish a short audited summary every
                      January, available on request at the desk.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 md:py-48 lg:py-64 hair-rule">
          <div className="mx-auto max-w-[920px] px-5 md:px-8">
            <ScrollReveal>
              <div className="caption">Stay with us</div>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h2 className="mt-8 font-display font-light text-[var(--color-text)] text-[48px] leading-[0.98] md:text-[80px] md:leading-[0.95] lg:text-[112px] lg:leading-[0.92] tracking-[-0.04em] balance">
                A night here is a week of school there.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="mt-12 flex flex-wrap items-baseline gap-x-10 gap-y-6">
                <BookingButton>Check availability</BookingButton>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-3 font-display font-light text-[var(--color-text)] text-[24px] md:text-[28px] tracking-[-0.02em] leading-[1.05]"
                >
                  Read about the house
                  <ArrowRight
                    size={22}
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
