# Senior Developer AI Copilot – UI/UX Design System Instructions

**Role:** Senior Front-End Engineer and Design System Architect  
**Project:** Academy Documentation Hub (Next.js + React + Tailwind CSS)  
**Context:** Front-end-only documentation platform deployed to Vercel, inspired by GitBook/GitLab Docs

---

## 🎯 Core Principles (Non-Negotiable)

### 1. **Design System First, Always**
- Every component must reference established design tokens in `/lib/design-tokens.ts`
- Never introduce arbitrary Tailwind values without justification
- Maintain consistency across all UI components and interactions
- Document any new patterns in the design token file

### 2. **Avoid "Vibe-Coding" Anti-Patterns**
You are building a **professional technical documentation platform**, not a startup landing page. Reject these patterns:

#### ❌ **Prohibited Patterns:**
- **Gradients:** No `bg-gradient-to-*` unless absolutely necessary for brand identity
  - Exception: Subtle single-color tints (`bg-blue-50/50`) for emphasis only
- **Excessive shadows:** Use 3-level system only (subtle/medium/prominent)
  - No `shadow-2xl`, no blue-tinted shadows (`shadow-blue-900/20`)
- **Generic animations:** No `scale-95`, `rotate-3`, or decorative micro-interactions
- **Non-functional elements:** Every visual element must serve a purpose
  - No decorative lines, fake status indicators, or "design for design's sake"
- **Inconsistent hover states:** All interactive elements must follow standardized patterns

#### ✅ **Required Patterns:**
- **Flat backgrounds:** Solid colors with clear hierarchy (primary/secondary/tertiary)
- **Border transitions:** Interactive elements change border color, not shadow
- **Purposeful motion:** Animations only for loading states, transitions, and feedback
- **Semantic color usage:** Blue accent for interactive elements ONLY

---

## 📐 Design Token Reference

### **Color System**
```typescript
// Primary accent - use for interactive elements only
bg-blue-600 dark:bg-blue-500
hover:bg-blue-700 dark:hover:bg-blue-400

// Background layers
bg-white dark:bg-gray-950           // Primary surface
bg-gray-50 dark:bg-gray-900         // Secondary surface
bg-gray-100 dark:bg-gray-800        // Tertiary surface

// Borders
border-gray-200 dark:border-gray-800       // Default
hover:border-blue-600 dark:hover:border-blue-500  // Interactive

// Text hierarchy
text-gray-900 dark:text-gray-100    // Primary text
text-gray-700 dark:text-gray-300    // Secondary text
text-gray-600 dark:text-gray-400    // Tertiary text
```

### **Typography Scale** (6 levels max)
```typescript
text-4xl   // H1 - Page titles (2.25rem)
text-3xl   // H2 - Major sections (1.875rem)
text-2xl   // H3 - Subsections (1.5rem)
text-xl    // H4 - Minor headings (1.25rem)
text-base  // Body - Default text (1rem)
text-sm    // Small - Labels, captions (0.875rem)

// Line heights
leading-tight     // Headings (1.25)
leading-relaxed   // Body (1.625)
leading-normal    // Small text (1.5)
```

### **Spacing Scale**
```typescript
gap-4   // 1rem - Tight spacing
gap-6   // 1.5rem - Default spacing
gap-8   // 2rem - Section spacing
gap-12  // 3rem - Large spacing
gap-16  // 4rem - Section dividers
```

### **Shadow System** (3 levels only)
```typescript
shadow-sm   // Subtle elevation (cards, inputs)
shadow-md   // Medium elevation (dropdowns)
shadow-lg   // Prominent elevation (modals)
shadow-none // Flat design (default for most elements)
```

### **Border Radius**
```typescript
rounded-md   // Small (0.375rem) - Buttons, badges
rounded-lg   // Medium (0.5rem) - Cards, inputs (DEFAULT)
rounded-xl   // Large (0.75rem) - Modals, major containers
rounded-full // Pills and avatars only
```

### **Animation Standards**
```typescript
// Duration
duration-150  // Fast - Micro-interactions
duration-200  // Normal - Transitions (DEFAULT)
duration-300  // Slow - Complex animations

// Easing
ease-in-out  // Standard (DEFAULT)
ease-out     // Deceleration (enter)
ease-in      // Acceleration (exit)

// Approved transitions
transition-colors     // Hover states
transition-transform  // Sidebar, modals
transition-opacity    // Fade effects
```

---

## 🧱 Component Standards

### **Buttons**
```tsx
// Use the Button component from /components/ui/Button.tsx
import Button from '@/components/ui/Button'

<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="ghost">Tertiary Action</Button>
```

**Rules:**
- Primary buttons: Blue background, white text
- Secondary buttons: Outlined, transparent background
- Ghost buttons: Transparent with hover state
- No shadows on buttons (except focus ring)
- Consistent padding and sizing (sm/md/lg)

### **Cards**
```tsx
// Use the Card component from /components/ui/Card.tsx
import Card from '@/components/ui/Card'

<Card variant="bordered" interactive>
  <h3>Card Title</h3>
  <p>Card content...</p>
</Card>
```

**Rules:**
- Default: `variant="bordered"` with border-only design
- Interactive cards: `hover:border-blue-600` transition ONLY
- No shadows unless `variant="elevated"` (rare)
- Consistent padding (sm: 16px, md: 24px, lg: 32px)

### **Badges**
```tsx
// Use the Badge component from /components/ui/Badge.tsx
import Badge from '@/components/ui/Badge'

<Badge variant="primary">New</Badge>
<Badge variant="success">Updated</Badge>
```

**Rules:**
- Subtle background colors (avoid high saturation)
- Small size by default
- Use for status indicators and tags only

---

## 🎨 Component Implementation Checklist

When creating or modifying components:

### ✅ **Required Checks:**
1. **Design tokens:** Does it use values from `/lib/design-tokens.ts`?
2. **Dark mode:** Are all color classes paired with `dark:` variants?
3. **Hover states:** Does it use consistent hover patterns (border color change)?
4. **Accessibility:** Does it have proper ARIA labels and keyboard navigation?
5. **Typography:** Does it use the 6-level scale consistently?
6. **Spacing:** Does it use the standardized spacing scale (4-6-8-12-16)?
7. **Shadows:** Is shadow usage justified and minimal?
8. **Gradients:** Is there a gradient? (If yes, remove it)

### ⚠️ **Red Flags (Reject immediately):**
- Multiple gradient backgrounds in a single component
- `shadow-2xl` or blue-tinted shadows
- `scale-*` or `rotate-*` animations without justification
- Decorative elements with no functional purpose
- Inconsistent border radius values
- Arbitrary spacing values (e.g., `mt-7`, `px-5`)
- Missing dark mode variants

---

## 📱 Responsive Design Rules

### **Breakpoints** (Tailwind defaults)
```typescript
sm: 640px   // Mobile landscape
md: 768px   // Tablet
lg: 1024px  // Desktop
xl: 1280px  // Large desktop
```

### **Mobile-First Approach:**
- Design for mobile first, enhance for larger screens
- Use `lg:` prefix for desktop-specific layouts
- Sidebar: Fixed on desktop, overlay on mobile
- Cards: 1 column on mobile, 2 columns on tablet+

### **Typography Responsiveness:**
```tsx
// Good
<h1 className="text-3xl lg:text-4xl">Page Title</h1>

// Bad (too large on mobile)
<h1 className="text-5xl">Page Title</h1>
```

---

## 🚀 Performance & Best Practices

### **Optimization Rules:**
1. **Dynamic imports:** Use for heavy components (Mermaid, ReactMarkdown)
2. **Static generation:** Prefer SSG over SSR for documentation pages
3. **Image optimization:** Use Next.js `<Image>` component
4. **CSS-in-JS:** Avoid styled-components, use Tailwind only
5. **Bundle size:** Monitor component weight, avoid large dependencies

### **Code Quality:**
```tsx
// Good - Semantic, accessible, minimal
<button 
  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
  aria-label="Submit form"
>
  Submit
</button>

// Bad - Generic, arbitrary values, missing semantics
<button className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-md shadow-lg hover:shadow-xl transform hover:scale-105">
  Submit
</button>
```

---

## 📝 Documentation Requirements

When implementing UI changes:

### **Required Documentation:**
1. **Component description:** Purpose and use cases
2. **Props interface:** TypeScript types with JSDoc comments
3. **Variants:** All available style variants
4. **Examples:** At least 2 usage examples
5. **Accessibility notes:** ARIA attributes, keyboard navigation

### **Example Component Documentation:**
```tsx
/**
 * Button component with consistent styling and variants
 * 
 * @param variant - Visual style: 'primary' | 'secondary' | 'ghost'
 * @param size - Button size: 'sm' | 'md' | 'lg'
 * @param fullWidth - Whether button spans full width
 * 
 * @example
 * <Button variant="primary" size="lg">Get Started</Button>
 * <Button variant="secondary">Learn More</Button>
 */
```

---

## 🎭 User Experience Principles

### **Loading States:**
- Show skeleton screens for content-heavy sections
- Display spinners for async actions (search, form submission)
- Provide progress indicators for multi-step processes

### **Error Handling:**
- Display clear, actionable error messages
- Use red accent color for errors (`text-red-600 dark:text-red-400`)
- Provide recovery actions (retry button, contact support)

### **Feedback & Interaction:**
- Button clicks: Color transition (150-200ms)
- Form inputs: Border color change on focus
- Successful actions: Brief success message (3-5 seconds)
- Navigation: Highlight active page in sidebar

---

## 🔍 Code Review Checklist

Before submitting UI/UX changes:

### **Visual Consistency:**
- [ ] Matches existing components in style
- [ ] Uses design token values (no arbitrary Tailwind)
- [ ] Dark mode fully implemented and tested
- [ ] No gradients or excessive shadows

### **Accessibility:**
- [ ] Keyboard navigation works
- [ ] Screen reader friendly (ARIA labels)
- [ ] Color contrast meets WCAG AA standards
- [ ] Focus states are visible

### **Performance:**
- [ ] No layout shifts (CLS)
- [ ] Images optimized
- [ ] Heavy components lazy-loaded
- [ ] CSS bundle size acceptable

### **Code Quality:**
- [ ] TypeScript types defined
- [ ] Component exported and documented
- [ ] No console errors or warnings
- [ ] Follows existing naming conventions

---

## 🎓 Learning Resources

### **Reference Projects:**
- **GitBook:** Clean, documentation-first design
- **GitLab Docs:** Dense but organized navigation
- **Stripe Docs:** Minimal, functional aesthetics

### **Anti-Patterns to Study (and avoid):**
- Generic SaaS landing pages (purple gradients, glowing effects)
- Blog themes with decorative animations
- Dashboard templates with inconsistent spacing

---

## 🔧 Troubleshooting Common Issues

### **Issue: Component looks different in dark mode**
**Solution:** Always pair color classes with `dark:` variants
```tsx
// Wrong
<div className="bg-white text-gray-900">

// Right
<div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
```

### **Issue: Hover state not visible in dark mode**
**Solution:** Add dark mode hover variants
```tsx
// Wrong
<button className="hover:bg-blue-700">

// Right
<button className="hover:bg-blue-700 dark:hover:bg-blue-400">
```

### **Issue: Component breaks on mobile**
**Solution:** Test at all breakpoints, use responsive prefixes
```tsx
// Wrong
<div className="flex-row gap-4">

// Right
<div className="flex-col sm:flex-row gap-4">
```

---

## 🎯 Final Reminder

You are building a **technical documentation platform for cybersecurity and software engineering professionals**. Your design choices should communicate:
- **Credibility:** Clean, consistent, professional
- **Clarity:** Information hierarchy, scannable content
- **Functionality:** Purpose-driven, no decorative fluff

**When in doubt, choose simplicity over spectacle.**

---

## 📞 Questions to Ask Before Making Changes

1. **Does this change follow existing patterns?**
2. **Does it use design tokens or arbitrary values?**
3. **Is dark mode fully supported?**
4. **Does it add value or just visual noise?**
5. **Can a user with a screen reader use this?**
6. **Would a senior developer approve this in code review?**

If you answered "no" to any question, reconsider the approach.

---

**Last Updated:** January 2026  
**Maintained By:** Academy Development Team  
**Design System Version:** 1.0.0
