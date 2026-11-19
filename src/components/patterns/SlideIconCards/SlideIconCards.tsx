import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import type { AccentColor } from '../../shared/types'
import { SlideShell } from '../SlideShell'
import { VividBackground } from '../../elements/VividBackground'
import { SlideHeader } from '../../elements/SlideHeader'
import { VividCard } from '../../elements/VividCard'
import { IconBadge } from '../../elements/IconBadge'
import { Body } from '../../elements/Body'
import styles from './SlideIconCards.module.css'

export interface IconCardItem {
  /** Optional icon tile. Leave it out: the mono number and the title carry the card. */
  icon?: LucideIcon
  /** Icon and label color. Default blue; keep one accent per slide. */
  accent?: AccentColor
  /** Mono label above the title. Default: the card number ("01", "02"…). */
  label?: string
  /** ≤ ~24 characters (2 lines max with 4 cards). */
  title: string
  /** One sentence. 4 cards ≤ ~60 characters · 3 cards ≤ ~90. */
  text: string
}

export interface SlideIconCardsProps {
  eyebrow?: string
  /** Title, line 1 (ink), ≤ ~45 characters. A full title with your own `<Highlight>` also works. */
  title: ReactNode
  /** Title, line 2 in blue (the site's two-tone title), ≤ ~45 characters. */
  accent?: ReactNode
  /** One sentence under the title, ≤ ~110 characters (2 lines). */
  lede?: ReactNode
  /** @deprecated Use `lede`. */
  lead?: ReactNode
  /** 3 or 4 cards. */
  cards: IconCardItem[]
}

/** What we add, scope or pillars: 3–4 white cards with a mono label, a title and one sentence (optional icon tile), under the site's two-tone header. Wash background. */
export function SlideIconCards({ eyebrow, title, accent, lede, lead, cards }: SlideIconCardsProps) {
  return (
    <SlideShell mode="light" safeArea={144} background={<VividBackground variant="wash" />}>
      <div className={styles.body}>
        <SlideHeader eyebrow={eyebrow} title={title} accent={accent} lede={lede ?? lead} width={1300} />
        <div className={styles.cards}>
          {cards.map((card, i) => (
            <VividCard key={card.title} padding="lg" radius="lg" style={{ flex: 1 }}>
              <div className={styles.cardTop}>
                {card.icon && <IconBadge variant="white" shape="square" accent={card.accent ?? 'blue'} icon={card.icon} size={72} />}
                <p className={styles.label} data-accent={card.accent ?? 'blue'}>
                  {card.label ?? String(i + 1).padStart(2, '0')}
                </p>
                <Body tone="primary" ink="vivid">
                  {card.title}
                </Body>
                <Body weight="regular">{card.text}</Body>
              </div>
            </VividCard>
          ))}
        </div>
      </div>
    </SlideShell>
  )
}
