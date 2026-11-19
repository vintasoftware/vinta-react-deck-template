import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import type { AccentColor } from '../../shared/types'
import { SlideShell } from '../SlideShell'
import { VividBackground } from '../../elements/VividBackground'
import { PhotoSlot } from '../../elements/PhotoSlot'
import { IconBadge } from '../../elements/IconBadge'
import { SlideHeader } from '../../elements/SlideHeader'
import { Body } from '../../elements/Body'
import styles from './SlidePointsPhoto.module.css'

export interface PhotoPoint {
  icon: LucideIcon
  /** Icon color of the white tile. Default blue; one accent per slide. */
  accent?: AccentColor
  /** ≤ ~32 characters, one line. */
  title: string
  /** One line, ≤ ~70 characters. */
  text: string
}

export interface SlidePointsPhotoProps {
  /** bleed = big rounded photo, up to 4 rows · card = photo inside a white card, up to 3 rows */
  frame?: 'bleed' | 'card'
  eyebrow?: string
  /** Title, line 1 (ink), ≤ ~26 characters. A full title with your own `<Highlight>` also works. */
  title: ReactNode
  /** Title, line 2 in blue (the site's two-tone title), ≤ ~26 characters. */
  accent?: ReactNode
  /** One sentence under the title, ≤ ~80 characters. With a lede, use 3 rows. */
  lede?: ReactNode
  /** bleed: 3–4 rows · card: 3 rows. */
  points: PhotoPoint[]
  /** Photo at the right (bleed 700×780, card 692×716). Leave out for the placeholder. */
  photo?: string
  photoAlt?: string
}

/** A list of quiet icon rows beside a big photo, under the site's two-tone header: why Vinta, how we work,
 *  services. Wash background. */
export function SlidePointsPhoto({
  frame = 'bleed',
  eyebrow,
  title,
  accent,
  lede,
  points,
  photo,
  photoAlt = '',
}: SlidePointsPhotoProps) {
  const isBleed = frame === 'bleed'
  return (
    <SlideShell mode="light" safeArea={144} background={<VividBackground variant="wash" />}>
      <div className={styles.body} data-frame={frame}>
        <div className={styles.text}>
          <SlideHeader eyebrow={eyebrow} title={title} accent={accent} lede={lede} />
          <div className={styles.points}>
            {points.map((p) => (
              <div key={p.title} className={styles.point}>
                <IconBadge
                  variant="white"
                  shape="square"
                  accent={p.accent ?? 'blue'}
                  icon={p.icon}
                  size={72}
                />
                <div className={styles.pointText}>
                  <Body tone="primary" ink="vivid">
                    {p.title}
                  </Body>
                  <Body weight="regular">{p.text}</Body>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.media}>
          {isBleed ? (
            <div className={styles.photoShadow}>
              <PhotoSlot src={photo} alt={photoAlt} width={700} height={780} radius="lg" />
            </div>
          ) : (
            <div className={styles.photoCard}>
              <PhotoSlot src={photo} alt={photoAlt} width={692} height={716} radius="lg" />
            </div>
          )}
        </div>
      </div>
    </SlideShell>
  )
}
