import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    "Réponses pratiques pour votre séjour à l’Hôtel Ambalakely. Réservation, transferts depuis Antananarivo, ce qu’il faut prévoir, la table, le paiement et la route.",
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'FAQ · Hôtel Ambalakely',
    description: 'Réponses pratiques pour votre séjour.',
    url: '/faq',
  },
};

/** FAQPage JSON-LD for rich results in Google search. */
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

export default async function FaqPage() {
  const [faq, HOTEL] = await Promise.all([fetchFaq(), fetchHotel()]);
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: '/' },
          { name: 'FAQ', url: '/faq' },
        ]}
      />
      <FaqJsonLd faq={faq} />
      <Nav />
      <main id="main">
        <PageHero
          src={PHOTOS.faq.path}
          alt="Hôtel Ambalakely, Fianarantsoa, Madagascar"
          title={['Questions fréquentes,', 'réponses simples.']}
        />

        {/* INTRO */}
        <section className="py-32 md:py-48 lg:py-56">
          <div className="mx-auto max-w-[700px] px-5 md:px-8">
            <ScrollReveal>
              <p className="lede-display">
                Les questions qu&apos;on nous pose le plus souvent, avec de
                vraies réponses.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <p className="mt-12 prose-editorial">
                Si vous ne trouvez pas, écrivez-nous à{' '}
                <a
                  href={`mailto:${HOTEL.email}`}
                  className="underline-offset-4 hover:underline"
                >
                  {HOTEL.email}
                </a>{' '}
                et nous répondrons dans la journée. WhatsApp{' '}
                <a
                  href={`https://wa.me/${HOTEL.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-4 hover:underline tabular-nums"
                >
                  {HOTEL.phone}
                </a>{' '}
                fonctionne aussi.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* SEARCH + CATEGORY FILTER + RESULTS */}
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
                Écrivez-nous, ou réservez directement.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="mt-12 flex flex-wrap items-baseline gap-x-10 gap-y-6">
                <BookingButton>Voir les disponibilités</BookingButton>
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
