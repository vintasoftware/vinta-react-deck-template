import type { ReactNode } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { SlideShell } from '../SlideShell'
import { VividBackground } from '../../elements/VividBackground'
import { SlideHeader } from '../../elements/SlideHeader'
import { VividCard } from '../../elements/VividCard'
import { Body } from '../../elements/Body'
import styles from './SlideFaq.module.css'

export interface FaqItem {
  /** ≤ ~55 characters (one line). */
  question: string
  /** Shown only on the open item. ≤ ~230 characters (4 lines). */
  answer: string
}

export interface SlideFaqProps {
  /** Default "FAQ". Pass an empty string to hide it. */
  eyebrow?: string
  /** Title, line 1 (ink). Or a full title with your own `<Highlight>`. Narrow column: ≤ ~18 characters per line. */
  title: ReactNode
  /** Title, line 2 in the accent color. */
  accent?: ReactNode
  /** One or two sentences under the title, ≤ ~80 characters. */
  lede?: ReactNode
  /** 4–6 questions. */
  items: FaqItem[]
  /** Index of the open question, 0-based (0 = first). One answer open per slide. */
  open?: number
}

/** FAQ: two-tone title and lede at the left, 4–6 questions at the right with ONE answer open. To walk through
 *  several answers, repeat the slide with a different `open`. Site: Fast-track and EHR pages. Light background. */
export function SlideFaq({ eyebrow = 'FAQ', title, accent, lede, items, open = 0 }: SlideFaqProps) {
  return (
    <SlideShell mode="light" safeArea={144} background={<VividBackground variant="wash" />}>
      <div className={styles.body}>
        <div className={styles.header}>
          <SlideHeader eyebrow={eyebrow || undefined} title={title} accent={accent} lede={lede} width={620} />
        </div>
        <ul className={styles.list} data-dense={items.length > 5 || undefined}>
          {items.map((item, i) =>
            i === open ? (
              <li key={item.question}>
                <VividCard padding="md" radius="md">
                  <div className={styles.question}>
                    <Body tone="primary" ink="vivid">
                      {item.question}
                    </Body>
                    <span className={styles.chevron} data-open="true" aria-hidden="true">
                      <ChevronUp size={28} strokeWidth={1.5} />
                    </span>
                  </div>
                  <div className={styles.answer}>
                    <Body weight="regular">{item.answer}</Body>
                  </div>
                </VividCard>
              </li>
            ) : (
              <li key={item.question} className={styles.closed}>
                <div className={styles.question}>
                  <Body weight="regular">{item.question}</Body>
                  <span className={styles.chevron} aria-hidden="true">
                    <ChevronDown size={28} strokeWidth={1.5} />
                  </span>
                </div>
              </li>
            ),
          )}
        </ul>
      </div>
    </SlideShell>
  )
}
