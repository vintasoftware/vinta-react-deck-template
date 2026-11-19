import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import type { AccentColor } from '../../shared/types'
import { SlideShell } from '../SlideShell'
import { VividBackground } from '../../elements/VividBackground'
import { SlideHeader } from '../../elements/SlideHeader'
import { IconBadge } from '../../elements/IconBadge'
import { Body } from '../../elements/Body'
import styles from './SlideStepPath.module.css'

export interface PathStep {
  icon: LucideIcon
  /** Icon color of the tile (and the active step's gradient). Default blue; keep one accent per slide. */
  accent?: AccentColor
  /** Mono label above the title (when), e.g. "WEEK 1", ≤ ~12 characters. */
  label: string
  /** ≤ ~18 characters, one line. */
  title: string
  /** One sentence: ≤ ~80 characters with 3–4 steps, ≤ ~55 with 5. */
  text: string
}

export interface SlideStepPathProps {
  eyebrow?: string
  /** Title, line 1 (ink), ≤ ~45 characters. A full title with your own `<Highlight>` also works. */
  title: ReactNode
  /** Title, line 2 in blue (the site's two-tone title), ≤ ~45 characters. */
  accent?: ReactNode
  /** One sentence under the title, ≤ ~110 characters. */
  lede?: ReactNode
  /** 3–5 steps; the row re-flows to fill the width. */
  steps: PathStep[]
  /** The highlighted step (gradient tile, accent label, solid line up to it). Default 0 (the first); -1 = none. */
  activeIndex?: number
}

/** A path of 3–5 steps joined by a thin line, under the site's two-tone header: quiet icon tile, mono label (when),
 *  title and one sentence. The active step is highlighted. How it works, timelines. Wash background. */
export function SlideStepPath({ eyebrow, title, accent, lede, steps, activeIndex = 0 }: SlideStepPathProps) {
  return (
    <SlideShell mode="light" safeArea={144} background={<VividBackground variant="wash" />}>
      <div className={styles.body}>
        <SlideHeader eyebrow={eyebrow} title={title} accent={accent} lede={lede} width={1300} />
        <ol className={styles.steps} data-count={steps.length}>
          {steps.map((s, i) => {
            const active = i === activeIndex
            return (
              <li
                key={s.title}
                className={styles.step}
                data-accent={s.accent ?? 'blue'}
                data-active={active || undefined}
                data-done={i < activeIndex || undefined}
              >
                <div className={styles.rail}>
                  <IconBadge
                    variant={active ? 'gradient' : 'white'}
                    shape="square"
                    accent={s.accent ?? 'blue'}
                    icon={s.icon}
                    size={72}
                  />
                  {i < steps.length - 1 && <span className={styles.connector} aria-hidden="true" />}
                </div>
                <p className={styles.label}>{s.label}</p>
                <Body tone="primary" ink="vivid">
                  {s.title}
                </Body>
                <Body weight="regular">{s.text}</Body>
              </li>
            )
          })}
        </ol>
      </div>
    </SlideShell>
  )
}
