import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/atoms/Container';
import { Section } from '@/components/atoms/Section';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

export function Story() {
  return (
    <Section id="about" divider>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <ScrollReveal className="lg:col-span-6">
            <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-bg-muted)]">
              <Image
                src="https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/5766ca0c-fb44-4459-b2a0-468c184fe728/hotel.JPG?format=2000w"
                alt="Hotel Ambalakely main building, Fianarantsoa"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </ScrollReveal>

          <div className="lg:col-span-6 flex flex-col justify-center max-w-[560px]">
            <ScrollReveal>
              <div className="caption">The house</div>
              <h2 className="mt-8 font-display font-light tracking-[-0.035em] text-[var(--color-text)] text-[44px] leading-[1] md:text-[64px] md:leading-[0.98] lg:text-[80px] lg:leading-[0.95] balance">
                Ten rooms, since 2018.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <div className="mt-12 prose-editorial">
                <p>
                  Mamy bought the hill in 2015 and planted the first trees. Hasina
                  brought back from Norway the idea of{' '}
                  <em className="text-[var(--color-text)] not-italic font-display font-light">
                    koselig
                  </em>
                  , a feeling for warmth in small daily things. The house opened in
                  October 2018. Hasina took the kitchen. Mamy kept the garden.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="mt-10 font-display font-light italic text-[var(--color-text-muted)] text-[18px] md:text-[20px] leading-[1.5] max-w-[420px]">
                &ldquo;The hotel is the family home as much as it is a place for
                guests.&rdquo; Hasina
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <Link
                href="/about"
                className="mt-12 group inline-flex items-center gap-2 font-body text-[15px] font-medium text-[var(--color-text)]"
              >
                Read about Mamy and Hasina
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
