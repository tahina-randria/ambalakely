'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { useConsent } from '@/lib/consent';

/**
 * Sticky bottom bar on mobile only. Always-visible "Réserver" CTA
 * — the standard hôtel mobile pattern (Aman, Six Senses, Belmond).
 *
 * Hidden while the cookie banner is up to avoid the two bars stacking.
 */
export function MobileBookingBar() {
  const { hasChosen } = useConsent();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !hasChosen) return null;

  const open = () => window.dispatchEvent(new Event('open-booking'));

  return (
    <div className="md:hidden fixed inset-x-0 bottom-0 z-40 bg-[var(--color-sand-12)] text-[var(--color-sand-1)] border-t border-[var(--color-sand-10)] safe-area-inset-bottom">
      <button
        type="button"
        onClick={open}
        className="group flex w-full items-center justify-center gap-2 h-14 font-body text-[15px] font-medium tracking-[-0.005em]"
      >
        Réserver
        <ArrowRight
          size={16}
          weight="regular"
          className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-1"
        />
      </button>
    </div>
  );
}
