import { useEffect, useRef, useState } from 'react'
import { Share2, X, GripVertical } from 'lucide-react'
import { socialLinks } from '../data'
import { Icon } from './Icon'

const SIZE = 60
const BADGE = 52
const MARGIN = 8
const STORE_KEY = 'alec-social-fab-pos'

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v))

/**
 * Draggable social-media button.
 *
 * Tap to fan out the social links; drag anywhere on the page to move the
 * button, and its position is remembered in localStorage.
 */
export function SocialFab() {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE_KEY) || 'null')
      if (saved && Number.isFinite(saved.x)) return saved
    } catch {
      /* ignore */
    }
    return { x: 16, y: 16 }
  })

  const wrapRef = useRef(null)
  const btnRef = useRef(null)
  const drag = useRef({ active: false, moved: false, ox: 0, oy: 0 })

  // Close when clicking outside or pressing Escape.
  useEffect(() => {
    if (!open) return

    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)

    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  // Keep the button inside the viewport after a resize.
  useEffect(() => {
    const onResize = () =>
      setPos((p) => ({
        x: clamp(p.x, MARGIN, window.innerWidth - SIZE - MARGIN),
        y: clamp(p.y, MARGIN, window.innerHeight - SIZE - MARGIN),
      }))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const onPointerDown = (e) => {
    const r = btnRef.current.getBoundingClientRect()
    drag.current = { active: true, moved: false, ox: e.clientX - r.left, oy: e.clientY - r.top }
    btnRef.current.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e) => {
    if (!drag.current.active) return
    const x = clamp(e.clientX - drag.current.ox, MARGIN, window.innerWidth - SIZE - MARGIN)
    const y = clamp(e.clientY - drag.current.oy, MARGIN, window.innerHeight - SIZE - MARGIN)

    if (Math.abs(e.movementX) + Math.abs(e.movementY) > 2) {
      if (!drag.current.moved && open) setOpen(false)
      drag.current.moved = true
    }
    setPos({ x, y })
  }

  const onPointerUp = () => {
    if (!drag.current.active) return
    const wasTap = !drag.current.moved
    drag.current.active = false

    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(pos))
    } catch {
      /* ignore */
    }

    if (wasTap) setOpen((o) => !o)
  }

  /* ---- Radial fan layout ---- */
  const cx = pos.x + SIZE / 2
  const cy = pos.y + SIZE / 2
  const vw = window.innerWidth
  const vh = window.innerHeight

  let angle =
    -90 -
    Math.max(-1, Math.min(1, (cx - vw / 2) / (vw / 2))) * 45
  if (cy < vh / 2) angle = -angle

  const spread = 180
  const step = spread / (socialLinks.length - 1)
  const rad = (deg) => (deg * Math.PI) / 180

  // Pull the fan back inside the viewport if it overflows top or bottom.
  for (let i = 0; i < 36; i++) {
    let over = 0
    let under = 0

    for (let k = 0; k < socialLinks.length; k++) {
      const a = cy + 120 * Math.sin(rad(angle - spread / 2 + step * k))
      over = Math.max(over, a + BADGE / 2 - (vh - MARGIN))
      under = Math.max(under, MARGIN + BADGE / 2 - a)
    }

    if (over === 0 && under === 0) break
    angle -= (over - under) * 0.12
  }

  const badges = socialLinks.map((link, i) => {
    const a = rad(angle - spread / 2 + step * i)
    return {
      ...link,
      x: clamp(cx + 120 * Math.cos(a) - BADGE / 2, MARGIN, vw - BADGE - MARGIN),
      y: clamp(cy + 120 * Math.sin(a) - BADGE / 2, MARGIN, vh - BADGE - MARGIN),
      delay: i * 45,
    }
  })

  return (
    <div className="socialfab" ref={wrapRef}>
      {badges.map((b) => (
        <a
          key={b.id}
          href={b.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`socialfab__badge ${open ? 'is-open' : ''}`}
          data-social={b.label.toLowerCase()}
          style={{
            left: b.x,
            top: b.y,
            '--tone': b.tone,
            transitionDelay: open ? `${b.delay}ms` : '0ms',
            opacity: open ? 1 : 0,
            transform: open ? 'scale(1)' : 'scale(0.4)',
            pointerEvents: open ? 'auto' : 'none',
          }}
          aria-label={b.label}
          title={b.label}
        >
          <Icon name={b.id} className="h-5 w-5" />
        </a>
      ))}

      <button
        ref={btnRef}
        type="button"
        className={`socialfab__btn ${open ? 'is-open' : ''}`}
        style={{ left: pos.x, top: pos.y }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        aria-label="Social links — drag to move, tap to open"
        aria-expanded={open}
        title="Connect — drag me"
      >
        {open ? <X className="h-6 w-6" /> : <Share2 className="h-6 w-6" />}
        <span className="socialfab__grip">
          <GripVertical className="h-3 w-3" />
        </span>
      </button>
    </div>
  )
}