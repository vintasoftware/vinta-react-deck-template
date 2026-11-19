import type { ReactNode } from 'react'
import { SlideShell } from '../SlideShell'
import { VividBackground } from '../../elements/VividBackground'
import { VividCard } from '../../elements/VividCard'
import { PhotoSlot } from '../../elements/PhotoSlot'
import { SlideHeader } from '../../elements/SlideHeader'
import { Body } from '../../elements/Body'
import styles from './SlideReviews.module.css'

export interface Review {
  /** The testimonial, without quote marks, ≤ ~120 characters. Wrap the accent phrase in `<Highlight>`
   *  (on the `highlight` card use `<Highlight mode="invert-navy">`). */
  quote: ReactNode
  /** Person's name, ≤ ~24 characters. */
  name: string
  /** "Role, Client", ≤ ~28 characters (one mono line). */
  role: string
  /** Client logo (220×48 slot), e.g. `<Logo name="Northwind" width={220} height={48} />`. Leave out for the dashed placeholder. */
  logo?: ReactNode
  /** Portrait (80×80 circle). Leave out for the placeholder. */
  portrait?: string
  /** Navy card (one per row, usually the middle one). */
  highlight?: boolean
}

export interface SlideReviewsProps {
  eyebrow?: string
  /** Title, line 1 (ink), ≤ ~45 characters. A full title with your own `<Highlight>` also works. */
  title: ReactNode
  /** Title, line 2 in blue (the site's two-tone title), ≤ ~45 characters. */
  accent?: ReactNode
  /** One sentence beside the title (split header), ≤ ~110 characters. */
  lede?: ReactNode
  /** 3 reviews. */
  reviews: Review[]
}

/** Client testimonials under the site's two-tone header: three quote cards on the light wash (white cards, one navy highlight card),
 *  each with the client logo, the quote with an accent phrase, a portrait, name and role. */
export function SlideReviews({ eyebrow, title, accent, lede, reviews }: SlideReviewsProps) {
  return (
    <SlideShell mode="light" safeArea={144} background={<VividBackground variant="wash" />}>
      <div className={styles.body}>
        <SlideHeader eyebrow={eyebrow} title={title} accent={accent} lede={lede} layout={lede ? 'split' : 'stacked'} width={1300} />
        <div className={styles.cards}>
          {reviews.map((r) => {
            const mode = r.highlight ? 'invert-navy' : 'light'
            const placeholder = r.highlight ? 'dark' : 'light'
            return (
              <VividCard key={r.name} surface={r.highlight ? 'navy' : 'white'} padding="lg" style={{ flex: 1 }}>
                <div className={styles.inner} data-highlight={r.highlight ? 'true' : undefined}>
                  <div className={styles.logo}>
                    {r.logo ?? <PhotoSlot width={220} height={48} radius="sm" placeholder={placeholder} alt="Client logo placeholder" />}
                  </div>
                  <span className={styles.mark} aria-hidden="true">
                    &ldquo;
                  </span>
                  <Body mode={mode} tone="primary" ink="vivid" weight="regular">
                    {r.quote}
                  </Body>
                  <div className={styles.person}>
                    <PhotoSlot src={r.portrait} alt={r.name} width={80} height={80} radius="circle" placeholder={placeholder} />
                    <div className={styles.personText}>
                      <Body mode={mode} tone="primary" ink="vivid">
                        {r.name}
                      </Body>
                      <p className={styles.role}>{r.role}</p>
                    </div>
                  </div>
                </div>
              </VividCard>
            )
          })}
        </div>
      </div>
    </SlideShell>
  )
}
