import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import type { AccentColor } from '../../shared/types'
import { SlideShell } from '../SlideShell'
import { VividBackground } from '../../elements/VividBackground'
import { SlideHeader } from '../../elements/SlideHeader'
import { VividCard } from '../../elements/VividCard'
import { IconBadge } from '../../elements/IconBadge'
import { Eyebrow } from '../../elements/Eyebrow'
import { DisplayTitle } from '../../elements/DisplayTitle'
import { Body } from '../../elements/Body'
import { Tag } from '../../elements/Tag'
import { TextLink } from '../../elements/TextLink'
import styles from './SlideServiceMenu.module.css'

export type ServiceChip = string | { label: string; icon?: LucideIcon }

export interface ServiceItem {
  icon: LucideIcon
  /** Service name, one line: ≤ ~22 characters with 3 groups or a side card, ≤ ~28 with 2 groups alone. */
  name: string
  /** One line under the name: ≤ ~24 characters with 3 groups or a side card, ≤ ~30 with 2 groups alone. */
  text?: string
  /** Icon and highlight color. One accent per item; default blue. */
  accent?: AccentColor
  /** Highlight this item (tinted row, gradient tile, chips). Use it on ONE item per slide. */
  highlight?: boolean
  /** Chips under the highlighted item (2–3, ≤ ~12 characters each). Only rendered when `highlight` is on. */
  chips?: ServiceChip[]
}

export interface ServiceGroup {
  /** Mono label above the group, e.g. "BUILD YOUR PRODUCT". */
  label: string
  /** 2–4 services (3 with a lede). The group holding the highlighted item fits one row less. */
  items: ServiceItem[]
}

export interface ServiceSideCard {
  /** Mono label, e.g. "ALL OUR SERVICES". */
  eyebrow?: string
  /** Two short lines, e.g. "Not only healthcare". */
  title: ReactNode
  /** ≤ ~80 characters (4 lines). */
  text?: string
  /** CTA label (renders as a button), ≤ ~20 characters. */
  cta?: string
}

export interface SlideServiceMenuProps {
  eyebrow?: string
  /** Title, line 1 (ink). Or a full title with your own `<Highlight>`. */
  title: ReactNode
  /** Title, line 2 in the accent color. */
  accent?: ReactNode
  /** One line under the title (≤ ~70 characters). Leave it out with 4-row groups: it costs the panel a row. */
  lede?: ReactNode
  /** 2–3 groups. With `sideCard`, use 2. */
  groups: ServiceGroup[]
  /** Teal side card at the right of the panel ("Not only healthcare"). */
  sideCard?: ServiceSideCard
  /** wash = light (home page look) · mesh = blue (services page look). The panel stays white on both. */
  background?: 'wash' | 'mesh'
}

function chipProps(chip: ServiceChip) {
  return typeof chip === 'string' ? { label: chip, icon: undefined } : chip
}

/** Services catalog: 2–3 groups of icon rows (name + one line) inside a big white panel, one item highlighted with
 *  chips, and an optional teal side card. Site: home "Where healthcare gets complex", services "Find the service". */
export function SlideServiceMenu({
  eyebrow,
  title,
  accent,
  lede,
  groups,
  sideCard,
  background = 'wash',
}: SlideServiceMenuProps) {
  const mode = background === 'mesh' ? 'invert-blue' : 'light'
  return (
    <SlideShell mode={mode} safeArea={144} background={<VividBackground variant={background} />}>
      <div className={styles.body}>
        <SlideHeader eyebrow={eyebrow} title={title} accent={accent} lede={lede} mode={mode} />
        <VividCard padding="lg" radius="lg" style={{ flex: 1, flexDirection: 'row', gap: 48, minHeight: 0 }}>
          <div className={styles.groups} data-count={groups.length}>
            {groups.map((group) => (
              <section key={group.label} className={styles.group}>
                <Eyebrow size="md" tick={false}>
                  {group.label}
                </Eyebrow>
                <ul className={styles.items}>
                  {group.items.map((item) => {
                    const itemAccent = item.accent ?? 'blue'
                    return (
                      <li
                        key={item.name}
                        className={styles.item}
                        data-highlight={item.highlight ? 'true' : undefined}
                        data-accent={itemAccent}
                      >
                        <IconBadge
                          variant={item.highlight ? 'gradient' : 'white'}
                          shape="square"
                          accent={itemAccent}
                          icon={item.icon}
                          size={72}
                        />
                        <div className={styles.text}>
                          <p className={styles.name}>{item.name}</p>
                          {item.text && <Body weight="regular">{item.text}</Body>}
                        </div>
                        {item.highlight && item.chips && item.chips.length > 0 && (
                          <div className={styles.chips}>
                            {item.chips.map((chip) => {
                              const c = chipProps(chip)
                              return (
                                <Tag key={c.label} variant="white" icon={c.icon}>
                                  {c.label}
                                </Tag>
                              )
                            })}
                          </div>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </section>
            ))}
          </div>
          {sideCard && (
            <aside className={styles.side}>
              <div className={styles.sideText}>
                {sideCard.eyebrow && (
                  <Eyebrow size="md" mode="invert-blue" tick={false}>
                    {sideCard.eyebrow}
                  </Eyebrow>
                )}
                <DisplayTitle mode="invert-blue" scale="h1">
                  {sideCard.title}
                </DisplayTitle>
                {sideCard.text && (
                  <Body mode="invert-blue" weight="regular">
                    {sideCard.text}
                  </Body>
                )}
              </div>
              {sideCard.cta && (
                <div className={styles.cta}>
                  <TextLink variant="button" mode="light" accent="blue">
                    {sideCard.cta}
                  </TextLink>
                </div>
              )}
            </aside>
          )}
        </VividCard>
      </div>
    </SlideShell>
  )
}
