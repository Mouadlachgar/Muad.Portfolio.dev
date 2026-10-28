import type { MediaKey } from "./media"

/** Travel photographs from the 25/26 Trip Index (25-26tripindex.framer.website). */
export type Photo = {
  src: MediaKey
  place: string
  country: string
  date: string
  alt: string
}

export const photos: Photo[] = [
  {
    src: "elsewhere/4",
    place: "Manila",
    country: "Philippines",
    date: "13.08.2025",
    alt: "Animal skulls and bones displayed in a glass museum case.",
  },
  {
    src: "elsewhere/7",
    place: "Singapore",
    country: "Singapore",
    date: "08.06.2025",
    alt: "Giant white sculpture of a baby lying in the dark, lit from below.",
  },
  {
    src: "elsewhere/2",
    place: "Shanghai",
    country: "China",
    date: "13.02.2026",
    alt: "Narrow alley lit with red and blue neon signs.",
  },
  {
    src: "elsewhere/10",
    place: "Hong Kong",
    country: "China",
    date: "10.01.2026",
    alt: "A rock sitting on a white plastic chair in front of a mirrored wall.",
  },
  {
    src: "elsewhere/5",
    place: "Lombok",
    country: "Indonesia",
    date: "20.07.2025",
    alt: "Horse statue silhouetted on a beach at sunset, riders in the distance.",
  },
  {
    src: "elsewhere/9",
    place: "Xi’an",
    country: "China",
    date: "22.02.2026",
    alt: "Illuminated traditional city gate at night.",
  },
  {
    src: "elsewhere/11",
    place: "Ha Giang",
    country: "Vietnam",
    date: "04.01.2026",
    alt: "Elderly woman in a headscarf holding a ring of yellow flowers at a misty market.",
  },
  {
    src: "elsewhere/3",
    place: "Sapa",
    country: "Vietnam",
    date: "31.12.2025",
    alt: "Smiling stone child statues in front of a seated Buddha under a blue sky.",
  },
  {
    src: "elsewhere/6",
    place: "East Java",
    country: "Indonesia",
    date: "26.06.2025",
    alt: "White horse with a pink headdress standing on volcanic ground below a mountain.",
  },
  {
    src: "elsewhere/8",
    place: "Hanoi",
    country: "Vietnam",
    date: "28.02.2025",
    alt: "Person standing before a massive grey colonnaded mausoleum.",
  },
  {
    src: "elsewhere/12",
    place: "Macau",
    country: "China",
    date: "13.01.2026",
    alt: "Arched colosseum-style facade against a deep blue sky.",
  },
  {
    src: "elsewhere/1",
    place: "Chiang Mai",
    country: "Thailand",
    date: "17.03.2026",
    alt: "Park pond with a fountain, palms and red flowers under a bright sky.",
  },
]
