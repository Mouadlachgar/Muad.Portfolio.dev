import type { ReactNode } from "react"
import { Link, useParams } from "react-router"
import { motion } from "motion/react"
import {
  getProject,
  projectNeighbours,
  projectPalette,
  relatedProjects,
  sortedProjects,
  type Project as ProjectT,
} from "@/content/projects"
import { emailLabel } from "@/content/site"
import { usePageMeta } from "@/lib/meta"
import { useHeaderTone } from "@/components/HeaderTone"
import { dur, ease } from "@/lib/motion"
import Img, { mediaUrl } from "@/components/Img"
import Gallery from "@/components/Gallery"
import Reveal from "@/components/Reveal"
import ProjectCard from "@/components/ProjectCard"
import Arrow from "@/components/Arrow"
import CopyEmail from "@/components/CopyEmail"
import SectionHead from "@/components/SectionHead"
import NotFound from "./NotFound"

type MetaProps = {
  label: string
  children: ReactNode
}

function Meta({ label, children }: MetaProps) {
  return (
    <div className="rule grid grid-cols-[7.5rem_1fr] gap-3 py-2.5 lg:block">
      <dt className="t-meta pt-0.5 opacity-60">{label}</dt>
      <dd className="t-small text-[0.9375rem] leading-snug lg:mt-1">
        {children}
      </dd>
    </div>
  )
}

function Chapter({
  n,
  title,
  children,
}: {
  n: string
  title: string
  children: ReactNode
}) {
  return (
    <Reveal
      as="section"
      className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] md:gap-8"
    >
      <h2 className="t-meta pt-1.5 opacity-60">
        ({n}) {title}
      </h2>
      <div className="t-lead max-w-[40ch] text-pretty">{children}</div>
    </Reveal>
  )
}

export default function Project() {
  const { slug } = useParams()
  const project = getProject(slug)
  if (!project) return <NotFound />
  return <CaseStudy key={project.slug} project={project} />
}

function CaseStudy({ project: p }: { project: ProjectT }) {
  useHeaderTone(p.tone.dark ? "dark" : "light")
  usePageMeta({
    title: p.title,
    description: p.shortDescription,
    image: mediaUrl(p.cover.src, 1600),
    type: "article",
  })

  const { prev, next } = projectNeighbours(p.slug)
  const related = relatedProjects(p, 2)
  const palette = projectPalette(p)
  const position = sortedProjects.findIndex((x) => x.slug === p.slug) + 1
  const chapters = [
    { title: "Context", body: p.challenge },
    { title: "Concept", body: p.concept },
    ...(p.execution ? [{ title: "Execution", body: p.execution }] : []),
  ]

  return (
    <article>
      {/* Opening ---------------------------------------------------- */}
      <header
        className="case-hero relative"
        style={{ background: p.tone.bg, color: p.tone.fg }}
      >
        <div className="wrap pb-[clamp(8rem,22vw,20rem)] pt-[calc(var(--header-h)+2.5rem)] md:pt-[calc(var(--header-h)+4rem)]">
          <div className="t-meta grid-site gap-y-1 opacity-80">
            <p className="col-span-2 md:col-span-3">
              <Link to="/work" className="link-reveal">
                Work
              </Link>{" "}
              / {String(position).padStart(2, "0")} of{" "}
              {String(sortedProjects.length).padStart(2, "0")}
            </p>
            <p className="col-span-2 text-right md:col-span-3 md:text-left lg:col-start-6">
              {p.industry}
            </p>
            <p className="hidden md:col-span-2 md:block md:text-right lg:col-span-4">
              {p.year}
            </p>
          </div>
          <h1 className="t-display case-title mt-8 md:mt-14">
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span
                className="block"
                initial={{ y: "104%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: ease.out, delay: 0.1 }}
              >
                {p.title}
              </motion.span>
            </span>
          </h1>
          <div className="grid-site">
            <motion.p
              className="t-lead col-span-4 mt-6 max-w-[36ch] md:col-span-5 md:col-start-4 md:mt-8 lg:col-span-5 lg:col-start-6"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: dur.page, ease: ease.out, delay: 0.35 }}
            >
              {p.shortDescription}
            </motion.p>
          </div>
        </div>
      </header>

      <motion.div
        className="wrap -mt-[clamp(6rem,18vw,17rem)]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: ease.out, delay: 0.25 }}
      >
        <Img
          src={p.cover.src}
          alt={p.cover.alt}
          sizes="100vw"
          priority
          className="case-cover relative"
        />
      </motion.div>

      {/* Body ------------------------------------------------------ */}
      <div className="wrap grid-site mt-16 gap-y-14 md:mt-24">
        <aside
          className="col-span-4 md:col-span-8 lg:col-span-3"
          aria-label="Project details"
        >
          <dl className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
            <Meta label="Client">{p.client}</Meta>
            <Meta label="Year">{p.year}</Meta>
            <Meta label="Industry">{p.industry}</Meta>
            <Meta label="Role">{p.role}</Meta>
            {p.studio ? <Meta label="Studio">{p.studio}</Meta> : null}
            {p.collaborators?.length ? (
              <Meta label="With">{p.collaborators.join(", ")}</Meta>
            ) : null}
            <Meta label="Disciplines">{p.disciplines.join(", ")}</Meta>
            {p.externalLinks?.length ? (
              <Meta label="Links">
                {p.externalLinks.map((l) => (
                  <a
                    key={l.url}
                    href={l.url}
                    target="_blank"
                    rel="noreferrer"
                    className="link-reveal block"
                  >
                    {l.label} ↗
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ))}
              </Meta>
            ) : null}
          </dl>
        </aside>

        <div className="col-span-4 space-y-14 md:col-span-8 md:space-y-20 lg:col-span-8 lg:col-start-5">
          <Reveal>
            <p className="t-h3 max-w-[30ch] text-balance">{p.overview}</p>
          </Reveal>
          {chapters.map((c, i) => (
            <Chapter
              key={c.title}
              n={String(i + 1).padStart(2, "0")}
              title={c.title}
            >
              <p>{c.body}</p>
            </Chapter>
          ))}
          <Chapter
            n={String(chapters.length + 1).padStart(2, "0")}
            title="Visual system"
          >
            <ul className="flex flex-wrap gap-2" aria-label="Deliverables">
              {p.deliverables.map((d) => (
                <li
                  key={d}
                  className="t-meta rounded-full border border-line px-3 py-1.5"
                >
                  {d}
                </li>
              ))}
            </ul>
            {palette.length ? (
              <div className="mt-8">
                <p className="t-meta mb-2 opacity-60">
                  Palette, sampled from the work
                </p>
                <ul className="flex h-20 md:h-28">
                  {palette.map((c) => (
                    <li
                      key={c}
                      className="palette-chip flex flex-1 items-end p-1.5"
                      style={{ background: c }}
                    >
                      <span className="t-meta rounded-[1px] bg-paper/85 px-1 text-[0.625rem] text-ink">
                        {c.toUpperCase()}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </Chapter>
        </div>
      </div>

      {/* Gallery --------------------------------------------------- */}
      <section aria-label="Gallery" className="mt-[var(--section)]">
        <Gallery blocks={p.gallery} />
      </section>

      {p.outcome ? (
        <div className="wrap grid-site mt-[var(--section)]">
          <div className="col-span-4 md:col-span-8 lg:col-span-8 lg:col-start-5">
            <Chapter
              n={String(chapters.length + 2).padStart(2, "0")}
              title="Outcome"
            >
              <p>{p.outcome}</p>
            </Chapter>
          </div>
        </div>
      ) : null}

      {/* Prev / next ----------------------------------------------- */}
      <nav aria-label="More projects" className="wrap mt-[var(--section)]">
        <div className="rule grid gap-y-8 pt-4 md:grid-cols-2 md:gap-x-[var(--gutter)]">
          {[
            { label: "Previous", proj: prev, dir: "left" as const },
            { label: "Next", proj: next, dir: "right" as const },
          ].map(({ label, proj, dir }) => (
            <Link
              key={label}
              to={`/work/${proj.slug}`}
              className={`pager group block ${
                dir === "right" ? "md:text-right" : ""
              }`}
            >
              <span
                className={`t-meta flex items-center gap-2 opacity-60 ${
                  dir === "right" ? "md:justify-end" : ""
                }`}
              >
                {dir === "left" ? <Arrow direction="left" /> : null}
                {label}
                {dir === "right" ? <Arrow /> : null}
              </span>
              <span className="t-h1 pager-title mt-2 block">{proj.title}</span>
              <span className="t-meta mt-1 block opacity-60">
                {proj.categories.join(" / ")} — {proj.year}
              </span>
            </Link>
          ))}
        </div>
      </nav>

      {related.length ? (
        <section
          aria-labelledby="related-title"
          className="wrap mt-[var(--section)]"
        >
          <SectionHead id="related-title" label="Related work" />
          <ul className="grid-site mt-8 gap-y-14">
            {related.map((r, i) => (
              <li
                key={r.slug}
                className={`col-span-4 ${
                  i === 0
                    ? "lg:col-span-7"
                    : "lg:col-span-4 lg:col-start-9 lg:mt-[10vw]"
                }`}
              >
                <ProjectCard
                  project={r}
                  ratio={i === 0 ? "3 / 2" : "4 / 5"}
                  sizes="(min-width: 64rem) 50vw, (min-width: 48rem) 50vw, 100vw"
                />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section aria-labelledby="cta-title" className="wrap mt-[var(--section)]">
        <div className="rule grid-site gap-y-6 pt-4">
          <h2
            id="cta-title"
            className="t-h2 col-span-4 md:col-span-4 lg:col-span-6"
          >
            Something in this{" "}
            <span className="t-serif font-normal italic">direction?</span>
          </h2>
          <div className="col-span-4 md:col-span-4 lg:col-span-6">
            <p className="t-meta mb-2 opacity-60">{emailLabel}</p>
            <CopyEmail size="sm" />
          </div>
        </div>
      </section>
    </article>
  )
}
