import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error = false, fullWidth = false, disabled, ...props }, ref) => {
    return (
      <input
        ref={ref}
        disabled={disabled}
        className={cn(
          // Base styles
          'px-3 py-2 text-base rounded-lg transition-colors duration-200',
          'bg-white dark:bg-slate-900',
          'border border-slate-300 dark:border-slate-700',
          'text-slate-900 dark:text-slate-100',
          'placeholder:text-slate-400 dark:placeholder:text-slate-500',
          
          // Focus state
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
          
          // Hover state
          'hover:border-slate-400 dark:hover:border-slate-600',
          
          // Error state
          error && 'border-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500',
          
          // Disabled state
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-50 dark:disabled:bg-slate-800',
          
          // Full width option
          fullWidth && 'w-full',
          
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
