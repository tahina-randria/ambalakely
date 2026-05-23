import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { BreadcrumbJsonLd } from '@/components/atoms/JsonLd';
import { BookingButton } from '@/components/atoms/BookingButton';
import { PageHero } from '@/components/molecules/PageHero';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { fetchExcursions } from '@/sanity/lib/fetch';
import { PHOTOS } from '@/lib/data/photos';

export const metadata: Metadata = {
  title: 'Excursions',
  description:
    "Dix choses à faire depuis l'Hôtel Ambalakely. Lémuriens de Ranomafana, marche dans les rizières, cuisine, thé de Sahambavy, trek d'Andringitra, sculpture d'Ambositra, visite de l'école, et plus encore.",
  alternates: { canonical: '/experiences' },
  openGraph: {
    title: 'Excursions · Hôtel Ambalakely',
    description: "Dix choses à faire, toutes organisées depuis la maison.",
    url: '/experiences',
    images: [
      {
        url: PHOTOS.experiences.url,
        width: 2560,
        height: 1707,
        alt: "Vue depuis l'Hôtel Ambalakely sur la RN7",
      },
    ],
  },
};

export default async function ExperiencesPage() {
  const experiences = await fetchExcursions();
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: '/' },
          { name: 'Excursions', url: '/experiences' },
        ]}
      />
      <Nav />
      <main id="main">
        <PageHero
          src={PHOTOS.experiences.path}
          alt="Vue des rizières depuis l’Hôtel Ambalakely"
          title={['Excursions', 'depuis Ambalakely.']}
        />

        {/* INTRO */}
        <section className="py-32 md:py-48 lg:py-56">
          <div className="mx-auto max-w-[700px] px-5 md:px-8">
            <ScrollReveal>
              <p className="lede-display">
                Dix choses à faire depuis l&apos;hôtel. Toutes organisées
                depuis la maison.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <p className="mt-12 prose-editorial">
                La plupart des hôtes en font deux ou trois. La marche dans les
                rizières et la visite de l&apos;école se font à pied depuis
                l&apos;hôtel. Ranomafana, Sahambavy, Andringitra, Ambositra,
                Tsaranoro demandent un chauffeur. Nous organisons le
                chauffeur, le guide du parc, le panier-repas et le thé, dans
                la combinaison qui vous va.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* QUICK NAV */}
        <section className="hair-rule py-16 md:py-20">
          <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12">
            <ScrollReveal>
              <div className="caption mb-10">En un coup d’œil</div>
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
                    <h2 className="font-display font-light text-[var(--color-text)] text-[44px] leading-[1] md:text-[56px] md:leading-[0.98] tracking-[-0.03em] balance">
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
                      alt={`${exp.name} — Hôtel Ambalakely`}
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
                        <div className="spec-row__label">Idéal</div>
                        <div className="spec-row__value">{exp.best}</div>
                      </div>
                      {exp.cost ? (
                        <div className="spec-row">
                          <div className="spec-row__label">Tarif</div>
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
              <div className="caption">Planifions ensemble</div>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h2 className="mt-8 font-display font-light text-[var(--color-text)] text-[44px] leading-[1] md:text-[56px] md:leading-[0.98] tracking-[-0.03em] balance">
                Réservez la chambre. Nous organisons les journées.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="mt-12 flex flex-wrap items-baseline gap-x-10 gap-y-6">
                <BookingButton>Voir les disponibilités</BookingButton>
                <Link
                  href="/plan-your-trip"
                  className="group inline-flex items-center gap-3 font-display font-light text-[var(--color-text)] text-[24px] md:text-[28px] tracking-[-0.02em] leading-[1.05]"
                >
                  Voir nos itinéraires
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
