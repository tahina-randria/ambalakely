'use client';

import { SplitReveal } from '@/lib/motion/SplitReveal';
import { Kicker } from '@/components/atoms/Kicker';

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end pb-16 md:pb-24 pt-[72px]">
      {/* Placeholder: full-bleed background image/video */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[var(--color-bg-subtle)]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=2400&q=90')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-[color-mix(in_srgb,var(--color-bg)_60%,transparent)]"
      />

      <div className="mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:px-12">
        <SplitReveal
          as="h1"
          splitBy="lines"
          duration={0.88}
          staggerAmount={0.5}
          delay={0.1}
          className="font-display font-light tracking-[-0.045em] text-[#1D1B16] text-[64px] leading-[60px] md:text-[96px] md:leading-[90px] lg:text-[128px] lg:leading-[120px] max-w-[1100px] balance"
        >
          Ambalakely.
          <br />
          Ten rooms
          <br />
          in the highlands
          <br />
          of Madagascar.
        </SplitReveal>

        <div className="mt-10 md:mt-16 flex items-center gap-4">
          <Kicker>Fianarantsoa · Est. 2018</Kicker>
        </div>
      </div>
    </section>
  );
}
