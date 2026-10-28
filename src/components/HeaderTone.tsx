import { createContext, useContext, useEffect } from "react"

export type HeaderTone = "light" | "dark"

export const HeaderToneContext = createContext<{
  tone: HeaderTone
  setTone: (t: HeaderTone) => void
  /** True while a full-screen section supplies its own chrome (e.g. the home hero). */
  concealed: boolean
  setConcealed: (c: boolean) => void
}>({
  tone: "light",
  setTone: () => {},
  concealed: false,
  setConcealed: () => {},
})

/** Pages with a dark opening call this so the transparent header stays legible. */
export function useHeaderTone(tone: HeaderTone) {
  const { setTone } = useContext(HeaderToneContext)
  useEffect(() => {
    setTone(tone)
    return () => setTone("light")
  }, [tone, setTone])
}
