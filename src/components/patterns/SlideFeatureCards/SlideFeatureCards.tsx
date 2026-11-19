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
import styles from './SlideFeatureCards.module.css'

export interface FeatureCard {
  /** Photo at the top of the card (`/assets/team/card-a.webp`…). Leave out for the dashed placeholder. */
  photo?: string
  photoAlt?: string
  icon: LucideIcon
  /** Icon color of the white tile. Default blue; keep one accent per slide. */
  accent?: AccentColor
  /** Gradient tile instead of the quiet white one. Only for the one card that is the point of the slide. */
  highlight?: boolean
  /** ≤ ~24 characters (2 lines max). */
  title: string
  /** One sentence, ≤ ~70 characters. */
  text: string
}

export interface SlideFeatureCardsProps {
  eyebrow?: string
  /** Title, line 1 (ink), ≤ ~45 characters. A full title with your own `<Highlight>` also works. */
  title: ReactNode
  /** Title, line 2 in blue (the site's two-tone title), ≤ ~45 characters. */
  accent?: ReactNode
  /** One sentence under the title, ≤ ~110 characters. Takes room from the cards: keep it to one line. */
  lede?: ReactNode
  /** 3 or 4 cards. */
  cards: FeatureCard[]
}

/** Features, benefits or pillars: 3–4 white cards, each with a photo header, a quiet icon tile, a title and one
 *  sentence, under the site's two-tone header. Wash background. */
export function SlideFeatureCards({ eyebrow, title, accent, lede, cards }: SlideFeatureCardsProps) {
  return (
    <SlideShell mode="light" safeArea={144} background={<VividBackground variant="wash" />}>
      <div className={styles.body}>
        <SlideHeader eyebrow={eyebrow} title={title} accent={accent} lede={lede} width={1400} />
        <div className={styles.cards} data-count={cards.length} data-lede={lede ? 'true' : undefined}>
          {cards.map((card) => (
            <VividCard key={card.title} padding="md" style={{ flex: 1 }}>
              <PhotoSlot src={card.photo} alt={card.photoAlt ?? card.title} width="100%" height={cards.length > 3 ? 220 : 280} radius="md" />
              <div className={styles.cardHead}>
                <IconBadge
                  variant={card.highlight ? 'gradient' : 'white'}
                  shape="square"
                  accent={card.accent ?? 'blue'}
                  icon={card.icon}
                  size={72}
                />
                <Body tone="primary" ink="vivid">
                  {card.title}
                </Body>
              </div>
              <div className={styles.cardText}>
                <Body weight="regular">{card.text}</Body>
              </div>
            </VividCard>
          ))}
        </div>
      </div>
    </SlideShell>
  )
}
