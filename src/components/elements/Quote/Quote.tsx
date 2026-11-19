import type { ReactNode } from 'react'
import type { AccentColor, TextMode } from '../../shared/types'
import styles from './Quote.module.css'

export interface QuoteProps {
  /** The quote text, without quotation marks — the element draws the opening mark */
  children: ReactNode
  author?: ReactNode
  role?: ReactNode
  mode?: TextMode
  accent?: AccentColor
}

/** Quote/testimonial. Text in H1 (60/Light) italic (the harness §4 quote
 *  role, at slide scale); opening mark in the accent. */
export function Quote({ children, author, role, mode = 'light', accent = 'blue' }: QuoteProps) {
  return (
    <figure className={styles.quote} data-mode={mode} data-accent={accent}>
      <span className={styles.mark} aria-hidden="true">
        &ldquo;
      </span>
      <blockquote className={styles.text}>{children}</blockquote>
      {(author || role) && (
        <figcaption className={styles.caption}>
          {author && <span className={styles.author}>{author}</span>}
          {role && <span className={styles.role}>{role}</span>}
        </figcaption>
      )}
    </figure>
  )
}
