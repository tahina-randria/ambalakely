import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
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
import { formatMga } from '@/lib/utils/format';
import { PHOTOS } from '@/lib/data/photos';

type LocaleParam = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: LocaleParam): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'RoomsPage' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: '/rooms' },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: '/rooms',
      images: [
        {
          url: PHOTOS.rooms.url,
          width: 2560,
          height: 1707,
          alt: t('imageAlt'),
        },
      ],
    },
  };
}

export default async function RoomsPage({ params }: LocaleParam) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [categories, t] = await Promise.all([fetchCategories(locale), getTranslations('RoomsPage')]);

  const heroTitle = t.raw('heroTitle') as string[];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: t('breadcrumbHome'), url: '/' },
          { name: t('breadcrumbRooms'), url: '/rooms' },
        ]}
      />
      <Nav />
      <main id="main">
        <PageHero
          src={categories[0].heroImage}
          alt={t('heroAlt')}
          title={heroTitle}
        />

        {/* ════════════════════════════════════════════════════════════
            EDITORIAL OPENING
        ════════════════════════════════════════════════════════════ */}
        <section className="py-32 md:py-48 lg:py-64">
          <div className="mx-auto max-w-[700px] px-5 md:px-8">
            <ScrollReveal>
              <p className="lede-display">{t('introLede')}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <div className="mt-14 prose-editorial">
                <p>{t('introP1')}</p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            COMPARISON GRID
        ════════════════════════════════════════════════════════════ */}
        <section className="py-24 md:py-32 lg:py-40 hair-rule">
          <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12">
            <ScrollReveal className="mb-10 md:mb-14">
              <div className="caption">{t('compareKicker')}</div>
              <h2 className="mt-6 font-display font-light text-[var(--color-text)] text-[32px] md:text-[44px] leading-[1.05] tracking-[-0.025em] max-w-[760px]">
                {t('compareH2')}
              </h2>
            </ScrollReveal>
            <ScrollReveal>
              <RoomComparison />
            </ScrollReveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            CATEGORY SEQUENCE
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
                {/* Count caption "X chambres" removed — same Aman pass
                    as the home Stay section. The room name is enough on
                    its own. Also clears the pa11y contrast warning on
                    text-white/75 over the gradient. */}
                <div className="mt-auto pb-14 md:pb-20">
                  <h2 className="font-display font-light tracking-[-0.03em] text-white text-[44px] leading-[1] md:text-[56px] md:leading-[0.98] balance">
                    {cat.name}
                  </h2>
                </div>
              </div>
            </section>

            {/* Editorial chapter */}
            <section className="py-32 md:py-48 lg:py-56">
              <div className="mx-auto max-w-[700px] px-5 md:px-8">
                <ScrollReveal>
                  <p className="font-display font-light text-[var(--color-text)] text-[24px] md:text-[32px] leading-[1.25] tracking-[-0.02em] balance">
                    {cat.shortDescription}
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.05}>
                  <p className="mt-12 font-display font-light text-[18px] leading-[1.55] text-[var(--color-text-muted)]">
                    {t('fromLine', {
                      size: cat.size,
                      capacity: cat.capacity.toLowerCase(),
                      bedSetup: cat.bedSetup,
                    })}{' '}
                    <span className="not-italic tabular-nums text-[var(--color-text)]">
                      {formatMga(cat.priceMga)} Ariary
                    </span>{' '}
                    {t('perNight')}.
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.1}>
                  <Link
                    href={`/rooms/${cat.slug}`}
                    className="group mt-12 inline-flex items-center gap-3 font-display font-light text-[var(--color-text)] text-[28px] md:text-[36px] tracking-[-0.025em] leading-[1.05]"
                  >
                    {t('readAbout', { name: cat.name })}
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
            RESERVE
        ════════════════════════════════════════════════════════════ */}
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
                <BookingButton>{t('ctaButton')}</BookingButton>
                <p className="text-[14px] leading-[1.55] text-[var(--color-text-muted)] max-w-[400px]">
                  {t('ctaNote')}
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
