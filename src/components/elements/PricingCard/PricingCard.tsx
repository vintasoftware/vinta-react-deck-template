import type { ReactNode } from 'react'
import styles from './PricingCard.module.css'

export type PricingCardTone = 'light' | 'accent'
export type PricingCardSize = 'md' | 'lg'

export interface PricingRow {
  label: string
  /** Value — a single string or several lines (Figma line breaks) */
  value: ReactNode
  /** Price row: value in large DM Mono */
  price?: boolean
}

export interface PricingCardProps {
  /** light = white with a border · accent = blue gradient (featured plan) */
  tone?: PricingCardTone
  /** md = 781×685 with title (Investment 01) · lg = 1001×551 table only (Investment 02) */
  size?: PricingCardSize
  title?: ReactNode
  /** Supporting text lines, as in Figma */
  description?: string[]
  rows: PricingRow[]
}

/** Plan/investment card: title + description + label/value table with
 *  dividers (Figma — "Investment proposal | 01" and "| 02"). */
export function PricingCard({ tone = 'light', size = 'md', title, description = [], rows }: PricingCardProps) {
  return (
    <section className={styles.card} data-tone={tone} data-size={size}>
      {(title || description.length > 0) && (
        <header className={styles.header}>
          {title && <h3 className={styles.title}>{title}</h3>}
          {description.length > 0 && (
            <div className={styles.description}>
              {description.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          )}
        </header>
      )}
      <dl className={styles.rows}>
        {rows.map((row) => (
          <div key={row.label} className={styles.row} data-price={row.price ? '' : undefined}>
            <dt className={styles.label}>{row.label}</dt>
            <dd className={styles.value}>{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
