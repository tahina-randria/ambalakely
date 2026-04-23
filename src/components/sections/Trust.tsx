import { Container } from '@/components/atoms/Container';
import { Section } from '@/components/atoms/Section';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';

const signals = [
  {
    label: 'Featured in',
    items: ['Condé Nast Traveler', 'Le Monde', 'NRK', 'Cereal Magazine'],
  },
  {
    label: 'Recognition',
    items: [
      'Travelers\u2019 Choice 2024',
      'Sustainable Hospitality',
      'Design Hotels Nominee',
    ],
  },
  {
    label: 'Payments',
    items: ['Visa', 'Mastercard', 'MVola', 'Orange Money', 'PCI DSS Level 1'],
  },
];

const stats = [
  { value: '18', label: 'permanent staff' },
  { value: '97%', label: 'locally employed' },
  { value: '12', label: 'families supported' },
  { value: '0', label: 'single-use plastics' },
];

export function Trust() {
  return (
    <Section id="trust" divider>
      <Container>
        <ScrollReveal className="max-w-[680px] mb-20">
          <div className="font-mono text-[13px] uppercase tracking-[0.08em] text-[var(--color-text-muted)] mb-6">
            Trusted
          </div>
          <h2 className="font-display font-light tracking-[-0.03em] text-[var(--color-text)] text-[36px] leading-[1.1] md:text-[48px] md:leading-[1.05] balance">
            Staying here should feel as safe as it feels quiet.
          </h2>
        </ScrollReveal>

        {/* Stats row */}
        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6 py-12 border-y border-[var(--color-border-subtle)]">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col">
                <div className="font-display font-light text-[56px] leading-[1] tracking-[-0.03em] text-[var(--color-text)] md:text-[72px]">
                  {s.value}
                </div>
                <div className="mt-3 font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Trust signals columns */}
        <ScrollReveal delay={0.15} className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {signals.map((col) => (
              <div key={col.label} className="flex flex-col">
                <div className="font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--color-text-muted)] mb-5">
                  {col.label}
                </div>
                <ul className="flex flex-col gap-3">
                  {col.items.map((item) => (
                    <li
                      key={item}
                      className="font-body text-[16px] text-[var(--color-text)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Security strip */}
        <ScrollReveal delay={0.2} className="mt-20 pt-10 border-t border-[var(--color-border-subtle)]">
          <p className="font-body text-[15px] leading-[1.6] text-[var(--color-text-muted)] max-w-[720px]">
            Payments are processed by our certified banking partner. Card numbers are never
            stored on our systems — handled directly by a PCI&#160;DSS Level&#160;1 gateway.
            All communication is encrypted in transit (TLS&#160;1.3) and at rest (AES&#160;256).
          </p>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
