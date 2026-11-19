import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { resolveTone, titleLines, type SlideTone } from '../../shared/slideTone'
import { SlideShell } from '../SlideShell'
import { SlideHeader } from '../../elements/SlideHeader'
import { PhotoSlot } from '../../elements/PhotoSlot'
import { IconBadge } from '../../elements/IconBadge'
import { Highlight } from '../../elements/Highlight'
import styles from './SlideBigStat.module.css'

export interface SlideBigStatProps {
  /** light / tint = wash · invert-blue = mesh · invert-navy = night (default) · vivid = night */
  tone?: SlideTone
  eyebrow?: string
  /** Title, line 1. Also accepts the old array of lines or a node with your own `<Highlight>`. */
  title: ReactNode | ReactNode[]
  /** Title, line 2 in the accent color (blue on light, turquoise on dark). */
  accent?: ReactNode
  /** One sentence under the title. */
  lede?: ReactNode
  /** 1 to 3 numbers (206px). value ≤ 5 characters with 3 numbers, label ≤ ~30 characters;
   *  `icon` = optional Lucide icon tile above the number. */
  stats: { value: string; label: string; icon?: LucideIcon }[]
  /** Optional photo at the top right, 640×300. Usually left out: the numbers are the slide. */
  photo?: string
  photoAlt?: string
}

/** Impact numbers in the site look: header (and photo) on top, then 1–3 columns with a big
 *  number (blue on light, turquoise on dark) and a mono caption. */
export function SlideBigStat({ tone = 'invert-navy', eyebrow, title, accent, lede, stats, photo, photoAlt = '' }: SlideBigStatProps) {
  const t = resolveTone(tone, 'night')
  const showPhoto = photo !== undefined
  return (
    <SlideShell mode={t.shellMode} safeArea={144} background={t.background}>
      <div className={styles.body} data-dark={t.dark || undefined}>
        <div className={styles.top}>
          <SlideHeader eyebrow={eyebrow} title={titleLines(title)} accent={accent} lede={lede} mode={t.textMode} width={showPhoto ? 900 : 1200} />
          {showPhoto && <PhotoSlot src={photo} alt={photoAlt} width={640} height={300} radius="lg" placeholder={t.dark ? 'dark' : 'light'} />}
        </div>
        <div className={styles.stats}>
          {stats.map((stat, i) => (
            <div key={i} className={styles.stat}>
              {stat.icon && <IconBadge variant={t.dark ? 'glass' : 'white'} shape="square" icon={stat.icon} size={72} />}
              <span className={styles.value}>
                <Highlight mode={t.textMode}>
                  {stat.value}
                </Highlight>
              </span>
              <span className={styles.label}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  )
}
