import { site, socials, emailLabel, resumeHref } from "@/content/site"
import { usePageMeta } from "@/lib/meta"
import CopyEmail from "@/components/CopyEmail"
import Arrow from "@/components/Arrow"
import SectionHead from "@/components/SectionHead"

const topics = [
  "New identity",
  "Campaign / art direction",
  "Website or product",
  "Motion",
  "Something else",
]

const mailto = (subject: string) =>
  `mailto:${site.email}?subject=${encodeURIComponent(`${subject} — via ${site.wordmark}`)}`

export default function Contact() {
  usePageMeta({
    title: "Contact",
    description: `Get in touch with ${site.name} about identity, art direction, digital and motion work.`,
  })

  return (
    <div className="wrap pt-[calc(var(--header-h)+2.5rem)] md:pt-[calc(var(--header-h)+4rem)]">
      <p className="t-meta">(Contact)</p>
      <h1 className="t-mega mt-4 leading-[0.96]">
        say
        <br />
        hello<span className="t-serif font-normal">.</span>
      </h1>

      <div className="grid-site mt-12 gap-y-12 md:mt-20">
        <div className="col-span-4 md:col-span-8 lg:col-span-7">
          <p className="t-meta mb-2 opacity-60">{emailLabel}</p>
          <CopyEmail />
        </div>
        <p className="t-lead col-span-4 max-w-[32ch] text-mute md:col-span-6 lg:col-span-4 lg:col-start-9">
          The best first emails are short: what it is, roughly when, and a link
          or two if you have them.
        </p>
      </div>

      <section aria-labelledby="topics-title" className="mt-[var(--section)]">
        <SectionHead
          index="01"
          id="topics-title"
          label="Start an email about…"
        />
        <ul className="mt-2">
          {topics.map((t) => (
            <li key={t} className="rule">
              <a
                href={mailto(t)}
                className="exp-row group flex items-center justify-between gap-6 py-4 md:py-5"
              >
                <span className="t-h2">{t}</span>
                <Arrow
                  direction="up-right"
                  className="card-arrow h-6 w-6 md:h-8 md:w-8"
                />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="elsewhere-title"
        className="grid-site mt-[var(--section)] gap-y-10"
      >
        <div className="col-span-4 md:col-span-4 lg:col-span-6">
          <SectionHead index="02" id="elsewhere-title" label="Elsewhere" />
          <ul className="t-h3 mt-6 space-y-1">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="link-u"
                >
                  {s.label}
                </a>
                <span className="sr-only"> (opens in a new tab)</span>
                <span className="t-meta ml-3 opacity-50">{s.handle}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-4 md:col-span-4 lg:col-span-5 lg:col-start-8">
          <SectionHead index="03" label="Résumé" />
          <a href={resumeHref} className="t-h3 link-u mt-6 inline-block">
            {site.resumeUrl ? "Download résumé" : "Request résumé"}
          </a>
        </div>
      </section>
    </div>
  )
}
