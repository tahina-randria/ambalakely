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

type LocaleParam = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: LocaleParam): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Community' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: '/community' },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: '/community',
      images: [
        {
          url: 'https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/38aeed61-0d50-4cde-a210-1c6363f4139c/HFF2.jpg?format=1500w',
          width: 1500,
          height: 1200,
          alt: t('imageAlt'),
        },
      ],
    },
  };
}

type Stat = { value: string; label: string; Icon: PhosphorIcon };
type Program = { title: string; body: string; Icon: PhosphorIcon };

export default async function CommunityPage({ params }: LocaleParam) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Community');

  const heroTitle = t.raw('heroTitle') as string[];

  const numbers: Stat[] = [
    { value: '130', label: t('numberChildrenLabel'), Icon: Users },
    { value: '4 000', label: t('numberInhabitantsLabel'), Icon: HouseIcon },
    { value: '1', label: t('numberNeighbourhoodLabel'), Icon: MapPinLine },
    { value: '152 m²', label: t('numberBuildingLabel'), Icon: Calendar },
  ];

  const programs: Program[] = [
    { title: t('programs.educationTitle'), body: t('programs.educationBody'), Icon: GraduationCap },
    { title: t('programs.healthTitle'), body: t('programs.healthBody'), Icon: HeartStraight },
    { title: t('programs.artsTitle'), body: t('programs.artsBody'), Icon: PaintBrush },
    { title: t('programs.musicTitle'), body: t('programs.musicBody'), Icon: MusicNotes },
    { title: t('programs.danceTitle'), body: t('programs.danceBody'), Icon: PersonSimpleRun },
    { title: t('programs.langTitle'), body: t('programs.langBody'), Icon: Translate },
    { title: t('programs.envTitle'), body: t('programs.envBody'), Icon: Leaf },
    { title: t('programs.historyTitle'), body: t('programs.historyBody'), Icon: BookOpen },
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
        <PageHero
          src="https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/38aeed61-0d50-4cde-a210-1c6363f4139c/HFF2.jpg?format=2500w"
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

        {/* NUMBERS */}
        <section className="py-24 md:py-32 hair-rule bg-[var(--color-bg-subtle)]">
          <div className="mx-auto max-w-[1100px] px-5 md:px-8 lg:px-12">
            <ScrollReveal>
              <div className="caption text-center mb-16 md:mb-20">{t('numbersKicker')}</div>
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

        {/* PROGRAMS */}
        <section className="py-32 md:py-48 lg:py-56 hair-rule bg-[var(--color-bg-subtle)]">
          <div className="mx-auto max-w-[1100px] px-5 md:px-8 lg:px-12">
            <ScrollReveal>
              <div className="caption text-center mb-4">{t('programsKicker')}</div>
              <h2 className="font-display font-light text-[var(--color-text)] text-[44px] md:text-[56px] leading-[1] md:leading-[0.98] tracking-[-0.03em] balance text-center mx-auto max-w-[680px]">
                {t('programsH2')}
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
              <div className="caption">{t('akanimamyKicker')}</div>
              <h2 className="mt-6 font-display font-light text-[var(--color-text)] text-[44px] md:text-[56px] leading-[1] md:leading-[0.98] tracking-[-0.03em] balance max-w-[760px]">
                {t('akanimamyH2')}
              </h2>
            </ScrollReveal>
            <div className="mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <ScrollReveal className="lg:col-span-7">
                <div className="relative aspect-[4/3] bg-[var(--color-bg-muted)] overflow-hidden">
                  <Image
                    src="https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/38aeed61-0d50-4cde-a210-1c6363f4139c/HFF2.jpg?format=2500w"
                    alt={t('akanimamyImageAlt')}
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
