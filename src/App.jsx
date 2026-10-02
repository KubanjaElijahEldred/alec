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

export default function App() {
  const [view, setView] = useState('profile')
  const [splashDone, setSplashDone] = useState(false)
  const mainRef = useRef(null)

  useReveal(mainRef)

  const finishSplash = useCallback(() => setSplashDone(true), [])

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [view])

  const goToPage = (next) => {
    setView(next)
    window.location.hash = next === 'profile' ? '' : next
  }

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
            {view === 'contact' && <Contact />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer onView={goToPage} />
      <SocialFab />
    </>
  )
}