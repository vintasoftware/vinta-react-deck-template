import type { ReactNode } from 'react'
import type { TextMode } from '../../shared/types'
import styles from './DisplayTitle.module.css'

export type DisplayTitleScale = 'display' | 'cover' | 'h1' | 'h2'

export interface DisplayTitleProps {
  /** Accepts <br /> to control line breaks, like the Divider title */
  children: ReactNode
  mode?: TextMode
  /** display=120 (default) · cover=150 (covers) · h1=60/Light (content slide title) · h2=50/Bold (smaller title, Who is Vinta) */
  scale?: DisplayTitleScale
  /** default = mode's text color · vivid = --vivid-ink on light modes (vivid slides); no effect on invert modes */
  ink?: 'default' | 'vivid'
}

export function DisplayTitle({ children, mode = 'light', scale = 'display', ink = 'default' }: DisplayTitleProps) {
  return (
    <h1 className={styles.title} data-mode={mode} data-scale={scale} data-ink={ink}>
      {children}
    </h1>
  )
}
