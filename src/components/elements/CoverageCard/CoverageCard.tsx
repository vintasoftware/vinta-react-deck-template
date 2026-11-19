import type { ReactNode } from 'react'
import { CardHeader, type CardHeaderStatus } from '../CardHeader'
import { CoverageRow } from '../CoverageRow'
import styles from './CoverageCard.module.css'

export interface CoverageCardProps {
  status: CardHeaderStatus
  label: ReactNode
  items: ReactNode[]
}

/** CardHeader + list of CoverageRow — white card 480 wide
 *  (Figma — "Maintenance services | Cards"). The first item only takes the
 *  text width, the others the full width, as in the frame. */
export function CoverageCard({ status, label, items }: CoverageCardProps) {
  return (
    <div className={styles.card}>
      <CardHeader status={status} label={label} />
      <div className={styles.rows}>
        {items.map((item, i) => (
          <CoverageRow key={i} status={status} width={i === 0 ? 'hug' : 'fill'}>
            {item}
          </CoverageRow>
        ))}
      </div>
    </div>
  )
}
