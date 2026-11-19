import type { ReactNode } from 'react'
import { CircleCheck, CircleX, type LucideIcon } from 'lucide-react'
import { SlideShell } from '../SlideShell'
import { VividBackground } from '../../elements/VividBackground'
import { SlideHeader } from '../../elements/SlideHeader'
import { Eyebrow } from '../../elements/Eyebrow'
import { Body } from '../../elements/Body'
import styles from './SlideVsTable.module.css'

export interface VsRow {
  icon: LucideIcon
  /** Row label, ≤ ~18 characters (one line). */
  label: string
  /** The other approach (muted column, ✕). ≤ ~60 characters (2 lines); ≤ ~32 (1 line) with 5 rows or a 2-line lede. */
  them: string
  /** Our approach (blue column, ✓). Same limits as `them`. */
  us: string
}

export interface SlideVsTableProps {
  eyebrow?: string
  /** Title, line 1 (ink). Or a full title with your own `<Highlight>`. */
  title: ReactNode
  /** Title, line 2 in the accent color. */
  accent?: ReactNode
  /** One line under the title (≤ ~70 characters). Leave it out with 5 rows. */
  lede?: ReactNode
  /** Mono note over the row labels (top-left cell), e.g. "UNDERNEATH THE DEMO:". ≤ ~40 characters (2 lines). */
  caption?: string
  /** Header of the muted column, e.g. "Vibe-coded builds". */
  themLabel: string
  /** Header of the raised blue column, e.g. "Built with Vinta". */
  usLabel: string
  /** 3–5 rows. */
  rows: VsRow[]
}

/** Us vs them as a table: row labels (icon + label) at the left, a muted "them" column with ✕ items and a raised
 *  blue "us" column with ✓ items. Site: Fast-track "PHI is serious business". Light background. */
export function SlideVsTable({ eyebrow, title, accent, lede, caption, themLabel, usLabel, rows }: SlideVsTableProps) {
  return (
    <SlideShell mode="light" safeArea={144} background={<VividBackground variant="wash" />}>
      <div className={styles.body}>
        <SlideHeader eyebrow={eyebrow} title={title} accent={accent} lede={lede} />
        <div
          className={styles.table}
          data-rows={rows.length}
          style={{ gridTemplateRows: `auto repeat(${rows.length}, minmax(0, 1fr))` }}
        >
          <div className={styles.themPanel} aria-hidden="true" />
          <div className={styles.usPanel} aria-hidden="true" />

          <div className={styles.captionCell}>{caption && <Eyebrow size="md" tick={false}>{caption}</Eyebrow>}</div>
          <div className={styles.themHead}>
            <Body tone="secondary">{themLabel}</Body>
          </div>
          <div className={styles.usHead}>
            <Body mode="invert-blue" tone="primary">
              {usLabel}
            </Body>
          </div>

          {rows.map((row, i) => {
            const Icon = row.icon
            const gridRow = i + 2
            return (
              <div key={row.label} className={styles.row}>
                <div className={styles.labelCell} style={{ gridRow }}>
                  <span className={styles.labelIcon}>
                    <Icon size={32} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <Body tone="primary" ink="vivid">
                    {row.label}
                  </Body>
                </div>
                <div className={styles.themCell} style={{ gridRow }}>
                  <div className={styles.cellInner}>
                    <CircleX className={styles.themMark} size={32} strokeWidth={1.5} aria-label="No" />
                    <Body weight="regular">{row.them}</Body>
                  </div>
                </div>
                <div className={styles.usCell} style={{ gridRow }}>
                  <div className={styles.cellInner}>
                    <CircleCheck className={styles.usMark} size={32} strokeWidth={1.5} aria-label="Yes" />
                    <Body mode="invert-blue" weight="regular">
                      {row.us}
                    </Body>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </SlideShell>
  )
}
