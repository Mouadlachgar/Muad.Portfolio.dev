import { useLocalTime } from "@/lib/hooks"

type Props = {
  city: string
  short: string
  timeZone: string
  className?: string
}

/** Only rendered when a confirmed location is configured in `site.location`. */
export default function LocalClock({
  city,
  short,
  timeZone,
  className = "",
}: Props) {
  const time = useLocalTime(timeZone)
  return (
    <p className={`t-meta whitespace-nowrap ${className}`}>
      <span className="sr-only">Local time in {city}: </span>
      <span aria-hidden="true">{short} </span>
      <span className="tabular">{time}</span>
    </p>
  )
}
