import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/atoms/Container';
import { Section } from '@/components/atoms/Section';
import { Heading } from '@/components/atoms/Heading';
import { Kicker } from '@/components/atoms/Kicker';
import { Text } from '@/components/atoms/Text';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

export function Dining() {
  return (
    <Section id="dining" divider>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <ScrollReveal className="lg:col-span-4">
            <Kicker number={2}>Dining</Kicker>
            <Heading variant="h2" className="mt-6">
              Toko Telo. A single menu, written every morning.
            </Heading>
            <Text variant="bodyLg" color="muted" className="mt-8 max-w-[460px]">
              Forty seats, a wine list from Fianarantsoa, and a kitchen that cooks what is in
              season that day. Nothing more.
            </Text>
            <Link
              href="/dining"
              className="mt-10 inline-flex items-center gap-2 font-body text-[15px] font-medium text-[var(--color-text)] group"
            >
              Read more
              <ArrowRight
                size={18}
                className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1"
              />
            </Link>
          </ScrollReveal>

          <ScrollReveal className="lg:col-span-8" delay={0.1}>
            <div className="relative aspect-[4/3] lg:aspect-[16/10] overflow-hidden bg-[var(--color-bg-muted)]">
              <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1800&q=90"
                alt="Toko Telo dining room"
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </Section>
  );
}
