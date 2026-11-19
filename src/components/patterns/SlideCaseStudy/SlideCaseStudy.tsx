import { SlideShell } from '../SlideShell'
import { VividBackground } from '../../elements/VividBackground'
import { SlideHeader } from '../../elements/SlideHeader'
import { Tag } from '../../elements/Tag'
import { VividCard } from '../../elements/VividCard'
import styles from './SlideCaseStudy.module.css'

export interface CaseStudy {
  /** Id used by `getCaseStudy` and in the image file names. */
  slug: string
  client: string
  /** Title line 2, in the accent color, under the client name (≤ ~45 characters). */
  phrase: string
  location: string
  duration: string
  industry: string
  /** health = healthcare client · non-health = other industries. Used to group the case library. */
  sector?: 'health' | 'non-health'
  /** One or two sentences, ≤ ~200 characters (the lede under the title). */
  summary: string
  /** Up to 3 short tags. */
  tags: string[]
  /** Exactly 3 numbers or facts: value ≤ 8 characters, uppercase label ≤ 28. */
  highlights: { value: string; label: string }[]
  /** Full-width photo across the top (1920 × 440 crop). */
  hero: string
  /** Client logo on a badge over the photo. `light` logos sit on a navy glass badge, `dark` ones on a white badge.
   *  Without a logo the badge is left out (the client name is already in the title). */
  logo?: { src: string; tone: 'light' | 'dark' }
}

export type SlideCaseStudyProps = CaseStudy

/** Client case from the case library: edge-to-edge photo on top with the client logo badge, then the site-look header
 *  (client name, phrase in the accent color, summary as the lede), tags and three highlight cards. Content for the 30 published cases: `getCaseStudy(slug)` in `./cases`. */
export function SlideCaseStudy({ client, phrase, location, duration, summary, tags, highlights, hero, logo }: SlideCaseStudyProps) {
  return (
    <SlideShell mode="light" safeArea={0} background={<VividBackground variant="wash" />}>
      <div className={styles.body}>
        <div className={styles.hero}>
          <img className={styles.photo} src={hero} alt={`Photo from the ${client} case study`} />
          {logo && (
            <div className={styles.badge} data-tone={logo.tone}>
              <img className={styles.logo} src={logo.src} alt={`${client} logo`} />
            </div>
          )}
        </div>
        <div className={styles.content}>
          <div className={styles.main}>
            <SlideHeader
              eyebrow={`CASE STUDY | ${location} | ${duration}`.toUpperCase()}
              title={client}
              accent={phrase}
              lede={summary}
              width={1040}
            />
            <div className={styles.tags}>
              {tags.map((tag) => (
                <Tag key={tag} variant="filled" accent="blue">
                  {tag}
                </Tag>
              ))}
            </div>
          </div>
          <div className={styles.highlights}>
            {highlights.map((h) => (
              <VividCard key={h.label} padding="none" radius="md">
                <div className={styles.card}>
                  <span className={styles.value}>{h.value}</span>
                  <span className={styles.label}>{h.label}</span>
                </div>
              </VividCard>
            ))}
          </div>
        </div>
      </div>
    </SlideShell>
  )
}
