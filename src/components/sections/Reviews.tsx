import { Container } from '@/components/atoms/Container';
import { Section } from '@/components/atoms/Section';
import { Heading } from '@/components/atoms/Heading';
import { Kicker } from '@/components/atoms/Kicker';
import { ScrollReveal, Stagger, StaggerItem } from '@/lib/motion/ScrollReveal';
import { Star } from '@phosphor-icons/react/dist/ssr';

const reviews = [
  {
    quote:
      'We had planned two nights and ended up staying five. It is the only honest way to describe Ambalakely.',
    author: 'Kjell & Birgit',
    city: 'Oslo',
    date: 'April 2025',
    source: 'Google',
  },
  {
    quote:
      'The garden, the rooms, the food. Hasina and her team treat every detail like it matters. Because it does.',
    author: 'Bernt R.',
    city: 'Stavanger',
    date: 'October 2024',
    source: 'TripAdvisor',
  },
  {
    quote:
      'A quiet, deliberate place on the Route Nationale 7. We will come back. And we will stay longer.',
    author: 'Marion F.',
    city: 'Lyon',
    date: 'September 2024',
    source: 'Booking',
  },
  {
    quote:
      'One of the few hotels in Madagascar where the Wi-Fi is fast, the linen is right, and nothing feels staged.',
    author: 'Thomas K.',
    city: 'Munich',
    date: 'August 2024',
    source: 'Google',
  },
];

export function Reviews() {
  return (
    <Section id="reviews" divider>
      <Container>
        <ScrollReveal className="mb-16 md:mb-24">
          <Kicker number={4}>Guests</Kicker>
          <div className="mt-6 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <Heading variant="h2" className="max-w-[800px]">
              The people who stay here, and stay longer.
            </Heading>

            <div className="flex items-center gap-4 shrink-0">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    weight="fill"
                    className="text-[var(--color-sand-12)]"
                  />
                ))}
              </div>
              <div className="font-mono text-[13px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                4.9 · 127 reviews
              </div>
            </div>
          </div>
        </ScrollReveal>

        <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14">
          {reviews.map((r, i) => (
            <StaggerItem key={i}>
              <figure className="flex flex-col h-full">
                <blockquote className="font-display font-light tracking-[-0.02em] text-[var(--color-text)] text-[24px] leading-[1.3] md:text-[28px] md:leading-[1.3] balance">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 pt-6 border-t border-[var(--color-border-subtle)] flex items-baseline justify-between gap-6">
                  <div>
                    <div className="font-body text-[15px] font-medium text-[var(--color-text)]">
                      {r.author}
                    </div>
                    <div className="mt-1 font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                      {r.city} · {r.date}
                    </div>
                  </div>
                  <div className="font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--color-text-muted)] shrink-0">
                    {r.source}
                  </div>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
