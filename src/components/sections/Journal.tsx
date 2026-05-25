import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/atoms/Container';
import { Section } from '@/components/atoms/Section';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { fetchArticles } from '@/sanity/lib/fetch';

export async function Journal() {
  const [articles, t] = await Promise.all([
    fetchArticles(),
    getTranslations('Journal'),
  ]);
  if (articles.length === 0) return null;
  return (
    <Section id="journal" divider>
      <Container>
        <ScrollReveal className="mb-12 md:mb-16">
          <h2 className="font-display font-light tracking-[-0.03em] text-[var(--color-text)] text-[44px] leading-[1] md:text-[56px] md:leading-[0.98]">
            {t('kicker')}
          </h2>
        </ScrollReveal>

        <ul className="border-t border-[var(--color-border-subtle)]">
          {articles.map((post, i) => (
            <li key={post.slug}>
              <ScrollReveal delay={i * 0.06}>
                <Link
                  href={`/journal/${post.slug}`}
                  className="group flex items-center justify-between py-8 md:py-10 border-b border-[var(--color-border-subtle)] hover:border-[var(--color-sand-12)] transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)]"
                >
                  <div className="flex-1">
                    <div className="text-[13px] tracking-[0] text-[var(--color-text-muted)]">
                      {post.date} · {post.author}
                    </div>
                    <div className="mt-3 font-display text-[24px] md:text-[32px] tracking-[-0.02em] text-[var(--color-text)] max-w-[680px]">
                      {post.title}
                    </div>
                  </div>
                  <ArrowUpRight
                    size={24}
                    className="text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-[color,transform] duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0"
                  />
                </Link>
              </ScrollReveal>
            </li>
          ))}
        </ul>

        <ScrollReveal className="mt-12 md:mt-16">
          <Link
            href="/journal"
            className="group inline-flex items-center gap-2 font-body text-[15px] font-medium text-[var(--color-text)]"
          >
            {t('viewAll')}
            <ArrowRight
              size={18}
              className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1.5"
            />
          </Link>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
