import type { ReactNode } from 'react'
import styles from './InsightCard.module.css'

export type InsightCardTone = 'concern' | 'recommendation'

export interface InsightCardProps {
  title: ReactNode
  /** Frase principal */
  lead: ReactNode
  /** Secondary note — below a gradient divider */
  detail?: ReactNode
  /** concern = orange title, white→ice gradient background · recommendation = blue title, white background */
  tone?: InsightCardTone
}

/** White card with a colored title, main sentence and optional note
 *  (Scope review: "Main Concerns" and "Recommended Approach"). Figma
 *  measurements, already at the slide's final scale (original frame at 0.65). */
export function InsightCard({ title, lead, detail, tone = 'recommendation' }: InsightCardProps) {
  return (
    <article className={styles.card} data-tone={tone}>
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.lead}>{lead}</p>
      {detail && (
        <>
          <hr className={styles.rule} />
          <p className={styles.detail}>{detail}</p>
        </>
      )}
    </article>
  )
}
