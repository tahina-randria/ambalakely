import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/atoms/Container';
import { Section } from '@/components/atoms/Section';
import { Heading } from '@/components/atoms/Heading';
import { Kicker } from '@/components/atoms/Kicker';
import { ScrollReveal, Stagger, StaggerItem } from '@/lib/motion/ScrollReveal';
import { rooms } from '@/lib/data/rooms';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

export function Stay() {
  return (
    <Section id="stay" divider>
      <Container>
        <ScrollReveal className="mb-16 md:mb-24">
          <Kicker number={1}>Stay</Kicker>
          <Heading variant="h2" className="mt-6 max-w-[720px]">
            Ten rooms, each with its own view of the valley.
          </Heading>
        </ScrollReveal>

        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {rooms.slice(0, 6).map((room) => (
            <StaggerItem key={room.id}>
              <Link
                href={`/rooms/${room.id}`}
                className="group flex flex-col"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-bg-muted)]">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[880ms] ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-[1.02]"
                  />
                </div>

                <div className="mt-5 flex items-start justify-between">
                  <div>
                    <div className="font-mono text-[13px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                      {room.number} · {room.size}
                    </div>
                    <div className="mt-2 font-display text-[24px] tracking-[-0.02em] text-[var(--color-text)]">
                      {room.name}
                    </div>
                    <div className="mt-1 text-[15px] text-[var(--color-text-muted)]">
                      {room.capacity}
                    </div>
                  </div>
                  <div className="text-right font-mono text-[13px]">
                    <div className="text-[var(--color-text)]">
                      {room.priceMga.toLocaleString('fr-FR').replace(/\s/g, '\u202F')} MGA
                    </div>
                    <div className="text-[var(--color-text-muted)] mt-1">
                      ≈ {room.priceEur} €
                    </div>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <ScrollReveal className="mt-20">
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 font-body text-[15px] font-medium text-[var(--color-text)] group"
          >
            All ten rooms
            <ArrowRight
              size={18}
              className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1"
            />
          </Link>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
