import type { CSSProperties, ReactNode } from 'react'
import styles from './ArtCard.module.css'

/** Text box positioned inside the card (px relative to the top-left
 *  corner of the art). */
export interface ArtCardTextBox {
  left: number
  top: number
  width: number
}

export type ArtCardSize = 'lg' | 'md'

export interface ArtCardProps {
  /** Card shape exported from Figma (SVG with notch, seal and icon) */
  art: ReactNode
  /** Art dimensions, in px */
  width: number
  height: number
  /** lg = mono title 36/44 (What we heard B) · md = mono title 30/38 + description 22/30 (What we heard A) */
  size?: ArtCardSize
  title: ReactNode
  titleBox: ArtCardTextBox
  description?: ReactNode
  /** Description anchored at the bottom: px between the card's bottom and the text's baseline */
  descriptionBox?: { left: number; bottom: number; width: number }
}

/** Card whose shape (corners, notch, icon seal) comes from Figma as an SVG —
 *  live text sits on top, at the frame's exact positions. */
export function ArtCard({ art, width, height, size = 'lg', title, titleBox, description, descriptionBox }: ArtCardProps) {
  return (
    <div className={styles.card} data-size={size} style={{ width, height }}>
      <div className={styles.art}>{art}</div>
      <p className={styles.title} style={{ left: titleBox.left, top: titleBox.top, width: titleBox.width } as CSSProperties}>
        {title}
      </p>
      {description && descriptionBox && (
        <p
          className={styles.description}
          style={{ left: descriptionBox.left, bottom: descriptionBox.bottom, width: descriptionBox.width } as CSSProperties}
        >
          {description}
        </p>
      )}
    </div>
  )
}
