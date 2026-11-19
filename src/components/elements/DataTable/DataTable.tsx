import type { ReactNode } from 'react'
import { Check, Minus } from 'lucide-react'
import type { TextMode } from '../../shared/types'
import styles from './DataTable.module.css'

export interface DataTableColumn {
  title: ReactNode
  /** Highlights the column (e.g. the recommended plan) */
  highlight?: boolean
}

export interface DataTableRow {
  label: ReactNode
  /** true = check (status-success) · false = dash · any other value is shown as is */
  cells: (ReactNode | boolean)[]
}

export interface DataTableProps {
  /** Header of the label column (the first). Can be empty. */
  labelHeader?: ReactNode
  columns: DataTableColumn[]
  rows: DataTableRow[]
  mode?: TextMode
}

function renderCell(value: ReactNode | boolean) {
  if (value === true) return <Check className={styles.yes} size={32} strokeWidth={1.5} aria-label="Included" />
  if (value === false) return <Minus className={styles.no} size={32} strokeWidth={1.5} aria-label="Not included" />
  return value
}

/** Comparison table. Mono header, rows separated by dividers,
 *  one column can be highlighted. Recommended: up to 4 columns × 6 rows.
 *  Automatic density: up to 4 rows = comfortable (padding 40), more than that = compact (24),
 *  to fit the slide height together with a 2-line title. */
export function DataTable({ labelHeader, columns, rows, mode = 'light' }: DataTableProps) {
  return (
    <table className={styles.table} data-mode={mode} data-density={rows.length > 4 ? 'compact' : 'comfortable'}>
      <thead>
        <tr>
          <th className={styles.labelHead} scope="col">
            {labelHeader}
          </th>
          {columns.map((col, i) => (
            <th key={i} className={styles.head} data-highlight={col.highlight ? 'true' : undefined} scope="col">
              {col.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, r) => (
          <tr key={r}>
            <th className={styles.rowLabel} scope="row">
              {row.label}
            </th>
            {row.cells.map((cell, c) => (
              <td key={c} className={styles.cell} data-highlight={columns[c]?.highlight ? 'true' : undefined} data-last={r === rows.length - 1 ? 'true' : undefined}>
                {renderCell(cell)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
