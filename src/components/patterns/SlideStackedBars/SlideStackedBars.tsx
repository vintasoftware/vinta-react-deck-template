import type { ReactNode } from 'react'
import { SlideShell } from '../SlideShell'
import { VividBackground } from '../../elements/VividBackground'
import { SlideHeader } from '../../elements/SlideHeader'
import styles from './SlideStackedBars.module.css'

/** Segment colors, darkest first. navy/blue get white text, sky/turquoise get ink text. */
export type StackedBarsColor = 'navy' | 'blue' | 'sky' | 'turquoise'

export interface StackedBarsSeries {
  /** Legend label. */
  label: string
  /** One value per column (a share in %, or any number: each column is normalized to its own total). */
  values: number[]
  /** Defaults by position: navy, blue, sky, turquoise. */
  color?: StackedBarsColor
}

export interface StackedBarsColumn {
  /** Mono label under the bar (e.g. "2024"). */
  label: string
  /** Small line under the label (e.g. "34 deals"). */
  caption?: string
}

export interface SlideStackedBarsProps {
  /** Mono label above the title. */
  eyebrow?: string
  /** Title, line 1 (ink). A title that already wraps words in `<Highlight>` still works. */
  title: ReactNode
  /** Title, line 2 in the accent color (blue on light, turquoise on dark): the site's two-tone title. */
  accent?: ReactNode
  /** One or two sentences under the title. */
  lede?: ReactNode
  /** One stacked bar per column, left to right. Up to 4 fit. */
  columns: StackedBarsColumn[]
  /** Segments from the bottom of the bar to the top. Up to 4. */
  series: StackedBarsSeries[]
  /** Text inside each segment. Defaults to `${value}%`. */
  formatValue?: (value: number) => string
}

const DEFAULT_COLORS: StackedBarsColor[] = ['navy', 'blue', 'sky', 'turquoise']
/** Full bar height in px (100% of a column). */
const BAR_HEIGHT = 480
/** Segments shorter than this (px) hide their number. */
const MIN_LABEL_HEIGHT = 32

/** 100% stacked bars on the light "vivid" wash: one bar per column with the share of each series written
 *  inside its segment, column label + caption below, legend on the right (top series first). */
export function SlideStackedBars({ eyebrow, title, accent, lede, columns, series, formatValue = (v) => `${v}%` }: SlideStackedBarsProps) {
  const colored = series.map((s, i) => ({ ...s, color: s.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length] }))
  const topFirst = [...colored].reverse()

  return (
    <SlideShell mode="light" safeArea={144} background={<VividBackground variant="wash" />}>
      <div className={styles.body}>
        <SlideHeader eyebrow={eyebrow} title={title} accent={accent} lede={lede} mode="light" />

        <div className={styles.chart}>
          <div className={styles.columns}>
            {columns.map((column, ci) => {
              const total = colored.reduce((sum, s) => sum + (s.values[ci] ?? 0), 0) || 1
              return (
                <div key={ci} className={styles.column}>
                  <div className={styles.bar}>
                    {topFirst.map((s, si) => {
                      const value = s.values[ci] ?? 0
                      const height = Math.round((value / total) * BAR_HEIGHT)
                      if (height <= 0) return null
                      return (
                        <div key={si} className={styles.segment} data-color={s.color} style={{ height: `${height}px` }}>
                          {height >= MIN_LABEL_HEIGHT && <span className={styles.segmentValue}>{formatValue(value)}</span>}
                        </div>
                      )
                    })}
                  </div>
                  <p className={styles.columnLabel}>{column.label}</p>
                  {column.caption && <p className={styles.caption}>{column.caption}</p>}
                </div>
              )
            })}
          </div>

          <div className={styles.legend}>
            {topFirst.map((s, i) => (
              <div key={i} className={styles.legendItem}>
                <span className={styles.swatch} data-color={s.color} />
                <p className={styles.legendText}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideShell>
  )
}
