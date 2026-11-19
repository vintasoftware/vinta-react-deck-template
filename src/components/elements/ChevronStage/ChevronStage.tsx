import type { ReactNode } from 'react'
import type { TagFilledAccent } from '../Tag'
import styles from './ChevronStage.module.css'

export type ChevronSaturation = 'tint' | 'mid' | 'solid'
/** Position in the row: first = straight left edge · middle = notch on the
 *  left + point on the right · last = notch on the left, straight right edge */
export type ChevronEdge = 'first' | 'middle' | 'last'

export interface ChevronStageProps {
  /** 1, 2, 3… becomes "0X" in the label */
  index: number
  /** ex.: "VALIDATE" */
  label: string
  title: ReactNode
  /** Use <br /> to fix the line breaks */
  description: ReactNode
  saturation?: ChevronSaturation
  /** Only affects tint/mid — tint only exists for blue/purple/mint in the
   *  harness. "solid" is always the fixed brand blue gradient (Figma — Alt 03). */
  accent?: TagFilledAccent
  edge?: ChevronEdge
}

/** Figma — Alt 03: chevron segment (43px notch on the left, point on the
 *  right via clip-path), saturation increasing along the row. In a
 *  row, each stage overlaps the previous one by 43px (margin-left: -43px). */
export function ChevronStage({
  index,
  label,
  title,
  description,
  saturation = 'tint',
  accent = 'blue',
  edge = 'middle',
}: ChevronStageProps) {
  const indexLabel = String(index).padStart(2, '0')

  return (
    <div className={styles.chevron} data-saturation={saturation} data-accent={accent} data-edge={edge}>
      <p className={styles.label}>
        {indexLabel}&nbsp;&nbsp;·&nbsp;&nbsp;{label}
      </p>
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.description}>{description}</p>
    </div>
  )
}
