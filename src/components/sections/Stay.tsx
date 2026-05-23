import Link from 'next/link';
import { Container } from '@/components/atoms/Container';
import { Section } from '@/components/atoms/Section';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { formatMga } from '@/lib/utils/format';

const categories = [
  {
    id: 'superieure',
    name: 'Supérieure',
    count: 'Deux chambres',
    spec: '43 m², lit king en palissandre, vue sur les rizières',
    priceMga: 255000,
  },
  {
    id: 'confort',
    name: 'Confort',
    count: 'Quatre chambres',
    spec: '29 m², king et lit simple, jardin ou étage',
    priceMga: 226000,
  },
  {
    id: 'standard',
    name: 'Standard',
    count: 'Quatre chambres',
    spec: '21 m², double ou twin, vue sur le jardin',
    priceMga: 182000,
  },
];

export function Stay() {
  return (
    <Section id="stay" divider>
      <Container>
        <div className="mx-auto max-w-[920px]">
          {/* Editorial intro */}
          <ScrollReveal>
            <div className="caption mb-8">Les chambres</div>
            <p className="font-display font-light text-[var(--color-text)] text-[28px] md:text-[40px] leading-[1.2] tracking-[-0.025em] balance max-w-[680px]">
              Mêmes murs sable, mêmes parquets en bois sombre, mêmes
              bouillottes au soir. La différence : la taille, la vue, le lit.
            </p>
          </ScrollReveal>

          {/* Inline category links — aligned to same column, hairline rule above */}
          <ul className="mt-20 md:mt-28 border-t border-[var(--color-border-subtle)]">
            {categories.map((cat) => (
              <ScrollReveal key={cat.id}>
                <li className="border-b border-[var(--color-border-subtle)]">
                  <Link
                    href={`/rooms/${cat.id}`}
                    className="group block py-10 md:py-14 grid grid-cols-12 gap-6 items-baseline"
                  >
                    <div className="col-span-12 md:col-span-7">
                      <div className="caption text-[var(--color-text-muted)] mb-3">
                        {cat.count}
                      </div>
                      <h3 className="font-display font-light text-[var(--color-text)] text-[36px] md:text-[48px] leading-[1] tracking-[-0.03em] group-hover:translate-x-2 transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)]">
                        {cat.name}
                      </h3>
                      <p className="mt-4 text-[15px] leading-[1.55] text-[var(--color-text-muted)] max-w-[480px]">
                        {cat.spec}
                      </p>
                    </div>
                    <div className="col-span-8 md:col-span-4 text-left md:text-right font-display font-light text-[var(--color-text)] text-[20px] md:text-[24px] tracking-[-0.02em] tabular-nums">
                      À partir de {formatMga(cat.priceMga)} Ariary
                    </div>
                    <div className="col-span-4 md:col-span-1 md:flex md:justify-end">
                      <ArrowRight
                        size={22}
                        className="text-[var(--color-text-muted)] transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-2 group-hover:text-[var(--color-text)]"
                      />
                    </div>
                  </Link>
                </li>
              </ScrollReveal>
            ))}
          </ul>

          <ScrollReveal>
            <div className="mt-12 md:mt-16">
              <Link
                href="/rooms"
                className="group inline-flex items-center gap-3 font-body text-[15px] font-medium text-[var(--color-text)]"
              >
                Voir les dix chambres
                <ArrowRight
                  size={18}
                  className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1.5"
                />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </Section>
  );
}
