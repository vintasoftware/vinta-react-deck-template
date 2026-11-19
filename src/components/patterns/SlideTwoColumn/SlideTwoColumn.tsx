import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import type { AccentColor } from '../../shared/types'
import { isAccentColor, resolveTone, titleLines, type SlideTone } from '../../shared/slideTone'
import { SlideShell } from '../SlideShell'
import { SlideHeader } from '../../elements/SlideHeader'
import { Body } from '../../elements/Body'
import { TextLink } from '../../elements/TextLink'
import { Tag } from '../../elements/Tag'
import { PhotoSlot } from '../../elements/PhotoSlot'
import { IconBadge } from '../../elements/IconBadge'
import styles from './SlideTwoColumn.module.css'

export interface SlideTwoColumnProps {
  /** light / tint = wash · invert-blue = mesh · invert-navy = night · vivid = wash */
  tone?: SlideTone
  eyebrow?: string
  /** Title, line 1. Also accepts the old array of lines or a node with your own `<Highlight>`. */
  title: ReactNode | ReactNode[]
  /** Title, line 2 in the accent color (blue on light, turquoise on dark).
   *  Legacy: an `AccentColor` name here ('purple'…) is read as `accentColor`, as before. */
  accent?: ReactNode
  /** One or two sentences under the title. */
  lede?: ReactNode
  /** @deprecated Old name of `lede` (used when `lede` is not set). */
  body?: ReactNode
  /** 2 to 4 points, each ≤ ~34 characters, with a small dot (or an icon tile when `bulletIcons` is given). */
  bullets?: ReactNode[]
  /** Call to action under the points: a button on light, a glass pill with an arrow on dark. */
  cta?: string
  /** Image or any visual in the 840×760 frame. Wins over `photo`; leave both out for the placeholder. */
  media?: ReactNode
  mediaSide?: 'left' | 'right'
  /** One color for every tile icon and the CTA (default blue). */
  accentColor?: AccentColor
  /** Optional: one Lucide icon tile per point. Without it the points use dots. */
  bulletIcons?: LucideIcon[]
  /** Color of each point's tile icon (wins over `accentColor`). */
  bulletAccents?: AccentColor[]
  /** Photo in the 840×760 frame (`/assets/team/two-column.webp`). */
  photo?: string
  photoAlt?: string
}


/** Text on one side, an 840×760 photo over a tilted azure → turquoise panel on the other, in the site look.
 *  Points use dots by default (icon tiles only with `bulletIcons`). */
export function SlideTwoColumn({
  tone = 'light',
  eyebrow,
  title,
  accent,
  lede,
  body,
  bullets,
  cta,
  media,
  mediaSide = 'right',
  accentColor,
  bulletIcons,
  bulletAccents,
  photo,
  photoAlt = '',
}: SlideTwoColumnProps) {
  const t = resolveTone(tone)
  const legacyColor = isAccentColor(accent)
  const color = accentColor ?? (legacyColor ? accent : undefined)
  return (
    <SlideShell mode={t.shellMode} safeArea={144} background={t.background}>
      <div className={styles.body} data-media-side={mediaSide}>
        <div className={styles.text}>
          <SlideHeader
            eyebrow={eyebrow}
            title={titleLines(title)}
            accent={legacyColor ? undefined : accent}
            lede={lede ?? body}
            mode={t.textMode}
          />
          {bullets && (
            <div className={styles.bullets}>
              {bullets.map((bullet, i) => (
                <div key={i} className={styles.bullet}>
                  {bulletIcons?.[i] ? (
                    <IconBadge
                      variant={t.dark ? 'glass' : 'white'}
                      shape="square"
                      accent={bulletAccents?.[i] ?? color ?? 'blue'}
                      icon={bulletIcons[i]}
                      size={72}
                    />
                  ) : (
                    <span className={styles.dot} data-dark={t.dark || undefined} aria-hidden="true" />
                  )}
                  <Body tone="primary" ink="vivid" mode={t.textMode}>
                    {bullet}
                  </Body>
                </div>
              ))}
            </div>
          )}
          {cta &&
            (t.dark ? (
              // TextLink's button has no dark variant (blue on mesh is white on white): a glass pill instead.
              <Tag variant="glass" mode={t.textMode} icon={ArrowRight}>
                {cta}
              </Tag>
            ) : (
              <TextLink mode={t.textMode} accent={color ?? 'blue'} variant="button">
                {cta}
              </TextLink>
            ))}
        </div>
        <div className={styles.media}>
          <div className={styles.panel} aria-hidden="true" />
          <div className={styles.frame}>
            {media ?? <PhotoSlot src={photo} alt={photoAlt} width={840} height={760} radius="lg" placeholder={t.dark ? 'dark' : 'light'} />}
          </div>
        </div>
      </div>
    </SlideShell>
  )
}
