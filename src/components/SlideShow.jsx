import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const INTERVAL = 4500

/* Written out in full rather than composed as `object-${pos}`: Tailwind only
   ships the classes it can see in the source, so a template would be purged. */
const OBJECT_POS = {
  top: 'object-top',
  center: 'object-center',
  bottom: 'object-bottom',
}

const DOTS = {
  center: 'justify-center',
  end: 'justify-end',
  start: 'justify-start',
}

/* The CSS `prefers-reduced-motion` block zeroes out transitions, but it cannot
   reach a JS interval. Autoplay has to be stopped here or it keeps advancing
   for anyone who has asked for less motion. */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = (e) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

export function SlideShow({
  images,
  label,
  className = '',
  frameClass = '',
  objectPos = 'top',
  dots = 'center',
  arrowsClass = '',
}) {
  const count = images.length
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = usePrefersReducedMotion()
  const regionRef = useRef(null)

  const goTo = useCallback(
    (next) => setIndex(((next % count) + count) % count),
    [count],
  )

  /* `index` is a dependency on purpose: after any slide change — autoplay or a
     click — the timer restarts from the top instead of firing again a moment
     later against the slide the visitor just chose. */
  useEffect(() => {
    if (reduced || paused || count < 2) return undefined
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % count),
      INTERVAL,
    )
    return () => window.clearInterval(id)
  }, [reduced, paused, count, index])

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      goTo(index - 1)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      goTo(index + 1)
    }
  }

  if (count === 0) return null

  return (
    <div
      ref={regionRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className={className}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false)
      }}
      onKeyDown={onKeyDown}
    >
      <div className={`relative overflow-hidden bg-card ${frameClass}`}>
        {images.map((img, i) => {
          const active = i === index
          return (
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
              aria-hidden={!active}
              /* object-top for the portrait set: the frame is taller than the
                 sources, so the only crop is lateral and this keeps the full
                 height. Landscape sources pass center instead, where the
                 middle of the frame is the safest thing to keep. */
              className={`absolute inset-0 h-full w-full object-cover ${
                OBJECT_POS[objectPos] || OBJECT_POS.top
              } transition-opacity duration-700 ${
                active ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )
        })}

        {/* Scrim keeps the dot controls legible over a bright frame. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent"
        />

        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Previous slide"
          className={`absolute left-3 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full border border-white/40 bg-black/45 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${arrowsClass}`}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Next slide"
          className={`absolute right-3 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full border border-white/40 bg-black/45 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${arrowsClass}`}
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div
          className={`absolute inset-x-0 bottom-4 z-10 flex items-center gap-2 ${
            DOTS[dots] || DOTS.center
          }`}
        >
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1} of ${count}`}
              aria-current={i === index}
              className={`cursor-pointer rounded-full transition-all ${
                i === index
                  ? 'h-2.5 w-7 bg-white'
                  : 'h-2.5 w-2.5 bg-white/55 hover:bg-white/85'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Screen readers get the position without the slide images' hidden state
          being the only signal. */}
      <p aria-live="polite" className="sr-only">
        Slide {index + 1} of {count}. {images[index].alt}
      </p>
    </div>
  )
}
