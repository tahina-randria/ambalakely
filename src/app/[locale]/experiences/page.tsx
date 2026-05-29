import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { BreadcrumbJsonLd } from '@/components/atoms/JsonLd';
import { BookingButton } from '@/components/atoms/BookingButton';
import { PageHero } from '@/components/molecules/PageHero';
import { ImagePlaceholder } from '@/components/atoms/ImagePlaceholder';
import { StickyTocRail } from '@/components/molecules/StickyTocRail';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { fetchExcursions } from '@/sanity/lib/fetch';
import { PHOTOS } from '@/lib/data/photos';
import { localizedAlternates } from '@/lib/i18n/alternates';

type LocaleParam = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: LocaleParam): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ExperiencesPage' });
  const alt = localizedAlternates(locale, '/experiences');
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
          url: PHOTOS.experiences.url,
          width: 2560,
          height: 1707,
          alt: t('imageAlt'),
        },
      ],
    },
  };
}

export default async function ExperiencesPage({ params }: LocaleParam) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [experiences, t] = await Promise.all([
    fetchExcursions(locale),
    getTranslations('ExperiencesPage'),
  ]);

  const heroTitle = t.raw('heroTitle') as string[];

  // §44 — group the 10 experiences into 3 editorial bands. Done page-side
  // by slug (not via a data `category` field) because fetchExcursions merges
  // Sanity over the local fallback and Sanity may reorder or omit such a
  // field ; the slug is the stable identifier across both sources.
  type Exp = (typeof experiences)[number];
  const BANDS: { label: string; slugs: string[] }[] = [
    { label: t('bandNature'), slugs: ['ranomafana', 'rice-fields', 'andringitra', 'tsaranoro-stargazing'] },
    { label: t('bandCulture'), slugs: ['fianarantsoa-old-town', 'sahambavy', 'ambositra-woodcarving', 'antemoro-paper'] },
    { label: t('bandHouse'), slugs: ['cooking', 'community'] },
  ];
  const bySlug = new Map(experiences.map((e) => [e.slug, e]));
  const placed = new Set<string>();
  const bands = BANDS.map((b) => {
    const items = b.slugs.map((s) => bySlug.get(s)).filter((e): e is Exp => Boolean(e));
    items.forEach((it) => placed.add(it.slug));
    return { label: b.label, items };
  }).filter((b) => b.items.length > 0);
  // Defensive : any experience not matched by slug (e.g. a future Sanity
  // entry) is appended headerless so nothing silently disappears.
  const leftovers = experiences.filter((e) => !placed.has(e.slug));
  if (leftovers.length) bands.push({ label: '', items: leftovers });

  const orderedExps = bands.flatMap((b) => b.items);
  const zebraBySlug = new Map(orderedExps.map((e, i) => [e.slug, i % 2 === 1]));
  const tocItems = orderedExps.map((exp, i) => ({
    id: exp.slug,
    number: String(i + 1).padStart(2, '0'),
    label: exp.name,
  }));

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: t('breadcrumbHome'), url: '/' },
          { name: t('breadcrumbExperiences'), url: '/experiences' },
        ]}
      />
      <Nav />
      <StickyTocRail items={tocItems} />
      <main id="main">
        <PageHero
          src={PHOTOS.experiences.path}
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
              <p className="mt-12 prose-editorial">{t('introP1')}</p>
            </ScrollReveal>
          </div>
        </section>

        {/* QUICK NAV — card-style, hover-fill, no decorative numbers */}
        <section className="hair-rule py-16 md:py-20">
          <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12">
            <ScrollReveal>
              <div className="caption mb-8 md:mb-10">{t('quickNavKicker')}</div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {orderedExps.map((exp) => (
                  <li key={exp.slug}>
                    <Link
                      href={`#${exp.slug}`}
                      className="group block h-full p-5 md:p-6 border border-[var(--color-border-subtle)] hover:border-[var(--color-text)] hover:bg-[var(--color-bg-subtle)] transition-[border-color,background-color] duration-[var(--duration-base)] ease-[var(--ease-standard)]"
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <span className="caption text-[var(--color-text-muted)]">
                          {exp.duration}
                        </span>
                        <ArrowRight
                          size={16}
                          className="text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-[color,transform] duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1"
                        />
                      </div>
                      <div className="font-display font-light text-[var(--color-text)] text-[20px] md:text-[22px] tracking-[-0.02em] leading-[1.2]">
                        {exp.name}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </section>

        {/* EXPERIENCE CHAPTERS — grouped into 3 editorial bands (§44). Each
            band opens with a hair-ruled label (h2) ; the experiences below
            it are h3, keeping a correct document outline. Zebra striping
            runs globally across all bands for an even rhythm. */}
        {bands.map((band, bi) => (
          <div key={band.label || `band-${bi}`}>
            {band.label ? (
              <div className="hair-rule">
                <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-12 pt-24 md:pt-32 lg:pt-40 pb-2">
                  <ScrollReveal>
                    <h2 className="font-display font-light text-[var(--color-text)] text-[28px] md:text-[36px] tracking-[-0.025em]">
                      {band.label}
                    </h2>
                  </ScrollReveal>
                </div>
              </div>
            ) : null}
            {band.items.map((exp) => {
              const zebra = zebraBySlug.get(exp.slug) ?? false;
              return (
                <section
                  key={exp.slug}
                  id={exp.slug}
                  className={`py-20 md:py-28 lg:py-32 ${
                    zebra ? 'bg-[var(--color-bg-subtle)]' : ''
                  }`}
                >
                  <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-12 md:mb-16">
                      <div className="lg:col-span-3">
                        <ScrollReveal>
                          <div className="caption text-[var(--color-text-muted)]">
                            {exp.duration}
                          </div>
                        </ScrollReveal>
                      </div>
                      <div className="lg:col-span-9">
                        <ScrollReveal delay={0.05}>
                          <h3 className="font-display font-light text-[var(--color-text)] text-[44px] leading-[1] md:text-[56px] md:leading-[0.98] tracking-[-0.03em] balance">
                            {exp.name}
                          </h3>
                        </ScrollReveal>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                      <ScrollReveal
                        className={`lg:col-span-7 ${zebra ? 'lg:order-2' : ''}`}
                      >
                        <div className="relative aspect-[4/3] lg:aspect-[5/4] overflow-hidden bg-[var(--color-bg-muted)]">
                          {exp.image ? (
                            <Image
                              src={exp.image}
                              alt={`${exp.name}, Hôtel Ambalakely`}
                              fill
                              sizes="(min-width: 1024px) 58vw, 100vw"
                              className="object-cover"
                            />
                          ) : (
                            <ImagePlaceholder label={`${exp.name}, Hôtel Ambalakely`} />
                          )}
                        </div>
                        <div className="mt-3 caption text-[var(--color-text-muted)]">
                          {exp.tagline}
                        </div>
                      </ScrollReveal>

                      <div className={`lg:col-span-5 ${zebra ? 'lg:order-1' : ''}`}>
                        <ScrollReveal delay={0.05}>
                          <p className="prose-editorial">{exp.body}</p>
                        </ScrollReveal>

                        <ScrollReveal delay={0.1}>
                          <div className="mt-10 space-y-1">
                            <div className="spec-row">
                              <div className="spec-row__label">{t('specBest')}</div>
                              <div className="spec-row__value">{exp.best}</div>
                            </div>
                            {exp.cost ? (
                              <div className="spec-row">
                                <div className="spec-row__label">{t('specCost')}</div>
                                <div className="spec-row__value">{exp.cost}</div>
                              </div>
                            ) : null}
                          </div>
                        </ScrollReveal>

                        <ScrollReveal delay={0.15}>
                          <BookingButton className="mt-10">{exp.ctaLabel}</BookingButton>
                        </ScrollReveal>
                      </div>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        ))}

        {/* CTA */}
        <section className="py-32 md:py-48 lg:py-64 hair-rule">
          <div className="mx-auto max-w-[920px] px-5 md:px-8">
            <ScrollReveal>
              <div className="caption">{t('ctaKicker')}</div>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h2 className="mt-8 font-display font-light text-[var(--color-text)] text-[44px] leading-[1] md:text-[56px] md:leading-[0.98] tracking-[-0.03em] balance">
                {t('ctaH2')}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="mt-12 flex flex-wrap items-baseline gap-x-10 gap-y-6">
                <BookingButton>{t('ctaCheck')}</BookingButton>
                <Link
                  href="/plan-your-trip"
                  className="group inline-flex items-center gap-3 font-display font-light text-[var(--color-text)] text-[24px] md:text-[28px] tracking-[-0.02em] leading-[1.05]"
                >
                  {t('ctaItineraries')}
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
