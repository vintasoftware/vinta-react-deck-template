import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import type { AccentColor } from '../../shared/types'
import { resolveTone, titleLines, type SlideTone } from '../../shared/slideTone'
import { SlideShell } from '../SlideShell'
import { SlideHeader } from '../../elements/SlideHeader'
import { VividCard } from '../../elements/VividCard'
import { PhotoSlot } from '../../elements/PhotoSlot'
import { IconBadge } from '../../elements/IconBadge'
import { Body } from '../../elements/Body'
import { Tag } from '../../elements/Tag'
import styles from './SlideAgenda.module.css'

export interface SlideAgendaItem {
  /** ≤ ~32 characters */
  title: ReactNode
  /** ≤ ~44 characters */
  detail?: ReactNode
  /** Time, duration… shown as a pill at the right. */
  meta?: ReactNode
  /** Color of the row's icon and number. Default blue; keep one accent per slide. */
  accent?: AccentColor
  /** Optional Lucide icon tile. Leave it out: number, title and the time pill are enough. */
  icon?: LucideIcon
}

export interface SlideAgendaProps {
  /** light / tint = wash · invert-blue = mesh · invert-navy = night · vivid = wash */
  tone?: SlideTone
  eyebrow?: string
  /** Title, line 1 (≤ ~16 characters per line in the 520px column). Also accepts the old array of lines
   *  or a node with your own `<Highlight>`. */
  title: ReactNode | ReactNode[]
  /** Title, line 2 in the accent color (blue on light, turquoise on dark). */
  accent?: ReactNode
  /** One short sentence under the title. */
  lede?: ReactNode
  /** 3 to 6 items (5 fit best). */
  items: SlideAgendaItem[]
  /** Photo under the title, 520×340 (`/assets/team/agenda.webp`). Left out: no photo, except with `tone="vivid"`,
   *  which keeps the dashed placeholder. */
  photo?: string
  photoAlt?: string
}

/** Agenda in the site look: title (and photo) on the left, one card per item on the right with the
 *  number, title, detail and a time pill (optional icon tile). Cards and tiles are white on light, glass on dark. */
export function SlideAgenda({ tone = 'light', eyebrow, title, accent, lede, items, photo, photoAlt = '' }: SlideAgendaProps) {
  const t = resolveTone(tone)
  const showPhoto = photo !== undefined || tone === 'vivid'
  const dense = items.length > 5
  return (
    <SlideShell mode={t.shellMode} safeArea={144} background={t.background}>
      <div className={styles.body} data-dark={t.dark || undefined}>
        <div className={styles.side}>
          <SlideHeader eyebrow={eyebrow} title={titleLines(title)} accent={accent} lede={lede} mode={t.textMode} />
          {showPhoto && (
            <div className={styles.photo}>
              <PhotoSlot src={photo} alt={photoAlt} width={520} height={340} radius="lg" placeholder={t.dark ? 'dark' : 'light'} />
            </div>
          )}
        </div>
        <div className={styles.list} data-dense={dense || undefined}>
          {items.map((item, i) => {
            const itemAccent = item.accent ?? 'blue'
            return (
              <VividCard
                key={i}
                surface={t.dark ? 'glass' : 'white'}
                padding="none"
                radius="md"
                style={{ height: dense ? 124 : 150, justifyContent: 'center' }}
              >
                <div className={styles.row}>
                  {item.icon && (
                    <IconBadge variant={t.dark ? 'glass' : 'white'} shape="square" accent={itemAccent} icon={item.icon} size={72} />
                  )}
                  <div className={styles.rowText}>
                    <span className={styles.number} data-accent={itemAccent}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <Body tone="primary" ink="vivid" mode={t.textMode}>
                      {item.title}
                    </Body>
                    {item.detail && (
                      <Body weight="regular" mode={t.textMode}>
                        {item.detail}
                      </Body>
                    )}
                  </div>
                  {item.meta && (
                    <Tag variant={t.dark ? 'glass' : 'filled'} accent="blue" mode={t.textMode}>
                      {item.meta}
                    </Tag>
                  )}
                </div>
              </VividCard>
            )
          })}
        </div>
      </div>
    </SlideShell>
  )
}
