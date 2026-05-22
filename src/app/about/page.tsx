import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/atoms/Container';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { BreadcrumbJsonLd } from '@/components/atoms/JsonLd';
import { BookingButton } from '@/components/atoms/BookingButton';
import { PageHero } from '@/components/molecules/PageHero';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { HOTEL } from '@/lib/data/hotel';

export const metadata: Metadata = {
  title: 'À propos',
  description:
    'Mamy et Hasina ont ouvert l\'Hôtel Ambalakely en 2018, sur la RN7 à 12 km au nord de Fianarantsoa. Ils dirigent aussi Trans Groupe Hasina, agence de voyage depuis vingt ans.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'À propos · Hôtel Ambalakely',
    description: 'Mamy et Hasina, depuis 2018.',
    url: '/about',
    images: [
      {
        url: 'https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg?format=1500w',
        width: 1500,
        height: 1200,
        alt: 'Hôtel Ambalakely, hautes terres Fianarantsoa Madagascar',
      },
    ],
  },
};

/**
 * Étapes clés — seulement les faits vérifiés (ouverture 2018 + agence TGH).
 * Les autres dates (2002, 2003, 2005, 2013, 2014, 2015) mentionnées sur le
 * Squarespace ne sont pas datées avec précision : on les omet plutôt que
 * d\'inventer.
 */
const milestones = [
  {
    year: '~2005',
    title: 'Trans Groupe Hasina',
    body:
      'Mamy et Hasina fondent leur agence de voyage à Fianarantsoa, dans les hautes terres Betsileo. Vingt ans plus tard, l\'agence opère dans toute Madagascar.',
  },
  {
    year: '2018',
    title: 'Ouverture de l\'hôtel',
    body:
      'L\'Hôtel Ambalakely ouvre en octobre, sur un terrain anciennement agricole nommé Vonimboahirana, à 12 km au nord de Fianarantsoa. Dix chambres, une cuisine, un jardin.',
  },
  {
    year: 'Aujourd\'hui',
    title: 'Une équipe de quartier',
    body:
      'L\'hôtel et l\'agence emploient des habitants du quartier de Tanambao. Une partie de chaque nuit soutient Hope for the Future, l\'école voisine ouverte en 2014.',
  },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: '/' },
          { name: 'À propos', url: '/about' },
        ]}
      />
      <Nav />
      <main id="main">
        <PageHero
          src="https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg?format=2500w"
          alt="Mamy et Hasina, fondateurs de l\'Hôtel Ambalakely à Fianarantsoa, Madagascar"
          title={['Mamy et Hasina,', 'depuis 2018.']}
        />

        {/* INTRO */}
        <section className="py-32 md:py-48 lg:py-56">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-3 lg:sticky lg:top-32 self-start">
                <ScrollReveal>
                  <div className="caption">Depuis 2018</div>
                </ScrollReveal>
              </div>
              <div className="lg:col-span-9 max-w-[760px]">
                <ScrollReveal>
                  <p className="lede max-w-[34ch]">
                    Un hôtel qui ressemble à une maison, sur une colline à
                    douze kilomètres au nord de Fianarantsoa.
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.05}>
                  <div className="mt-12 prose-editorial">
                    <p>
                      Mamy et Hasina ont ouvert l\'Hôtel Ambalakely en octobre
                      2018, sur un terrain auparavant agricole. Dix chambres,
                      une cuisine, un jardin, une petite équipe. Le concept de
                      la maison : <em className="not-italic font-display font-light">Eny ambanivohitra</em>,
                      à la campagne, dans la tradition Betsileo.
                    </p>
                    <p>
                      Avant l\'hôtel, ils dirigeaient déjà l\'agence de voyage{' '}
                      <strong className="font-display font-light text-[var(--color-text)]">
                        Trans Groupe Hasina
                      </strong>{' '}
                      depuis quinze ans. L\'agence existe toujours et continue
                      d\'organiser des séjours dans toute Madagascar. L\'hôtel
                      est devenu la base naturelle des voyageurs TGH dans la
                      région des hautes terres.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </Container>
        </section>

        {/* FOUNDERS — image + prose, asymmetric */}
        <section id="founders" className="hair-rule">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 relative aspect-[4/5] lg:aspect-auto lg:min-h-[80vh] bg-[var(--color-bg-muted)] overflow-hidden">
              <Image
                src="https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg?format=2500w"
                alt="Le jardin et l\'extérieur de l\'Hôtel Ambalakely"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="lg:col-span-5 px-5 md:px-12 lg:px-16 py-20 md:py-32 flex flex-col justify-center">
              <ScrollReveal>
                <div className="caption">Les fondateurs</div>
                <h2 className="mt-6 font-display font-light text-[var(--color-text)] text-[36px] md:text-[52px] leading-[1.02] tracking-[-0.03em] max-w-[420px]">
                  Deux personnes, une maison.
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.05}>
                <div className="mt-10 prose-editorial max-w-[460px]">
                  <p>
                    <strong className="font-display font-light text-[var(--color-text)]">
                      Hasina
                    </strong>{' '}
                    a étudié à l\'Université de Stavanger, en Norvège, où elle
                    a passé cinq ans. Elle parle norvégien et a tissé un long
                    lien avec ce pays. Elle dirige la maison, écrit le menu
                    et accueille.
                  </p>
                  <p>
                    <strong className="font-display font-light text-[var(--color-text)]">
                      Mamy
                    </strong>{' '}
                    est un grand connaisseur de Madagascar, du nord au sud.
                    Son réseau et sa connaissance du terrain ont façonné
                    l\'agence TGH. Il s\'occupe du jardin, des transferts et
                    de la logistique.
                  </p>
                  <p>
                    Ensemble depuis vingt ans dans le tourisme, ils travaillent
                    autour d\'un tourisme responsable et durable, avec respect
                    pour la culture et l\'environnement, et en soutien aux
                    communautés locales.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section className="py-32 md:py-48 lg:py-56 hair-rule">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-3 lg:sticky lg:top-32 self-start">
                <ScrollReveal>
                  <div className="caption">Repères</div>
                  <h2 className="mt-6 font-display font-light text-[var(--color-text)] text-[28px] md:text-[36px] leading-[1.05] tracking-[-0.025em] max-w-[260px]">
                    Vingt ans de tourisme, sept ans d\'hôtel.
                  </h2>
                </ScrollReveal>
              </div>
              <div className="lg:col-span-9">
                <ul className="border-t border-[var(--color-border-subtle)]">
                  {milestones.map((m, i) => (
                    <ScrollReveal key={m.year} delay={i * 0.04}>
                      <li className="grid grid-cols-12 gap-6 py-10 md:py-14 border-b border-[var(--color-border-subtle)]">
                        <div className="col-span-3 md:col-span-2">
                          <div className="font-mono text-[12px] tabular-nums text-[var(--color-text-muted)] tracking-[0.05em]">
                            {m.year}
                          </div>
                        </div>
                        <div className="col-span-9 md:col-span-10 max-w-[640px]">
                          <h3 className="font-display font-light text-[var(--color-text)] text-[28px] md:text-[40px] leading-[1.05] tracking-[-0.025em]">
                            {m.title}
                          </h3>
                          <p className="mt-4 prose-editorial">{m.body}</p>
                        </div>
                      </li>
                    </ScrollReveal>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>

        {/* TRANS GROUPE HASINA — sister business */}
        <section id="tgh" className="hair-rule bg-[var(--color-bg-subtle)] py-32 md:py-48">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-3 lg:sticky lg:top-32 self-start">
                <ScrollReveal>
                  <div className="caption">Agence sœur</div>
                </ScrollReveal>
              </div>
              <div className="lg:col-span-9 max-w-[760px]">
                <ScrollReveal>
                  <h2 className="font-display font-light text-[var(--color-text)] text-[36px] md:text-[52px] leading-[1.02] tracking-[-0.03em] max-w-[640px]">
                    Trans Groupe Hasina, depuis vingt ans.
                  </h2>
                </ScrollReveal>
                <ScrollReveal delay={0.05}>
                  <div className="mt-10 prose-editorial">
                    <p>
                      Trans Groupe Hasina (TGH) est l\'agence de voyage que Mamy
                      et Hasina ont fondée à Fianarantsoa, dans les hautes terres
                      Betsileo. Elle organise des séjours dans toute Madagascar :
                      RN7 vers le sud, Tsingy de l\'ouest, parcs de l\'est, plages
                      du nord.
                    </p>
                    <p>
                      L\'hôtel Ambalakely est devenu la base naturelle des
                      voyageurs TGH dans la région. Les deux entités partagent
                      la même équipe, la même philosophie de tourisme
                      responsable, et un long lien avec la Norvège — Hasina
                      étant la seule guide francophone-norvégienne de la région.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </Container>
        </section>

        {/* PULL QUOTE — concierge voice */}
        <section className="py-32 md:py-48 hair-rule">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-start-3 lg:col-span-9">
                <ScrollReveal>
                  <p className="pull-quote max-w-[26ch]">
                    &ldquo;L\'hôtel est notre maison de famille autant qu\'un
                    lieu pour les voyageurs.&rdquo;
                  </p>
                  <div className="mt-10 flex items-center gap-4">
                    <div className="w-10 border-t border-[var(--color-sand-12)]" />
                    <div className="font-display text-[16px] tracking-[-0.005em] text-[var(--color-text)]">
                      Hasina
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </Container>
        </section>

        {/* HOPE FOR THE FUTURE */}
        <section id="hope" className="hair-rule">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 px-5 md:px-12 lg:px-16 py-20 md:py-32 lg:order-1 flex flex-col justify-center">
              <ScrollReveal>
                <div className="caption">Hope for the Future</div>
                <h2 className="mt-6 font-display font-light text-[var(--color-text)] text-[36px] md:text-[52px] leading-[1.02] tracking-[-0.03em] max-w-[420px]">
                  Le travail à côté.
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.05}>
                <div className="mt-10 prose-editorial max-w-[460px]">
                  <p>
                    Une école pour les enfants de Tanambao, le quartier de
                    l\'Hôtel Ambalakely. Cent trente enfants. Commencée avant
                    l\'hôtel, vit toujours grâce à lui.
                  </p>
                  <p>
                    Une part de chaque réservation soutient le projet.
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <Link
                  href="/community"
                  className="mt-12 group inline-flex items-center gap-2 font-body text-[15px] font-medium text-[var(--color-text)]"
                >
                  Lire Hope for the Future
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1.5"
                  />
                </Link>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-7 lg:order-2 relative aspect-[4/5] lg:aspect-auto lg:min-h-[70vh] bg-[var(--color-bg-muted)] overflow-hidden">
              <Image
                src="https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/38aeed61-0d50-4cde-a210-1c6363f4139c/HFF2.jpg?format=2500w"
                alt="Hope for the Future, l\'école de Tanambao"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* BOOKING CTA */}
        <section className="py-32 md:py-48 lg:py-64 hair-rule">
          <div className="mx-auto max-w-[920px] px-5 md:px-8">
            <ScrollReveal>
              <div className="caption">Séjourner</div>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h2 className="mt-8 font-display font-light text-[var(--color-text)] text-[44px] leading-[1] md:text-[56px] md:leading-[0.98] tracking-[-0.03em] balance">
                Deux nuits ou plus. Le jardin donne mieux à ceux qui restent.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="mt-12 flex flex-wrap items-baseline gap-x-10 gap-y-6">
                <BookingButton>Vérifier disponibilités</BookingButton>
                <a
                  href={`mailto:${HOTEL.email}`}
                  className="text-[15px] underline-offset-4 hover:underline"
                >
                  {HOTEL.email}
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CONTINUE */}
        <section className="py-32 md:py-48">
          <Container>
            <ScrollReveal>
              <Link
                href="/rooms"
                className="group inline-flex items-baseline gap-6 font-display font-light text-[var(--color-text)] text-[36px] md:text-[48px] tracking-[-0.03em] leading-[1.02]"
              >
                <span>Les chambres</span>
                <ArrowRight
                  size={32}
                  className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-2 self-center"
                />
              </Link>
            </ScrollReveal>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
