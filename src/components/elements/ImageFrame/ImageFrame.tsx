import type { ReactNode } from 'react'
import styles from './ImageFrame.module.css'

export type ImageFrameVariant = 'card' | 'browser'

export interface ImageFrameProps {
  /** card = simple frame · browser = chrome with 3 dots (Who is Vinta) */
  variant?: ImageFrameVariant
  width?: number
  height?: number
  /** Real image/product slot. Without it, shows the default placeholder
   *  (harness §5: surface-mist). */
  children?: ReactNode
}

export function ImageFrame({ variant = 'card', width = 892, height = 485, children }: ImageFrameProps) {
  return (
    <div className={styles.frame} data-variant={variant} style={{ width, height }}>
      {variant === 'browser' && (
        <div className={styles.chrome} aria-hidden="true">
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
      )}
      <div className={styles.body}>{children ?? <div className={styles.placeholder} aria-hidden="true" />}</div>
    </div>
  )
}
