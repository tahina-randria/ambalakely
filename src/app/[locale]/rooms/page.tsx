import type { Metadata } from 'next';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { BreadcrumbJsonLd } from '@/components/atoms/JsonLd';
import { BookingButton } from '@/components/atoms/BookingButton';
import { RoomComparison } from '@/components/molecules/RoomComparison';
import { PageHero } from '@/components/molecules/PageHero';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { fetchCategories } from '@/sanity/lib/fetch';
import { PHOTOS } from '@/lib/data/photos';

export const metadata: Metadata = {
  title: 'Les chambres',
  description:
    'Dix chambres réparties en trois catégories. Supérieure, Confort, Standard. À partir de 182 000 Ariary la nuit.',
  alternates: { canonical: '/rooms' },
  openGraph: {
    title: 'Les chambres · Hôtel Ambalakely',
    description: 'Dix chambres réparties en trois catégories. Supérieure, Confort, Standard.',
    url: '/rooms',
    images: [
      {
        url: PHOTOS.rooms.url,
        width: 2560,
        height: 1707,
        alt: 'Chambre Supérieure à l’Hôtel Ambalakely',
      },
    ],
  },
};

import { formatMga } from '@/lib/utils/format';

export default async function RoomsPage() {
  const categories = await fetchCategories();
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: '/' },
          { name: 'Chambres', url: '/rooms' },
        ]}
      />
      <Nav />
      <main id="main">
        <PageHero
          src={categories[0].heroImage}
          alt="Vue des chambres Supérieures sur les rizières"
          title={['Dix chambres', 'à Ambalakely.']}
        />

        {/* ════════════════════════════════════════════════════════════
            EDITORIAL OPENING
        ════════════════════════════════════════════════════════════ */}
        <section className="py-32 md:py-48 lg:py-64">
          <div className="mx-auto max-w-[700px] px-5 md:px-8">
            <ScrollReveal>
              <p className="lede-display">
                Mêmes murs sable, mêmes parquets en bois sombre, mêmes
                bouillottes au soir. La différence : la taille, la vue, le lit.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <div className="mt-14 prose-editorial">
                <p>
                  Dix chambres dans deux bâtiments. Deux donnent sur la
                  façade principale et surplombent les rizières. Quatre
                  occupent la catégorie intermédiaire, avec un bureau à la
                  fenêtre et un lit king. Quatre autres sont les chambres
                  d&apos;origine, ouvertes en 2018. Choisissez selon ce que
                  vous voulez voir par la fenêtre.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            COMPARISON GRID — same criteria across all 3, quick scan
        ════════════════════════════════════════════════════════════ */}
        <section className="py-24 md:py-32 lg:py-40 hair-rule">
          <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12">
            <ScrollReveal className="mb-10 md:mb-14">
              <div className="caption">En un coup d’œil</div>
              <h2 className="mt-6 font-display font-light text-[var(--color-text)] text-[32px] md:text-[44px] leading-[1.05] tracking-[-0.025em] max-w-[760px]">
                Douze critères pour choisir.
              </h2>
            </ScrollReveal>
            <ScrollReveal>
              <RoomComparison />
            </ScrollReveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            CATEGORY SEQUENCE — photo-essay, no cards
            For each category: full-bleed image + magazine-style chapter
        ════════════════════════════════════════════════════════════ */}
        {categories.map((cat) => (
          <div key={cat.slug}>
            {/* Full-bleed image with title overlay */}
            <section className="relative h-[80vh] md:h-[100vh] w-full overflow-hidden bg-[var(--color-sand-12)]">
              <Image
                src={cat.heroImage}
                alt={cat.name}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"
              />
              <div className="relative h-full mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12 flex flex-col text-white">
                <div className="pt-[100px] md:pt-[128px]">
                  <div className="caption text-white/75">
                    Chapitre {cat.number} · {cat.count}
                  </div>
                </div>
                <div className="mt-auto pb-14 md:pb-20">
                  <h2 className="font-display font-light tracking-[-0.03em] text-white text-[44px] leading-[1] md:text-[56px] md:leading-[0.98] balance">
                    {cat.name}
                  </h2>
                </div>
              </div>
            </section>

            {/* Editorial chapter — single column prose */}
            <section className="py-32 md:py-48 lg:py-56">
              <div className="mx-auto max-w-[700px] px-5 md:px-8">
                <ScrollReveal>
                  <p className="font-display font-light text-[var(--color-text)] text-[24px] md:text-[32px] leading-[1.25] tracking-[-0.02em] balance">
                    {cat.shortDescription}
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.05}>
                  <p className="mt-12 font-display font-light italic text-[18px] leading-[1.55] text-[var(--color-text-muted)]">
                    {cat.size}, {cat.capacity.toLowerCase()}. {cat.bedSetup} À partir de{' '}
                    <span className="not-italic tabular-nums text-[var(--color-text)]">
                      {formatMga(cat.priceMga)} Ariary
                    </span>{' '}
                    la nuit.
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.1}>
                  <Link
                    href={`/rooms/${cat.slug}`}
                    className="group mt-12 inline-flex items-center gap-3 font-display font-light text-[var(--color-text)] text-[28px] md:text-[36px] tracking-[-0.025em] leading-[1.05]"
                  >
                    Lire sur la {cat.name}
                    <ArrowRight
                      size={24}
                      className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-2"
                    />
                  </Link>
                </ScrollReveal>
              </div>
            </section>
          </div>
        ))}

        {/* ════════════════════════════════════════════════════════════
            RESERVE — minimal, no dark panel
        ════════════════════════════════════════════════════════════ */}
        <section className="py-32 md:py-48 lg:py-64 hair-rule">
          <div className="mx-auto max-w-[920px] px-5 md:px-8">
            <ScrollReveal>
              <div className="caption">Réserver</div>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h2 className="mt-8 font-display font-light text-[var(--color-text)] text-[44px] leading-[1] md:text-[56px] md:leading-[0.98] tracking-[-0.03em] balance">
                Réservation directe.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="mt-12 flex flex-wrap items-baseline gap-x-10 gap-y-6">
                <BookingButton>Voir les disponibilités</BookingButton>
                <p className="text-[14px] leading-[1.55] text-[var(--color-text-muted)] max-w-[400px]">
                  Annulation gratuite jusqu&apos;à trente jours avant
                  l&apos;arrivée. Aucun acompte pour les séjours de deux nuits
                  ou moins.
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
