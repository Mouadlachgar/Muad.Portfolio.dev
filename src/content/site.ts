/**
 * Site-wide profile + contact data. Everything here is either supplied in the brief
 * or verified on mindpulse.framer.website / 25-26tripindex.framer.website.
 * Fields set to `null` are intentionally hidden in the UI until supplied.
 */
type Location = {
  city: string
  short: string
  timeZone: string
}

export const site = {
  name: "Muad Didit",
  legalName: "Mouad Lachgar",
  wordmark: "muad.didit",
  tagline: "things i make",
  description:
    "Muad Didit (Mouad Lachgar) is a graphic designer and art director working across brand identity, digital experiences and campaign art direction.",
  /**
   * Only verified public address available: the Mindpulse studio inbox.
   * Replace with a personal address when supplied (and update `emailLabel`).
   */
  email: "yo@mindpulse.co",
  /**
   * Current base is not confirmed. Set e.g. { city: 'Tangier', short: 'TNG', timeZone: 'Africa/Casablanca' }
   * to show a location + live clock in the header.
   */
  location: null as null | Location,
  /** Set `enabled: true` only when the status is accurate. */
  availability: { enabled: false, label: "Open to select projects" },
  /** Not yet supplied — résumé links fall back to an email request until a PDF is added. */
  resumeUrl: null as string | null,
  /** Portrait not yet supplied. Leave null rather than using an unverified image. */
  portrait: null as string | null,
  experienceYears: 8,
  /** `verified: false` entries are kept for reference but not rendered until confirmed. */
  socials: [
    {
      label: "Instagram",
      handle: "@muad.didit",
      url: "https://www.instagram.com/muad.didit/",
      verified: false,
    },
    {
      label: "Behance",
      handle: "mouadlachgar",
      url: "https://www.behance.net/mouadlachgar",
      verified: false,
    },
    {
      label: "Mindpulse",
      handle: "mindpulse.co",
      url: "https://mindpulse.co",
      verified: true,
    },
    {
      label: "Trip Index",
      handle: "25/26",
      url: "https://25-26tripindex.framer.website",
      verified: true,
    },
  ],
} as const

/** Links safe to publish. */
export const socials = site.socials.filter((s) => s.verified)

/** The only verified inbox is the Mindpulse studio address — always label it as such. */
export const emailLabel = "Studio inbox — Mindpulse"

export const resumeHref =
  site.resumeUrl ??
  `mailto:${site.email}?subject=${encodeURIComponent("Résumé request — Muad Didit")}`

export const practice = [
  {
    id: "identity",
    index: "01",
    title: "Identity",
    summary:
      "Brand identity, visual systems, typography and the applications that make them real.",
    items: [
      "Brand identity",
      "Visual systems",
      "Logotypes & marks",
      "Typography",
      "Packaging",
      "Brand applications",
    ],
    category: "Branding",
  },
  {
    id: "digital",
    index: "02",
    title: "Digital",
    summary:
      "Websites, interfaces and digital experiences — designed and built, often in Framer.",
    items: [
      "Website design",
      "Interface design",
      "Design systems",
      "Framer development",
      "Landing pages",
    ],
    category: "Digital",
  },
  {
    id: "art-direction",
    index: "03",
    title: "Art direction",
    summary:
      "Campaigns, event communication and visual storytelling with a point of view.",
    items: [
      "Campaign art direction",
      "Key visuals",
      "Event communication",
      "Poster series",
      "Creative systems",
    ],
    category: "Art Direction",
  },
  {
    id: "experiments",
    index: "04",
    title: "Experiments",
    summary:
      "Motion, image-making, photography and AI-assisted exploration. The unpaid research.",
    items: [
      "Motion",
      "Image-making",
      "Photography",
      "AI-assisted exploration",
      "Personal work",
    ],
    category: "Motion",
  },
] as const

/** Brands named in the brief as past work, beyond the case studies published here. */
export const otherBrands = [
  "realme",
  "LGaming",
  "TotalEnergies",
  "Saham Bank",
  "Sonara Festival",
  "ODD Collective",
  "Cradle Digitals",
  "Prigma",
  "Analogie",
]

export const tools = [
  "Figma",
  "Framer",
  "Adobe Creative Cloud",
  "Motion tools",
  "AI-assisted image & video workflows",
]
