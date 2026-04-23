import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/atoms/Container';
import { Section } from '@/components/atoms/Section';
import { Kicker } from '@/components/atoms/Kicker';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

const stats = [
  { value: 'Since 2018', label: 'Opened' },
  { value: '18', label: 'Permanent staff' },
  { value: '97%', label: 'Locally hired' },
];

export function Story() {
  return (
    <Section id="about" divider>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Portrait — 5 cols, portrait ratio */}
          <ScrollReveal className="lg:col-span-5">
            <div
              className="relative aspect-[4/5] overflow-hidden bg-[var(--color-bg-muted)]"
              style={{
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1400&q=90"
                alt="Hasina, founder"
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
            </div>
          </ScrollReveal>

          {/* Prose — 7 cols */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <ScrollReveal>
              <Kicker>About</Kicker>

              <h2 className="mt-8 font-display font-light tracking-[-0.03em] text-[var(--color-text)] text-[40px] leading-[1.1] md:text-[56px] md:leading-[1.05] max-w-[720px] balance">
                I opened Ambalakely in 2018 on the hill where I grew up.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <div className="mt-10 max-w-[580px] flex flex-col gap-5 text-[17px] leading-[1.65] text-[var(--color-text-muted)]">
                <p>
                  I wanted a place where people could stay long enough to leave
                  differently. Not a stop on the road south, but a home to come
                  back to.
                </p>
                <p>
                  Eighteen of us work here full-time. Almost all of us come from the
                  villages around Fianarantsoa. We cook what grows in the garden and
                  at the market. We walk the valley. We read. We sleep well.
                </p>
                <p className="font-body text-[15px] text-[var(--color-text-subdued)]">
                  — Hasina Rakoto, founder
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <dl className="mt-14 pt-10 border-t border-[var(--color-border-subtle)] grid grid-cols-3 gap-x-8 gap-y-4 max-w-[580px]">
                {stats.map((s) => (
                  <div key={s.label} className="flex flex-col">
                    <dt className="font-mono text-[13px] uppercase tracking-[0.08em] text-[var(--color-text-muted)] order-2 mt-2">
                      {s.label}
                    </dt>
                    <dd className="font-display font-light tracking-[-0.02em] text-[var(--color-text)] text-[28px] leading-[1] md:text-[32px] order-1">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <Link
                href="/about"
                className="mt-12 inline-flex items-center gap-2 font-body text-[15px] font-medium text-[var(--color-text)] group"
              >
                More about us
                <ArrowRight
                  size={18}
                  className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1"
                />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
