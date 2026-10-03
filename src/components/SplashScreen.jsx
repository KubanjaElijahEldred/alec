import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Aperture, Film, Mic, Disc3 } from 'lucide-react'
import { Logo } from './Logo'

const DURATION = 7000 // 7 seconds, as requested
const FPS = 24

/** 00:00:SS:FF — a real SMPTE-style timecode that tracks elapsed time. */
function timecode(ms) {
  const totalFrames = Math.floor((ms / 1000) * FPS)
  const s = Math.floor(totalFrames / FPS)
  const f = totalFrames % FPS
  const mm = Math.floor(s / 60)
  const ss = s % 60
  const p = (n) => String(n).padStart(2, '0')
  return `${p(mm)}:${p(ss)}:${p(FPS)}:${p(f)}`
}

/** Six-blade aperture iris that opens while the loader plays. */
function Iris({ open }) {
  const blades = 6
  const rotation = open * 132
  const spread = 8 + open * 30 // blades retract outward

  return (
    <svg
      viewBox="0 0 200 200"
      className="h-full w-full"
      aria-hidden="true"
      style={{ transform: `rotate(${rotation}deg)`, transition: 'transform 1.1s cubic-bezier(.16,1,.3,1)' }}
    >
      {Array.from({ length: blades }).map((_, i) => {
        const a = (i / blades) * Math.PI * 2
        const x = 100 + Math.cos(a) * 78
        const y = 100 + Math.sin(a) * 78
        const x2 = 100 + Math.cos(a + 2.1) * 78
        const y2 = 100 + Math.sin(a + 2.1) * 78
        const ix = 100 + Math.cos(a + 1.05) * spread
        const iy = 100 + Math.sin(a + 1.05) * spread
        return (
          <path
            key={i}
            d={`M${x} ${y} L${x2} ${y2} L${ix} ${iy} Z`}
            fill="none"
            stroke="url(#irisGrad)"
            strokeWidth="1.4"
            style={{
              transition: 'all 1.1s cubic-bezier(.16,1,.3,1)',
            }}
          />
        )
      })}
      <defs>
        <linearGradient id="irisGrad" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FF7A18" />
          <stop offset="0.5" stopColor="#FFA45C" />
          <stop offset="1" stopColor="#2E6BFF" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function SplashScreen({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [exiting, setExiting] = useState(false)
  const raf = useRef(0)
  const start = useRef(0)
  const finished = useRef(false)

  // Drive a 0 -> 1 progress value over DURATION with rAF.
  useEffect(() => {
    start.current = performance.now()

    const tick = (now) => {
      const t = now - start.current
      const p = Math.min(t / DURATION, 1)
      setProgress(p)
      setElapsed(t)

      if (p < 1) {
        raf.current = requestAnimationFrame(tick)
      } else if (!finished.current) {
        finished.current = true
        setExiting(true)
        // Keep the splash mounted through its exit animation.
        setTimeout(onDone, 750)
      }
    }

    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [onDone])

  // Let anyone impatient get straight to the portfolio.
  const canSkip = elapsed > 1500
  const canSkipRef = useRef(false)
  canSkipRef.current = canSkip

  // Single exit path, shared by the button and the global listeners. The
  // listeners used to fire during the first 1.5s, while the "Skip intro"
  // button was still deliberately hidden, so any stray tap dismissed the intro
  // before it had a chance to read.
  const skip = useCallback(() => {
    if (finished.current) return
    finished.current = true
    cancelAnimationFrame(raf.current)
    setExiting(true)
    setTimeout(onDone, 750)
  }, [onDone])

  useEffect(() => {
    const onKeyOrTap = () => {
      if (!canSkipRef.current) return
      skip()
    }
    window.addEventListener('keydown', onKeyOrTap)
    window.addEventListener('pointerdown', onKeyOrTap)
    return () => {
      window.removeEventListener('keydown', onKeyOrTap)
      window.removeEventListener('pointerdown', onKeyOrTap)
    }
  }, [skip])

  const pct = Math.round(progress * 100)
  const secondsLeft = Math.max(0, Math.ceil((DURATION - elapsed) / 1000))

  return (
    // splash-opaque, not bg-base: in light mode plain bg-base becomes
    // transparent so the page wash can read through the sections.
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-base splash-opaque"
      initial={{ opacity: 1 }}
      animate={exiting ? { opacity: 0, scale: 1.04 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      role="status"
      aria-label="Loading portfolio"
    >
      {/* Grid + corner glows */}
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-brand/12 blur-[130px]" />
      <div className="pointer-events-none absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-azure/18 blur-[130px]" />
      {/* Scanline sweep */}
      <div className="splash-scan pointer-events-none absolute inset-x-0 h-32 bg-gradient-to-b from-transparent via-azure/8 to-transparent" />

      {/* ---------- Top HUD ---------- */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-2 sm:px-10">
        <span className="flex items-center gap-2">
          <span className="splash-rec inline-block h-2 w-2 rounded-full bg-brand" />
          REC
        </span>
        <span className="hidden sm:inline">4K · 24FPS · LOG</span>
        <span className="tabular-nums text-azure-soft">{timecode(elapsed)}</span>
      </div>

      {/* ---------- Centre: logo + iris + monogram ---------- */}
      <div className="relative flex flex-col items-center">
        {/* Alec's own mark, shown above the iris and sized to stay legible on
            a phone. Theme-aware, so it reads on either splash background. */}
        <motion.div
          className="relative mb-10 flex justify-center sm:mb-12"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="splash-glow pointer-events-none absolute inset-0 rounded-full bg-brand/25 blur-3xl" />
          <Logo className="relative h-28 w-auto drop-shadow-[0_4px_24px_rgba(0,0,0,0.4)] sm:h-40" />
        </motion.div>

        <div className="relative grid h-44 w-44 place-items-center sm:h-56 sm:w-56">
          {/* Iris ring */}
          <div className="absolute inset-0 opacity-70">
            <Iris open={progress} />
          </div>
          {/* Static outer ring */}
          <div
            className="absolute inset-2 rounded-full border border-dashed border-line/10"
            style={{ animation: 'splash-spin 26s linear infinite' }}
          />

          {/* Monogram */}
          <motion.div
            className="relative grid h-24 w-24 place-items-center sm:h-28 sm:w-28"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="splash-glow absolute inset-0 rounded-full bg-brand/20 blur-2xl" />
            <span className="grad-text relative font-display text-5xl font-black sm:text-6xl">
              AV
            </span>
          </motion.div>
        </div>

        {/* Title */}
        <motion.h1
          className="mt-9 text-center font-display text-2xl font-black tracking-[0.18em] text-ink sm:text-3xl"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          ALEC <span className="grad-text">VISUALS</span>
        </motion.h1>

        <motion.p
          className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          Videography · Content · Social Media
        </motion.p>

        {/* Audio waveform */}
        <div className="mt-7 flex h-8 items-end gap-[3px]" aria-hidden="true">
          {Array.from({ length: 34 }).map((_, i) => (
            <motion.span
              key={i}
              className="w-[3px] bg-gradient-to-t from-azure to-brand"
              initial={{ height: 3 }}
              animate={{
                height: [
                  3,
                  4 + ((i * 7) % 26),
                  6 + ((i * 13) % 20),
                  4 + ((i * 5) % 28),
                  3,
                ],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: (i % 9) * 0.07,
              }}
            />
          ))}
        </div>
      </div>

      {/* ---------- Bottom: timeline + progress ---------- */}
      <div className="absolute inset-x-0 bottom-0 px-5 pb-6 sm:px-10 sm:pb-8">
        {/* Film sprocket strip */}
        <div className="splash-sprockets mb-3 h-3 w-full overflow-hidden opacity-25" aria-hidden="true" />

        {/* Scrubber */}
        <div className="relative h-1 w-full bg-ink/8">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand via-azure to-white"
            style={{ width: `${pct}%` }}
          />
          {/* Playhead */}
          <div
            className="absolute top-1/2 h-4 w-[2px] -translate-y-1/2 bg-ink shadow-[0_0_10px_rgba(255,255,255,0.8)]"
            style={{ left: `${pct}%` }}
          />
          {/* Keyframes */}
          {[25, 50, 75].map((k) => (
            <span
              key={k}
              className="absolute top-1/2 h-2 w-[2px] -translate-y-1/2 bg-ink/25"
              style={{ left: `${k}%` }}
            />
          ))}
        </div>

        {/* Meta row */}
        <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.24em] text-muted-2">
          <span className="flex items-center gap-3">
            <Film className="h-3.5 w-3.5 text-brand" />
            Loading reel
          </span>
          <span className="flex items-center gap-3">
            <Disc3 className="h-3.5 w-3.5 text-brand" />
            <Aperture className="h-3.5 w-3.5 text-brand" />
            <Mic className="h-3.5 w-3.5 text-brand" />
          </span>
          <span className="tabular-nums">
            {String(pct).padStart(3, '0')}%{' '}
            <span className="hidden text-faint sm:inline">
              · {secondsLeft}s left
            </span>
          </span>
        </div>
      </div>

      {/* Skip hint */}
      <button
        type="button"
        onClick={skip}
        className={`absolute right-5 top-14 border border-line bg-card/80 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.24em] text-muted-2 backdrop-blur transition-all duration-500 hover:border-brand hover:text-ink sm:right-10 ${
          canSkip ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        Skip intro
      </button>
    </motion.div>
  )
}