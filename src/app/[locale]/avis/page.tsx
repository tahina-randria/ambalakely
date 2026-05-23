import type { Metadata } from 'next';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { BreadcrumbJsonLd } from '@/components/atoms/JsonLd';
import { BookingButton } from '@/components/atoms/BookingButton';
import { PageHero } from '@/components/molecules/PageHero';
import { Star } from '@phosphor-icons/react/dist/ssr';
import { PHOTOS } from '@/lib/data/photos';
import { fetchHotel, fetchReviews } from '@/sanity/lib/fetch';

export const metadata: Metadata = {
  title: 'Avis',
  description:
    "Tous les avis vérifiés de nos visiteurs sur Booking, TripAdvisor et Google. Hôtel Ambalakely, dix chambres à Fianarantsoa, Madagascar.",
  alternates: { canonical: '/avis' },
  openGraph: {
    title: 'Avis · Hôtel Ambalakely',
    description: 'Avis vérifiés sur Booking, TripAdvisor et Google.',
    url: '/avis',
  },
};

export default async function AvisPage() {
  const [HOTEL, reviews] = await Promise.all([fetchHotel(), fetchReviews()]);
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: '/' },
          { name: 'Avis', url: '/avis' },
        ]}
      />
      <Nav />
      <main id="main">
        <PageHero
          src={PHOTOS.story.path}
          alt="Hôtel Ambalakely, jardin et façade principale"
          title={['Ce que disent', 'nos visiteurs.']}
          hideCta
        />

        {/* Intro */}
        <section className="py-32 md:py-48 lg:py-56">
          <div className="mx-auto max-w-[700px] px-5 md:px-8">
            <ScrollReveal>
              <p className="lede-display">
                {reviews.length} avis vérifiés, repris mot pour mot depuis
                Booking, TripAdvisor et Google.
              </p>
            </ScrollReveal>
            {HOTEL.rating.value && HOTEL.rating.count ? (
              <ScrollReveal delay={0.05}>
                <div className="mt-8 flex items-center gap-3">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        weight="fill"
                        className="text-[var(--color-text)]"
                      />
                    ))}
                  </div>
                  <div className="caption text-[var(--color-text-muted)]">
                    {HOTEL.rating.value} sur 5 — {HOTEL.rating.count} avis sur{' '}
                    {HOTEL.rating.sources.join(' et ')}
                  </div>
                </div>
              </ScrollReveal>
            ) : null}
          </div>
        </section>

        {/* Editorial stack of all reviews */}
        <section className="hair-rule">
          <div className="mx-auto max-w-[1100px] px-5 md:px-8 lg:px-12">
            <ul className="border-t border-[var(--color-border-subtle)]">
              {reviews.map((review, i) => (
                <ScrollReveal key={`${review.author}-${i}`} delay={i * 0.04}>
                  <li className="border-b border-[var(--color-border-subtle)]">
                    <figure className="py-16 md:py-24 max-w-[920px]">
                      <div className="caption text-[var(--color-text-muted)]">
                        {review.source}
                      </div>
                      <blockquote className="mt-6 md:mt-8 font-display font-light text-[var(--color-text)] text-[26px] md:text-[36px] lg:text-[44px] leading-[1.25] md:leading-[1.2] tracking-[-0.02em] balance">
                        &ldquo;{review.quote}&rdquo;
                      </blockquote>
                      <figcaption className="mt-8 md:mt-10 flex items-center gap-4">
                        <div className="w-10 border-t border-[var(--color-sand-12)]" />
                        <div className="font-display text-[16px] tracking-[-0.005em] text-[var(--color-text)]">
                          {review.author}
                        </div>
                        {review.city ? (
                          <div className="caption text-[var(--color-text-muted)]">
                            {review.city}
                          </div>
                        ) : null}
                      </figcaption>
                    </figure>
                  </li>
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 md:py-48 lg:py-64 hair-rule">
          <div className="mx-auto max-w-[920px] px-5 md:px-8">
            <ScrollReveal>
              <div className="caption">Réserver</div>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h2 className="mt-8 font-display font-light text-[var(--color-text)] text-[44px] leading-[1] md:text-[56px] md:leading-[0.98] tracking-[-0.03em] balance">
                Venez vérifier par vous-même.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="mt-12 flex flex-wrap items-baseline gap-x-10 gap-y-6">
                <BookingButton>Voir les disponibilités</BookingButton>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
