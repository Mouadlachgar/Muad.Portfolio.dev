import { useEffect, useState, useSyncExternalStore } from "react"

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(query)
      m.addEventListener("change", cb)
      return () => m.removeEventListener("change", cb)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

/** True for mouse/trackpad devices — pointer-driven effects are limited to these. */
export const useFinePointer = () =>
  useMediaQuery("(hover: hover) and (pointer: fine)")

export const useReducedMotionPref = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)")

export function useLocalTime(timeZone: string) {
  const format = () =>
    new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone,
    }).format(new Date())
  const [time, setTime] = useState(format)
  useEffect(() => {
    let interval: number | undefined
    // Align ticks to the minute so the clock never lags visibly.
    const timeout = window.setTimeout(
      () => {
        setTime(format())
        interval = window.setInterval(() => setTime(format()), 60_000)
      },
      60_000 - (Date.now() % 60_000),
    )
    return () => {
      window.clearTimeout(timeout)
      window.clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeZone])
  return time
}

export function useScrolled(threshold = 24) {
  const [state, setState] = useState({ scrolled: false, hidden: false })
  useEffect(() => {
    let last = window.scrollY
    let ticking = false
    const update = () => {
      const y = window.scrollY
      const goingDown = y > last + 4
      const goingUp = y < last - 4
      setState((s) => {
        const hidden =
          y > 320 ? (goingDown ? true : goingUp ? false : s.hidden) : false
        const scrolled = y > threshold
        return s.hidden === hidden && s.scrolled === scrolled
          ? s
          : { hidden, scrolled }
      })
      last = y
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [threshold])
  return state
}
