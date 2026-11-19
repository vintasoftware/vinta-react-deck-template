import type { ReactNode } from 'react'
import { SlideShell } from '../SlideShell'
import { ContactCard, type ContactCardProps } from '../../elements/ContactCard'
import styles from './SlideClosing.module.css'

export interface SlideClosingProps {
  title: ReactNode
  contact: ContactCardProps
  /** Background exported from Figma (gradient, shapes, top strip) */
  background?: ReactNode
  /** Thin lines below the contact (Figma assets) */
  rules?: ReactNode[]
  /** Wordmark Vinta (128×29) */
  logo?: ReactNode
}

/** pattern = faithful copy of the "Closing Slide" frame (1920×1080). */
export function SlideClosing({ title, contact, background = <img src="/assets/closing/background.png" alt="" />, rules = [], logo }: SlideClosingProps) {
  return (
    <SlideShell mode="light" safeArea={142} background={background ?? <div className={styles.plain} />}>
      <div className={styles.canvas}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.contact}>
          <ContactCard {...contact} />
        </div>
        {rules.map((rule, i) => (
          <div key={i} className={styles.rule} data-index={i}>
            {rule}
          </div>
        ))}
        {logo && <div className={styles.logo}>{logo}</div>}
      </div>
    </SlideShell>
  )
}
