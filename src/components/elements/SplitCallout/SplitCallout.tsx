import type { ReactNode } from 'react'
import type { AccentColor } from '../../shared/types'
import styles from './SplitCallout.module.css'

export interface SplitCalloutProps {
  leftLabel: string
  /** e.g. "~1-2 months" — always blue mono, regardless of the accent */
  leftValue: ReactNode
  rightLabel: string
  rightText: ReactNode
  /** Color of the divider + right label. See tokens.css — "Configurable
   *  accent". Defaults to orange (original use, layout.md — Alt 03). */
  accent?: AccentColor
}

/** White card split into two columns by a colored vertical rule —
 *  reusable for any "featured value | supporting text" pair (estimate
 *  + milestone is just one example, not the only use). Always on a light surface. */
export function SplitCallout({ leftLabel, leftValue, rightLabel, rightText, accent = 'orange' }: SplitCalloutProps) {
  return (
    <div className={styles.callout} data-mode="light" data-accent={accent}>
      <div className={styles.left}>
        <p className={styles.leftLabel}>{leftLabel}</p>
        <p className={styles.leftValue}>{leftValue}</p>
      </div>

      <div className={styles.rule} aria-hidden="true" />

      <div className={styles.right}>
        <p className={styles.rightLabel}>{rightLabel}</p>
        <p className={styles.rightText}>{rightText}</p>
      </div>
    </div>
  )
}
