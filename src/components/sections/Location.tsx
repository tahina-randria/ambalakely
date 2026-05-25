import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/atoms/Container';
import { Section } from '@/components/atoms/Section';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { MapboxMap } from '@/components/molecules/MapboxMap';

export async function Location() {
  const t = await getTranslations('Location');

  const distances = [
    { label: t('antananarivo'), sub: t('antananarivoSub'), meta: '8 h' },
    { label: t('antsirabe'),    sub: t('antsirabeSub'),    meta: '4 h' },
    { label: t('ranomafana'),   sub: t('ranomafanaSub'),   meta: '1 h 20' },
    { label: t('isalo'),        sub: t('isaloSub'),        meta: '5 h' },
  ];
  return (
    <Section id="location" divider>
      <Container>
        <ScrollReveal className="mb-16 md:mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h2 className="font-display font-light tracking-[-0.03em] text-[var(--color-text)] text-[44px] leading-[1.05] md:text-[56px] md:leading-[1.02] max-w-[760px] balance">
              {t('h2')}
            </h2>
            <a
              href="https://www.google.com/maps/place/Fianarantsoa,+Madagascar/@-21.4541,47.0862,12z"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 font-body text-[15px] font-medium text-[var(--color-text)] shrink-0"
            >
              {t('openInMaps')}
              <ArrowUpRight
                size={18}
                className="transition-[color,transform] duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Mapbox interactive map */}
            <div className="lg:col-span-8 relative aspect-[4/3] md:aspect-[16/10] lg:aspect-[5/4] bg-[var(--color-bg-subtle)] border border-[var(--color-border-subtle)] overflow-hidden">
              <MapboxMap />
              {/* Coordinate label overlay removed — pure decoration that
                  duplicated what the pin on the map already shows. */}
            </div>

            {/* Distance list — pure table editorial : label left, drive time
                right. Icons removed (decorative noise — the place names
                identify themselves). Meta converted from mono to Satoshi
                tabular-nums for consistency with the rest of the page. */}
            <div className="lg:col-span-4 flex flex-col">
              <div className="font-display italic font-light text-[15px] tracking-[0] text-[var(--color-text-muted)] mb-6">
                {t('fromAmbalakely')}
              </div>
              <ul className="border-t border-[var(--color-border-subtle)]">
                {distances.map((d) => (
                  <li
                    key={d.label}
                    className="flex items-baseline justify-between gap-4 py-5 border-b border-[var(--color-border-subtle)]"
                  >
                    <div className="min-w-0">
                      <div className="font-display text-[20px] tracking-[-0.01em] text-[var(--color-text)]">
                        {d.label}
                      </div>
                      {/* Restored — a first-time Madagascar traveller
                          doesn't know that Isalo = sandstone massif or
                          Ranomafana = rainforest national park. The sub
                          text earns its place. */}
                      <div className="mt-1 text-[15px] text-[var(--color-text-muted)] truncate">
                        {d.sub}
                      </div>
                    </div>
                    <div className="text-[16px] tabular-nums text-[var(--color-text)] shrink-0">
                      {d.meta}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>

        {/* How to get there */}
        {/* Bottom 3-cards (by road / from centre / by air) removed —
            the distances table above already says it more concisely.
            i18n keys byRoad/fromCentre/byAir kept in messages for /plan-your-trip. */}
      </Container>
    </Section>
  );
}
