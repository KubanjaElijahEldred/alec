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
      <header className="fixed inset-x-0 top-0 z-50 h-20 border-b border-line bg-base/92 backdrop-blur-md">
        <div className="flex h-20 w-full items-center justify-between px-5 lg:px-10">
          <button
            onClick={() => go('profile')}
            className="flex cursor-pointer items-center gap-3"
            aria-label="Go to profile section"
          >
            <Logo className="h-12 w-auto" />
          </button>

          <div className="hidden items-center gap-3 md:flex">
            {VIEWS.map((v) => (
              <button
                key={v.id}
                onClick={() => go(v.id)}
                className={`cursor-pointer px-4 py-2 font-mono text-[10px] uppercase tracking-[0.24em] transition-colors ${
                  view === v.id
                    ? 'bg-brand text-on-brand'
                    : 'border border-line text-muted hover:border-brand/60 hover:text-ink'
                }`}
              >
                {v.label}
              </button>
            ))}
            <ThemeToggle />
            <WhatsAppBadge className="px-4 py-2 text-xs" />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <WhatsAppBadge compact className="h-9 w-9 justify-center" />
            <button
              onClick={() => setOpen((o) => !o)}
              className="nav__burger grid h-9 w-9 cursor-pointer place-items-center border border-line text-ink-2"
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
            className="fixed inset-x-0 top-20 z-40 border-b border-line bg-base p-5 md:hidden"
          >
            <div className="grid gap-3">
              {VIEWS.map((v) => (
                <button
                  key={v.id}
                  onClick={() => go(v.id)}
                  className={`cursor-pointer border px-4 py-3 text-left font-display font-bold ${
                    view === v.id
                      ? 'border-brand bg-brand/10 text-ink'
                      : 'border-line text-ink'
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