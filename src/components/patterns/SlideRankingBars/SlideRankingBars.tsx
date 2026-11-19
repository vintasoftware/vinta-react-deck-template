import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { SlideShell } from '../SlideShell'
import { VividBackground } from '../../elements/VividBackground'
import { SlideHeader } from '../../elements/SlideHeader'
import { Body } from '../../elements/Body'
import { IconBadge } from '../../elements/IconBadge'
import styles from './SlideRankingBars.module.css'

export interface RankingRow {
  /** Row name on the left (~22 characters). */
  label: string
  /** Bar length, relative to `max`. */
  value: number
  /** Text on the right of the bar. Defaults to `${value}%` (e.g. pass "28% · 10" to add a count). */
  valueLabel?: string
}

export interface RankingCallout {
  /** Lucide icon in the glass tile. */
  icon?: LucideIcon
  /** Big number (≤ ~4 characters). */
  value: string
  /** One sentence explaining the number. */
  text: ReactNode
}

export interface SlideRankingBarsProps {
  /** Mono label above the title. */
  eyebrow?: string
  /** Title, line 1 (ink). A title that already wraps words in `<Highlight>` still works. */
  title: ReactNode
  /** Title, line 2 in the accent color (blue on light, turquoise on dark): the site's two-tone title. */
  accent?: ReactNode
  /** One or two sentences under the title. */
  lede?: ReactNode
  /** Rows from first to last (already sorted). Up to 6 fit. */
  rows: RankingRow[]
  /** Value of a full-length bar. Defaults to the largest value rounded up to the next 10. */
  max?: number
  /** Row drawn in solid blue with a bolder label. Defaults to the first row; pass -1 for none. */
  highlightIndex?: number
  /** Gradient card on the right that calls out one number. */
  callout?: RankingCallout
}

/** Horizontal ranking bars on the light "vivid" wash: label, bar on a light track and value per row,
 *  the top row highlighted, plus an optional blue gradient card that calls out the key number. */
export function SlideRankingBars({ eyebrow, title, accent, lede, rows, max, highlightIndex = 0, callout }: SlideRankingBarsProps) {
  const top = max ?? Math.max(10, Math.ceil(Math.max(...rows.map((r) => r.value)) / 10) * 10)

  return (
    <SlideShell mode="light" safeArea={144} background={<VividBackground variant="wash" />}>
      <div className={styles.body}>
        <SlideHeader eyebrow={eyebrow} title={title} accent={accent} lede={lede} mode="light" />

        <div className={styles.fill}>
          <div className={styles.content}>
            <div className={styles.rows}>
              {rows.map((row, i) => {
                const highlighted = i === highlightIndex
                const width = Math.min(100, Math.max(0, (row.value / top) * 100))
                return (
                  <div key={i} className={styles.row} data-highlighted={highlighted || undefined}>
                    <p className={styles.label}>{row.label}</p>
                    <div className={styles.track}>
                      <div className={styles.bar} style={{ width: `${width}%` }} />
                    </div>
                    <p className={styles.valueLabel}>{row.valueLabel ?? `${row.value}%`}</p>
                  </div>
                )
              })}
            </div>

            {callout && (
              <div className={styles.callout}>
                {callout.icon && <IconBadge variant="glass" shape="square" accent="cyan" icon={callout.icon} size={72} />}
                <p className={styles.calloutValue}>{callout.value}</p>
                <Body size="h4" tone="primary" mode="invert-blue">
                  {callout.text}
                </Body>
              </div>
            )}
          </div>
        </div>
      </div>
    </SlideShell>
  )
}
