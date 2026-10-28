import { useState } from "react"
import { useSearchParams } from "react-router"
import { AnimatePresence } from "motion/react"
import { photos } from "@/content/playground"
import { usePageMeta } from "@/lib/meta"
import { mediaUrl } from "@/components/Img"
import Img from "@/components/Img"
import Reveal from "@/components/Reveal"
import Lightbox from "@/components/Lightbox"

/** Loose, deliberately uneven placement — repeats every six photos. */
const layout = [
  "col-span-4 md:col-span-5 lg:col-span-5",
  "col-span-3 col-start-2 md:col-span-3 md:mt-[18vw] lg:col-span-3 lg:col-start-8 lg:mt-[10vw]",
  "col-span-2 md:col-span-3 md:col-start-2 lg:col-span-3 lg:col-start-2",
  "col-span-2 mt-[20vw] md:col-span-4 md:col-start-5 md:mt-[8vw] lg:col-span-4 lg:col-start-6",
  "col-span-4 md:col-span-6 md:col-start-3 lg:col-span-6 lg:col-start-4",
  "col-span-3 md:col-span-3 md:col-start-6 lg:col-span-3 lg:col-start-10 lg:mt-[-6vw]",
]

export default function Playground() {
  usePageMeta({
    title: "Playground",
    description:
      "Elsewhere: travel photographs by Muad Didit, 2025—2026. Not projects — just looking.",
    image: mediaUrl(photos[0].src, 1600),
  })
  const [params, setParams] = useSearchParams()
  const view = params.get("view") === "index" ? "index" : "grid"
  const [open, setOpen] = useState<number | null>(null)

  const setView = (v: "grid" | "index") => {
    const p = new URLSearchParams(params)
    if (v === "index") p.set("view", "index")
    else p.delete("view")
    setParams(p, { replace: true, preventScrollReset: true })
  }

  return (
    <div className="wrap pt-[calc(var(--header-h)+2.5rem)] md:pt-[calc(var(--header-h)+4rem)]">
      <header className="grid-site items-end gap-y-6">
        <div className="col-span-4 md:col-span-5 lg:col-span-8">
          <p className="t-meta mb-4">(Playground)</p>
          <h1 className="t-display">
            else<span className="t-serif font-normal italic">where</span>
          </h1>
        </div>
        <p className="t-lead col-span-4 max-w-[30ch] md:col-span-3 lg:col-span-4">
          Photographs from the road, 2025—2026. Twelve places, no brief. Tap any
          frame to look closer.
        </p>
      </header>

      <div className="rule mt-10 flex items-center justify-between pt-3 md:mt-16">
        <p className="t-meta opacity-60">{photos.length} photographs</p>
        <div role="group" aria-label="Layout" className="flex gap-1">
          {(["grid", "index"] as const).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => setView(v)}
              className="filter-btn t-meta capitalize"
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {view === "grid" ? (
        <ul className="grid-site mt-12 items-start gap-y-16 md:mt-20 md:gap-y-24">
          {photos.map((ph, i) => (
            <Reveal as="li" key={ph.src} className={layout[i % layout.length]}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group block w-full text-left"
                aria-label={`View larger: ${ph.alt} ${ph.place}, ${ph.country}.`}
              >
                <Img
                  src={ph.src}
                  alt={ph.alt}
                  sizes="(min-width: 64rem) 40vw, (min-width: 48rem) 60vw, 100vw"
                  className="hover-zoom"
                  priority={i < 2}
                />
                <span
                  className="t-meta mt-2 flex justify-between gap-3"
                  aria-hidden="true"
                >
                  <span>
                    <span className="opacity-50">
                      {String(i + 1).padStart(2, "0")}
                    </span>{" "}
                    {ph.place}, {ph.country}
                  </span>
                  <span className="tabular opacity-50">{ph.date}</span>
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      ) : (
        <ol className="mt-6">
          {photos.map((ph, i) => (
            <li key={ph.src} className="rule">
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="exp-row grid-site group w-full items-center py-3 text-left"
              >
                <span className="t-meta tabular col-span-1 opacity-50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="col-span-1 lg:col-span-1">
                  <Img src={ph.src} alt="" ratio="1 / 1" sizes="80px" />
                </span>
                <span className="t-h3 col-span-2 md:col-span-3 lg:col-span-5">
                  {ph.place}
                </span>
                <span className="t-meta col-span-2 opacity-60 max-md:hidden lg:col-span-3">
                  {ph.country}
                </span>
                <span className="t-meta tabular col-span-1 text-right opacity-60 max-md:hidden lg:col-span-2">
                  {ph.date}
                </span>
              </button>
            </li>
          ))}
        </ol>
      )}

      <AnimatePresence>
        {open != null ? (
          <Lightbox
            photos={photos}
            index={open}
            onChange={setOpen}
            onClose={() => setOpen(null)}
          />
        ) : null}
      </AnimatePresence>
    </div>
  )
}
