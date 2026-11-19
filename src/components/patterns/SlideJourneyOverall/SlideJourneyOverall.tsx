import { Fragment, type ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import type { AccentColor } from '../../shared/types'
import { SlideShell } from '../SlideShell'
import { JourneyStep } from '../../elements/JourneyStep'
import styles from './SlideJourneyOverall.module.css'

export interface JourneyOverallStep {
  weeks: number
  /** Each item becomes one line of the phase title */
  title: ReactNode[]
  /** Seal exported from Figma (155×155). Without it, falls back to the IconBadge with `icon` */
  badge?: ReactNode
  icon?: LucideIcon
  accent?: AccentColor
}

export interface SlideJourneyOverallProps {
  /** Each item becomes one line of the title */
  title: ReactNode[]
  /** Sentence below the title — <strong> to highlight parts */
  subtitle: ReactNode
  /** Exactly 4 phases: the positions follow the background arc */
  steps: JourneyOverallStep[]
  /** Full background exported from Figma (blue sphere) */
  background?: ReactNode
}

/** Position (x/y) of each phase block in Figma (427:878), in order. The phases
 *  follow the sphere's edge, which is why x varies. */
const POSITIONS = [
  { left: 693, top: 96 },
  { left: 760, top: 339 },
  { left: 748, top: 584 },
  { left: 693, top: 828 },
]

/** Colors per phase (Figma): [title, label]. Tokens only. */
const TONES = [
  { title: 'var(--accent-orange-coral)', label: 'var(--slate-700)' },
  { title: 'var(--accent-emerald)', label: 'var(--slate-700)' },
  { title: 'var(--blue-600)', label: 'var(--slate-700)' },
  { title: 'var(--accent-violet-electric)', label: 'var(--ink-violet-deep)' },
]

/** pattern = faithful copy of the "Journey | Overall" frame (427:878, 1920×1080).
 *  The blue sphere comes in a single exported background; the phase seals are Figma SVGs. */
export function SlideJourneyOverall({ title, subtitle, steps, background }: SlideJourneyOverallProps) {
  return (
    <SlideShell
      mode="light"
      safeArea={144}
      background={background ?? <img src="/assets/journey-overall/background.png" alt="" />}
    >
      <div className={styles.canvas}>
        <h1 className={styles.title}>
          {title.map((line, i) => (
            <Fragment key={i}>
              {i > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </h1>
        <p className={styles.subtitle}>{subtitle}</p>

        {steps.slice(0, POSITIONS.length).map((step, i) => (
          <div key={i} className={styles.step} style={POSITIONS[i]}>
            <JourneyStep
              size="xxl"
              index={i + 1}
              weeks={step.weeks}
              icon={step.icon as LucideIcon}
              accent={step.accent}
              badge={step.badge}
              titleColor={TONES[i].title}
              labelColor={TONES[i].label}
              title={step.title.map((line, j) => (
                <Fragment key={j}>
                  {j > 0 && <br />}
                  {line}
                </Fragment>
              ))}
            />
          </div>
        ))}
      </div>
    </SlideShell>
  )
}
