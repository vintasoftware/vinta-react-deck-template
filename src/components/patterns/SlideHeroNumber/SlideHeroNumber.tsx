import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { SlideShell } from '../SlideShell'
import { VividBackground } from '../../elements/VividBackground'
import { SlideHeader } from '../../elements/SlideHeader'
import { Body } from '../../elements/Body'
import { VividCard } from '../../elements/VividCard'
import styles from './SlideHeroNumber.module.css'

export interface SlideHeroNumberProps {
  /** Mono label above the title, e.g. "KEY FINDING | SAMPLE". */
  eyebrow?: string
  /** Title, line 1 (ink). A title that already wraps words in `<Highlight>` still works. */
  title: ReactNode
  /** Title, line 2 in the accent color (blue on light, turquoise on dark): the site's two-tone title. */
  accent?: ReactNode
  /** One or two sentences under the title. */
  lede?: ReactNode
  /** The number that matters, in turquoise (≤ ~4 characters with `previous`, ~8 without). */
  value: string
  /** Earlier number, shown in white before an arrow: "37 → 17". Leave out for a single number. */
  previous?: string
  /** One line under the number saying what it counts, e.g. "articles published, 2025 vs 2026 so far". */
  caption: string
  /** Up to 3 short findings (≤ ~70 characters each), numbered 01, 02… in cards on the right. */
  points?: string[]
  /** Background: blue mesh (default) or deep navy. */
  background?: 'mesh' | 'night'
}

/** One hero number (optionally "before → after") with a caption, plus up to 3 numbered findings. Dark vivid background. */
export function SlideHeroNumber({ eyebrow, title, accent, lede, value, previous, caption, points, background = 'mesh' }: SlideHeroNumberProps) {
  const mode = background === 'night' ? 'invert-navy' : 'invert-blue'
  return (
    <SlideShell mode={mode} safeArea={144} background={<VividBackground variant={background} />}>
      <div className={styles.body}>
        <SlideHeader eyebrow={eyebrow} title={title} accent={accent} lede={lede} mode={mode} />
        <div className={styles.fill}>
          <div className={styles.row}>
            <div className={styles.hero}>
              <div className={styles.numbers}>
                {previous && (
                  <>
                    <span className={styles.previous}>{previous}</span>
                    <ArrowRight className={styles.arrow} size={130} strokeWidth={1.5} aria-label="to" />
                  </>
                )}
                <span className={styles.value}>{value}</span>
              </div>
              <p className={styles.caption}>{caption}</p>
            </div>
            {points && points.length > 0 && (
              <div className={styles.points}>
                {points.map((text, i) => (
                  <VividCard key={i} surface="glass" radius="md">
                    <span className={styles.number}>{String(i + 1).padStart(2, '0')}</span>
                    <Body mode={mode} tone="primary">
                      {text}
                    </Body>
                  </VividCard>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </SlideShell>
  )
}
