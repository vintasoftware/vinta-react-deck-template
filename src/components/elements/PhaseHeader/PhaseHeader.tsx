import type { ReactNode } from 'react'
import styles from './PhaseHeader.module.css'

export type PhaseHeaderAccent = 'purple' | 'mint' | 'blue'

export interface PhaseHeaderProps {
  /** "phase 01" */
  label: ReactNode
  title: ReactNode
  /** Duration on the right, in italics ("week 1", "1 week") */
  duration?: ReactNode
  accent?: PhaseHeaderAccent
}

/** Timeline column header: thin mono label + bold mono title in the
 *  phase color + italic duration aligned right (Figma — Alt 01). */
export function PhaseHeader({ label, title, duration, accent = 'purple' }: PhaseHeaderProps) {
  return (
    <div className={styles.header} data-accent={accent}>
      <div className={styles.text}>
        <p className={styles.label}>{label}</p>
        <p className={styles.title}>{title}</p>
      </div>
      {duration && <p className={styles.duration}>{duration}</p>}
    </div>
  )
}
