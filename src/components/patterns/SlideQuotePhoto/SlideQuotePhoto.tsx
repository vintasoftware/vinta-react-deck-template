import type { ReactNode } from 'react'
import { SlideShell } from '../SlideShell'
import { VividBackground } from '../../elements/VividBackground'
import { ConcentricRings } from '../../elements/ConcentricRings'
import { PhotoSlot } from '../../elements/PhotoSlot'
import { Quote } from '../../elements/Quote'
import { Eyebrow } from '../../elements/Eyebrow'
import styles from './SlideQuotePhoto.module.css'

export interface SlideQuotePhotoProps {
  /** bleed = full-bleed photo under a navy veil, quote at the left ·
   *  portrait = blue mesh, round portrait with rings at the left, quote at the right */
  variant?: 'bleed' | 'portrait'
  /** Optional mono label above the quote (no tick, as on the site), e.g. "CLIENT VOICE". */
  eyebrow?: string
  /** The testimonial, without quotation marks (the element draws the opening mark). ≤ ~140 characters.
   *  Wrap the accent phrase in `<Highlight mode="invert-navy">` (bleed) or `<Highlight mode="invert-blue">` (portrait). */
  quote: ReactNode
  /** Person's name. */
  author?: ReactNode
  /** Role and company, uppercase, e.g. "CTO, NORTHWIND HEALTH". */
  role?: ReactNode
  /** bleed: the 1920×1080 background photo · portrait: the 552×552 round portrait. Leave out for the placeholder. */
  photo?: string
  photoAlt?: string
  /** Client logo (≈ 240×44). Default: the dashed logo placeholder. Pass `null` to hide it. */
  logo?: ReactNode
  /** Vinta wordmark at the top left. Default true. */
  wordmark?: boolean
}

/** Client testimonial with a photo: a full-bleed photo under a navy veil, or a round portrait on the blue mesh. */
export function SlideQuotePhoto({
  variant = 'bleed',
  eyebrow,
  quote,
  author,
  role,
  photo,
  photoAlt = '',
  logo,
  wordmark = true,
}: SlideQuotePhotoProps) {
  const isBleed = variant === 'bleed'
  const mode = isBleed ? 'invert-navy' : 'invert-blue'
  const logoNode =
    logo === undefined ? <PhotoSlot alt="Client logo placeholder" width={240} height={44} radius="sm" placeholder="dark" /> : logo
  return (
    <SlideShell
      mode={mode}
      safeArea="hero"
      background={
        isBleed ? (
          <>
            <VividBackground variant="night" />
            <PhotoSlot src={photo} alt={photoAlt} width={1920} height={1080} overlay="veil" placeholder="dark" />
          </>
        ) : (
          <>
            <VividBackground variant="mesh" />
            <ConcentricRings cx={480} cy={540} sizes={[768, 672]} glow={760} tone="mixed" />
          </>
        )
      }
    >
      {wordmark && <img className={styles.wordmark} src="/assets/shared/vinta-wordmark-white.svg" alt="Vinta" />}
      {!isBleed && (
        <div className={styles.portrait}>
          <PhotoSlot src={photo} alt={photoAlt} width={552} height={552} radius="circle" placeholder="dark" />
        </div>
      )}
      <div className={styles.body} data-variant={variant}>
        <div className={styles.quote}>
          {eyebrow && (
            <Eyebrow size="md" mode={mode} tick={false}>
              {eyebrow}
            </Eyebrow>
          )}
          <Quote mode={mode} accent="cyan" author={author} role={role}>
            {quote}
          </Quote>
          {!isBleed && logoNode && <div className={styles.logoInline}>{logoNode}</div>}
        </div>
      </div>
      {isBleed && logoNode && <div className={styles.logoCorner}>{logoNode}</div>}
    </SlideShell>
  )
}
