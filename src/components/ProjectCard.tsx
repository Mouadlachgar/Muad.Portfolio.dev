import { Link } from "react-router"
import type { Project } from "@/content/projects"
import Img from "./Img"
import Arrow from "./Arrow"

type Props = {
  project: Project
  ratio?: string
  sizes?: string
  priority?: boolean
  index?: number
}

export default function ProjectCard({
  project,
  ratio,
  sizes = "(min-width: 64rem) 50vw, 100vw",
  priority,
  index,
}: Props) {
  return (
    <Link
      to={`/work/${project.slug}`}
      className="group block"
      aria-label={`${project.title} — ${project.shortDescription}`}
    >
      <div className="relative">
        <Img
          src={project.cover.src}
          alt={project.cover.alt}
          ratio={ratio}
          sizes={sizes}
          priority={priority}
          className="hover-zoom"
        />
        <span
          aria-hidden="true"
          className="card-chip t-meta absolute left-3 top-3 px-2 py-1"
          style={{ background: project.tone.bg, color: project.tone.fg }}
        >
          {project.categories.join(" / ")}
        </span>
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-4">
        <h3 className="card-title t-h3 flex items-baseline gap-2">
          {index != null ? (
            <span className="t-meta translate-y-[-0.35em] opacity-50">
              {String(index).padStart(2, "0")}
            </span>
          ) : null}
          <span>{project.title}</span>
          <Arrow className="card-arrow" />
        </h3>
        <span className="t-meta tabular shrink-0 opacity-60">
          {project.year}
        </span>
      </div>
      <p className="t-small mt-1 max-w-[46ch] text-[0.9375rem] leading-snug text-mute">
        {project.shortDescription}
      </p>
    </Link>
  )
}
