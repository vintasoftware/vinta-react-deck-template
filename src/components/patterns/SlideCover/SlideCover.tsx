import type { ReactNode } from 'react'
import { SlideShell } from '../SlideShell'
import { VividBackground } from '../../elements/VividBackground'
import { PhotoSlot } from '../../elements/PhotoSlot'
import { ProductSlot } from '../../elements/BlockPreviews'
import { SlideHeader } from '../../elements/SlideHeader'
import { Tag } from '../../elements/Tag'
import styles from './SlideCover.module.css'

export interface SlideCoverProps {
  /** mesh = blue mesh with a UI slot at the right (animated product block by default) ·
   *  split = light wash with a full-height photo at the right · night = navy, centered, with "prepared for" */
  variant?: 'mesh' | 'split' | 'night'
  eyebrow?: string
  /** Title, line 1 (ink), ≤ ~12 characters (night ≤ ~16). A full title with your own `<br />` and `<Highlight>` also works. */
  title: ReactNode
  /** Title, line 2 in the accent color (blue on split, turquoise on mesh/night). Same limit as `title`. */
  accent?: ReactNode
  /** One line under the title, ≤ ~40 characters. */
  lede?: ReactNode
  /** @deprecated Use `lede`. */
  subtitle?: ReactNode
  /** Up to 2 tags. */
  tags?: string[]
  /** mesh: anything for the 1000×844 UI slot (screenshot, `<ImageFrame>`). Default: the live Provider Experience block. */
  media?: ReactNode
  /** split: photo for the 792×1080 right side. Leave out for the placeholder. */
  photo?: string
  photoAlt?: string
  /** night: top-right line, e.g. "PREPARED FOR NORTHWIND HEALTH · MAY 2026". */
  preparedFor?: string
}

/** Deck cover with three compositions, in the site look (two-tone display title, no tick on the eyebrow).
 *  `SlideIntro` stays the Figma original. */
export function SlideCover({
  variant = 'mesh',
  eyebrow,
  title,
  accent,
  lede,
  subtitle,
  tags,
  media,
  photo,
  photoAlt = '',
  preparedFor,
}: SlideCoverProps) {
  const mode = variant === 'split' ? 'light' : variant === 'night' ? 'invert-navy' : 'invert-blue'
  const dark = variant !== 'split'
  return (
    <SlideShell
      mode={mode}
      safeArea={144}
      background={
        <VividBackground variant={variant === 'split' ? 'wash' : variant} glow={variant === 'night' ? 'horizon' : 'none'} />
      }
    >
      {variant === 'mesh' && <div className={styles.ui}>{media ?? <ProductSlot />}</div>}
      {variant === 'split' && (
        <div className={styles.photo}>
          <PhotoSlot src={photo} alt={photoAlt} width={792} height={1080} />
        </div>
      )}
      <div className={styles.top}>
        <img
          className={styles.logo}
          src={dark ? '/assets/shared/vinta-wordmark-white.svg' : '/assets/shared/vinta-wordmark-blue.svg'}
          alt="Vinta"
        />
        {variant === 'night' && preparedFor && <p className={styles.prepared}>{preparedFor}</p>}
      </div>
      <div className={styles.body} data-variant={variant}>
        <div className={styles.text}>
          <SlideHeader
            eyebrow={eyebrow}
            title={title}
            accent={accent}
            lede={lede ?? subtitle}
            mode={mode}
            scale="display"
            align={variant === 'night' ? 'center' : 'left'}
            width={variant === 'night' ? 1500 : variant === 'split' ? 880 : 700}
          />
          {tags && tags.length > 0 && (
            <div className={styles.tags}>
              {tags.map((t) => (
                <Tag key={t} variant={dark ? 'glass' : 'white'} mode={mode}>
                  {t}
                </Tag>
              ))}
            </div>
          )}
        </div>
      </div>
    </SlideShell>
  )
}
