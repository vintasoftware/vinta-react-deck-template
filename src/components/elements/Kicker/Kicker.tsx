import type { ReactNode } from 'react'
import styles from './Kicker.module.css'

export interface KickerProps {
  children: ReactNode
  align?: 'left' | 'center'
}

/** Short line in blue DM Mono above the title (Figma — Alt 02 and Investment:
 *  "MVP AI FAST-TRACK"). No tick, unlike the Eyebrow. */
export function Kicker({ children, align = 'left' }: KickerProps) {
  return (
    <p className={styles.kicker} data-align={align}>
      {children}
    </p>
  )
}
