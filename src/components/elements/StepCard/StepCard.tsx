import type { ReactNode } from 'react'
import styles from './StepCard.module.css'

export type StepCardAccent = 'teal' | 'aqua' | 'sky' | 'blue' | 'navy'

export interface StepCardProps {
  /** Step number (becomes "01", "02"…) */
  index: number
  title: ReactNode
  /** Each item is one line — the breaks follow Figma */
  lines: string[]
  accent?: StepCardAccent
}

/** Step card: colored numbered pill + blue title + text in lines
 *  (Figma — "Product Timeline | Alt 02"). 340.2×505. */
export function StepCard({ index, title, lines, accent = 'teal' }: StepCardProps) {
  return (
    <article className={styles.card} data-accent={accent}>
      <span className={styles.pill}>{String(index).padStart(2, '0')}</span>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.body}>
        {lines.map((line, i) => (
          <p key={i} className={styles.line}>
            {line}
          </p>
        ))}
      </div>
    </article>
  )
}
