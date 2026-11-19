import { type ReactNode } from 'react'
import { SlideShell } from '../SlideShell'
import { DisplayTitle } from '../../elements/DisplayTitle'
import { CoverageCard } from '../../elements/CoverageCard'
import styles from './SlideMaintenanceServices.module.css'

export interface SlideMaintenanceServicesProps {
  title: ReactNode
  description: ReactNode
  coverage: { label: ReactNode; items: ReactNode[] }
  exclusions: { label: ReactNode; items: ReactNode[] }
  /** Note below the 1st card: bold label + regular text */
  note: { label: ReactNode; text: ReactNode }
  /** Background exported from Figma (blue gradient, ellipse and top strip) */
  background?: ReactNode
}

/** pattern = faithful copy of the "Maintenance services | Cards" frame (427:974). */
export function SlideMaintenanceServices({ title, description, coverage, exclusions, note, background = <img src="/assets/maintenance/background.png" alt="" /> }: SlideMaintenanceServicesProps) {
  return (
    <SlideShell mode="invert-blue" safeArea={93} background={background}>
      <div className={styles.canvas}>
        <div className={styles.title}>
          <DisplayTitle mode="invert-blue" scale="display">
            {title}
          </DisplayTitle>
        </div>
        <p className={styles.description}>{description}</p>

        <div className={styles.card} data-slot="coverage">
          <CoverageCard status="success" label={coverage.label} items={coverage.items} />
        </div>
        <div className={styles.card} data-slot="exclusions">
          <CoverageCard status="danger" label={exclusions.label} items={exclusions.items} />
        </div>

        <p className={styles.note}>
          <strong>{note.label}</strong> {note.text}
        </p>
      </div>
    </SlideShell>
  )
}
