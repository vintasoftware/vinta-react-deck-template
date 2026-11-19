import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { SlideShell } from '../SlideShell'
import { VividBackground } from '../../elements/VividBackground'
import { SlideHeader } from '../../elements/SlideHeader'
import { Body } from '../../elements/Body'
import { VividCard } from '../../elements/VividCard'
import { PhotoSlot } from '../../elements/PhotoSlot'
import { Tag } from '../../elements/Tag'
import styles from './SlideStoryStats.module.css'

export interface StoryStat {
  /** ≤ ~6 characters, e.g. "4.9/5", "13+", "100%". */
  value: string
  /** One line, ≤ ~28 characters. */
  label: string
  /** Show the label as a cited source (blue, with ↗), e.g. "average rating on Clutch". */
  link?: boolean
}

export interface SlideStoryStatsProps {
  eyebrow?: string
  /** Title, line 1 (ink). Or a full title with your own `<Highlight>`. ≤ ~28 characters per line. */
  title: ReactNode
  /** Title, line 2 in the accent color. */
  accent?: ReactNode
  /** 1–3 short paragraphs under the title. ≤ ~260 characters in total (about 4 lines). */
  paragraphs: ReactNode[]
  /** 2×2 stats card at the bottom of the text column. Exactly 4 items. */
  stats: StoryStat[]
  /** Photo at the right (about 590×848, cropped to fit). Leave out for the placeholder. */
  photo?: string
  photoAlt?: string
  /** CSS object-position to keep faces in frame, e.g. "40% 50%". */
  photoPosition?: string
  /** Small pill on the photo's top-right corner, e.g. "SINCE 2013". */
  badge?: string
}

/** "Our story" (site look): two-tone title, a few short paragraphs and a 2×2 stats card at the left,
 *  a big photo with a pill badge at the right. The site-look "Who is Vinta". Light background. */
export function SlideStoryStats({
  eyebrow,
  title,
  accent,
  paragraphs,
  stats,
  photo,
  photoAlt = '',
  photoPosition,
  badge,
}: SlideStoryStatsProps) {
  return (
    <SlideShell mode="light" safeArea={144} background={<VividBackground variant="wash" />}>
      <div className={styles.body}>
        <div className={styles.text}>
          <SlideHeader eyebrow={eyebrow} title={title} accent={accent} />
          <div className={styles.paragraphs}>
            {paragraphs.map((p, i) => (
              <Body key={i} weight="regular">
                {p}
              </Body>
            ))}
          </div>
          <div className={styles.card}>
            <VividCard surface="white" padding="none" radius="lg">
              <div className={styles.grid}>
                {stats.map((s) => (
                  <div key={s.label} className={styles.stat}>
                    <span className={styles.value}>{s.value}</span>
                    <Body weight="regular">
                      {s.link ? (
                        <span className={styles.link}>
                          {s.label}
                          <ArrowUpRight size={26} strokeWidth={1.5} aria-hidden="true" />
                        </span>
                      ) : (
                        s.label
                      )}
                    </Body>
                  </div>
                ))}
              </div>
            </VividCard>
          </div>
        </div>
        <div className={styles.media}>
          <PhotoSlot src={photo} alt={photoAlt} width="100%" height="100%" radius="lg" position={photoPosition} />
          {badge && (
            <div className={styles.badge}>
              <Tag variant="white">{badge}</Tag>
            </div>
          )}
        </div>
      </div>
    </SlideShell>
  )
}
