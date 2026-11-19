import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import type { AccentColor } from '../../shared/types'
import { SlideShell } from '../SlideShell'
import { VividBackground } from '../../elements/VividBackground'
import { VividCard } from '../../elements/VividCard'
import { PhotoSlot } from '../../elements/PhotoSlot'
import { IconBadge } from '../../elements/IconBadge'
import { SlideHeader } from '../../elements/SlideHeader'
import { Body } from '../../elements/Body'
import styles from './SlideFeaturePhoto.module.css'

export interface FeaturePhotoPoint {
  icon: LucideIcon
  /** Icon color of the white tile. Default blue; keep one accent per slide. */
  accent?: AccentColor
  /** ≤ ~50 characters (2 lines max). */
  text: string
}

export interface FeaturePhotoStat {
  /** Mono label, ≤ ~20 characters ("TIME TO LAUNCH"). */
  label: string
  /** The number, ≤ ~8 characters ("4 weeks"). */
  value: string
}

export interface SlideFeaturePhotoProps {
  eyebrow?: string
  /** Title, line 1 (ink), ≤ ~22 characters. A full title with your own `<Highlight>` and `<br />` also works. */
  title: ReactNode
  /** Title, line 2 in blue (the site's two-tone title), ≤ ~22 characters. */
  accent?: ReactNode
  /** One sentence under the title, ≤ ~70 characters (2 lines). */
  lede?: ReactNode
  /** 3 rows. */
  points: FeaturePhotoPoint[]
  /** Photo at the right, 852×560 with a blue tint (`/assets/team/rich-feature.webp`). Leave out for the placeholder. */
  photo?: string
  photoAlt?: string
  /** Floating white chip over the photo's bottom-left corner. Leave out to hide it. */
  stat?: FeaturePhotoStat
}

/** One feature or offer: the site's two-tone header and three quiet icon rows at the left, a blue-tinted photo at
 *  the right with a floating number chip. Wash background. */
export function SlideFeaturePhoto({
  eyebrow,
  title,
  accent,
  lede,
  points,
  photo,
  photoAlt = '',
  stat,
}: SlideFeaturePhotoProps) {
  return (
    <SlideShell mode="light" safeArea={144} background={<VividBackground variant="wash" />}>
      <div className={styles.photo}>
        <PhotoSlot src={photo} alt={photoAlt} width={852} height={560} overlay="blue" radius="lg" />
      </div>
      {stat && (
        <div className={styles.chip}>
          <VividCard padding="md" radius="md">
            <div className={styles.chipText}>
              <p className={styles.chipLabel}>{stat.label}</p>
              <p className={styles.chipValue}>{stat.value}</p>
            </div>
          </VividCard>
        </div>
      )}
      <div className={styles.body}>
        <div className={styles.text}>
          <SlideHeader eyebrow={eyebrow} title={title} accent={accent} lede={lede} />
          <div className={styles.points}>
            {points.map((p) => (
              <div key={p.text} className={styles.point}>
                <IconBadge variant="white" shape="square" accent={p.accent ?? 'blue'} icon={p.icon} size={72} />
                <div className={styles.pointText}>
                  <Body tone="primary" ink="vivid">
                    {p.text}
                  </Body>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideShell>
  )
}
