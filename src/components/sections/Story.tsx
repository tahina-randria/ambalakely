import Image from 'next/image';
import Link from 'next/link';
import { Section } from '@/components/atoms/Section';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { PHOTOS } from '@/lib/data/photos';

export function Story() {
  return (
    <Section id="about" divider bleed>
      {/* Full-bleed editorial spread — image + asymmetric prose overlay */}
      <div className="relative">
        {/* Image side, takes left/full width */}
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:min-h-[100vh]">
          <ScrollReveal className="lg:col-span-7 relative aspect-[4/5] lg:aspect-auto bg-[var(--color-bg-muted)] overflow-hidden">
            <Image
              src={PHOTOS.story.path}
              alt="Hotel Ambalakely main building, Fianarantsoa"
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
              priority
            />
          </ScrollReveal>

          <div className="lg:col-span-5 px-5 md:px-12 lg:px-16 xl:px-24 py-20 md:py-32 lg:py-0 flex flex-col justify-center bg-[var(--color-bg)]">
            <ScrollReveal>
              <h2 className="font-display font-light tracking-[-0.03em] text-[var(--color-text)] text-[44px] leading-[1] md:text-[56px] md:leading-[0.98] balance">
                Ten rooms, since 2018.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <div className="mt-12 prose-editorial max-w-[440px]">
                <p>
                  Mamy bought the hill in 2015 and planted the first trees. Hasina
                  brought back from Norway the idea of{' '}
                  <em className="text-[var(--color-text)] not-italic font-display font-light">
                    koselig
                  </em>
                  , a feeling for warmth in small daily things. The house opened
                  in October 2018. Hasina runs the menu and the welcome. Mamy
                  keeps the garden.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <blockquote className="mt-12 font-display font-light italic text-[var(--color-text)] text-[20px] md:text-[22px] leading-[1.45] tracking-[-0.005em] max-w-[420px]">
                &ldquo;The hotel is the family home as much as it is a place
                for guests.&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-4">
                <div className="w-10 border-t border-[var(--color-sand-12)]" />
                <div className="font-display text-[16px] tracking-[-0.005em] text-[var(--color-text)]">
                  Hasina
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <Link
                href="/about"
                className="mt-12 group inline-flex items-center gap-2 font-body text-[15px] font-medium text-[var(--color-text)] self-start"
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
      </div>
    </Section>
  );
}
