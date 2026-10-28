import { useEffect } from "react"
import { site } from "@/content/site"

type Meta = {
  title?: string
  description?: string
  image?: string
  type?: "website" | "article"
}

function setTag(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  )
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

/** Per-route document metadata for the client-rendered app. */
export function usePageMeta({
  title,
  description = site.description,
  image,
  type = "website",
}: Meta) {
  useEffect(() => {
    const full = title
      ? `${title} — ${site.name}`
      : `${site.name} — ${site.tagline}`
    document.title = full
    const url = window.location.origin + window.location.pathname
    setTag("name", "description", description)
    setTag("property", "og:title", full)
    setTag("property", "og:description", description)
    setTag("property", "og:type", type)
    setTag("property", "og:url", url)
    setTag("name", "twitter:card", "summary_large_image")
    if (image)
      setTag(
        "property",
        "og:image",
        new URL(image, window.location.origin).href,
      )

    let canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    )
    if (!canonical) {
      canonical = document.createElement("link")
      canonical.rel = "canonical"
      document.head.appendChild(canonical)
    }
    canonical.href = url
  }, [title, description, image, type])
}
