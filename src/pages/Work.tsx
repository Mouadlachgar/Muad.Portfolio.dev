import { useMemo } from "react"
import { useSearchParams } from "react-router"
import { AnimatePresence, motion } from "motion/react"
import {
  allCategories,
  projects,
  sortedProjects,
  yearRange,
  type Category,
} from "@/content/projects"
import { usePageMeta } from "@/lib/meta"
import { dur, ease } from "@/lib/motion"
import WorkGrid from "@/components/WorkGrid"
import ProjectIndex from "@/components/ProjectIndex"

type View = "grid" | "index"

type Update = {
  category?: Category | null
  view?: View
}

type Filter = {
  label: string
  value: Category | null
  n: number
}

export default function Work() {
  const [params, setParams] = useSearchParams()
  const raw = params.get("category")
  const category = (allCategories as string[]).includes(raw ?? "")
    ? raw as Category
    : null
  const view: View = params.get("view") === "index" ? "index" : "grid"

  usePageMeta({
    title: category ? `${category} — Work` : "Work",
    description: `Selected projects by Muad Didit across branding, digital, art direction and motion, ${yearRange()}.`,
  })

  const counts = useMemo(
    () =>
      Object.fromEntries(
        allCategories.map((c) => [
          c,
          projects.filter((p) => p.categories.includes(c)).length,
        ]),
      ),
    [],
  ) as Record<Category, number>

  const items = category
    ? sortedProjects.filter((p) => p.categories.includes(category))
    : sortedProjects

  const update = (next: Update) => {
    const p = new URLSearchParams(params)
    if ("category" in next) {
      if (next.category) p.set("category", next.category)
      else p.delete("category")
    }
    if (next.view) {
      if (next.view === "index") p.set("view", "index")
      else p.delete("view")
    }
    setParams(p, { replace: true, preventScrollReset: true })
  }

  const filters: Filter[] = [
    { label: "All", value: null, n: projects.length },
    ...allCategories
      .filter((c) => counts[c] > 0)
      .map((c) => ({ label: c, value: c, n: counts[c] })),
  ]

  return (
    <div className="wrap pt-[calc(var(--header-h)+2.5rem)] md:pt-[calc(var(--header-h)+4rem)]">
      <header className="grid-site items-end gap-y-6">
        <h1 className="t-display col-span-4 md:col-span-5 lg:col-span-7">
          Work
          <sup className="t-meta ml-2 align-top text-[0.8125rem] tabular opacity-60">
            ({String(items.length).padStart(2, "0")})
          </sup>
        </h1>
        <p className="t-lead col-span-4 max-w-[30ch] md:col-span-3 lg:col-span-4 lg:col-start-9">
          Identities, campaigns, interfaces and motion — {yearRange()}. Filter
          by discipline, or switch to the index.
        </p>
      </header>

      <div className="rule mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 pt-3 md:mt-16">
        <div
          role="group"
          aria-label="Filter by discipline"
          className="-ml-1 flex flex-wrap gap-1"
        >
          {filters.map((f) => {
            const active = category === f.value
            return (
              <button
                key={f.label}
                type="button"
                aria-pressed={active}
                onClick={() => update({ category: f.value })}
                className="filter-btn t-meta"
              >
                {f.label}
                <span className="tabular opacity-50">{f.n}</span>
              </button>
            )
          })}
        </div>
        <div role="group" aria-label="Layout" className="flex gap-1">
          {(["grid", "index"] as const).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => update({ view: v })}
              className="filter-btn t-meta capitalize"
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {items.length} {items.length === 1 ? "project" : "projects"}
        {category ? ` in ${category}` : ""}.
      </p>

      <div className="mt-10 md:mt-16">
        {items.length === 0 ? (
          <div className="py-24 text-center">
            <p className="t-h2">Nothing filed here yet.</p>
            <button
              type="button"
              className="t-meta link-reveal mt-6"
              onClick={() => update({ category: null })}
            >
              Show all work
            </button>
          </div>
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={view}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: dur.micro + 0.06, ease: ease.out }}
            >
              {view === "grid" ? (
                <WorkGrid items={items} priorityCount={2} />
              ) : (
                <ProjectIndex items={items} />
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
