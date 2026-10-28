import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  type CSSProperties,
} from "react"
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react"
import { site } from "@/content/site"
import type { MediaKey } from "@/content/media"
import { useMediaQuery, useReducedMotionPref } from "@/lib/hooks"
import { HeaderToneContext } from "./HeaderTone"
import Img from "./Img"

/*
 * Figma 23:51 (start) -> 23:7 (end). The end card is the start frame scaled by
 * 1187.873 / 1920, so a single composition scales uniformly. Tile geometry is the
 * 1920x1080 reference expressed in percentages (left column x = -48.6px, right
 * column x = 987.7px, tiles 980.95 x 551.78px); portrait screens use the same
 * layout transposed so columns become rows. Tile files are pre-cropped to the
 * 980.95:551.78 frame (incl. the Figma offsets for tiles 1 and 3) to keep decoded
 * bitmaps small.
 */
type Tile = {
  src: MediaKey
  x: number
  y: number
}

const tiles: Tile[] = [
  { src: "hero/1", x: -2.532, y: -41.846 },
  { src: "hero/2", x: -2.532, y: 14.369 },
  { src: "hero/3", x: -2.532, y: 70.583 },
  { src: "hero/4", x: 51.441, y: -18.804 },
  { src: "hero/5", x: 51.441, y: 37.411 },
  { src: "hero/6", x: 51.441, y: 93.626 },
]

const END_SCALE = 1187.873 / 1920
const END_SCALE_PORTRAIT = 0.74
/** Share of the runway spent shrinking; the rest holds the revealed state. */
const SHRINK_END = 0.8

const contacts = [
  ["Instagram", "@muad.didit"],
  ["LinkedIn & Behance", "Mouad Lachgar"],
  ["Mail", site.email],
] as const

export default function PortraitHero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotionPref()
  const portrait = useMediaQuery("(orientation: portrait)")
  const endScale = portrait ? END_SCALE_PORTRAIT : END_SCALE
  const { setConcealed } = useContext(HeaderToneContext)

  const { scrollYProgress, scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })
  const smooth = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 34,
    mass: 0.4,
    restDelta: 0.0005,
  })
  // Reduced motion: no runway, render the revealed state statically.
  const settled = useMotionValue(1)
  const progress = reduced ? settled : smooth
  const t = useTransform(progress, [0, SHRINK_END], [0, 1])
  const scale = useTransform(t, (v) => 1 - (1 - endScale) * v)
  const driftA = useTransform(t, (v) => `${(1 - v) * 9}%`)
  const driftB = useTransform(t, (v) => `${(v - 1) * 9}%`)
  const chrome = useTransform(progress, [0.45, 0.85], [0, 1])

  // The hero carries its own chrome, so hide the site header until it scrolls away.
  const syncHeader = useCallback(() => {
    const el = ref.current
    if (el)
      setConcealed(el.getBoundingClientRect().bottom > window.innerHeight * 0.6)
  }, [setConcealed])
  useMotionValueEvent(scrollY, "change", syncHeader)
  useEffect(() => {
    syncHeader()
    window.addEventListener("resize", syncHeader)
    return () => {
      window.removeEventListener("resize", syncHeader)
      setConcealed(false)
    }
  }, [syncHeader, setConcealed])

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className={`ph relative ${reduced ? "h-svh" : "h-[260svh]"}`}
    >
      <div className="sticky top-0 h-svh overflow-hidden bg-[#171717]">
        <div aria-hidden="true" className="ph-tiles">
          {[driftA, driftB].map((drift, col) => (
            <motion.div
              key={col}
              className="absolute inset-0"
              style={portrait ? { x: drift } : { y: drift }}
            >
              {tiles.slice(col * 3, col * 3 + 3).map((tile) => (
                <div
                  key={tile.src}
                  className="ph-tile"
                  style={
                    {
                      "--x": `${tile.x}%`,
                      "--y": `${tile.y}%`,
                    } as CSSProperties
                  }
                >
                  <Img
                    src={tile.src}
                    alt=""
                    sizes="(orientation: portrait) 60vw, 52vw"
                    className="h-full w-full"
                  />
                </div>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Outer chrome (23:7), revealed on the dark ground */}
        <motion.div
          aria-hidden="true"
          className="ph-outer"
          style={{ opacity: chrome }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="ph-semibold">Mouad.Lachgar ● Portfolio</p>
              <p className="ph-regular">Creative designer - UI/UX designer</p>
            </div>
            <p className="ph-semibold">2026</p>
            <div className="ph-outer-contacts">
              {contacts.map(([k, v]) => (
                <p key={k}>
                  {k} : {v}
                </p>
              ))}
            </div>
          </div>
          <div className="flex items-end justify-between">
            <p className="ph-regular">Mouad.Lachgar ● Portfolio</p>
            <p className="ph-regular ph-landscape">Portfolio</p>
            <p className="ph-regular">2025/26</p>
            <p className="ph-tifinagh">ⵣ</p>
            <p className="ph-regular ph-landscape">Art direction</p>
            <p className="ph-regular ph-landscape">UI/UX</p>
            <p className="ph-regular ph-landscape">
              Creative designer - UI/UX designer
            </p>
          </div>
        </motion.div>

        {/* The card: starts as the full viewport (23:51), shrinks to 23:31 */}
        <motion.div className="ph-card" style={{ scale }}>
          <div className="ph-shot">
            <Img
              src="hero/portrait"
              alt="Portrait of Mouad Lachgar"
              sizes="(orientation: portrait) 110vw, 60vw"
              priority
              className="h-full w-full"
            />
          </div>

          <h1 id="hero-title" className="sr-only">
            Mouad Lachgar (Muad Didit) — portfolio 2025–26. Creative designer,
            UI/UX designer.
          </h1>
          <div aria-hidden="true" className="ph-type">
            <div className="ph-name">
              <span className="ph-paren">(</span>
              <span className="ph-big">
                <span className="block">Mouad</span>
                <span className="block">—Lachgar</span>
              </span>
              <span className="ph-paren">)</span>
              <span className="ph-star">🞼</span>
            </div>
            <div className="ph-folio">
              <span className="ph-big ph-blur">
                <span className="ph-dotslash">./</span>Portfolio
              </span>
              <span className="ph-big ph-blur">2025—26</span>
            </div>
          </div>

          <div className="ph-chrome ph-chrome-top">
            <div aria-hidden="true">
              <p className="ph-semibold">Mouad.Lachgar ● Portfolio</p>
              <p className="ph-regular">Creative designer - UI/UX designer</p>
            </div>
            <p aria-hidden="true" className="ph-semibold">
              2026
            </p>
            <ul className="ph-semibold ph-contacts">
              {contacts.map(([k, v]) => (
                <li key={k}>
                  {k} : {v}
                </li>
              ))}
            </ul>
          </div>
          <div aria-hidden="true" className="ph-chrome ph-chrome-bottom">
            <p>Mouad.Lachgar ● Portfolio</p>
            <p>©Portfolio → 2026</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
