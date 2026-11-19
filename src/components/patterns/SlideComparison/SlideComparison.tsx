import type { CSSProperties, ReactNode } from 'react'
import { Check, Minus } from 'lucide-react'
import { resolveTone, titleLines, type SlideTone } from '../../shared/slideTone'
import { SlideShell } from '../SlideShell'
import { SlideHeader } from '../../elements/SlideHeader'
import { Body } from '../../elements/Body'
import type { DataTableProps } from '../../elements/DataTable'
import { VividCard } from '../../elements/VividCard'
import { IconBadge } from '../../elements/IconBadge'
import styles from './SlideComparison.module.css'

export interface SlideComparisonProps {
  /** light / tint = wash · invert-blue = mesh · invert-navy = night · vivid = wash */
  tone?: SlideTone
  eyebrow?: string
  /** Title, line 1. Also accepts the old array of lines or a node with your own `<Highlight>`. */
  title: ReactNode | ReactNode[]
  /** Title, line 2 in the accent color (blue on light, turquoise on dark). */
  accent?: ReactNode
  /** One sentence under the title (keep it out with 6 rows). */
  lede?: ReactNode
  /** Up to 4 columns × 6 rows. `true` = check, `false` = dash; the `highlight` column gets the gradient header. */
  table: Omit<DataTableProps, 'mode'>
  /** Footnote in small text under the table. */
  note?: ReactNode
}

/** Plans / options in the site look: header on top, the table inside a card (white on light, glass on dark),
 *  the highlighted column with a gradient header and a soft fill, checks in teal circles. */
export function SlideComparison({ tone = 'light', eyebrow, title, accent, lede, table, note }: SlideComparisonProps) {
  const t = resolveTone(tone)
  const { columns, rows, labelHeader } = table
  const grid = { gridTemplateColumns: `minmax(0, 1fr) repeat(${columns.length}, 320px)` } as CSSProperties
  const renderCell = (value: ReactNode | boolean) => {
    if (value === true) return <IconBadge variant={t.dark ? 'glass' : 'pale'} accent="cyan" shape="circle" icon={Check} size={48} />
    if (value === false) return <Minus className={styles.no} size={32} strokeWidth={1.5} aria-label="Not included" />
    return value
  }
  return (
    <SlideShell mode={t.shellMode} safeArea={144} background={t.background}>
      <div className={styles.body} data-dark={t.dark || undefined} data-dense={rows.length > 4 || undefined}>
        <SlideHeader eyebrow={eyebrow} title={titleLines(title)} accent={accent} lede={lede} mode={t.textMode} width={1400} />
        <VividCard surface={t.dark ? 'glass' : 'white'} padding="none" style={{ gap: 0, overflow: 'hidden' }}>
          <div className={styles.table} role="table">
            <div className={styles.headRow} style={grid} role="row">
              <span className={styles.headLabel} role="columnheader">
                {labelHeader}
              </span>
              {columns.map((col, c) => (
                <span key={c} className={styles.head} data-highlight={col.highlight || undefined} role="columnheader">
                  {col.title}
                </span>
              ))}
            </div>
            {rows.map((row, r) => (
              <div key={r} className={styles.row} style={grid} data-last={r === rows.length - 1 || undefined} role="row">
                <span className={styles.label} role="rowheader">
                  {row.label}
                </span>
                {row.cells.map((cell, c) => (
                  <span key={c} className={styles.cell} data-highlight={columns[c]?.highlight || undefined} role="cell">
                    {renderCell(cell)}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </VividCard>
        {note && (
          <Body size="body" weight="regular" mode={t.textMode}>
            {note}
          </Body>
        )}
      </div>
    </SlideShell>
  )
}
