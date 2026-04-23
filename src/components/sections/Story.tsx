import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/atoms/Container';
import { Section } from '@/components/atoms/Section';
import { Kicker } from '@/components/atoms/Kicker';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

const figures = [
  { label: 'Opened', value: '2018' },
  { label: 'Rooms', value: '10' },
  { label: 'Staff', value: '18' },
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
                alt="Hasina Randriamahazo"
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

              <h2 className="mt-8 font-display font-light tracking-[-0.03em] text-[var(--color-text)] text-[36px] leading-[1.1] md:text-[48px] md:leading-[1.05] max-w-[680px] balance">
                Hasina Randriamahazo opened Ambalakely in 2018.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <div className="mt-10 max-w-[560px] flex flex-col gap-5 text-[17px] leading-[1.65] text-[var(--color-text-muted)]">
                <p>
                  She grew up on this hill, south of Fianarantsoa. The hotel has
                  ten rooms, a restaurant, and a garden.
                </p>
                <p>
                  Eighteen of us work here. Most live within walking distance.
                  Some have been with us since day one.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <dl className="mt-14 pt-8 border-t border-[var(--color-border-subtle)] grid grid-cols-3 gap-x-10 max-w-[480px]">
                {figures.map((f) => (
                  <div key={f.label} className="flex flex-col gap-2">
                    <dt className="font-mono text-[13px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                      {f.label}
                    </dt>
                    <dd className="font-display font-light tracking-[-0.02em] text-[var(--color-text)] text-[32px] leading-[1] md:text-[40px]">
                      {f.value}
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
                Read more
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
