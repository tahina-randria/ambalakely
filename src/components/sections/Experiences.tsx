import Link from 'next/link';
import { Container } from '@/components/atoms/Container';
import { Section } from '@/components/atoms/Section';
import { Heading } from '@/components/atoms/Heading';
import { Kicker } from '@/components/atoms/Kicker';
import { ScrollReveal, Stagger, StaggerItem } from '@/lib/motion/ScrollReveal';
import { experiences } from '@/lib/data/rooms';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

export function Experiences() {
  return (
    <Section id="experiences" divider>
      <Container>
        <ScrollReveal className="mb-16 md:mb-24">
          <Kicker>Experiences</Kicker>
          <Heading variant="h2" className="mt-6 max-w-[800px]">
            Walk, weave, cook. What this land gives, in its own season.
          </Heading>
        </ScrollReveal>

        <Stagger className="flex flex-col max-w-[900px]">
          {experiences.map((exp) => (
            <StaggerItem key={exp.id}>
              <Link
                href={`/experiences/${exp.id}`}
                className="group flex items-center justify-between py-6 md:py-8 border-b border-[var(--color-border-subtle)] last:border-b-0 hover:border-[var(--color-sand-12)] transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)]"
              >
                <div className="flex items-baseline gap-6 md:gap-8">
                  <span className="font-mono text-[14px] text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-colors duration-[var(--duration-base)]">
                    {exp.number}
                  </span>
                  <div>
                    <div className="font-display text-[22px] md:text-[26px] tracking-[-0.02em] text-[var(--color-text)]">
                      {exp.title}
                    </div>
                    <div className="mt-1 text-[15px] text-[var(--color-text-muted)]">
                      {exp.subtitle}
                    </div>
                  </div>
                </div>
                <div className="font-mono text-[14px] text-[var(--color-text-muted)] shrink-0">
                  {exp.duration}
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <ScrollReveal className="mt-20">
          <Link
            href="/experiences"
            className="inline-flex items-center gap-2 font-body text-[15px] font-medium text-[var(--color-text)] group"
          >
            All experiences
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
