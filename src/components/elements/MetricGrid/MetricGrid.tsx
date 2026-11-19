import type { ReactNode } from 'react'
import styles from './MetricGrid.module.css'

export interface MetricGridProps {
  /** Itens <MetricItem /> — layout.md: "MetricGrid 2×2" */
  children: ReactNode
}

export function MetricGrid({ children }: MetricGridProps) {
  return <div className={styles.metricGrid}>{children}</div>
}
