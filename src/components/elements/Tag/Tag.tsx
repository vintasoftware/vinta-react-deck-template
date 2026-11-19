import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import type { TextMode } from '../../shared/types'
import styles from './Tag.module.css'

/** outline · filled (accent tint) · glass = translucent white pill on mesh/night backgrounds · white = white pill with a blue label (light covers) */
export type TagVariant = 'outline' | 'filled' | 'glass' | 'white'

/** Tints only exist for these 3 accents (layout.md — "Accent tint
 *  surfaces"); do not invent a tint for cyan/rose/orange. */
export type TagFilledAccent = 'blue' | 'purple' | 'mint'

export interface TagProps {
  children: ReactNode
  variant?: TagVariant
  mode?: TextMode
  /** Only used when variant="filled". */
  accent?: TagFilledAccent
  /** Optional Lucide icon before the label (glass pills of the vivid layouts). */
  icon?: LucideIcon
  /** md = mono 24 (default) · sm = mono 18, compact chip (deliverables, tags under a row) */
  size?: 'md' | 'sm'
}

export function Tag({ children, variant = 'outline', mode = 'light', accent = 'blue', icon: Icon, size = 'md' }: TagProps) {
  return (
    <span className={styles.tag} data-variant={variant} data-mode={mode} data-accent={accent} data-icon={Icon ? 'true' : undefined} data-size={size}>
      {Icon && <Icon size={size === 'sm' ? 20 : 28} strokeWidth={1.5} aria-hidden="true" />}
      {children}
    </span>
  )
}
