import { Container } from '@/components/atoms/Container';
import { Section } from '@/components/atoms/Section';
import { Heading } from '@/components/atoms/Heading';
import { Kicker } from '@/components/atoms/Kicker';
import { Text } from '@/components/atoms/Text';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { LinkButton } from '@/components/atoms/Button';
import { WhatsappLogo, Envelope } from '@phosphor-icons/react/dist/ssr';

export function Book() {
  return (
    <Section id="book" divider>
      <Container size="lg">
        <ScrollReveal className="mb-16">
          <Kicker number={5}>Book</Kicker>
          <Heading variant="h1" className="mt-6">
            We keep a room for you, through September 2026.
          </Heading>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <form className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-[720px]">
            <label className="flex flex-col gap-2">
              <span className="font-mono text-[13px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                Arrival
              </span>
              <input
                type="date"
                className="h-12 px-4 bg-transparent border border-[var(--color-border)] focus:border-[var(--color-sand-12)] focus:outline-none text-[17px] text-[var(--color-text)] font-body rounded-none transition-colors duration-[var(--duration-base)]"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="font-mono text-[13px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                Departure
              </span>
              <input
                type="date"
                className="h-12 px-4 bg-transparent border border-[var(--color-border)] focus:border-[var(--color-sand-12)] focus:outline-none text-[17px] text-[var(--color-text)] font-body rounded-none transition-colors duration-[var(--duration-base)]"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="font-mono text-[13px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                Guests
              </span>
              <select
                defaultValue="2"
                className="h-12 px-4 bg-transparent border border-[var(--color-border)] focus:border-[var(--color-sand-12)] focus:outline-none text-[17px] text-[var(--color-text)] font-body rounded-none transition-colors duration-[var(--duration-base)]"
              >
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'guest' : 'guests'}
                  </option>
                ))}
              </select>
            </label>
          </form>

          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <LinkButton href="/book" variant="primary" size="lg">
              Check availability
            </LinkButton>
            <Text variant="body" color="muted" className="sm:ml-2">
              Free cancellation up to 30 days before arrival.
            </Text>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2} className="mt-20 pt-12 border-t border-[var(--color-border-subtle)]">
          <Text variant="label" color="muted" className="uppercase" as="span">
            Or write directly
          </Text>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:gap-8">
            <a
              href="https://wa.me/261000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors duration-[var(--duration-base)]"
            >
              <WhatsappLogo size={20} />
              <span className="font-body text-[17px]">WhatsApp +261 · · ·</span>
            </a>
            <a
              href="mailto:hello@hotelambalakely.com"
              className="inline-flex items-center gap-3 text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors duration-[var(--duration-base)]"
            >
              <Envelope size={20} />
              <span className="font-body text-[17px]">hello@hotelambalakely.com</span>
            </a>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
