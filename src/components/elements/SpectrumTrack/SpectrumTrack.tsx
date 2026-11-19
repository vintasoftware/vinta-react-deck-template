import styles from './SpectrumTrack.module.css'

export interface SpectrumTrackProps {
  /** Left end of the bar (the gradient's cooler tone) */
  leftLabel: string
  /** Right end of the bar (the gradient's stronger/blue tone) */
  rightLabel: string
}

/** Horizontal bar with a mint→blue gradient and a mono label at each end,
 *  — represents any two-ended progression (confidence, risk,
 *  maturity…), not tied to one use case. Used by layout.md —
 *  Alt 03 as "UNKNOWNS → CONFIDENCE", but the component does not know that. */
export function SpectrumTrack({ leftLabel, rightLabel }: SpectrumTrackProps) {
  return (
    <div className={styles.track}>
      <p className={`${styles.label} ${styles.left}`}>{leftLabel}</p>
      <div className={styles.bar} aria-hidden="true" />
      <p className={`${styles.label} ${styles.right}`}>{rightLabel}</p>
    </div>
  )
}
