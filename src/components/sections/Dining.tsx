import Image from 'next/image';
import Link from 'next/link';
import { FullBleedToSide } from '@/lib/motion/FullBleedToSide';
import { Kicker } from '@/components/atoms/Kicker';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

const tonight = [
  'Rougets, crème d’ail noir',
  'Zébu, feuilles de manioc, riz rouge',
  'Glace citron, du jardin',
];

export function Dining() {
  return (
    <section id="dining" aria-label="Dining">
      <FullBleedToSide
        infoSide="right"
        imageWidth={62}
        imageHeight={86}
        edgePadding={5}
        endRadius={32}
        scrollDistance={280}
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
          <div className="max-w-[420px]">
            <Kicker number={2}>Dining</Kicker>

            <h2 className="mt-6 font-display font-light tracking-[-0.03em] text-[var(--color-text)] text-[36px] leading-[1.05] md:text-[44px] md:leading-[1.05]">
              Toko Telo.<br />
              A single menu,<br />
              written every morning.
            </h2>

            <p className="mt-8 text-[17px] leading-[1.55] text-[var(--color-text-muted)]">
              Forty seats. What the garden gives, what the market brought, what the chef
              felt like cooking. Nothing more.
            </p>

            {/* Tonight's menu preview — proves the "written every morning" claim */}
            <div className="mt-10 pt-6 border-t border-[var(--color-border-subtle)]">
              <div className="font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                This evening
              </div>
              <ul className="mt-4 flex flex-col gap-2.5">
                {tonight.map((dish) => (
                  <li
                    key={dish}
                    className="font-display text-[18px] tracking-[-0.01em] text-[var(--color-text)] italic"
                  >
                    {dish}
                  </li>
                ))}
              </ul>
              <div className="mt-4 font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                Full menu shared on arrival
              </div>
            </div>

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
