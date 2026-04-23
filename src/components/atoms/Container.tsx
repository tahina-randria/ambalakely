import { cn } from '@/lib/utils/cn';
import type { HTMLAttributes } from 'react';

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  size?: 'prose' | 'md' | 'lg' | 'xl' | '2xl';
};

const sizeMap = {
  prose: 'max-w-[680px]',
  md: 'max-w-[768px]',
  lg: 'max-w-[1024px]',
  xl: 'max-w-[1280px]',
  '2xl': 'max-w-[1440px]',
};

export function Container({
  size = '2xl',
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-5 md:px-8 lg:px-12',
        sizeMap[size],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
