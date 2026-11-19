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
import styles from './SlidePhotoBand.module.css'

export interface BandCard {
  icon: LucideIcon
  /** Icon color of the white tile. Default blue; keep one accent per slide. */
  accent?: AccentColor
  /** ≤ ~20 characters, one line. */
  title: string
  /** One sentence, ≤ ~60 characters (2 lines). */
  text: string
}

export interface SlidePhotoBandProps {
  /** Full-width photo band at the top (1920×360, blue tint), e.g. `/assets/team/rich-band.webp`. Leave out for the placeholder. */
  photo?: string
  photoAlt?: string
  /** CSS object-position for the band crop, e.g. "50% 30%". */
  photoPosition?: string
  eyebrow?: string
  /** Title, line 1 (ink), ≤ ~45 characters. A full title with your own `<Highlight>` also works. */
  title: ReactNode
  /** Title, line 2 in blue (the site's two-tone title), ≤ ~45 characters. Use it or `lede`, not both (height). */
  accent?: ReactNode
  /** One line under a one-line title, ≤ ~90 characters. */
  lede?: ReactNode
  /** 3 cards. */
  cards: BandCard[]
}

/** A wide team photo band across the top, then the site's two-tone header and three quiet icon cards: how we work,
 *  phases, pillars. Wash background. */
export function SlidePhotoBand({
  photo,
  photoAlt = '',
  photoPosition,
  eyebrow,
  title,
  accent,
  lede,
  cards,
}: SlidePhotoBandProps) {
  return (
    <SlideShell mode="light" safeArea={144} background={<VividBackground variant="wash" />}>
      <div className={styles.band}>
        <PhotoSlot src={photo} alt={photoAlt} width="100%" height={360} overlay="blue" position={photoPosition} />
      </div>
      <div className={styles.body}>
        <SlideHeader eyebrow={eyebrow} title={title} accent={accent} lede={lede} width={1400} />
        <div className={styles.cards}>
          {cards.map((card) => (
            <VividCard key={card.title} radius="lg" style={{ flex: 1 }}>
              <div className={styles.cardHead}>
                <IconBadge variant="white" shape="square" accent={card.accent ?? 'blue'} icon={card.icon} size={72} />
                <Body tone="primary" ink="vivid">
                  {card.title}
                </Body>
              </div>
              <Body weight="regular">{card.text}</Body>
            </VividCard>
          ))}
        </div>
      </div>
    </SlideShell>
  )
}
