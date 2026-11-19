import { Fragment, type ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import type { AccentColor } from '../../shared/types'
import { SlideShell } from '../SlideShell'
import { JourneyStep } from '../../elements/JourneyStep'
import styles from './SlideJourneySingleStep.module.css'

export interface SlideJourneySingleStepProps {
  /** Each item becomes one line of the title */
  title: ReactNode[]
  /** Sentence below the title — <strong> to highlight parts */
  subtitle: ReactNode
  /** Featured phase in the center */
  phase: { index: number; weeks: number; title: ReactNode[]; icon: LucideIcon; accent?: AccentColor; badge?: ReactNode }
  /** The two circular photos on the right: `[top 641px, bottom 756px]`.
   *  They take `<img>` or any node, cropped to a circle. Default: the Figma photos
   *  (already grayscale with a blue/purple tint). */
  photos?: [ReactNode, ReactNode]
  /** 'none' (default) shows the photo as is; 'duotone' applies grayscale + a blue/purple
   *  tint on top (so raw photos match the Figma ones) */
  photoTreatment?: 'none' | 'duotone'
  /** Background exported from Figma (blue arc + bottom strip), without the photos */
  background?: ReactNode
}

/** pattern = faithful copy of the "Journey | Single Step" frame (427:810, 1920×1080).
 *  The blue arc + bottom strip come in the exported background; the two circular photos
 *  are slots (`photos`). */
export function SlideJourneySingleStep({
  title,
  subtitle,
  phase,
  photos,
  photoTreatment = 'none',
  background = <img src="/assets/journey-single-step/background-clean.png" alt="" />,
}: SlideJourneySingleStepProps) {
  return (
    <SlideShell mode="light" safeArea={144} background={background ?? <div className={styles.plain} />}>
      <div className={styles.canvas}>
        <div className={styles.photoTop} data-treatment={photoTreatment}>
          {photos?.[0] ?? <img src="/assets/journey-single-step/photo-1.png" alt="" />}
        </div>
        <div className={styles.photoBottom} data-treatment={photoTreatment}>
          {photos?.[1] ?? <img src="/assets/journey-single-step/photo-2.png" alt="" />}
        </div>

        <h1 className={styles.title}>
          {title.map((line, i) => (
            <Fragment key={i}>
              {i > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </h1>
        <p className={styles.subtitle}>{subtitle}</p>

        <div className={styles.phase}>
          <JourneyStep
            size="xl"
            index={phase.index}
            weeks={phase.weeks}
            icon={phase.icon}
            accent={phase.accent}
            badge={phase.badge}
            title={phase.title.map((line, i) => (
              <Fragment key={i}>
                {i > 0 && <br />}
                {line}
              </Fragment>
            ))}
          />
        </div>
      </div>
    </SlideShell>
  )
}
