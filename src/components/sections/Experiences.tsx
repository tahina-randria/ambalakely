import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/atoms/Container';
import { Section } from '@/components/atoms/Section';
import { Heading } from '@/components/atoms/Heading';
import { ScrollReveal, Stagger, StaggerItem } from '@/lib/motion/ScrollReveal';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { fetchExcursions } from '@/sanity/lib/fetch';

export async function Experiences() {
  const locale = await getLocale();
  const [experiences, t] = await Promise.all([
    fetchExcursions(locale),
    getTranslations('Experiences'),
  ]);
  return (
    <Section id="experiences" divider>
      <Container>
        <ScrollReveal className="mb-16 md:mb-24">
          <Heading variant="h2" className="max-w-[800px]">
            {t('h2')}
          </Heading>
        </ScrollReveal>

        <Stagger className="flex flex-col max-w-[900px]">
          {experiences.slice(0, 4).map((exp) => (
            <StaggerItem key={exp.slug}>
              <Link
                href={`/experiences#${exp.slug}`}
                className="group flex items-center justify-between py-6 md:py-8 border-b border-[var(--color-border-subtle)] last:border-b-0 hover:border-[var(--color-sand-12)] transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)]"
              >
                <div>
                  <div className="font-display text-[22px] md:text-[26px] tracking-[-0.02em] text-[var(--color-text)]">
                    {exp.name}
                  </div>
                  <div className="mt-1 text-[15px] text-[var(--color-text-muted)]">
                    {exp.tagline}
                  </div>
                </div>
                <div className="text-[15px] tabular-nums text-[var(--color-text-muted)] shrink-0">
                  {exp.duration}
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <ScrollReveal className="mt-12 md:mt-16">
          <Link
            href="/experiences"
            className="group inline-flex items-center gap-2 font-body text-[15px] font-medium text-[var(--color-text)]"
          >
            {t('viewAll')}
            <ArrowRight
              size={18}
              className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1.5"
            />
          </Link>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
