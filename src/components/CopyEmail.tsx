import { useEffect, useRef, useState } from "react"
import { site } from "@/content/site"

type Props = {
  className?: string
  size?: "lg" | "sm"
}

/** Email link + copy-to-clipboard, with an announced confirmation. */
export default function CopyEmail({ className = "", size = "lg" }: Props) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
    } catch {
      // Fallback for browsers that block the async clipboard API.
      const input = document.createElement("textarea")
      input.value = site.email
      document.body.appendChild(input)
      input.select()
      document.execCommand("copy")
      input.remove()
    }
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 2200)
  }

  return (
    <div className={`flex flex-wrap items-end gap-x-6 gap-y-3 ${className}`}>
      <a
        href={`mailto:${site.email}`}
        className={`link-u ${size === "lg" ? "t-h2" : "t-h3"} break-all`}
      >
        {site.email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="t-meta mb-[0.4em] inline-flex items-center gap-2 rounded-full border border-current px-3.5 py-2 transition-colors duration-200 hover:bg-[currentColor]/10"
      >
        <span
          className="relative inline-block h-1.5 w-1.5 rounded-full bg-current"
          aria-hidden="true"
        />
        {copied ? "Copied" : "Copy email"}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </div>
  )
}
