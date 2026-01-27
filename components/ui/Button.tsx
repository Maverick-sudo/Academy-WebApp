import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth = false, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center font-medium transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          
          // Variant styles
          {
            // Primary - solid blue background
            'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400':
              variant === 'primary',
            
            // Secondary - outlined
            'border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 hover:border-blue-600 dark:hover:border-blue-500':
              variant === 'secondary',
            
            // Ghost - transparent with hover
            'bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800':
              variant === 'ghost',
            
            // Danger - red for destructive actions
            'bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400':
              variant === 'danger',
          },
          
          // Size variants
          {
            'px-3 py-1.5 text-sm rounded-md': size === 'sm',
            'px-4 py-2 text-base rounded-lg': size === 'md',
            'px-6 py-3 text-lg rounded-lg': size === 'lg',
          },
          
          // Full width option
          fullWidth && 'w-full',
          
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export default Button;
