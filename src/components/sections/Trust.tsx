import { Container } from '@/components/atoms/Container';
import { Section } from '@/components/atoms/Section';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';

const signals = [
  {
    label: 'Community',
    items: [
      'Hope for the Future',
      '130+ local children supported',
      'Education and arts since 2014',
    ],
  },
  {
    label: 'Kitchen',
    items: [
      'Tantsaha local growers',
      'Garden-to-table produce',
      'Zero-waste approach',
    ],
  },
  {
    label: 'Payments',
    items: ['Visa', 'Mastercard', 'MVola', 'Orange Money'],
  },
];

const stats = [
  { value: '10', label: 'rooms' },
  { value: '50', label: 'seats at Toko Telo' },
  { value: '2018', label: 'opened' },
  { value: '4 000', label: 'residents around' },
];

export function Trust() {
  return (
    <Section id="trust" divider>
      <Container>
        <ScrollReveal className="max-w-[680px] mb-20">
          <div className="font-mono text-[13px] uppercase tracking-[0.08em] text-[var(--color-text-muted)] mb-6">
            Engagements
          </div>
          <h2 className="font-display font-light tracking-[-0.03em] text-[var(--color-text)] text-[36px] leading-[1.1] md:text-[48px] md:leading-[1.05] balance">
            Responsible hospitality. Rooted in Ambalakely.
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

        {/* Hope for the Future strip */}
        <ScrollReveal delay={0.2} className="mt-20 pt-10 border-t border-[var(--color-border-subtle)]">
          <p className="font-body text-[15px] leading-[1.6] text-[var(--color-text-muted)] max-w-[720px]">
            <strong className="text-[var(--color-text)] font-medium">Hope for the Future</strong>{' '}
            is the hotel&rsquo;s charity, active since 2014. It supports children from the
            Tanambao neighbourhood with tutoring, arts, music and language clubs. Guests
            can visit during their stay.
          </p>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
