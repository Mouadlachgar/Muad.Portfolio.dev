import { useContext, useEffect, useRef, useState } from "react"
import { NavLink, useLocation } from "react-router"
import { AnimatePresence, motion } from "motion/react"
import { site, socials, emailLabel } from "@/content/site"
import { projects } from "@/content/projects"
import { useScrolled } from "@/lib/hooks"
import { dur, ease } from "@/lib/motion"
import { HeaderToneContext } from "./HeaderTone"
import CopyEmail from "./CopyEmail"
import Wordmark from "./Wordmark"
import LocalClock from "./LocalClock"

export const navItems = [
  { to: "/work", label: "Work", count: projects.length },
  { to: "/about", label: "About" },
  { to: "/playground", label: "Playground" },
  { to: "/contact", label: "Contact" },
]

function Roll({ children }: { children: string }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  )
}

export default function Header() {
  const { tone, concealed } = useContext(HeaderToneContext)
  const { scrolled, hidden } = useScrolled()
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const menuButton = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close the menu whenever the route changes.
  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    if (!open) return
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        menuButton.current?.focus()
      }
      // Keep focus inside header + menu while open.
      if (e.key === "Tab" && menuRef.current) {
        const nodes = [
          menuButton.current,
          ...menuRef.current.querySelectorAll<HTMLElement>("a, button"),
        ].filter(Boolean) as HTMLElement[]
        const first = nodes[0]
        const last = nodes[nodes.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.documentElement.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  const solid = scrolled && !open
  const inverted = open || (!solid && tone === "dark")

  return (
    <>
      <header
        data-solid={solid}
        className={`site-header fixed inset-x-0 top-0 z-50 transition-[transform,background-color,color,border-color] duration-500 ease-[var(--ease-out-expo)] focus-within:translate-y-0 ${
          (hidden || concealed) && !open ? "-translate-y-full" : "translate-y-0"
        } ${
          solid
            ? "border-b border-line-soft bg-paper/92 text-ink"
            : "border-b border-transparent"
        } ${inverted ? "text-paper" : "text-ink"}`}
      >
        <div className="wrap grid-site h-[var(--header-h)] items-center">
          <div className="col-span-2 md:col-span-3">
            <Wordmark />
          </div>

          <nav
            aria-label="Primary"
            className="hidden lg:col-span-6 lg:col-start-6 lg:block"
          >
            <ul className="flex items-center gap-7">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className="nav-link group inline-flex items-center gap-1.5 text-[0.9375rem]"
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          aria-hidden="true"
                          className={`h-1.5 w-1.5 rounded-full bg-current transition-[opacity,transform] duration-300 ${
                            isActive
                              ? "scale-100 opacity-100"
                              : "scale-0 opacity-0"
                          }`}
                        />
                        <Roll>{item.label}</Roll>
                        {item.count ? (
                          <sup className="t-meta -ml-0.5 self-start opacity-50">
                            {String(item.count).padStart(2, "0")}
                          </sup>
                        ) : null}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 flex items-center justify-end gap-5 md:col-span-5 lg:col-span-1">
            {site.location ? (
              <LocalClock
                {...site.location}
                className="hidden opacity-70 md:block"
              />
            ) : null}
            <button
              ref={menuButton}
              type="button"
              className="t-meta -mr-2 inline-flex min-h-11 items-center gap-2 px-2 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span className="relative block h-2.5 w-4" aria-hidden="true">
                <span
                  className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-300 ${
                    open ? "translate-y-[5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-300 ${
                    open ? "-translate-y-[4px] -rotate-45" : ""
                  }`}
                />
              </span>
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-40 flex flex-col bg-ink text-paper lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: dur.page, ease: ease.inOut }}
          >
            <nav
              aria-label="Mobile"
              className="wrap flex flex-1 flex-col justify-center pt-[var(--header-h)]"
            >
              <ul>
                {[{ to: "/", label: "Index" }, ...navItems].map((item, i) => (
                  <motion.li
                    key={item.to}
                    className="rule-inv border-t"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: dur.reveal,
                      ease: ease.out,
                      delay: 0.18 + i * 0.05,
                    }}
                  >
                    <NavLink
                      to={item.to}
                      end={item.to === "/"}
                      className="mobile-link flex items-baseline gap-4 py-2.5"
                    >
                      <span className="t-meta w-8 opacity-50">
                        {String(i).padStart(2, "0")}
                      </span>
                      <span className="t-display text-[clamp(3rem,14vw,6rem)]">
                        {item.label}
                      </span>
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <motion.div
              className="wrap rule-inv border-t pb-8 pt-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: dur.reveal }}
            >
              <p className="t-meta mb-2 opacity-50">{emailLabel}</p>
              <CopyEmail size="sm" />
              <ul className="t-meta mt-6 flex flex-wrap gap-x-5 gap-y-2 opacity-70">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="link-reveal"
                    >
                      {s.label} ↗
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
