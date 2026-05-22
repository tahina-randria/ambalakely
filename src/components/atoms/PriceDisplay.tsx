import { cn } from '@/lib/utils/cn';
import { formatMga } from '@/lib/utils/format';

type Size = 'sm' | 'md' | 'lg' | 'hero';

/**
 * Typographic price display.
 *
 * - sm: inline (cards, listings)
 * - md: spec rows
 * - lg: hero block / CTA accent
 * - hero: massive display in CTAs
 */
export function PriceDisplay({
  mga,
  eur,
  size = 'md',
  variant = 'light',
  className,
  showSuffix = true,
}: {
  mga: number;
  eur: number;
  size?: Size;
  variant?: 'light' | 'dark';
  className?: string;
  showSuffix?: boolean;
}) {
  const sizes = {
    sm: {
      kicker: 'text-[10px]',
      mga: 'text-[18px] md:text-[20px]',
      eur: 'text-[12px]',
    },
    md: {
      kicker: 'text-[11px]',
      mga: 'text-[24px] md:text-[28px]',
      eur: 'text-[13px]',
    },
    lg: {
      kicker: 'text-[11px]',
      mga: 'text-[44px] md:text-[56px]',
      eur: 'text-[14px]',
    },
    hero: {
      kicker: 'text-[12px]',
      mga: 'text-[44px] md:text-[56px]',
      eur: 'text-[16px]',
    },
  } as const;

  const s = sizes[size];
  const muted =
    variant === 'dark' ? 'text-[var(--color-sand-6)]' : 'text-[var(--color-text-muted)]';
  const main =
    variant === 'dark' ? 'text-[var(--color-sand-1)]' : 'text-[var(--color-text)]';

  return (
    <div className={cn('flex flex-col', className)}>
      <div
        className={cn(
          'font-mono uppercase tracking-[0.12em]',
          s.kicker,
          muted,
        )}
      >
        From
      </div>
      <div
        className={cn(
          'mt-2 font-display font-light tracking-[-0.025em] tabular-nums leading-[1]',
          s.mga,
          main,
        )}
      >
        {formatMga(mga)}
        <span className={cn('ml-2 font-light tracking-[-0.01em]', muted)}>Ariary</span>
      </div>
      {showSuffix ? (
        <div className={cn('mt-2 font-mono uppercase tracking-[0.1em]', s.eur, muted)}>
          Per night
        </div>
      ) : null}
    </div>
  );
}
