import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { BreadcrumbJsonLd } from '@/components/atoms/JsonLd';
import { PageHero } from '@/components/molecules/PageHero';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { NewsletterSignup } from '@/components/molecules/NewsletterSignup';
import { PHOTOS } from '@/lib/data/photos';
import { fetchArticles } from '@/sanity/lib/fetch';

type LocaleParam = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: LocaleParam): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Journal' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: '/journal' },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: '/journal',
    },
  };
}

export default async function JournalPage({ params }: LocaleParam) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [articles, t] = await Promise.all([fetchArticles(), getTranslations('Journal')]);

  const heroSrc = articles[0]?.cover ?? PHOTOS.story.path;
  const isEmpty = articles.length === 0;
  const heroTitle = t.raw('heroTitle') as string[];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: t('metaTitle'), url: '/' },
          { name: t('metaTitle'), url: '/journal' },
        ]}
      />
      <Nav />
      <main id="main">
        <PageHero
          src={heroSrc}
          alt={t('heroAlt')}
          title={heroTitle}
          hideCta
        />

        {/* Intro */}
        <section className="py-32 md:py-48 lg:py-56">
          <div className="mx-auto max-w-[700px] px-5 md:px-8">
            <ScrollReveal>
              <p className="lede-display">{t('introLead')}</p>
            </ScrollReveal>
          </div>
        </section>

        {isEmpty ? (
          <section className="hair-rule py-32 md:py-48">
            <div className="mx-auto max-w-[700px] px-5 md:px-8 text-center">
              <ScrollReveal>
                <div className="caption text-[var(--color-text-muted)]">
                  {t('emptyKicker')}
                </div>
                <h2 className="mt-8 font-display font-light text-[var(--color-text)] text-[36px] md:text-[48px] leading-[1.02] tracking-[-0.03em] balance">
                  {t('emptyH2')}
                </h2>
                <p className="mt-8 prose-editorial">{t('emptyBody')}</p>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <div className="mt-12 max-w-[460px] mx-auto text-left">
                  <NewsletterSignup />
                </div>
              </ScrollReveal>
            </div>
          </section>
        ) : (
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
                            {t('readArticle')}
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
                  {t('moreEverySeason')}
                </p>
              </ScrollReveal>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
