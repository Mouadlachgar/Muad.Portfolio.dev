import { Link } from "react-router"
import { sortedProjects } from "@/content/projects"
import {
  site,
  practice,
  otherBrands,
  tools,
  socials,
  emailLabel,
  resumeHref,
} from "@/content/site"
import { usePageMeta } from "@/lib/meta"
import SectionHead from "@/components/SectionHead"
import Reveal from "@/components/Reveal"
import Arrow from "@/components/Arrow"
import CopyEmail from "@/components/CopyEmail"

const approach = [
  {
    title: "Start with the idea, not the moodboard.",
    body: "Every system here begins with one sentence about what the brand is for. The visuals have to earn their place against it.",
  },
  {
    title: "Design the whole surface.",
    body: "A logo is the smallest part of an identity. The work lives on posters, packaging, screens, stages and in a feed at 2am.",
  },
  {
    title: "Leave some edges rough.",
    body: "Controlled chaos: a strict structure underneath, and enough friction on top that people actually look.",
  },
]

export default function About() {
  usePageMeta({
    title: "About",
    description: `${site.legalName}, working as ${site.name}: graphic designer and art director with ${site.experienceYears}+ years across branding, digital, art direction and motion.`,
  })

  return (
    <div className="wrap pt-[calc(var(--header-h)+2.5rem)] md:pt-[calc(var(--header-h)+4rem)]">
      <header className="grid-site gap-y-8">
        <p className="t-meta col-span-4 md:col-span-8 lg:col-span-12">
          (About)
        </p>
        <h1 className="t-h1 col-span-4 text-balance md:col-span-8 lg:col-span-11">
          {site.legalName} works as{" "}
          <span className="t-serif font-normal italic">{site.name}</span> — a
          graphic designer and art director making identities, campaigns,
          interfaces and moving image.
        </h1>
      </header>

      <section
        aria-labelledby="bio-title"
        className="grid-site mt-16 gap-y-8 md:mt-24"
      >
        <h2
          id="bio-title"
          className="t-meta col-span-4 opacity-60 md:col-span-2 lg:col-span-3"
        >
          Biography
        </h2>
        <div className="t-lead col-span-4 max-w-[44ch] space-y-5 md:col-span-6 lg:col-span-6 lg:col-start-5">
          <p>
            For more than {site.experienceYears} years, Mouad has worked across
            branding, digital design, art direction, motion, campaigns, print
            and photography — usually several at once.
          </p>
          <p className="text-mute">
            His recent work, credited through the studio Mindpulse, includes
            identities for music events and festivals, a café in Tangier, a
            functional hydration brand, a fitness platform and a run of Web3
            products. The common thread is a preference for type-led systems
            with a bit of noise in them.
          </p>
        </div>
      </section>

      <section aria-labelledby="exp-title" className="mt-[var(--section)]">
        <SectionHead
          index="01"
          id="exp-title"
          label="Credited work"
          aside="Case studies on this site"
        />
        <ul className="mt-4">
          {sortedProjects.map((p) => (
            <li key={p.slug} className="rule">
              <Link
                to={`/work/${p.slug}`}
                className="exp-row grid-site group items-baseline gap-y-1 py-3.5"
              >
                <span className="t-meta tabular col-span-1 opacity-60">
                  {p.year}
                </span>
                <span className="t-h3 col-span-3 md:col-span-3 lg:col-span-4">
                  {p.title}
                </span>
                <span className="t-small col-span-3 col-start-2 text-[0.9375rem] text-mute md:col-span-3 md:col-start-auto lg:col-span-4">
                  {p.role}
                </span>
                <span className="t-meta col-span-1 flex items-center justify-end gap-2 opacity-60 max-md:hidden lg:col-span-3">
                  {p.studio ? `Studio: ${p.studio}` : ""}
                  <Arrow className="card-arrow" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="clients-title"
        className="grid-site mt-[var(--section)] gap-y-8"
      >
        <h2
          id="clients-title"
          className="t-meta col-span-4 opacity-60 md:col-span-2 lg:col-span-3"
        >
          Selected clients &amp; brands
        </h2>
        <Reveal className="col-span-4 md:col-span-6 lg:col-span-9">
          <p className="t-h2 text-balance">
            {otherBrands.map((b, i) => (
              <span key={b}>
                {b}
                {i < otherBrands.length - 1 ? (
                  <span className="t-serif font-normal text-mute"> / </span>
                ) : null}
              </span>
            ))}
          </p>
        </Reveal>
      </section>

      <section aria-labelledby="disc-title" className="mt-[var(--section)]">
        <SectionHead index="02" id="disc-title" label="Disciplines" />
        <div className="grid-site mt-8 gap-y-10">
          {practice.map((d) => (
            <Reveal
              key={d.id}
              className="col-span-4 md:col-span-4 lg:col-span-3"
            >
              <p className="t-meta opacity-50">{d.index}</p>
              <h3 className="t-h3 mt-2">{d.title}</h3>
              <ul className="t-body mt-4 space-y-0.5 text-mute">
                {d.items.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-labelledby="approach-title" className="mt-[var(--section)]">
        <SectionHead index="03" id="approach-title" label="Approach" />
        <ol className="mt-4">
          {approach.map((a, i) => (
            <Reveal
              as="li"
              key={a.title}
              className="rule grid-site gap-y-3 py-6 md:py-8"
            >
              <span className="t-meta col-span-1 pt-2 opacity-50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="t-h3 col-span-3 md:col-span-4 lg:col-span-5">
                {a.title}
              </h3>
              <p className="t-body col-span-4 max-w-[44ch] text-mute md:col-span-3 lg:col-span-4 lg:col-start-8">
                {a.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section
        aria-labelledby="tools-title"
        className="grid-site mt-[var(--section)] gap-y-10"
      >
        <div className="col-span-4 md:col-span-4 lg:col-span-5">
          <SectionHead index="04" id="tools-title" label="Tools" />
          <ul className="mt-6 flex flex-wrap gap-2">
            {tools.map((t) => (
              <li
                key={t}
                className="t-meta rounded-full border border-line px-3 py-1.5"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-4 md:col-span-4 lg:col-span-5 lg:col-start-8">
          <SectionHead index="05" label="Résumé" />
          <p className="t-body mt-6 max-w-[40ch] text-mute">
            {site.resumeUrl
              ? "A full CV is available as a PDF."
              : "A full CV is available on request."}
          </p>
          <a
            href={resumeHref}
            className="t-meta group mt-4 inline-flex items-center gap-2"
          >
            <span className="link-reveal">
              {site.resumeUrl ? "Download résumé" : "Request by email"}
            </span>
            <Arrow className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </div>
      </section>

      <section aria-labelledby="about-contact" className="mt-[var(--section)]">
        <SectionHead index="06" id="about-contact" label="Contact" />
        <div className="grid-site mt-8 gap-y-8">
          <div className="col-span-4 md:col-span-8 lg:col-span-8">
            <p className="t-meta mb-2 opacity-60">{emailLabel}</p>
            <CopyEmail />
          </div>
          <ul className="t-body col-span-4 space-y-1 md:col-span-8 lg:col-span-3 lg:col-start-10">
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
        </div>
      </section>
    </div>
  )
}
