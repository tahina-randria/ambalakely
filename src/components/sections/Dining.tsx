import Image from 'next/image';
import Link from 'next/link';
import { FullBleedToSide } from '@/lib/motion/FullBleedToSide';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

const tonight = [
  'Rougets, crème d’ail noir',
  'Zébu, feuilles de manioc, riz rouge',
  'Glace citron, du jardin',
];

export function Dining() {
  return (
    <section id="dining">
      <FullBleedToSide
        infoSide="right"
        dwellVh={80}
        image={
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=2400&q=90"
            alt="Toko Telo dining room"
            fill
            sizes="100vw"
            className="object-cover"
            priority={false}
          />
        }
        info={
          <div>
            <div className="font-mono uppercase text-[12px] tracking-[0.1em] text-white/70 mb-6">
              <span className="text-white/50">02</span>
              <span className="mx-3">·</span>
              Dining
            </div>

            <h2 className="font-display font-light tracking-[-0.03em] text-white text-[36px] leading-[1.05] md:text-[44px] md:leading-[1.05]">
              Toko Telo.<br />
              A single menu,<br />
              written every morning.
            </h2>

            <p className="mt-8 text-[17px] leading-[1.55] text-white/80 max-w-[400px]">
              Forty seats. What the garden gives, what the market brought, what the chef
              felt like cooking. Nothing more.
            </p>

            <div className="mt-8 pt-6 border-t border-white/20">
              <div className="font-mono text-[12px] uppercase tracking-[0.1em] text-white/60">
                This evening
              </div>
              <ul className="mt-4 flex flex-col gap-2.5">
                {tonight.map((dish) => (
                  <li
                    key={dish}
                    className="font-display text-[18px] tracking-[-0.01em] text-white italic"
                  >
                    {dish}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/dining"
              className="mt-8 inline-flex items-center gap-2 font-body text-[15px] font-medium text-white group"
            >
              Read more
              <ArrowRight
                size={18}
                className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1"
              />
            </Link>
          </div>
        }
      />
    </section>
  );
}
