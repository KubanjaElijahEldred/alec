import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Menu } from 'lucide-react'
import { Logo } from './Logo'
import { profile } from '../data'

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
      <header className="fixed inset-x-0 top-0 z-50 h-20 border-b border-border-card bg-dark-bg/92 backdrop-blur-md">
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
                    ? 'bg-brand text-white'
                    : 'border border-border-card text-gray-400 hover:border-brand/60 hover:text-white'
                }`}
              >
                {v.label}
              </button>
            ))}
            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white px-4 py-2 font-display text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-brand hover:text-white"
            >
              Work with me
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Work with me on WhatsApp"
              className="grid h-9 w-9 place-items-center border border-border-card text-gray-300 transition-colors hover:border-brand hover:text-white"
            >
              <span className="font-mono text-[10px] font-bold">WA</span>
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              className="nav__burger grid h-9 w-9 cursor-pointer place-items-center border border-border-card text-gray-300"
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
            className="fixed inset-x-0 top-20 z-40 border-b border-border-card bg-dark-bg p-5 md:hidden"
          >
            <div className="grid gap-3">
              {VIEWS.map((v) => (
                <button
                  key={v.id}
                  onClick={() => go(v.id)}
                  className={`cursor-pointer border px-4 py-3 text-left font-display font-bold ${
                    view === v.id
                      ? 'border-brand bg-brand/10 text-white'
                      : 'border-border-card text-white'
                  }`}
                >
                  {v.label}
                </button>
              ))}
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white px-4 py-3 text-center font-display font-bold uppercase tracking-widest text-black"
              >
                Work with me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}