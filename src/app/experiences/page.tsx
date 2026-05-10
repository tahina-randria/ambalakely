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
import { experiences } from '@/lib/data/experiences';

export const metadata: Metadata = {
  title: 'Experiences',
  description:
    'Ten things to do from Hotel Ambalakely. Ranomafana lemurs, rice field walks, the kitchen, Sahambavy tea, Andringitra trek, Ambositra woodcarving, the school visit, and more.',
  alternates: { canonical: '/experiences' },
  openGraph: {
    title: 'Experiences · Hotel Ambalakely',
    description: 'Ten things to do, all arranged from the desk.',
    url: '/experiences',
    images: [
      {
        url: 'https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg?format=1500w',
        width: 1500,
        height: 1200,
        alt: 'View from Hotel Ambalakely on the RN7',
      },
    ],
  },
};

export default function ExperiencesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Experiences', url: '/experiences' },
        ]}
      />
      <Nav />
      <main id="main">
        <PageHero
          src="https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg?format=2500w"
          alt="View of the rice fields from Hotel Ambalakely"
          title={['Experiences', 'from Ambalakely.']}
        />

        {/* INTRO */}
        <section className="py-32 md:py-48 lg:py-56">
          <div className="mx-auto max-w-[700px] px-5 md:px-8">
            <ScrollReveal>
              <p className="font-display font-light text-[var(--color-text)] text-[28px] md:text-[40px] leading-[1.2] tracking-[-0.025em] balance">
                Ten things you can do from the hotel. All arranged from the desk.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <p className="mt-12 prose-editorial">
                Most guests do two or three of these. The rice field walk and a
                visit to the school happen on foot from the hotel. Ranomafana,
                Sahambavy, Andringitra, Ambositra, Tsaranoro need a driver. We
                arrange the driver, the park guide, the picnic and the tea, in
                any combination.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* QUICK NAV */}
        <section className="hair-rule py-16 md:py-20">
          <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12">
            <ScrollReveal>
              <div className="caption mb-10">At a glance</div>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12">
                {experiences.map((exp) => (
                  <li
                    key={exp.slug}
                    className="border-t border-[var(--color-border-subtle)] py-5"
                  >
                    <Link
                      href={`#${exp.slug}`}
                      className="group flex items-baseline justify-between gap-4"
                    >
                      <div>
                        <div className="caption text-[var(--color-text-muted)]">
                          {exp.number}
                        </div>
                        <div className="mt-2 font-display font-light text-[var(--color-text)] text-[20px] md:text-[24px] tracking-[-0.02em] leading-[1.15] group-hover:translate-x-1 transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)]">
                          {exp.name}
                        </div>
                      </div>
                      <div className="caption text-[var(--color-text-muted)] shrink-0">
                        {exp.duration}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </section>

        {/* EXPERIENCE CHAPTERS — image left/right alternating, magazine */}
        {experiences.map((exp, i) => (
          <section
            key={exp.slug}
            id={exp.slug}
            className={`hair-rule py-24 md:py-32 lg:py-40 ${
              i % 2 === 1 ? 'bg-[var(--color-bg-subtle)]' : ''
            }`}
          >
            <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-12">
              {/* Chapter header — full width */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-12 md:mb-16">
                <div className="lg:col-span-3">
                  <ScrollReveal>
                    <div className="caption">{exp.number}</div>
                    <div className="mt-3 caption text-[var(--color-text-muted)]">
                      {exp.duration}
                    </div>
                  </ScrollReveal>
                </div>
                <div className="lg:col-span-9">
                  <ScrollReveal delay={0.05}>
                    <h2 className="font-display font-light text-[var(--color-text)] text-[40px] leading-[1.02] md:text-[72px] md:leading-[0.95] lg:text-[96px] lg:leading-[0.92] tracking-[-0.04em] balance">
                      {exp.name}
                    </h2>
                  </ScrollReveal>
                </div>
              </div>

              {/* Body — alternating image / prose */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                <ScrollReveal
                  className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-2' : ''}`}
                >
                  <div className="relative aspect-[4/3] lg:aspect-[5/4] overflow-hidden bg-[var(--color-bg-muted)]">
                    <Image
                      src={exp.image}
                      alt={`${exp.name} — Hotel Ambalakely`}
                      fill
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-3 caption text-[var(--color-text-muted)]">
                    {exp.tagline}
                  </div>
                </ScrollReveal>

                <div
                  className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-1' : ''}`}
                >
                  <ScrollReveal delay={0.05}>
                    <p className="prose-editorial">{exp.body}</p>
                  </ScrollReveal>

                  {/* Practical specs */}
                  <ScrollReveal delay={0.1}>
                    <div className="mt-10 space-y-1">
                      <div className="spec-row">
                        <div className="spec-row__label">Best</div>
                        <div className="spec-row__value">{exp.best}</div>
                      </div>
                      {exp.cost ? (
                        <div className="spec-row">
                          <div className="spec-row__label">Cost</div>
                          <div className="spec-row__value">{exp.cost}</div>
                        </div>
                      ) : null}
                    </div>
                  </ScrollReveal>

                  {/* Personalised CTA */}
                  <ScrollReveal delay={0.15}>
                    <BookingButton className="mt-10">{exp.ctaLabel}</BookingButton>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* CTA */}
        <section className="py-32 md:py-48 lg:py-64 hair-rule">
          <div className="mx-auto max-w-[920px] px-5 md:px-8">
            <ScrollReveal>
              <div className="caption">Plan it with us</div>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h2 className="mt-8 font-display font-light text-[var(--color-text)] text-[48px] leading-[0.98] md:text-[80px] md:leading-[0.95] lg:text-[112px] lg:leading-[0.92] tracking-[-0.04em] balance">
                Book the room. We arrange the days.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="mt-12 flex flex-wrap items-baseline gap-x-10 gap-y-6">
                <BookingButton>Check availability</BookingButton>
                <Link
                  href="/plan-your-trip"
                  className="group inline-flex items-center gap-3 font-display font-light text-[var(--color-text)] text-[24px] md:text-[28px] tracking-[-0.02em] leading-[1.05]"
                >
                  See sample itineraries
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
