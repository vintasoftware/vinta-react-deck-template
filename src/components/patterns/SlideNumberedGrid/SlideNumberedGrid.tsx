import type { ReactNode } from 'react'
import { SlideShell } from '../SlideShell'
import { VividBackground } from '../../elements/VividBackground'
import { SlideHeader } from '../../elements/SlideHeader'
import { Body } from '../../elements/Body'
import styles from './SlideNumberedGrid.module.css'

export interface NumberedGridCard {
  /** One line, ≤ ~40 characters. */
  title: string
  /** 2–4 bullets, ≤ ~90 characters each (two lines). */
  bullets: string[]
}

export interface SlideNumberedGridProps {
  eyebrow?: string
  /** Title, line 1. ≤ ~40 characters on one line. */
  title: ReactNode
  /** Title, line 2 in blue. */
  accent?: ReactNode
  /** One sentence under the title. */
  lede?: ReactNode
  /** 2–4 cards (3 = one row, 2 or 4 = two columns). */
  cards: NumberedGridCard[]
  /** 64px grid over the wash (the "planning deck" look). */
  grid?: boolean
}

/** Numbered cards with bullet lists: the actions of a plan, workstreams, options. White cards with a blue top edge,
 *  a mono number and a title. From the Expansion planning deck. Wash background. */
export function SlideNumberedGrid({ eyebrow, title, accent, lede, cards, grid = false }: SlideNumberedGridProps) {
  return (
    <SlideShell mode="light" safeArea={144} background={<VividBackground variant="wash" grid={grid} />}>
      <div className={styles.body}>
        <SlideHeader eyebrow={eyebrow} title={title} accent={accent} lede={lede} width={1500} />
        <div className={styles.grid} data-count={cards.length}>
          {cards.map((card, i) => (
            <div key={card.title} className={styles.card}>
              <div className={styles.head}>
                <span className={styles.number}>{String(i + 1).padStart(2, '0')}</span>
                <Body tone="primary" ink="vivid">
                  {card.title}
                </Body>
              </div>
              <ul className={styles.list}>
                {card.bullets.map((b) => (
                  <li key={b} className={styles.item}>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  )
}
