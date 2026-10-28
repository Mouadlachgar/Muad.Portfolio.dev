import { Link, isRouteErrorResponse, useRouteError } from "react-router"
import { sortedProjects } from "@/content/projects"
import { usePageMeta } from "@/lib/meta"
import Wordmark from "@/components/Wordmark"
import Arrow from "@/components/Arrow"

/**
 * Used three ways: the `*` route and unknown project slugs (inside the layout), and as the
 * root error boundary (outside it — so it brings its own minimal frame).
 */
export default function NotFound() {
  const error = useRouteError()
  const standalone = error != null
  const missing =
    !standalone || (isRouteErrorResponse(error) && error.status === 404)
  usePageMeta({ title: missing ? "Not found" : "Something broke" })

  const body = (
    <div className="wrap pb-16 pt-[calc(var(--header-h)+2.5rem)] md:pt-[calc(var(--header-h)+4rem)]">
      <p className="t-meta">{missing ? "(Error 404)" : "(Error)"}</p>
      <h1 className="t-mega mt-4 leading-[0.8]">
        {missing ? (
          <>
            lost<span className="t-serif font-normal">.</span>
          </>
        ) : (
          <>
            oops<span className="t-serif font-normal">.</span>
          </>
        )}
      </h1>
      <div className="grid-site mt-10 gap-y-10 md:mt-16">
        <p className="t-lead col-span-4 max-w-[30ch] md:col-span-4 lg:col-span-5">
          {missing
            ? "This page isn't in the archive — it may have moved, or never existed."
            : "Something went wrong loading this page. Try again, or head back to the archive."}
        </p>
        <nav
          aria-label="Archive"
          className="col-span-4 md:col-span-4 lg:col-span-6 lg:col-start-7"
        >
          <ul className="t-h3 space-y-1">
            <li>
              <Link to="/" className="group inline-flex items-center gap-3">
                <span className="link-u">Back to the index</span>
                <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </li>
            <li>
              <Link to="/work" className="link-u">
                All work
              </Link>
            </li>
            <li>
              <Link to="/playground" className="link-u">
                Playground
              </Link>
            </li>
          </ul>
          <p className="t-meta mt-10 opacity-60">Or try one of these</p>
          <ul className="t-body mt-2 flex flex-wrap gap-x-4 gap-y-1">
            {sortedProjects.slice(0, 5).map((p) => (
              <li key={p.slug}>
                <Link to={`/work/${p.slug}`} className="link-reveal">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )

  if (!standalone) return body
  return (
    <>
      <header className="wrap fixed inset-x-0 top-0 z-50 flex h-[var(--header-h)] items-center">
        <Wordmark />
      </header>
      <main id="main">{body}</main>
    </>
  )
}
