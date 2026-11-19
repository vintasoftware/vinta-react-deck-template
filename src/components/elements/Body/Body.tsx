import type { ReactNode } from 'react'
import type { TextMode } from '../../shared/types'
import styles from './Body.module.css'

export type BodySize = 'h4' | 'body'
export type BodyTone = 'primary' | 'secondary' | 'muted'

export interface BodyProps {
  children: ReactNode
  /** h4 = 30/Medium (slide descriptive text, the default) · body = 20/Regular (notes, footers) */
  size?: BodySize
  /** Semantic color role: primary · secondary (default) · muted */
  tone?: BodyTone
  mode?: TextMode
  /** Overrides the size's weight: regular = 400 (supporting text under a medium title in the vivid layouts). */
  weight?: 'default' | 'regular'
  /** default = mode's text color · vivid = --vivid-ink for primary text on light modes (vivid slides) */
  ink?: 'default' | 'vivid'
}

/** Descriptive text paragraph. Fills the "no Body element" gap —
 *  team rule: slide descriptive text is H4 (30), body (20) only for notes. */
export function Body({ children, size = 'h4', tone = 'secondary', mode = 'light', weight = 'default', ink = 'default' }: BodyProps) {
  return (
    <p className={styles.body} data-size={size} data-tone={tone} data-mode={mode} data-weight={weight} data-ink={ink}>
      {children}
    </p>
  )
}
