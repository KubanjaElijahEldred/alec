import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { applyTheme, getPreferredTheme, storeTheme } from '../theme'

/**
 * Light / dark switch. Dark is the default to match the original design;
 * the choice is persisted and applied to <html> before first paint by an
 * inline script in index.html, so there is no flash on load.
 */
export function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useState(() => getPreferredTheme())

  useEffect(() => {
    applyTheme(theme)
    storeTheme(theme)
  }, [theme])

  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className={`relative grid h-9 w-9 cursor-pointer place-items-center border border-line text-muted transition-colors hover:border-brand hover:text-brand ${className}`}
    >
      <Sun className="absolute h-[18px] w-[18px] rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[18px] w-[18px] rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
    </button>
  )
}
