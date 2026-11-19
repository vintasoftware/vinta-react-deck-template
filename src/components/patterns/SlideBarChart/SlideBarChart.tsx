import type { CSSProperties, ReactNode } from 'react'
import { SlideShell } from '../SlideShell'
import { VividBackground } from '../../elements/VividBackground'
import { SlideHeader } from '../../elements/SlideHeader'
import styles from './SlideBarChart.module.css'

export interface BarChartBar {
  /** Label under the bar (e.g. "Q1"). */
  label: string
  value: number
  /** Projected value: dashed outline bar and a "*" after the number. */
  projected?: boolean
}

export interface BarChartGroup {
  /** Group label under the baseline (e.g. "2024"). */
  label: string
  bars: BarChartBar[]
}

export interface SlideBarChartProps {
  /** Mono label above the title. */
  eyebrow?: string
  /** Title, line 1 (ink). A title that already wraps words in `<Highlight>` still works. */
  title: ReactNode
  /** Title, line 2 in the accent color (blue on light, turquoise on dark): the site's two-tone title. */
  accent?: ReactNode
  /** One or two sentences under the title. */
  lede?: ReactNode
  /** Groups of vertical bars (e.g. one group per year, one bar per quarter). 2–4 groups of 2–4 bars fit. */
  groups: BarChartGroup[]
  /** Value that maps to the tallest bar height. Defaults to the largest value. */
  max?: number
  /** Legend labels. `projected` only shows when some bar is projected. */
  legend?: { actual: string; projected?: string }
}

/** Tallest bar height in px (fills the space under the title). */
const BAR_AREA = 338

/** Grouped vertical bar chart on the light "vivid" wash: values above the bars, a label under each bar,
 *  a baseline and a group label per group, and an optional legend. Bar heights are computed from the values. */
export function SlideBarChart({ eyebrow, title, accent, lede, groups, max, legend }: SlideBarChartProps) {
  const top = max ?? Math.max(...groups.flatMap((g) => g.bars.map((b) => b.value)), 1)
  const hasProjected = groups.some((g) => g.bars.some((b) => b.projected))

  return (
    <SlideShell mode="light" safeArea={144} background={<VividBackground variant="wash" />}>
      <div className={styles.body}>
        <SlideHeader eyebrow={eyebrow} title={title} accent={accent} lede={lede} mode="light" />

        <div className={styles.chart}>
          {groups.map((group, gi) => (
            <div key={gi} className={styles.group}>
              <div className={styles.bars}>
                {group.bars.map((bar, bi) => {
                  const height = { height: `${Math.round((bar.value / top) * BAR_AREA)}px` } as CSSProperties
                  return (
                    <div key={bi} className={styles.column}>
                      <p className={styles.value}>
                        {bar.value}
                        {bar.projected ? '*' : ''}
                      </p>
                      <div className={styles.bar} data-projected={bar.projected || undefined} style={height} />
                      <p className={styles.barLabel}>{bar.label}</p>
                    </div>
                  )
                })}
              </div>
              <div className={styles.baseline} />
              <p className={styles.groupLabel}>{group.label}</p>
            </div>
          ))}
        </div>

        {legend && (
          <div className={styles.legend}>
            <div className={styles.legendItem}>
              <span className={styles.swatch} />
              <p className={styles.legendText}>{legend.actual}</p>
            </div>
            {hasProjected && legend.projected && (
              <div className={styles.legendItem}>
                <span className={styles.swatch} data-projected />
                <p className={styles.legendText}>{legend.projected}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </SlideShell>
  )
}
