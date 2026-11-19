import type { ReactNode } from 'react'
import type { TextMode } from '../../shared/types'
import styles from './Highlight.module.css'

export interface HighlightProps {
  children: ReactNode
  /** light modes → feature blue · invert modes → turquoise */
  mode?: TextMode
  /** solid (default) · gradient = turquoise → white text gradient (night cover, invert modes only) */
  variant?: 'solid' | 'gradient'
}

/** Highlighted words inside a title, as on the vivid slides: "Medplum: <Highlight>fast-tracking EHR building</Highlight>". */
export function Highlight({ children, mode = 'light', variant = 'solid' }: HighlightProps) {
  return (
    <span className={styles.highlight} data-mode={mode} data-variant={variant}>
      {children}
    </span>
  )
}
