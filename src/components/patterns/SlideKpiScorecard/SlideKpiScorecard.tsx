import type { ReactNode } from 'react'
import { TrendingDown, TrendingUp, type LucideIcon } from 'lucide-react'
import { SlideShell } from '../SlideShell'
import { VividBackground } from '../../elements/VividBackground'
import { SlideHeader } from '../../elements/SlideHeader'
import { IconBadge } from '../../elements/IconBadge'
import { VividCard } from '../../elements/VividCard'
import styles from './SlideKpiScorecard.module.css'

export interface KpiScorecardItem {
  /** Lucide icon shown in the white tile next to the label. */
  icon: LucideIcon
  /** Short mono label, uppercase (e.g. "REVENUE"). */
  label: string
  /** The big number. Keep it short (up to ~7 characters, e.g. "$4.8M", "11 days"). */
  value: string
  /** Change vs the previous period, shown in a pill (e.g. "+12% vs Q2"). Omit to hide the pill. */
  delta?: string
  /** Arrow direction of the delta pill. Default "up". */
  trend?: 'up' | 'down'
}

export interface SlideKpiScorecardProps {
  /** Mono label above the title (e.g. "Q3 REVIEW"). */
  eyebrow?: string
  /** Title, line 1 (ink). A title that already wraps words in `<Highlight>` still works. */
  title: ReactNode
  /** Title, line 2 in the accent color (blue on light, turquoise on dark): the site's two-tone title. */
  accent?: ReactNode
  /** One or two sentences under the title. */
  lede?: ReactNode
  /** 3 to 6 KPI cards, laid out in rows of 3 (4 items → 2 × 2). */
  kpis: KpiScorecardItem[]
}

/** KPI scorecard on the light wash: up to 6 white cards, each with a quiet icon tile,
 *  a mono label, a big number and an optional delta pill (trend up or down). */
export function SlideKpiScorecard({ eyebrow, title, accent, lede, kpis }: SlideKpiScorecardProps) {
  const columns = kpis.length === 4 ? 2 : Math.min(3, kpis.length)
  return (
    <SlideShell mode="light" safeArea={144} background={<VividBackground variant="wash" />}>
      <div className={styles.body}>
        <SlideHeader eyebrow={eyebrow} title={title} accent={accent} lede={lede} mode="light" />
        <div className={styles.fill}>
          <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
            {kpis.map(({ icon, label, value, delta, trend = 'up' }, i) => {
              const Trend = trend === 'down' ? TrendingDown : TrendingUp
              return (
                <VividCard key={i} padding="none" style={{ minHeight: 0 }}>
                  <div className={styles.card}>
                    <div className={styles.cardHead}>
                      <IconBadge variant="white" shape="square" icon={icon} size={72} />
                      <span className={styles.label}>{label}</span>
                    </div>
                    <p className={styles.value}>{value}</p>
                    {delta && (
                      <span className={styles.delta} data-trend={trend}>
                        <Trend size={28} strokeWidth={1.5} aria-hidden="true" />
                        {delta}
                      </span>
                    )}
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
