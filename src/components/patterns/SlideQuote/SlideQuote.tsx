import type { ReactNode } from 'react'
import type { AccentColor } from '../../shared/types'
import { resolveTone, type SlideTone } from '../../shared/slideTone'
import { SlideShell } from '../SlideShell'
import { Quote } from '../../elements/Quote'
import { Logo, type LogoProps } from '../../elements/Logo'
import { PhotoSlot } from '../../elements/PhotoSlot'
import styles from './SlideQuote.module.css'

export interface SlideQuoteProps {
  /** light / tint = wash · invert-blue = mesh · invert-navy = night · vivid = wash */
  tone?: SlideTone
  /** The testimonial, without quotes. ≤ ~140 characters (≤ ~120 with a photo). Wrap the key phrase in
   *  `<Highlight>` (`<Highlight mode="invert-blue">` / `"invert-navy"` on dark tones). */
  quote: ReactNode
  author?: ReactNode
  role?: ReactNode
  /** Client logo, under the author. */
  logo?: LogoProps
  /** Color of the opening quote mark. Default: blue on light, cyan on dark (white on mesh). */
  accent?: AccentColor
  /** Portrait on the violet panel at the right, 480×680 (`/assets/team/quote-panel.webp`). Left out: no panel and
   *  the quote takes the full width, except with `tone="vivid"`, which keeps the dashed placeholder.
   *  Never pair a team photo with a client's quote (CLAUDE.md §8). */
  photo?: string
  photoAlt?: string
}

/** Full-screen testimonial in the site look: the quote on the left, an optional portrait framed by a violet
 *  gradient panel on the right, the client logo at the bottom left. */
export function SlideQuote({ tone = 'invert-blue', quote, author, role, logo, accent, photo, photoAlt = '' }: SlideQuoteProps) {
  const t = resolveTone(tone)
  const showPhoto = photo !== undefined || tone === 'vivid'
  return (
    <SlideShell mode={t.shellMode} safeArea="hero" background={t.background}>
      <div className={styles.body}>
        <div className={styles.quote} data-photo={showPhoto || undefined}>
          <Quote mode={t.textMode} accent={accent ?? (t.dark ? 'cyan' : 'blue')} author={author} role={role}>
            {quote}
          </Quote>
        </div>
        {showPhoto && (
          <>
            <div className={styles.panel} aria-hidden="true" />
            <div className={styles.photo}>
              <PhotoSlot src={photo} alt={photoAlt} width={480} height={680} radius="md" placeholder={t.dark ? 'dark' : 'light'} />
            </div>
          </>
        )}
        {logo && (
          <div className={styles.logo}>
            <Logo {...logo} />
          </div>
        )}
      </div>
    </SlideShell>
  )
}
