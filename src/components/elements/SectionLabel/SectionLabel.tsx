import type { ReactNode } from 'react'
import styles from './SectionLabel.module.css'

export type SectionLabelAccent = 'blue' | 'orange' | 'sky'
export type SectionLabelEmphasis = 'strong' | 'soft'

export interface SectionLabelProps {
  children: ReactNode
  /** Color of the small bar on the left: blue = blue gradient · orange = sand · sky = bright blue */
  accent?: SectionLabelAccent
  /** strong = dark label (29px) · soft = smaller blue-gray label (28.6px) */
  emphasis?: SectionLabelEmphasis
}

/** Vertical accent bar + section label (Scope review: "Scope Coverage",
 *  "Main Concerns", "Recommended Approach"). Figma measurements (frames at
 *  0.65 scale already applied). */
export function SectionLabel({ children, accent = 'blue', emphasis = 'strong' }: SectionLabelProps) {
  return (
    <div className={styles.label} data-accent={accent} data-emphasis={emphasis}>
      <span className={styles.bar} aria-hidden="true" />
      <h3 className={styles.text}>{children}</h3>
    </div>
  )
}
