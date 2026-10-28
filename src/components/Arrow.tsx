type Props = {
  className?: string
  direction?: "right" | "up-right" | "down" | "left" | "up"
}

const rotation = { right: 0, "up-right": -45, down: 90, left: 180, up: -90 }

/** Single hairline arrow used for every directional affordance. */
export default function Arrow({ className = "", direction = "right" }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
      className={`inline-block h-[0.9em] w-[0.9em] shrink-0 ${className}`}
      style={{ transform: `rotate(${rotation[direction]}deg)` }}
    >
      <path d="M3 12h17M14 5.5 20.5 12 14 18.5" strokeLinecap="square" />
    </svg>
  )
}
