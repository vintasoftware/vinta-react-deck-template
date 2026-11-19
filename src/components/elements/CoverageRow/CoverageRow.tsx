import type { ReactNode } from 'react'
import type { CardHeaderStatus } from '../CardHeader'
import styles from './CoverageRow.module.css'

export interface CoverageRowProps {
  status: CardHeaderStatus
  /** hug = text width · fill = full card width (wraps onto several lines) */
  width?: 'hug' | 'fill'
  children: ReactNode
}

/** Item pill (light bg + bold text) — Figma "Maintenance services |
 *  Cards". Same status as the CardHeader above it. */
export function CoverageRow({ status, width = 'fill', children }: CoverageRowProps) {
  return (
    <p className={styles.row} data-status={status} data-width={width}>
      {children}
    </p>
  )
}
