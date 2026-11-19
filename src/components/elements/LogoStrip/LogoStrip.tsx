import type { TextMode } from '../../shared/types'
import { Logo, type LogoProps } from '../Logo'
import styles from './LogoStrip.module.css'

export interface LogoStripProps {
  /** ex.: "TRUSTED BY LEADING ORGANIZATIONS" */
  label: string
  logos: LogoProps[]
  mode?: TextMode
}

/** eyebrow + row of N logos — PLACEHOLDER (layout.md, "trusted by" strip
 *  of Who is Vinta, bg var(--surface-footer)). */
export function LogoStrip({ label, logos, mode = 'light-tint' }: LogoStripProps) {
  return (
    <div className={styles.strip}>
      <p className={styles.label} data-mode={mode}>
        {label}
      </p>
      <div className={styles.logos}>
        {logos.map((logo, i) => (
          <Logo key={logo.name ?? i} {...logo} />
        ))}
      </div>
    </div>
  )
}
