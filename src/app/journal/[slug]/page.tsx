import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { BreadcrumbJsonLd } from '@/components/atoms/JsonLd';
import { BookingButton } from '@/components/atoms/BookingButton';
import { PageHero } from '@/components/molecules/PageHero';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { articles, getArticle } from '@/lib/data/articles';
import { HOTEL } from '@/lib/data/hotel';

type Params = { slug: string };

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: 'Article not found' };

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/journal/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `/journal/${article.slug}`,
      type: 'article',
      publishedTime: article.datePublished,
      authors: [article.author],
      images: [{ url: article.cover, width: 1500, height: 1875, alt: article.title }],
    },
  };
}

function ArticleJsonLd({ article }: { article: ReturnType<typeof getArticle> }) {
  if (!article) return null;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.cover,
    datePublished: article.datePublished,
    dateModified: article.datePublished,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: HOTEL.name,
      url: HOTEL.url,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${HOTEL.url}/journal/${article.slug}`,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const others = articles.filter((a) => a.slug !== article.slug);
  const middleIndex = Math.floor(article.body.length / 2);
  const beforeQuote = article.body.slice(0, middleIndex);
  const afterQuote = article.body.slice(middleIndex);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Journal', url: '/journal' },
          { name: article.title, url: `/journal/${article.slug}` },
        ]}
      />
      <ArticleJsonLd article={article} />
      <Nav />
      <main id="main">
        <PageHero
          src={article.cover}
          alt={article.title}
          title={article.title}
          hideCta
        />

        {/* ════════════════════════════════════════════════════════════
            BYLINE + EXCERPT + ARTICLE BODY (first half)
            Substack-tight rhythm : kicker, excerpt, meta row, hr, body
        ════════════════════════════════════════════════════════════ */}
        <section className="pt-20 md:pt-28 lg:pt-32 pb-20 md:pb-32">
          <div className="mx-auto max-w-[680px] px-5 md:px-8">
            <ScrollReveal>
              <div className="caption text-[var(--color-text-muted)]">
                From the journal
              </div>
              <p className="mt-6 font-display font-light text-[var(--color-text)] text-[22px] md:text-[26px] leading-[1.35] tracking-[-0.015em] balance">
                {article.excerpt}
              </p>
              <div className="mt-10 flex items-center gap-4 text-[14px]">
                <div className="font-display tracking-[-0.005em] text-[var(--color-text)]">
                  {article.author}
                </div>
                <div className="w-1 h-1 rounded-full bg-[var(--color-text-muted)]" />
                <div className="caption text-[var(--color-text-muted)]">
                  {article.authorRole}
                </div>
                <div className="w-1 h-1 rounded-full bg-[var(--color-text-muted)]" />
                <div className="caption text-[var(--color-text-muted)]">
                  {article.date}
                </div>
              </div>
              <hr className="mt-10 border-t border-[var(--color-border-subtle)]" />
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <div className="mt-12 prose-editorial text-[18px] md:text-[20px] leading-[1.7] space-y-7">
                {beforeQuote.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            PULL QUOTE
        ════════════════════════════════════════════════════════════ */}
        {article.pullQuote ? (
          <section className="py-20 md:py-32 hair-rule">
            <div className="mx-auto max-w-[1000px] px-5 md:px-8 lg:px-12">
              <ScrollReveal>
                <p className="pull-quote">&ldquo;{article.pullQuote}&rdquo;</p>
              </ScrollReveal>
            </div>
          </section>
        ) : null}

        {/* ════════════════════════════════════════════════════════════
            INLINE IMAGE — full bleed, atmospheric break
        ════════════════════════════════════════════════════════════ */}
        {article.inlineImage ? (
          <section className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-[var(--color-bg-muted)]">
            <Image
              src={article.inlineImage.src}
              alt={article.inlineImage.alt}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </section>
        ) : null}

        {/* ════════════════════════════════════════════════════════════
            ARTICLE BODY — second half
        ════════════════════════════════════════════════════════════ */}
        <section className={`${article.pullQuote ? 'pt-20 md:pt-32 hair-rule' : ''} pb-32 md:pb-48`}>
          <div className="mx-auto max-w-[680px] px-5 md:px-8">
            <ScrollReveal>
              <div className="prose-editorial text-[18px] md:text-[20px] leading-[1.7] space-y-7">
                {afterQuote.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="mt-16 flex items-center gap-4">
                <div className="w-12 border-t border-[var(--color-sand-12)]" />
                <div className="font-display text-[18px] tracking-[-0.005em] text-[var(--color-text)]">
                  {article.author}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            BOOKING CTA
        ════════════════════════════════════════════════════════════ */}
        <section className="py-32 md:py-48 hair-rule">
          <div className="mx-auto max-w-[920px] px-5 md:px-8">
            <ScrollReveal>
              <div className="caption">Stay with us</div>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h2 className="mt-8 font-display font-light text-[var(--color-text)] text-[44px] leading-[1] md:text-[56px] md:leading-[0.98] tracking-[-0.03em] balance">
                Read the rest in person.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="mt-12 flex flex-wrap items-baseline gap-x-10 gap-y-6">
                <BookingButton>Check availability</BookingButton>
                <Link
                  href="/journal"
                  className="group inline-flex items-center gap-2 font-body text-[15px] font-medium text-[var(--color-text)]"
                >
                  Back to the journal
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1.5"
                  />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            OTHER ARTICLES
        ════════════════════════════════════════════════════════════ */}
        {others.length > 0 ? (
          <section className="py-32 md:py-48 hair-rule">
            <div className="mx-auto max-w-[1100px] px-5 md:px-8 lg:px-12">
              <ScrollReveal>
                <div className="caption">More writing</div>
              </ScrollReveal>
              <ul className="mt-12">
                {others.map((o) => (
                  <li key={o.slug} className="border-b border-[var(--color-border-subtle)]">
                    <Link
                      href={`/journal/${o.slug}`}
                      className="group block py-10 md:py-14 grid grid-cols-12 gap-6 items-baseline"
                    >
                      <div className="col-span-12 md:col-span-3">
                        <div className="caption text-[var(--color-text-muted)]">
                          {o.date} · {o.author}
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-9">
                        <h3 className="font-display font-light text-[var(--color-text)] text-[28px] md:text-[40px] leading-[1.05] tracking-[-0.025em] group-hover:translate-x-2 transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)]">
                          {o.title}
                        </h3>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
