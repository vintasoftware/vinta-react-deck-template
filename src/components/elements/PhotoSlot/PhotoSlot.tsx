import type { CSSProperties } from 'react'
import styles from './PhotoSlot.module.css'

/** none · blue = brand-blue tint (feature photos) · veil = navy veil from the left (white text on top) ·
 *  fade = navy fade at the bottom (bands, covers) */
export type PhotoOverlay = 'none' | 'blue' | 'veil' | 'fade'
export type PhotoRadius = 'none' | 'sm' | 'md' | 'lg' | 'circle'

export interface PhotoSlotProps {
  /** Image path, e.g. `/assets/team/points.webp`. Leave out to show the dashed placeholder. */
  src?: string
  alt?: string
  /** Slot size in px. Use '100%' to fill the parent. */
  width: number | string
  height: number | string
  overlay?: PhotoOverlay
  radius?: PhotoRadius
  /** Placeholder style: light (on light backgrounds) or dark (on mesh/night). */
  placeholder?: 'light' | 'dark'
  /** CSS object-position, to keep faces in frame, e.g. "50% 30%". */
  position?: string
}

/** A photo cropped to its slot (`object-fit: cover`), with an optional brand overlay.
 *  Without `src` it renders the dashed placeholder the vivid layouts use for missing photos. */
export function PhotoSlot({
  src,
  alt = '',
  width,
  height,
  overlay = 'none',
  radius = 'none',
  placeholder = 'light',
  position,
}: PhotoSlotProps) {
  const style: CSSProperties = { width, height }
  return (
    <div className={styles.slot} style={style} data-radius={radius} data-overlay={overlay}>
      {src ? (
        <img className={styles.img} src={src} alt={alt} style={position ? { objectPosition: position } : undefined} />
      ) : (
        <div className={styles.placeholder} data-tone={placeholder} role="img" aria-label={alt || 'Photo placeholder'} />
      )}
      {src && overlay !== 'none' && <div className={styles.overlay} aria-hidden="true" />}
    </div>
  )
}
