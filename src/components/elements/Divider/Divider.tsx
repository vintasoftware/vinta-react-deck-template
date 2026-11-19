import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import styles from './Divider.module.css'

/** Color scheme — see "Divider — color schemes" in layout.md. 01/04 are the
 *  bases written out; 02 is the inverse of 01 and 03 the inverse of 04. */
export type DividerScheme = '01' | '02' | '03' | '04'

export interface DividerProps {
  /** Text of the pre-title pill (mono-md). Omitting it hides the pill. */
  preTitle?: string
  /** Display title — accepts <br /> to control the line break */
  title: ReactNode
  scheme?: DividerScheme
}

/** Real background for each scheme (original art, exported from Figma) — covers the
 *  whole slide, full-bleed. No code-generated decorative shape here. */
const BACKGROUND_BY_SCHEME: Record<DividerScheme, string> = {
  '01': '/assets/dividers/divider-01-bg.png',
  '02': '/assets/dividers/divider-02-bg.png',
  '03': '/assets/dividers/divider-03-bg.png',
  '04': '/assets/dividers/divider-04-bg.png',
}

export function Divider({ preTitle, title, scheme = '01' }: DividerProps) {
  return (
    // Full-screen like SlideShell: same `vds` scope + `data-slide` slide root.
    <div className={`vds ${styles.divider}`} data-slide data-scheme={scheme}>
      <img className={styles.bg} src={BACKGROUND_BY_SCHEME[scheme]} alt="" aria-hidden="true" />

      <div className={styles.content}>
        {preTitle && (
          <span className={styles.pill}>
            <span className={styles.pillText}>{preTitle}</span>
            <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
          </span>
        )}
        <h2 className={styles.title}>{title}</h2>
      </div>
    </div>
  )
}
