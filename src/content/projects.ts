import { media, type MediaKey } from "./media"

/**
 * Project content model.
 * Source of truth for all case studies: copy is paraphrased from the published Mindpulse
 * case studies (mindpulse.framer.website/projects), where Mouad Lachgar is credited.
 * Studio-reported metrics are intentionally NOT included: they could not be independently
 * verified. Add them to `outcome` only once confirmed.
 */

export type Category = "Branding" | "Digital" | "Art Direction" | "Motion"

export type ExternalLink = {
  label: string
  url: string
}

export type Figure = {
  src: MediaKey
  alt: string
  caption?: string
}

export type GalleryBlock = {
  kind: "full"
  figure: Figure
} | {
  kind: "inset"
  figure: Figure
} | {
  kind: "pair"
  figures: [Figure, Figure]
  weight?: "left" | "right" | "even"
} | {
  kind: "trio"
  figures: [Figure, Figure, Figure]
} | {
  kind: "offset"
  figure: Figure
  side: "left" | "right"
  note?: string
}

export type Tone = {
  /** Background used for the case-study opening and hover accents. */
  bg: string
  fg: string
  accent: string
  dark: boolean
}

export type Project = {
  slug: string
  title: string
  year: number
  client: string
  industry: string
  shortDescription: string
  overview: string
  categories: Category[]
  disciplines: string[]
  role: string
  studio?: string
  collaborators?: string[]
  cover: Figure
  thumbnail?: MediaKey
  gallery: GalleryBlock[]
  video?: string
  tone: Tone
  featured: boolean
  sortOrder: number
  challenge: string
  concept: string
  execution?: string
  deliverables: string[]
  outcome?: string
  externalLinks?: ExternalLink[]
}

const mindpulse = "Mindpulse"
const source = (slug: string) => ({
  label: "Studio case study",
  url: `https://mindpulse.co/projects/${slug}`,
})

export const projects: Project[] = [
  {
    slug: "wtr-one",
    title: "WTR ONE",
    year: 2026,
    client: "WTR ONE",
    industry: "Beverage / Lifestyle",
    shortDescription:
      "Identity for a premium functional hydration brand — blunt type, sport shot as street culture.",
    overview:
      "WTR ONE is a premium, functional hydration brand. The identity was developed from concept through launch: wordmark, packaging, campaign imagery and social content.",
    categories: ["Branding", "Art Direction"],
    disciplines: ["Brand identity", "Packaging", "Campaign visuals"],
    role: "Creative direction, brand identity",
    studio: mindpulse,
    collaborators: ["Ben Sliman"],
    cover: {
      src: "wtr-one/1",
      alt: "Two athletes drinking from WTR ONE bottles against a blue sky, one holding a football.",
    },
    gallery: [
      {
        kind: "pair",
        weight: "even",
        figures: [
          {
            src: "wtr-one/2",
            alt: "Athlete mid-stride in front of an oversized stacked WTR ONE wordmark on a blue background.",
            caption: "The stacked wordmark, scaled to poster size.",
          },
          {
            src: "wtr-one/5",
            alt: "Red WTR ONE Repair bottle lying among ice cubes on a red surface.",
            caption: "Label system — product info treated like a spec sheet.",
          },
        ],
      },
      {
        kind: "offset",
        side: "right",
        figure: {
          src: "wtr-one/4",
          alt: "Basketball player holding a black WTR ONE bottle and a ball under a hoop.",
        },
        note: "Sport, shot as street culture.",
      },
      {
        kind: "full",
        figure: {
          src: "wtr-one/6",
          alt: "Two athletes sitting on a bench in front of a graffiti wall with WTR ONE bottles and a branded cool box.",
        },
      },
      {
        kind: "inset",
        figure: {
          src: "wtr-one/3",
          alt: "Hand taking a WTR ONE bottle from an olive-green cool box printed with the wordmark.",
          caption: "Merch and props carry the same blunt typography.",
        },
      },
    ],
    tone: { bg: "#2f66c9", fg: "#f4f2ed", accent: "#ff4b3e", dark: true },
    featured: true,
    sortOrder: 1,
    challenge:
      "Functional drinks are booming and the shelf is crowded. The identity had to grab attention, communicate purpose and build a premium lifestyle association — for a global audience.",
    concept:
      "A blunt, stacked wordmark that can hold a whole poster on its own. Bottles labelled like spec sheets. Sport photographed as street culture: courts, graffiti walls, cool boxes — premium without the gloss.",
    deliverables: [
      "Brand identity",
      "Wordmark",
      "Packaging & labels",
      "Campaign visuals",
      "Social content",
    ],
    outcome:
      "A system built to position WTR ONE as premium, active and aspirational — flexible enough to move between sport and lifestyle contexts.",
    externalLinks: [source("wtr-one")],
  },
  {
    slug: "waffle-and-co",
    title: "Waffle&Co",
    year: 2026,
    client: "Waffle&Co",
    industry: "Food & Beverage",
    shortDescription:
      "A loud pink identity for a design-led café in Tangier — from takeaway box to car boot.",
    overview:
      "Waffle&Co is a modern, design-led café in Tangier: fresh sandwiches, cold-pressed juices and indulgent treats, served as one clean, vibrant experience.",
    categories: ["Branding"],
    disciplines: ["Brand identity", "Packaging", "Art direction"],
    role: "Creative direction, brand identity",
    studio: mindpulse,
    collaborators: ["Saad Berrada", "Ben Sliman"],
    cover: {
      src: "waffle-and-co/1",
      alt: "Woman winking at a pink table, holding a Waffle&Co juice bottle and iced coffee cup.",
    },
    gallery: [
      {
        kind: "full",
        figure: {
          src: "waffle-and-co/2",
          alt: "Stacked black Waffle&Co delivery boxes with large pink condensed lettering.",
          caption: "Black and bubblegum: the whole system in two colours.",
        },
      },
      {
        kind: "trio",
        figures: [
          {
            src: "waffle-and-co/3",
            alt: "Hands toasting with four Waffle&Co cold-pressed juice bottles on a city street.",
          },
          {
            src: "waffle-and-co/5",
            alt: "Man laughing with Waffle&Co stickers on his face, holding an iced drink and juice bottle.",
          },
          {
            src: "waffle-and-co/6",
            alt: "Waffle&Co sandwich in a pink sleeve with iced coffee and a red juice on a pink table.",
          },
        ],
      },
      {
        kind: "offset",
        side: "left",
        figure: {
          src: "waffle-and-co/4",
          alt: "Open boot of a black vintage Mercedes filled with pink Waffle&Co boxes, plates reading WAFFLES.",
        },
        note: "Simple enough for a sticker, bold enough to fill a car boot.",
      },
    ],
    tone: { bg: "#f3b4cb", fg: "#171717", accent: "#171717", dark: false },
    featured: true,
    sortOrder: 2,
    challenge:
      "Create a food brand that feels fresh, contemporary and premium without losing approachability — clear, appetising and shareable in a competitive café and fast-casual market.",
    concept:
      "Bubblegum pink against black, heavy condensed lettering and a waffle-grid monogram. Clean layouts, strong type, instant recognition — and enough attitude to be photographed.",
    deliverables: [
      "Brand identity",
      "Monogram",
      "Packaging",
      "Juice labels",
      "Menus",
      "Store & social visuals",
    ],
    outcome:
      "A cohesive visual language that moves from menu boards and packaging to interiors and social media — street to screen.",
    externalLinks: [source("waffle-and-co")],
  },
  {
    slug: "glitched",
    title: "Glitched",
    year: 2025,
    client: "Insane Prod",
    industry: "Music Event",
    shortDescription:
      "A nocturnal identity for a Moroccan late-night music brand. Neon, noise and a lot of green.",
    overview:
      "Glitched is a Moroccan music brand curating immersive late-night experiences that fuse heavy soundscapes with cinematic design.",
    categories: ["Branding", "Art Direction", "Motion"],
    disciplines: [
      "Visual identity",
      "Poster series",
      "Motion graphics",
      "Stage visuals",
    ],
    role: "Creative direction, identity, motion",
    studio: mindpulse,
    cover: {
      src: "glitched/4",
      alt: "Green neon GLITCHED! sign glowing inside a dark club.",
    },
    gallery: [
      {
        kind: "full",
        figure: {
          src: "glitched/1",
          alt: "DJ performing in front of a distorted green GLITCHED LED screen.",
          caption: "Signal interference as a typographic system.",
        },
      },
      {
        kind: "pair",
        weight: "right",
        figures: [
          {
            src: "glitched/3",
            alt: "Hands filming the green neon sign on a phone.",
          },
          {
            src: "glitched/2",
            alt: "Grid of Glitched event posters for artists including Nandu, Luke Garcia and Lehar.",
            caption: "Poster series — one system, many line-ups.",
          },
        ],
      },
      {
        kind: "pair",
        weight: "even",
        figures: [
          {
            src: "glitched/5",
            alt: "Crowd dancing under green and violet laser lines.",
          },
          {
            src: "glitched/6",
            alt: "DJ booth beneath a circular green neon Glitched sign.",
          },
        ],
      },
    ],
    tone: { bg: "#07160b", fg: "#d9ffe1", accent: "#3cff7a", dark: true },
    featured: true,
    sortOrder: 3,
    challenge:
      "Stand out in a crowded nightlife scene with an identity as raw as the nights themselves — one that builds anticipation online and still holds up in a dark room at 3am.",
    concept:
      "The name became the method. Signal interference, distorted letterforms and acid-green light give every touchpoint the same unstable energy, from the poster series to the neon sign at the door.",
    deliverables: [
      "Visual identity",
      "Poster artwork",
      "Motion graphics",
      "Stage visuals",
      "Neon signage",
      "Social campaigns",
    ],
    outcome:
      "Consistency across digital campaigns, social media and live branding moved Glitched beyond a party series and towards a cultural brand with a loyal audience.",
    externalLinks: [source("glitched")],
  },
  {
    slug: "metaglow",
    title: "Metaglow",
    year: 2025,
    client: "Metaglow",
    industry: "AI Solutions Studio",
    shortDescription:
      "A monochrome sub-brand for Mindpulse's AI studio, opening with one line: AI is not magic.",
    overview:
      "Metaglow is Mindpulse's AI innovation studio, exploring generative imagery, video, intelligent agents and custom tools — a sub-brand that keeps a design-led, human-centred approach.",
    categories: ["Branding", "Digital"],
    disciplines: ["Brand identity", "Website", "Asset framework"],
    role: "Creative direction, identity, web",
    studio: mindpulse,
    collaborators: ["Ben Sliman", "Hamza Daou"],
    cover: {
      src: "metaglow/2",
      alt: "Person walking past a black-and-white Metaglow billboard with a pixel-cut wordmark.",
    },
    gallery: [
      {
        kind: "inset",
        figure: {
          src: "metaglow/1",
          alt: "Laptop on an articulated arm showing the Metaglow site headline: AI is not magic.",
          caption: "The website opens with the positioning, not a promise.",
        },
      },
      {
        kind: "pair",
        weight: "left",
        figures: [
          {
            src: "metaglow/6",
            alt: "Man in a black cap with a debossed Metaglow M patch.",
          },
          {
            src: "metaglow/5",
            alt: "Close-up portrait in shadow with the white Metaglow M symbol overlaid.",
          },
        ],
      },
      {
        kind: "offset",
        side: "right",
        figure: {
          src: "metaglow/3",
          alt: "Phone with the Metaglow site tucked into a black technical jacket pocket.",
        },
        note: "Closer to a fashion label than a tech startup.",
      },
      {
        kind: "inset",
        figure: {
          src: "metaglow/4",
          alt: "Small black Metaglow box on a sharp black-and-white architectural corner.",
        },
      },
    ],
    tone: { bg: "#121212", fg: "#ecebe7", accent: "#ffffff", dark: true },
    featured: false,
    sortOrder: 4,
    challenge:
      "Launch an AI-first studio that feels technically credible and creatively premium — with clear positioning and a narrative that turns complex capabilities into something people can actually understand.",
    concept:
      "Strict black and white, a pixel-cut wordmark and a sculptural M. No glowing brains, no gradients: the brand treats AI as a craft tool, and says so in its first line.",
    deliverables: [
      "Brand identity",
      "Symbol & wordmark",
      "Website",
      "Asset framework",
      "Merchandise",
    ],
    outcome:
      "A distinct studio positioned between AI, creativity and tooling, with one system able to present generative images, video, agents and custom tools.",
    externalLinks: [source("metaglow-agency")],
  },
  {
    slug: "secret-events",
    title: "Secret Events",
    year: 2024,
    client: "Secret Events",
    industry: "Music Festival",
    shortDescription:
      "Butterflies, roses and pink dunes — a surreal identity for an electronic music series in Morocco.",
    overview:
      "Secret Events has carved out a place in Morocco's electronic music scene by pairing international talent with local style — every edition planned as a one-off moment.",
    categories: ["Branding", "Art Direction"],
    disciplines: [
      "Visual identity",
      "Key visuals",
      "Billboards",
      "Event communication",
    ],
    role: "Creative direction, identity",
    studio: mindpulse,
    cover: {
      src: "secret-events/3",
      alt: "Wide Secret Events key visual: painted birds, butterflies and roses above pink sand dunes with the Marrakech line-up.",
    },
    gallery: [
      {
        kind: "pair",
        weight: "left",
        figures: [
          {
            src: "secret-events/2",
            alt: "Secret Events billboard against a blue sky.",
            caption: "Out of the club, onto the roadside.",
          },
          {
            src: "secret-events/5",
            alt: "Secret Events eye logo surrounded by butterflies and roses.",
          },
        ],
      },
      {
        kind: "full",
        figure: {
          src: "secret-events/4",
          alt: "Glowing red mushroom-shaped stage structure in a dark venue.",
        },
      },
      {
        kind: "pair",
        weight: "even",
        figures: [
          {
            src: "secret-events/1",
            alt: "Three DJs posing in front of a red inflatable stage backdrop.",
          },
          {
            src: "secret-events/6",
            alt: "Two DJs at the decks under warm orange light.",
          },
        ],
      },
    ],
    tone: { bg: "#ecd2c6", fg: "#2b1a1a", accent: "#c23a45", dark: false },
    featured: true,
    sortOrder: 5,
    challenge:
      "Unify the brand across digital and physical touchpoints, build excitement for each upcoming edition, and speak to local crowds and international music lovers at the same time.",
    concept:
      "Instead of the usual nightlife darkness, a dreamlike botanical world: an all-seeing eye mark, painterly birds and flowers, and a soft pink desert that points straight at Marrakech.",
    deliverables: [
      "Visual identity",
      "Eye mark",
      "Key visuals",
      "Billboards",
      "Motion graphics",
      "Social storytelling",
    ],
    outcome:
      "A recognisable creative direction carried from billboard to dance floor — and a brand that reads as more than just another event.",
    externalLinks: [source("secret-events")],
  },
  {
    slug: "awake-fest",
    title: "Awake Fest",
    year: 2024,
    client: "Insane Prod",
    industry: "Music Events",
    shortDescription:
      "Identity and 3D world for a two-night electronic music festival in Marrakech.",
    overview:
      "Awake is an electronic music gathering in Marrakech: two nights where international names and local talent share the stage with art and sensory production.",
    categories: ["Branding", "Art Direction"],
    disciplines: ["Brand identity", "3D visuals", "Line-up communication"],
    role: "Creative direction, identity, 3D visuals",
    studio: mindpulse,
    cover: {
      src: "awake-fest/1",
      alt: "Crowd with raised arms facing a stage lit in violet and blue under a giant glowing disc.",
    },
    gallery: [
      {
        kind: "inset",
        figure: {
          src: "awake-fest/5",
          alt: "Awake wordmark with tagline Awaken your senses between iridescent 3D rings.",
          caption:
            "The key visual: an iridescent form, part ring, part organism.",
        },
      },
      {
        kind: "full",
        figure: {
          src: "awake-fest/3",
          alt: "The 3D ring rendered as a huge stage centrepiece behind the DJ.",
          caption: "From poster to stage.",
        },
      },
      {
        kind: "pair",
        weight: "right",
        figures: [
          {
            src: "awake-fest/4",
            alt: "Close-up of a DJ’s hands on the mixer.",
          },
          {
            src: "awake-fest/2",
            alt: "Angled grid of violet Awake artist line-up cards.",
          },
        ],
      },
      {
        kind: "full",
        figure: {
          src: "awake-fest/6",
          alt: "DJ performing under violet light and scaffolding above the crowd.",
        },
      },
    ],
    tone: { bg: "#1b0f4d", fg: "#efeaff", accent: "#9d7bff", dark: true },
    featured: false,
    sortOrder: 6,
    challenge:
      "Give the festival a presence that matches its scale — one that cuts through a saturated festival calendar, sparks excitement and carries audiences from line-up discovery to ticket purchase.",
    concept:
      "An iridescent 3D form sits at the centre of everything. It starts as the key visual and ends up as the stage itself, so the identity becomes the thing the crowd is standing in front of.",
    deliverables: [
      "Brand identity",
      "3D key visual",
      "Stage visuals",
      "Line-up cards",
      "Posters",
      "Social campaigns",
    ],
    outcome:
      "Posters, stage visuals and social campaigns carried the same confident energy, giving Awake a recognisable presence in Morocco’s cultural calendar long before the gates opened.",
    externalLinks: [source("awake-fest")],
  },
  {
    slug: "trezn",
    title: "TREZN",
    year: 2024,
    client: "Trezn App",
    industry: "Web3 / Trading Platform",
    shortDescription:
      "Brand and product design for a self-custody trading platform built on clarity and control.",
    overview:
      "TREZN is a self-custody trading platform built for speed, clarity and trust: funds stay in the user's wallet, trades stay transparent, control stays with the user.",
    categories: ["Branding", "Digital"],
    disciplines: ["Brand identity", "Design system", "UI/UX", "Landing page"],
    role: "Creative direction, identity, UI/UX",
    studio: mindpulse,
    collaborators: ["Hamza Daou", "Ben Sliman"],
    cover: {
      src: "trezn/1",
      alt: "Silhouetted people in front of a huge lavender TRUST billboard with the TREZN 3D emblem.",
    },
    gallery: [
      {
        kind: "pair",
        weight: "even",
        figures: [
          {
            src: "trezn/2",
            alt: "Glossy TREZN app icon floating within concentric rounded squares.",
          },
          {
            src: "trezn/3",
            alt: "Close-up of an iPhone home screen showing the Trezn app icon with a notification badge.",
          },
        ],
      },
      {
        kind: "full",
        figure: {
          src: "trezn/4",
          alt: "Hands holding a tablet showing the TREZN landing page: Trade. Trust. Triumph.",
          caption: "Landing page — calm, near-black, one accent.",
        },
      },
      {
        kind: "offset",
        side: "left",
        figure: {
          src: "trezn/5",
          alt: "Designer using a stylus on a tablet displaying the TREZN dashboard.",
        },
        note: "One modular system: type, colour, icons, components.",
      },
      {
        kind: "inset",
        figure: {
          src: "trezn/6",
          alt: "Person in a dark T-shirt printed with the Trezn logo.",
        },
      },
    ],
    tone: { bg: "#0d0e1b", fg: "#e8e7ff", accent: "#a8a2ff", dark: true },
    featured: true,
    sortOrder: 7,
    challenge:
      "In a crypto market where trust decides adoption, make self-custody trading feel approachable, professional and visibly trustworthy — through onboarding, dashboard and trade flows.",
    concept:
      "Everything starts from one promise: clarity and control. A calm near-black interface, a single soft lavender accent and a modular design system — typography, colour, iconography and UI components — built to communicate transparency.",
    execution:
      "The identity and UI were applied across the landing page, marketing assets and social visuals, then delivered as a scalable framework ready for new features, dashboards and campaigns.",
    deliverables: [
      "Brand identity",
      "Design system",
      "Iconography",
      "App UI",
      "Landing page",
      "Marketing & social assets",
    ],
    externalLinks: [source("trezn")],
  },
  {
    slug: "bodytek",
    title: "Bodytek",
    year: 2024,
    client: "Bodytek",
    industry: "Fitness & Health",
    shortDescription:
      "Identity and website for a tech-powered training studio. Thirty-minute sessions, glass-blue energy.",
    overview:
      "Bodytek redesigns the training experience with guided, technology-powered sessions that work every major muscle group in thirty minutes.",
    categories: ["Digital", "Branding"],
    disciplines: ["Brand identity", "Website", "UI/UX"],
    role: "Creative direction, identity, web design",
    studio: mindpulse,
    collaborators: ["Wassim Ben"],
    cover: {
      src: "bodytek/1",
      alt: "Athlete leaping through a giant glowing blue glass Bodytek symbol on black.",
    },
    gallery: [
      {
        kind: "full",
        figure: {
          src: "bodytek/2",
          alt: "Bodytek website on desktop and mobile: Entraînement avec Bodytek.",
          caption: "From first impression to booking, in one flow.",
        },
      },
      {
        kind: "pair",
        weight: "left",
        figures: [
          {
            src: "bodytek/3",
            alt: "The Bodytek symbol rendered as luminous blue glass.",
          },
          {
            src: "bodytek/6",
            alt: "Close crop of an athlete in a black training suit with the white Bodytek symbol.",
          },
        ],
      },
      {
        kind: "offset",
        side: "right",
        figure: {
          src: "bodytek/5",
          alt: "Woman stretching in a lunge in blue activewear against a deep blue background.",
        },
        note: "Athletes framed in deep blue light.",
      },
      {
        kind: "inset",
        figure: {
          src: "bodytek/4",
          alt: "Laptop on a blue sofa displaying the Bodytek homepage.",
        },
      },
    ],
    tone: { bg: "#03131f", fg: "#e3f4ff", accent: "#3fb8ff", dark: true },
    featured: false,
    sortOrder: 8,
    challenge:
      "Stand out in a saturated fitness market with an instantly recognisable brand, and a website that guides people smoothly from first impression to membership sign-up.",
    concept:
      "A luminous glass symbol and athletes framed in deep blue light. The same energetic, professional tone runs from studio walls and merchandise to the booking flow.",
    deliverables: [
      "Brand identity",
      "Symbol",
      "Website",
      "Studio visuals",
      "Merchandise",
      "Social campaigns",
    ],
    outcome:
      "A unified presence across physical and digital touchpoints that builds trust and excitement before a client ever walks in.",
    externalLinks: [source("bodytek")],
  },
  {
    slug: "xgc-labs",
    title: "XGC Labs",
    year: 2023,
    client: "XGC Labs",
    industry: "Web3 Solutions",
    shortDescription:
      "Identity and platform for a Web3 venture studio on the XRP Ledger.",
    overview:
      "XGC Labs is a Web3 venture studio accelerating projects on the XRP Ledger, combining capital, strategy and design to help founders bring products to market.",
    categories: ["Digital", "Branding"],
    disciplines: ["Brand identity", "Website", "App UI", "Pitch decks"],
    role: "Creative direction, identity, UI/UX",
    studio: mindpulse,
    collaborators: ["Hamza Daou", "Rahil Ounjare"],
    cover: {
      src: "xgc-labs/1",
      alt: "Dark corridor with two illuminated XGC Labs posters: Built for builders. Powered by purpose.",
    },
    gallery: [
      {
        kind: "pair",
        weight: "even",
        figures: [
          {
            src: "xgc-labs/2",
            alt: "Glossy black XGC app icon on an acid-green glow.",
          },
          {
            src: "xgc-labs/3",
            alt: "XGC X symbol embossed in green-lit geometric panels.",
          },
        ],
      },
      {
        kind: "full",
        figure: {
          src: "xgc-labs/4",
          alt: "Three phones showing the XGC wallet app screens.",
          caption: "Wallet UI: authority without losing agility.",
        },
      },
      {
        kind: "offset",
        side: "left",
        figure: {
          src: "xgc-labs/6",
          alt: "Laptop under a green spotlight displaying the XGC Labs design system.",
        },
        note: "Brand-to-platform, one system.",
      },
      {
        kind: "inset",
        figure: {
          src: "xgc-labs/5",
          alt: "XGC Labs Solutions screen floating in a dark green particle field.",
        },
      },
    ],
    tone: { bg: "#030e05", fg: "#dcffe0", accent: "#3dff4f", dark: true },
    featured: false,
    sortOrder: 9,
    challenge:
      "Inspire founders and reassure investors at the same time: communicate authority without losing agility, and build a platform that guides projects from idea to launch.",
    concept:
      "A glossy X lit in acid green on black, and one line to live up to — “Built for builders. Powered by purpose.” — carried from campaign posters to the wallet interface.",
    deliverables: [
      "Brand identity",
      "Website",
      "Wallet app UI",
      "Pitch decks",
      "Ecosystem campaigns",
    ],
    outcome:
      "A consistent message of innovation and reliability across brand and product, positioning XGC Labs as a launchpad within the XRPL ecosystem.",
    externalLinks: [source("xgc-labs")],
  },
]

/**
 * Brands named in the brief that do not yet have verified assets.
 * Kept out of the published site until imagery + copy are supplied.
 */
export const draftProjects = [
  {
    title: "Saham Bank",
    expected: "Digital experience, website design",
    status: "awaiting assets",
  },
  {
    title: "Sonara Festival",
    expected: "Visual identity, campaign art direction, event communication",
    status: "awaiting assets",
  },
  {
    title: "ODD Collective",
    expected: "Identity, creative communication",
    status: "awaiting assets",
  },
  {
    title: "realme",
    expected: "Brand & communication design",
    status: "awaiting assets",
  },
  {
    title: "LGaming",
    expected: "Art direction, gaming visual communication",
    status: "awaiting assets",
  },
  {
    title: "Cradle Digitals / Prigma / Analogie / TotalEnergies",
    expected: "To be selected",
    status: "awaiting assets",
  },
] as const

export const sortedProjects = [...projects].sort(
  (a, b) => a.sortOrder - b.sortOrder,
)
export const featuredProjects = sortedProjects.filter((p) => p.featured)

export const getProject = (slug: string | undefined) =>
  projects.find((p) => p.slug === slug)

export const projectNeighbours = (slug: string) => {
  const i = sortedProjects.findIndex((p) => p.slug === slug)
  const n = sortedProjects.length
  return {
    prev: sortedProjects[(i - 1 + n) % n],
    next: sortedProjects[(i + 1) % n],
  }
}

export const relatedProjects = (project: Project, limit = 2) =>
  sortedProjects
    .filter((p) => p.slug !== project.slug)
    .map((p) => ({
      p,
      score: p.categories.filter((c) => project.categories.includes(c)).length,
    }))
    .sort((a, b) => b.score - a.score || a.p.sortOrder - b.p.sortOrder)
    .slice(0, limit)
    .map(({ p }) => p)

export const allCategories: Category[] = [
  "Branding",
  "Digital",
  "Art Direction",
  "Motion",
]

export const yearRange = () => {
  const years = projects.map((p) => p.year)
  return `${Math.min(...years)}—${Math.max(...years)}`
}

/** Palette sampled from the project's own imagery, for the "visual system" strip. */
export const projectPalette = (project: Project) => {
  const keys = [
    project.cover.src,
    ...project.gallery.flatMap(blockFigures).map((f) => f.src),
  ]
  const colours: string[] = []
  for (const k of keys) {
    for (const c of media[k].palette) {
      if (colours.length >= 6) break
      if (!colours.some((x) => colourDistance(x, c) < 60)) colours.push(c)
    }
  }
  return colours
}

export function blockFigures(block: GalleryBlock): Figure[] {
  switch (block.kind) {
    case "full":
    case "inset":
    case "offset":
      return [block.figure]
    case "pair":
      return block.figures
    case "trio":
      return block.figures
  }
}

function colourDistance(a: string, b: string) {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16))
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16))
  return Math.hypot(pa[0] - pb[0], pa[1] - pb[1], pa[2] - pb[2])
}
