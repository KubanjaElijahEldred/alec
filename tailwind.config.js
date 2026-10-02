/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#FF7A18',
        'brand-soft': '#FFA45C',
        azure: '#2E6BFF',
        'azure-soft': '#6FA0FF',
        'dark-bg': '#05080F',
        'card-bg': '#0B1220',
        'border-card': '#1B2637',
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