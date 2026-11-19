import styles from './VividBackground.module.css'

/** wash = clean ice-blue light background · mesh = blue mesh (homepage blue sections) · night = deep navy ·
 *  green / purple = the color-variation panels (SlideGlassRows only) */
export type VividVariant = 'wash' | 'mesh' | 'night' | 'green' | 'purple'

export interface VividBackgroundProps {
  variant?: VividVariant
  /** Gradient strip along the bottom edge (blue → sky → aqua). Off by default: the site has none. */
  strip?: boolean
  /** 64px grid. Default: on for mesh/night, off for wash (as on the site). */
  grid?: boolean
  /** horizon = luminous arc glow along the bottom (night cover). */
  glow?: 'none' | 'horizon'
}

/** Full-bleed 1920×1080 background of the "vivid" slides (case library, data slides):
 *  gradient base, soft glows, a 64px grid and the bottom gradient strip.
 *  Use it as `SlideShell`'s `background`. */
export function VividBackground({ variant = 'wash', strip = false, glow = 'none', grid }: VividBackgroundProps) {
  const showGrid = grid ?? (variant === 'mesh' || variant === 'night')
  return (
    <div className={styles.root} data-variant={variant} aria-hidden="true">
      <div className={styles.base} />
      {showGrid && <div className={styles.grid} />}
      {glow === 'horizon' && <div className={styles.horizon} />}
      {strip && <div className={styles.strip} />}
    </div>
  )
}
