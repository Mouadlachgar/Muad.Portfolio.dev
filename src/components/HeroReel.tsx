import { useEffect, useState } from "react"
import { Link } from "react-router"
import type { Project } from "@/content/projects"
import { useReducedMotionPref } from "@/lib/hooks"
import Img from "./Img"

/**
 * Small framed reel beside the wordmark — "things i make", literally. Crossfades every few
 * seconds; pauses on hover/focus, when the tab is hidden, and for reduced-motion users.
 */
export default function HeroReel({ items }: { items: Project[] }) {
  const reduced = useReducedMotionPref()
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (reduced || paused || items.length < 2) return
    const id = window.setInterval(() => {
      if (!document.hidden) setI((n) => (n + 1) % items.length)
    }, 2800)
    return () => window.clearInterval(id)
  }, [reduced, paused, items.length])

  const p = items[i] ?? items[0]
  if (!p) return null
  return (
    <Link
      to={`/work/${p.slug}`}
      className="hero-reel group block"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-label={`Featured: ${p.title}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-paper-2">
        {items.map((it, n) => (
          <div
            key={it.slug}
            className="hero-reel-slide absolute inset-0"
            data-on={n === i}
          >
            <Img
              src={it.cover.src}
              alt=""
              ratio="4 / 5"
              sizes="(min-width: 64rem) 20vw, 40vw"
              priority={n === 0}
              className="h-full"
            />
          </div>
        ))}
      </div>
      <div
        className="t-meta mt-2 flex justify-between gap-3"
        aria-hidden="true"
      >
        <span>
          ({String(i + 1).padStart(2, "0")}) {p.title}
        </span>
        <span className="opacity-50 tabular">{p.year}</span>
      </div>
    </Link>
  )
}
