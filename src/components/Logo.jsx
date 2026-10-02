export function Logo({ className = 'h-10 w-auto' }) {
  return (
    <svg
      viewBox="0 0 210 44"
      className={className}
      role="img"
      aria-label="Alec Visuals"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="avLogoGrad" x1="0" y1="0" x2="64" y2="44">
          <stop offset="0%" stopColor="#FF7A18" />
          <stop offset="45%" stopColor="#FFA45C" />
          <stop offset="100%" stopColor="#2E6BFF" />
        </linearGradient>
        <linearGradient id="avWordGrad" x1="0" y1="0" x2="210" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="55%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#6FA0FF" />
        </linearGradient>
      </defs>

      {/* AV monogram mark */}
      <rect
        x="1"
        y="1"
        width="42"
        height="42"
        rx="10"
        fill="#05080F"
        stroke="url(#avLogoGrad)"
        strokeWidth="2"
      />
      <path
        d="M11 31.5 L21 12.5 L31 31.5"
        stroke="url(#avLogoGrad)"
        strokeWidth="3"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <path
        d="M15.2 25 H26.8"
        stroke="url(#avLogoGrad)"
        strokeWidth="2.4"
        strokeLinecap="square"
      />
      <path
        d="M33 31.5 V12.5"
        stroke="url(#avLogoGrad)"
        strokeWidth="3"
        strokeLinecap="square"
      />

      {/* Wordmark */}
      <text
        x="54"
        y="21"
        fontFamily="Syne, sans-serif"
        fontWeight="800"
        fontSize="15"
        letterSpacing="0.5"
        fill="url(#avWordGrad)"
      >
        ALEC
      </text>
      <text
        x="54"
        y="36"
        fontFamily="JetBrains Mono, monospace"
        fontWeight="500"
        fontSize="9.5"
        letterSpacing="3.4"
        fill="#FF7A18"
      >
        VISUALS
      </text>
      <rect x="126" y="27" width="80" height="1.5" fill="url(#avLogoGrad)" opacity="0.55" />
    </svg>
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