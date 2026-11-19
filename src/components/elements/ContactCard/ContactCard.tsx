import type { ReactNode } from 'react'
import styles from './ContactCard.module.css'

export interface ContactLine {
  /** 24px icon (Figma SVG or any node) */
  icon: ReactNode
  text: ReactNode
}

export interface ContactCardProps {
  name: ReactNode
  /** Role/area — uppercase mono */
  role: ReactNode
  /** Portrait slot (159×159, already cropped to a circle) */
  avatar?: ReactNode
  /** Contact lines: icon + mono text */
  lines: ContactLine[]
}

/** Portrait + name + role + contact lines (Figma — Closing Slide).
 *  Exact measurements of frame 427:1178. */
export function ContactCard({ name, role, avatar, lines }: ContactCardProps) {
  return (
    <div className={styles.card}>
      {avatar && <div className={styles.avatar}>{avatar}</div>}
      <div className={styles.info}>
        <p className={styles.name}>{name}</p>
        <p className={styles.role}>{role}</p>
        <ul className={styles.lines}>
          {lines.map(({ icon, text }, i) => (
            <li key={i} className={styles.line}>
              <span className={styles.icon}>{icon}</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
