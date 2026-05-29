'use client';

import { useEffect, useRef, useState } from 'react';
import { ImagePlaceholder } from '@/components/atoms/ImagePlaceholder';
import { cn } from '@/lib/utils/cn';

type Item = { title: string; body: string };

/**
 * §48 — "Ce qu'on fait" as a sticky split (per user direction). A left index
 * of the programs (desktop, sticky) tracks the block crossing the viewport
 * centre via IntersectionObserver — the "un thème à la fois" feel without
 * scroll-jacking. Each detail block carries an image slot (placeholder for
 * now; real per-activity photos are pending the #99 visual phase).
 */
export function CommunityPrograms({
  kicker,
  h2,
  items,
}: {
  kicker: string;
  h2: string;
  items: Item[];
}) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(Number((e.target as HTMLElement).dataset.idx));
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const num = (i: number) => String(i + 1).padStart(2, '0');

  return (
    <section className="py-32 md:py-48 lg:py-56 hair-rule bg-[var(--color-bg-subtle)]">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-12">
        <div className="caption text-center mb-4">{kicker}</div>
        <h2 className="font-display font-light text-[var(--color-text)] text-[44px] md:text-[56px] leading-[1] md:leading-[0.98] tracking-[-0.03em] balance text-center mx-auto max-w-[680px]">
          {h2}
        </h2>

        <div className="mt-20 md:mt-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Sticky index — desktop only */}
          <nav className="hidden lg:block lg:col-span-4" aria-label={kicker}>
            <ol className="sticky top-[120px]">
              {items.map((it, i) => (
                <li key={it.title}>
                  <button
                    type="button"
                    onClick={() =>
                      refs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                    }
                    aria-current={active === i ? 'true' : undefined}
                    className={cn(
                      'group flex items-baseline gap-4 py-2.5 text-left w-full transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)]',
                      active === i
                        ? 'text-[var(--color-text)]'
                        : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]',
                    )}
                  >
                    <span className="caption tabular-nums pt-1.5 shrink-0">{num(i)}</span>
                    <span className="font-display font-light text-[20px] md:text-[22px] leading-[1.15] tracking-[-0.02em]">
                      {it.title}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </nav>

          {/* Detail blocks */}
          <div className="lg:col-span-8 space-y-20 md:space-y-28">
            {items.map((it, i) => (
              <article
                key={it.title}
                data-idx={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className="scroll-mt-[120px]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-bg-muted)] mb-8">
                  <ImagePlaceholder label={it.title} />
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="caption tabular-nums text-[var(--color-text-muted)] lg:hidden">
                    {num(i)}
                  </span>
                  <h3 className="font-display font-light text-[var(--color-text)] text-[28px] md:text-[36px] leading-[1.05] tracking-[-0.025em]">
                    {it.title}
                  </h3>
                </div>
                <p className="mt-4 prose-editorial max-w-[560px]">{it.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
