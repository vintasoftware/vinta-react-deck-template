import type { CSSProperties, ReactNode } from 'react'
import styles from './VividCard.module.css'

/** white = white card with a thin border (light backgrounds) · glass = translucent white (mesh/night/colored) ·
 *  navy = deep navy card (the highlighted card in a light row) */
export type VividCardSurface = 'white' | 'glass' | 'navy'

export interface VividCardProps {
  children: ReactNode
  surface?: VividCardSurface
  /** Inner padding: md = 28 (cards with a photo header) · lg = 40 (text cards) */
  padding?: 'none' | 'md' | 'lg'
  radius?: 'md' | 'lg'
  /** Layout passthrough (flex sizing, explicit size). Colors stay in the surface. */
  style?: CSSProperties
}

/** The card surface of the vivid layouts. Lays its children in a column; the pattern decides the content. */
export function VividCard({ children, surface = 'white', padding = 'lg', radius = 'lg', style }: VividCardProps) {
  return (
    <div className={styles.card} data-surface={surface} data-padding={padding} data-radius={radius} style={style}>
      {children}
    </div>
  )
}
