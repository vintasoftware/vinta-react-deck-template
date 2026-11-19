import { Fragment, type ReactNode } from 'react'
import { SlideShell } from '../SlideShell'
import { ArtCard } from '../../elements/ArtCard'
import styles from './SlideWhatWeHeardGrid.module.css'

export interface WhatWeHeardGridCard {
  /** Shape + dashed line + seal + icon exported from Figma */
  art: ReactNode
  title: ReactNode
  description: ReactNode
}

export interface SlideWhatWeHeardGridProps {
  /** Each item becomes one line of the title */
  title: ReactNode[]
  /** Supporting paragraph — <strong> to highlight the closing line */
  summary: ReactNode
  /** Exatamente 4 cards (grade 2×2) */
  cards: [WhatWeHeardGridCard, WhatWeHeardGridCard, WhatWeHeardGridCard, WhatWeHeardGridCard]
  /** Background exported from Figma (blue gradient + side strip) */
  background?: ReactNode
}

/** pattern = faithful copy of the "What we heard" frame (427:385, 1920×1080). */
export function SlideWhatWeHeardGrid({ title, summary, cards, background = <img src="/assets/what-we-heard/background-a.png" alt="" /> }: SlideWhatWeHeardGridProps) {
  return (
    <SlideShell mode="invert-blue" safeArea={164} background={background ?? <div className={styles.plain} />}>
      <div className={styles.canvas}>
        <h1 className={styles.title}>
          {title.map((line, i) => (
            <Fragment key={i}>
              {i > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </h1>
        <p className={styles.summary}>{summary}</p>

        {cards.map((card, i) => (
          <div key={i} className={styles.card} data-slot={i + 1}>
            <ArtCard
              size="md"
              art={card.art}
              width={425}
              height={452}
              title={card.title}
              titleBox={{ left: 32, top: 61, width: 300 }}
              description={card.description}
              descriptionBox={{ left: 31.6, bottom: 40, width: 347.3 }}
            />
          </div>
        ))}
      </div>
    </SlideShell>
  )
}
