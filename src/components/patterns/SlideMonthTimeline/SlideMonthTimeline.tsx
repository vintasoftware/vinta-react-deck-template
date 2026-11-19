import type { CSSProperties, ReactNode } from 'react'
import { SlideShell } from '../SlideShell'
import { VividBackground } from '../../elements/VividBackground'
import { SlideHeader } from '../../elements/SlideHeader'
import { VividCard } from '../../elements/VividCard'
import styles from './SlideMonthTimeline.module.css'

export interface TimelineColumn {
  /** Mono label under the dot ("JANUARY", "Q1"), ≤ ~10 characters. */
  label: string
  /** 2–4 items, ≤ ~60 characters each. */
  items: string[]
}

export interface TimelineBar {
  /** ≤ ~45 characters (one line when it spans one column). */
  label: string
  /** First column the bar covers (0-based). */
  from: number
  /** Last column the bar covers (0-based, inclusive). Default: same as `from`. */
  to?: number
}

export interface SlideMonthTimelineProps {
  eyebrow?: string
  /** Title, one line, ≤ ~40 characters. */
  title: ReactNode
  /** Title, line 2 in blue. Skip it when there are 4 bars. */
  accent?: ReactNode
  /** 2–4 columns (months, quarters, phases). */
  columns: TimelineColumn[]
  /** ≤ 4 floating bars above the rail: milestones and ongoing work. */
  bars?: TimelineBar[]
  /** 64px grid over the wash (the "planning deck" look). */
  grid?: boolean
}

/** A period in columns: floating navy bars for milestones and ongoing work above a dotted rail, one card of actions
 *  per column below. Quarterly plans, launch calendars. From the Expansion planning deck. Wash background. */
export function SlideMonthTimeline({ eyebrow, title, accent, columns, bars, grid = false }: SlideMonthTimelineProps) {
  const countStyle = { '--count': columns.length } as CSSProperties
  return (
    <SlideShell mode="light" safeArea={144} background={<VividBackground variant="wash" grid={grid} />}>
      <div className={styles.body}>
        <SlideHeader eyebrow={eyebrow} title={title} accent={accent} width={1500} />
        <div className={styles.content}>
          {bars && bars.length > 0 && (
            <div className={styles.bars} style={countStyle}>
              {bars.map((b) => (
                <div key={b.label} className={styles.bar} style={{ gridColumn: `${b.from + 1} / ${(b.to ?? b.from) + 2}` }}>
                  {b.label}
                </div>
              ))}
            </div>
          )}
          <div className={styles.rail} style={countStyle}>
            {columns.map((c) => (
              <div key={c.label} className={styles.stop}>
                <span className={styles.dot} aria-hidden="true" />
                <p className={styles.stopLabel}>{c.label}</p>
              </div>
            ))}
          </div>
          <div className={styles.columns} style={countStyle}>
            {columns.map((c) => (
              <VividCard key={c.label} padding="md" radius="md">
                <ul className={styles.list}>
                  {c.items.map((item) => (
                    <li key={item} className={styles.item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </VividCard>
            ))}
          </div>
        </div>
      </div>
    </SlideShell>
  )
}
