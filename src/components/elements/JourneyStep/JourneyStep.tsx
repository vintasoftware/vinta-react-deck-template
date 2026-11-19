import type { CSSProperties, ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import type { AccentColor } from '../../shared/types'
import { IconBadge } from '../IconBadge'
import styles from './JourneyStep.module.css'

export type JourneyStepSize = 'md' | 'lg' | 'xl' | 'xxl'

export interface JourneyStepProps {
  /** 1, 2, 3… becomes "phase 0X" */
  index: number
  weeks: number
  title: ReactNode
  icon: LucideIcon
  accent?: AccentColor
  /** md = compact (default) · lg = fills the slide (badge 112, H1 title) ·
   *  xl = featured phase (Journey | Single Step): seal 155, uppercase mono
   *  title 40 · xxl = list of 4 phases in an arc (Journey | Overall): seal
   *  155, uppercase mono title 41.8 */
  size?: JourneyStepSize
  /** Replaces the IconBadge (e.g. a seal exported from Figma) */
  badge?: ReactNode
  /** Title and label color (xl/xxl only) — pass a token, e.g.:
   *  'var(--accent-emerald)'. Without it, the title uses the accent color. */
  titleColor?: string
  labelColor?: string
}

const BADGE_SIZE: Record<JourneyStepSize, number> = { md: 56, lg: 112, xl: 155, xxl: 155 }

/** Item of a vertical list (layout.md — "Journey | Overall"): circular
 *  IconBadge + "phase 0X | X weeks" label + title, both in the accent color. */
export function JourneyStep({ index, weeks, title, icon, accent = 'blue', size = 'md', badge, titleColor, labelColor }: JourneyStepProps) {
  const indexLabel = String(index).padStart(2, '0')
  const style = { '--step-title-color': titleColor, '--step-label-color': labelColor } as CSSProperties

  return (
    <div className={styles.step} data-size={size} style={style}>
      {badge ?? <IconBadge shape="circle" accent={accent} icon={icon} size={BADGE_SIZE[size]} />}
      <div className={styles.content}>
        <p className={styles.label}>
          <span className={styles.phase}>phase {indexLabel}</span> | {weeks} weeks
        </p>
        <h4 className={styles.title} data-mode="light" data-accent={accent}>
          {title}
        </h4>
      </div>
    </div>
  )
}
