import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
  children: ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'bordered', padding = 'md', interactive = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          'rounded-lg transition-colors duration-200',
          
          // Variant styles
          {
            // Default - flat with background
            'bg-[var(--card)]': variant === 'default',
            
            // Bordered - with border (most common)
            'border border-[var(--border)] bg-[var(--card)]':
              variant === 'bordered',
            
            // Elevated - with subtle shadow
            'bg-[var(--card)] shadow-sm': variant === 'elevated',
          },
          
          // Interactive hover state
          interactive && 'cursor-pointer hover:border-blue-600 dark:hover:border-blue-500',
          
          // Padding variants
          {
            'p-0': padding === 'none',
            'p-4': padding === 'sm',
            'p-6': padding === 'md',
            'p-8': padding === 'lg',
          },
          
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
