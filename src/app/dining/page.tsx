import type { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/atoms/Container';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { BreadcrumbJsonLd, RestaurantJsonLd } from '@/components/atoms/JsonLd';
import { BookingButton } from '@/components/atoms/BookingButton';
import { PageHero } from '@/components/molecules/PageHero';
import {
  Users,
  ForkKnife,
  Door,
  Clock,
  Sun,
  SunHorizon,
  Moon,
  Pizza,
} from '@phosphor-icons/react/dist/ssr';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import { HOTEL } from '@/lib/data/hotel';
import { formatMga } from '@/lib/utils/format';

export const metadata: Metadata = {
  title: 'Toko Telo, the restaurant',
  description:
    'Toko Telo, le restaurant de l\'Hôtel Ambalakely. Cinquante couverts, cuisine de la campagne malgache avec touches scandinaves. Petit déjeuner, déjeuner et dîner sur place, pizza sur la terrasse à l\'étage.',
  alternates: { canonical: '/dining' },
  openGraph: {
    title: 'Toko Telo · Hôtel Ambalakely',
    description: 'Une petite cuisine entre Madagascar et la Norvège.',
    url: '/dining',
    images: [
      {
        url: 'https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/d200532b-8f27-4564-9f43-9339dc083af5/DSC_0421.jpg?format=1500w',
        width: 1500,
        height: 1200,
        alt: 'Toko Telo kitchen at Hotel Ambalakely',
      },
    ],
  },
};

/**
 * Plats signature confirmés depuis le site Squarespace et le document Kirsten.
 * Aucun plat inventé : seulement ceux explicitement mentionnés.
 */
const signatureDishes = [
  {
    name: 'Zébu Marengo',
    body:
      'Zébu tendre mijoté dans une sauce tomate aux herbes, accompagné de vin local.',
  },
  {
    name: 'Kjøttkaker',
    body: 'Boulettes de viande à la scandinave. Une signature norvégienne.',
  },
  {
    name: 'Krumkake',
    body:
      'Gaufre roulée norvégienne, servie avec un fruit frais ou un sorbet maison.',
  },
];

/**
 * Tarifs réels — extraits du PDF Tarifs Publics 2026.
 */
const meals = [
  { label: 'Petit déjeuner Malagasy', priceMga: 25000 },
  { label: 'Petit déjeuner complet', priceMga: 38000 },
  { label: 'Déjeuner ou dîner — 1 service', priceMga: 40000 },
  { label: 'Déjeuner ou dîner — 2 services', priceMga: 59000 },
  { label: 'Déjeuner ou dîner — 3 services', priceMga: 72000 },
  { label: 'Panier pique-nique', priceMga: 50000 },
];

const mealExtras = [
  'Enfant de 5 à 12 ans : 50 % du tarif',
  'Enfant de moins de 5 ans : offert',
];

/**
 * Horaires réels du restaurant — document Kirsten.
 */
const hours: { label: string; value: string; Icon: PhosphorIcon }[] = [
  { label: 'Petit déjeuner', value: HOTEL.hours.breakfast, Icon: Sun },
  { label: 'Déjeuner', value: HOTEL.hours.lunch, Icon: SunHorizon },
  { label: 'Dîner', value: HOTEL.hours.dinner, Icon: Moon },
  { label: 'Terrasse pizza', value: HOTEL.hours.pizzaTerrace, Icon: Pizza },
];

const facts: { label: string; value: string; Icon: PhosphorIcon }[] = [
  { label: 'Couverts', value: 'Cinquante', Icon: Users },
  { label: 'Service', value: 'À la carte, 1 à 3 services', Icon: ForkKnife },
  { label: 'Ouvert à', value: 'Résidents et visiteurs', Icon: Door },
  { label: 'Réservation', value: '24 h à l\'avance', Icon: Clock },
];

export default function DiningPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: '/' },
          { name: 'Toko Telo', url: '/dining' },
        ]}
      />
      <RestaurantJsonLd />
      <Nav />
      <main id="main">
        <PageHero
          src="https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/d200532b-8f27-4564-9f43-9339dc083af5/DSC_0421.jpg?format=2500w"
          alt="Toko Telo, le restaurant de l'Hôtel Ambalakely à Fianarantsoa, Madagascar"
          title={['Toko Telo,', 'le restaurant.']}
        />

        {/* INTRO + KEY FACTS */}
        <section className="py-32 md:py-48 lg:py-56">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-3 lg:sticky lg:top-32 self-start">
                <ScrollReveal>
                  <div className="caption">La cuisine</div>
                </ScrollReveal>
              </div>
              <div className="lg:col-span-9">
                <ScrollReveal>
                  <p className="lede max-w-[34ch]">
                    Une petite cuisine entre Madagascar et la Norvège. Cinquante
                    couverts, ouverte aux résidents et aux visiteurs de la journée.
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.05}>
                  <div className="mt-12 prose-editorial">
                    <p>
                      Le concept de la maison : Eny ambanivohitra, à la campagne.
                      L\'essentiel de ce qui arrive sur la table vient du jardin
                      derrière la cuisine, des rizières en contrebas, et des
                      producteurs locaux (les Tantsaha) à quelques kilomètres.
                    </p>
                    <p>
                      Le menu se choisit en un, deux ou trois services. À l\'étage,
                      la terrasse fait pizzeria toute la journée, ouvert de 10 h
                      à 21 h 30. Trois plats signature reviennent souvent : Zébu
                      Marengo, Kjøttkaker, Krumkake.
                    </p>
                  </div>
                </ScrollReveal>

                {/* FACTS */}
                <ScrollReveal delay={0.1}>
                  <dl className="mt-16 grid grid-cols-2 md:grid-cols-4 border-y border-[var(--color-border-subtle)] divide-x divide-[var(--color-border-subtle)]">
                    {facts.map((f) => {
                      const Icon = f.Icon;
                      return (
                        <div
                          key={f.label}
                          className="px-4 md:px-6 py-8 md:py-10 flex flex-col items-start"
                        >
                          <Icon
                            size={20}
                            weight="light"
                            className="text-[var(--color-text-muted)] mb-5"
                            aria-hidden
                          />
                          <dt className="caption text-[var(--color-text-muted)] mb-2">
                            {f.label}
                          </dt>
                          <dd className="font-display font-light text-[var(--color-text)] text-[17px] md:text-[19px] leading-[1.3] tracking-[-0.01em]">
                            {f.value}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                </ScrollReveal>
              </div>
            </div>
          </Container>
        </section>

        {/* FULL-BLEED IMAGE */}
        <section className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-[var(--color-bg-muted)]">
          <Image
            src="https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg?format=2500w"
            alt="La salle à manger de Toko Telo, avec sa cheminée et ses murs en pierre"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute bottom-5 right-5 md:bottom-7 md:right-7 caption text-white/85 mix-blend-difference"
          >
            La salle à manger
          </div>
        </section>

        {/* SIGNATURE DISHES */}
        <section className="py-32 md:py-48 lg:py-56 hair-rule">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-3 lg:sticky lg:top-32 self-start">
                <ScrollReveal>
                  <div className="caption">Plats signature</div>
                  <h2 className="mt-6 font-display font-light text-[var(--color-text)] text-[28px] md:text-[36px] leading-[1.05] tracking-[-0.025em] max-w-[260px]">
                    Trois plats qui reviennent souvent.
                  </h2>
                  <p className="mt-6 prose-editorial text-[15px]">
                    Le menu change avec le jardin. Végétarien, vegan ou allergies :
                    nous prévenir 24 h à l\'avance.
                  </p>
                </ScrollReveal>
              </div>
              <div className="lg:col-span-9">
                <ul className="border-t border-[var(--color-border-subtle)]">
                  {signatureDishes.map((dish) => (
                    <ScrollReveal key={dish.name}>
                      <li className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 py-8 md:py-10 border-b border-[var(--color-border-subtle)]">
                        <div className="md:col-span-5 font-display font-light text-[22px] md:text-[28px] tracking-[-0.02em] leading-[1.15] text-[var(--color-text)]">
                          {dish.name}
                        </div>
                        <p className="md:col-span-7 text-[15px] md:text-[16px] leading-[1.6] text-[var(--color-text-muted)] max-w-[520px]">
                          {dish.body}
                        </p>
                      </li>
                    </ScrollReveal>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>

        {/* HOURS + PRICING */}
        <section className="py-32 md:py-48 lg:py-56 hair-rule bg-[var(--color-bg-subtle)]">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-3 lg:sticky lg:top-32 self-start">
                <ScrollReveal>
                  <div className="caption">Horaires et tarifs</div>
                  <h2 className="mt-6 font-display font-light text-[var(--color-text)] text-[28px] md:text-[36px] leading-[1.05] tracking-[-0.025em] max-w-[260px]">
                    Du matin tôt au soir.
                  </h2>
                </ScrollReveal>
              </div>
              <div className="lg:col-span-9 space-y-16 md:space-y-20">
                {/* Hours */}
                <ScrollReveal>
                  <div>
                    <div className="caption mb-8">Horaires</div>
                    <ul className="border-t border-[var(--color-border-subtle)]">
                      {hours.map((h) => {
                        const Icon = h.Icon;
                        return (
                          <li
                            key={h.label}
                            className="flex items-center justify-between gap-4 py-5 md:py-6 border-b border-[var(--color-border-subtle)]"
                          >
                            <div className="flex items-center gap-4">
                              <Icon
                                size={20}
                                weight="light"
                                className="text-[var(--color-text-muted)]"
                                aria-hidden
                              />
                              <span className="font-display font-light text-[var(--color-text)] text-[16px] md:text-[18px]">
                                {h.label}
                              </span>
                            </div>
                            <span className="font-mono text-[13px] md:text-[14px] tabular-nums text-[var(--color-text)]">
                              {h.value}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </ScrollReveal>

                {/* Pricing */}
                <ScrollReveal delay={0.05}>
                  <div>
                    <div className="caption mb-8">Tarifs (Ariary)</div>
                    <ul className="border-t border-[var(--color-border-subtle)]">
                      {meals.map((m) => (
                        <li
                          key={m.label}
                          className="flex items-baseline justify-between gap-4 py-5 md:py-6 border-b border-[var(--color-border-subtle)]"
                        >
                          <span className="font-display font-light text-[var(--color-text)] text-[16px] md:text-[18px] tracking-[-0.005em]">
                            {m.label}
                          </span>
                          <span className="font-display font-light text-[var(--color-text)] text-[18px] md:text-[22px] tabular-nums shrink-0">
                            {formatMga(m.priceMga)}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <ul className="mt-6 space-y-2 caption text-[var(--color-text-muted)]">
                      {mealExtras.map((extra) => (
                        <li key={extra}>· {extra}</li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </Container>
        </section>

        {/* RESERVATION CTA */}
        <section className="py-32 md:py-48 lg:py-64 hair-rule">
          <div className="mx-auto max-w-[920px] px-5 md:px-8">
            <ScrollReveal>
              <div className="caption">Réserver une table</div>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h2 className="mt-8 font-display font-light text-[var(--color-text)] text-[44px] leading-[1] md:text-[56px] md:leading-[0.98] tracking-[-0.03em] balance">
                Visiteurs bienvenus.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="mt-12 flex flex-wrap items-baseline gap-x-10 gap-y-6">
                <BookingButton>Réserver</BookingButton>
                <p className="text-[14px] leading-[1.55] text-[var(--color-text-muted)] max-w-[400px]">
                  24 h à l\'avance minimum. Allergies, à signaler la veille.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
