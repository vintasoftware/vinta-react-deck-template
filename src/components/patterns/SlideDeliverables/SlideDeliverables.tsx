import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { SlideShell } from '../SlideShell'
import { VividBackground } from '../../elements/VividBackground'
import { VividCard } from '../../elements/VividCard'
import { PhotoSlot } from '../../elements/PhotoSlot'
import { IconBadge } from '../../elements/IconBadge'
import { SlideHeader } from '../../elements/SlideHeader'
import { Subtitle } from '../../elements/Subtitle'
import { Body } from '../../elements/Body'
import styles from './SlideDeliverables.module.css'

export interface Deliverable {
  icon: LucideIcon
  /** ≤ ~22 characters (2 lines max). */
  label: string
}

export interface SlideDeliverablesProps {
  eyebrow?: string
  /** The big claim, line 1 (white), ≤ ~26 characters. A full title with your own `<Highlight mode="invert-blue">` also works. */
  title: ReactNode
  /** The claim, line 2 in turquoise (the site's two-tone title), ≤ ~26 characters. */
  accent?: ReactNode
  /** One sentence under the title, ≤ ~70 characters. */
  lede?: ReactNode
  /** Photo at the right (760×520), e.g. `/assets/team/rich-deliver.webp`. Leave out for the placeholder. */
  photo?: string
  photoAlt?: string
  photoPosition?: string
  /** Sentence at the top of the glass bar, one line (≤ ~50 characters). */
  lead: string
  /** 4 deliverables (3–5 work). */
  deliverables: Deliverable[]
}

/** What the client gets at the end: big two-tone claim and a photo on the blue mesh, then a glass bar with the
 *  deliverables (glass tile + label). */
export function SlideDeliverables({
  eyebrow,
  title,
  accent,
  lede,
  photo,
  photoAlt = '',
  photoPosition,
  lead,
  deliverables,
}: SlideDeliverablesProps) {
  return (
    <SlideShell mode="invert-blue" safeArea={144} background={<VividBackground variant="mesh" />}>
      <div className={styles.body}>
        <div className={styles.top}>
          <div className={styles.text}>
            <SlideHeader eyebrow={eyebrow} title={title} accent={accent} lede={lede} mode="invert-blue" width={820} />
          </div>
          <PhotoSlot src={photo} alt={photoAlt} width={760} height={520} radius="lg" placeholder="dark" position={photoPosition} />
        </div>
        <VividCard surface="glass" padding="lg" style={{ gap: 40, alignItems: 'center' }}>
          <Subtitle mode="invert-blue">{lead}</Subtitle>
          <div className={styles.items}>
            {deliverables.map((d) => (
              <div key={d.label} className={styles.item}>
                <IconBadge variant="glass" shape="square" icon={d.icon} size={72} />
                <div className={styles.label}>
                  <Body mode="invert-blue" tone="primary" weight="regular">
                    {d.label}
                  </Body>
                </div>
              </div>
            ))}
          </div>
        </VividCard>
      </div>
    </SlideShell>
  )
}
