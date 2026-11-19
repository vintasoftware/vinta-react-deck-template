import type { ReactNode } from 'react'
import type { AccentColor, TextMode } from '../../shared/types'
import styles from './MetricItem.module.css'

export interface MetricItemProps {
  /** ex.: "13+ years" — layout.md: "label mono em acento ~34" */
  label: ReactNode
  /** e.g. "Delivering software" — description ~24, reuses the body role (20) */
  description: ReactNode
  mode?: TextMode
  accent?: AccentColor
}

export function MetricItem({ label, description, mode = 'light', accent = 'blue' }: MetricItemProps) {
  return (
    <div className={styles.metricItem}>
      <div className={styles.label} data-mode={mode} data-accent={accent}>
        {label}
      </div>
      <p className={styles.description} data-mode={mode}>
        {description}
      </p>
    </div>
  )
}
