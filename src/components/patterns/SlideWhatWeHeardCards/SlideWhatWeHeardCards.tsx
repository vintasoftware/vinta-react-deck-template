import type { ReactNode } from 'react'
import { SlideShell } from '../SlideShell'
import { ArtCard } from '../../elements/ArtCard'
import styles from './SlideWhatWeHeardCards.module.css'

export interface WhatWeHeardCardsItem {
  /** Shape + seal + icon exported from Figma */
  art: ReactNode
  title: ReactNode
}

export interface SlideWhatWeHeardCardsProps {
  title: ReactNode
  /** Exatamente 3 cards */
  cards: [WhatWeHeardCardsItem, WhatWeHeardCardsItem, WhatWeHeardCardsItem]
  /** Seal of the 3rd card, which in Figma is a group separate from the card */
  thirdBadge?: ReactNode
  /** Background exported from Figma (gradient, blobs, arcs, blue strip) */
  background?: ReactNode
}

/** pattern = faithful copy of the "What we heard B" frame (427:480, 1920×1080). */
export function SlideWhatWeHeardCards({ title, cards, thirdBadge, background = <img src="/assets/what-we-heard/background-b.png" alt="" /> }: SlideWhatWeHeardCardsProps) {
  return (
    <SlideShell mode="light" safeArea={171} background={background ?? <div className={styles.plain} />}>
      <div className={styles.canvas}>
        <h1 className={styles.title}>{title}</h1>

        <div className={styles.card} data-slot="1">
          <ArtCard size="lg" art={cards[0].art} width={474} height={522} title={cards[0].title} titleBox={{ left: 36, top: 354, width: 419 }} />
        </div>
        <div className={styles.card} data-slot="2">
          <ArtCard size="lg" art={cards[1].art} width={474} height={522} title={cards[1].title} titleBox={{ left: 35, top: 354, width: 417 }} />
        </div>
        <div className={styles.card} data-slot="3">
          <ArtCard size="lg" art={cards[2].art} width={474} height={459} title={cards[2].title} titleBox={{ left: 55, top: 292, width: 375 }} />
        </div>
        {thirdBadge && <div className={styles.badge}>{thirdBadge}</div>}
      </div>
    </SlideShell>
  )
}
