import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/atoms/Container';
import { Section } from '@/components/atoms/Section';
import { Heading } from '@/components/atoms/Heading';
import { Kicker } from '@/components/atoms/Kicker';
import { ScrollReveal, Stagger, StaggerItem } from '@/lib/motion/ScrollReveal';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

// Three categories, ten rooms total.
const categories = [
  {
    id: 'superieure',
    number: '01',
    name: 'Supérieure',
    size: '43 m²',
    capacity: '1–4 guests',
    count: '2 rooms',
    priceMga: 255000,
    priceEur: 49,
    description:
      'King size voamboana. Rice fields and village view. Option for up to two extra beds.',
    image:
      'https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/45ae0b2c-fced-45b6-8666-9212614d1e9b/hotel+ambalakely_DSC6388+%5BSUP%5D.jpg?format=1500w',
  },
  {
    id: 'confort',
    number: '02',
    name: 'Confort',
    size: '29 m²',
    capacity: '1–3 guests',
    count: '4 rooms',
    priceMga: 226000,
    priceEur: 44,
    description:
      'King voamboana and a single katrafay. Two on the ground floor with garden view, two upstairs.',
    image:
      'https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/ec5defdf-5292-4f38-8190-87b5454bbbc2/confort.jpg?format=1500w',
  },
  {
    id: 'standard',
    number: '03',
    name: 'Standard',
    size: '21 m²',
    capacity: '1–2 guests',
    count: '4 rooms',
    priceMga: 182000,
    priceEur: 35,
    description:
      'Two double katrafay and two twin voamboana, with mosquito nets. Garden view.',
    image:
      'https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/53ff20cf-dede-47c0-9d6f-4df2d9e1a8ae/standard.jpg?format=1500w',
  },
];

export function Stay() {
  return (
    <Section id="stay" divider>
      <Container>
        <ScrollReveal className="mb-16 md:mb-24">
          <Kicker number={1}>Stay</Kicker>
          <Heading variant="h2" className="mt-6 max-w-[820px]">
            Ten rooms across three categories, each with its own view.
          </Heading>
        </ScrollReveal>

        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {categories.map((room) => (
            <StaggerItem key={room.id}>
              <Link href={`/rooms/${room.id}`} className="group flex flex-col">
                <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-bg-muted)]">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[880ms] ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-[1.02]"
                  />
                </div>

                <div className="mt-6 flex items-start justify-between gap-5">
                  <div>
                    <div className="font-mono text-[13px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                      {room.number} · {room.count}
                    </div>
                    <div className="mt-2 font-display text-[28px] tracking-[-0.02em] text-[var(--color-text)]">
                      {room.name}
                    </div>
                    <div className="mt-1 text-[15px] text-[var(--color-text-muted)]">
                      {room.size} · {room.capacity}
                    </div>
                  </div>
                  <div className="text-right font-mono text-[13px] shrink-0">
                    <div className="text-[var(--color-text-muted)] text-[11px] uppercase tracking-[0.08em]">
                      From
                    </div>
                    <div className="mt-1 text-[var(--color-text)]">
                      {room.priceMga.toLocaleString('fr-FR').replace(/\s/g, '\u202F')} Ar
                    </div>
                    <div className="text-[var(--color-text-muted)] mt-0.5">
                      ≈ {room.priceEur} €
                    </div>
                  </div>
                </div>

                <p className="mt-5 text-[15px] leading-[1.55] text-[var(--color-text-muted)]">
                  {room.description}
                </p>
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
