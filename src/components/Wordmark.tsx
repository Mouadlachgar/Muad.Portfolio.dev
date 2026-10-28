import { Link } from "react-router"
import { site } from "@/content/site"

/** Typographic wordmark — the dot drops and the letters widen on hover. */
export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      aria-label={`${site.name} — home`}
      className={`wordmark inline-flex items-baseline ${className}`}
    >
      <span className="wordmark-text">muad</span>
      <span className="wordmark-dot" aria-hidden="true">
        .
      </span>
      <span className="wordmark-text">didit</span>
    </Link>
  )
}
