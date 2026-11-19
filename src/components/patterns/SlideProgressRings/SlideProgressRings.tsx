import type { ReactNode } from 'react'
import { SlideShell } from '../SlideShell'
import { VividBackground } from '../../elements/VividBackground'
import { SlideHeader } from '../../elements/SlideHeader'
import { Body } from '../../elements/Body'
import styles from './SlideProgressRings.module.css'

export interface ProgressRing {
  /** Percentage from 0 to 100; drawn as the filled part of the ring and shown as "92%" in the middle. */
  value: number
  /** Short name under the ring (≤ ~24 characters), e.g. "Discovery to proposal". */
  label: string
  /** One sentence under the name (≤ ~50 characters, up to 2 lines). */
  description?: string
}

export interface SlideProgressRingsProps {
  /** Mono label above the title, e.g. "SAMPLE DATA | CONVERSION". */
  eyebrow?: string
  /** Title, line 1 (ink). A title that already wraps words in `<Highlight>` still works. */
  title: ReactNode
  /** Title, line 2 in the accent color (blue on light, turquoise on dark): the site's two-tone title. */
  accent?: ReactNode
  /** One or two sentences under the title. */
  lede?: ReactNode
  /** 2 or 3 rings, side by side. */
  rings: ProgressRing[]
}

const SIZE = 400
const RADIUS = 170
const STROKE = 40

/** Progress rings: 2 or 3 percentages, each with a label and a short description. Light vivid background. */
export function SlideProgressRings({ eyebrow, title, accent, lede, rings }: SlideProgressRingsProps) {
  const circumference = 2 * Math.PI * RADIUS
  return (
    <SlideShell mode="light" safeArea={144} background={<VividBackground variant="wash" />}>
      <div className={styles.body}>
        <SlideHeader eyebrow={eyebrow} title={title} accent={accent} lede={lede} mode="light" />
        <div className={styles.fill}>
          <div className={styles.row}>
            {rings.map((ring, i) => {
              const value = Math.min(Math.max(ring.value, 0), 100)
              const length = (circumference * value) / 100
              return (
                <div key={i} className={styles.column}>
                  <div className={styles.ring}>
                    <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden="true">
                      <circle className={styles.track} cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none" strokeWidth={STROKE} />
                      {value > 0 && (
                        <circle
                          className={styles.progress}
                          cx={SIZE / 2}
                          cy={SIZE / 2}
                          r={RADIUS}
                          fill="none"
                          strokeWidth={STROKE}
                          strokeLinecap="round"
                          strokeDasharray={`${length} ${circumference - length}`}
                          transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
                        />
                      )}
                    </svg>
                    <span className={styles.value}>{ring.value}%</span>
                  </div>
                  <div className={styles.caption}>
                    <p className={styles.label}>{ring.label}</p>
                    {ring.description && <Body>{ring.description}</Body>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </SlideShell>
  )
}
