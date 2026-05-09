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
            <div
              className="relative aspect-[4/5] overflow-hidden bg-[var(--color-bg-muted)]"
              style={{
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
              }}
            >
              <Image
                src="https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/38aeed61-0d50-4cde-a210-1c6363f4139c/HFF2.jpg?format=1500w"
                alt="Hope for the Future"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </ScrollReveal>

          <div className="lg:col-span-6 flex flex-col justify-center">
            <ScrollReveal>
              <div className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--color-text-muted)] mb-6">
                Hope for the Future
              </div>

              <h2 className="font-display font-light tracking-[-0.03em] text-[var(--color-text)] text-[44px] leading-[1.05] md:text-[56px] md:leading-[1.02] max-w-[640px] balance">
                Since 2014, Hope for the Future has run a school for the village.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <p className="mt-10 text-[18px] leading-[1.6] text-[var(--color-text-muted)] max-w-[520px]">
                A hundred and thirty children from Tanambao come every week. Tutoring,
                arts, music, language clubs. Guests can visit during their stay.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <Link
                href="/community"
                className="mt-12 inline-flex items-center gap-2 font-body text-[15px] font-medium text-[var(--color-text)] group"
              >
                Read about Hope for the Future
                <ArrowRight
                  size={18}
                  className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1"
                />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
