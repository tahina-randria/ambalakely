import type { Metadata } from 'next';
import Link from 'next/link';
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
    'Hope for the Future. Ten years of school, clinic and water work in the villages around Fianarantsoa. A portion of every stay at Hotel Ambalakely supports it.',
  alternates: { canonical: '/community' },
  openGraph: {
    title: 'Community · Hotel Ambalakely',
    description:
      'Hope for the Future, ten years of community work around Fianarantsoa.',
    url: '/community',
    images: [
      {
        url: 'https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg?format=1500w',
        width: 1500,
        height: 1200,
        alt: 'Hope for the Future, community work in Fianarantsoa',
      },
    ],
  },
};

const numbers = [
  { value: '10', label: 'Years' },
  { value: '130', label: 'Children weekly' },
  { value: '4', label: 'Villages' },
  { value: '1', label: 'School' },
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
          src="https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg?format=2500w"
          alt="Hope for the Future programme around Fianarantsoa"
          caption="The work next door"
          title={['Hope', 'for the Future.']}
        />

        {/* ════════════════════════════════════════════════════════════
            INTRO — Hasina voice, opening
        ════════════════════════════════════════════════════════════ */}
        <section className="py-32 md:py-48 lg:py-64">
          <div className="mx-auto max-w-[700px] px-5 md:px-8">
            <ScrollReveal>
              <p className="font-display font-light text-[var(--color-text)] text-[28px] md:text-[40px] leading-[1.2] tracking-[-0.025em] balance">
                A school, a clinic, a water programme. Ten years in four villages
                around Fianarantsoa.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <div className="mt-14 prose-editorial space-y-6">
                <p>
                  Hope for the Future started in 2014, before the hotel. The work
                  began as a small school in Tanambao, the village closest to where
                  Mamy bought the land. Four years later, when we opened the rooms,
                  it felt natural to share what the hotel earned with the work next
                  door.
                </p>
                <p>
                  It is not separate from the hotel. The same team helps. The same
                  jardinier waters the school garden on Saturdays. The same cook
                  packs lunches for the children when there is a fete. Two of the
                  women who teach in the afternoon used to clean the rooms in the
                  morning.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            NUMBERS — typographic, growth signal
        ════════════════════════════════════════════════════════════ */}
        <section className="hair-rule py-24 md:py-32">
          <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12">
            <ScrollReveal>
              <div className="caption mb-12">In numbers</div>
            </ScrollReveal>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
              {numbers.map((n, i) => (
                <ScrollReveal key={n.label} delay={i * 0.04}>
                  <li>
                    <div className="font-display font-light text-[var(--color-text)] text-[64px] md:text-[96px] lg:text-[128px] leading-[0.92] tracking-[-0.04em] tabular-nums">
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

        {/* ════════════════════════════════════════════════════════════
            THE SCHOOL
        ════════════════════════════════════════════════════════════ */}
        <section className="py-32 md:py-48 lg:py-56 hair-rule">
          <div className="mx-auto max-w-[1100px] px-5 md:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-3 lg:sticky lg:top-32 self-start">
                <ScrollReveal>
                  <div className="caption">The school</div>
                </ScrollReveal>
              </div>
              <div className="lg:col-span-9 max-w-[760px]">
                <ScrollReveal>
                  <h2 className="font-display font-light text-[var(--color-text)] text-[36px] md:text-[56px] lg:text-[72px] leading-[1] tracking-[-0.035em] balance">
                    A hundred and thirty children, every week.
                  </h2>
                </ScrollReveal>
                <ScrollReveal delay={0.05}>
                  <div className="mt-10 prose-editorial space-y-6">
                    <p>
                      Children from Tanambao, Ankerana, Maharivo and Fenoarivo come
                      down to the school on Wednesdays and Saturdays after their
                      morning at the public school. The day is split between
                      tutoring (French, Malagasy, maths), arts (drawing, music) and
                      a hot meal at noon, often soup with rice from the hotel
                      kitchen.
                    </p>
                    <p>
                      The teachers are mostly women from the same villages who have
                      finished their own schooling and want to give a few hours
                      back. Some of them grew up coming to Hope as children. That
                      cycle is what we want to keep.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            VISIT
        ════════════════════════════════════════════════════════════ */}
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
                      one of the team to walk you through. There is no formal tour.
                      You meet the teachers, you see the classroom, you have a tea.
                      If you bring something to give, we ask you to give it
                      directly to the school, not to the children.
                    </p>
                    <p>
                      Tell us at booking if you want this in your stay. There is no
                      cost.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            PULL QUOTE — Hasina
        ════════════════════════════════════════════════════════════ */}
        <section className="py-32 md:py-48 hair-rule">
          <div className="mx-auto max-w-[1000px] px-5 md:px-8 lg:px-12">
            <ScrollReveal>
              <p className="pull-quote max-w-[26ch]">
                &ldquo;The hotel earns the work. The work earns the hotel.&rdquo;
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

        {/* ════════════════════════════════════════════════════════════
            HOW A STAY SUPPORTS
        ════════════════════════════════════════════════════════════ */}
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
                      the materials, the kitchen at the school, and the small
                      clinic that opens on Mondays.
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

        {/* ════════════════════════════════════════════════════════════
            CTA
        ════════════════════════════════════════════════════════════ */}
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
