import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { SlideShell } from '../SlideShell'
import { VividBackground } from '../../elements/VividBackground'
import { PhotoSlot } from '../../elements/PhotoSlot'
import { IconBadge } from '../../elements/IconBadge'
import { SlideHeader } from '../../elements/SlideHeader'
import { Body } from '../../elements/Body'
import styles from './SlideGlassRows.module.css'

export interface GlassRow {
  icon: LucideIcon
  /** ≤ ~22 characters, one line. */
  title: string
  /** One line, ≤ ~45 characters. */
  text: string
}

export interface SlideGlassRowsProps {
  /** Full-bleed gradient: green or purple (the deck's color-variation slide). */
  color?: 'green' | 'purple'
  eyebrow?: string
  /** Title, line 1 (white), ≤ ~22 characters. A full title with your own `<Highlight>` also works. */
  title: ReactNode
  /** Title, line 2 in turquoise (the site's two-tone title), ≤ ~22 characters. */
  accent?: ReactNode
  /** One sentence under the title, ≤ ~80 characters. */
  lede?: ReactNode
  /** @deprecated Use `lede`. */
  text?: ReactNode
  /** Photo under the text (700×420). Leave out for the placeholder. */
  photo?: string
  photoAlt?: string
  /** Exactly 4 rows: layers, pillars, foundations. */
  rows: GlassRow[]
}

/** Foundations, layers or pillars on a full green or purple gradient: two-tone header and photo at the left,
 *  4 rows with glass icon tiles at the right. Use it to break a run of blue and light slides. */
export function SlideGlassRows({ color = 'green', eyebrow, title, accent, lede, text, photo, photoAlt = '', rows }: SlideGlassRowsProps) {
  return (
    <SlideShell mode="invert-blue" safeArea={144} background={<VividBackground variant={color} />}>
      <div className={styles.body}>
        <div className={styles.text}>
          <SlideHeader eyebrow={eyebrow} title={title} accent={accent} lede={lede ?? text} mode="invert-blue" width={700} />
          <PhotoSlot src={photo} alt={photoAlt} width={700} height={420} radius="lg" placeholder="dark" />
        </div>
        <div className={styles.rows}>
          {rows.map((row) => (
            <div key={row.title} className={styles.row}>
              <IconBadge variant="glass" shape="square" icon={row.icon} size={72} />
              <div className={styles.rowText}>
                <Body mode="invert-blue" tone="primary">
                  {row.title}
                </Body>
                <Body mode="invert-blue" weight="regular">
                  {row.text}
                </Body>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  )
}
