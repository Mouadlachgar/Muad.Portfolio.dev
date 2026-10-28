import { useEffect, useRef } from "react"
import { motion } from "motion/react"
import type { Photo } from "@/content/playground"
import { dur, ease } from "@/lib/motion"
import Img from "./Img"
import Arrow from "./Arrow"

type Props = {
  photos: Photo[]
  index: number
  onChange: (i: number) => void
  onClose: () => void
}

export default function Lightbox({ photos, index, onChange, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const n = photos.length
  const ph = photos[index]
  const go = (d: number) => onChange((index + d + n) % n)

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = "hidden"
    return () => {
      document.documentElement.style.overflow = prev
      opener?.focus()
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      else if (e.key === "ArrowRight") go(1)
      else if (e.key === "ArrowLeft") go(-1)
      else if (e.key === "Tab" && ref.current) {
        const nodes = [...ref.current.querySelectorAll<HTMLElement>("button")]
        const first = nodes[0]
        const last = nodes[nodes.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  })

  // Basic swipe on touch.
  const startX = useRef<number | null>(null)

  return (
    <motion.div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={`${ph.place}, ${ph.country} — photo ${index + 1} of ${n}`}
      className="fixed inset-0 z-[60] flex flex-col bg-night text-paper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: dur.hover, ease: ease.out }}
      onTouchStart={(e) => (startX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (startX.current == null) return
        const dx = e.changedTouches[0].clientX - startX.current
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
        startX.current = null
      }}
    >
      <div className="wrap t-meta flex h-[var(--header-h)] items-center justify-between">
        <span className="tabular">
          {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="-mr-2 min-h-11 px-2"
        >
          Close <span className="opacity-50">(Esc)</span>
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-[var(--margin)]">
        <motion.div
          key={ph.src}
          className="h-full w-full"
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: dur.hover + 0.08, ease: ease.out }}
        >
          <Img
            src={ph.src}
            alt={ph.alt}
            fit="contain"
            sizes="100vw"
            priority
            className="lightbox-frame h-full w-full"
          />
        </motion.div>
      </div>
      <div className="wrap flex items-center justify-between gap-4 py-4">
        <button
          type="button"
          onClick={() => go(-1)}
          className="t-meta inline-flex min-h-11 items-center gap-2"
          aria-label="Previous photo"
        >
          <Arrow direction="left" /> Prev
        </button>
        <p className="t-meta text-center" aria-live="polite">
          {ph.place}, {ph.country}{" "}
          <span className="tabular opacity-50">— {ph.date}</span>
        </p>
        <button
          type="button"
          onClick={() => go(1)}
          className="t-meta inline-flex min-h-11 items-center gap-2"
          aria-label="Next photo"
        >
          Next <Arrow />
        </button>
      </div>
    </motion.div>
  )
}
