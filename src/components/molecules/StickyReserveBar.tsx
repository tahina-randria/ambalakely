'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { cn } from '@/lib/utils/cn';

type Props = {
  name: string;
  priceMga: number;
};

const fmt = (n: number) => n.toLocaleString('fr-FR').replace(/\s/g, ' ');

/**
 * Premium sticky reserve bar — appears after scrolling past hero.
 * Slim top bar with category name + price + CTA.
 *
 * Pattern : appears at scrollY > window.innerHeight (past hero), hides at top.
 * Slides down from -100% with cubic-bezier ease.
 */
export function StickyReserveBar({ name, priceMga }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after passing hero (one viewport height)
      setVisible(window.scrollY > window.innerHeight * 0.95);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const open = () => window.dispatchEvent(new Event('open-booking'));

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        'fixed top-0 left-0 right-0 z-[100] transition-transform duration-[var(--duration-slow)] ease-[var(--ease-standard)]',
        visible ? 'translate-y-[72px]' : '-translate-y-full',
      )}
    >
      <div className="bg-[var(--color-sand-12)] text-[var(--color-sand-1)] border-b border-[var(--color-sand-10)]">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12 h-12 flex items-center justify-between gap-6">
          <div className="flex items-baseline gap-4 md:gap-6 min-w-0">
            <span className="font-display font-light text-[15px] md:text-[17px] tracking-[-0.005em] truncate">
              {name}
            </span>
            <span className="hidden md:inline-block w-1 h-1 rounded-full bg-[var(--color-sand-7)] shrink-0" />
            <span className="font-mono uppercase tracking-[0.1em] text-[11px] text-[var(--color-sand-6)] hidden md:inline-block">
              From
            </span>
            <span className="font-display font-light text-[14px] md:text-[16px] tabular-nums shrink-0">
              {fmt(priceMga)} Ar
            </span>
          </div>
          <button
            type="button"
            onClick={open}
            className="group inline-flex items-center gap-2 text-[13px] md:text-[14px] font-medium shrink-0 hover:text-[var(--color-sand-5)] transition-colors duration-[var(--duration-fast)]"
          >
            Reserve
            <ArrowRight
              size={14}
              className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
