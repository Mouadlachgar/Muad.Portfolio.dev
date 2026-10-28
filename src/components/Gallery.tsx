import type { Figure, GalleryBlock } from "@/content/projects"
import Img from "./Img"
import Reveal from "./Reveal"

function Fig({
  figure,
  sizes,
  ratio,
  className = "",
}: {
  figure: Figure
  sizes: string
  ratio?: string
  className?: string
}) {
  return (
    <figure className={className}>
      <Img src={figure.src} alt={figure.alt} sizes={sizes} ratio={ratio} />
      {figure.caption ? (
        <figcaption className="t-small mt-2.5 max-w-[48ch] text-[0.875rem] text-mute">
          {figure.caption}
        </figcaption>
      ) : null}
    </figure>
  )
}

/** Renders a case-study gallery. Block types give each project its own composition. */
export default function Gallery({ blocks }: { blocks: GalleryBlock[] }) {
  return (
    <div className="space-y-[clamp(3rem,8vw,8rem)]">
      {blocks.map((b, i) => {
        switch (b.kind) {
          case "full":
            return (
              <Reveal key={i} y={40}>
                <Fig figure={b.figure} sizes="100vw" className="full-bleed" />
              </Reveal>
            )
          case "inset":
            return (
              <Reveal key={i} className="wrap grid-site">
                <Fig
                  figure={b.figure}
                  sizes="(min-width: 64rem) 66vw, 100vw"
                  className="col-span-4 md:col-span-6 md:col-start-2 lg:col-span-8 lg:col-start-3"
                />
              </Reveal>
            )
          case "pair": {
            const w = b.weight ?? "even"
            const spans =
              w === "left"
                ? [
                    "md:col-span-5 lg:col-span-7",
                    "md:col-span-3 lg:col-span-5 md:mt-[12vw]",
                  ]
                : w === "right"
                  ? [
                      "md:col-span-3 lg:col-span-5 md:mt-[12vw]",
                      "md:col-span-5 lg:col-span-7",
                    ]
                  : [
                      "md:col-span-4 lg:col-span-6",
                      "md:col-span-4 lg:col-span-6",
                    ]
            return (
              <div key={i} className="wrap grid-site items-start gap-y-10">
                {b.figures.map((f, n) => (
                  <Reveal
                    key={f.src}
                    delay={n * 0.08}
                    className={`col-span-4 ${spans[n]}`}
                  >
                    <Fig figure={f} sizes="(min-width: 48rem) 50vw, 100vw" />
                  </Reveal>
                ))}
              </div>
            )
          }
          case "trio":
            return (
              <div key={i} className="wrap grid-site items-start gap-y-10">
                {b.figures.map((f, n) => (
                  <Reveal
                    key={f.src}
                    delay={n * 0.08}
                    className={`col-span-4 lg:col-span-4 ${
                      n === 2 ? "md:col-span-8" : "md:col-span-4"
                    } ${n === 1 ? "lg:mt-[8vw]" : ""}`}
                  >
                    <Fig
                      figure={f}
                      sizes="(min-width: 64rem) 33vw, (min-width: 48rem) 50vw, 100vw"
                      ratio="4 / 5"
                    />
                  </Reveal>
                ))}
              </div>
            )
          case "offset":
            return (
              <div key={i} className="wrap grid-site items-end gap-y-6">
                <Reveal
                  className={`col-span-4 md:col-span-5 lg:col-span-6 ${
                    b.side === "right"
                      ? "md:col-start-4 lg:col-start-7"
                      : "md:col-start-1 lg:col-start-1"
                  }`}
                >
                  <Fig
                    figure={b.figure}
                    sizes="(min-width: 64rem) 50vw, (min-width: 48rem) 62vw, 100vw"
                  />
                </Reveal>
                {b.note ? (
                  <p
                    className={`t-serif col-span-4 text-[clamp(1.6rem,2.8vw,2.75rem)] leading-[1.05] md:col-span-3 md:row-start-1 lg:col-span-4 ${
                      b.side === "right"
                        ? "md:col-start-1 lg:col-start-2"
                        : "md:col-start-6 lg:col-start-8"
                    }`}
                  >
                    {b.note}
                  </p>
                ) : null}
              </div>
            )
        }
      })}
    </div>
  )
}
