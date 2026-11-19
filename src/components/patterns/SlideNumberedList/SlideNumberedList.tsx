import type { ReactNode } from 'react'
import { SlideShell } from '../SlideShell'
import { VividBackground } from '../../elements/VividBackground'
import { SlideHeader } from '../../elements/SlideHeader'
import { Body } from '../../elements/Body'
import styles from './SlideNumberedList.module.css'

export interface NumberedListItem {
  /** One line, ≤ ~36 characters. */
  title: string
  /** One sentence, ≤ ~100 characters (2 lines). */
  text: string
}

export interface SlideNumberedListProps {
  eyebrow?: string
  /** Title, line 1 (ink). Or a full title with your own `<Highlight>`. ≤ ~24 characters per line. */
  title: ReactNode
  /** Title, line 2 in the accent color. */
  accent?: ReactNode
  /** One or two sentences under the title, ≤ ~160 characters. */
  lede?: ReactNode
  /** 3–5 items on the numbered rail. 5 items only with one-line texts. */
  items: NumberedListItem[]
  /** Highlight one step (filled circle), e.g. the phase you are in. Leave out for a plain list. */
  activeIndex?: number
}

/** Two-tone title and lede at the left; 3–5 items on a vertical rail of small numbered circles at the right.
 *  Habits, principles, how we work, process steps. Light background. */
export function SlideNumberedList({ eyebrow, title, accent, lede, items, activeIndex }: SlideNumberedListProps) {
  return (
    <SlideShell mode="light" safeArea={144} background={<VividBackground variant="wash" />}>
      <div className={styles.body} data-count={items.length}>
        <div className={styles.header}>
          <SlideHeader eyebrow={eyebrow} title={title} accent={accent} lede={lede} width={720} />
        </div>
        <ol className={styles.list}>
          {items.map((item, i) => (
            <li key={item.title} className={styles.item} data-active={i === activeIndex ? 'true' : undefined}>
              <div className={styles.rail} aria-hidden="true">
                <span className={styles.circle}>{i + 1}</span>
                {i < items.length - 1 && <span className={styles.line} />}
              </div>
              <div className={styles.itemText}>
                <Body tone="primary" ink="vivid">
                  {item.title}
                </Body>
                <Body weight="regular">{item.text}</Body>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </SlideShell>
  )
}
