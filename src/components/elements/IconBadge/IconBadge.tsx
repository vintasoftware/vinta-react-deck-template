import type { LucideIcon } from 'lucide-react'
import type { AccentColor } from '../../shared/types'
import styles from './IconBadge.module.css'

export type IconBadgeShape = 'square' | 'circle'

/** solid = accent fill, white icon (default) · gradient = accent gradient + shadow, white icon ·
 *  glass = translucent white on dark backgrounds · pale = soft accent tint, accent icon ·
 *  white = white tile with a thin border, accent icon · ring = white circle inside an accent gradient ring */
export type IconBadgeVariant = 'solid' | 'gradient' | 'glass' | 'pale' | 'white' | 'ring'

export interface IconBadgeProps {
  shape?: IconBadgeShape
  accent?: AccentColor
  /** Lucide icon component (only Lucide, stroke 1.5) */
  icon: LucideIcon
  size?: number
  /** Tile style. The vivid layouts use gradient/glass/pale/white/ring; the Figma screens use solid. */
  variant?: IconBadgeVariant
}

/** Icon inside a colored shape: IconCard ("What we heard"), JourneyStep ("Journey | Overall")
 *  and the icon tiles of the vivid layouts. */
export function IconBadge({ shape = 'circle', accent = 'blue', icon: Icon, size = 56, variant = 'solid' }: IconBadgeProps) {
  return (
    <span
      className={styles.badge}
      data-shape={shape}
      data-accent={accent}
      data-variant={variant}
      style={{ width: size, height: size }}
    >
      {variant === 'ring' ? (
        <span className={styles.ringInner}>
          <Icon size={size * 0.42} strokeWidth={1.5} aria-hidden="true" />
        </span>
      ) : (
        <Icon size={size * (variant === 'solid' ? 0.5 : 0.46)} strokeWidth={1.5} aria-hidden="true" />
      )}
    </span>
  )
}
