import type { CSSProperties, ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { SlideShell } from '../SlideShell'
import { VividBackground } from '../../elements/VividBackground'
import { SlideHeader } from '../../elements/SlideHeader'
import { IconBadge } from '../../elements/IconBadge'
import { Body } from '../../elements/Body'
import styles from './SlideProfileCards.module.css'

export interface ProfileAttribute {
  /** Optional icon tile. Leave it out for a quieter card. */
  icon?: LucideIcon
  /** Mono label, ≤ ~12 characters ("SEGMENT", "SIZE"). */
  label: string
  /** The value, ≤ ~40 characters (3 lines). With `big`, a short number ("10 to 100"). */
  value: string
  /** Shows `value` as a big blue number, with `detail` as the unit line. */
  big?: boolean
  /** One or two lines under the value, ≤ ~50 characters. */
  detail?: string
}

export interface ProfilePain {
  /** Optional icon before the text. */
  icon?: LucideIcon
  /** ≤ ~90 characters (3 lines). */
  text: string
}

export interface SlideProfileCardsProps {
  eyebrow?: string
  /** Title, one line, ≤ ~40 characters ("1 · Specialty clinic in expansion"). */
  title: ReactNode
  /** "Persona · value" chip under the title. */
  persona?: { label: string; value: string; icon?: LucideIcon }
  /** One or two lines, ≤ ~170 characters. Wrap the key phrase in `<Highlight>`. */
  lede?: ReactNode
  /** 3–5 attribute cards (4 reads best). */
  attributes: ProfileAttribute[]
  /** Mono label of the bottom block. Default "PAINS". */
  painsLabel?: string
  /** 2–3 items in the bottom block. Leave out to drop the block. */
  pains?: ProfilePain[]
  /** 64px grid over the wash (the "planning deck" look). */
  grid?: boolean
}

/** A profile in one slide: title, persona chip, one-sentence description, a row of attribute cards (mono label, value) and a row of pains. Ideal customer profiles, segments, personas. From the Expansion planning deck. */
export function SlideProfileCards({
  eyebrow,
  title,
  persona,
  lede,
  attributes,
  painsLabel = 'PAINS',
  pains,
  grid = false,
}: SlideProfileCardsProps) {
  const PersonaIcon = persona?.icon
  return (
    <SlideShell mode="light" safeArea={144} background={<VividBackground variant="wash" grid={grid} />}>
      <div className={styles.body}>
        <SlideHeader eyebrow={eyebrow} title={title} width={1500} />
        {persona && (
          <div className={styles.persona}>
            {PersonaIcon && <PersonaIcon size={28} strokeWidth={1.5} aria-hidden="true" />}
            <span className={styles.personaLabel}>{persona.label}</span>
            <span className={styles.personaValue}>{persona.value}</span>
          </div>
        )}
        {lede && (
          <div className={styles.lede}>
            <Body tone="primary" ink="vivid" weight="regular">
              {lede}
            </Body>
          </div>
        )}
        <div className={styles.cards} style={{ '--count': attributes.length } as CSSProperties}>
          {attributes.map((a) => (
            <div key={a.label} className={styles.card}>
              {a.icon && <IconBadge variant="solid" shape="circle" accent="blue" icon={a.icon} size={64} />}
              <p className={styles.cardLabel}>{a.label}</p>
              <p className={styles.cardValue} data-big={a.big || undefined}>
                {a.value}
              </p>
              {a.detail && <p className={styles.cardDetail}>{a.detail}</p>}
            </div>
          ))}
        </div>
        {pains && pains.length > 0 && (
          <div className={styles.pains}>
            <p className={styles.painsLabel}>{painsLabel}</p>
            <div className={styles.painsRow} style={{ '--count': pains.length } as CSSProperties}>
              {pains.map((p) => {
                const Icon = p.icon
                return (
                  <div key={p.text} className={styles.pain}>
                    {Icon && <Icon size={32} strokeWidth={1.5} aria-hidden="true" />}
                    <p className={styles.painText}>{p.text}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </SlideShell>
  )
}
