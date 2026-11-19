import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import type { AccentColor } from '../../shared/types'
import { SlideShell } from '../SlideShell'
import { VividBackground } from '../../elements/VividBackground'
import { ConcentricRings } from '../../elements/ConcentricRings'
import { SlideHeader } from '../../elements/SlideHeader'
import { IconBadge } from '../../elements/IconBadge'
import { Body } from '../../elements/Body'
import styles from './SlideSphereList.module.css'

export interface SphereListItem {
  icon: LucideIcon
  /** Icon color of the white tile. Default blue; keep one accent per slide. */
  accent?: AccentColor
  /** title: row title, ≤ ~28 characters (one line) · number: the big number, ≤ ~8 characters ("10 weeks", "99.9%"). */
  title: string
  /** title: one line under the title, ≤ ~45 characters · number: mono caption, ≤ ~28 characters. */
  detail?: string
  /** title only: mono note at the right, e.g. "15 MIN". */
  meta?: string
}

export interface SlideSphereListProps {
  /** title = agenda rows (title + detail + meta), 3–5 rows · number = stat rows (big number + mono caption), 2–4 rows. */
  emphasis?: 'title' | 'number'
  eyebrow?: string
  /** White title on the blue sphere, line 1 (display scale, ≤ ~9 characters). A full title with `<Highlight>` and
   *  `<br />` also works. */
  title: ReactNode
  /** Title, line 2 in turquoise (≤ ~9 characters). */
  accent?: ReactNode
  /** One sentence under the title, ≤ ~60 characters. */
  lede?: ReactNode
  /** @deprecated Use `lede`. */
  subtitle?: ReactNode
  items: SphereListItem[]
}

/** A blue mesh sphere at the left holding the two-tone title, and a list of quiet icon rows at the right on the wash:
 *  agenda (`emphasis="title"`) or results in numbers (`emphasis="number"`). */
export function SlideSphereList({
  emphasis = 'title',
  eyebrow,
  title,
  accent,
  lede,
  subtitle,
  items,
}: SlideSphereListProps) {
  const isNumber = emphasis === 'number'
  return (
    <SlideShell
      mode="light"
      safeArea={144}
      background={
        <>
          <VividBackground variant="wash" />
          <div className={styles.sphere} data-emphasis={emphasis}>
            <VividBackground variant="mesh" />
            {/* Glow only: rings would cross the title (ConcentricRings wants text ≥ 48px away). */}
            <ConcentricRings cx={isNumber ? 300 : 260} cy={540} sizes={[]} glow={900} />
          </div>
        </>
      }
    >
      <div className={styles.body} data-emphasis={emphasis}>
        <div className={styles.intro}>
          <SlideHeader
            mode="invert-blue"
            scale="display"
            eyebrow={eyebrow}
            title={title}
            accent={accent}
            lede={lede ?? subtitle}
            width={isNumber ? 600 : 540}
          />
        </div>
        <div className={styles.list}>
          {items.map((item) => (
            <div key={item.title} className={styles.row}>
              <IconBadge
                variant="white"
                shape="square"
                accent={item.accent ?? 'blue'}
                icon={item.icon}
                size={72}
              />
              {isNumber ? (
                <div className={styles.stat}>
                  <p className={styles.value}>{item.title}</p>
                  {item.detail && <p className={styles.caption}>{item.detail}</p>}
                </div>
              ) : (
                <>
                  <div className={styles.text}>
                    <Body tone="primary" ink="vivid">
                      {item.title}
                    </Body>
                    {item.detail && <Body weight="regular">{item.detail}</Body>}
                  </div>
                  {item.meta && <p className={styles.meta}>{item.meta}</p>}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  )
}
