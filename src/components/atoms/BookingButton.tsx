'use client';

import { cn } from '@/lib/utils/cn';
import type { ReactNode } from 'react';

type Variant = 'solid-dark' | 'solid-light' | 'outline';

const variantClass: Record<Variant, string> = {
  'solid-dark':
    'text-[var(--color-sand-1)] bg-[var(--color-sand-12)] hover:bg-[var(--color-sand-11)]',
  'solid-light':
    'text-[var(--color-sand-12)] bg-white hover:bg-[var(--color-sand-3)]',
  outline:
    'text-[var(--color-text)] border border-[var(--color-text)] hover:bg-[var(--color-text)] hover:text-[var(--color-sand-1)]',
};

export function BookingButton({
  children,
  variant = 'solid-dark',
  className,
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const open = () => window.dispatchEvent(new Event('open-booking'));
  return (
    <button
      type="button"
      onClick={open}
      className={cn(
        'inline-flex items-center justify-center h-12 px-7 text-[15px] font-medium transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)]',
        variantClass[variant],
        className,
      )}
    >
      {children}
    </button>
  );
}
