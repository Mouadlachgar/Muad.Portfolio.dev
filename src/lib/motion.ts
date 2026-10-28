/** Motion tokens — mirror the CSS custom properties in index.css. */
export const ease = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.76, 0, 0.24, 1],
  soft: [0.22, 1, 0.36, 1],
} as const

export const dur = {
  micro: 0.16,
  hover: 0.28,
  reveal: 0.6,
  page: 0.7,
} as const

export const stagger = 0.06
