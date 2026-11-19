import type { ReactNode } from 'react'
import { SlideShell } from '../SlideShell'
import { VividBackground } from '../../elements/VividBackground'
import { SlideHeader } from '../../elements/SlideHeader'
import { VividCard } from '../../elements/VividCard'
import styles from './SlideFunnel.module.css'

/** outline = dashed light slice (widest, least qualified) · soft = light blue · solid = vivid blue (the result). */
export type FunnelStageVariant = 'outline' | 'soft' | 'solid'

export interface FunnelStage {
  /** Short mono name in the pill (e.g. "LEADS"). */
  label: string
  /** Count shown on the right of the card, already formatted (e.g. "1,240"). */
  value: string
  /** One line explaining the stage (~70 characters). */
  description: string
  /** Defaults by position: first = outline, last = solid, the rest = soft. */
  variant?: FunnelStageVariant
}

export interface SlideFunnelProps {
  /** Mono label above the title. */
  eyebrow?: string
  /** Title, line 1 (ink). A title that already wraps words in `<Highlight>` still works. */
  title: ReactNode
  /** Title, line 2 in the accent color (blue on light, turquoise on dark): the site's two-tone title. */
  accent?: ReactNode
  /** One or two sentences under the title. */
  lede?: ReactNode
  /** Older name of `lede`, still accepted. */
  description?: ReactNode
  /** Funnel stages, top (widest) to bottom. 3 fit; 4 is the maximum. */
  stages: FunnelStage[]
}

/** Funnel geometry (px): one slice per card, same height and gap, so slices line up with the cards. */
const FUNNEL_WIDTH = 560
const FUNNEL_BOTTOM = 240
const STAGE_HEIGHT = 156
/** With 4 stages the cards get shorter so the slide does not overflow. */
const STAGE_HEIGHT_COMPACT = 132
const STAGE_GAP = 16

function variantFor(stage: FunnelStage, i: number, n: number): FunnelStageVariant {
  if (stage.variant) return stage.variant
  if (i === 0 && n > 1) return 'outline'
  if (i === n - 1) return 'solid'
  return 'soft'
}

/** Pipeline funnel on the light "vivid" wash: an SVG funnel on the left (one tapered slice per stage)
 *  and a card per stage on the right with a colored pill, the count and a one-line description. */
export function SlideFunnel({ eyebrow, title, accent, lede, description, stages }: SlideFunnelProps) {
  const n = stages.length
  const stageHeight = n > 3 ? STAGE_HEIGHT_COMPACT : STAGE_HEIGHT
  const height = n * stageHeight + (n - 1) * STAGE_GAP
  const half = (y: number) => FUNNEL_WIDTH / 2 - ((FUNNEL_WIDTH - FUNNEL_BOTTOM) / 2) * (y / height)
  const cx = FUNNEL_WIDTH / 2

  return (
    <SlideShell mode="light" safeArea={144} background={<VividBackground variant="wash" />}>
      <div className={styles.body}>
        <SlideHeader eyebrow={eyebrow} title={title} accent={accent} lede={lede ?? description} mode="light" />

        <div className={styles.content}>
          <svg
            className={styles.funnel}
            width={FUNNEL_WIDTH}
            height={height}
            viewBox={`0 0 ${FUNNEL_WIDTH} ${height}`}
            role="img"
            aria-label={`Funnel with ${n} stages`}
          >
            {stages.map((stage, i) => {
              const variant = variantFor(stage, i, n)
              // outline slices are inset by 1px so the 2px dashed stroke is not clipped
              const inset = variant === 'outline' ? 1 : 0
              const y0 = i * (stageHeight + STAGE_GAP) + inset
              const y1 = y0 + stageHeight - inset * 2
              const d = [
                `M${(cx - half(y0) + inset).toFixed(1)},${y0}`,
                `L${(cx + half(y0) - inset).toFixed(1)},${y0}`,
                `L${(cx + half(y1) - inset).toFixed(1)},${y1}`,
                `L${(cx - half(y1) + inset).toFixed(1)},${y1}`,
                'Z',
              ].join(' ')
              return <path key={i} d={d} className={styles.slice} data-variant={variant} />
            })}
          </svg>

          <div className={styles.cards}>
            {stages.map((stage, i) => (
              <VividCard key={i} padding="none" radius="md" style={{ height: stageHeight }}>
                <div className={styles.card}>
                  <div className={styles.cardTop}>
                    <span className={styles.pill} data-variant={variantFor(stage, i, n)}>
                      {stage.label}
                    </span>
                    <p className={styles.value}>{stage.value}</p>
                  </div>
                  <p className={styles.description}>{stage.description}</p>
                </div>
              </VividCard>
            ))}
          </div>
        </div>
      </div>
    </SlideShell>
  )
}
