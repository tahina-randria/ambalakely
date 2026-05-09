import { Container } from '@/components/atoms/Container';
import { Section } from '@/components/atoms/Section';
import { Kicker } from '@/components/atoms/Kicker';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { journalPosts } from '@/lib/data/rooms';

export function Journal() {
  return (
    <Section id="journal" divider>
      <Container>
        <ScrollReveal className="mb-16 md:mb-24">
          <Kicker>Journal</Kicker>
        </ScrollReveal>

        <ul className="border-t border-[var(--color-border-subtle)]">
          {journalPosts.map((post, i) => (
            <li key={post.id}>
              <ScrollReveal delay={i * 0.06}>
                <div className="flex items-center justify-between py-8 md:py-10 border-b border-[var(--color-border-subtle)]">
                  <div className="flex-1">
                    <div className="font-mono text-[13px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                      {post.date}
                    </div>
                    <div className="mt-3 font-display text-[24px] md:text-[32px] tracking-[-0.02em] text-[var(--color-text)] max-w-[680px]">
                      {post.title}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ul>

        <ScrollReveal className="mt-12 md:mt-16">
          <p className="text-[15px] leading-[1.6] text-[var(--color-text-muted)] max-w-[560px]">
            New writing arrives every season. The journal lives in print at the
            desk for now.
          </p>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
