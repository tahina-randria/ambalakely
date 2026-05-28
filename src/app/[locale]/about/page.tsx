import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/atoms/Container';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { BreadcrumbJsonLd } from '@/components/atoms/JsonLd';
import { BookingButton } from '@/components/atoms/BookingButton';
import { PageHero } from '@/components/molecules/PageHero';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { fetchHotel } from '@/sanity/lib/fetch';
import { PHOTOS } from '@/lib/data/photos';
import { localizedAlternates } from '@/lib/i18n/alternates';

type LocaleParam = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: LocaleParam): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About' });
  const alt = localizedAlternates(locale, '/about');
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
          url: PHOTOS.about.url,
          width: 2560,
          height: 1707,
          alt: t('imageAlt'),
        },
      ],
    },
  };
}

export default async function AboutPage({ params }: LocaleParam) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [HOTEL, t] = await Promise.all([fetchHotel(locale), getTranslations('About')]);

  const heroTitle = t.raw('heroTitle') as string[];
  // Timeline expanded §34 (2026-05-27 afternoon) — from 3 to 5 events
  // reflecting the real 22-year project chronology : 2002 terrain
  // acquired (Vonimboahirana), 2006 TGH founded, 2014 Hotel opens,
  // 2015 Toko Telo restaurant opens (the chalet rebadged), today.
  const milestones = [
    { year: t('milestones.landYear'), title: t('milestones.landTitle'), body: t('milestones.landBody') },
    { year: t('milestones.tghYear'), title: t('milestones.tghTitle'), body: t('milestones.tghBody') },
    { year: t('milestones.openYear'), title: t('milestones.openTitle'), body: t('milestones.openBody') },
    { year: t('milestones.tokoTeloYear'), title: t('milestones.tokoTeloTitle'), body: t('milestones.tokoTeloBody') },
    { year: t('milestones.todayYear'), title: t('milestones.todayTitle'), body: t('milestones.todayBody') },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: t('breadcrumbHome'), url: '/' },
          { name: t('breadcrumbAbout'), url: '/about' },
        ]}
      />
      <Nav />
      <main id="main">
        <PageHero
          src={PHOTOS.about.path}
          alt={t('heroAlt')}
          title={heroTitle}
        />

        {/* INTRO */}
        <section className="py-32 md:py-48 lg:py-56">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-3 lg:sticky lg:top-32 self-start">
                <ScrollReveal>
                  <div className="caption">{t('introKicker')}</div>
                </ScrollReveal>
              </div>
              <div className="lg:col-span-9 max-w-[760px]">
                <ScrollReveal>
                  <p className="lede max-w-[34ch]">{t('introLede')}</p>
                </ScrollReveal>
                <ScrollReveal delay={0.05}>
                  <div className="mt-12 prose-editorial">
                    <p>
                      {t('introP1Lead')}
                      <em className="not-italic font-display font-light">{t('introP1Em')}</em>
                      {t('introP1Trail')}
                    </p>
                    <p>
                      {t('introP2Lead')}
                      <strong className="font-display font-light text-[var(--color-text)]">
                        {t('introP2Strong')}
                      </strong>
                      {t('introP2Trail')}
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
                src={PHOTOS.about.path}
                alt={t('foundersImageAlt')}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="lg:col-span-5 px-5 md:px-12 lg:px-16 py-20 md:py-32 flex flex-col justify-center">
              <ScrollReveal>
                <div className="caption">{t('foundersKicker')}</div>
                <h2 className="mt-6 font-display font-light text-[var(--color-text)] text-[36px] md:text-[52px] leading-[1.02] tracking-[-0.03em] max-w-[420px]">
                  {t('foundersH2')}
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.05}>
                <div className="mt-10 prose-editorial max-w-[460px]">
                  <p>
                    <strong className="font-display font-light text-[var(--color-text)]">
                      {t('foundersHasinaLead')}
                    </strong>
                    {t('foundersHasinaBody')}
                  </p>
                  <p>
                    <strong className="font-display font-light text-[var(--color-text)]">
                      {t('foundersMamyLead')}
                    </strong>
                    {t('foundersMamyBody')}
                  </p>
                  <p>{t('foundersTogether')}</p>
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
                  <div className="caption">{t('timelineKicker')}</div>
                  <h2 className="mt-6 font-display font-light text-[var(--color-text)] text-[28px] md:text-[36px] leading-[1.05] tracking-[-0.025em] max-w-[260px]">
                    {t('timelineH2')}
                  </h2>
                </ScrollReveal>
              </div>
              <div className="lg:col-span-9">
                <ul className="border-t border-[var(--color-border-subtle)]">
                  {milestones.map((m, i) => (
                    <ScrollReveal key={m.year} delay={i * 0.04}>
                      <li className="grid grid-cols-12 gap-6 py-10 md:py-14 border-b border-[var(--color-border-subtle)]">
                        <div className="col-span-3 md:col-span-2">
                          <div className="text-[14px] tabular-nums text-[var(--color-text-muted)]">
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
                  <div className="caption">{t('tghKicker')}</div>
                </ScrollReveal>
              </div>
              <div className="lg:col-span-9 max-w-[760px]">
                <ScrollReveal>
                  <h2 className="font-display font-light text-[var(--color-text)] text-[36px] md:text-[52px] leading-[1.02] tracking-[-0.03em] max-w-[640px]">
                    {t('tghH2')}
                  </h2>
                </ScrollReveal>
                <ScrollReveal delay={0.05}>
                  <div className="mt-10 prose-editorial">
                    <p>{t('tghP1')}</p>
                    <p>{t('tghP2')}</p>
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
                  <p className="pull-quote max-w-[26ch]">&ldquo;{t('pullQuote')}&rdquo;</p>
                  <div className="mt-10 flex items-center gap-4">
                    <div className="w-10 border-t border-[var(--color-sand-12)]" />
                    <div className="font-display text-[16px] tracking-[-0.005em] text-[var(--color-text)]">
                      {t('pullQuoteSigned')}
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
                <div className="caption">{t('hopeKicker')}</div>
                <h2 className="mt-6 font-display font-light text-[var(--color-text)] text-[36px] md:text-[52px] leading-[1.02] tracking-[-0.03em] max-w-[420px]">
                  {t('hopeH2')}
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.05}>
                <div className="mt-10 prose-editorial max-w-[460px]">
                  <p>{t('hopeP1')}</p>
                  <p>{t('hopeP2')}</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <Link
                  href="/community"
                  className="mt-12 group inline-flex items-center gap-2 font-body text-[15px] font-medium text-[var(--color-text)]"
                >
                  {t('hopeCTA')}
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
                alt={t('hopeImageAlt')}
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
              <div className="caption">{t('bookKicker')}</div>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h2 className="mt-8 font-display font-light text-[var(--color-text)] text-[44px] leading-[1] md:text-[56px] md:leading-[0.98] tracking-[-0.03em] balance">
                {t('bookH2')}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="mt-12 flex flex-wrap items-baseline gap-x-10 gap-y-6">
                <BookingButton>{t('bookCheck')}</BookingButton>
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
                <span>{t('continueLabel')}</span>
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
