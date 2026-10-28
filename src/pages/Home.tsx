import type { ReactNode } from "react"
import { Link } from "react-router"
import { motion } from "motion/react"
import {
  featuredProjects,
  sortedProjects,
  projects,
  yearRange,
} from "@/content/projects"
import { site, practice, otherBrands, emailLabel } from "@/content/site"
import { photos } from "@/content/playground"
import { usePageMeta } from "@/lib/meta"
import { mediaUrl } from "@/components/Img"
import { dur, ease } from "@/lib/motion"
import SectionHead from "@/components/SectionHead"
import WorkGrid from "@/components/WorkGrid"
import ProjectIndex from "@/components/ProjectIndex"
import Reveal from "@/components/Reveal"
import Img from "@/components/Img"
import Arrow from "@/components/Arrow"
import CopyEmail from "@/components/CopyEmail"
import PortraitHero from "@/components/PortraitHero"

const fieldNotes = photos.slice(0, 4)
const clients = Array.from(
  new Set([...sortedProjects.map((p) => p.client), ...otherBrands]),
)

export default function Home() {
  usePageMeta({ image: mediaUrl(featuredProjects[0].cover.src, 1600) })
  const count = (c: string) =>
    projects.filter((p) => (p.categories as string[]).includes(c)).length

  return (
    <>
      <PortraitHero />

      {/* Intro ------------------------------------------------------ */}
      <section aria-label="Introduction" className="wrap pt-[var(--section)]">
        <Reveal className="grid-site gap-y-6">
          <p className="t-serif col-span-4 text-[clamp(1.75rem,3.4vw,3.25rem)] leading-none md:col-span-3 lg:col-span-4">
            things i make.
          </p>
          <p className="t-lead col-span-4 max-w-[34ch] md:col-span-5 lg:col-span-5 lg:col-start-6">
            {site.experienceYears}+ years of branding, digital design, art
            direction, motion, campaigns, print and photography — kept here,
            slightly out of order.
          </p>
        </Reveal>
      </section>

      {/* Selected work --------------------------------------------- */}
      <section
        id="selected"
        aria-labelledby="selected-title"
        className="wrap scroll-mt-20 pt-[var(--section)]"
      >
        <SectionHead
          index="01"
          id="selected-title"
          label="Selected work"
          aside={
            <Link to="/work" className="link-reveal">
              {featuredProjects.length} of {projects.length} — all work
            </Link>
          }
        />
        <div className="mt-10 md:mt-16">
          <WorkGrid items={featuredProjects} priorityCount={1} numbered />
        </div>
      </section>

      {/* Full index ------------------------------------------------ */}
      <section
        aria-labelledby="index-title"
        className="wrap pt-[var(--section)]"
      >
        <SectionHead
          index="02"
          id="index-title"
          label="Index"
          aside={`${projects.length} projects, ${yearRange()}`}
        />
        <Reveal className="mt-6">
          <ProjectIndex items={sortedProjects} />
        </Reveal>
      </section>

      {/* Practice -------------------------------------------------- */}
      <section
        aria-labelledby="practice-title"
        className="wrap pt-[var(--section)]"
      >
        <SectionHead
          index="03"
          id="practice-title"
          label="Practice"
          aside="What the work is made of"
        />
        <ul className="mt-6">
          {practice.map((item) => {
            const n = count(item.category)
            return (
              <Reveal
                as="li"
                key={item.id}
                className="practice-row rule grid-site gap-y-4 py-6 md:py-8"
              >
                <p className="t-meta col-span-1 pt-2 opacity-50">
                  {item.index}
                </p>
                <h3 className="t-h2 col-span-3 md:col-span-3 lg:col-span-4">
                  {item.title}
                </h3>
                <p className="t-body col-span-4 max-w-[38ch] text-mute md:col-span-4 md:col-start-5 lg:col-span-3 lg:col-start-6">
                  {item.summary}
                </p>
                <ul className="t-small col-span-4 space-y-0.5 md:col-span-4 md:col-start-5 lg:col-span-2 lg:col-start-9">
                  {item.items.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <div className="col-span-4 md:col-span-8 lg:col-span-2 lg:text-right">
                  {n > 0 ? (
                    <Link
                      to={`/work?category=${encodeURIComponent(item.category)}`}
                      className="t-meta group inline-flex items-center gap-2"
                    >
                      <span className="link-reveal">
                        {n} {n === 1 ? "project" : "projects"}
                      </span>
                      <Arrow className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Link>
                  ) : null}
                </div>
              </Reveal>
            )
          })}
        </ul>
      </section>

      {/* Field notes ----------------------------------------------- */}
      <section
        aria-labelledby="notes-title"
        className="on-dark mt-[var(--section)] bg-night py-[var(--section)] text-paper"
      >
        <div className="wrap">
          <SectionHead
            index="04"
            id="notes-title"
            label="Field notes"
            aside="Photographs, 2025—2026"
          />
          <div className="grid-site mt-10 gap-y-8 md:mt-16">
            <p className="t-display col-span-4 md:col-span-6 lg:col-span-7">
              else<span className="t-serif font-normal italic">where</span>
            </p>
            <div className="col-span-4 self-end md:col-span-2 lg:col-span-3 lg:col-start-10">
              <p className="t-body max-w-[34ch] opacity-70">
                Off the clock and on the road — Manila to Chiang Mai. Not
                projects, just looking.
              </p>
              <Link
                to="/playground"
                className="t-meta group mt-5 inline-flex items-center gap-2"
              >
                <span className="link-reveal">
                  Open the archive ({photos.length})
                </span>
                <Arrow className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
          <ul className="grid-site mt-12 gap-y-10 md:mt-20">
            {fieldNotes.map((ph, i) => (
              <Reveal
                as="li"
                key={ph.src}
                delay={i * 0.06}
                className={
                  [
                    "col-span-2 md:col-span-2 lg:col-span-3",
                    "col-span-2 mt-16 md:col-span-2 lg:col-span-2 lg:col-start-5 lg:mt-28",
                    "col-span-2 md:col-span-2 md:mt-10 lg:col-span-3 lg:col-start-8 lg:mt-6",
                    "col-span-2 mt-16 md:col-span-2 md:mt-24 lg:col-span-2 lg:col-start-11 lg:mt-40",
                  ][i]
                }
              >
                <figure>
                  <Img
                    src={ph.src}
                    alt={ph.alt}
                    sizes="(min-width: 64rem) 25vw, 50vw"
                  />
                  <figcaption className="t-meta mt-2 flex justify-between gap-2 opacity-70">
                    <span>{ph.place}</span>
                    <span className="tabular">{ph.date}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* About preview --------------------------------------------- */}
      <section
        aria-labelledby="about-title"
        className="wrap pt-[var(--section)]"
      >
        <SectionHead index="05" id="about-title" label="About" />
        <div className="grid-site mt-10 gap-y-10 md:mt-16">
          <Reveal className="col-span-4 md:col-span-8 lg:col-span-10">
            <p className="t-h1 text-balance">
              Identities, campaigns and screens for{" "}
              <span className="t-serif font-normal italic">
                festivals, cafés,
              </span>{" "}
              drinks, gyms and trading apps — made by {site.legalName}, working
              as {site.name}.
            </p>
          </Reveal>
          <div className="col-span-4 md:col-span-4 lg:col-span-4 lg:col-start-2">
            <p className="t-meta opacity-60">Selected clients &amp; brands</p>
            <p className="t-body mt-3 max-w-[48ch]">{clients.join(" · ")}</p>
          </div>
          <div className="col-span-4 flex flex-col items-start justify-between gap-6 md:col-span-4 lg:col-span-4 lg:col-start-8">
            <p className="t-body max-w-[42ch] text-mute">
              Recent case studies are credited through the studio Mindpulse,
              alongside long-time collaborators.
            </p>
            <Link
              to="/about"
              className="t-meta group inline-flex items-center gap-2"
            >
              <span className="link-reveal">More about the practice</span>
              <Arrow className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact finale -------------------------------------------- */}
      <section
        aria-labelledby="contact-title"
        className="wrap pt-[var(--section)]"
      >
        <SectionHead index="06" label="Contact" />
        <div className="mt-10 md:mt-16">
          <h2 id="contact-title" className="t-display">
            <Link
              to="/contact"
              className="contact-big group inline-flex items-baseline gap-[0.15em]"
            >
              <span>Say hello</span>
              <Arrow className="contact-big-arrow h-[0.6em] w-[0.6em]" />
            </Link>
          </h2>
          <div className="mt-8 md:mt-10">
            <p className="t-meta mb-2 opacity-60">{emailLabel}</p>
            <CopyEmail />
          </div>
        </div>
      </section>
    </>
  )
}
