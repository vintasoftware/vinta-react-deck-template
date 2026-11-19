import type { ReactNode } from 'react'
import type { TextMode } from '../../shared/types'
import { Eyebrow } from '../Eyebrow'
import { DisplayTitle } from '../DisplayTitle'
import { Highlight } from '../Highlight'
import { Body } from '../Body'
import styles from './SlideHeader.module.css'

export interface SlideHeaderProps {
  /** Mono label above the title (no tick, as on the site). */
  eyebrow?: string
  /** Title, line 1 (ink). Or a full title with your own `<Highlight>` and `<br />`. */
  title: ReactNode
  /** Title, line 2 in the accent color (blue on light, turquoise on dark). The site's two-tone title. */
  accent?: ReactNode
  /** One or two sentences under (stacked) or beside (split) the title. */
  lede?: ReactNode
  /** stacked = eyebrow, title, lede in one column · split = title at the left, lede at the right */
  layout?: 'stacked' | 'split'
  align?: 'left' | 'center'
  mode?: TextMode
  /** h1 = 60 (content slides) · display = 120 (statements, covers) · cover = 150 (night cover) */
  scale?: 'h1' | 'display' | 'cover'
  /** Max width of the title/lede column in px (stacked). Default 1200. */
  width?: number
}

/** The header of every site-look slide: eyebrow, two-tone title and lede. One place for the rules of the site's section headers. */
export function SlideHeader({
  eyebrow,
  title,
  accent,
  lede,
  layout = 'stacked',
  align = 'left',
  mode = 'light',
  scale = 'h1',
  width = 1200,
}: SlideHeaderProps) {
  const heading = (
    <div className={styles.heading}>
      {eyebrow && (
        <Eyebrow size="md" mode={mode} tick={false}>
          {eyebrow}
        </Eyebrow>
      )}
      <DisplayTitle mode={mode} ink="vivid" scale={scale}>
        {title}
        {accent && (
          <>
            <br />
            <Highlight mode={mode}>{accent}</Highlight>
          </>
        )}
      </DisplayTitle>
    </div>
  )
  const ledeNode = lede && (
    <div className={styles.lede}>
      <Body mode={mode} weight="regular">
        {lede}
      </Body>
    </div>
  )
  return (
    <header
      className={styles.header}
      data-layout={layout}
      data-align={align}
      style={layout === 'stacked' ? { maxWidth: width } : undefined}
    >
      {heading}
      {ledeNode}
    </header>
  )
}
