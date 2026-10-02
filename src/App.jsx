import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { Profile } from './components/Profile'
import { Services } from './components/Services'
import { Contact } from './components/Contact'
import { SocialFab } from './components/SocialFab'
import { SplashScreen } from './components/SplashScreen'
import { useReveal } from './components/useReveal'

const VIEWS = ['profile', 'services', 'contact']

/** Read a view id out of the URL hash, ignoring anything unrecognised. */
function viewFromHash() {
  const id = window.location.hash.replace(/^#/, '')
  return VIEWS.includes(id) ? id : 'profile'
}

export default function App() {
  const [view, setView] = useState(viewFromHash)
  const [splashDone, setSplashDone] = useState(false)
  const mainRef = useRef(null)

  useReveal(mainRef)

  const finishSplash = useCallback(() => setSplashDone(true), [])

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [view])

  // goToPage used to write the hash without anything ever reading it, so a
  // reload or a shared /#services link always landed back on Profile and the
  // browser Back button moved the URL without moving the view.
  useEffect(() => {
    const onHashChange = () => setView(viewFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const goToPage = useCallback((next) => {
    if (!VIEWS.includes(next)) return
    setView(next)
    // 'replace' for Profile keeps a bare '#' out of the URL, and keeps Back
    // stepping through the pages the visitor actually visited.
    if (next === 'profile') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
    } else if (window.location.hash.replace(/^#/, '') !== next) {
      window.location.hash = next
    }
  }, [])

  return (
    <>
      {!splashDone && <SplashScreen onDone={finishSplash} />}

      <Nav view={view} onView={goToPage} />

      <main ref={mainRef} className="pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {view === 'profile' && <Profile goToPage={goToPage} />}
            {view === 'services' && <Services goToPage={goToPage} />}
            {view === 'contact' && <Contact goToPage={goToPage} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer onView={goToPage} />
      <SocialFab />
    </>
  )
}