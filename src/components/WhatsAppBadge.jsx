import { profile } from '../data'

/** WhatsApp glyph: speech bubble with a handset, drawn to sit flush in a pill. */
function WhatsAppGlyph({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.86 1.21 3.06c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.17 8.17 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.2 8.2 0 0 1 8.24 8.24c0 4.54-3.7 8.23-8.24 8.23z" />
    </svg>
  )
}

/**
 * Official-style verified mark: solid green disc with a white check.
 * Shown next to the WhatsApp action so the channel reads as authenticated.
 */
export function VerifiedTick({ className = 'h-3.5 w-3.5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#25D366" />
      <circle cx="12" cy="12" r="12" fill="none" stroke="#0b1220" strokeWidth="1.5" />
      <path
        d="M7.4 12.3l3 3 6.2-6.4"
        fill="none"
        stroke="#fff"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * Nav call-to-action: WhatsApp with the verified tick.
 * `compact` is the icon-only variant used on small screens.
 */
export function WhatsAppBadge({ compact = false, className = '' }) {
  return (
    <a
      href={profile.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Work with me on WhatsApp — verified business account"
      title="WhatsApp — verified"
      className={`relative inline-flex items-center gap-2 bg-[#25D366] font-display font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#1EBE5A] ${className}`}
    >
      <span className="grid place-items-center">
        <WhatsAppGlyph className={compact ? 'h-[18px] w-[18px]' : 'h-4 w-4'} />
      </span>

      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="text-[11px]">Work with me</span>
          <span className="mt-0.5 font-mono text-[8px] font-medium normal-case tracking-[0.18em] text-white/85">
            Verified
          </span>
        </span>
      )}

      {/* Verified tick, pinned to the glyph corner. */}
      <VerifiedTick
        className={`absolute -right-1 -top-1 h-4 w-4 ${
          compact ? 'ring-2 ring-base' : ''
        }`}
      />
    </a>
  )
}
