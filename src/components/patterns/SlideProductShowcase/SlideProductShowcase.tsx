import type { ReactNode } from 'react'
import { SlideShell } from '../SlideShell'
import { VividBackground } from '../../elements/VividBackground'
import { ProductSlot } from '../../elements/BlockPreviews'
import { SlideHeader } from '../../elements/SlideHeader'
import styles from './SlideProductShowcase.module.css'

export interface SlideProductShowcaseProps {
  eyebrow?: string
  /** Title, line 1 (white), ≤ ~22 characters per line. A full title with your own `<Highlight mode="invert-blue">` also works. */
  title: ReactNode
  /** Title, line 2 in turquoise (the site's two-tone title), ≤ ~44 characters (2 lines). */
  accent?: ReactNode
  /** One or two sentences under the title, ≤ ~100 characters. */
  lede?: ReactNode
  /** @deprecated Use `lede`. */
  text?: ReactNode
  /** Anything for the 1000×844 UI slot at the right (screenshot, `<ImageFrame>`, another `BlockPreviews` mock).
   *  Default: the live Provider Experience block. */
  media?: ReactNode
  /** Vinta wordmark at the top left. Default true. */
  logo?: boolean
}

/** A product or building block on the blue mesh: message at the left, the UI at the right. */
export function SlideProductShowcase({ eyebrow, title, accent, lede, text, media, logo = true }: SlideProductShowcaseProps) {
  return (
    <SlideShell mode="invert-blue" safeArea={144} background={<VividBackground variant="mesh" />}>
      <div className={styles.ui}>{media ?? <ProductSlot />}</div>
      {logo && <img className={styles.logo} src="/assets/shared/vinta-wordmark-white.svg" alt="Vinta" />}
      <div className={styles.body}>
        <div className={styles.text}>
          <SlideHeader eyebrow={eyebrow} title={title} accent={accent} lede={lede ?? text} mode="invert-blue" width={700} />
        </div>
      </div>
    </SlideShell>
  )
}
