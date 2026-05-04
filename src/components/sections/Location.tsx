'use client';

import Link from 'next/link';
import { Container } from '@/components/atoms/Container';
import { Section } from '@/components/atoms/Section';
import { Kicker } from '@/components/atoms/Kicker';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';

/**
 * Cartographic SVG map of Madagascar with the RN7 spine and key points.
 * Hand-drawn editorial style. No API key needed.
 */

// Madagascar simplified outline (approximate, for editorial purposes)
const MADAGASCAR_PATH =
  'M 270 30 C 290 35 305 50 312 75 C 318 100 320 130 318 160 C 320 195 322 230 316 270 C 312 310 305 350 295 390 C 285 430 275 470 260 510 C 245 550 230 590 210 625 C 195 655 175 680 155 700 C 140 715 125 720 110 712 C 95 700 90 680 95 658 C 102 630 115 600 130 570 C 145 540 158 510 168 478 C 178 446 185 412 188 378 C 190 344 188 308 185 274 C 180 240 175 206 170 174 C 168 145 170 116 180 92 C 195 65 215 45 240 35 C 252 30 262 28 270 30 Z';

// RN7 path: from Tana to the South via Fianarantsoa
const RN7_PATH = 'M 245 105 L 240 165 L 230 220 L 215 280 L 195 360 L 175 440';

// Key points along the spine (x, y in viewBox coordinates)
const POINTS = [
  { id: 'tana', label: 'Antananarivo', sub: 'Capital · Ivato airport', x: 245, y: 105, meta: '8 h to Ambalakely' },
  { id: 'antsirabe', label: 'Antsirabe', sub: 'Thermal town', x: 240, y: 165, meta: '4 h' },
  { id: 'ambalakely', label: 'Ambalakely', sub: 'Fianarantsoa', x: 215, y: 280, meta: '', primary: true },
  { id: 'ranomafana', label: 'Ranomafana', sub: 'National park', x: 248, y: 295, meta: '1 h 20' },
  { id: 'isalo', label: 'Isalo', sub: 'Massif', x: 175, y: 440, meta: '5 h' },
] as const;

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

        {/* Cartographic map */}
        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Map */}
            <div className="lg:col-span-8 relative aspect-[3/4] md:aspect-[4/3] lg:aspect-[3/4] bg-[var(--color-bg-subtle)] border border-[var(--color-border-subtle)] overflow-hidden">
              <svg
                viewBox="0 0 400 800"
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  {/* Subtle topo texture */}
                  <pattern
                    id="topo-lines"
                    x="0"
                    y="0"
                    width="14"
                    height="14"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M0 7 Q 3.5 4, 7 7 T 14 7"
                      stroke="var(--color-sand-7)"
                      strokeWidth="0.4"
                      fill="none"
                      opacity="0.35"
                    />
                  </pattern>
                </defs>

                {/* Madagascar landmass */}
                <path
                  d={MADAGASCAR_PATH}
                  fill="url(#topo-lines)"
                  stroke="var(--color-sand-9)"
                  strokeWidth="0.6"
                  opacity="0.9"
                />
                <path
                  d={MADAGASCAR_PATH}
                  fill="var(--color-sand-3)"
                  fillOpacity="0.5"
                  stroke="var(--color-sand-12)"
                  strokeWidth="0.8"
                />

                {/* RN7 spine */}
                <path
                  d={RN7_PATH}
                  stroke="var(--color-sand-12)"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  fill="none"
                />

                {/* Compass label */}
                <g transform="translate(330, 80)" className="font-mono">
                  <line
                    x1="0"
                    y1="-12"
                    x2="0"
                    y2="12"
                    stroke="var(--color-sand-9)"
                    strokeWidth="0.5"
                  />
                  <text
                    x="0"
                    y="-18"
                    textAnchor="middle"
                    fontSize="9"
                    fill="var(--color-sand-9)"
                    letterSpacing="1"
                  >
                    N
                  </text>
                </g>

                {/* Indian Ocean label */}
                <text
                  x="370"
                  y="380"
                  fontSize="9"
                  fill="var(--color-sand-9)"
                  letterSpacing="2"
                  className="font-mono uppercase"
                >
                  INDIAN OCEAN
                </text>

                {/* Mozambique Channel label */}
                <text
                  x="35"
                  y="380"
                  fontSize="9"
                  fill="var(--color-sand-9)"
                  letterSpacing="2"
                  className="font-mono uppercase"
                >
                  MOZAMBIQUE
                </text>
                <text
                  x="35"
                  y="395"
                  fontSize="9"
                  fill="var(--color-sand-9)"
                  letterSpacing="2"
                  className="font-mono uppercase"
                >
                  CHANNEL
                </text>

                {/* Points */}
                {POINTS.map((p) => (
                  <g key={p.id} transform={`translate(${p.x}, ${p.y})`}>
                    {p.primary ? (
                      <>
                        {/* Pulse ring */}
                        <circle
                          r="14"
                          fill="none"
                          stroke="var(--color-sand-12)"
                          strokeWidth="0.5"
                          opacity="0.4"
                        >
                          <animate
                            attributeName="r"
                            values="6;18;6"
                            dur="3s"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="opacity"
                            values="0.6;0;0.6"
                            dur="3s"
                            repeatCount="indefinite"
                          />
                        </circle>
                        <circle r="4" fill="var(--color-sand-12)" />
                      </>
                    ) : (
                      <circle r="2.5" fill="var(--color-sand-9)" />
                    )}
                    <text
                      x={p.id === 'isalo' ? -8 : 10}
                      y={p.id === 'isalo' ? 4 : 4}
                      fontSize={p.primary ? '11' : '9'}
                      fill={p.primary ? 'var(--color-sand-12)' : 'var(--color-sand-11)'}
                      className={p.primary ? 'font-display' : 'font-mono uppercase'}
                      letterSpacing={p.primary ? '0' : '1'}
                      textAnchor={p.id === 'isalo' ? 'end' : 'start'}
                      fontWeight={p.primary ? 400 : 400}
                    >
                      {p.label}
                    </text>
                  </g>
                ))}
              </svg>

              {/* GPS coordinate */}
              <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-muted)]">
                21°27′15″S · 47°05′10″E
              </div>
              <div className="absolute top-4 right-4 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-muted)]">
                Madagascar · scale 1:5M
              </div>
            </div>

            {/* Distance list */}
            <div className="lg:col-span-4 flex flex-col justify-end">
              <div className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--color-text-muted)] mb-6">
                From Ambalakely
              </div>
              <ul className="border-t border-[var(--color-border-subtle)]">
                {POINTS.filter((p) => !p.primary).map((p) => (
                  <li
                    key={p.id}
                    className="flex items-baseline justify-between gap-4 py-4 border-b border-[var(--color-border-subtle)]"
                  >
                    <div>
                      <div className="font-display text-[18px] tracking-[-0.01em] text-[var(--color-text)]">
                        {p.label}
                      </div>
                      <div className="mt-0.5 text-[13px] text-[var(--color-text-muted)]">
                        {p.sub}
                      </div>
                    </div>
                    <div className="font-mono text-[13px] tabular-nums text-[var(--color-text)] shrink-0">
                      {p.meta}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>

        {/* How to get there */}
        <ScrollReveal delay={0.15} className="mt-20 md:mt-24">
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
                Ten kilometres south on a quiet road. The hotel sits on the hill
                above the village.
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
