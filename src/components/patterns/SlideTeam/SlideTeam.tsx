import type { ReactNode } from 'react'
import { resolveTone, titleLines, type SlideTone } from '../../shared/slideTone'
import { SlideShell } from '../SlideShell'
import { SlideHeader } from '../../elements/SlideHeader'
import type { PersonCardProps } from '../../elements/PersonCard'
import { VividCard } from '../../elements/VividCard'
import { PhotoSlot } from '../../elements/PhotoSlot'
import { Body } from '../../elements/Body'
import styles from './SlideTeam.module.css'

export interface SlideTeamProps {
  /** light / tint = wash · invert-blue = mesh · invert-navy = night · vivid = wash */
  tone?: SlideTone
  eyebrow?: string
  /** Title, line 1. Also accepts the old array of lines or a node with your own `<Highlight>`. */
  title: ReactNode | ReactNode[]
  /** Title, line 2 in the accent color (blue on light, turquoise on dark). */
  accent?: ReactNode
  /** One sentence under the title. */
  lede?: ReactNode
  /** 3 or 4 people. `src` = portrait inside the accent ring (`/assets/team/team-1.webp`…); without it the ring
   *  shows the initials. Name ≤ ~20 characters, role ≤ ~20, bio ≤ ~60. */
  people: Omit<PersonCardProps, 'mode'>[]
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

/** Team in the site look: one card per person with a round portrait in an accent gradient ring, name, mono role
 *  in the accent and bio. Cards are white on light, glass on dark. One accent (blue) per slide by default. */
export function SlideTeam({ tone = 'tint', eyebrow, title, accent, lede, people }: SlideTeamProps) {
  const t = resolveTone(tone)
  return (
    <SlideShell mode={t.shellMode} safeArea={144} background={t.background}>
      <div className={styles.body} data-dark={t.dark || undefined}>
        <SlideHeader eyebrow={eyebrow} title={titleLines(title)} accent={accent} lede={lede} mode={t.textMode} width={1400} />
        <div className={styles.cards}>
          {people.map((person, i) => {
            const personAccent = person.accent ?? 'blue'
            return (
              <VividCard key={i} surface={t.dark ? 'glass' : 'white'} style={{ flex: 1 }}>
                <div className={styles.ring} data-accent={personAccent}>
                  {person.src ? (
                    <PhotoSlot src={person.src} alt={person.name} width={224} height={224} radius="circle" />
                  ) : (
                    <span className={styles.initials} aria-label={person.name}>
                      {initials(person.name)}
                    </span>
                  )}
                </div>
                <div className={styles.text}>
                  <Body tone="primary" ink="vivid" mode={t.textMode}>
                    {person.name}
                  </Body>
                  <span className={styles.role} data-accent={personAccent}>
                    {person.role}
                  </span>
                  {person.bio && (
                    <Body weight="regular" mode={t.textMode}>
                      {person.bio}
                    </Body>
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
