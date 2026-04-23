import Link from 'next/link';
import { Container } from '@/components/atoms/Container';
import { Section } from '@/components/atoms/Section';
import { Kicker } from '@/components/atoms/Kicker';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { journalPosts } from '@/lib/data/rooms';
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react/dist/ssr';

export function Journal() {
  return (
    <Section id="journal" divider>
      <Container>
        <ScrollReveal className="mb-16 md:mb-24">
          <Kicker number={4}>Journal</Kicker>
        </ScrollReveal>

        <ul className="border-t border-[var(--color-border-subtle)]">
          {journalPosts.map((post, i) => (
            <li key={post.id}>
              <ScrollReveal delay={i * 0.06}>
                <Link
                  href={`/journal/${post.id}`}
                  className="group flex items-center justify-between py-8 md:py-10 border-b border-[var(--color-border-subtle)] hover:border-[var(--color-sand-12)] transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)]"
                >
                  <div className="flex-1">
                    <div className="font-mono text-[13px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                      {post.date}
                    </div>
                    <div className="mt-3 font-display text-[24px] md:text-[32px] tracking-[-0.02em] text-[var(--color-text)] max-w-[680px]">
                      {post.title}
                    </div>
                  </div>
                  <ArrowUpRight
                    size={24}
                    className="text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-all duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0"
                  />
                </Link>
              </ScrollReveal>
            </li>
          ))}
        </ul>

        <ScrollReveal className="mt-20">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 font-body text-[15px] font-medium text-[var(--color-text)] group"
          >
            All articles
            <ArrowRight
              size={18}
              className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1"
            />
          </Link>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
