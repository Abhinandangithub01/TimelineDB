# 🎨 TimelineDB Style Guide

## Brand Identity

### Name
**TimelineDB** - Always capitalize the "DB"

### Tagline
"Git for Databases" or "Ctrl+Z for Your Database"

### Mission
Bring Git-like superpowers to databases using Tiger Agentic Postgres zero-copy forks.

---

## Color Palette

### Primary Colors
```css
/* Indigo - Primary Brand Color */
--primary: #6366F1;
--primary-hover: #4F46E5;
--primary-light: #818CF8;
--primary-dark: #4338CA;

/* Purple - Secondary Brand Color */
--secondary: #8B5CF6;
--secondary-hover: #7C3AED;
--secondary-light: #A78BFA;
--secondary-dark: #6D28D9;

/* Cyan - Accent Color */
--accent: #06B6D4;
--accent-hover: #0891B2;
--accent-light: #22D3EE;
--accent-dark: #0E7490;
```

### Semantic Colors
```css
/* Success */
--success: #10B981;
--success-light: #34D399;
--success-dark: #059669;

/* Warning */
--warning: #F59E0B;
--warning-light: #FBBF24;
--warning-dark: #D97706;

/* Error */
--error: #EF4444;
--error-light: #F87171;
--error-dark: #DC2626;

/* Info */
--info: #3B82F6;
--info-light: #60A5FA;
--info-dark: #2563EB;
```

### Neutral Colors
```css
/* Backgrounds */
--bg-primary: #FFFFFF;
--bg-secondary: #F9FAFB;
--bg-tertiary: #F3F4F6;
--bg-dark: #0F172A;
--bg-dark-secondary: #1E293B;

/* Text */
--text-primary: #111827;
--text-secondary: #6B7280;
--text-tertiary: #9CA3AF;
--text-inverse: #FFFFFF;

/* Borders */
--border-light: #E5E7EB;
--border-medium: #D1D5DB;
--border-dark: #9CA3AF;
```

---

## Typography

### Font Family
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
             'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 
             'Helvetica Neue', sans-serif;
```

### Font Sizes
```css
/* Headings */
--text-6xl: 3.75rem;  /* 60px - Hero titles */
--text-5xl: 3rem;     /* 48px - Section titles */
--text-4xl: 2.25rem;  /* 36px - Large headings */
--text-3xl: 1.875rem; /* 30px - Medium headings */
--text-2xl: 1.5rem;   /* 24px - Small headings */
--text-xl: 1.25rem;   /* 20px - Large body */

/* Body */
--text-base: 1rem;    /* 16px - Default body */
--text-sm: 0.875rem;  /* 14px - Small text */
--text-xs: 0.75rem;   /* 12px - Extra small */
```

### Font Weights
```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Line Heights
```css
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;
```

---

## Spacing System

### Scale (Tailwind-based)
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-24: 6rem;     /* 96px */
```

---

## Components

### Buttons

#### Primary Button
```tsx
<button className="bg-[#6366F1] hover:bg-[#4F46E5] text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl">
  Try TimelineDB
</button>
```

#### Secondary Button
```tsx
<button className="border-2 border-[#6366F1] text-[#6366F1] hover:bg-[#6366F1] hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors">
  Learn More
</button>
```

#### Gradient Button
```tsx
<button className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white px-8 py-4 rounded-lg font-semibold hover:shadow-2xl hover:shadow-[#6366F1]/50 transition-all transform hover:scale-105">
  Get Started Free
</button>
```

### Cards

#### Standard Card
```tsx
<div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-[#6366F1] hover:shadow-xl transition-all">
  {/* Content */}
</div>
```

#### Gradient Card
```tsx
<div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-8 hover:border-[#6366F1] hover:shadow-xl transition-all">
  {/* Content */}
</div>
```

#### Dark Card
```tsx
<div className="bg-[#1E293B] border-2 border-gray-700 rounded-2xl p-8 shadow-2xl">
  {/* Content */}
</div>
```

### Badges

#### Status Badge
```tsx
<span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
  Active
</span>
```

#### Priority Badge
```tsx
<span className="px-3 py-1 bg-[#6366F1]/10 text-[#6366F1] rounded-full text-sm font-semibold">
  8 seconds
</span>
```

### Icons

#### Icon Container
```tsx
<div className="w-12 h-12 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-xl flex items-center justify-center text-white">
  <svg className="w-6 h-6" />
</div>
```

---

## Layout

### Container
```tsx
<div className="max-w-7xl mx-auto px-6">
  {/* Content */}
</div>
```

### Section Spacing
```tsx
<section className="py-24">
  {/* Content */}
</section>
```

### Grid Layouts
```tsx
{/* 2 columns */}
<div className="grid md:grid-cols-2 gap-8">

{/* 3 columns */}
<div className="grid md:grid-cols-3 gap-8">

{/* 4 columns */}
<div className="grid md:grid-cols-4 gap-6">
```

---

## Gradients

### Background Gradients
```css
/* Primary Gradient */
background: linear-gradient(to bottom right, #6366F1, #8B5CF6);

/* Dark Gradient */
background: linear-gradient(to bottom right, #0F172A, #1E293B, #0F172A);

/* Light Gradient */
background: linear-gradient(to bottom right, #F9FAFB, #FFFFFF);
```

### Text Gradients
```tsx
<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]">
  Gradient Text
</span>
```

---

## Animations

### Transitions
```css
/* Standard */
transition: all 0.3s ease;

/* Fast */
transition: all 0.15s ease;

/* Slow */
transition: all 0.5s ease;
```

### Hover Effects
```tsx
{/* Scale */}
<div className="transform hover:scale-105 transition-transform">

{/* Shadow */}
<div className="hover:shadow-2xl transition-shadow">

{/* Lift */}
<div className="hover:-translate-y-1 transition-transform">
```

### Loading States
```tsx
{/* Spinner */}
<div className="animate-spin rounded-full h-12 w-12 border-4 border-[#6366F1] border-t-transparent" />

{/* Pulse */}
<div className="animate-pulse bg-gray-200 rounded" />
```

---

## Shadows

```css
/* Small */
box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

/* Medium */
box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);

/* Large */
box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);

/* Extra Large */
box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);

/* 2XL */
box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);

/* Colored (Primary) */
box-shadow: 0 20px 25px -5px rgba(99, 102, 241, 0.5);
```

---

## Border Radius

```css
--radius-sm: 0.375rem;   /* 6px */
--radius-md: 0.5rem;     /* 8px */
--radius-lg: 0.75rem;    /* 12px */
--radius-xl: 1rem;       /* 16px */
--radius-2xl: 1.5rem;    /* 24px */
--radius-full: 9999px;   /* Full circle */
```

---

## Code Blocks

### Terminal Style
```tsx
<div className="bg-[#1E293B] border-2 border-gray-700 rounded-2xl p-8 shadow-2xl">
  {/* Terminal Header */}
  <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-700">
    <div className="flex gap-2">
      <div className="w-3 h-3 rounded-full bg-red-500" />
      <div className="w-3 h-3 rounded-full bg-yellow-500" />
      <div className="w-3 h-3 rounded-full bg-green-500" />
    </div>
    <span className="text-sm text-gray-400 ml-4">timelinedb.ts</span>
  </div>
  
  {/* Code Content */}
  <div className="font-mono text-sm">
    <span className="text-[#8B5CF6]">const</span>
    <span className="text-gray-300"> timeline = </span>
    <span className="text-[#8B5CF6]">await</span>
    <span className="text-gray-300"> timelineDB.</span>
    <span className="text-[#06B6D4]">fork</span>
    <span className="text-gray-300">(</span>
    <span className="text-green-400">'test-feature'</span>
    <span className="text-gray-300">);</span>
  </div>
</div>
```

---

## Voice & Tone

### Voice Characteristics
- **Confident** - We solve real problems
- **Technical** - We understand developers
- **Friendly** - Approachable and helpful
- **Innovative** - Pushing boundaries

### Writing Style
- Use active voice
- Keep sentences short and clear
- Use technical terms correctly
- Include code examples
- Show, don't just tell

### Example Copy

#### Good ✅
```
"Create database branches in 8 seconds. Test changes risk-free. 
Rollback instantly if something goes wrong."
```

#### Bad ❌
```
"Our platform enables users to potentially create database branches 
in a relatively short amount of time, which may help with testing."
```

---

## Iconography

### Icon Style
- **Line-based** - 2px stroke width
- **Rounded corners** - Consistent with brand
- **24x24px** - Standard size
- **Heroicons** - Preferred icon set

### Common Icons
```tsx
{/* Time/Clock */}
<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

{/* Fork/Branch */}
<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
</svg>

{/* Checkmark */}
<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
    d="M5 13l4 4L19 7" />
</svg>

{/* Lightning/Fast */}
<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
    d="M13 10V3L4 14h7v7l9-11h-7z" />
</svg>
```

---

## Responsive Design

### Breakpoints
```css
/* Mobile First */
sm: 640px   /* Small devices */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large screens */
```

### Mobile Considerations
- Stack columns on mobile
- Increase touch targets (min 44x44px)
- Simplify navigation
- Reduce text size appropriately
- Test on real devices

---

## Accessibility

### Color Contrast
- Text on white: Minimum 4.5:1 ratio
- Large text: Minimum 3:1 ratio
- Interactive elements: Clear focus states

### Focus States
```tsx
<button className="focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2">
  Button
</button>
```

### Alt Text
Always provide descriptive alt text for images and icons used as content.

### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Logical tab order
- Skip links for main content

---

## Performance

### Image Optimization
- Use Next.js Image component
- Provide width and height
- Use WebP format when possible
- Lazy load below-the-fold images

### Code Splitting
- Dynamic imports for large components
- Route-based splitting (automatic with Next.js)

### Loading States
Always provide loading feedback for async operations

---

## Usage Examples

### Hero Section
```tsx
<section className="relative bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white py-24">
  <div className="max-w-7xl mx-auto px-6">
    <h1 className="text-5xl lg:text-6xl font-bold mb-6">
      What if you could
      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]">
        Ctrl+Z
      </span>
      your entire database?
    </h1>
  </div>
</section>
```

### Feature Card
```tsx
<div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-8 hover:border-[#6366F1] hover:shadow-xl transition-all">
  <div className="w-16 h-16 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-xl flex items-center justify-center text-white mb-6">
    <svg className="w-8 h-8" />
  </div>
  <h3 className="text-2xl font-bold text-gray-900 mb-3">
    Time Travel
  </h3>
  <p className="text-gray-600 mb-4">
    Jump to any point in your database history instantly.
  </p>
  <div className="inline-flex items-center gap-2 bg-[#6366F1]/10 text-[#6366F1] px-4 py-2 rounded-full text-sm font-semibold">
    8 seconds vs 30 minutes
  </div>
</div>
```

---

## Don'ts

❌ Don't use orange (#FF6B35) - That's Fortify's color
❌ Don't use security/compliance terminology
❌ Don't reference "analysis" or "scanning"
❌ Don't use shield icons
❌ Don't mention vulnerabilities or threats

## Do's

✅ Use indigo/purple gradient
✅ Use timeline/git terminology
✅ Reference "forks", "branches", "commits"
✅ Use clock/time icons
✅ Emphasize speed (8 seconds!)
✅ Highlight zero-copy benefits

---

**Built with ❤️ for TimelineDB**
