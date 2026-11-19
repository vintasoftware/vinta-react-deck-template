import type { ReactNode } from 'react'
import { Check, Flag, Timer, type LucideIcon } from 'lucide-react'
import { SlideShell } from '../SlideShell'
import { VividBackground } from '../../elements/VividBackground'
import { SlideHeader } from '../../elements/SlideHeader'
import { VividCard } from '../../elements/VividCard'
import { IconBadge } from '../../elements/IconBadge'
import { DisplayTitle } from '../../elements/DisplayTitle'
import { Body } from '../../elements/Body'
import { Tag } from '../../elements/Tag'
import styles from './SlideStepFocus.module.css'

export interface StepYourPart {
  /** What the client does in this step, ≤ ~80 characters. */
  text: string
  /** Short mono note under the text, e.g. "≈5 h of your time". */
  note?: string
  /** Lucide icon. Default: Timer. */
  icon?: LucideIcon
}

export interface StepWorkflowRow {
  /** Workflow name, e.g. "Intake". */
  label: string
  /** Status pill, e.g. "Current EHR" / "New platform", ≤ ~14 characters. */
  status: string
  /** Moved / finished: filled check and a highlighted pill. */
  done?: boolean
}

export interface FocusStep {
  /** Step name in the stepper (≤ ~16 characters) or in the stage tab (≤ ~20). */
  label: string
  /** `focus`: duration pill above the title, e.g. "DAYS 1–2". */
  duration?: string
  /** Title of the detailed step, ≤ ~30 characters (one line). */
  title: string
  /** One or two sentences: ≤ ~110 characters (focus), ≤ ~160 (stages). */
  text: string
  /** `focus`: the "your part" callout at the right of the detail. */
  yourPart?: StepYourPart
  /** `stages`: milestone line under the text, e.g. "Your exit plan is mapped." */
  milestone?: string
  /** `stages`: 2–4 workflow rows with a status pill at the right of the panel. */
  rows?: StepWorkflowRow[]
}

export interface StepDeliverable {
  icon: LucideIcon
  /** ≤ ~22 characters (2 lines). */
  label: string
}

export interface SlideStepFocusProps {
  eyebrow?: string
  /** Title, line 1 (ink). Or a full title with your own `<Highlight>`. */
  title: ReactNode
  /** Title, line 2 in the accent color. */
  accent?: ReactNode
  /** One or two sentences. With a lede the header switches to split (title left, lede right) to keep the height
   *  for the step. */
  lede?: ReactNode
  /** 3–5 steps (`stages`: 3–4). The same array on every slide of the sequence; only `active` changes. */
  steps: FocusStep[]
  /** Index of the detailed step, 0-based (0 = first). One slide per phase: repeat the slide with active 0, 1, 2… */
  active?: number
  /** focus = numbered stepper + duration, title, text and "your part" (MVP Fast-track sprint) ·
   *  stages = stage tabs + a panel with the text, a milestone and workflow rows with a status (EHR migration). */
  variant?: 'focus' | 'stages'
  /** `focus`: bar at the bottom with what the client gets at the end (the same on every step). 3–4 items. */
  deliverables?: { title: string; items: StepDeliverable[] }
  /** Mono label of the "your part" callout. */
  yourPartLabel?: string
  /** Mono label before the milestone (`stages`). */
  milestoneLabel?: string
  /** wash = light (default) · mesh = blue, as on the site. */
  background?: 'wash' | 'mesh'
}

const pad = (n: number) => String(n + 1).padStart(2, '0')

/** One step of a process in focus: a stepper of 3–5 steps with ONE active step detailed below. Made for "one slide
 *  per phase" (same `steps`, different `active`). Variant `stages` = stage tabs + workflow rows (EHR migration). */
export function SlideStepFocus({
  eyebrow,
  title,
  accent,
  lede,
  steps,
  active = 0,
  variant = 'focus',
  deliverables,
  yourPartLabel = 'YOUR PART',
  milestoneLabel = 'MILESTONE',
  background = 'wash',
}: SlideStepFocusProps) {
  const mode = background === 'mesh' ? 'invert-blue' : 'light'
  const dark = mode !== 'light'
  const current = Math.min(Math.max(active, 0), steps.length - 1)
  const step = steps[current]
  const PartIcon = step.yourPart?.icon ?? Timer

  return (
    <SlideShell mode={mode} safeArea={144} background={<VividBackground variant={background} />}>
      <div className={styles.body} data-mode={mode} data-variant={variant}>
        <SlideHeader eyebrow={eyebrow} title={title} accent={accent} lede={lede} mode={mode} layout={lede ? 'split' : 'stacked'} />

        {variant === 'focus' ? (
          <>
            <ol className={styles.stepper} style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
              {steps.map((s, i) => (
                <li
                  key={s.label}
                  className={styles.stepperItem}
                  data-state={i < current ? 'past' : i === current ? 'active' : 'next'}
                  aria-current={i === current ? 'step' : undefined}
                >
                  <span className={styles.dot} aria-hidden="true" />
                  <span className={styles.stepperLabel}>
                    <span className={styles.stepperNum}>{pad(i)}</span>
                    {s.label}
                  </span>
                </li>
              ))}
            </ol>

            <div className={styles.detail}>
              <div className={styles.detailText}>
                {step.duration && (
                  <Tag variant={dark ? 'glass' : 'outline'} mode={mode}>
                    {step.duration}
                  </Tag>
                )}
                <DisplayTitle mode={mode} ink="vivid" scale="h2">
                  {step.title}
                </DisplayTitle>
                <Body mode={mode} weight="regular">
                  {step.text}
                </Body>
              </div>
              {step.yourPart && (
                <VividCard surface={dark ? 'glass' : 'white'} padding="lg" radius="lg" style={{ flex: '0 0 640px' }}>
                  <div className={styles.part}>
                    <span className={styles.partIcon}>
                      <PartIcon size={40} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <div className={styles.partText}>
                      <p className={styles.mono}>{yourPartLabel}</p>
                      <Body mode={mode} tone="primary" ink="vivid" weight="regular">
                        {step.yourPart.text}
                      </Body>
                      {step.yourPart.note && <p className={styles.mono}>{step.yourPart.note}</p>}
                    </div>
                  </div>
                </VividCard>
              )}
            </div>

            {deliverables && (
              <VividCard surface={dark ? 'glass' : 'white'} padding="lg" radius="lg" style={{ flexDirection: 'row', alignItems: 'center', gap: 40 }}>
                <div className={styles.deliverablesTitle}>
                  <Body mode={mode} tone="primary" ink="vivid">
                    {deliverables.title}
                  </Body>
                </div>
                <ul className={styles.deliverables}>
                  {deliverables.items.map((d) => (
                    <li key={d.label} className={styles.deliverable}>
                      <IconBadge variant={dark ? 'glass' : 'white'} shape="square" icon={d.icon} size={64} />
                      <Body mode={mode} tone="primary" ink="vivid" weight="regular">
                        {d.label}
                      </Body>
                    </li>
                  ))}
                </ul>
              </VividCard>
            )}
          </>
        ) : (
          <>
            <ol className={styles.tabs}>
              {steps.map((s, i) => (
                <li key={s.label} className={styles.tab} data-active={i === current ? 'true' : undefined} aria-current={i === current ? 'step' : undefined}>
                  <span className={styles.tabNum}>{i + 1}</span>
                  {s.label}
                </li>
              ))}
            </ol>

            <VividCard surface={dark ? 'glass' : 'white'} padding="lg" radius="lg" style={{ flex: 1, flexDirection: 'row', gap: 0, minHeight: 0 }}>
              <div className={styles.stageText}>
                <DisplayTitle mode={mode} ink="vivid" scale="h2">
                  {step.title}
                </DisplayTitle>
                <Body mode={mode} weight="regular">
                  {step.text}
                </Body>
                {step.milestone && (
                  <p className={styles.milestone}>
                    <Flag size={32} strokeWidth={1.5} aria-hidden="true" />
                    <span className={styles.mono}>{milestoneLabel}</span>
                    <span className={styles.milestoneText}>{step.milestone}</span>
                  </p>
                )}
              </div>
              {step.rows && step.rows.length > 0 && (
                <ul className={styles.rows}>
                  {step.rows.map((r) => (
                    <li key={r.label} className={styles.row} data-done={r.done ? 'true' : undefined}>
                      <span className={styles.rowCheck} aria-hidden="true">
                        {r.done && <Check size={24} strokeWidth={1.5} />}
                      </span>
                      <span className={styles.rowLabel}>{r.label}</span>
                      <Tag variant={r.done ? (dark ? 'white' : 'filled') : dark ? 'glass' : 'outline'} mode={mode}>
                        {r.status}
                      </Tag>
                    </li>
                  ))}
                </ul>
              )}
            </VividCard>
          </>
        )}
      </div>
    </SlideShell>
  )
}
