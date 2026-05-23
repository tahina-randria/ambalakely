import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/atoms/Container';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { BookingButton } from '@/components/atoms/BookingButton';
import { fetchHotel } from '@/sanity/lib/fetch';

export async function Book() {
  const [HOTEL, t, tCommon] = await Promise.all([
    fetchHotel(),
    getTranslations('Book'),
    getTranslations('Common'),
  ]);
  const WA_DIGITS = HOTEL.whatsapp.replace(/[^0-9]/g, '');
  const whatsappLink = `https://wa.me/${WA_DIGITS}?text=${encodeURIComponent(
    t('whatsappMessage'),
  )}`;

  return (
    <section
      id="book"
      className="relative py-32 md:py-48 lg:py-64 hair-rule"
    >
      <Container>
        <div className="mx-auto max-w-[920px]">
          <ScrollReveal>
            <div className="caption">{t('kicker')}</div>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <h2 className="mt-8 font-display font-light text-[var(--color-text)] text-[44px] leading-[1] md:text-[56px] md:leading-[0.98] tracking-[-0.03em] balance">
              {t('h2')}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="mt-10 prose-editorial max-w-[520px]">
              {t('body')}
            </p>
            <p className="mt-4 caption text-[var(--color-text-muted)]">
              {t('freeCancellation')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="mt-14 flex flex-wrap items-baseline gap-x-10 gap-y-6">
              <BookingButton>{tCommon('checkAvailability')}</BookingButton>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] underline-offset-4 hover:underline"
              >
                {t('whatsappLabel')}
              </a>
              <a
                href={`mailto:${HOTEL.email}`}
                className="text-[15px] underline-offset-4 hover:underline"
              >
                {HOTEL.email}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
