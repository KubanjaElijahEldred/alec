import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { applyTheme, getPreferredTheme, storeTheme } from '../theme'

/**
 * Light / dark switch. Dark is the default to match the original design;
 * the choice is persisted and applied to <html> before first paint by an
 * inline script in index.html, so there is no flash on load.
 *
 * `tone="dark"` styles the button for a dark or saturated backdrop (the blue
 * nav bar). Colours are chosen here rather than overridden by the caller,
 * because two competing Tailwind colour utilities in one class attribute
 * resolve by stylesheet order, not by the order they are written.
 */
export function ThemeToggle({ className = '', tone = 'auto' }) {
  const [theme, setTheme] = useState(() => getPreferredTheme())

  useEffect(() => {
    applyTheme(theme)
    storeTheme(theme)
  }, [theme])

  const next = theme === 'dark' ? 'light' : 'dark'

  const skin =
    tone === 'dark'
      ? 'border-white/35 text-white/85 hover:border-white hover:bg-white/10 hover:text-white'
      : 'border-line text-muted hover:border-brand hover:text-brand'

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className={`relative grid h-9 w-9 cursor-pointer place-items-center border transition-colors ${skin} ${className}`}
    >
      <Sun className="absolute h-[18px] w-[18px] rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[18px] w-[18px] rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
    </button>
  )
}
