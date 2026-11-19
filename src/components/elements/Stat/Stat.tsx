import styles from './Stat.module.css'

export type StatMode = 'light' | 'invert-blue' | 'invert-navy'

export interface StatProps {
  /** Main number/value, e.g. "42%", "3.5x" */
  value: string
  /** Descriptive label below the underline */
  label: string
  /** Semantic mode of the slide the Stat lives on — never pick color by raw hex */
  mode?: StatMode
}

export function Stat({ value, label, mode = 'light' }: StatProps) {
  return (
    <div className={styles.stat} data-mode={mode}>
      <span className={styles.value}>{value}</span>
      <span className={styles.underline} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
    </div>
  )
}
