import styles from './Badge.module.css'

export interface BadgeProps {
  /** ex.: "Clutch" */
  label?: string
  /** ex.: "TOP WEB DEVELOPERS" */
  sublabel?: string
  /** Real seal image (e.g. Clutch). Without it, shows the placeholder. */
  src?: string
  width?: number
  height?: number
}

/** Seal/award — neutral placeholder by default, or the real image via `src`
 *  (layout.md: "render a neutral box with a slot", to swap for the real asset). */
export function Badge({ label, sublabel, src, width = 130, height = 130 }: BadgeProps) {
  if (src) {
    return <img src={src} alt={label ?? 'badge'} width={width} height={height} style={{ display: 'block', objectFit: 'contain' }} />
  }
  return (
    <div className={styles.badge} style={{ width, height }}>
      {sublabel && <span className={styles.sublabel}>{sublabel}</span>}
      {label && <span className={styles.label}>{label}</span>}
    </div>
  )
}
