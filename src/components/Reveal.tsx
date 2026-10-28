import { motion } from "motion/react"
import type { ReactNode } from "react"
import { dur, ease } from "@/lib/motion"

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  as?: "div" | "section" | "li" | "header" | "figure" | "p"
  amount?: number
}

/** Single-purpose scroll reveal. Use on groups, not on every element. */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as = "div",
  amount = 0.2,
}: Props) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount, margin: "0px 0px -8% 0px" }}
      transition={{ duration: dur.reveal + 0.1, ease: ease.out, delay }}
    >
      {children}
    </M>
  )
}
