const KEY = 'alec-theme'

/** Read the stored preference, falling back to the OS setting. */
export function getPreferredTheme() {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === 'dark' || saved === 'light') return saved
  } catch {
    /* storage unavailable */
  }
  return window.matchMedia?.('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark'
}

export function applyTheme(theme) {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
  root.style.colorScheme = theme
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#05080F' : '#FFFFFF')
}

export function storeTheme(theme) {
  try {
    localStorage.setItem(KEY, theme)
  } catch {
    /* storage unavailable */
  }
}
