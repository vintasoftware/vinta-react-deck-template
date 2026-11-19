import type { StepCardAccent } from '../StepCard'
import styles from './StepRail.module.css'

export interface StepRailProps {
  /** Color of each dot, in step order (default: teal → navy) */
  accents?: StepCardAccent[]
}

const DEFAULT_ACCENTS: StepCardAccent[] = ['teal', 'aqua', 'sky', 'blue', 'navy']

/** Horizontal rail with colored dots and an arrow (Figma — "Product Timeline |
 *  Alt 02"). 1792 wide; each dot is centered on its step's card. */
export function StepRail({ accents = DEFAULT_ACCENTS }: StepRailProps) {
  return (
    <div className={styles.rail}>
      <div className={styles.base} />
      <div className={styles.line} />
      <span className={styles.arrow} aria-hidden="true" />
      <div className={styles.dots}>
        {accents.map((accent, i) => (
          <span key={i} className={styles.ring} data-accent={accent}>
            <span className={styles.dot} />
          </span>
        ))}
      </div>
    </div>
  )
}
