import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { SlideShell } from '../SlideShell'
import { VividBackground } from '../../elements/VividBackground'
import { ConcentricRings } from '../../elements/ConcentricRings'
import { SlideHeader } from '../../elements/SlideHeader'
import { Tag } from '../../elements/Tag'
import styles from './SlideStatement.module.css'

export interface StatementPill {
  icon: LucideIcon
  label: string
}

export interface SlideStatementProps {
  /** mesh = blue mesh with rings at the right, text column at the left (cover, section opener) ·
   *  night = navy, wide text column (transition, key claim) · `blue-art` is deprecated and renders as `night`. */
  background?: 'mesh' | 'night' | 'blue-art'
  /** Mono label above the title. */
  eyebrow?: string
  /** The claim, line 1 (white). A full title with your own `<br />` and `<Highlight>` also works.
   *  mesh ≤ ~45 characters in total (title + accent), night ≤ ~60. */
  title: ReactNode
  /** The claim, line 2 in turquoise (the site's two-tone title). */
  accent?: ReactNode
  /** One sentence under the title, ≤ ~90 characters. */
  lede?: ReactNode
  /** @deprecated Use `lede`. */
  text?: ReactNode
  /** 2–3 short glass pills with an icon, e.g. "AI-ACCELERATED". */
  pills?: StatementPill[]
  /** Vinta wordmark at the top left. Default true. */
  logo?: boolean
}

/** Big statement on a dark background: deck cover, section opener or the one claim to remember. */
export function SlideStatement({ background = 'mesh', eyebrow, title, accent, lede, text, pills, logo = true }: SlideStatementProps) {
  const isMesh = background === 'mesh'
  const mode = isMesh ? 'invert-blue' : 'invert-navy'
  return (
    <SlideShell
      mode={mode}
      safeArea="hero"
      background={
        isMesh ? (
          <>
            <VividBackground variant="mesh" />
            <ConcentricRings cx={1500} cy={540} sizes={[800, 600, 400, 200]} glow={960} />
          </>
        ) : (
          <VividBackground variant="night" />
        )
      }
    >
      {logo && <img className={styles.logo} src="/assets/shared/vinta-wordmark-white.svg" alt="Vinta" />}
      <div className={styles.body} data-background={isMesh ? 'mesh' : 'night'}>
        <SlideHeader
          eyebrow={eyebrow}
          title={title}
          accent={accent}
          lede={lede ?? text}
          mode={mode}
          scale="display"
          width={isMesh ? 880 : 1500}
        />
        {pills && pills.length > 0 && (
          <div className={styles.pills}>
            {pills.map((p) => (
              <Tag key={p.label} variant="glass" mode={mode} icon={p.icon}>
                {p.label}
              </Tag>
            ))}
          </div>
        )}
      </div>
    </SlideShell>
  )
}
