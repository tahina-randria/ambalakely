import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { BreadcrumbJsonLd } from '@/components/atoms/JsonLd';
import { PageHero } from '@/components/molecules/PageHero';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { articles } from '@/lib/data/articles';

export const metadata: Metadata = {
  title: 'Journal',
  description:
    'Writing from Hotel Ambalakely. Hasina and Mamy on the kitchen, the garden, the highlands and the people who pass through.',
  alternates: { canonical: '/journal' },
  openGraph: {
    title: 'Journal · Hotel Ambalakely',
    description: 'Writing from Hasina and Mamy.',
    url: '/journal',
  },
};

export default function JournalPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Journal', url: '/journal' },
        ]}
      />
      <Nav />
      <main id="main">
        <PageHero
          src={articles[0].cover}
          alt="From the Hotel Ambalakely journal"
          title={['Journal of', 'Hotel Ambalakely.']}
          hideCta
        />

        {/* Intro */}
        <section className="py-32 md:py-48 lg:py-56">
          <div className="mx-auto max-w-[700px] px-5 md:px-8">
            <ScrollReveal>
              <p className="font-display font-light text-[var(--color-text)] text-[28px] md:text-[40px] leading-[1.2] tracking-[-0.025em] balance">
                Writing from Hasina and Mamy. The kitchen, the garden, the people who
                pass through.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Articles list */}
        <section className="hair-rule py-24 md:py-32">
          <div className="mx-auto max-w-[1100px] px-5 md:px-8 lg:px-12">
            <ul>
              {articles.map((article, i) => (
                <ScrollReveal key={article.slug} delay={i * 0.05}>
                  <li className="border-b border-[var(--color-border-subtle)]">
                    <Link
                      href={`/journal/${article.slug}`}
                      className="group block py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16"
                    >
                      <div className="lg:col-span-5">
                        <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-bg-muted)]">
                          <Image
                            src={article.cover}
                            alt={article.title}
                            fill
                            sizes="(min-width: 1024px) 42vw, 100vw"
                            className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-[1.03]"
                          />
                        </div>
                      </div>
                      <div className="lg:col-span-7 flex flex-col justify-center">
                        <div className="caption text-[var(--color-text-muted)]">
                          {article.date} · {article.author}
                        </div>
                        <h2 className="mt-6 font-display font-light text-[var(--color-text)] text-[36px] md:text-[48px] leading-[1.02] tracking-[-0.03em] balance group-hover:translate-x-1 transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)]">
                          {article.title}
                        </h2>
                        <p className="mt-6 prose-editorial">{article.excerpt}</p>
                        <div className="mt-8 inline-flex items-center gap-2 font-body text-[15px] font-medium text-[var(--color-text)]">
                          Read the article
                          <ArrowRight
                            size={18}
                            className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1.5"
                          />
                        </div>
                      </div>
                    </Link>
                  </li>
                </ScrollReveal>
              ))}
            </ul>
            <ScrollReveal>
              <p className="mt-16 caption text-[var(--color-text-muted)] max-w-[560px]">
                More writing arrives every season. Subscribe to the newsletter at the
                desk on arrival.
              </p>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
