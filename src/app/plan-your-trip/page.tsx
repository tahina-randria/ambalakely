import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { BreadcrumbJsonLd } from '@/components/atoms/JsonLd';
import { BookingButton } from '@/components/atoms/BookingButton';
import { PageHero } from '@/components/molecules/PageHero';
import { ArrowRight, Clock, MapTrifold } from '@phosphor-icons/react/dist/ssr';
import { fetchItineraries } from '@/sanity/lib/fetch';
import { PHOTOS } from '@/lib/data/photos';

export const metadata: Metadata = {
  title: 'Plan your trip',
  description:
    'Three itineraries for travelling the RN7 with Hôtel Ambalakely as a base. Three, five and seven-day plans for Madagascar.',
  alternates: { canonical: '/plan-your-trip' },
  openGraph: {
    title: 'Plan your trip · Hôtel Ambalakely',
    description: 'Three itineraries for the RN7. With Ambalakely as the base.',
    url: '/plan-your-trip',
    images: [
      {
        url: PHOTOS.planTrip.url,
        width: 2560,
        height: 1707,
        alt: 'View from Hôtel Ambalakely on the RN7',
      },
    ],
  },
};

export default async function PlanYourTripPage() {
  const itineraries = await fetchItineraries();
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Plan your trip', url: '/plan-your-trip' },
        ]}
      />
      <Nav />
      <main id="main">
        <PageHero
          src={PHOTOS.planTrip.path}
          alt="Rice fields below Hôtel Ambalakely on the RN7"
          title={['Plan your trip', 'on the RN7.']}
        />

        {/* ════════════════════════════════════════════════════════════
            INTRO
        ════════════════════════════════════════════════════════════ */}
        <section className="py-32 md:py-48 lg:py-56">
          <div className="mx-auto max-w-[700px] px-5 md:px-8">
            <ScrollReveal>
              <p className="lede-display">
                Three ways to use the road. Same hotel, different stretch.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <div className="mt-12 prose-editorial">
                <p>
                  The RN7 runs the length of central Madagascar, from the capital
                  Antananarivo down to the southern coast at Tulear. Most travellers
                  do at least part of it. Ambalakely sits roughly halfway, twelve
                  kilometres north of Fianarantsoa. We are a comfortable two nights
                  on a short trip, three or four on a longer one.
                </p>
                <p>
                  Below are three itineraries that work. Mix them however you want.
                  Drivers, transfers and park guides are arranged by the hotel.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            QUICK NAV — three itinerary anchors
        ════════════════════════════════════════════════════════════ */}
        <section className="hair-rule py-16 md:py-20">
          <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12">
            <ScrollReveal>
              <div className="caption mb-10">Choose a length</div>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                {itineraries.map((it) => (
                  <li key={it.slug}>
                    <Link
                      href={`#${it.slug}`}
                      className="group block py-6 border-t border-[var(--color-border-subtle)]"
                    >
                      <div className="inline-flex items-center gap-2 caption text-[var(--color-text-muted)]">
                        <Clock size={13} weight="regular" aria-hidden />
                        {it.duration}
                      </div>
                      <div className="mt-3 font-display font-light text-[var(--color-text)] text-[24px] md:text-[28px] tracking-[-0.02em] leading-[1.15] group-hover:translate-x-1 transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)]">
                        {it.title}
                      </div>
                      <div className="mt-2 inline-flex items-center gap-2 caption text-[var(--color-text-muted)]">
                        <MapTrifold size={13} weight="regular" aria-hidden />
                        {it.totalKm}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            EACH ITINERARY — magazine chapter, day-by-day list
        ════════════════════════════════════════════════════════════ */}
        {itineraries.map((it) => (
          <div key={it.slug}>
            {/* Atmospheric image break before each chapter */}
            <section className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-[var(--color-bg-muted)]">
              <Image
                src={it.image}
                alt={`${it.title} — ${it.duration} on the RN7`}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute bottom-5 right-5 md:bottom-8 md:right-8 caption text-white/85 mix-blend-difference"
              >
                {it.duration}
              </div>
            </section>

            <section
              id={it.slug}
              className="hair-rule py-32 md:py-48 lg:py-56"
            >
              <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12">
                {/* Chapter header */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20 md:mb-28">
                <div className="lg:col-span-3">
                  <ScrollReveal>
                    <div className="caption">{it.duration}</div>
                    <div className="mt-4 caption text-[var(--color-text-muted)]">
                      {it.totalKm}
                    </div>
                    <div className="mt-2 caption text-[var(--color-text-muted)]">
                      Best : {it.best}
                    </div>
                  </ScrollReveal>
                </div>
                <div className="lg:col-span-9 max-w-[760px]">
                  <ScrollReveal delay={0.05}>
                    <h2 className="font-display font-light text-[var(--color-text)] text-[44px] leading-[1] md:text-[56px] md:leading-[0.98] tracking-[-0.03em] balance">
                      {it.title}
                    </h2>
                  </ScrollReveal>
                  <ScrollReveal delay={0.1}>
                    <p className="mt-10 prose-editorial">{it.pitch}</p>
                  </ScrollReveal>
                </div>
              </div>

              {/* Day-by-day list */}
              <ul className="border-t border-[var(--color-border-subtle)]">
                {it.days.map((d, i) => (
                  <ScrollReveal key={d.day} delay={i * 0.04}>
                    <li className="grid grid-cols-12 gap-6 py-10 md:py-14 border-b border-[var(--color-border-subtle)]">
                      <div className="col-span-3 md:col-span-2">
                        <div className="font-mono text-[12px] tracking-[0.05em] text-[var(--color-text-muted)] uppercase">
                          Day {d.day}
                        </div>
                      </div>
                      <div className="col-span-9 md:col-span-10 max-w-[760px]">
                        <h3 className="font-display font-light text-[var(--color-text)] text-[24px] md:text-[32px] tracking-[-0.025em] leading-[1.1]">
                          {d.title}
                        </h3>
                        <p className="mt-5 prose-editorial">{d.body}</p>
                        {d.transit ? (
                          <p className="mt-4 caption text-[var(--color-text-muted)]">
                            {d.transit}
                          </p>
                        ) : null}
                      </div>
                      </li>
                    </ScrollReveal>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        ))}

        {/* ════════════════════════════════════════════════════════════
            BOOKING CTA
        ════════════════════════════════════════════════════════════ */}
        <section className="py-32 md:py-48 lg:py-64 hair-rule">
          <div className="mx-auto max-w-[920px] px-5 md:px-8">
            <ScrollReveal>
              <div className="caption">Reserve</div>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h2 className="mt-8 font-display font-light text-[var(--color-text)] text-[44px] leading-[1] md:text-[56px] md:leading-[0.98] tracking-[-0.03em] balance">
                We arrange the rest.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="mt-10 prose-editorial">
                Drivers, park guides, airport transfers, all from the hotel desk.
                Tell us your dates and which itinerary feels right and we will put
                it together.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="mt-12 flex flex-wrap items-baseline gap-x-10 gap-y-6">
                <BookingButton>Check availability</BookingButton>
                <Link
                  href="/rooms"
                  className="group inline-flex items-center gap-3 font-display font-light text-[var(--color-text)] text-[24px] md:text-[28px] tracking-[-0.02em] leading-[1.05]"
                >
                  Read about the rooms
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
