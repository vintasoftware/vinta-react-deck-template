import type { ReactNode } from 'react'
import styles from './TimelineBar.module.css'

export type TimelineBarAccent = 'purple' | 'mint' | 'blue'

export interface TimelineBarProps {
  children: ReactNode
  /** Phase color: purple · mint · blue (85% opacity, with a light blur) */
  accent?: TimelineBarAccent
}

/** Phase item bar in the timeline (Figma — "Product Timeline | Alt 01"):
 *  rounded pill with bold text, positioned by the pattern. */
export function TimelineBar({ children, accent = 'purple' }: TimelineBarProps) {
  return (
    <span className={styles.bar} data-accent={accent}>
      {children}
    </span>
  )
}
