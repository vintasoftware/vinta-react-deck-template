import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { SlideShell } from '../SlideShell'
import { VividBackground } from '../../elements/VividBackground'
import { VividCard } from '../../elements/VividCard'
import { PhotoSlot } from '../../elements/PhotoSlot'
import { IconBadge } from '../../elements/IconBadge'
import { SlideHeader } from '../../elements/SlideHeader'
import styles from './SlideCaseHighlight.module.css'

export interface CaseNumber {
  /** split ≤ ~5 characters ("10", "3.5x") · band ≤ ~7 ("10 wks", "99.9%"). */
  value: string
  /** Uppercase, ≤ ~22 characters. */
  label: string
  /** band only: icon in the glass tile. */
  icon?: LucideIcon
}

export interface SlideCaseHighlightProps {
  /** split = full-height photo at the left, text and 2 numbers at the right on the light wash ·
   *  band = blue mesh, title and text on top, 3 glass number chips, photo band along the bottom */
  variant?: 'split' | 'band'
  /** e.g. "CASE STUDY | CITY, ST". */
  eyebrow?: string
  /** Title, line 1 (ink), usually the client: "Northwind Health:". ≤ ~26 characters.
   *  A full title with your own `<Highlight>` also works. */
  title: ReactNode
  /** Title, line 2 in the accent color (blue on split, turquoise on band): the outcome. ≤ ~30 characters. */
  accent?: ReactNode
  /** One or two sentences. split ≤ ~140 characters · band ≤ ~100. */
  lede?: ReactNode
  /** @deprecated Use `lede`. */
  text?: ReactNode
  /** split: exactly 2 · band: exactly 3 (with icons). */
  numbers: CaseNumber[]
  /** split: 840×1080 photo at the left · band: 1920×380 photo along the bottom. Leave out for the placeholder. */
  photo?: string
  photoAlt?: string
  /** split only: client logo (≈ 240×44). Default: the dashed logo placeholder. Pass `null` to hide it. */
  logo?: ReactNode
  /** Vinta wordmark. Default true. */
  wordmark?: boolean
}

/** One client case told with a photo and its key numbers, under the site's two-tone header (client / outcome).
 *  Two compositions: photo split (light wash) or photo band (blue mesh). */
export function SlideCaseHighlight({
  variant = 'split',
  eyebrow,
  title,
  accent,
  lede,
  text,
  numbers,
  photo,
  photoAlt = '',
  logo,
  wordmark = true,
}: SlideCaseHighlightProps) {
  const ledeNode = lede ?? text
  if (variant === 'band') {
    return (
      <SlideShell mode="invert-blue" safeArea={144} background={<VividBackground variant="mesh" />}>
        <div className={styles.band}>
          <PhotoSlot src={photo} alt={photoAlt} width={1920} height={380} placeholder="dark" />
          <div className={styles.bandShade} aria-hidden="true" />
        </div>
        {wordmark && <img className={styles.wordmark} src="/assets/shared/vinta-wordmark-white.svg" alt="Vinta" />}
        <div className={styles.bandBody}>
          <SlideHeader
            eyebrow={eyebrow}
            title={title}
            accent={accent}
            lede={ledeNode}
            layout={ledeNode ? 'split' : 'stacked'}
            mode="invert-blue"
          />
          <div className={styles.chips}>
            {numbers.map((n) => (
              <VividCard key={n.label} surface="glass" padding="none" radius="md" style={{ flex: 1 }}>
                <div className={styles.chip}>
                  {n.icon && <IconBadge variant="glass" shape="square" icon={n.icon} size={72} />}
                  <div className={styles.chipText}>
                    <span className={styles.chipValue}>{n.value}</span>
                    <span className={styles.chipLabel}>{n.label}</span>
                  </div>
                </div>
              </VividCard>
            ))}
          </div>
        </div>
      </SlideShell>
    )
  }

  const logoNode = logo === undefined ? <PhotoSlot alt="Client logo placeholder" width={240} height={44} radius="sm" /> : logo
  return (
    <SlideShell mode="light" safeArea={144} background={<VividBackground variant="wash" />}>
      <div className={styles.photo}>
        <PhotoSlot src={photo} alt={photoAlt} width={840} height={1080} />
      </div>
      <div className={styles.split}>
        {wordmark && <img className={styles.splitWordmark} src="/assets/shared/vinta-wordmark-blue.svg" alt="Vinta" />}
        <div className={styles.splitContent}>
          <SlideHeader eyebrow={eyebrow} title={title} accent={accent} lede={ledeNode} width={840} />
          <div className={styles.numbers}>
            {numbers.map((n, i) => (
              <VividCard key={n.label} padding="none" radius="md" style={{ flex: 1 }}>
                <div className={styles.number}>
                  <span className={styles.numberValue} data-index={i}>
                    {n.value}
                  </span>
                  <span className={styles.numberLabel}>{n.label}</span>
                </div>
              </VividCard>
            ))}
          </div>
          {logoNode}
        </div>
      </div>
    </SlideShell>
  )
}
