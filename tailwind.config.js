/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  // The theme is driven by a class on <html> so the toggle can override the
  // operating-system preference.
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: '#FF7A18',
        /* Softer accents darken in the light theme so small text keeps
           enough contrast against a white background. */
        'brand-soft': 'rgb(var(--c-brand-soft) / <alpha-value>)',
        azure: '#2E6BFF',
        'azure-soft': 'rgb(var(--c-azure-soft) / <alpha-value>)',

        /* Semantic surface tokens. Each resolves to a CSS variable that is
           redefined for the light theme, so `bg-base`, `text-ink` and
           friends flip automatically instead of needing dark: variants. */
        base: 'rgb(var(--c-base) / <alpha-value>)',
        alt: 'rgb(var(--c-alt) / <alpha-value>)',
        card: 'rgb(var(--c-card) / <alpha-value>)',
        'card-hover': 'rgb(var(--c-card-hover) / <alpha-value>)',
        line: 'rgb(var(--c-line) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        'ink-2': 'rgb(var(--c-ink-2) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        'muted-2': 'rgb(var(--c-muted-2) / <alpha-value>)',
        faint: 'rgb(var(--c-faint) / <alpha-value>)',
        'on-brand': 'rgb(var(--c-on-brand) / <alpha-value>)',
      },
      fontFamily: {
        display: ['Syne', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        eyebrow: '0.34em',
      },
    },
  },
  plugins: [],
}