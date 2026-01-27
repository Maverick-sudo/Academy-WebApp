import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'outline';
  size?: 'sm' | 'md';
  children: ReactNode;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'sm', children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center font-medium rounded-md',
          
          // Variant styles
          {
            // Default - subtle gray
            'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300':
              variant === 'default',
            
            // Primary - blue accent
            'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400':
              variant === 'primary',
            
            // Success - green
            'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400':
              variant === 'success',
            
            // Warning - amber
            'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400':
              variant === 'warning',
            
            // Danger - red
            'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400':
              variant === 'danger',
            
            // Outline - bordered
            'border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300':
              variant === 'outline',
          },
          
          // Size variants
          {
            'px-2 py-0.5 text-xs': size === 'sm',
            'px-2.5 py-1 text-sm': size === 'md',
          },
          
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
