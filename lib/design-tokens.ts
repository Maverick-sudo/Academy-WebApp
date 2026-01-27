/**
 * Academy Design System - Design Tokens
 * 
 * Centralized design tokens for consistent theming across the application.
 * All components should reference these tokens instead of arbitrary Tailwind values.
 */

/**
 * Color Palette - GitLab-Inspired
 * Dark mode uses blue-tinted slate values for improved readability
 */
export const colors = {
  // Primary accent (blue) - for interactive elements, links, CTAs
  primary: {
    light: 'blue-600',
    DEFAULT: 'blue-600',
    dark: 'blue-500',
    hover: {
      light: 'blue-700',
      dark: 'blue-400',
    },
  },
  
  // Background layers
  background: {
    primary: {
      light: 'white',
      dark: 'slate-950',
    },
    secondary: {
      light: 'gray-50',
      dark: 'slate-900',
    },
    tertiary: {
      light: 'gray-100',
      dark: 'slate-800',
    },
  },
  
  // Border colors
  border: {
    DEFAULT: {
      light: 'gray-200',
      dark: 'slate-700',
    },
    subtle: {
      light: 'gray-100',
      dark: 'slate-800',
    },
    emphasis: {
      light: 'gray-300',
      dark: 'slate-600',
    },
  },
  
  // Text hierarchy
  text: {
    primary: {
      light: 'gray-900',
      dark: 'slate-100',
    },
    secondary: {
      light: 'gray-700',
      dark: 'slate-300',
    },
    tertiary: {
      light: 'gray-600',
      dark: 'slate-400',
    },
    muted: {
      light: 'gray-500',
      dark: 'slate-500',
    },
  },
} as const;

/**
 * Typography Scale
 * Six-level hierarchy for headings and body text
 */
export const typography = {
  // Font sizes (rem values)
  size: {
    h1: 'text-4xl',      // 2.25rem / 36px
    h2: 'text-3xl',      // 1.875rem / 30px
    h3: 'text-2xl',      // 1.5rem / 24px
    h4: 'text-xl',       // 1.25rem / 20px
    body: 'text-base',   // 1rem / 16px
    small: 'text-sm',    // 0.875rem / 14px
  },
  
  // Line heights
  leading: {
    heading: 'leading-tight',  // 1.25
    body: 'leading-relaxed',   // 1.625
    small: 'leading-normal',   // 1.5
  },
  
  // Font weights
  weight: {
    normal: 'font-normal',     // 400
    medium: 'font-medium',     // 500
    semibold: 'font-semibold', // 600
    bold: 'font-bold',         // 700
  },
} as const;

/**
 * Spacing Scale
 * Consistent spacing units for margins and padding
 */
export const spacing = {
  xs: '4',   // 1rem / 16px
  sm: '8',   // 2rem / 32px
  md: '12',  // 3rem / 48px
  lg: '16',  // 4rem / 64px
  xl: '24',  // 6rem / 96px
  '2xl': '32', // 8rem / 128px
  '3xl': '48', // 12rem / 192px
} as const;

/**
 * Shadow System
 * Three-level elevation system for depth
 */
export const shadows = {
  // Subtle elevation (cards, inputs)
  subtle: 'shadow-sm',
  
  // Medium elevation (dropdowns, modals)
  medium: 'shadow-md',
  
  // Prominent elevation (popovers, tooltips)
  prominent: 'shadow-lg',
  
  // No shadow (flat design)
  none: 'shadow-none',
} as const;

/**
 * Border Radius Scale
 * Three standardized radius values
 */
export const radius = {
  sm: 'rounded-md',   // 0.375rem / 6px
  md: 'rounded-lg',   // 0.5rem / 8px
  lg: 'rounded-xl',   // 0.75rem / 12px
  full: 'rounded-full', // 9999px
} as const;

/**
 * Animation Easing
 * Cubic bezier curves for smooth transitions
 */
export const easing = {
  // Standard easing for most interactions
  standard: 'ease-in-out',
  
  // Deceleration for elements entering viewport
  decelerate: 'ease-out',
  
  // Acceleration for elements leaving viewport
  accelerate: 'ease-in',
  
  // Sharp snap for instant feedback
  sharp: 'linear',
} as const;

/**
 * Animation Duration
 * Timing values for transitions and animations
 */
export const duration = {
  fast: 'duration-150',     // 150ms - micro-interactions
  normal: 'duration-200',   // 200ms - standard transitions
  slow: 'duration-300',     // 300ms - complex animations
} as const;

/**
 * Breakpoints
 * Responsive design breakpoints (matches Tailwind defaults)
 */
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

/**
 * Z-Index Scale
 * Layering system for overlapping elements
 */
export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  modal: 30,
  popover: 40,
  tooltip: 50,
} as const;
