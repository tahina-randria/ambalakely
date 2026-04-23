'use client';

import Link from 'next/link';
import { Container } from '@/components/atoms/Container';
import { Section } from '@/components/atoms/Section';
import { Kicker } from '@/components/atoms/Kicker';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';

const mapSrc =
  'https://maps.locationiq.com/v3/staticmap?key=pk.2f0c9b3bc0a5d5e4f1b5b8e3f5e4d1a1&center=-21.454,47.086&zoom=10&size=2000x1100&markers=icon:large-red-cutout|-21.454,47.086&style=klokantech-basic';

const POINTS = [
  {
    label: 'Ambalakely',
    sub: 'Fianarantsoa · Highlands',
    meta: 'GPS -21.4541, 47.0862',
    // Position on the map image, %
    top: '50%',
    left: '48%',
    accent: true,
  },
  { label: 'Antananarivo', sub: 'Ivato International', meta: '8h · 410 km', top: '12%', left: '46%' },
  { label: 'Ranomafana', sub: 'National Park', meta: '1h20 · 65 km', top: '60%', left: '65%' },
  { label: 'Isalo', sub: 'Massif', meta: '5h · 310 km', top: '78%', left: '28%' },
  { label: 'Antsirabe', sub: 'Thermal town', meta: '4h · 240 km', top: '28%', left: '44%' },
];

export function Location() {
  return (
    <Section id="location" divider>
      <Container>
        <ScrollReveal className="mb-16 md:mb-24">
          <Kicker number={5}>Location</Kicker>
          <div className="mt-6 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h2 className="font-display font-light tracking-[-0.03em] text-[var(--color-text)] text-[36px] leading-[1.05] md:text-[56px] md:leading-[1.05] max-w-[700px] balance">
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

        <ScrollReveal delay={0.1}>
          <div className="relative w-full aspect-[16/10] md:aspect-[2/1] border border-[var(--color-border-subtle)] bg-[var(--color-sand-2)] overflow-hidden">
            {/* Abstract topo pattern background — no external map key required */}
            <svg
              aria-hidden="true"
              viewBox="0 0 1200 700"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <pattern id="topo" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path
                    d="M0 30 Q 15 20 30 30 T 60 30"
                    stroke="var(--color-sand-6)"
                    strokeWidth="0.8"
                    fill="none"
                    opacity="0.7"
                  />
                </pattern>
                <pattern id="topoDense" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path
                    d="M0 20 Q 10 13 20 20 T 40 20"
                    stroke="var(--color-sand-7)"
                    strokeWidth="0.6"
                    fill="none"
                    opacity="0.5"
                  />
                </pattern>
              </defs>
              <rect width="1200" height="700" fill="url(#topo)" />
              <circle cx="580" cy="350" r="240" fill="url(#topoDense)" opacity="0.5" />
              <circle cx="580" cy="350" r="160" fill="var(--color-sand-3)" opacity="0.3" />
              <circle cx="580" cy="350" r="80" fill="var(--color-sand-4)" opacity="0.3" />
            </svg>

            {/* Cross-hair overlay */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(to right, var(--color-border-subtle) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border-subtle) 1px, transparent 1px)',
                backgroundSize: '10% 10%',
                opacity: 0.25,
              }}
            />

            {/* Points */}
            {POINTS.map((p) => (
              <div
                key={p.label}
                className="absolute"
                style={{ top: p.top, left: p.left, transform: 'translate(-50%, -50%)' }}
              >
                {p.accent ? (
                  <div className="relative flex flex-col items-center">
                    {/* Pulse ring */}
                    <div className="absolute h-10 w-10 rounded-full border border-[var(--color-sand-12)] animate-[pulse_2s_ease-in-out_infinite]" />
                    <div className="h-3 w-3 rounded-full bg-[var(--color-sand-12)]" />
                    <div className="mt-3 whitespace-nowrap text-center">
                      <div className="font-display text-[18px] tracking-[-0.02em] text-[var(--color-text)]">
                        {p.label}
                      </div>
                      <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                        {p.sub}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-sand-9)]" />
                    <div className="mt-2 whitespace-nowrap text-center">
                      <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-text)]">
                        {p.label}
                      </div>
                      <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                        {p.meta}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* How to get there */}
        <ScrollReveal delay={0.15} className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            <div>
              <div className="font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--color-text-muted)] mb-3">
                From Antananarivo
              </div>
              <div className="font-display text-[22px] tracking-[-0.02em] text-[var(--color-text)]">
                8 hours by road
              </div>
              <p className="mt-3 text-[15px] leading-[1.55] text-[var(--color-text-muted)]">
                Private transfer by road via the RN7. We can arrange it from your arrival at
                Ivato International.
              </p>
            </div>
            <div>
              <div className="font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--color-text-muted)] mb-3">
                From Fianarantsoa
              </div>
              <div className="font-display text-[22px] tracking-[-0.02em] text-[var(--color-text)]">
                20 minutes
              </div>
              <p className="mt-3 text-[15px] leading-[1.55] text-[var(--color-text-muted)]">
                Ambalakely sits in the hills just south of the city. A short drive on a quiet
                road.
              </p>
            </div>
            <div>
              <div className="font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--color-text-muted)] mb-3">
                By air
              </div>
              <div className="font-display text-[22px] tracking-[-0.02em] text-[var(--color-text)]">
                TNR → WFI · 1h10
              </div>
              <p className="mt-3 text-[15px] leading-[1.55] text-[var(--color-text-muted)]">
                Domestic flights to Fianarantsoa airport from Antananarivo, then 25&#160;min by
                car to the hotel.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
