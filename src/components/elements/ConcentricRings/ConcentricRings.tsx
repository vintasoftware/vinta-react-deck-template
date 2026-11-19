import styles from './ConcentricRings.module.css'

export interface ConcentricRingsProps {
  /** Center of the rings, in slide px. */
  cx: number
  cy: number
  /** Ring diameters in px, e.g. [800, 600, 400, 200]. */
  sizes: number[]
  /** Diameter of the turquoise glow behind the rings. 0 = no glow. */
  glow?: number
  /** white = white lines · mixed = the outer ring in turquoise (around a portrait) */
  tone?: 'white' | 'mixed'
}

/** Decorative concentric rings with a turquoise glow, pinned on a mesh background
 *  (statement slide, portrait quote). Decoration only: keep text ≥ 48px away. */
export function ConcentricRings({ cx, cy, sizes, glow = 0, tone = 'white' }: ConcentricRingsProps) {
  const largest = Math.max(...sizes)
  return (
    <div className={styles.root} aria-hidden="true">
      {glow > 0 && (
        <div className={styles.glow} style={{ left: cx - glow / 2, top: cy - glow / 2, width: glow, height: glow }} />
      )}
      {sizes.map((d) => (
        <div
          key={d}
          className={styles.ring}
          data-accent={tone === 'mixed' && d === largest ? 'turquoise' : 'white'}
          style={{ left: cx - d / 2, top: cy - d / 2, width: d, height: d }}
        />
      ))}
    </div>
  )
}
