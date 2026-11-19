import type { ReactNode } from 'react'
import { Check, X } from 'lucide-react'
import { SlideShell } from '../SlideShell'
import { VividBackground } from '../../elements/VividBackground'
import { SlideHeader } from '../../elements/SlideHeader'
import styles from './SlideVersus.module.css'

export interface VersusOption {
  /** Option name (≤ ~22 characters), e.g. "Build in-house". */
  title: string
  /** 3 to 4 short points (≤ ~40 characters each, up to 2 lines). */
  items: string[]
}

export interface SlideVersusProps {
  /** Mono label above the title, e.g. "SAMPLE COPY | OPTIONS". */
  eyebrow?: string
  /** Title, line 1 (ink). A title that already wraps words in `<Highlight>` still works. */
  title: ReactNode
  /** Title, line 2 in the accent color (blue on light, turquoise on dark): the site's two-tone title. */
  accent?: ReactNode
  /** One or two sentences under the title. */
  lede?: ReactNode
  /** Option being argued against: white card, "x" markers. */
  left: VersusOption
  /** Recommended option: blue gradient card, check markers. */
  right: VersusOption
  /** Text in the round badge between the cards. */
  vsLabel?: string
}

function OptionCard({ option, kind }: { option: VersusOption; kind: 'against' | 'for' }) {
  const Icon = kind === 'for' ? Check : X
  return (
    <div className={styles.card} data-kind={kind}>
      <p className={styles.cardTitle}>{option.title}</p>
      <ul className={styles.items}>
        {option.items.map((item, i) => (
          <li key={i} className={styles.item}>
            <span className={styles.marker} aria-hidden="true">
              <Icon size={30} strokeWidth={1.5} />
            </span>
            <span className={styles.itemText}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Two options side by side with a "VS" badge: the left one muted (x), the right one recommended (check). Light vivid background. */
export function SlideVersus({ eyebrow, title, accent, lede, left, right, vsLabel = 'VS' }: SlideVersusProps) {
  return (
    <SlideShell mode="light" safeArea={144} background={<VividBackground variant="wash" />}>
      <div className={styles.body}>
        <SlideHeader eyebrow={eyebrow} title={title} accent={accent} lede={lede} mode="light" />
        <div className={styles.fill}>
          <div className={styles.row}>
            <OptionCard option={left} kind="against" />
            <span className={styles.vs}>{vsLabel}</span>
            <OptionCard option={right} kind="for" />
          </div>
        </div>
      </div>
    </SlideShell>
  )
}
