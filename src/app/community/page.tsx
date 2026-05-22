import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { BreadcrumbJsonLd } from '@/components/atoms/JsonLd';
import { BookingButton } from '@/components/atoms/BookingButton';
import { PageHero } from '@/components/molecules/PageHero';
import {
  ArrowRight,
  GraduationCap,
  HeartStraight,
  Leaf,
  PaintBrush,
  MusicNotes,
  PersonSimpleRun,
  Translate,
  BookOpen,
  Calendar,
  Users,
  House as HouseIcon,
  MapPinLine,
} from '@phosphor-icons/react/dist/ssr';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';

export const metadata: Metadata = {
  title: 'Hope for the Future',
  description:
    'Hope for the Future : une école pour les enfants de Tanambao, le quartier d\'Ambalakely à Madagascar. 130 enfants, neuf programmes éducatifs et sociaux, un nouveau bâtiment Akanimamy construit depuis 2020.',
  alternates: { canonical: '/community' },
  openGraph: {
    title: 'Hope for the Future · Hôtel Ambalakely',
    description: 'Une école pour les enfants de Tanambao, soutenue par chaque nuit à l\'hôtel.',
    url: '/community',
    images: [
      {
        url: 'https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/38aeed61-0d50-4cde-a210-1c6363f4139c/HFF2.jpg?format=1500w',
        width: 1500,
        height: 1200,
        alt: 'Hope for the Future, les enfants de Tanambao, Ambalakely',
      },
    ],
  },
};

type Stat = { value: string; label: string; Icon: PhosphorIcon };
type Program = { title: string; body: string; Icon: PhosphorIcon };

/**
 * Chiffres clés — confirmés depuis le PowerPoint "Akanimamy by Seheno".
 */
const numbers: Stat[] = [
  { value: '130', label: 'Enfants actifs', Icon: Users },
  { value: '~4 000', label: 'Habitants Ambalakely', Icon: HouseIcon },
  { value: '1', label: 'Quartier Tanambao', Icon: MapPinLine },
  { value: '152 m²', label: 'Akanimamy', Icon: Calendar },
];

/**
 * Programmes — extraits du PPT (qui en liste 9 + 1 à venir).
 * On retire les volets confessionnels par choix éditorial business ;
 * on garde l'esprit séculier de l'association tel qu'il est visible
 * de l'extérieur.
 */
const programs: Program[] = [
  {
    title: 'Éducation',
    body:
      'Soutien scolaire après l\'école publique. Cours supplémentaires, ressources éducatives, un repas chaud à midi les jours d\'école.',
    Icon: GraduationCap,
  },
  {
    title: 'Santé et hygiène',
    body:
      'Notions de soins de base et d\'hygiène. Pesée et accompagnement régulier des enfants.',
    Icon: HeartStraight,
  },
  {
    title: 'Arts',
    body: 'Dessin, peinture, travaux pratiques, théâtre. Les enfants apprennent à créer.',
    Icon: PaintBrush,
  },
  {
    title: 'Musique',
    body: 'Initiation à la flûte, au violon, au piano et à la guitare.',
    Icon: MusicNotes,
  },
  {
    title: 'Danse et sport',
    body:
      'Mouvement, travail d\'équipe. Un terrain de basket et de volley en projet à Akanimamy.',
    Icon: PersonSimpleRun,
  },
  {
    title: 'Langues',
    body: 'Clubs d\'anglais, cours de norvégien, français en projet.',
    Icon: Translate,
  },
  {
    title: 'Environnement et agriculture',
    body:
      'Sensibilisation à l\'écologie, plantation d\'arbres, potager à Akanimamy.',
    Icon: Leaf,
  },
  {
    title: 'Histoire et connaissances',
    body: 'Histoire générale, culture Betsileo, connaissances générales.',
    Icon: BookOpen,
  },
];

/**
 * Repères vérifiés — pas de chronologie inventée.
 */
const timeline = [
  {
    year: '2014',
    title: 'Premiers cours',
    body:
      'Mamy et Hasina lancent Hope for the Future avec une poignée d\'enfants du quartier de Tanambao.',
  },
  {
    year: '2018',
    title: 'L\'hôtel ouvre',
    body:
      'L\'Hôtel Ambalakely ouvre en octobre. Dès la première nuit, une part de chaque réservation soutient l\'école.',
  },
  {
    year: '2019',
    title: 'Le terrain',
    body:
      'Acquisition d\'un terrain de 2 000 m² grâce aux dons d\'amis du projet. Premier pas vers un vrai foyer pour les enfants.',
  },
  {
    year: '2020',
    title: 'Akanimamy commence',
    body:
      'Premier septembre 2020 : pose de la première pierre d\'Akanimamy, un bâtiment de 152 m² qui sera le foyer des enfants HFF.',
  },
  {
    year: 'Aujourd\'hui',
    title: '130 enfants actifs',
    body:
      'Neuf programmes, des bénévoles et donateurs fidèles. Les murs et la toiture d\'Akanimamy sont terminés ; il reste à finir les sanitaires, la cuisine et les terrains.',
  },
];

export default function CommunityPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: '/' },
          { name: 'Hope for the Future', url: '/community' },
        ]}
      />
      <Nav />
      <main id="main">
        <PageHero
          src="https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/38aeed61-0d50-4cde-a210-1c6363f4139c/HFF2.jpg?format=2500w"
          alt="Hope for the Future, les enfants de Tanambao, Ambalakely"
          title={['Hope for the Future,', 'l\'école d\'à côté.']}
        />

        {/* INTRO */}
        <section className="py-32 md:py-48 lg:py-56">
          <div className="mx-auto max-w-[700px] px-5 md:px-8">
            <ScrollReveal>
              <p className="lede-display">
                Une école pour les enfants de notre quartier. Cent trente
                enfants actifs, neuf programmes, et un nouveau foyer qui
                s\'appelle Akanimamy.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <div className="mt-14 prose-editorial space-y-6">
                <p>
                  Hope for the Future est le projet associatif que Mamy et
                  Hasina ont lancé en 2014, dans le quartier de Tanambao à
                  Ambalakely. Le village compte environ 4 000 habitants, à
                  12 km au nord de Fianarantsoa.
                </p>
                <p>
                  Au départ, ils ont fait une enquête simple : combien d\'enfants
                  du quartier n\'allaient pas, ou très peu, à l\'école publique ?
                  La réponse était une centaine et demie. À cette époque, Mamy
                  et Hasina avaient déjà construit l\'hôtel. Ils savaient ce que
                  l\'hôtel allait financer à côté.
                </p>
                <p>
                  Aujourd\'hui, 130 enfants suivent les activités. L\'hôtel
                  reverse une part de chaque réservation à l\'association.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* NUMBERS */}
        <section className="py-24 md:py-32 hair-rule bg-[var(--color-bg-subtle)]">
          <div className="mx-auto max-w-[1100px] px-5 md:px-8 lg:px-12">
            <ScrollReveal>
              <div className="caption text-center mb-16 md:mb-20">En chiffres</div>
            </ScrollReveal>
            <ScrollReveal>
              <ul className="grid grid-cols-2 md:grid-cols-4 border-y border-[var(--color-border-subtle)] divide-x divide-[var(--color-border-subtle)]">
                {numbers.map((n) => {
                  const Icon = n.Icon;
                  return (
                    <li
                      key={n.label}
                      className="py-12 md:py-16 px-4 text-center flex flex-col items-center justify-center"
                    >
                      <Icon
                        size={22}
                        weight="light"
                        className="text-[var(--color-text-muted)] mb-6"
                        aria-hidden
                      />
                      <div className="font-display font-light text-[var(--color-text)] text-[56px] md:text-[72px] lg:text-[88px] leading-[1] tracking-[-0.03em] tabular-nums whitespace-nowrap">
                        {n.value}
                      </div>
                      <div className="mt-5 caption text-[var(--color-text-muted)]">
                        {n.label}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </ScrollReveal>
          </div>
        </section>

        {/* TIMELINE */}
        <section className="py-32 md:py-48 lg:py-56 hair-rule">
          <div className="mx-auto max-w-[1100px] px-5 md:px-8 lg:px-12">
            <ScrollReveal>
              <div className="caption text-center mb-4">Repères</div>
              <h2 className="font-display font-light text-[var(--color-text)] text-[44px] md:text-[56px] leading-[1] md:leading-[0.98] tracking-[-0.03em] balance text-center mx-auto max-w-[680px]">
                De 2014 à Akanimamy.
              </h2>
            </ScrollReveal>

            <ul className="mt-20 md:mt-28 mx-auto max-w-[860px] border-t border-[var(--color-border-subtle)]">
              {timeline.map((t, i) => (
                <ScrollReveal key={t.year} delay={i * 0.04}>
                  <li className="grid grid-cols-12 gap-6 py-10 md:py-14 border-b border-[var(--color-border-subtle)]">
                    <div className="col-span-3 md:col-span-2">
                      <div className="font-mono text-[12px] tabular-nums text-[var(--color-text-muted)] tracking-[0.05em]">
                        {t.year}
                      </div>
                    </div>
                    <div className="col-span-9 md:col-span-10 max-w-[640px]">
                      <h3 className="font-display font-light text-[var(--color-text)] text-[24px] md:text-[32px] leading-[1.05] tracking-[-0.025em]">
                        {t.title}
                      </h3>
                      <p className="mt-4 prose-editorial">{t.body}</p>
                    </div>
                  </li>
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </section>

        {/* PROGRAMS */}
        <section className="py-32 md:py-48 lg:py-56 hair-rule bg-[var(--color-bg-subtle)]">
          <div className="mx-auto max-w-[1100px] px-5 md:px-8 lg:px-12">
            <ScrollReveal>
              <div className="caption text-center mb-4">Ce qu\'on fait</div>
              <h2 className="font-display font-light text-[var(--color-text)] text-[44px] md:text-[56px] leading-[1] md:leading-[0.98] tracking-[-0.03em] balance text-center mx-auto max-w-[680px]">
                Huit programmes, tout au long de l\'année.
              </h2>
            </ScrollReveal>
            <ul className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
              {programs.map((p, i) => {
                const Icon = p.Icon;
                return (
                  <ScrollReveal key={p.title} delay={i * 0.04}>
                    <li>
                      <Icon
                        size={28}
                        weight="light"
                        className="text-[var(--color-text-muted)] mb-6"
                        aria-hidden
                      />
                      <h3 className="font-display font-light text-[var(--color-text)] text-[24px] md:text-[28px] leading-[1.1] tracking-[-0.025em]">
                        {p.title}
                      </h3>
                      <p className="mt-4 prose-editorial text-[15px] md:text-[16px]">
                        {p.body}
                      </p>
                    </li>
                  </ScrollReveal>
                );
              })}
            </ul>
          </div>
        </section>

        {/* AKANIMAMY DEEP DIVE */}
        <section id="akanimamy" className="py-32 md:py-48 hair-rule">
          <div className="mx-auto max-w-[1100px] px-5 md:px-8 lg:px-12">
            <ScrollReveal>
              <div className="caption">Le foyer</div>
              <h2 className="mt-6 font-display font-light text-[var(--color-text)] text-[44px] md:text-[56px] leading-[1] md:leading-[0.98] tracking-[-0.03em] balance max-w-[760px]">
                Akanimamy, le nid douillet.
              </h2>
            </ScrollReveal>
            <div className="mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <ScrollReveal className="lg:col-span-7">
                <div className="relative aspect-[4/3] bg-[var(--color-bg-muted)] overflow-hidden">
                  <Image
                    src="https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/38aeed61-0d50-4cde-a210-1c6363f4139c/HFF2.jpg?format=2500w"
                    alt="Le bâtiment Akanimamy en construction"
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.05} className="lg:col-span-5">
                <div className="prose-editorial">
                  <p>
                    <em className="not-italic font-display font-light text-[var(--color-text)]">
                      Akany
                    </em>{' '}
                    veut dire foyer, nid.{' '}
                    <em className="not-italic font-display font-light text-[var(--color-text)]">
                      Mamy
                    </em>{' '}
                    veut dire doux. Akanimamy, c\'est un nid douillet — le foyer
                    qui manquait aux enfants pour faire leurs devoirs au calme.
                  </p>
                  <p>
                    Le terrain de 2 000 m² a été acquis en 2019, grâce aux dons
                    d\'amis du projet. La première pierre a été posée le
                    1er septembre 2020. Le bâtiment fait 152 m², avec une
                    grande salle pour les activités, un coin bibliothèque (des
                    livres reçus de clients norvégiens et d\'un collège
                    français), un coin jeux de société, un bureau et un
                    entrepôt.
                  </p>
                  <p>
                    Les murs et la toiture sont terminés. À venir : les
                    sanitaires, la cuisine, et les terrains de basket et de
                    volley. À planter autour : arbres fruitiers, potager, du
                    Ravintsara.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* PULL QUOTE */}
        <section className="py-32 md:py-48 hair-rule">
          <div className="mx-auto max-w-[1000px] px-5 md:px-8 lg:px-12 text-center">
            <ScrollReveal>
              <p className="pull-quote mx-auto max-w-[30ch]">
                &ldquo;Nous savions ce que l\'hôtel allait financer à côté avant
                même d\'ouvrir.&rdquo;
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

        {/* VISIT */}
        <section className="py-32 md:py-48 lg:py-56 hair-rule bg-[var(--color-bg-subtle)]">
          <div className="mx-auto max-w-[760px] px-5 md:px-8 text-center">
            <ScrollReveal>
              <div className="caption mb-4">Visiter</div>
              <h2 className="font-display font-light text-[var(--color-text)] text-[44px] md:text-[56px] leading-[1] md:leading-[0.98] tracking-[-0.03em] balance">
                Les voyageurs sont les bienvenus.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <div className="mt-12 prose-editorial space-y-6 text-left">
                <p>
                  Les voyageurs qui le souhaitent peuvent passer un moment au
                  projet pendant leur séjour. Pas de visite formelle : vous
                  rencontrez l\'équipe, vous voyez la classe, vous prenez un
                  thé. Si vous voulez apporter quelque chose, nous demandons
                  de le donner directement à l\'association, pas aux enfants.
                </p>
                <p>
                  Indiquez-le simplement à la réservation. Il n\'y a aucun coût.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 md:py-48 lg:py-64 hair-rule">
          <div className="mx-auto max-w-[920px] px-5 md:px-8 text-center">
            <ScrollReveal>
              <div className="caption mb-4">Séjourner</div>
              <h2 className="font-display font-light text-[var(--color-text)] text-[44px] md:text-[56px] leading-[1] md:leading-[0.98] tracking-[-0.03em] balance">
                Une nuit ici, du soutien là.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="mt-12 inline-flex flex-wrap items-baseline gap-x-10 gap-y-6 justify-center">
                <BookingButton>Vérifier disponibilités</BookingButton>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-3 font-body text-[15px] font-medium text-[var(--color-text)]"
                >
                  Lire la maison
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
