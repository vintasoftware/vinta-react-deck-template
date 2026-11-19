import type { ReactNode } from 'react'
import type { AccentColor, TextMode } from '../../shared/types'
import styles from './PersonCard.module.css'

export interface PersonCardProps {
  name: string
  role: ReactNode
  /** Photo. Without it, shows the initials over an accent tint. */
  src?: string
  /** Optional short sentence below the role */
  bio?: ReactNode
  accent?: AccentColor
  mode?: TextMode
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

/** Person card (team, speakers, contacts). 160px circular avatar, name in
 *  H4, role in mono-label. Sits on the mode's --color-surface-alt. */
export function PersonCard({ name, role, src, bio, accent = 'blue', mode = 'light' }: PersonCardProps) {
  return (
    <div className={styles.card} data-mode={mode} data-accent={accent}>
      <div className={styles.avatar}>
        {src ? <img className={styles.photo} src={src} alt={name} /> : <span className={styles.initials}>{initials(name)}</span>}
      </div>
      <div className={styles.text}>
        <span className={styles.name}>{name}</span>
        <span className={styles.role}>{role}</span>
        {bio && <span className={styles.bio}>{bio}</span>}
      </div>
    </div>
  )
}
