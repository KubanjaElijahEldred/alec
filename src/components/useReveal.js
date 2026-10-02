import { useEffect } from 'react'

/**
 * Adds `.is-visible` to every `.reveal` element inside `scope` once it
 * scrolls into view. Mirrors the observer behaviour of the reference design.
 *
 * @param {React.RefObject<HTMLElement>|HTMLElement} scope
 */
export function useReveal(scope) {
  useEffect(() => {
    const root = scope?.current ?? scope
    if (!root || typeof root.querySelectorAll !== 'function') return

    const nodes = root.querySelectorAll('.reveal')

    if (!('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.classList.add('is-visible'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    )

    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [scope])
}