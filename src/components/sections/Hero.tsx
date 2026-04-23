export function Hero() {
  const lines = ['Ambalakely.', 'Ten rooms in the highlands', 'of Madagascar.'];

  return (
    <section className="relative h-screen w-full overflow-hidden text-white isolate">
      {/* Background image — subtle zoom-out via CSS keyframes */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 hero-bg-settle"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=2400&q=90')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/25 via-black/10 to-black/55"
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
          className="hero-fade-up mt-8 md:mt-12 flex items-center gap-3 font-mono uppercase text-[13px] leading-[16px] tracking-[0.08em] font-medium text-white/85"
          style={{ ['--fade-delay' as string]: '0.9s' }}
        >
          <span className="text-white/60">00</span>
          <span className="h-px w-6 bg-white/40" />
          Fianarantsoa · Est. 2018
        </div>
      </div>

      <div
        className="hero-fade-up absolute bottom-6 right-5 md:right-8 lg:right-12 font-mono text-[11px] uppercase tracking-[0.1em] text-white/70"
        style={{ ['--fade-delay' as string]: '1.2s' }}
      >
        Scroll ↓
      </div>
    </section>
  );
}
