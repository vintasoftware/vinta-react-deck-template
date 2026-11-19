import type { ReactNode } from 'react'
import { SlideShell } from '../SlideShell'
import { VividBackground } from '../../elements/VividBackground'
import { SlideHeader } from '../../elements/SlideHeader'
import { Body } from '../../elements/Body'
import { VividCard } from '../../elements/VividCard'
import styles from './SlideDonutChart.module.css'

/** Segment colors, in the default order. */
export type DonutColor = 'navy' | 'blue' | 'sky' | 'turquoise' | 'azure' | 'indigo'

const DEFAULT_COLORS: DonutColor[] = ['navy', 'blue', 'sky', 'turquoise', 'azure', 'indigo']

export interface DonutSegment {
  /** Segment name, e.g. "Founder-led teams". */
  label: string
  /** Share in percent. Shown as "33%"; arcs are drawn proportionally to the sum of all values. */
  value: number
  /** Small line under the name, e.g. "17 deals". */
  detail?: string
  /** Overrides the color picked by position. */
  color?: DonutColor
}

export interface SlideDonutChartProps {
  /** Mono label above the title, e.g. "SAMPLE DATA | BUYERS". */
  eyebrow?: string
  /** Title, line 1 (ink). A title that already wraps words in `<Highlight>` still works. */
  title: ReactNode
  /** Title, line 2 in the accent color (blue on light, turquoise on dark): the site's two-tone title. */
  accent?: ReactNode
  /** One or two sentences under the title. */
  lede?: ReactNode
  /** 2 to 5 segments, largest first. */
  segments: DonutSegment[]
  /** Mono heading of the takeaways card. */
  takeawaysTitle?: string
  /** Up to 3 short sentences (≤ ~70 characters each), numbered 01, 02, 03. Without them the card is left out. */
  takeaways?: string[]
}

const SIZE = 460
const RADIUS = 168
const STROKE = 64
/** Gap between segments, along the arc. */
const GAP = 4

/** Donut chart with a legend (big percentage, name, detail) and an optional takeaways card. Light vivid background. */
export function SlideDonutChart({ eyebrow, title, accent, lede, segments, takeawaysTitle = 'TAKEAWAYS', takeaways }: SlideDonutChartProps) {
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1
  const circumference = 2 * Math.PI * RADIUS
  let offset = 0
  const arcs = segments.map((s, i) => {
    const length = (circumference * s.value) / total
    const arc = { color: s.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length], length, offset }
    offset += length
    return arc
  })

  return (
    <SlideShell mode="light" safeArea={144} background={<VividBackground variant="wash" />}>
      <div className={styles.body}>
        <SlideHeader eyebrow={eyebrow} title={title} accent={accent} lede={lede} mode="light" />
        <div className={styles.fill}>
          <div className={styles.row} data-takeaways={takeaways && takeaways.length > 0 ? 'true' : 'false'}>
            <svg
              className={styles.donut}
              width={SIZE}
              height={SIZE}
              viewBox={`0 0 ${SIZE} ${SIZE}`}
              role="img"
              aria-label={`Donut chart: ${segments.map((s) => `${s.label} ${s.value}%`).join(', ')}`}
            >
              {arcs.map((arc, i) => (
                <circle
                  key={i}
                  data-color={arc.color}
                  cx={SIZE / 2}
                  cy={SIZE / 2}
                  r={RADIUS}
                  fill="none"
                  strokeWidth={STROKE}
                  strokeDasharray={`${Math.max(arc.length - GAP, 0)} ${circumference - arc.length + GAP}`}
                  strokeDashoffset={-arc.offset}
                  transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
                />
              ))}
            </svg>

            <ul className={styles.legend}>
              {segments.map((s, i) => (
                <li key={i} className={styles.item}>
                  <span className={styles.swatch} data-color={arcs[i].color} aria-hidden="true" />
                  <div className={styles.itemText}>
                    <div className={styles.itemHead}>
                      <span className={styles.value}>{s.value}%</span>
                      <span className={styles.label}>{s.label}</span>
                    </div>
                    {s.detail && <span className={styles.detail}>{s.detail}</span>}
                  </div>
                </li>
              ))}
            </ul>

            {takeaways && takeaways.length > 0 && (
              <VividCard style={{ width: 560, gap: 32 }}>
                <p className={styles.cardTitle}>{takeawaysTitle}</p>
                {takeaways.map((text, i) => (
                  <div key={i} className={styles.takeaway}>
                    <span className={styles.number}>{String(i + 1).padStart(2, '0')}</span>
                    <Body tone="primary">{text}</Body>
                  </div>
                ))}
              </VividCard>
            )}
          </div>
        </div>
      </div>
    </SlideShell>
  )
}
