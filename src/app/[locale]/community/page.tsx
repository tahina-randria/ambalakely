import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { BreadcrumbJsonLd } from '@/components/atoms/JsonLd';
import { BookingButton } from '@/components/atoms/BookingButton';
import { PageHero } from '@/components/molecules/PageHero';
import { ImagePlaceholder } from '@/components/atoms/ImagePlaceholder';
import { PHOTOS } from '@/lib/data/photos';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { localizedAlternates } from '@/lib/i18n/alternates';
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

export default async function CommunityPage({ params }: LocaleParam) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Community');

  const heroTitle = t.raw('heroTitle') as string[];

  const programs: Program[] = [
    { title: t('programs.educationTitle'), body: t('programs.educationBody'), image: PROGRAM_IMAGES[0] },
    { title: t('programs.healthTitle'), body: t('programs.healthBody'), image: PROGRAM_IMAGES[1] },
    { title: t('programs.artsTitle'), body: t('programs.artsBody'), image: PROGRAM_IMAGES[2] },
    { title: t('programs.musicTitle'), body: t('programs.musicBody'), image: PROGRAM_IMAGES[3] },
    { title: t('programs.danceTitle'), body: t('programs.danceBody'), image: PROGRAM_IMAGES[4] },
    { title: t('programs.langTitle'), body: t('programs.langBody'), image: PROGRAM_IMAGES[5] },
    { title: t('programs.envTitle'), body: t('programs.envBody'), image: PROGRAM_IMAGES[6] },
    { title: t('programs.historyTitle'), body: t('programs.historyBody'), image: PROGRAM_IMAGES[7] },
  ];

  const timeline = [
    { year: t('timeline.year1'), title: t('timeline.title1'), body: t('timeline.body1') },
    { year: t('timeline.year2'), title: t('timeline.title2'), body: t('timeline.body2') },
    { year: t('timeline.year3'), title: t('timeline.title3'), body: t('timeline.body3') },
    { year: t('timeline.year4'), title: t('timeline.title4'), body: t('timeline.body4') },
    { year: t('timeline.year5'), title: t('timeline.title5'), body: t('timeline.body5') },
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
        {/* §45 — placeholder hero until real Tanambao school photos are
            hosted locally (was the external Squarespace HFF2.jpg). */}
        <PageHero
          placeholder
          alt={t('heroAlt')}
          title={heroTitle}
        />

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

        {/* §50 — "En chiffres" section removed : it duplicated the intro
            (which already states 130 enfants / 8 programmes / Akanimamy) and
            no layout landed well. The figures live in the intro ; an Akanimamy
            visual can return here once a real drawing exists. */}

        {/* TIMELINE */}
        <section className="py-32 md:py-48 lg:py-56 hair-rule">
          <div className="mx-auto max-w-[1100px] px-5 md:px-8 lg:px-12">
            <ScrollReveal>
              <div className="caption text-center mb-4">{t('timelineKicker')}</div>
              <h2 className="font-display font-light text-[var(--color-text)] text-[44px] md:text-[56px] leading-[1] md:leading-[0.98] tracking-[-0.03em] balance text-center mx-auto max-w-[680px]">
                {t('timelineH2')}
              </h2>
            </ScrollReveal>

            <ul className="mt-20 md:mt-28 mx-auto max-w-[860px] border-t border-[var(--color-border-subtle)]">
              {timeline.map((m, i) => (
                <ScrollReveal key={m.year} delay={i * 0.04}>
                  <li className="grid grid-cols-12 gap-6 py-10 md:py-14 border-b border-[var(--color-border-subtle)]">
                    <div className="col-span-3 md:col-span-2">
                      <div className="text-[14px] tabular-nums text-[var(--color-text-muted)]">
                        {m.year}
                      </div>
                    </div>
                    <div className="col-span-9 md:col-span-10 max-w-[640px]">
                      <h3 className="font-display font-light text-[var(--color-text)] text-[24px] md:text-[32px] leading-[1.05] tracking-[-0.025em]">
                        {m.title}
                      </h3>
                      <p className="mt-4 prose-editorial">{m.body}</p>
                    </div>
                  </li>
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </section>

        {/* PROGRAMS — §48 sticky split (left index + scrolling detail with
            per-activity image slots). Client component for the scroll-spy. */}
        <CommunityPrograms
          kicker={t('programsKicker')}
          h2={t('programsH2')}
          items={programs}
        />

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

        {/* PULL QUOTE */}
        <section className="py-32 md:py-48 hair-rule">
          <div className="mx-auto max-w-[1000px] px-5 md:px-8 lg:px-12 text-center">
            <ScrollReveal>
              <p className="pull-quote mx-auto max-w-[30ch]">
                &ldquo;{t('pullQuote')}&rdquo;
              </p>
              <div className="mt-12 inline-flex items-center gap-4">
                <div className="w-12 border-t border-[var(--color-sand-12)]" />
                <div className="font-display text-[18px] tracking-[-0.005em] text-[var(--color-text)]">
                  {t('pullQuoteSigned')}
                </div>
              </div>
            </ScrollReveal>
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
