import Link from 'next/link';
import { ArrowDown } from '@phosphor-icons/react/dist/ssr';

export function Hero() {
  const lines = ['Ambalakely.', 'Ten rooms in the highlands', 'of Madagascar.'];

  return (
    <section className="relative h-screen w-full overflow-hidden text-white isolate">
      {/* Background image — real hotel exterior */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 hero-bg-settle"
        style={{
          backgroundImage:
            "url('https://images.squarespace-cdn.com/content/v1/66084a14104f6977dd1e877d/e322c91a-f718-4508-8658-bcfe02d2e0f3/exterieur.jpg?format=2500w')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/25 via-black/10 to-black/60"
      />

      <div className="relative h-full w-full mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12 flex flex-col justify-end pb-14 md:pb-20">
        <h1 className="font-display font-light tracking-[-0.035em] text-white text-[44px] leading-[1.05] md:text-[64px] md:leading-[1.02] lg:text-[80px] lg:leading-[1.02] max-w-[900px]">
          {lines.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <span
                className="block hero-line-reveal"
                style={{ ['--line-delay' as string]: `${0.15 + i * 0.09}s` }}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div
          className="hero-fade-up mt-10 md:mt-14"
          style={{ ['--fade-delay' as string]: '0.95s' }}
        >
          <Link
            href="#book"
            className="group inline-flex items-center gap-2 h-12 px-7 bg-white text-[var(--color-sand-12)] font-body text-[15px] font-medium transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:bg-[var(--color-sand-3)]"
          >
            Check availability
            <ArrowDown
              size={16}
              className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-y-0.5"
            />
          </Link>
        </div>
      </div>

      <div
        className="hero-fade-up absolute bottom-8 right-5 md:right-8 lg:right-12 text-white/70 text-[20px] leading-none"
        style={{ ['--fade-delay' as string]: '1.2s' }}
        aria-hidden="true"
      >
        ↓
      </div>
    </section>
  );
}
