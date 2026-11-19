import type { ReactNode } from 'react'
import { SlideShell } from '../SlideShell'
import { Kicker } from '../../elements/Kicker'
import { PricingCard, type PricingCardProps } from '../../elements/PricingCard'
import styles from './SlideInvestmentPlans.module.css'

export interface SlideInvestmentPlansProps {
  kicker: string
  title: ReactNode
  /** Default plan (left) and featured plan (right) */
  plans: [Omit<PricingCardProps, 'size' | 'tone'>, Omit<PricingCardProps, 'size' | 'tone'>]
  background?: ReactNode
  footerStrip?: ReactNode
}

/** pattern = faithful copy of the "Investment proposal | 01" frame (427:1384). */
export function SlideInvestmentPlans({ kicker, title, plans, background = <img src="/assets/shared/sprint-background.svg" alt="" />, footerStrip = <img src="/assets/shared/footer-strip-14.svg" alt="" /> }: SlideInvestmentPlansProps) {
  return (
    <SlideShell mode="light" safeArea={140} background={background ?? <div className={styles.plain} />}>
      <div className={styles.canvas}>
        <div className={styles.kicker}>
          <Kicker align="center">{kicker}</Kicker>
        </div>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.plan} data-slot="1">
          <PricingCard tone="light" size="md" {...plans[0]} />
        </div>
        <div className={styles.plan} data-slot="2">
          <PricingCard tone="accent" size="md" {...plans[1]} />
        </div>
        {footerStrip && <div className={styles.strip}>{footerStrip}</div>}
      </div>
    </SlideShell>
  )
}
