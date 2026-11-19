import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { SlideShell } from '../SlideShell'
import { VividBackground } from '../../elements/VividBackground'
import { SlideHeader } from '../../elements/SlideHeader'
import { VividCard } from '../../elements/VividCard'
import { IconBadge } from '../../elements/IconBadge'
import { Body } from '../../elements/Body'
import styles from './SlideTwoPanels.module.css'

/** Column accent (label and icons): blue · mint (green) · purple · orange. Put two different accents side by side. */
export type PanelAccent = 'blue' | 'mint' | 'purple' | 'orange'

export interface PanelItem {
  /** Optional icon tile; without it the item shows a small dot. */
  icon?: LucideIcon
  /** ≤ ~30 characters (2 lines in the half-column). */
  text: string
}

export interface TwoPanel {
  /** Mono label at the top of the column, e.g. "FOR THE PRACTICE". ≤ ~24 characters. */
  label: string
  accent: PanelAccent
  /** 4–6 items, laid out in 2 columns. */
  items: PanelItem[]
}

export interface SlideTwoPanelsProps {
  eyebrow?: string
  /** Title, line 1 (ink), ≤ ~45 characters. A full title with your own `<Highlight>` also works. */
  title: ReactNode
  /** Title, line 2 in blue (the site's two-tone title), ≤ ~45 characters. */
  accent?: ReactNode
  /** One sentence under the title, ≤ ~110 characters. Leave it out when there are tabs and 6 items. */
  lede?: ReactNode
  /** Optional pill tab bar above the panel (≤ 5 tabs, ≤ ~20 characters each). */
  tabs?: string[]
  /** Index of the active (blue) tab. */
  activeTab?: number
  /** Exactly 2 columns: the two audiences or sides (practice / patients). */
  panels: [TwoPanel, TwoPanel]
}

/** Two audiences or two sides of one platform: one big white section panel split in two columns, each with a
 *  mono label and white icon tiles, plus an optional pill tab bar with the active tab in blue. Wash background. */
export function SlideTwoPanels({ eyebrow, title, accent, lede, tabs, activeTab = 0, panels }: SlideTwoPanelsProps) {
  return (
    <SlideShell mode="light" safeArea={144} background={<VividBackground variant="wash" />}>
      <div className={styles.body}>
        <SlideHeader eyebrow={eyebrow} title={title} accent={accent} lede={lede} width={1400} />
        <div className={styles.content}>
          {tabs && tabs.length > 0 && (
            <div className={styles.tabs}>
              {tabs.map((tab, i) => {
                const active = i === activeTab
                return (
                  <div key={tab} className={styles.tab} data-active={active || undefined}>
                    {active ? (
                      <Body tone="primary" mode="invert-blue">
                        {tab}
                      </Body>
                    ) : (
                      <Body weight="regular">{tab}</Body>
                    )}
                  </div>
                )
              })}
            </div>
          )}
          <VividCard padding="none" radius="lg" style={{ flex: 1 }}>
            <div className={styles.panels}>
              {panels.map((panel) => (
                <div key={panel.label} className={styles.panel} data-accent={panel.accent}>
                  <p className={styles.label}>{panel.label}</p>
                  <div className={styles.items}>
                    {panel.items.map((item) => (
                      <div key={item.text} className={styles.item}>
                        {item.icon ? (
                          <IconBadge variant="white" shape="square" accent={panel.accent} icon={item.icon} size={72} />
                        ) : (
                          <span className={styles.dot} aria-hidden="true" />
                        )}
                        <Body tone="primary" ink="vivid" weight="regular">
                          {item.text}
                        </Body>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </VividCard>
        </div>
      </div>
    </SlideShell>
  )
}
