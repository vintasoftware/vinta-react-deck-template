import styles from './Logo.module.css'

export interface LogoProps {
  /** Name shown in the placeholder (useful to tell logos apart in stories/screens
   *  before the real SVG arrives). */
  name?: string
  /** URL/import of a real SVG. When absent, shows the placeholder box. */
  src?: string
  width?: number
  height?: number
}

/** PLACEHOLDER — neutral box with an SVG slot, swappable later (layout.md). */
export function Logo({ name, src, width = 120, height = 32 }: LogoProps) {
  return (
    <div className={styles.logo} data-image={src ? 'true' : undefined} style={{ width, height }}>
      {src ? (
        <img className={styles.image} src={src} alt={name ?? 'logo'} />
      ) : (
        name && <span className={styles.label}>{name}</span>
      )}
    </div>
  )
}
