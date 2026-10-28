import { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { Link } from "react-router"
import type { Project } from "@/content/projects"
import { useFinePointer, useReducedMotionPref } from "@/lib/hooks"
import Img, { mediaUrl } from "./Img"
import Arrow from "./Arrow"

type Props = {
  items: Project[]
  className?: string
}

const PREVIEW_W = () => Math.min(420, Math.max(260, window.innerWidth * 0.24))
const RATIO = 5 / 4 // height / width

/**
 * Signature interaction: an editorial index where hovering a title reveals the work in a
 * floating frame that trails the pointer. Pointer-only enhancement — on touch devices each
 * row shows a static thumbnail instead; keyboard focus anchors the preview beside the row.
 */
export default function ProjectIndex({ items, className = "" }: Props) {
  const fine = useFinePointer()
  const reduced = useReducedMotionPref()
  const [active, setActive] = useState<number | null>(null)
  const [armed, setArmed] = useState(false)
  const frame = useRef<HTMLDivElement>(null)
  const target = useRef({ x: 0, y: 0 })
  const pos = useRef({ x: 0, y: 0, r: 0 })
  const raf = useRef<number | null>(null)
  const snapped = useRef(false)

  const tick = useCallback(() => {
    const el = frame.current
    if (!el) {
      raf.current = null
      return
    }
    const k = reduced ? 1 : 0.14
    const p = pos.current
    const dx = target.current.x - p.x
    const dy = target.current.y - p.y
    p.x += dx * k
    p.y += dy * k
    // A little tilt from horizontal velocity — the "slightly grotesque" wobble.
    const tilt = reduced ? 0 : Math.max(-5, Math.min(5, dx * 0.04))
    p.r += (tilt - p.r) * 0.12
    el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.r}deg)`
    if (Math.abs(dx) + Math.abs(dy) + Math.abs(p.r) > 0.2) {
      raf.current = requestAnimationFrame(tick)
    } else {
      raf.current = null
    }
  }, [reduced])

  const moveTo = useCallback(
    (x: number, y: number) => {
      const w = PREVIEW_W()
      const h = w * RATIO
      const m = 16
      target.current = {
        x: Math.min(window.innerWidth - w - m, Math.max(m, x - w / 2)),
        y: Math.min(window.innerHeight - h - m, Math.max(m, y - h / 2)),
      }
      if (!snapped.current) {
        // First appearance: start at the target instead of sliding in from the corner.
        pos.current = { ...target.current, r: 0 }
        snapped.current = true
      }
      if (raf.current == null) raf.current = requestAnimationFrame(tick)
    },
    [tick],
  )

  useEffect(
    () => () => {
      if (raf.current != null) cancelAnimationFrame(raf.current)
    },
    [],
  )

  // Hide the preview if the page scrolls out from under the pointer.
  useEffect(() => {
    if (active == null) return
    const onScroll = () => setActive(null)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [active])

  const showPreview = fine && armed

  return (
    <>
      <ol
        className={`project-index ${className}`}
        data-has-active={active != null || undefined}
        onPointerEnter={() => fine && setArmed(true)}
        onPointerMove={(e) => {
          if (fine && e.pointerType === "mouse") moveTo(e.clientX, e.clientY)
        }}
        onPointerLeave={() => {
          setActive(null)
          snapped.current = false
        }}
      >
        {items.map((p, i) => (
          <li
            key={p.slug}
            data-active={active === i || undefined}
            className="project-index-row rule"
          >
            <Link
              to={`/work/${p.slug}`}
              className="grid-site group items-center py-4 md:py-5 lg:py-6"
              onPointerEnter={() => fine && setActive(i)}
              onFocus={(e) => {
                if (!fine) return
                setArmed(true)
                setActive(i)
                const r = e.currentTarget.getBoundingClientRect()
                snapped.current = false
                moveTo(r.right - PREVIEW_W() / 2 - 24, r.top + r.height / 2)
              }}
              onBlur={() => setActive(null)}
            >
              <span className="index-num t-meta col-span-1 self-start pt-[0.6em] opacity-50 max-md:hidden">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="index-thumb col-span-1">
                <Img src={p.cover.src} alt="" ratio="1 / 1" sizes="25vw" />
              </span>
              <span className="index-title col-span-2 md:col-span-4 lg:col-span-6">
                <span className="block">{p.title}</span>
              </span>
              <span className="t-small col-span-2 hidden text-[0.9375rem] leading-snug opacity-60 lg:col-span-3 lg:block">
                {p.disciplines.slice(0, 3).join(", ")}
              </span>
              <span className="t-meta col-span-1 flex items-center justify-end gap-3 md:col-span-3 lg:col-span-2">
                <span className="hidden md:inline opacity-60">
                  {p.categories[0]}
                </span>
                <span className="tabular">{p.year}</span>
                <Arrow className="index-arrow hidden md:inline-block" />
              </span>
            </Link>
          </li>
        ))}
      </ol>

      {showPreview
        ? createPortal(
            <div
              ref={frame}
              aria-hidden="true"
              className="index-preview"
              data-visible={active != null}
              style={{ width: `min(420px, max(260px, 24vw))` }}
            >
              <div
                className="index-preview-inner"
                style={{ aspectRatio: `1 / ${RATIO}` }}
              >
                {items.map((p, i) => (
                  <img
                    key={p.slug}
                    src={mediaUrl(p.cover.src, 800)}
                    alt=""
                    decoding="async"
                    data-on={active === i}
                    style={{ backgroundColor: p.tone.bg }}
                  />
                ))}
                {items.map((p, i) => (
                  <span
                    key={p.slug}
                    className="index-preview-label t-meta"
                    data-on={active === i}
                    style={{ background: p.tone.bg, color: p.tone.fg }}
                  >
                    {p.client} — {p.year}
                  </span>
                ))}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  )
}
