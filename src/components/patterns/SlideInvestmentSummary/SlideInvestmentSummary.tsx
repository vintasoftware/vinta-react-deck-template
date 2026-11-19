import type { ReactNode } from 'react'
import { SlideShell } from '../SlideShell'
import { Kicker } from '../../elements/Kicker'
import { PricingCard, type PricingRow } from '../../elements/PricingCard'
import styles from './SlideInvestmentSummary.module.css'

export interface SlideInvestmentSummaryProps {
  kicker: string
  title: ReactNode
  rows: PricingRow[]
  startDateLabel: string
  startDate: ReactNode
  background?: ReactNode
  footerStrip?: ReactNode
}

/** pattern = faithful copy of the "Investment proposal | 02" frame (427:1432).
 *  The red "screen needs improvement" note in Figma is an internal note and
 *  is not part of the screen. */
export function SlideInvestmentSummary({ kicker, title, rows, startDateLabel, startDate, background = <img src="/assets/shared/sprint-background.svg" alt="" />, footerStrip = <img src="/assets/shared/footer-strip-14.svg" alt="" /> }: SlideInvestmentSummaryProps) {
  return (
    <SlideShell mode="light" safeArea={460} background={background ?? <div className={styles.plain} />}>
      <div className={styles.canvas}>
        <div className={styles.kicker}>
          <Kicker align="center">{kicker}</Kicker>
        </div>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.card}>
          <PricingCard tone="light" size="lg" rows={rows} />
        </div>
        <p className={styles.startLabel}>{startDateLabel}</p>
        <p className={styles.startValue}>{startDate}</p>
        {footerStrip && <div className={styles.strip}>{footerStrip}</div>}
      </div>
    </SlideShell>
  )
}
