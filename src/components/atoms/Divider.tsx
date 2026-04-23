import { cn } from '@/lib/utils/cn';

type DividerProps = {
  variant?: 'subtle' | 'strong';
  orientation?: 'horizontal' | 'vertical';
  className?: string;
};

export function Divider({
  variant = 'subtle',
  orientation = 'horizontal',
  className,
}: DividerProps) {
  return (
    <hr
      aria-hidden="true"
      className={cn(
        'border-0',
        orientation === 'horizontal'
          ? 'w-full h-px'
          : 'h-full w-px inline-block',
        variant === 'subtle'
          ? 'bg-[var(--color-border-subtle)]'
          : 'bg-[var(--color-sand-12)]',
        className,
      )}
    />
  );
}
