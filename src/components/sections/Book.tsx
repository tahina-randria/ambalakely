import { Container } from '@/components/atoms/Container';
import { Kicker } from '@/components/atoms/Kicker';
import { ScrollReveal } from '@/lib/motion/ScrollReveal';
import { WhatsappLogo, Envelope, ArrowRight } from '@phosphor-icons/react/dist/ssr';

export function Book() {
  return (
    <section
      id="book"
      className="relative bg-[var(--color-sand-12)] text-[var(--color-sand-1)] py-24 md:py-32 lg:py-48"
    >
      <Container size="lg">
        <ScrollReveal>
          <div className="font-mono uppercase text-[13px] tracking-[0.08em] text-[var(--color-sand-6)] mb-6">
            <span className="text-[var(--color-sand-8)]">07</span>
            <span className="mx-3">·</span>
            Book
          </div>
          <h2 className="font-display font-light tracking-[-0.03em] text-[44px] leading-[1.05] md:text-[60px] md:leading-[1.05] max-w-[900px] balance">
            We keep a room for you, through September 2026.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.05} className="mt-14">
          <form className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[820px]">
            <label className="flex flex-col gap-2">
              <span className="font-mono text-[13px] uppercase tracking-[0.08em] text-[var(--color-sand-6)]">
                Arrival
              </span>
              <input type="date" className="input-dark" />
            </label>
            <label className="flex flex-col gap-2">
              <span className="font-mono text-[13px] uppercase tracking-[0.08em] text-[var(--color-sand-6)]">
                Departure
              </span>
              <input type="date" className="input-dark" />
            </label>
            <label className="flex flex-col gap-2">
              <span className="font-mono text-[13px] uppercase tracking-[0.08em] text-[var(--color-sand-6)]">
                Guests
              </span>
              <select defaultValue="2" className="input-dark">
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'guest' : 'guests'}
                  </option>
                ))}
              </select>
            </label>
          </form>

          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <button
              type="button"
              className="group inline-flex items-center gap-3 h-12 px-7 bg-[var(--color-sand-1)] text-[var(--color-sand-12)] font-body text-[15px] font-medium transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:bg-[var(--color-sand-3)]"
            >
              Check availability
              <ArrowRight
                size={18}
                className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1"
              />
            </button>
            <span className="text-[15px] text-[var(--color-sand-7)]">
              Free cancellation up to 30 days before arrival.
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-20 pt-12 border-t border-[var(--color-sand-10)]">
          <div className="font-mono uppercase text-[12px] tracking-[0.08em] text-[var(--color-sand-7)] mb-6">
            Or write directly
          </div>
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-10">
            <a
              href="https://wa.me/261000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-[var(--color-sand-1)] hover:text-[var(--color-sand-5)] transition-colors duration-[var(--duration-base)]"
            >
              <WhatsappLogo size={20} />
              <span className="font-body text-[17px]">WhatsApp +261 · · ·</span>
            </a>
            <a
              href="mailto:hello@hotelambalakely.com"
              className="inline-flex items-center gap-3 text-[var(--color-sand-1)] hover:text-[var(--color-sand-5)] transition-colors duration-[var(--duration-base)]"
            >
              <Envelope size={20} />
              <span className="font-body text-[17px]">hello@hotelambalakely.com</span>
            </a>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
