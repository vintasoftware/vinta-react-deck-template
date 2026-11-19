import { Fragment, type ReactNode } from 'react'
import type { AccentColor } from '../../shared/types'
import { SlideShell } from '../SlideShell'
import { Eyebrow } from '../../elements/Eyebrow'
import { DisplayTitle } from '../../elements/DisplayTitle'
import { Subtitle, SubtitleAccent } from '../../elements/Subtitle'
import { Tag } from '../../elements/Tag'
import { TagGroup } from '../../elements/TagGroup'
import { ImageFrame } from '../../elements/ImageFrame'
import styles from './SlideIntro.module.css'

export interface SlideIntroProps {
  eyebrow: string
  eyebrowAccent?: AccentColor
  /** Each item becomes one line of the DisplayTitle */
  title: ReactNode[]
  /** Subtitle text before the keyword */
  subtitle: ReactNode
  /** Keyword in the accent + underline, at the end of the subtitle */
  highlight: ReactNode
  highlightAccent?: AccentColor
  tags?: string[]
  /** Image slot. With `imageFrame` (default) it goes inside the ImageFrame — placeholder if
   *  omitted. With `imageFrame={false}` it fills 892×485 at x949 y343, no frame, and the
   *  default is the Figma UI card. */
  image?: ReactNode
  /** Background exported from Figma (gradient, circles, dots), without the UI card */
  background?: ReactNode
  /** false hides the image slot entirely */
  showImage?: boolean
  /** true (default): image inside the ImageFrame, in the layout flow.
   *  false: Figma art, positioned exactly as in frame 427:1289. */
  imageFrame?: boolean
}

/** pattern = composition, not a monolithic component (layout.md — "Intro to
 *  project"). It only arranges existing elements on the SlideShell. */
export function SlideIntro({
  eyebrow,
  eyebrowAccent = 'orange',
  title,
  subtitle,
  highlight,
  highlightAccent = 'orange',
  tags = [],
  image,
  background,
  showImage = true,
  imageFrame = true,
}: SlideIntroProps) {
  return (
    <SlideShell mode="invert-blue" safeArea={118} background={background}>
      <div className={styles.layout}>
        <div className={styles.column}>
          <Eyebrow mode="invert-blue" accent={eyebrowAccent}>
            {eyebrow}
          </Eyebrow>

          <DisplayTitle mode="invert-blue" scale="cover">
            {title.map((line, i) => (
              <Fragment key={i}>
                {i > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </DisplayTitle>

          <Subtitle mode="invert-blue">
            {subtitle}{' '}
            <SubtitleAccent mode="invert-blue" accent={highlightAccent}>
              {highlight}
            </SubtitleAccent>
          </Subtitle>

          {tags.length > 0 && (
            <TagGroup>
              {tags.map((tag) => (
                <Tag key={tag} variant="outline" mode="invert-blue">
                  {tag}
                </Tag>
              ))}
            </TagGroup>
          )}
        </div>

        {showImage && imageFrame && (
          <div className={styles.imageSlot}>
            <ImageFrame variant="card" width={892} height={485}>
              {image}
            </ImageFrame>
          </div>
        )}
      </div>

      {showImage && !imageFrame && (
        <div className={styles.artSlot}>{image ?? <img src="/assets/intro/image.png" alt="" />}</div>
      )}
    </SlideShell>
  )
}
