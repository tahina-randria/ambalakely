import Image from 'next/image';
import Link from 'next/link';
import { FullBleedToSide } from '@/lib/motion/FullBleedToSide';
import { Kicker } from '@/components/atoms/Kicker';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

export function Dining() {
  return (
    <section id="dining" aria-label="Dining">
      <FullBleedToSide
        infoSide="right"
        imageWidth={46}
        imageHeight={78}
        edgePadding={4}
        endRadius={32}
        scrollDistance={150}
        image={
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=2400&q=90"
            alt="Toko Telo dining room"
            fill
            sizes="100vw"
            className="object-cover"
          />
        }
        info={
          <div className="max-w-[440px]">
            <Kicker number={2}>Dining</Kicker>

            <h2 className="mt-6 font-display font-light tracking-[-0.03em] text-[var(--color-text)] text-[36px] leading-[1.05] md:text-[48px] md:leading-[1.05]">
              Toko Telo.<br />
              A single menu,<br />
              written every morning.
            </h2>

            <p className="mt-8 text-[17px] leading-[1.55] text-[var(--color-text-muted)]">
              Forty seats, a wine list from Fianarantsoa, and a kitchen that cooks what is in
              season that day. Nothing more.
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-5 font-mono text-[13px] uppercase tracking-[0.08em]">
              <div className="flex flex-col gap-1.5">
                <dt className="text-[var(--color-text-muted)]">Seats</dt>
                <dd className="text-[var(--color-text)]">40</dd>
              </div>
              <div className="flex flex-col gap-1.5">
                <dt className="text-[var(--color-text-muted)]">Hours</dt>
                <dd className="text-[var(--color-text)]">19:00 — 22:00</dd>
              </div>
              <div className="flex flex-col gap-1.5">
                <dt className="text-[var(--color-text-muted)]">Format</dt>
                <dd className="text-[var(--color-text)]">Menu du jour</dd>
              </div>
              <div className="flex flex-col gap-1.5">
                <dt className="text-[var(--color-text-muted)]">Wine</dt>
                <dd className="text-[var(--color-text)]">Fianarantsoa</dd>
              </div>
            </dl>

            <Link
              href="/dining"
              className="mt-10 inline-flex items-center gap-2 font-body text-[15px] font-medium text-[var(--color-text)] group"
            >
              Read more
              <ArrowRight
                size={18}
                className="transition-[color,transform] duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1"
              />
            </Link>
          </div>
        }
      />
    </section>
  );
}
