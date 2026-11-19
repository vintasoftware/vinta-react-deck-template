import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Handshake, Rocket, ShieldCheck, Sparkles, Users } from 'lucide-react'
import type { AccentColor } from '../../shared/types'
import { isAccentColor, resolveTone, titleLines, type SlideTone } from '../../shared/slideTone'
import { SlideShell } from '../SlideShell'
import { SlideHeader } from '../../elements/SlideHeader'
import { Body } from '../../elements/Body'
import type { BulletVariant } from '../../elements/BulletList'
import { VividCard } from '../../elements/VividCard'
import { PhotoSlot } from '../../elements/PhotoSlot'
import { IconBadge } from '../../elements/IconBadge'
import styles from './SlideContent.module.css'

export interface SlideContentProps {
  /** light / tint = wash · invert-blue = mesh · invert-navy = night · vivid = mesh */
  tone?: SlideTone
  eyebrow?: string
  /** Title, line 1. Also accepts the old array of lines or a node with your own `<Highlight>`. */
  title: ReactNode | ReactNode[]
  /** Title, line 2 in the accent color (blue on light, turquoise on dark).
   *  Legacy: an `AccentColor` name here ('purple', 'mint'…) is read as `accentColor`, as before. */
  accent?: ReactNode
  /** One or two sentences under the title. */
  lede?: ReactNode
  /** @deprecated Old name of `lede` (used when `lede` is not set). */
  lead?: ReactNode
  /** 3 to 5 points, each ≤ ~70 characters (2 lines), in a card at the right. */
  bullets: ReactNode[]
  /** dot (default) = a small blue dot · number = numbered circles joined by a line (steps, phases) · check = icon tiles. */
  bulletVariant?: BulletVariant
  /** Color of the icons in the tiles (one accent for all points). On dark, blue/purple stay white. */
  accentColor?: AccentColor
  /** One Lucide icon per point (defaults to rocket, shield-check, users, handshake, sparkles). */
  bulletIcons?: LucideIcon[]
  /** Photo above the points card, 760×300 (`/assets/team/content.webp`). Left out: no photo, except with
   *  `tone="vivid"`, which keeps the dashed placeholder. */
  photo?: string
  photoAlt?: string
}

const ICONS: LucideIcon[] = [Rocket, ShieldCheck, Users, Handshake, Sparkles]

/** Idea + supporting points in the site look: title and lede on the left; on the right an optional photo and a
 *  card of points (dots, numbered steps or icon tiles). Card and tiles are white on light, glass on dark. */
export function SlideContent({
  tone = 'light',
  eyebrow,
  title,
  accent,
  lede,
  lead,
  bullets,
  bulletVariant = 'dot',
  accentColor,
  bulletIcons,
  photo,
  photoAlt = '',
}: SlideContentProps) {
  const t = resolveTone(tone, 'mesh')
  const legacyColor = isAccentColor(accent)
  const titleAccent = legacyColor ? undefined : accent
  const iconAccent = accentColor ?? (legacyColor ? accent : 'blue')
  const showPhoto = photo !== undefined || tone === 'vivid'
  const numbered = bulletVariant === 'number'
  return (
    <SlideShell mode={t.shellMode} safeArea={144} background={t.background}>
      <div className={styles.body} data-dark={t.dark || undefined}>
        <div className={styles.text}>
          <SlideHeader eyebrow={eyebrow} title={titleLines(title)} accent={titleAccent} lede={lede ?? lead} mode={t.textMode} />
        </div>
        <div className={styles.side} data-photo={showPhoto || undefined}>
          {showPhoto && (
            <PhotoSlot src={photo} alt={photoAlt} width={760} height={300} radius="lg" placeholder={t.dark ? 'dark' : 'light'} />
          )}
          <VividCard surface={t.dark ? 'glass' : 'white'} padding="none" style={{ flex: 1 }}>
            <div className={styles.points} data-numbered={numbered || undefined}>
              {bullets.map((bullet, i) => (
                <div key={i} className={styles.point}>
                  {numbered ? (
                    <span className={styles.step}>{i + 1}</span>
                  ) : bulletVariant === 'dot' ? (
                    <span className={styles.dot} aria-hidden="true" />
                  ) : (
                    <IconBadge
                      variant={t.dark ? 'glass' : 'white'}
                      shape="square"
                      accent={iconAccent}
                      icon={bulletIcons?.[i] ?? ICONS[i % ICONS.length]}
                      size={72}
                    />
                  )}
                  <Body tone="primary" ink="vivid" mode={t.textMode}>
                    {bullet}
                  </Body>
                </div>
              ))}
            </div>
          </VividCard>
        </div>
      </div>
    </SlideShell>
  )
}
