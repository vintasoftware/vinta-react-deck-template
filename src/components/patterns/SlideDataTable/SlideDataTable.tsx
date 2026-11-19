import type { CSSProperties, ReactNode } from 'react'
import { SlideShell } from '../SlideShell'
import { VividBackground } from '../../elements/VividBackground'
import { SlideHeader } from '../../elements/SlideHeader'
import styles from './SlideDataTable.module.css'

/** How a cell is drawn.
 *  strong = 34 Medium (row name) · text = 34 Regular · muted = slate, smaller (zeros, n/a)
 *  · tag = soft mono pill · tag-solid = solid blue mono pill · badge = solid indigo box (a count that matters). */
export type DataTableCellStyle = 'strong' | 'text' | 'muted' | 'tag' | 'tag-solid' | 'badge'

export interface DataTableColumnSpec {
  /** Mono header, uppercase (e.g. "NEW DEALS"). */
  header: string
  /** Relative width (grid `fr`). Default 1. */
  width?: number
  /** Default style for this column's cells. First column defaults to "strong", the others to "text". */
  style?: DataTableCellStyle
}

/** A plain value uses the column style; pass `{ value, style }` to override one cell
 *  (e.g. "Hosted" as `tag-solid` in a column of soft tags, or a "0" as `muted` in a badge column). */
export type DataTableCellValue = string | number | { value: string | number; style: DataTableCellStyle }

export interface SlideDataTableProps {
  /** Mono label above the title (e.g. "EVENTS"). */
  eyebrow?: string
  /** Title, line 1 (ink). A title that already wraps words in `<Highlight>` still works. */
  title: ReactNode
  /** Title, line 2 in the accent color (blue on light, turquoise on dark): the site's two-tone title. */
  accent?: ReactNode
  /** One or two sentences under the title. */
  lede?: ReactNode
  /** 3 to 7 columns. */
  columns: DataTableColumnSpec[]
  /** Up to 5 rows (6 fit: rows shrink to the space left under the header). Each row is a white card; cells follow `columns`. */
  rows: DataTableCellValue[][]
}

function resolveCell(cell: DataTableCellValue, fallback: DataTableCellStyle) {
  return typeof cell === 'object' ? cell : { value: cell, style: fallback }
}

/** Table where each row is a white card, on the light vivid background. Mono column headers,
 *  cells as text, soft/solid tags or an indigo count badge. */
export function SlideDataTable({ eyebrow, title, accent, lede, columns, rows }: SlideDataTableProps) {
  const gridStyle = { gridTemplateColumns: columns.map((c) => `${c.width ?? 1}fr`).join(' ') } as CSSProperties
  return (
    <SlideShell mode="light" safeArea={144} background={<VividBackground variant="wash" />}>
      <div className={styles.body}>
        <SlideHeader eyebrow={eyebrow} title={title} accent={accent} lede={lede} mode="light" />
        <div className={styles.table} role="table">
          <div className={styles.headRow} style={gridStyle} role="row">
            {columns.map((col, i) => (
              <span key={i} className={styles.headCell} role="columnheader">
                {col.header}
              </span>
            ))}
          </div>
          {rows.map((row, r) => (
            <div key={r} className={styles.row} style={gridStyle} role="row">
              {columns.map((col, c) => {
                const { value, style } = resolveCell(row[c] ?? '', col.style ?? (c === 0 ? 'strong' : 'text'))
                return (
                  <div key={c} className={styles.cell} role="cell">
                    <span className={styles.value} data-style={style}>
                      {value}
                    </span>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  )
}
