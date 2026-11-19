import type { ReactNode } from 'react'
import { SlideShell } from '../SlideShell'
import { VividBackground } from '../../elements/VividBackground'
import { SlideHeader } from '../../elements/SlideHeader'
import { VividCard } from '../../elements/VividCard'
import { Tag } from '../../elements/Tag'
import styles from './SlideStatTable.module.css'

export type StatTableChipTone = 'blue' | 'navy' | 'pale' | 'muted' | 'ink'

/** A table cell: text, or a solid chip ({ chip: 'H1', tone: 'blue' }). */
export type StatTableCell = ReactNode | { chip: string; tone?: StatTableChipTone }

export interface StatTableColumn {
  /** Mono header, ≤ ~16 characters. */
  header: string
  align?: 'left' | 'right'
}

export interface SlideStatTableProps {
  eyebrow?: string
  /** Title, line 1. ≤ ~34 characters. */
  title: ReactNode
  /** Title, line 2 in blue. */
  accent?: ReactNode
  /** Mono status chip at the top right ("REFERENCE · TO REFINE"). */
  badge?: string
  /** The headline number (≤ 7 characters) and its caption (≤ ~70 characters; wrap a phrase in `<b>` for blue). */
  hero: { value: string; caption: ReactNode }
  /** Up to 2 secondary numbers with a caption each. */
  stats?: { value: string; caption: ReactNode }[]
  /** 2–4 columns × ≤ 5 rows, plus an optional total row. */
  table: { columns: StatTableColumn[]; rows: StatTableCell[][]; total?: StatTableCell[] }
  /** 64px grid over the wash (the "planning deck" look). */
  grid?: boolean
}

function isChip(cell: StatTableCell): cell is { chip: string; tone?: StatTableChipTone } {
  return typeof cell === 'object' && cell !== null && 'chip' in cell
}

/** A headline number with secondary numbers at the left, and the breakdown as a table in a white card at the
 *  right. Targets, revenue by line, budgets. From the Expansion planning deck. Wash background. */
export function SlideStatTable({ eyebrow, title, accent, badge, hero, stats, table, grid = false }: SlideStatTableProps) {
  const renderCell = (cell: StatTableCell) =>
    isChip(cell) ? (
      <span className={styles.chip} data-tone={cell.tone ?? 'blue'}>
        {cell.chip}
      </span>
    ) : (
      cell
    )
  return (
    <SlideShell mode="light" safeArea={144} background={<VividBackground variant="wash" grid={grid} />}>
      <div className={styles.body}>
        <SlideHeader eyebrow={eyebrow} title={title} accent={accent} width={1200} />
        {badge && (
          <div className={styles.badge}>
            <Tag variant="filled" accent="blue">
              {badge}
            </Tag>
          </div>
        )}
        <div className={styles.content}>
          <div className={styles.hero}>
            <div className={styles.heroText}>
              <p className={styles.heroValue}>{hero.value}</p>
              <p className={styles.caption}>{hero.caption}</p>
            </div>
            {stats && stats.length > 0 && (
              <div className={styles.stats}>
                {stats.slice(0, 2).map((s) => (
                  <div key={s.value} className={styles.stat}>
                    <p className={styles.statValue}>{s.value}</p>
                    <p className={styles.caption}>{s.caption}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <VividCard padding="lg" radius="lg">
            <table className={styles.table}>
              <thead>
                <tr>
                  {table.columns.map((c) => (
                    <th key={c.header} className={styles.th} data-align={c.align ?? 'left'} scope="col">
                      {c.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, r) => (
                  <tr key={r}>
                    {row.map((cell, c) => (
                      <td key={c} className={styles.td} data-align={table.columns[c]?.align ?? 'left'}>
                        {renderCell(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
                {table.total && (
                  <tr className={styles.total}>
                    {table.total.map((cell, c) => (
                      <td key={c} className={styles.td} data-align={table.columns[c]?.align ?? 'left'}>
                        {renderCell(cell)}
                      </td>
                    ))}
                  </tr>
                )}
              </tbody>
            </table>
          </VividCard>
        </div>
      </div>
    </SlideShell>
  )
}
