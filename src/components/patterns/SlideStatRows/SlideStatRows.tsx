import type { ReactNode } from 'react'
import { SlideShell } from '../SlideShell'
import { VividBackground } from '../../elements/VividBackground'
import { SlideHeader } from '../../elements/SlideHeader'
import { Body } from '../../elements/Body'
import styles from './SlideStatRows.module.css'

export interface StatRow {
  /** The number, ≤ ~10 characters ("7% → 67%", "51 → 29"). */
  value: string
  /** Small unit after the number ("clients", "days"). */
  unit?: string
  /** One line, ≤ ~48 characters. */
  title: string
  /** One or two lines, ≤ ~150 characters. */
  text: string
}

export interface SlideStatRowsProps {
  eyebrow?: string
  /** Title, line 1. ≤ ~30 characters. With 5 rows keep the title on one line and skip the lede. */
  title: ReactNode
  /** Title, line 2 in blue. Use it with ≤ 4 rows. */
  accent?: ReactNode
  /** One sentence under the title. Use it with ≤ 4 rows. */
  lede?: ReactNode
  /** 3–5 rows. */
  rows: StatRow[]
  /** blue (default) = progress, wins · danger = risks, losses (red numbers and bar). */
  tone?: 'blue' | 'danger'
  /** 64px grid over the wash (the "planning deck" look). */
  grid?: boolean
}

/** Facts in rows: a big number, a title and one sentence per row, with an accent bar on the left edge. "What shows
 *  progress", "what shows risk", retrospectives. From the Expansion planning deck. Wash background. */
export function SlideStatRows({ eyebrow, title, accent, lede, rows, tone = 'blue', grid = false }: SlideStatRowsProps) {
  return (
    <SlideShell mode="light" safeArea={144} background={<VividBackground variant="wash" grid={grid} />}>
      <div className={styles.body} data-tone={tone}>
        <SlideHeader eyebrow={eyebrow} title={title} accent={accent} lede={lede} width={1400} />
        <div className={styles.rows}>
          {rows.map((row) => (
            <div key={row.title} className={styles.row}>
              <p className={styles.value}>
                {row.value}
                {row.unit && <span className={styles.unit}>{row.unit}</span>}
              </p>
              <div className={styles.text}>
                <Body tone="primary" ink="vivid">
                  {row.title}
                </Body>
                <p className={styles.detail}>{row.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  )
}
