import type { ReactNode } from 'react'
import type { AccentColor } from '../../shared/types'
import { SlideShell } from '../SlideShell'
import { VividCard } from '../../elements/VividCard'
import { PhotoSlot } from '../../elements/PhotoSlot'
import { VividBackground } from '../../elements/VividBackground'
import { SlideHeader } from '../../elements/SlideHeader'
import { Body } from '../../elements/Body'
import styles from './SlideTeamPhotos.module.css'

export interface TeamPhotoPerson {
  /** Portrait (436×320 landscape crop; 300 tall with 4 people), e.g. `/assets/team/teamph-1.webp`. Leave out for the placeholder. */
  photo?: string
  /** CSS object-position to keep the face in frame, e.g. "50% 30%". */
  photoPosition?: string
  /** Mono role label, uppercase, ≤ ~20 characters. */
  role: string
  /** Color of the mono role label. Default blue; keep one accent per slide. */
  accent?: AccentColor
  /** ≤ ~22 characters. */
  name: string
  /** One sentence, ≤ ~45 characters (3 people) or ~35 (4 people). */
  text: string
}

export interface SlideTeamPhotosProps {
  eyebrow?: string
  /** Title, line 1 (ink), ≤ ~45 characters. A full title with your own `<Highlight>` also works. */
  title: ReactNode
  /** Title, line 2 in blue (the site's two-tone title), ≤ ~45 characters. */
  accent?: ReactNode
  /** One sentence beside the title (split header), ≤ ~110 characters. */
  lede?: ReactNode
  /** 3 or 4 people. */
  people: TeamPhotoPerson[]
}

/** The team that will work on the project: 3–4 cards with a large portrait, mono role label, name and one line,
 *  under the site's two-tone header (lede at the right). Wash background. */
export function SlideTeamPhotos({ eyebrow, title, accent, lede, people }: SlideTeamPhotosProps) {
  const four = people.length >= 4
  return (
    <SlideShell mode="light" safeArea={144} background={<VividBackground variant="wash" />}>
      <div className={styles.body}>
        <SlideHeader eyebrow={eyebrow} title={title} accent={accent} lede={lede} layout={lede ? 'split' : 'stacked'} width={1400} />
        <div className={styles.cards} data-count={people.length}>
          {people.map((p) => (
            <VividCard key={p.name} padding="md" style={{ flex: 1 }}>
              <PhotoSlot
                src={p.photo}
                alt={p.name}
                width="100%"
                height={four ? 300 : 320}
                radius="md"
                position={p.photoPosition}
              />
              <div className={styles.text}>
                <p className={styles.role} data-accent={p.accent ?? 'blue'}>
                  {p.role}
                </p>
                <Body tone="primary" ink="vivid">
                  {p.name}
                </Body>
                <Body weight="regular">{p.text}</Body>
              </div>
            </VividCard>
          ))}
        </div>
      </div>
    </SlideShell>
  )
}
