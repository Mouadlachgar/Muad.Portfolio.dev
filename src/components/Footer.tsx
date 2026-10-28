import { Link } from "react-router"
import { site, socials, emailLabel, resumeHref } from "@/content/site"
import { navItems } from "./Header"
import Arrow from "./Arrow"

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="wrap overflow-hidden pb-6 pt-24">
      <div className="rule grid-site gap-y-10 pt-4">
        <div className="col-span-4 md:col-span-3 lg:col-span-4">
          <p className="t-meta opacity-60">Index</p>
          <ul className="mt-3 space-y-1">
            <li>
              <Link to="/" className="link-reveal">
                Home
              </Link>
            </li>
            {navItems.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="link-reveal">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-2 md:col-span-2 lg:col-span-3">
          <p className="t-meta opacity-60">Elsewhere</p>
          <ul className="mt-3 space-y-1">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="link-reveal"
                >
                  {s.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-2 md:col-span-3 lg:col-span-3">
          <p className="t-meta opacity-60">{emailLabel}</p>
          <ul className="mt-3 space-y-1">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="link-reveal break-all"
              >
                {site.email}
              </a>
            </li>
            <li>
              <a href={resumeHref} className="link-reveal">
                {site.resumeUrl ? "Résumé (PDF)" : "Request résumé"}
              </a>
            </li>
          </ul>
        </div>
        <div className="col-span-4 flex items-start md:col-span-8 lg:col-span-2 lg:justify-end">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group t-meta inline-flex items-center gap-2"
          >
            Back to top{" "}
            <Arrow
              direction="up"
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="footer-mark t-mega mt-16 select-none whitespace-nowrap"
      >
        things i make<span className="t-serif font-normal">.</span>
      </p>

      <div className="t-meta mt-6 flex flex-wrap justify-between gap-2 opacity-60">
        <span>
          © {year} {site.legalName}
        </span>
        <span>Personal archive / Controlled chaos</span>
      </div>
    </footer>
  )
}
