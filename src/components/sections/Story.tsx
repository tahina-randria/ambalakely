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
  { label: 'Concept', value: 'Koselig' },
];

export function Story() {
  return (
    <Section id="about" divider>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <ScrollReveal className="lg:col-span-5">
            <div
              className="relative aspect-[4/5] overflow-hidden bg-[var(--color-bg-muted)]"
              style={{
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
              }}
            >
              <Image
                src="https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/5766ca0c-fb44-4459-b2a0-468c184fe728/hotel.JPG?format=1500w"
                alt="Hôtel Ambalakely"
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
            </div>
          </ScrollReveal>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <ScrollReveal>
              <Kicker>About</Kicker>

              <h2 className="mt-8 font-display font-light tracking-[-0.03em] text-[var(--color-text)] text-[36px] leading-[1.1] md:text-[48px] md:leading-[1.05] max-w-[720px] balance">
                Mamy and Hasina opened Ambalakely in 2018.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <div className="mt-10 max-w-[580px] flex flex-col gap-5 text-[17px] leading-[1.65] text-[var(--color-text-muted)]">
                <p>
                  They transformed family land, once used for Sunday photo sessions,
                  into a ten-room hotel on a hill south of Fianarantsoa.
                </p>
                <p>
                  Hasina studied in Norway. She brought back the idea of{' '}
                  <em className="text-[var(--color-text)]">koselig</em>, a feeling
                  for warmth and wellbeing in small daily things, and married it
                  with Betsileo craft and hospitality.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <dl className="mt-14 pt-8 border-t border-[var(--color-border-subtle)] grid grid-cols-3 gap-x-10 max-w-[520px]">
                {figures.map((f) => (
                  <div key={f.label} className="flex flex-col gap-2">
                    <dt className="font-mono text-[13px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                      {f.label}
                    </dt>
                    <dd className="font-display font-light tracking-[-0.02em] text-[var(--color-text)] text-[28px] leading-[1] md:text-[36px]">
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
