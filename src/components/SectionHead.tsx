import type { ReactNode } from "react"

type Props = {
  index?: string
  label: string
  aside?: ReactNode
  className?: string
  id?: string
}

/** Thin rule + index + label. The quiet structural device used across every page. */
export default function SectionHead({
  index,
  label,
  aside,
  className = "",
  id,
}: Props) {
  return (
    <div className={`rule grid-site items-baseline pt-3 ${className}`}>
      <p className="t-meta col-span-1 opacity-60 lg:col-span-1">
        {index ? `(${index})` : ""}
      </p>
      <h2 id={id} className="t-meta col-span-2 md:col-span-4 lg:col-span-5">
        {label}
      </h2>
      {aside ? (
        <div className="t-meta col-span-1 text-right opacity-60 md:col-span-3 lg:col-span-6">
          {aside}
        </div>
      ) : null}
    </div>
  )
}
