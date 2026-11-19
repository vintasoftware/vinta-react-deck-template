import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { SlideShell } from '../SlideShell'
import { VividBackground } from '../../elements/VividBackground'
import { SlideHeader } from '../../elements/SlideHeader'
import { IconBadge } from '../../elements/IconBadge'
import { VividCard } from '../../elements/VividCard'
import styles from './SlideBeforeAfter.module.css'

export interface BeforeAfterRow {
  /** Optional Lucide icon tile for the metric. */
  icon?: LucideIcon
  /** Metric name (≤ ~20 characters; wraps to 2 lines), e.g. "Release cycle". */
  label: string
  before: number
  after: number
  /** Unit after each value, e.g. "weeks". */
  unit: string
  /** Change shown in the pill, e.g. "−67%". Computed from before/after when left out. */
  delta?: string
}

export interface SlideBeforeAfterProps {
  /** Mono label above the title, e.g. "SAMPLE DATA | RESULTS". */
  eyebrow?: string
  /** Title, line 1 (ink). A title that already wraps words in `<Highlight>` still works. */
  title: ReactNode
  /** Title, line 2 in the accent color (blue on light, turquoise on dark): the site's two-tone title. */
  accent?: ReactNode
  /** One or two sentences under the title. */
  lede?: ReactNode
  /** 2 to 3 metrics, one card each. */
  rows: BeforeAfterRow[]
  /** Mono label of the first bar. */
  beforeLabel?: string
  /** Mono label of the second bar. */
  afterLabel?: string
}

/** Longest bar, in px; the larger value of each row gets this width. */
const BAR_MAX = 640

function percentChange(before: number, after: number) {
  if (before === 0) return ''
  const pct = Math.round(((after - before) / before) * 100)
  return `${pct < 0 ? '−' : '+'}${Math.abs(pct)}%`
}

/** Before/after comparison: one card per metric with paired bars and the change in a pill. Light vivid background. */
export function SlideBeforeAfter({ eyebrow, title, accent, lede, rows, beforeLabel = 'BEFORE', afterLabel = 'AFTER' }: SlideBeforeAfterProps) {
  return (
    <SlideShell mode="light" safeArea={144} background={<VividBackground variant="wash" />}>
      <div className={styles.body}>
        <SlideHeader eyebrow={eyebrow} title={title} accent={accent} lede={lede} mode="light" />
        <div className={styles.fill}>
          <div className={styles.rows}>
            {rows.map((row, i) => {
              const max = Math.max(row.before, row.after) || 1
              const bars = [
                { name: beforeLabel, value: row.before, kind: 'before' },
                { name: afterLabel, value: row.after, kind: 'after' },
              ]
              return (
                <VividCard key={i} padding="none" radius="md">
                  <div className={styles.card}>
                    <div className={styles.metric}>
                      {row.icon && <IconBadge variant="white" shape="square" accent="blue" icon={row.icon} size={72} />}
                      <p className={styles.label}>{row.label}</p>
                    </div>
                    <div className={styles.bars}>
                      {bars.map((bar) => (
                        <div key={bar.kind} className={styles.barRow}>
                          <span className={styles.barName}>{bar.name}</span>
                          <span className={styles.bar} data-kind={bar.kind} style={{ width: (BAR_MAX * bar.value) / max }} />
                          <span className={styles.barValue}>
                            {bar.value} {row.unit}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className={styles.deltaCell}>
                      <span className={styles.delta}>{row.delta ?? percentChange(row.before, row.after)}</span>
                    </div>
                  </div>
                </VividCard>
              )
            })}
          </div>
        </div>
      </div>
    </SlideShell>
  )
}
