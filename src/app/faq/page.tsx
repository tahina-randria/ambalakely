import type { Metadata } from 'next';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { BreadcrumbJsonLd } from '@/components/atoms/JsonLd';
import { BookingButton } from '@/components/atoms/BookingButton';
import { PageHero } from '@/components/molecules/PageHero';
import { FaqSearch } from '@/components/molecules/FaqSearch';
import { faq } from '@/lib/data/faq';
import { HOTEL } from '@/lib/data/hotel';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Practical answers about visiting Hotel Ambalakely. Booking, transfers from Antananarivo, what to pack, the food, money, and the road.',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'FAQ · Hotel Ambalakely',
    description: 'Practical answers about your stay.',
    url: '/faq',
  },
};

/** FAQPage JSON-LD for rich results in Google search. */
function FaqJsonLd() {
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

export default function FaqPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'FAQ', url: '/faq' },
        ]}
      />
      <FaqJsonLd />
      <Nav />
      <main id="main">
        <PageHero
          src="https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/d200532b-8f27-4564-9f43-9339dc083af5/DSC_0421.jpg?format=2500w"
          alt="Hotel Ambalakely, Fianarantsoa Madagascar"
          title="Practical."
        />

        {/* INTRO */}
        <section className="py-32 md:py-48 lg:py-56">
          <div className="mx-auto max-w-[700px] px-5 md:px-8">
            <ScrollReveal>
              <p className="font-display font-light text-[var(--color-text)] text-[28px] md:text-[40px] leading-[1.2] tracking-[-0.025em] balance">
                The questions we are asked most often, with real answers.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <p className="mt-12 prose-editorial">
                If something is not here, write to us at{' '}
                <a
                  href={`mailto:${HOTEL.email}`}
                  className="underline-offset-4 hover:underline"
                >
                  {HOTEL.email}
                </a>{' '}
                and we will answer within the day. WhatsApp{' '}
                <a
                  href={`https://wa.me/${HOTEL.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-4 hover:underline tabular-nums"
                >
                  {HOTEL.phone}
                </a>{' '}
                works too.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* SEARCH + CATEGORY FILTER + RESULTS */}
        <section className="hair-rule pb-32 md:pb-48 lg:pb-56">
          <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12">
            <FaqSearch />
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 md:py-48 lg:py-64 hair-rule">
          <div className="mx-auto max-w-[920px] px-5 md:px-8">
            <ScrollReveal>
              <h2 className="font-display font-light text-[var(--color-text)] text-[48px] leading-[0.98] md:text-[80px] md:leading-[0.95] lg:text-[112px] lg:leading-[0.92] tracking-[-0.04em] balance">
                Write to us, or just book.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="mt-12 flex flex-wrap items-baseline gap-x-10 gap-y-6">
                <BookingButton>Check availability</BookingButton>
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
