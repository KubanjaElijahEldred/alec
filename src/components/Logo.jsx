/**
 * Header / footer mark.
 *
 * Alec supplied a logo with a pale background on a square canvas. In the
 * light theme the original is shown untouched; in the dark theme the
 * background-keyed variant from scripts/make-logo-transparent.py is used
 * instead, so the mark sits directly on the dark background. Both files are
 * cropped to the same box, so the mark does not resize when toggling.
 */
export function Logo({ className = 'h-10 w-auto' }) {
  return (
    <>
      {/* Light theme: Alec's original file, pale background intact. */}
      <img
        src="/logo.png"
        alt="Alec Visuals"
        width="320"
        height="320"
        className={`object-contain dark:hidden ${className}`}
      />
      {/* Dark theme: background keyed out to transparency. */}
      <img
        src="/logo-dark.png"
        alt=""
        aria-hidden="true"
        width="320"
        height="320"
        className={`object-contain dark:block ${className} hidden`}
      />
    </>
  )
}

export function Monogram({ name, className = '' }) {
  const initials = name
    .replace(/&/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  return (
    <span
      className={`font-display font-black tracking-tight ${className}`}
      aria-hidden="true"
    >
      {initials}
    </span>
  )
}