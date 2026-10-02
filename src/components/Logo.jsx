/**
 * Header / footer / splash mark.
 *
 * Alec supplied a logo with a pale background and a near-black mark on a
 * square canvas. scripts/make-logo-transparent.py now produces two tightly
 * cropped, identically framed variants:
 *
 *   /logo.png       the original artwork, pale background kept  (light theme)
 *   /logo-dark.png  the mark knocked out to solid white, alpha 0 elsewhere
 *
 * The knockout matters: the source mark averages ~54/255 luminance, so merely
 * removing the background leaves artwork that disappears into the #05080F
 * dark surface. Reversing it to white measures ~13.5:1 against that
 * background instead.
 *
 * `tone="dark"` pins the white knockout regardless of theme, for use on the
 * blue gradient nav and anywhere else with a dark or saturated backdrop.
 */
export function Logo({ className = 'h-10 w-auto', tone = 'auto' }) {
  const showLight = tone === 'auto'
  const showDark = tone === 'dark' || tone === 'auto'

  return (
    <>
      {showLight && (
        <img
          src="/logo.png"
          alt="Alec Visuals"
          width="512"
          height="392"
          className={`object-contain dark:hidden ${className}`}
        />
      )}
      {showDark && (
        <img
          src="/logo-dark.png"
          alt={showLight ? '' : 'Alec Visuals'}
          aria-hidden={showLight ? 'true' : undefined}
          width="512"
          height="392"
          className={`object-contain ${showLight ? 'hidden dark:block' : ''} ${className}`}
        />
      )}
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
