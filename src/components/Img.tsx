import { useState } from "react"
import { media, type MediaKey } from "@/content/media"

type Props = {
  src: MediaKey
  alt: string
  /** Responsive `sizes` hint. Defaults to full viewport width. */
  sizes?: string
  /** Override the intrinsic aspect ratio (image is then cropped with object-fit: cover). */
  ratio?: string
  priority?: boolean
  className?: string
  imgClassName?: string
  fit?: "cover" | "contain"
  position?: string
}

const base = import.meta.env.BASE_URL

export const mediaUrl = (src: MediaKey, width: 800 | 1600 = 1600) =>
  `${base}media/${src}-${width}.webp`

/**
 * Responsive, layout-stable image. Reserves space via aspect-ratio, paints the image's
 * average colour while loading, and fades in once decoded.
 */
export default function Img({
  src,
  alt,
  sizes = "100vw",
  ratio,
  priority = false,
  className = "",
  imgClassName = "",
  fit = "cover",
  position = "center",
}: Props) {
  const info = media[src]
  const [loaded, setLoaded] = useState(false)
  const w800 = Math.min(800, info.w)
  const w1600 = Math.min(1600, info.w)

  return (
    <div
      className={`media-frame ${className}`}
      style={{
        aspectRatio: ratio ?? `${info.w} / ${info.h}`,
        backgroundColor: info.color,
      }}
    >
      <img
        src={mediaUrl(src, 1600)}
        srcSet={`${mediaUrl(src, 800)} ${w800}w, ${mediaUrl(src, 1600)} ${w1600}w`}
        sizes={sizes}
        width={info.w}
        height={info.h}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        data-loaded={loaded}
        ref={(el) => {
          // Cached images may already be complete before React attaches onLoad.
          if (el?.complete && el.naturalWidth > 0 && !loaded) setLoaded(true)
        }}
        onLoad={() => setLoaded(true)}
        className={imgClassName}
        style={{ objectFit: fit, objectPosition: position }}
      />
    </div>
  )
}
