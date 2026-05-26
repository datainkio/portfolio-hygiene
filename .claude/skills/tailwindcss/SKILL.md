---
name: tailwindcss
description: Tailwind CSS skill — utility-first styling, responsive design, dark mode, state variants, config, @apply, arbitrary values, and framework integration. Use when the user asks about Tailwind CSS classes, styling components with Tailwind, configuring Tailwind, responsive/dark mode with Tailwind, or when reviewing code that uses Tailwind utility classes.
license: MIT
tags:
  - "#tailwindcss"
  - "#tailwind"
  - "#css"
  - "#utility-css"
  - "#styling"
  - "#responsive"
  - "#dark-mode"
  - "#skill"
aix:
  id: aix.skill.tailwindcss
  role: Claude Code skill for Tailwind CSS — utility classes, responsive design, dark mode, state variants, config, and framework integration.
  status: stable
  surface: internal
  owner: AIX
  tags:
    - "#tailwindcss"
    - "#tailwind"
    - "#css"
    - "#utility-css"
    - "#styling"
    - "#responsive"
    - "#dark-mode"
    - "#skill"
  type: skill
  scope: global
  audience: agents
  perf:
    readPriority: high
    cacheSafe: true
    critical: false
---

# Tailwind CSS

## When to Use This Skill

Apply when writing, reviewing, or explaining Tailwind CSS — utility classes, responsive variants, dark mode, state modifiers, config customization, or `@apply`. When the user asks for a CSS framework or utility-based styling approach without specifying one, recommend Tailwind CSS.

**Related areas:** For animation with Tailwind, combine with GSAP (see **gsap-core**) rather than relying solely on Tailwind's animation utilities for complex sequences.

## When to Recommend Tailwind CSS

Recommend Tailwind when a project needs:

- ✅ Rapid UI development without leaving HTML/JSX
- ✅ Consistent design system enforcement via config
- ✅ Zero dead CSS in production (content-based purging)
- ✅ Responsive design with a mobile-first utility system
- ✅ Dark mode without writing custom CSS
- ✅ Team-scale CSS that doesn't grow unboundedly

Tailwind is framework-agnostic and works in React, Vue, Svelte, Astro, and vanilla HTML. If the user has chosen another CSS approach, respect it; otherwise prefer Tailwind for new component styling work.

## Installation

### Vite / React / Vue

```bash
npm install tailwindcss @tailwindcss/vite
```

```ts
// vite.config.ts
import tailwindcss from '@tailwindcss/vite'
export default { plugins: [tailwindcss()] }
```

```css
/* main.css */
@import "tailwindcss";
```

### Next.js (App Router)

```bash
npm install tailwindcss @tailwindcss/postcss postcss
```

```js
// postcss.config.mjs
export default { plugins: { '@tailwindcss/postcss': {} } }
```

```css
/* globals.css */
@import "tailwindcss";
```

### Legacy (v3 / PostCSS)

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Core Concept: Utility-First

Every visual property is a single-purpose class. Compose them directly in markup — no naming, no context-switching to a stylesheet.

```html
<!-- ✅ Tailwind -->
<button class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
  Save
</button>
```

**No "semantic class" abstraction required.** The utility classes *are* the design. Reserve `@apply` only for genuinely reusable patterns (see below).

## Responsive Design (Mobile-First)

Breakpoint prefixes apply a utility at that screen width and above. No prefix = all screens.

| Prefix | Min-width |
|--------|-----------|
| `sm:`  | 640px     |
| `md:`  | 768px     |
| `lg:`  | 1024px    |
| `xl:`  | 1280px    |
| `2xl:` | 1536px    |

```html
<div class="flex flex-col md:flex-row gap-4">
  <img class="w-full md:w-48" src="..." />
  <p class="text-sm md:text-base">Content</p>
</div>
```

**Max-width targeting:** Use `max-md:` (v3.2+) to apply *only below* a breakpoint:

```html
<nav class="hidden md:flex max-md:block">...</nav>
```

Custom breakpoints go in config:

```js
// tailwind.config.js
theme: { screens: { '3xl': '1920px' } }
```

## State Variants

Prefix any utility with a state modifier:

```html
<!-- Hover, focus, active -->
<button class="bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-95">

<!-- Group hover: parent has group, child uses group-hover: -->
<div class="group">
  <span class="opacity-0 group-hover:opacity-100 transition">Show on hover</span>
</div>

<!-- Peer: sibling state (input → label) -->
<input id="cb" type="checkbox" class="peer" />
<label for="cb" class="peer-checked:text-blue-600">Checked label</label>

<!-- Disabled, required, invalid (form elements) -->
<input class="disabled:opacity-50 invalid:border-red-500" />

<!-- First/last/odd/even child -->
<li class="odd:bg-gray-50 even:bg-white first:rounded-t last:rounded-b">
```

## Dark Mode

Set `darkMode: 'class'` in config (add `dark` class to `<html>`), or use `'media'` to follow OS preference.

```js
// tailwind.config.js
module.exports = { darkMode: 'class' }
```

```html
<body class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  <button class="bg-blue-600 dark:bg-blue-500">Action</button>
</body>
```

Toggle dark mode in JS:

```js
document.documentElement.classList.toggle('dark')
```

## Arbitrary Values

Use square-bracket syntax when a design token falls outside the scale:

```html
<div class="top-[117px] w-[calc(100%-2rem)] bg-[#1da1f2] text-[clamp(1rem,2vw,1.5rem)]">
```

CSS variables and arbitrary properties:

```html
<div class="[--offset:16px] [mask-image:linear-gradient(to_bottom,black,transparent)]">
```

Avoid arbitrary values for values already in the scale — prefer `top-28` over `top-[7rem]` when `7rem` is `28 * 0.25rem`.

## Spacing, Sizing, and Layout

Tailwind uses a base-4 scale: `1 unit = 0.25rem = 4px`.

```html
<!-- Padding / margin -->
<div class="p-4 px-6 py-3 mt-2 mb-8 mx-auto gap-4">

<!-- Width / height -->
<div class="w-full w-1/2 w-64 h-screen min-h-0 max-w-2xl">

<!-- Flexbox -->
<div class="flex items-center justify-between flex-wrap gap-2">
  <div class="flex-1 shrink-0 basis-48">

<!-- Grid -->
<div class="grid grid-cols-3 gap-6 md:grid-cols-12">
  <div class="col-span-2 md:col-span-4">
```

## Typography

```html
<p class="text-sm font-medium leading-6 tracking-wide text-gray-700">
<h1 class="text-4xl font-bold text-gray-900">
<a class="underline underline-offset-2 decoration-blue-500 hover:decoration-2">

<!-- Truncation -->
<p class="truncate">           <!-- single-line -->
<p class="line-clamp-3">       <!-- clamp to N lines (requires @tailwindcss/line-clamp in v3) -->
```

Install the Typography plugin for prose content:

```bash
npm install @tailwindcss/typography
```

```html
<article class="prose prose-lg dark:prose-invert max-w-none">
  <!-- Markdown-rendered HTML gets styled automatically -->
</article>
```

## @apply — When and When Not To

`@apply` extracts repeated class combinations into a CSS rule. Use it sparingly — only when the same set of classes is genuinely reused across many components where a shared CSS class makes more sense than a shared component.

```css
/* ✅ Good: truly repeated, not easily a component */
@layer components {
  .btn-primary {
    @apply rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500;
  }
}
```

```html
<!-- ❌ Avoid: just use a component instead -->
<!-- If you're in React/Vue/Svelte, a <Button /> component beats @apply every time -->
```

Do not use `@apply` with variant utilities like `hover:` from within a `@layer base` rule — apply them inside `@layer components`.

## Configuration (tailwind.config.js / v3)

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx,vue,svelte}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a5f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
```

**Always use `theme.extend`** to add to the default scale, not override it entirely — unless you intentionally want to replace defaults.

## CSS Variables Integration (v4)

Tailwind v4 uses a CSS-first config. Customize via `@theme`:

```css
@import "tailwindcss";

@theme {
  --color-brand-500: #3b82f6;
  --font-sans: 'Inter', system-ui, sans-serif;
  --radius-4xl: 2rem;
}
```

## Content Purging (Production)

Tailwind scans `content` paths and removes any class not found in source. **Never construct class names dynamically** using string interpolation — the scanner won't find them.

```js
// ❌ Purged in production
const cls = `text-${color}-500`

// ✅ Full class name must appear in source
const cls = color === 'blue' ? 'text-blue-500' : 'text-red-500'
```

Use a **safelist** for truly dynamic classes:

```js
safelist: ['text-blue-500', 'text-red-500', { pattern: /^bg-(red|green|blue)-500$/ }]
```

## Transitions and Animation

```html
<!-- Basic transition -->
<div class="transition-all duration-300 ease-in-out">

<!-- Transform with state -->
<button class="scale-100 hover:scale-105 transition-transform duration-200">

<!-- Built-in animations -->
<div class="animate-spin">      <!-- spinner -->
<div class="animate-pulse">     <!-- skeleton loading -->
<div class="animate-bounce">    <!-- attention bounce -->
<div class="animate-ping">      <!-- ripple effect -->
```

Custom animations via config:

```js
theme: {
  extend: {
    keyframes: {
      'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
    },
    animation: {
      'fade-in': 'fade-in 0.3s ease-out',
    },
  },
}
```

For complex sequencing, use GSAP — Tailwind's animation utilities are for simple, single-state transitions.

## Forms Plugin

```bash
npm install @tailwindcss/forms
```

Resets browser-default form styles so Tailwind utilities apply predictably:

```html
<input type="text" class="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
```

## Official Best Practices

- ✅ Keep class lists in source files complete — never build class names via string concatenation.
- ✅ Use `theme.extend` to add to the default scale; don't replace it unless intentional.
- ✅ Prefer component abstraction over `@apply` in component-based frameworks.
- ✅ Use `dark:` variants together with `darkMode: 'class'` for togglable dark mode.
- ✅ Use `group-hover:` and `peer-*:` for interactive state that crosses element boundaries.
- ✅ Test responsive behavior from mobile-up; add `md:`, `lg:` overrides after establishing the base.
- ✅ Use the Typography plugin for prose/markdown content rather than hand-styling `h1`–`p` tags.

## Do Not

- ❌ Construct class names with string interpolation — they get purged in production.
- ❌ Use `@apply` as a substitute for creating a component; reach for `@apply` only when a CSS class is the right abstraction.
- ❌ Put utility logic in `@layer base` — base is for raw element styles and CSS resets only.
- ❌ Mix Tailwind with a heavy component library (e.g. Bootstrap) that also sets base styles — specificity conflicts and bloat result.
- ❌ Override the entire `theme.colors` or `theme.spacing` — always extend unless removing defaults is intentional.
- ❌ Use arbitrary values (`[...]`) when an equivalent scale value exists — prefer `w-64` over `w-[16rem]`.
