import type { ReactNode } from 'react'
import { SlideShell } from '../SlideShell'
import { SectionLabel } from '../../elements/SectionLabel'
import { TagCard, type TagCardProps } from '../../elements/TagCard'
import { InsightCard } from '../../elements/InsightCard'
import styles from './SlideScopeReview.module.css'

export interface ScopeReviewInsight {
  title: ReactNode
  lead: ReactNode
  detail?: ReactNode
}

export interface SlideScopeReviewProps {
  title: ReactNode
  coverageLabel: ReactNode
  /** Exactly 3 tag cards: Must-have, Nice-to-have, Integrations */
  groups: [TagCardProps, TagCardProps, TagCardProps]
  concernsLabel: ReactNode
  /** 2 concern cards */
  concerns: [ScopeReviewInsight, ScopeReviewInsight]
  approachLabel: ReactNode
  /** 2 recommended approach cards */
  approaches: [ScopeReviewInsight, ScopeReviewInsight]
  /** Background exported from Figma (arcs, connectors, bottom strip) */
  background?: ReactNode
}

/** pattern = faithful copy of the "Scope Review | 01" frame (1920×1080). All
 *  positions/measurements come from Figma; background = exported image. */
export function SlideScopeReview({
  title,
  coverageLabel,
  groups,
  concernsLabel,
  concerns,
  approachLabel,
  approaches,
  background = <img src="/assets/scope-review/background.png" alt="" />,
}: SlideScopeReviewProps) {
  return (
    <SlideShell mode="light" safeArea={69} background={background ?? <div className={styles.plain} />}>
      <div className={styles.canvas}>
        <h1 className={styles.title}>{title}</h1>

        <div className={styles.coverageLabel}>
          <SectionLabel accent="blue">{coverageLabel}</SectionLabel>
        </div>
        <div className={styles.group} data-slot="must">
          <TagCard {...groups[0]} />
        </div>
        <div className={styles.group} data-slot="nice">
          <TagCard {...groups[1]} />
        </div>
        <div className={styles.group} data-slot="integrations">
          <TagCard {...groups[2]} />
        </div>

        <div className={styles.concernsLabel}>
          <SectionLabel accent="orange">{concernsLabel}</SectionLabel>
        </div>
        <div className={styles.insight} data-slot="concern-1">
          <InsightCard tone="concern" {...concerns[0]} />
        </div>
        <div className={styles.insight} data-slot="concern-2">
          <InsightCard tone="concern" {...concerns[1]} />
        </div>

        <div className={styles.approachLabel}>
          <SectionLabel accent="sky" emphasis="soft">
            {approachLabel}
          </SectionLabel>
        </div>
        <div className={styles.insight} data-slot="approach-1">
          <InsightCard tone="recommendation" {...approaches[0]} />
        </div>
        <div className={styles.insight} data-slot="approach-2">
          <InsightCard tone="recommendation" {...approaches[1]} />
        </div>
      </div>
    </SlideShell>
  )
}
