import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { BreadcrumbJsonLd } from '@/components/atoms/JsonLd';
import { BookingButton } from '@/components/atoms/BookingButton';
import { ImagePlaceholder } from '@/components/atoms/ImagePlaceholder';
import { PHOTOS } from '@/lib/data/photos';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { localizedAlternates } from '@/lib/i18n/alternates';
import { CommunityScrollHero } from '@/components/molecules/CommunityScrollHero';
import { CommunityGallery } from '@/components/molecules/CommunityGallery';
import { CommunityPrograms } from '@/components/molecules/CommunityPrograms';

type LocaleParam = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: LocaleParam): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Community' });
  const alt = localizedAlternates(locale, '/community');
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: alt,
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: alt.canonical,
      images: [
        {
          // §45 — was the external Squarespace school photo. Until real
          // local school photos exist, the social card uses the hotel's
          // own brand image rather than a placeholder (placeholders make
          // poor share previews).
          url: PHOTOS.hero.url,
          width: 2560,
          height: 1707,
          alt: t('imageAlt'),
        },
      ],
    },
  };
}

type Program = { title: string; body: string; image: string };

// §52 — interim, non-contractual Unsplash visuals (free Unsplash Licence),
// themed per activity, for the program carousel. Deliberately scene/object
// shots (no posing as the real school). Placeholder until the owner supplies
// real Hope for the Future photos (#99) — swap is just these URLs.
const PROGRAM_IMAGES = [
  'https://images.unsplash.com/photo-1502051400-dad986bddd4f?w=1920&q=80&auto=format&fit=crop', // éducation — livres
  'https://images.unsplash.com/photo-1624638760852-8ede1666ab07?w=1920&q=80&auto=format&fit=crop', // santé — trousse de secours
  'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1920&q=80&auto=format&fit=crop', // arts — pinceaux
  'https://images.unsplash.com/photo-1605020420620-20c943cc4669?w=1920&q=80&auto=format&fit=crop', // musique — guitare
  'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1920&q=80&auto=format&fit=crop', // danse & sport — football
  'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=1920&q=80&auto=format&fit=crop', // langues — cahier
  'https://images.unsplash.com/photo-1646928234724-ddfac30993e6?w=1920&q=80&auto=format&fit=crop', // environnement — forêt
  'https://images.unsplash.com/photo-1473163928189-364b2c4e1135?w=1920&q=80&auto=format&fit=crop', // histoire — cartes anciennes
];

// §54 — richer image set (free Unsplash Licence) feeding the constellation
// gallery header. Same guardrail as PROGRAM_IMAGES: thematic scene/object
// shots, no stock children's faces. Interim until real HFF photos (#99).
const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1502051400-dad986bddd4f?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1605020420620-20c943cc4669?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1646928234724-ddfac30993e6?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1711062717319-393e424a3538?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1719310469053-8c5c0c6803d3?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507010444286-828ea71bfac7?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1587329310686-91414b8e3cb7?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1558694440-03ade9215d7b?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1611843467160-25afb8df1074?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1550592704-6c76defa9985?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600907055749-d6cc7e75efd4?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1617721928610-4d953b81bba8?w=600&q=80&auto=format&fit=crop',
];

// §55 — interim cinematic hero image : a wide Madagascar-highlands / rice-
// terraces landscape (the actual Fianarantsoa region around Ambalakely), so
// it evokes the place without posing as the school. Swap for a real Hope for
// the Future photo when available (#99).
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1558437753-21dc69d8ebed?w=2400&q=80&auto=format&fit=crop';

export default async function CommunityPage({ params }: LocaleParam) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Community');

  const heroTitle = t.raw('heroTitle') as string[];

  // §63 — fusion 8 → 4 piliers dans la voix « on » des enfants (style waabi,
  // demande user). Images : arts/crayons / guitare / football / forêt. §64 — On
  // apprend prend l'image « crayons » (celle de la constellation) car c'est
  // elle qui « dégrossit » à l'entrée du bloc.
  const programs: Program[] = [
    { title: t('programs.learnTitle'), body: t('programs.learnBody'), image: PROGRAM_IMAGES[2] },
    { title: t('programs.createTitle'), body: t('programs.createBody'), image: PROGRAM_IMAGES[3] },
    { title: t('programs.moveTitle'), body: t('programs.moveBody'), image: PROGRAM_IMAGES[4] },
    { title: t('programs.growTitle'), body: t('programs.growBody'), image: PROGRAM_IMAGES[6] },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: t('breadcrumbHome'), url: '/' },
          { name: t('breadcrumbCommunity'), url: '/community' },
        ]}
      />
      <Nav />
      <main id="main">
        {/* §61 — hero + constellation sur un fond beige COMMUN : le hero est
            transparent (z-20) et se réduit, la constellation (z-10) transparaît
            derrière puis défile en parallaxe. Aucun fond opaque ne croppe le
            texte qui remonte. */}
        <div className="relative bg-[var(--color-bg-subtle)]">
          <CommunityScrollHero
            src={HERO_IMAGE}
            alt={t('heroAlt')}
            title={heroTitle}
            subtitle={t('heroSubtitle')}
          />
          {/* §66 — waabi a DEUX temps (vérifié au DOM) : la mosaïque DÉFILE
              (tuiles 133px en colonnes, parallaxe, aucun fade), puis le bloc
              s'épingle et son image GRANDIT. On revient donc à la constellation
              qui scrolle + le bloc épinglé. */}
          <CommunityGallery
            kicker={t('galleryKicker')}
            title={t('galleryTitle')}
            body={t('galleryBody')}
            images={GALLERY_IMAGES}
          />
        </div>
        <CommunityPrograms items={programs} />

        {/* INTRO */}
        <section className="py-32 md:py-48 lg:py-56">
          <div className="mx-auto max-w-[700px] px-5 md:px-8">
            <ScrollReveal>
              <p className="lede-display">{t('introLede')}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <div className="mt-14 prose-editorial space-y-6">
                <p>{t('introP1')}</p>
                <p>{t('introP2')}</p>
                <p>{t('introP3')}</p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* AKANIMAMY DEEP DIVE */}
        <section id="akanimamy" className="py-32 md:py-48 hair-rule">
          <div className="mx-auto max-w-[1100px] px-5 md:px-8 lg:px-12">
            <ScrollReveal>
              <div className="caption">{t('akanimamyKicker')}</div>
              <h2 className="mt-6 font-display font-light text-[var(--color-text)] text-[44px] md:text-[56px] leading-[1] md:leading-[0.98] tracking-[-0.03em] balance max-w-[760px]">
                {t('akanimamyH2')}
              </h2>
            </ScrollReveal>
            <div className="mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <ScrollReveal className="lg:col-span-7">
                {/* §45 — placeholder until a real Akanimamy / school photo
                    is hosted locally (was the Squarespace HFF2.jpg hotlink). */}
                <div className="relative aspect-[4/3] bg-[var(--color-bg-muted)] overflow-hidden">
                  <ImagePlaceholder label={t('akanimamyImageAlt')} />
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.05} className="lg:col-span-5">
                <div className="prose-editorial">
                  <p>
                    <em className="not-italic font-display font-light text-[var(--color-text)]">
                      {t('akanimamyP1Akany')}
                    </em>
                    {t('akanimamyP1Mid')}
                    <em className="not-italic font-display font-light text-[var(--color-text)]">
                      {t('akanimamyP1MamyWord')}
                    </em>
                    {t('akanimamyP1Trail')}
                  </p>
                  <p>{t('akanimamyP2')}</p>
                  <p>{t('akanimamyP3')}</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* VISIT */}
        <section className="py-32 md:py-48 lg:py-56 hair-rule bg-[var(--color-bg-subtle)]">
          <div className="mx-auto max-w-[760px] px-5 md:px-8 text-center">
            <ScrollReveal>
              <div className="caption mb-4">{t('visitKicker')}</div>
              <h2 className="font-display font-light text-[var(--color-text)] text-[44px] md:text-[56px] leading-[1] md:leading-[0.98] tracking-[-0.03em] balance">
                {t('visitH2')}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <div className="mt-12 prose-editorial space-y-6 text-left">
                <p>{t('visitP1')}</p>
                <p>{t('visitP2')}</p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 md:py-48 lg:py-64 hair-rule">
          <div className="mx-auto max-w-[920px] px-5 md:px-8 text-center">
            <ScrollReveal>
              <div className="caption mb-4">{t('ctaKicker')}</div>
              <h2 className="font-display font-light text-[var(--color-text)] text-[44px] md:text-[56px] leading-[1] md:leading-[0.98] tracking-[-0.03em] balance">
                {t('ctaH2')}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="mt-12 inline-flex flex-wrap items-baseline gap-x-10 gap-y-6 justify-center">
                <BookingButton>{t('ctaCheck')}</BookingButton>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-3 font-body text-[15px] font-medium text-[var(--color-text)]"
                >
                  {t('ctaReadAbout')}
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
