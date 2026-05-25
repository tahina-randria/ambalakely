import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/atoms/Container';
import { Section } from '@/components/atoms/Section';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { PHOTOS } from '@/lib/data/photos';

/**
 * Dining — home section, static editorial spread.
 *
 * Previous version used GSAP ScrollTrigger to pin a 220 vh section while
 * a frame animated from full-bleed to inset and text faded in from the
 * right.  Audit verdict : animation unreadable on mobile (text column
 * collapsed to ~76 px at 375 px viewport because positioning was
 * `left:74vw right:6vw`), cramped on desktop, conveyed nothing.
 *
 * Now : two-column spread inside Container, image left 7/12, text right
 * 5/12, stacks on mobile.  Server-rendered, no JS, no GSAP bundle hit.
 * Mirrors Stay / Reviews / Story rhythm.
 */
export async function Dining() {
  const t = await getTranslations('Dining');
  const tonight = (t.raw('dishes') as string[]) ?? [];
  return (
    <Section id="dining" divider>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Image — left on desktop, top on mobile */}
          <ScrollReveal className="lg:col-span-7 relative aspect-[4/5] lg:aspect-[5/4] bg-[var(--color-bg-muted)] overflow-hidden">
            <Image
              src={PHOTOS.diningSection.path}
              alt={t('imageAlt')}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
            />
          </ScrollReveal>

          {/* Text — right on desktop, below on mobile */}
          <div className="lg:col-span-5 flex flex-col">
            <ScrollReveal>
              <h2 className="font-display font-light tracking-[-0.03em] text-[var(--color-text)] text-[44px] leading-[1] md:text-[56px] md:leading-[0.98]">
                {t('name')}
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <p className="mt-6 prose-editorial max-w-[440px]">
                {t('intro')}
              </p>
            </ScrollReveal>

            {/* "Ce soir" + dishes — kept as a small editorial block ;
                no longer italic (typography reset) and no longer
                animated. */}
            <ScrollReveal delay={0.1}>
              <div className="mt-10 pt-6 border-t border-[var(--color-border-subtle)]">
                <div className="font-medium text-[13px] tracking-[0] text-[var(--color-text-muted)] mb-4">
                  {t('tonightLabel')}
                </div>
                <ul className="flex flex-col gap-2">
                  {tonight.map((dish) => (
                    <li
                      key={dish}
                      className="font-display text-[17px] tracking-[-0.01em] text-[var(--color-text)] leading-[1.35]"
                    >
                      {dish}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <Link
                href="/dining"
                className="mt-10 group inline-flex items-center gap-2 font-body text-[15px] font-medium text-[var(--color-text)] self-start"
              >
                {t('readMore')}
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
