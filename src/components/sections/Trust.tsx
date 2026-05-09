import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/atoms/Container';
import { Section } from '@/components/atoms/Section';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

/**
 * Single editorial spread on Hope for the Future.
 * Image left, prose right. No stats, no columns. Quiet anticipation.
 */
export function Trust() {
  return (
    <Section id="trust" divider>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <ScrollReveal className="lg:col-span-6">
            <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-bg-muted)]">
              <Image
                src="https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/38aeed61-0d50-4cde-a210-1c6363f4139c/HFF2.jpg?format=2000w"
                alt="Hope for the Future, school in Tanambao village"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </ScrollReveal>

          <div className="lg:col-span-6 flex flex-col justify-center max-w-[560px]">
            <ScrollReveal>
              <div className="caption">Community</div>
              <h2 className="mt-8 font-display font-light tracking-[-0.035em] text-[var(--color-text)] text-[44px] leading-[1] md:text-[64px] md:leading-[0.98] lg:text-[80px] lg:leading-[0.95] balance">
                Two percent of every stay.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <div className="mt-12 prose-editorial">
                <p>
                  Hope for the Future opened in 2014, four years before the hotel.
                  A school in Tanambao for a hundred and thirty children from four
                  villages, a small clinic on Mondays, a water programme since
                  2022. Two percent of every room booked goes to the work.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <Link
                href="/community"
                className="mt-12 group inline-flex items-center gap-2 font-body text-[15px] font-medium text-[var(--color-text)]"
              >
                Read about Hope for the Future
                <ArrowRight
                  size={18}
                  className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1.5"
                />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
