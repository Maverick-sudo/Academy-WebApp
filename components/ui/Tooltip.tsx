'use client'

import { useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface TooltipProps {
  children: ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export default function Tooltip({ 
  children, 
  content, 
  position = 'right',
  delay = 200 
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  let timeoutId: NodeJS.Timeout;

  const handleMouseEnter = () => {
    timeoutId = setTimeout(() => setIsVisible(true), delay);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutId);
    setIsVisible(false);
  };

  return (
    <div 
      className="relative inline-flex"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div
          className={cn(
            // Base styles
            'absolute z-50 px-2 py-1 text-xs font-medium text-white',
            'bg-slate-900 dark:bg-slate-800 rounded shadow-lg',
            'whitespace-nowrap pointer-events-none',
            
            // Position-specific styles
            {
              'bottom-full left-1/2 -translate-x-1/2 mb-2': position === 'top',
              'top-full left-1/2 -translate-x-1/2 mt-2': position === 'bottom',
              'right-full top-1/2 -translate-y-1/2 mr-2': position === 'left',
              'left-full top-1/2 -translate-y-1/2 ml-2': position === 'right',
            }
          )}
        >
          {content}
          {/* Arrow */}
          <div
            className={cn(
              'absolute w-2 h-2 bg-slate-900 dark:bg-slate-800 rotate-45',
              {
                'bottom-0 left-1/2 -translate-x-1/2 translate-y-1': position === 'top',
                'top-0 left-1/2 -translate-x-1/2 -translate-y-1': position === 'bottom',
                'right-0 top-1/2 -translate-y-1/2 translate-x-1': position === 'left',
                'left-0 top-1/2 -translate-y-1/2 -translate-x-1': position === 'right',
              }
            )}
          />
        </div>
      )}
    </div>
  );
}
