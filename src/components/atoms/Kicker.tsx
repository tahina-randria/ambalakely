import { cn } from '@/lib/utils/cn';
import type { HTMLAttributes } from 'react';

type KickerProps = HTMLAttributes<HTMLSpanElement> & {
  number?: string | number;
};

/**
 * Small uppercase mono label — "01 STAY", "JOURNAL", "EST. 2018".
 * Signature editorial pattern.
 */
export function Kicker({ number, children, className, ...rest }: KickerProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 font-mono uppercase text-[13px] leading-[16px] tracking-[0.08em] font-medium text-[var(--color-text)]',
        className,
      )}
      {...rest}
    >
      {number !== undefined && (
        <>
          <span className="text-[var(--color-text-muted)]">{String(number).padStart(2, '0')}</span>
          <span className="h-px w-6 bg-[var(--color-border)]" />
        </>
      )}
      {children}
    </span>
  );
}
