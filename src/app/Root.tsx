import { useCallback, useEffect, useRef, useState } from "react"
import {
  Outlet,
  ScrollRestoration,
  useLocation,
  useNavigation,
} from "react-router"
import { MotionConfig, motion } from "motion/react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { HeaderToneContext, type HeaderTone } from "@/components/HeaderTone"
import { dur, ease } from "@/lib/motion"

export default function Root() {
  const location = useLocation()
  const [tone, setToneState] = useState<HeaderTone>("light")
  const setTone = useCallback((t: HeaderTone) => setToneState(t), [])
  const [concealed, setConcealedState] = useState(false)
  const setConcealed = useCallback((c: boolean) => setConcealedState(c), [])
  const mainRef = useRef<HTMLElement>(null)
  const lastPath = useRef(location.pathname)
  const navigation = useNavigation()
  const loading = navigation.state === "loading"

  // Move focus to the new page on client-side navigation (not on first load).
  useEffect(() => {
    if (lastPath.current === location.pathname) return
    lastPath.current = location.pathname
    if (!location.hash) mainRef.current?.focus({ preventScroll: true })
  }, [location.pathname, location.hash])

  return (
    <MotionConfig reducedMotion="user">
      <HeaderToneContext.Provider
        value={{ tone, setTone, concealed, setConcealed }}
      >
        <a href="#main" className="skip-link t-meta">
          Skip to content
        </a>
        <div
          aria-hidden="true"
          className="route-progress"
          data-loading={loading}
        />
        <Header />
        <motion.main
          id="main"
          ref={mainRef}
          tabIndex={-1}
          key={location.pathname}
          className="outline-none"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur.page, ease: ease.out }}
        >
          <Outlet />
        </motion.main>
        <Footer />
        <ScrollRestoration />
      </HeaderToneContext.Provider>
    </MotionConfig>
  )
}
