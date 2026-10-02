import { useEffect } from 'react'

/**
 * Adds `.is-visible` to every `.reveal` element inside `scope` once it
 * scrolls into view.
 *
 * A MutationObserver keeps watching for nodes added later, so content that
 * mounts when the view switches (Services, Contact) is picked up too — a
 * plain IntersectionObserver would only ever see the first view and leave the
 * later sections stuck at opacity 0.
 *
 * @param {React.RefObject<HTMLElement>|HTMLElement} scope
 */
export function useReveal(scope) {
  useEffect(() => {
    const root = scope?.current ?? scope
    if (!root || typeof root.querySelectorAll !== 'function') return

    if (!('IntersectionObserver' in window)) {
      root
        .querySelectorAll('.reveal')
        .forEach((n) => n.classList.add('is-visible'))
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

    const observeWithin = (node) => {
      if (!node || node.nodeType !== 1) return
      if (node.matches('.reveal:not(.is-visible)')) io.observe(node)
      node.querySelectorAll?.('.reveal:not(.is-visible)').forEach((n) => io.observe(n))
    }

    root.querySelectorAll('.reveal:not(.is-visible)').forEach((n) => io.observe(n))

    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => m.addedNodes.forEach(observeWithin))
    })
    mo.observe(root, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [scope])
}