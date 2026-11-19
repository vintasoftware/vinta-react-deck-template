import type { CSSProperties, ReactNode } from 'react'
import { SlideShell } from '../SlideShell'
import { VividBackground } from '../../elements/VividBackground'
import { SlideHeader } from '../../elements/SlideHeader'
import { PhotoSlot } from '../../elements/PhotoSlot'
import styles from './SlideOrgTeam.module.css'

export interface OrgPerson {
  /** ≤ ~20 characters. For an open seat, the role to hire ("Product marketing"). */
  name: string
  /** ≤ ~22 characters. For an open seat, the caption under the shape ("To be hired"). */
  role: string
  /** Studio portrait, 180×180 (`/assets/team/team-1.webp`…). Without it: dashed placeholder. */
  photo?: string
  /** An open seat: blue shape with a plus instead of the portrait. */
  open?: boolean
}

export interface OrgGroup {
  /** Area name, ≤ ~22 characters. */
  label: string
  /** 1–6 people, laid out in two rows. */
  people: OrgPerson[]
}

export interface SlideOrgTeamProps {
  eyebrow?: string
  /** Title, one line, ≤ ~30 characters. Wrap a word in `<Highlight>`. */
  title: ReactNode
  /** 2–4 groups. Total people ≤ 10. */
  groups: OrgGroup[]
  /** 64px grid over the wash (the "planning deck" look). */
  grid?: boolean
}

/** The team by area: round portraits with name and role, open seats as blue shapes. Org charts, hiring plans,
 *  "who is on this". From the Expansion planning deck. Studio portraits only (CLAUDE.md §8). Wash background. */
export function SlideOrgTeam({ eyebrow, title, groups, grid = false }: SlideOrgTeamProps) {
  return (
    <SlideShell mode="light" safeArea={144} background={<VividBackground variant="wash" grid={grid} />}>
      <div className={styles.body}>
        <SlideHeader eyebrow={eyebrow} title={title} width={1500} />
        <div className={styles.groups}>
          {groups.map((g) => {
            const cols = Math.max(1, Math.ceil(g.people.length / 2))
            return (
              <div key={g.label} className={styles.group} style={{ '--cols': cols } as CSSProperties}>
                <p className={styles.groupLabel}>{g.label}</p>
                <div className={styles.people}>
                  {g.people.map((p) => (
                    <div key={p.name} className={styles.person}>
                      {p.open ? (
                        <div className={styles.seat}>
                          <span className={styles.plus} aria-hidden="true">
                            +
                          </span>
                          <p className={styles.seatRole}>{p.name}</p>
                        </div>
                      ) : (
                        <PhotoSlot src={p.photo} alt={p.name} width={180} height={180} radius="circle" />
                      )}
                      {!p.open && <p className={styles.name}>{p.name}</p>}
                      <p className={styles.role} data-open={p.open || undefined}>
                        {p.role}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </SlideShell>
  )
}
