import Link from 'next/link';
import { Container } from '@/components/atoms/Container';
import { Section } from '@/components/atoms/Section';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { Kicker } from '@/components/atoms/Kicker';

const items = [
  { number: '01', label: 'Stay', href: '/#stay' },
  { number: '02', label: 'Dining', href: '/#dining' },
  { number: '03', label: 'Experiences', href: '/#experiences' },
  { number: '04', label: 'Guests', href: '/#reviews' },
  { number: '05', label: 'Location', href: '/#location' },
  { number: '06', label: 'Journal', href: '/#journal' },
];

export function IndexList() {
  return (
    <Section divider>
      <Container>
        <ScrollReveal className="mb-12 md:mb-20">
          <Kicker>Index</Kicker>
        </ScrollReveal>

        <ul className="border-t border-[var(--color-border-subtle)]">
          {items.map((item, i) => (
            <li key={item.number}>
              <ScrollReveal delay={i * 0.05}>
                <Link
                  href={item.href}
                  className="group flex items-center justify-between py-6 md:py-8 border-b border-[var(--color-border-subtle)] hover:border-[var(--color-sand-12)] transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)]"
                >
                  <div className="flex items-baseline gap-6 md:gap-10">
                    <span className="font-mono text-[14px] text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-colors duration-[var(--duration-base)]">
                      {item.number}
                    </span>
                    <span className="font-display text-[32px] md:text-[44px] lg:text-[56px] tracking-[-0.03em] text-[var(--color-text)]">
                      {item.label}
                    </span>
                  </div>
                  <ArrowUpRight
                    size={24}
                    weight="regular"
                    className="text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-[color,transform] duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Link>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
