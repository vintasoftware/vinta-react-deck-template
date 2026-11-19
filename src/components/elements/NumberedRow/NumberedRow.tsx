import type { ReactNode } from 'react'
import type { AccentColor, TextMode } from '../../shared/types'
import styles from './NumberedRow.module.css'

export interface NumberedRowProps {
  /** e.g. "01" — the element does not number itself, whoever builds the list decides */
  index: string
  title: ReactNode
  /** Supporting line below the title */
  detail?: ReactNode
  /** Info on the right (time, duration, page) */
  meta?: ReactNode
  accent?: AccentColor
  mode?: TextMode
}

/** Numbered row: mono index in the accent + H4 title + detail + meta.
 *  Base for agendas, tables of contents and listed steps. */
export function NumberedRow({ index, title, detail, meta, accent = 'blue', mode = 'light' }: NumberedRowProps) {
  return (
    <div className={styles.row} data-mode={mode} data-accent={accent}>
      <span className={styles.index}>{index}</span>
      <div className={styles.body}>
        <span className={styles.title}>{title}</span>
        {detail && <span className={styles.detail}>{detail}</span>}
      </div>
      {meta && <span className={styles.meta}>{meta}</span>}
    </div>
  )
}
