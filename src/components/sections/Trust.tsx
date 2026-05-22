import Image from 'next/image';
import Link from 'next/link';
import { Section } from '@/components/atoms/Section';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

/**
 * Hope for the Future preview on homepage.
 * Full-bleed image with overlay caption + h2, link to /community.
 * No more inset image+text card — full cinematic moment.
 */
export function Trust() {
  return (
    <Section id="trust" divider bleed>
      <div className="relative h-[80vh] md:h-[100vh] w-full overflow-hidden bg-[var(--color-sand-12)]">
        <Image
          src="https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/38aeed61-0d50-4cde-a210-1c6363f4139c/HFF2.jpg?format=2500w"
          alt="Hope for the Future, school in Tanambao village"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/65"
        />

        <div className="relative h-full mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12 flex flex-col text-white">
          <div className="pt-16 md:pt-24">
            <div className="caption text-white/75">Community</div>
          </div>

          <div className="mt-auto pb-14 md:pb-20 max-w-[920px]">
            <ScrollReveal>
              <h2 className="font-display font-light tracking-[-0.03em] text-white text-[44px] leading-[1.05] md:text-[56px] md:leading-[1.02] balance">
                Two percent of every stay supports a school next door.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <p className="mt-8 text-[16px] leading-[1.6] text-white/85 max-w-[560px]">
                Hope for the Future opened in 2014. A hundred and thirty children
                from Tanambao, the quartier of Ambalakely. Ten years of the same
                Wednesday and Saturday afternoons.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <Link
                href="/community"
                className="mt-10 group inline-flex items-center gap-2 font-body text-[15px] font-medium text-white"
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
      </div>
    </Section>
  );
}
