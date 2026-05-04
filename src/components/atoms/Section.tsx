import { cn } from '@/lib/utils/cn';
import type { HTMLAttributes } from 'react';

type SectionProps = HTMLAttributes<HTMLElement> & {
  /** Add 1px top hairline separator */
  divider?: boolean;
  /** Full-bleed hero (no vertical padding) */
  bleed?: boolean;
};

export function Section({
  divider = false,
  bleed = false,
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      className={cn(
        !bleed && 'py-24 md:py-32 lg:py-56',
        divider && 'hair-rule',
        className,
      )}
      {...rest}
    >
      {children}
    </section>
  );
}
