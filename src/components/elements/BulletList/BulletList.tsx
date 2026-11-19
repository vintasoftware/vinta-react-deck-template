import type { ReactNode } from 'react'
import { Check } from 'lucide-react'
import type { AccentColor, TextMode } from '../../shared/types'
import styles from './BulletList.module.css'

export type BulletVariant = 'dot' | 'check' | 'number'

export interface BulletListProps {
  items: ReactNode[]
  /** dot = round marker · check = Lucide check · number = 01, 02… in mono */
  variant?: BulletVariant
  accent?: AccentColor
  mode?: TextMode
}

/** A slide's list of points. Text in H4 (30/Medium); the marker uses the mode's
 *  accent color. Recommended maximum: 5 items per slide. */
export function BulletList({ items, variant = 'dot', accent = 'blue', mode = 'light' }: BulletListProps) {
  const Tag = variant === 'number' ? 'ol' : 'ul'
  return (
    <Tag className={styles.list} data-mode={mode} data-accent={accent}>
      {items.map((item, i) => (
        <li key={i} className={styles.item}>
          <span className={styles.marker} data-variant={variant} aria-hidden="true">
            {variant === 'check' && <Check size={28} strokeWidth={1.5} />}
            {variant === 'number' && String(i + 1).padStart(2, '0')}
          </span>
          <span className={styles.text}>{item}</span>
        </li>
      ))}
    </Tag>
  )
}
