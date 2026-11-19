import type { ReactNode } from 'react'
import styles from './TagGroup.module.css'

export interface TagGroupProps {
  children: ReactNode
}

export function TagGroup({ children }: TagGroupProps) {
  return <div className={styles.tagGroup}>{children}</div>
}
