import { cn } from '@/lib/utils/cn';
import type { HTMLAttributes, ElementType } from 'react';

type Variant = 'displayXl' | 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

const variantClass: Record<Variant, string> = {
  displayXl:
    'font-display font-light tracking-[-0.045em] text-[64px] leading-[60px] md:text-[96px] md:leading-[90px] lg:text-[128px] lg:leading-[120px]',
  display:
    'font-display font-light tracking-[-0.04em] text-[56px] leading-[58px] md:text-[80px] md:leading-[80px] lg:text-[96px] lg:leading-[96px]',
  h1: 'font-display font-normal tracking-[-0.03em] text-[40px] leading-[44px] md:text-[52px] md:leading-[56px] lg:text-[60px] lg:leading-[62px]',
  h2: 'font-display font-normal tracking-[-0.03em] text-[32px] leading-[36px] md:text-[38px] md:leading-[42px] lg:text-[44px] lg:leading-[48px]',
  h3: 'font-display font-medium tracking-[-0.02em] text-[24px] leading-[30px] md:text-[28px] md:leading-[34px] lg:text-[32px] lg:leading-[38px]',
  h4: 'font-display font-medium tracking-[-0.02em] text-[20px] leading-[26px] md:text-[22px] md:leading-[28px] lg:text-[24px] lg:leading-[30px]',
  h5: 'font-display font-medium tracking-[-0.01em] text-[18px] leading-[24px] md:text-[20px] md:leading-[26px]',
};

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  variant?: Variant;
  as?: ElementType;
};

export function Heading({
  variant = 'h2',
  as,
  className,
  children,
  ...rest
}: HeadingProps) {
  const Component = (as ||
    (variant === 'displayXl' || variant === 'display' ? 'h1' : variant)) as ElementType;

  return (
    <Component className={cn(variantClass[variant], 'balance', className)} {...rest}>
      {children}
    </Component>
  );
}
