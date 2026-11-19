import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { SlideShell } from '../SlideShell'
import { VividBackground } from '../../elements/VividBackground'
import { SlideHeader } from '../../elements/SlideHeader'
import { IconBadge } from '../../elements/IconBadge'
import { VividCard } from '../../elements/VividCard'
import styles from './SlideLineChart.module.css'

export interface LineChartSeries {
  /** Legend label. */
  label: string
  /** One value per x label. */
  values: number[]
}

export interface LineChartStat {
  /** Optional Lucide icon in a glass tile. */
  icon?: LucideIcon
  /** Big number (≤ ~6 characters). */
  value: string
  /** Mono caption under the number (≤ ~18 characters). */
  label: string
}

export interface SlideLineChartProps {
  /** Mono label above the title. */
  eyebrow?: string
  /** Title, line 1 (ink). A title that already wraps words in `<Highlight>` still works. */
  title: ReactNode
  /** Title, line 2 in the accent color (blue on light, turquoise on dark): the site's two-tone title. */
  accent?: ReactNode
  /** One or two sentences under the title. */
  lede?: ReactNode
  /** X-axis labels (e.g. "W1"…"W8"). 4–10 points fit. */
  labels: string[]
  /** Main line: solid turquoise with dots and a soft area fill. */
  primary: LineChartSeries
  /** Comparison line (e.g. the plan): dashed white. */
  reference?: LineChartSeries
  /** Top of the y scale. Defaults to the largest value plus ~10%, rounded up to a multiple of 5. */
  max?: number
  /** Stat cards on the right (1–3). */
  stats?: LineChartStat[]
}

/** Chart geometry (px). */
const W = 1060
const H = 480
const PAD_X = 30
const PAD_BOTTOM = 20
const PAD_TOP = 30

/** 1, 2 or 5 × 10^k: grid step that gives about 3–4 lines. */
function niceStep(raw: number) {
  const pow = 10 ** Math.floor(Math.log10(raw))
  const n = raw / pow
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * pow
}

/** Line chart on the dark "vivid" night background: a main series (turquoise, dots, area fill) against an
 *  optional dashed reference series, x labels under each point, a legend, and stat cards on the right. */
export function SlideLineChart({ eyebrow, title, accent, lede, labels, primary, reference, max, stats }: SlideLineChartProps) {
  const all = [...primary.values, ...(reference?.values ?? [])]
  const top = max ?? Math.max(5, Math.ceil((Math.max(...all) * 1.1) / 5) * 5)
  const step = niceStep(top / 4)
  const n = Math.max(labels.length, 2)
  const x = (i: number) => PAD_X + (i * (W - PAD_X * 2)) / (n - 1)
  const y = (v: number) => H - PAD_BOTTOM - (v / top) * (H - PAD_BOTTOM - PAD_TOP)
  const points = (values: number[]) => values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')
  const grid: number[] = []
  for (let v = 0; v <= top; v += step) grid.push(v)
  const last = primary.values.length - 1

  return (
    <SlideShell mode="invert-navy" safeArea={144} background={<VividBackground variant="night" />}>
      <div className={styles.body}>
        <SlideHeader eyebrow={eyebrow} title={title} accent={accent} lede={lede} mode="invert-navy" />

        <div className={styles.content}>
          <div className={styles.chart}>
            <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Line chart: ${primary.label}`}>
              {grid.map((v) => (
                <line key={v} x1={0} x2={W} y1={y(v)} y2={y(v)} className={styles.gridLine} />
              ))}
              <polygon
                className={styles.area}
                points={`${x(0).toFixed(1)},${H - PAD_BOTTOM} ${points(primary.values)} ${x(last).toFixed(1)},${H - PAD_BOTTOM}`}
              />
              {reference && <polyline className={styles.referenceLine} points={points(reference.values)} />}
              <polyline className={styles.primaryLine} points={points(primary.values)} />
              {primary.values.map((v, i) => (
                <circle key={i} className={styles.dot} cx={x(i)} cy={y(v)} r={8} />
              ))}
            </svg>

            <div className={styles.xLabels}>
              {labels.map((label, i) => (
                <span key={i} className={styles.xLabel} style={{ left: `${x(i)}px` }}>
                  {label}
                </span>
              ))}
            </div>

            <div className={styles.legend}>
              <div className={styles.legendItem}>
                <span className={styles.swatch} data-series="primary" />
                <p className={styles.legendText}>{primary.label}</p>
              </div>
              {reference && (
                <div className={styles.legendItem}>
                  <span className={styles.swatch} data-series="reference" />
                  <p className={styles.legendText}>{reference.label}</p>
                </div>
              )}
            </div>
          </div>

          {stats && stats.length > 0 && (
            <div className={styles.stats}>
              {stats.map(({ icon, value, label }, i) => (
                <VividCard key={i} surface="glass" padding="md" radius="md">
                  <div className={styles.stat}>
                    {icon && <IconBadge variant="glass" shape="square" accent="cyan" icon={icon} size={72} />}
                    <div className={styles.statText}>
                      <p className={styles.statValue}>{value}</p>
                      <p className={styles.statLabel}>{label}</p>
                    </div>
                  </div>
                </VividCard>
              ))}
            </div>
          )}
        </div>
      </div>
    </SlideShell>
  )
}
