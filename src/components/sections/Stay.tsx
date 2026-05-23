import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
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
  const [categories, t, tCommon] = await Promise.all([
    fetchCategories(),
    getTranslations('Stay'),
    getTranslations('Common'),
  ]);

  return (
    <Section id="stay" divider>
      <Container>
        <div className="mx-auto max-w-[1100px]">
          {/* Editorial intro */}
          <ScrollReveal>
            <div className="caption mb-8">{t('kicker')}</div>
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

                    {/* Caption + name + spec */}
                    <div className="col-span-12 md:col-span-5">
                      <div className="caption text-[var(--color-text-muted)] mb-3">
                        {cat.count}
                      </div>
                      <h3 className="font-display font-light text-[var(--color-text)] text-[32px] md:text-[44px] leading-[1] tracking-[-0.03em] group-hover:translate-x-1.5 transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)]">
                        {cat.name}
                      </h3>
                      <p className="mt-3 text-[14px] md:text-[15px] leading-[1.55] text-[var(--color-text-muted)] max-w-[420px]">
                        {cat.size}, {cat.bedSetup.split('.')[0]}.
                      </p>
                    </div>

                    {/* Price + arrow */}
                    <div className="col-span-8 md:col-span-3 text-left md:text-right font-display font-light text-[var(--color-text)] text-[18px] md:text-[22px] tracking-[-0.02em] tabular-nums">
                      {tCommon('from')}
                      <br className="hidden md:block" />{' '}
                      <span className="font-medium">
                        {formatMga(cat.priceMga)}
                      </span>{' '}
                      {tCommon('ariary')}
                    </div>
                    <div className="col-span-4 md:col-span-1 md:flex md:justify-end">
                      <ArrowRight
                        size={22}
                        className="text-[var(--color-text-muted)] transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-2 group-hover:text-[var(--color-text)]"
                      />
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
