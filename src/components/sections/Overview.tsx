import { Container } from '@/components/atoms/Container';
import { Section } from '@/components/atoms/Section';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';

const facts = [
  { label: 'Location', value: 'Fianarantsoa' },
  { label: 'Rooms', value: '10' },
  { label: 'Table', value: 'Toko Telo' },
  { label: 'Since', value: '2018' },
];

export function Overview() {
  return (
    <Section id="overview" divider>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <ScrollReveal className="lg:col-span-7">
            <div className="font-mono text-[13px] uppercase tracking-[0.1em] text-[var(--color-text-muted)] mb-6">
              What it is
            </div>
            <p className="font-display font-light tracking-[-0.02em] text-[var(--color-text)] text-[28px] leading-[1.25] md:text-[36px] md:leading-[1.25] max-w-[720px] balance">
              A small hotel in Ambalakely, ten minutes from Fianarantsoa. Three room
              categories, a restaurant called Toko Telo, a garden, and views over
              the surrounding rice fields.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.05} className="lg:col-span-5">
            <dl className="grid grid-cols-2 gap-x-8 gap-y-10 lg:pl-8 lg:border-l lg:border-[var(--color-border-subtle)]">
              {facts.map((f) => (
                <div key={f.label} className="flex flex-col gap-2">
                  <dt className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--color-text-muted)]">
                    {f.label}
                  </dt>
                  <dd className="font-display font-light tracking-[-0.02em] text-[var(--color-text)] text-[24px] leading-[1.1] md:text-[28px]">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </ScrollReveal>
        </div>
      </Container>
    </Section>
  );
}
