import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/atoms/Container';
import { Section } from '@/components/atoms/Section';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { formatMga } from '@/lib/utils/format';
import { fetchCategories } from '@/sanity/lib/fetch';

/**
 * Homepage "Stay" section.
 * 3 categories with a thumbnail, count, name, spec line and price.
 * Pattern : Pasaia / Casa Bonay — editorial list, image left, prose right.
 *
 * Data : Sanity (categories) with fallback to data/categories.ts.
 */
export async function Stay() {
  const locale = await getLocale();
  const [categories, t, tCommon] = await Promise.all([
    fetchCategories(locale),
    getTranslations('Stay'),
    getTranslations('Common'),
  ]);

  return (
    <Section id="stay" divider>
      <Container>
        <div className="mx-auto max-w-[1100px]">
          {/* Editorial intro — single editorial line, no kicker. */}
          <ScrollReveal>
            <p className="font-display font-light text-[var(--color-text)] text-[28px] md:text-[40px] leading-[1.2] tracking-[-0.025em] balance max-w-[680px]">
              {t('intro')}
            </p>
          </ScrollReveal>

          {/* Category list — thumbnail + text + price */}
          <ul className="mt-20 md:mt-28 border-t border-[var(--color-border-subtle)]">
            {categories.map((cat) => (
              <ScrollReveal key={cat.slug}>
                <li className="border-b border-[var(--color-border-subtle)]">
                  <Link
                    href={`/rooms/${cat.slug}`}
                    className="group block py-8 md:py-12 grid grid-cols-12 gap-5 md:gap-8 items-center"
                  >
                    {/* Thumbnail */}
                    <div className="col-span-12 md:col-span-3">
                      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-bg-muted)]">
                        <Image
                          src={cat.heroImage}
                          alt={`Chambre ${cat.name}`}
                          fill
                          sizes="(min-width: 768px) 25vw, 100vw"
                          className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-[1.04]"
                        />
                      </div>
                    </div>

                    {/* Name + spec — no count caption (redundant with viewAll link). */}
                    <div className="col-span-12 md:col-span-5">
                      <h3 className="font-display font-light text-[var(--color-text)] text-[32px] md:text-[44px] leading-[1] tracking-[-0.03em] group-hover:translate-x-1.5 transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)]">
                        {cat.name}
                      </h3>
                      <p className="mt-3 text-[14px] md:text-[15px] leading-[1.55] text-[var(--color-text-muted)] max-w-[420px]">
                        {cat.size}, {cat.bedSetup.split('.')[0]}.
                      </p>
                    </div>

                    {/* Price — Aman pattern : one inline figure, no “from / br”.
                        Per-row ArrowRight removed : the section-level
                        "Voir les dix chambres" CTA carries the affordance, and
                        the h3 already group-hover:translates as a click hint. */}
                    <div className="col-span-12 md:col-span-4 text-left md:text-right font-display font-light text-[var(--color-text)] text-[18px] md:text-[22px] tracking-[-0.02em] tabular-nums">
                      {/* §47 — number and unit share the same (light) weight ;
                          only the unit is de-emphasised (muted), not bolded. */}
                      <span>{formatMga(cat.priceMga)}</span>{' '}
                      <span className="text-[var(--color-text-muted)]">{tCommon('ariary')}</span>
                    </div>
                  </Link>
                </li>
              </ScrollReveal>
            ))}
          </ul>

          <ScrollReveal>
            <div className="mt-12 md:mt-16">
              <Link
                href="/rooms"
                className="group inline-flex items-center gap-3 font-body text-[15px] font-medium text-[var(--color-text)]"
              >
                {t('viewAll')}
                <ArrowRight
                  size={18}
                  className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1.5"
                />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </Section>
  );
}
