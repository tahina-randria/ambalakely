import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { BreadcrumbJsonLd } from '@/components/atoms/JsonLd';
import { BookingButton } from '@/components/atoms/BookingButton';
import { PageHero } from '@/components/molecules/PageHero';
import { FaqSearch } from '@/components/molecules/FaqSearch';
import type { FaqCategory } from '@/lib/data/faq';
import { fetchFaq, fetchHotel } from '@/sanity/lib/fetch';
import { PHOTOS } from '@/lib/data/photos';

type LocaleParam = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: LocaleParam): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'FaqPage' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: '/faq' },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: '/faq',
    },
  };
}

function FaqJsonLd({ faq }: { faq: FaqCategory[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.flatMap((cat) =>
      cat.entries.map((e) => ({
        '@type': 'Question',
        name: e.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: e.a,
        },
      })),
    ),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function FaqPage({ params }: LocaleParam) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [faq, HOTEL, t] = await Promise.all([
    fetchFaq(),
    fetchHotel(),
    getTranslations('FaqPage'),
  ]);

  const heroTitle = t.raw('heroTitle') as string[];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: t('breadcrumbHome'), url: '/' },
          { name: t('breadcrumbFaq'), url: '/faq' },
        ]}
      />
      <FaqJsonLd faq={faq} />
      <Nav />
      <main id="main">
        <PageHero
          src={PHOTOS.faq.path}
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
              <p className="mt-12 prose-editorial">
                {t('introBodyLead')}
                <a
                  href={`mailto:${HOTEL.email}`}
                  className="underline-offset-4 hover:underline"
                >
                  {HOTEL.email}
                </a>
                {t('introBodyMid')}
                <a
                  href={`https://wa.me/${HOTEL.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-4 hover:underline tabular-nums"
                >
                  {HOTEL.phone}
                </a>
                {t('introBodyTrail')}
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* SEARCH + RESULTS */}
        <section className="hair-rule pb-32 md:pb-48 lg:pb-56">
          <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12">
            <FaqSearch faq={faq} />
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 md:py-48 lg:py-64 hair-rule">
          <div className="mx-auto max-w-[920px] px-5 md:px-8">
            <ScrollReveal>
              <h2 className="font-display font-light text-[var(--color-text)] text-[44px] leading-[1] md:text-[56px] md:leading-[0.98] tracking-[-0.03em] balance">
                {t('ctaH2')}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="mt-12 flex flex-wrap items-baseline gap-x-10 gap-y-6">
                <BookingButton>{t('ctaCheck')}</BookingButton>
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
      </main>
      <Footer />
    </>
  );
}
