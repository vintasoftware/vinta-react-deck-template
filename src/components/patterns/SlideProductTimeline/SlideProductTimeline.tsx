import type { ReactNode } from 'react'
import { SlideShell } from '../SlideShell'
import { PhaseHeader, type PhaseHeaderAccent } from '../../elements/PhaseHeader'
import { TimelineBar } from '../../elements/TimelineBar'
import styles from './SlideProductTimeline.module.css'

export interface TimelinePhase {
  label: ReactNode
  title: ReactNode
  duration: ReactNode
  accent: PhaseHeaderAccent
  /** Text of each bar, top to bottom (6 items, Figma positions) */
  bars: ReactNode[]
  /** The column's dotted lines (Figma SVG) */
  guides?: ReactNode
}

export interface SlideProductTimelineProps {
  title: ReactNode
  subtitle: ReactNode
  /** Exatamente 3 fases */
  phases: [TimelinePhase, TimelinePhase, TimelinePhase]
  /** Blue top strip exported from Figma (1920×182) */
  header?: ReactNode
}

/** Coordinates of each bar per column (x, y) — frame 427:630 */
const BAR_POSITIONS: Array<Array<[number, number]>> = [
  [[100.29, 451.4], [222.13, 521.58], [326.43, 610.28], [170.47, 691.18], [409.28, 771.11], [191.92, 852.01]],
  [[694.87, 451.4], [894.69, 521.58], [1016.53, 610.28], [765.05, 691.18], [938.56, 771.11], [786.5, 852.01]],
  [[1443.46, 451.4], [1298.23, 521.58], [1515.59, 610], [1330.4, 691.18], [1485.38, 771.11], [1608, 852.01]],
]

/** Column positions: tint background (x, width) · guides (x, width) · header (x, width) */
const COLUMNS = [
  { tint: 'purple', rectX: 74.95, rectW: 590.68, guideX: 73, guideW: 469.8, headX: 100.29, headW: 539 },
  { tint: 'mint', rectX: 666.61, rectW: 590.68, guideX: 665.63, guideW: 469.8, headX: 694.87, headW: 525.4 },
  { tint: 'blue', rectX: 1256.32, rectW: 590.68, guideX: 1256.32, guideW: 591.6, headX: 1285.56, headW: 530.3 },
] as const

/** pattern = faithful copy of the "Product Timeline | Alt 01" frame (427:630). */
export function SlideProductTimeline({ title, subtitle, phases, header = <img src="/assets/timeline-alt-01/header-band.png" alt="" /> }: SlideProductTimelineProps) {
  return (
    <SlideShell mode="light" safeArea={69} background={<div className={styles.plain} />}>
      <div className={styles.canvas}>
        <div className={styles.header}>{header}</div>
        <div className={styles.heading}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        {phases.map((phase, i) => {
          const col = COLUMNS[i]
          return (
            <div key={i} className={styles.phaseGroup}>
              <div className={styles.tint} data-tint={col.tint} style={{ left: col.rectX, width: col.rectW }} />
              {phase.guides && (
                <div className={styles.guides} style={{ left: col.guideX, width: col.guideW }}>
                  {phase.guides}
                </div>
              )}
              <div className={styles.phaseHeader} style={{ left: col.headX, width: col.headW }}>
                <PhaseHeader label={phase.label} title={phase.title} duration={phase.duration} accent={phase.accent} />
              </div>
              {phase.bars.map((bar, j) => (
                <div key={j} className={styles.bar} style={{ left: BAR_POSITIONS[i][j][0], top: BAR_POSITIONS[i][j][1] }}>
                  <TimelineBar accent={phase.accent}>{bar}</TimelineBar>
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </SlideShell>
  )
}
