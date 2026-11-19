import type { ReactNode } from 'react'
import { SlideShell } from '../SlideShell'
import { Kicker } from '../../elements/Kicker'
import { StepCard, type StepCardProps } from '../../elements/StepCard'
import { StepRail } from '../../elements/StepRail'
import styles from './SlideSprintSteps.module.css'

export interface SlideSprintStepsProps {
  eyebrow: string
  title: ReactNode
  subtitle: ReactNode
  /** Exatamente 5 passos */
  steps: [StepCardProps, StepCardProps, StepCardProps, StepCardProps, StepCardProps]
  /** Background and bottom strip exported from Figma */
  background?: ReactNode
  footerStrip?: ReactNode
}

/** pattern = faithful copy of the "Product Timeline | Alt 02" frame (427:1314).
 *  The original's Roboto/JetBrains migrated to DM Sans/DM Mono. */
export function SlideSprintSteps({ eyebrow, title, subtitle, steps, background = <img src="/assets/shared/sprint-background.svg" alt="" />, footerStrip = <img src="/assets/shared/footer-strip-14.svg" alt="" /> }: SlideSprintStepsProps) {
  return (
    <SlideShell mode="light" safeArea={64} background={background ?? <div className={styles.plain} />}>
      <div className={styles.canvas}>
        <div className={styles.eyebrow}>
          <Kicker>{eyebrow}</Kicker>
        </div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        <div className={styles.rail}>
          <StepRail />
        </div>
        <div className={styles.cards}>
          {steps.map((step, i) => (
            <StepCard key={i} {...step} />
          ))}
        </div>
        {footerStrip && <div className={styles.strip}>{footerStrip}</div>}
      </div>
    </SlideShell>
  )
}
