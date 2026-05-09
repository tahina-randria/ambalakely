import Image from 'next/image';
import Link from 'next/link';
import { Section } from '@/components/atoms/Section';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

const categories = [
  {
    id: 'superieure',
    name: 'Supérieure',
    count: 'Two rooms',
    spec: '43 m², king voamboana, rice field view',
    priceMga: 255000,
  },
  {
    id: 'confort',
    name: 'Confort',
    count: 'Four rooms',
    spec: '29 m², king and single, garden or upstairs',
    priceMga: 226000,
  },
  {
    id: 'standard',
    name: 'Standard',
    count: 'Four rooms',
    spec: '21 m², double or twin, garden view',
    priceMga: 182000,
  },
];

const fmt = (n: number) => n.toLocaleString('fr-FR').replace(/\s/g, ' ');

export function Stay() {
  return (
    <Section id="stay" divider bleed className="relative">
      {/* Full-bleed atmospheric image */}
      <div className="relative h-[80vh] md:h-[100vh] w-full overflow-hidden bg-[var(--color-sand-12)]">
        <Image
          src="https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg?format=2500w"
          alt="Supérieure room interior at Hotel Ambalakely with rice field view"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/55"
        />
        <div className="relative h-full mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12 flex flex-col text-white">
          <div className="pt-16 md:pt-24">
            <div className="caption text-white/75">Stay</div>
          </div>
          <div className="mt-auto pb-14 md:pb-20">
            <h2 className="font-display font-light tracking-[-0.04em] text-white text-[56px] leading-[0.95] md:text-[112px] md:leading-[0.92] lg:text-[160px] lg:leading-[0.9]">
              Ten rooms.
            </h2>
          </div>
        </div>
      </div>

      {/* Editorial single-column intro */}
      <div className="py-32 md:py-48 lg:py-56">
        <div className="mx-auto max-w-[700px] px-5 md:px-8">
          <ScrollReveal>
            <p className="font-display font-light text-[var(--color-text)] text-[28px] md:text-[40px] leading-[1.2] tracking-[-0.025em] balance">
              Same sand walls, same dark wood floors, same hot water bottles
              at night. The difference is space, view and bed.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Inline category links — no cards, no images, just typography */}
      <div className="hair-rule pb-32 md:pb-48 lg:pb-56">
        <div className="mx-auto max-w-[920px] px-5 md:px-8">
          <ul>
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
                      <h3 className="font-display font-light text-[var(--color-text)] text-[40px] md:text-[64px] lg:text-[80px] leading-[0.98] tracking-[-0.035em] group-hover:translate-x-2 transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)]">
                        {cat.name}
                      </h3>
                      <p className="mt-4 text-[15px] leading-[1.55] text-[var(--color-text-muted)] max-w-[480px]">
                        {cat.spec}
                      </p>
                    </div>
                    <div className="col-span-8 md:col-span-4 text-left md:text-right font-display font-light text-[var(--color-text)] text-[24px] md:text-[28px] tracking-[-0.02em] tabular-nums">
                      From {fmt(cat.priceMga)} Ar
                    </div>
                    <div className="col-span-4 md:col-span-1 md:flex md:justify-end">
                      <ArrowRight
                        size={24}
                        className="text-[var(--color-text-muted)] transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-2 group-hover:text-[var(--color-text)]"
                      />
                    </div>
                  </Link>
                </li>
              </ScrollReveal>
            ))}
          </ul>

          <ScrollReveal>
            <div className="mt-16 md:mt-20">
              <Link
                href="/rooms"
                className="group inline-flex items-center gap-3 font-display font-light text-[var(--color-text)] text-[28px] md:text-[36px] tracking-[-0.025em] leading-[1.05]"
              >
                Read about all ten rooms
                <ArrowRight
                  size={24}
                  className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-2"
                />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </Section>
  );
}
