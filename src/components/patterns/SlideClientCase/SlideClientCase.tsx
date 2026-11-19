import { Fragment, type ReactNode } from 'react'
import { SlideShell } from '../SlideShell'
import { Kicker } from '../../elements/Kicker'
import { TextLink } from '../../elements/TextLink'
import { Logo, type LogoProps } from '../../elements/Logo'
import styles from './SlideClientCase.module.css'

export interface SlideClientCaseProps {
  /** ex.: "CASE STUDY | SAN FRANCISCO, CA" */
  eyebrow: string
  /** Each item becomes one line of the title */
  title: ReactNode[]
  body: ReactNode
  linkLabel: string
  logo?: LogoProps
  /** Hero photo (1920×430 band, y636→1066). Takes `<img>` or any node;
   *  fills the whole band (object-fit: cover). Default: the Figma photo. */
  photo?: ReactNode
  /** Blue tint + gradient over the photo (PNG with alpha exported from Figma,
   *  applied to any photo). `false` turns it off. */
  photoOverlay?: ReactNode | false
  /** Background (light gradient + bottom strip), without the photo. Default: from Figma. */
  background?: ReactNode
}

/** pattern = faithful copy of the "Client case | With Photo" frame (427:1452,
 *  1920×1080). Background, hero photo and tint are separate layers: swap only the
 *  `photo` (or the `logo`) without redoing the background. */
export function SlideClientCase({ eyebrow, title, body, linkLabel, logo, photo, photoOverlay, background }: SlideClientCaseProps) {
  return (
    <SlideShell
      mode="light"
      safeArea={64}
      background={background ?? <img src="/assets/client-case/background-clean.png" alt="" />}
    >
      <div className={styles.canvas}>
        <div className={styles.photo}>{photo ?? <img src="/assets/client-case/hero-photo.png" alt="" />}</div>
        {photoOverlay !== false && (
          <div className={styles.overlay} aria-hidden="true">
            {photoOverlay ?? <img src="/assets/client-case/hero-overlay.png" alt="" />}
          </div>
        )}
        <div className={styles.eyebrow}>
          <Kicker>{eyebrow}</Kicker>
        </div>

        <h1 className={styles.title}>
          {title.map((line, i) => (
            <Fragment key={i}>
              {i > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </h1>

        <p className={styles.text}>{body}</p>

        {logo && (
          <div className={styles.logo}>
            <Logo {...logo} />
          </div>
        )}
        <div className={styles.link}>
          <TextLink mode="light" accent="blue" size="lg">
            {linkLabel}
          </TextLink>
        </div>
      </div>
    </SlideShell>
  )
}
