import { AnimatePresence, motion } from "motion/react"
import type { Project } from "@/content/projects"
import { dur, ease } from "@/lib/motion"
import ProjectCard from "./ProjectCard"

/**
 * Editorial rhythm for the work grid — five slots that repeat. Spans, offsets and crops
 * vary on purpose so the archive reads like a spread, not a catalogue.
 */
const rhythm = [
  {
    cls: "md:col-span-5 lg:col-span-7",
    ratio: "5 / 4",
    sizes: "(min-width: 64rem) 58vw, (min-width: 48rem) 62vw, 100vw",
  },
  {
    cls: "md:col-span-3 lg:col-span-4 lg:col-start-9 md:mt-[22vw] lg:mt-[16vw]",
    ratio: "4 / 5",
    sizes: "(min-width: 64rem) 33vw, (min-width: 48rem) 38vw, 100vw",
  },
  {
    cls: "md:col-span-4 lg:col-span-5 lg:col-start-2",
    ratio: "4 / 5",
    sizes: "(min-width: 64rem) 42vw, (min-width: 48rem) 50vw, 100vw",
  },
  {
    cls: "md:col-span-4 lg:col-span-6 lg:col-start-7 md:mt-[10vw]",
    ratio: "3 / 2",
    sizes: "(min-width: 64rem) 50vw, (min-width: 48rem) 50vw, 100vw",
  },
  {
    cls: "md:col-span-8 lg:col-span-10 lg:col-start-2",
    ratio: "21 / 9",
    sizes: "(min-width: 64rem) 84vw, 100vw",
  },
]

type Props = {
  items: Project[]
  priorityCount?: number
  numbered?: boolean
}

export default function WorkGrid({
  items,
  priorityCount = 0,
  numbered = false,
}: Props) {
  return (
    <ul className="grid-site gap-y-16 md:gap-y-24 lg:gap-y-32">
      <AnimatePresence mode="popLayout" initial={false}>
        {items.map((p, i) => {
          const slot = rhythm[i % rhythm.length]
          return (
            <motion.li
              key={p.slug}
              layout="position"
              className={`col-span-4 ${slot.cls}`}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: dur.micro } }}
              transition={{
                duration: dur.reveal,
                ease: ease.out,
                delay: Math.min(i, 4) * 0.05,
              }}
            >
              <ProjectCard
                project={p}
                ratio={slot.ratio}
                sizes={slot.sizes}
                priority={i < priorityCount}
                index={numbered ? i + 1 : undefined}
              />
            </motion.li>
          )
        })}
      </AnimatePresence>
    </ul>
  )
}
