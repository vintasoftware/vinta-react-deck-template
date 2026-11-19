import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import type { AccentColor } from '../../shared/types'
import { SlideShell } from '../SlideShell'
import { VividBackground } from '../../elements/VividBackground'
import { VividCard } from '../../elements/VividCard'
import { IconBadge } from '../../elements/IconBadge'
import { SlideHeader } from '../../elements/SlideHeader'
import styles from './SlideStatCards.module.css'

export interface StatCard {
  icon: LucideIcon
  /** Icon tint on the glass tile: cyan = turquoise, mint = aqua, blue/purple = white. One per card. */
  accent?: AccentColor
  /** The number, ≤ 5 characters ("50+", "4 wks", "100%"). */
  value: string
  /** Mono caption under the number, ≤ ~18 characters (one line). */
  label: string
}

export interface SlideStatCardsProps {
  eyebrow?: string
  /** Title, line 1 (white), ≤ ~40 characters. A full title with your own `<Highlight mode="invert-blue">` also works. */
  title: ReactNode
  /** Title, line 2 in turquoise (the site's two-tone title), ≤ ~40 characters. */
  accent?: ReactNode
  /** One sentence beside the title (split header), ≤ ~110 characters. */
  lede?: ReactNode
  /** 3 cards. */
  stats: StatCard[]
}

/** Three numbers in glass cards on the blue mesh, under the site's two-tone header: icon tile at the top, big number and mono caption at the bottom. */
export function SlideStatCards({ eyebrow, title, accent, lede, stats }: SlideStatCardsProps) {
  return (
    <SlideShell mode="invert-blue" safeArea={144} background={<VividBackground variant="mesh" />}>
      <div className={styles.body}>
        <SlideHeader
          eyebrow={eyebrow}
          title={title}
          accent={accent}
          lede={lede}
          mode="invert-blue"
          layout={lede ? 'split' : 'stacked'}
          width={1300}
        />
        <div className={styles.cards}>
          {stats.map((s) => (
            <VividCard key={s.label} surface="glass" padding="lg" style={{ flex: 1 }}>
              <IconBadge variant="glass" shape="square" accent={s.accent ?? 'cyan'} icon={s.icon} size={72} />
              <div className={styles.fill} />
              <p className={styles.value}>{s.value}</p>
              <p className={styles.label}>{s.label}</p>
            </VividCard>
          ))}
        </div>
      </div>
    </SlideShell>
  )
}
