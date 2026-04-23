import { cn } from '@/lib/utils/cn';
import type { HTMLAttributes, ElementType } from 'react';

type Variant = 'label' | 'meta' | 'body' | 'bodyLg' | 'lead';
type Color = 'text' | 'muted' | 'subdued' | 'accent';

const variantClass: Record<Variant, string> = {
  label:
    'font-mono uppercase text-[13px] leading-[16px] tracking-[0.08em] font-medium',
  meta: 'font-mono text-[14px] leading-[20px] font-normal',
  body: 'font-body text-[17px] leading-[26px] font-normal',
  bodyLg:
    'font-body text-[18px] leading-[28px] tracking-[-0.01em] font-normal md:text-[19px] md:leading-[30px]',
  lead: 'font-body text-[20px] leading-[28px] tracking-[-0.01em] font-normal md:text-[22px] md:leading-[32px]',
};

const colorClass: Record<Color, string> = {
  text: 'text-[var(--color-text)]',
  muted: 'text-[var(--color-text-muted)]',
  subdued: 'text-[var(--color-text-subdued)]',
  accent: 'text-[var(--color-accent)]',
};

type TextProps = HTMLAttributes<HTMLElement> & {
  variant?: Variant;
  color?: Color;
  as?: ElementType;
};

export function Text({
  variant = 'body',
  color = 'text',
  as: Component = 'p',
  className,
  children,
  ...rest
}: TextProps) {
  return (
    <Component
      className={cn(variantClass[variant], colorClass[color], 'pretty', className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
