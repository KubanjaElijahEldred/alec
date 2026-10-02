import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Menu } from 'lucide-react'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'
import { WhatsAppBadge } from './WhatsAppBadge'

const VIEWS = [
  { id: 'profile', label: 'Profile' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
]

export function Nav({ view, onView }) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (!e.target.closest('.nav__burger')) {
        menuRef.current?.contains(e.target) || setOpen(false)
      }
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const go = (id) => {
    onView(id)
    setOpen(false)
  }

  return (
    <>
      {/* The bar keeps its blue gradient in both themes, so the mark is always
          the white knockout and the controls are always white-on-blue. */}
      <header className="fixed inset-x-0 top-0 z-50 h-20 border-b border-white/15 bg-gradient-to-r from-[#0A2470] via-[#1447B8] to-[#0B1E52] shadow-[0_12px_44px_-16px_rgba(20,71,184,0.85)]">
        {/* Glossy top edge, to read as a lit surface rather than a flat bar. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/12 to-transparent" />

        <div className="relative flex h-20 w-full items-center justify-between px-5 lg:px-10">
          <button
            type="button"
            onClick={() => go('profile')}
            className="flex cursor-pointer items-center gap-3"
            aria-label="Go to profile section"
          >
            <Logo tone="dark" className="h-14 w-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] sm:h-16" />
          </button>

          <div className="hidden items-center gap-3 md:flex">
            {VIEWS.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => go(v.id)}
                className={`cursor-pointer px-4 py-2 font-mono text-[10px] uppercase tracking-[0.24em] transition-colors ${
                  view === v.id
                    ? 'bg-white text-[#0A2470] shadow-[0_0_20px_rgba(255,255,255,0.45)]'
                    : 'border border-white/35 text-white/85 hover:border-white hover:bg-white/10 hover:text-white'
                }`}
              >
                {v.label}
              </button>
            ))}
            <ThemeToggle tone="dark" />
            <WhatsAppBadge className="px-4 py-2 text-xs" />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle tone="dark" />
            <WhatsAppBadge compact className="h-9 w-9 justify-center" />
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="nav__burger grid h-9 w-9 cursor-pointer place-items-center border border-white/35 text-white transition-colors hover:border-white hover:bg-white/10"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed inset-x-0 top-20 z-40 border-b border-white/15 bg-gradient-to-b from-[#1447B8] to-[#0B1E52] p-5 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.6)] md:hidden"
          >
            <div className="grid gap-3">
              {VIEWS.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => go(v.id)}
                  className={`cursor-pointer border px-4 py-3 text-left font-display font-bold text-white transition-colors ${
                    view === v.id
                      ? 'border-white bg-white text-[#0A2470]'
                      : 'border-white/30 hover:border-white hover:bg-white/10'
                  }`}
                >
                  {v.label}
                </button>
              ))}
              <WhatsAppBadge className="px-4 py-3 justify-center text-sm" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}