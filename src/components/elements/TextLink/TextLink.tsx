import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import type { AccentColor, TextMode } from '../../shared/types'
import styles from './TextLink.module.css'

export type TextLinkVariant = 'text' | 'button'
export type TextLinkSize = 'md' | 'lg'

export interface TextLinkProps {
  children: ReactNode
  mode?: TextMode
  accent?: AccentColor
  /** text = bare mono link (default) · button = CTA look (background
   *  solid, bigger) */
  variant?: TextLinkVariant
  /** md = mono-label 18 (default) · lg = 22, weight 500, no tracking (Figma — Client case) */
  size?: TextLinkSize
  /** When set, renders <a>; otherwise <button> (the deck does not really navigate) */
  href?: string
  onClick?: () => void
}

/** Mono/accent text + arrow-right (layout.md — "Client case": "VIEW THE
 *  FULL CASE STUDY"). */
export function TextLink({ children, mode = 'light', accent = 'blue', variant = 'text', size = 'md', href, onClick }: TextLinkProps) {
  const content = (
    <>
      {children}
      <ArrowRight size={size === 'lg' ? 20 : 16} strokeWidth={1.5} aria-hidden="true" />
    </>
  )

  if (href) {
    return (
      <a className={styles.link} data-mode={mode} data-accent={accent} data-variant={variant} data-size={size} href={href}>
        {content}
      </a>
    )
  }

  return (
    <button
      type="button"
      className={styles.link}
      data-mode={mode}
      data-accent={accent}
      data-variant={variant}
      data-size={size}
      onClick={onClick}
    >
      {content}
    </button>
  )
}
