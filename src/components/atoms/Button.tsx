import { cn } from '@/lib/utils/cn';
import Link from 'next/link';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'accent';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 font-body font-medium transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)] disabled:opacity-50 disabled:pointer-events-none rounded-none';

const variantClass: Record<Variant, string> = {
  primary:
    'bg-[var(--color-sand-12)] text-[var(--color-sand-1)] border border-[var(--color-sand-12)] hover:bg-[var(--color-sand-11)] hover:border-[var(--color-sand-11)]',
  secondary:
    'bg-transparent text-[var(--color-sand-12)] border border-[var(--color-border)] hover:border-[var(--color-sand-12)]',
  ghost:
    'bg-transparent text-[var(--color-sand-12)] border border-transparent hover:border-[var(--color-border)]',
  accent:
    'bg-[var(--color-accent)] text-[var(--color-sand-1)] border border-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] hover:border-[var(--color-accent-hover)]',
};

const sizeClass: Record<Size, string> = {
  sm: 'h-8 px-3 text-[14px] leading-none',
  md: 'h-10 px-4 text-[15px] leading-none',
  lg: 'h-12 px-6 text-[17px] leading-none',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(base, variantClass[variant], sizeClass[size], className)}
        {...rest}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = 'Button';

type LinkButtonProps = CommonProps & {
  href: string;
  external?: boolean;
};

export function LinkButton({
  variant = 'primary',
  size = 'md',
  className,
  href,
  external = false,
  children,
}: LinkButtonProps) {
  const props = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
    <Link
      href={href}
      className={cn(base, variantClass[variant], sizeClass[size], className)}
      {...props}
    >
      {children}
    </Link>
  );
}
