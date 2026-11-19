import type { ReactNode } from 'react'
import type { AccentColor, TextMode } from '../../shared/types'
import styles from './Subtitle.module.css'

export interface SubtitleProps {
  children: ReactNode
  mode?: TextMode
}

/** layout.md — Elements: "DM Sans ~40, with keyword in accent + underline".
 *  The keyword uses <SubtitleAccent>, exported alongside. */
export function Subtitle({ children, mode = 'light' }: SubtitleProps) {
  return (
    <p className={styles.subtitle} data-mode={mode}>
      {children}
    </p>
  )
}

export interface SubtitleAccentProps {
  children: ReactNode
  mode?: TextMode
  /** Keyword + underline color. "The Intro tick/underline is just a
   *  usage example, not exclusive to orange" (layout.md). */
  accent?: AccentColor
}

export function SubtitleAccent({ children, mode = 'light', accent = 'blue' }: SubtitleAccentProps) {
  return (
    <span className={styles.accent} data-mode={mode} data-accent={accent}>
      {children}
    </span>
  )
}
