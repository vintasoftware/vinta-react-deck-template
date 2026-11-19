import { Fragment, type ReactNode } from 'react'
import type { AccentColor } from '../../shared/types'
import { SlideShell } from '../SlideShell'
import { MetricItem } from '../../elements/MetricItem'
import { Logo, type LogoProps } from '../../elements/Logo'
import { Badge, type BadgeProps } from '../../elements/Badge'
import styles from './SlideWhoIsVinta.module.css'

export interface SlideWhoIsVintaMetric {
  label: ReactNode
  description: ReactNode
  accent?: AccentColor
}

export interface SlideWhoIsVintaProps {
  logo?: LogoProps
  /** Each item becomes one line of the title */
  title: ReactNode[]
  /** Use <br /> to repeat the Figma line breaks */
  body: ReactNode
  /** 4 itens → grade 2×2 */
  metrics: SlideWhoIsVintaMetric[]
  badge?: BadgeProps
  logosLabel: string
  /** Up to 6 logos, at the Figma positions, in grayscale */
  logos: LogoProps[]
  /** Main product window (840×542, behind). Takes `<img>` or any
   *  node, e.g. `<ImageFrame variant="browser">` with a screenshot. Default: from Figma. */
  image?: ReactNode
  /** Second window (558×456, in front). Default: from Figma. */
  secondaryImage?: ReactNode
  /** Background exported from Figma (gradient, "trusted by" strip and bottom strip),
   *  without the product windows */
  background?: ReactNode
}

/** Position of each metrics grid item and each client logo in the
 *  Figma (427:1213, 1920×1080). */
const METRIC_POSITIONS = [
  { left: 64, top: 482 },
  { left: 502, top: 482 },
  { left: 64, top: 606 },
  { left: 502, top: 606 },
]
const LOGO_POSITIONS = [
  { left: 64, top: 950, width: 178, height: 60 },
  { left: 320, top: 962, width: 269, height: 36 },
  { left: 667, top: 950, width: 295, height: 60 },
  { left: 1040, top: 954, width: 276, height: 52 },
  { left: 1393, top: 954, width: 192, height: 52 },
  { left: 1662, top: 950, width: 194, height: 60 },
]

/** pattern = faithful copy of the "Who is Vinta" frame (427:1213). Background and product
 *  windows are separate layers (swap `image`/`secondaryImage`); text,
 *  metrics, logos and seal are live. */
export function SlideWhoIsVinta({
  logo = { name: 'Vinta', width: 192, height: 44 },
  title,
  body,
  metrics,
  badge,
  logosLabel,
  logos,
  image,
  secondaryImage,
  background,
}: SlideWhoIsVintaProps) {
  return (
    <SlideShell
      mode="light"
      safeArea={64}
      background={background ?? <img src="/assets/who-is-vinta/background-no-windows.png" alt="" />}
    >
      <div className={styles.canvas}>
        <div className={styles.imageMain}>{image ?? <img src="/assets/who-is-vinta/window-main.png" alt="" />}</div>
        <div className={styles.imageSecondary}>
          {secondaryImage ?? <img src="/assets/who-is-vinta/window-secondary.png" alt="" />}
        </div>

        <div className={styles.logo}>
          <Logo {...logo} />
        </div>

        <h1 className={styles.title}>
          {title.map((line, i) => (
            <Fragment key={i}>
              {i > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </h1>

        <p className={styles.body}>{body}</p>

        {metrics.slice(0, METRIC_POSITIONS.length).map((metric, i) => (
          <div key={i} className={styles.metric} style={METRIC_POSITIONS[i]}>
            <MetricItem
              mode="light-tint"
              accent={metric.accent ?? 'blue'}
              label={metric.label}
              description={metric.description}
            />
          </div>
        ))}

        {badge && (
          <div className={styles.badge}>
            <Badge {...badge} />
          </div>
        )}

        <p className={styles.logosLabel}>{logosLabel}</p>
        {logos.slice(0, LOGO_POSITIONS.length).map((item, i) => (
          <div key={item.name ?? i} className={styles.clientLogo} style={LOGO_POSITIONS[i]}>
            <Logo {...item} width={LOGO_POSITIONS[i].width} height={LOGO_POSITIONS[i].height} />
          </div>
        ))}
      </div>
    </SlideShell>
  )
}
