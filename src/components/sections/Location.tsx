import Link from 'next/link';
import { Container } from '@/components/atoms/Container';
import { Section } from '@/components/atoms/Section';
import { Kicker } from '@/components/atoms/Kicker';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { MapboxMap } from '@/components/molecules/MapboxMap';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';

const distances = [
  { label: 'Antananarivo', sub: 'Capital · Ivato airport', meta: '8 h' },
  { label: 'Antsirabe', sub: 'Thermal town', meta: '4 h' },
  { label: 'Ranomafana', sub: 'National park', meta: '1 h 20' },
  { label: 'Isalo', sub: 'Massif', meta: '5 h' },
];

export function Location() {
  return (
    <Section id="location" divider>
      <Container>
        <ScrollReveal className="mb-16 md:mb-24">
          <Kicker>Location</Kicker>
          <div className="mt-6 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h2 className="font-display font-light tracking-[-0.03em] text-[var(--color-text)] text-[44px] leading-[1.05] md:text-[56px] md:leading-[1.02] max-w-[760px] balance">
              On the Route Nationale 7, halfway between the capital and the south.
            </h2>
            <Link
              href="https://www.google.com/maps/place/Fianarantsoa,+Madagascar/@-21.4541,47.0862,12z"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 font-body text-[15px] font-medium text-[var(--color-text)] shrink-0"
            >
              Open in Google Maps
              <ArrowUpRight
                size={18}
                className="transition-[color,transform] duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Mapbox interactive map */}
            <div className="lg:col-span-8 relative aspect-[4/3] md:aspect-[16/10] lg:aspect-[5/4] bg-[var(--color-bg-subtle)] border border-[var(--color-border-subtle)] overflow-hidden">
              <MapboxMap />

              {/* Coordinate label overlay */}
              <div className="absolute top-4 left-4 z-10 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-muted)] bg-[color-mix(in_srgb,var(--color-bg)_85%,transparent)] backdrop-blur-[6px] px-2.5 py-1.5">
                21°27′15″S · 47°05′10″E
              </div>
            </div>

            {/* Distance list */}
            <div className="lg:col-span-4 flex flex-col">
              <div className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--color-text-muted)] mb-6">
                From Ambalakely
              </div>
              <ul className="border-t border-[var(--color-border-subtle)]">
                {distances.map((d) => (
                  <li
                    key={d.label}
                    className="flex items-baseline justify-between gap-4 py-5 border-b border-[var(--color-border-subtle)]"
                  >
                    <div>
                      <div className="font-display text-[18px] tracking-[-0.01em] text-[var(--color-text)]">
                        {d.label}
                      </div>
                      <div className="mt-0.5 text-[13px] text-[var(--color-text-muted)]">
                        {d.sub}
                      </div>
                    </div>
                    <div className="font-mono text-[13px] tabular-nums text-[var(--color-text)] shrink-0">
                      {d.meta}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>

        {/* How to get there */}
        <ScrollReveal delay={0.1} className="mt-20 md:mt-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            <div>
              <div className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--color-text-muted)] mb-3">
                By road from Antananarivo
              </div>
              <div className="font-display text-[22px] tracking-[-0.02em] text-[var(--color-text)]">
                8 hours
              </div>
              <p className="mt-3 text-[15px] leading-[1.55] text-[var(--color-text-muted)]">
                Private transfer along the RN7. We arrange it from your arrival at
                Ivato International.
              </p>
            </div>
            <div>
              <div className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--color-text-muted)] mb-3">
                From Fianarantsoa centre
              </div>
              <div className="font-display text-[22px] tracking-[-0.02em] text-[var(--color-text)]">
                20 minutes
              </div>
              <p className="mt-3 text-[15px] leading-[1.55] text-[var(--color-text-muted)]">
                Twelve kilometres north on a quiet road. The hotel sits on the
                hill above the village.
              </p>
            </div>
            <div>
              <div className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--color-text-muted)] mb-3">
                By air
              </div>
              <div className="font-display text-[22px] tracking-[-0.02em] text-[var(--color-text)]">
                TNR to WFI · 1 h 10
              </div>
              <p className="mt-3 text-[15px] leading-[1.55] text-[var(--color-text-muted)]">
                Domestic flights to Fianarantsoa airport from Antananarivo, then
                25&#160;min by car.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
