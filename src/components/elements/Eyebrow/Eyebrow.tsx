import type { ReactNode } from 'react'
import type { AccentColor, TextMode } from '../../shared/types'
import styles from './Eyebrow.module.css'

export type EyebrowSize = 'label' | 'md'

export interface EyebrowProps {
  children: ReactNode
  mode?: TextMode
  /** Accent tick color. See tokens.css — "Configurable accent". */
  accent?: AccentColor
  /** label = 18 (default) · md = 24 Medium, wider tracking (vivid slides) */
  size?: EyebrowSize
  /** Accent tick before the label. The site look (SlideHeader) turns it off; the Figma screens keep it. */
  tick?: boolean
}

/** layout.md — Elementos: "mono ~21 + tick de acento". Reusa mono-label (18),
 *  the role layout.md itself says to use for the eyebrow. */
export function Eyebrow({ children, mode = 'light', accent = 'blue', size = 'label', tick = true }: EyebrowProps) {
  return (
    <p className={styles.eyebrow} data-mode={mode} data-accent={accent} data-size={size} data-tick={tick}>
      {tick && <span className={styles.tick} aria-hidden="true" />}
      {children}
    </p>
  )
}
