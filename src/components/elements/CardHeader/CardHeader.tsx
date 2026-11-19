import type { ReactNode } from 'react'
import styles from './CardHeader.module.css'

export type CardHeaderStatus = 'success' | 'danger'

export interface CardHeaderProps {
  status: CardHeaderStatus
  label: ReactNode
}

const MARK: Record<CardHeaderStatus, string> = { success: '✅', danger: '❌' }

/** Status mark + uppercase mono label in the status color + thin divider —
 *  CoverageCard header (Figma — "Maintenance services | Cards"). */
export function CardHeader({ status, label }: CardHeaderProps) {
  return (
    <div className={styles.header} data-status={status}>
      <p className={styles.label}>
        <span aria-hidden="true">{MARK[status]}</span> {label}
      </p>
      <div className={styles.rule} />
    </div>
  )
}
