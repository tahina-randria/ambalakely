import { Container } from '@/components/atoms/Container';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { BookingButton } from '@/components/atoms/BookingButton';
import { fetchHotel } from '@/sanity/lib/fetch';

export async function Book() {
  const HOTEL = await fetchHotel();
  const WA_DIGITS = HOTEL.whatsapp.replace(/[^0-9]/g, '');

  return (
    <section
      id="book"
      className="relative py-32 md:py-48 lg:py-64 hair-rule"
    >
      <Container>
        <div className="mx-auto max-w-[920px]">
          <ScrollReveal>
            <div className="caption">Réserver</div>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <h2 className="mt-8 font-display font-light text-[var(--color-text)] text-[44px] leading-[1] md:text-[56px] md:leading-[0.98] tracking-[-0.03em] balance">
              Dites-nous quand.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="mt-10 prose-editorial max-w-[520px]">
              Deux façons de nous joindre. Le formulaire pour les dates et les
              chambres. WhatsApp ou e-mail si vous préférez écrire. Nous
              répondons dans la journée.
            </p>
            <p className="mt-4 caption text-[var(--color-text-muted)]">
              Annulation gratuite jusqu&apos;à trente jours avant l&apos;arrivée.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="mt-14 flex flex-wrap items-baseline gap-x-10 gap-y-6">
              <BookingButton>Voir les disponibilités</BookingButton>
              <a
                href={`https://wa.me/${WA_DIGITS}?text=Bonjour%2C%20je%20souhaite%20r%C3%A9server%20un%20s%C3%A9jour%20%C3%A0%20Ambalakely.`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] underline-offset-4 hover:underline"
              >
                WhatsApp Hasina
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
