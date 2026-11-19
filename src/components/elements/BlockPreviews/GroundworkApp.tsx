/* "Groundwork EHR" shell (the base product, the "foundation" side of the comparisons).
   Port of `N`, `pe`…`we`, `Te`, `Ee`, `je`, `Me`, `Ne` from the site bundle. */
import { useRef, useState, type CSSProperties } from 'react'
import './blocks.css'
import { ChatTranscript, type ChatTurn } from './ConciergeWidgets'
import {
  GROUNDWORK_SECTION_DATA,
  GROUNDWORK_SECTIONS,
  PROVIDER_STATS,
  TODAY_SCHEDULE,
  type ProviderRow,
} from './provider.data'
import { MockIcon, TOUR, dataIf, prefersReducedMotion, sleep, useTap, useTour, whenVisible } from './shared'

/** Screen-reader-only text (the site uses the global `sr-only` class, which does not exist here). */
const VISUALLY_HIDDEN: CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  margin: -1,
  padding: 0,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
  border: 0,
}

/* ---------- generic previews (one per block type) ---------- */

export interface IntakePreviewData {
  kind: 'intake'
  steps: { label: string; state: string }[]
}
export interface SchedulingPreviewData {
  kind: 'scheduling'
  days: { day: string; date: string; selected?: boolean }[]
  times: string[]
}
export interface BillingPreviewData {
  kind: 'billing'
  claims: { patient: string; service: string; status: string; amount: string }[]
}
export interface CoordinationPreviewData {
  kind: 'coordination'
  team: { initials: string; name: string; role: string; presence: string }[]
  note: string
}
export interface PlansPreviewData {
  kind: 'plans'
  /** Porcentagem, por exemplo `"64%"`. */
  progress: string
  tasks: { label: string; complete?: boolean }[]
}
export interface HealthLinksPreviewData {
  kind: 'health-links'
  source: string
  records: { label: string; count: string }[]
  note: string
}
export interface ConciergePreviewData {
  kind: 'concierge'
  turns: ChatTurn[]
}
export interface PortalPreviewData {
  kind: 'portal'
  cards: { label: string; value: string; detail: string }[]
}
export interface ProviderPreviewData {
  kind: 'provider'
  status: string
  schedule: { time: string; initials: string; patient: string; reason: string }[]
}

export type GroundworkPreview =
  | IntakePreviewData
  | SchedulingPreviewData
  | BillingPreviewData
  | CoordinationPreviewData
  | PlansPreviewData
  | HealthLinksPreviewData
  | ConciergePreviewData
  | PortalPreviewData
  | ProviderPreviewData

/** Screen title with optional subtitle and status badge. */
export function GroundworkHeading({ title, copy, status }: { title: string; copy?: string; status?: string }) {
  return (
    <div className="homepage-bb-app-heading">
      <div>
        <h3 className="homepage-bb-app-title homepage-bb-app-title--flush">{title}</h3>
        {copy ? <p className="homepage-bb-app-copy">{copy}</p> : null}
      </div>
      {status ? (
        <span className="homepage-bb-status">
          <span className="homepage-bb-presence-dot" aria-hidden />
          {status}
        </span>
      ) : null}
    </div>
  )
}

function IntakePreview({ preview }: { preview: IntakePreviewData }) {
  return (
    <>
      <GroundworkHeading title="Welcome, Ana" copy="Three steps to prepare for your visit." />
      <ol className="homepage-bb-step-list">
        {preview.steps.map((step, index) => (
          <li className="homepage-bb-step" key={step.label}>
            <span className="homepage-bb-step-number">{index + 1}</span>
            <span className="homepage-bb-step-label">{step.label}</span>
            <span className="homepage-bb-step-state">{step.state}</span>
          </li>
        ))}
      </ol>
    </>
  )
}

function SchedulingPreview({ preview }: { preview: SchedulingPreviewData }) {
  return (
    <>
      <GroundworkHeading title="Choose a time" copy="Available care-team appointments." />
      <div className="homepage-bb-day-grid" aria-label="Available dates">
        {preview.days.map((day) => (
          <div className="homepage-bb-day" data-selected={day.selected || undefined} key={day.date}>
            {day.day}
            <strong>{day.date}</strong>
          </div>
        ))}
      </div>
      <div className="homepage-bb-time-grid" aria-label="Available times">
        {preview.times.map((time) => (
          <div className="homepage-bb-time" key={time}>
            {time}
          </div>
        ))}
      </div>
    </>
  )
}

function BillingPreview({ preview }: { preview: BillingPreviewData }) {
  return (
    <>
      <GroundworkHeading title="Billing activity" copy="Clinical work, ready for reimbursement." />
      <div className="homepage-bb-claims" role="table" aria-label="Recent claims">
        <div className="homepage-bb-claim-head" role="row">
          {['Patient', 'Service', 'Status', 'Amount'].map((heading) => (
            <span role="columnheader" key={heading}>
              {heading}
            </span>
          ))}
        </div>
        {preview.claims.map((claim) => (
          <div className="homepage-bb-claim-row" role="row" key={claim.patient}>
            <span role="cell">{claim.patient}</span>
            <span role="cell">{claim.service}</span>
            <span className="homepage-bb-claim-status" role="cell">
              {claim.status}
            </span>
            <span role="cell">{claim.amount}</span>
          </div>
        ))}
      </div>
    </>
  )
}

function CoordinationPreview({ preview }: { preview: CoordinationPreviewData }) {
  return (
    <>
      <GroundworkHeading title="Keep the people delivering care connected." status="Team active" />
      <ul className="homepage-bb-team-list">
        {preview.team.map((member) => (
          <li className="homepage-bb-team-member" key={member.name}>
            <span className="homepage-bb-team-avatar">{member.initials}</span>
            <span>
              <span className="homepage-bb-team-name">{member.name}</span>
              <span className="homepage-bb-team-role">{member.role}</span>
            </span>
            <span className="homepage-bb-team-presence" data-presence={member.presence}>
              <span style={VISUALLY_HIDDEN}>{member.presence}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="homepage-bb-note">{preview.note}</p>
    </>
  )
}

function PlansPreview({ preview }: { preview: PlansPreviewData }) {
  return (
    <>
      <GroundworkHeading title="Cardiometabolic program" copy="A shared view of the next best actions." />
      <div
        aria-label={`${preview.progress} of tasks complete`}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={Number.parseFloat(preview.progress)}
        className="homepage-bb-progress-track"
        role="progressbar"
      >
        <span className="homepage-bb-progress-value" style={{ width: preview.progress }} />
      </div>
      <div className="homepage-bb-progress-label">
        <span>Program progress</span>
        <strong>{preview.progress}</strong>
      </div>
      <ul className="homepage-bb-task-list">
        {preview.tasks.map((task) => (
          <li className="homepage-bb-task" key={task.label}>
            <span className="homepage-bb-check" data-complete={task.complete || undefined}>
              {task.complete ? <MockIcon name="check" size={12} /> : '–'}
            </span>
            <span className="homepage-bb-task-label">{task.label}</span>
          </li>
        ))}
      </ul>
    </>
  )
}

function HealthLinksPreview({ preview }: { preview: HealthLinksPreviewData }) {
  return (
    <>
      <GroundworkHeading title="Import your records" copy={preview.source} status="Verified" />
      <ul className="homepage-bb-task-list">
        {preview.records.map((record) => (
          <li className="homepage-bb-record" key={record.label}>
            <span className="homepage-bb-check" data-complete="true">
              <MockIcon name="check" size={12} />
            </span>
            <span className="homepage-bb-task-label">{record.label}</span>
            <span className="homepage-bb-claim-status">{record.count}</span>
          </li>
        ))}
      </ul>
      <p className="homepage-bb-note">{preview.note}</p>
    </>
  )
}

function PortalPreview({ preview }: { preview: PortalPreviewData }) {
  return (
    <>
      <GroundworkHeading title="Welcome back, Ana" copy="Everything about your care, in one place." />
      <ul className="homepage-bb-portal-cards">
        {preview.cards.map((card) => (
          <li className="homepage-bb-portal-card" key={card.label}>
            <span className="homepage-bb-portal-card-label">{card.label}</span>
            <strong className="homepage-bb-portal-card-value">{card.value}</strong>
            <span className="homepage-bb-portal-card-detail">{card.detail}</span>
          </li>
        ))}
      </ul>
    </>
  )
}

function ProviderPreview({ preview }: { preview: ProviderPreviewData }) {
  return (
    <>
      <GroundworkHeading title="Good morning, Dr. Braga" status={preview.status} />
      <ul className="homepage-bb-team-list">
        {preview.schedule.map((visit) => (
          <li className="homepage-bb-team-member" key={visit.patient}>
            <span className="homepage-bb-team-avatar">{visit.initials}</span>
            <span>
              <span className="homepage-bb-team-name">{visit.patient}</span>
              <span className="homepage-bb-team-role">{visit.reason}</span>
            </span>
            <span className="homepage-bb-claim-status">{visit.time}</span>
          </li>
        ))}
      </ul>
    </>
  )
}

/** Picks the screen content by preview type. */
export function GroundworkPreviewContent({ preview }: { preview: GroundworkPreview }) {
  switch (preview.kind) {
    case 'intake':
      return <IntakePreview preview={preview} />
    case 'scheduling':
      return <SchedulingPreview preview={preview} />
    case 'billing':
      return <BillingPreview preview={preview} />
    case 'coordination':
      return <CoordinationPreview preview={preview} />
    case 'plans':
      return <PlansPreview preview={preview} />
    case 'health-links':
      return <HealthLinksPreview preview={preview} />
    case 'concierge':
      return <ChatTranscript turns={preview.turns} />
    case 'portal':
      return <PortalPreview preview={preview} />
    case 'provider':
      return <ProviderPreview preview={preview} />
  }
}

export interface GroundworkAppProps {
  /** Block name, used in the accessible label. */
  label: string
  /** Content of the block's screen. */
  preview: GroundworkPreview
}

/** "Groundwork EHR" shell (top bar, side menu and one block screen). */
export function GroundworkApp({ label, preview }: GroundworkAppProps) {
  return (
    <section className="homepage-bb-app" aria-label={`${label} preview in Groundwork EHR`}>
      <div className="homepage-bb-app-topbar">
        <span className="homepage-bb-app-mark" aria-hidden>
          G
        </span>
        <span className="homepage-bb-app-name">Groundwork EHR</span>
        <span className="homepage-bb-app-search" aria-hidden>
          <MockIcon name="search" size={13} />
          <span>Search patients…</span>
        </span>
        <span className="homepage-bb-app-avatar" aria-hidden>
          AS
        </span>
      </div>
      <div className="homepage-bb-app-layout">
        <aside className="homepage-bb-app-sidebar" aria-label="Groundwork EHR sections">
          <ul>
            {GROUNDWORK_SECTIONS.map((section) => (
              <li key={section}>{section}</li>
            ))}
          </ul>
        </aside>
        <div className="homepage-bb-app-content">
          <GroundworkPreviewContent preview={preview} />
        </div>
      </div>
    </section>
  )
}

/* ---------- Provider Experience "foundation" Groundwork EHR ---------- */

/** List of visits with avatar, reason, time and status badge. */
export function ProviderVisitList({ rows }: { rows: ProviderRow[] }) {
  return (
    <ul className="homepage-bb-prov-schedule">
      {rows.map((row) => (
        <li className="homepage-bb-prov-visit" key={`${row.name}-${row.detail}`}>
          <span className="homepage-bb-team-avatar">{row.initials}</span>
          <span className="homepage-bb-prov-visit-who">
            <span className="homepage-bb-prov-visit-name">{row.name}</span>
            <span className="homepage-bb-prov-visit-reason">{row.detail}</span>
          </span>
          <span className="homepage-bb-prov-visit-time">{row.meta}</span>
          <span className="homepage-bb-prov-pill" data-status={row.status}>
            {row.statusLabel}
          </span>
        </li>
      ))}
    </ul>
  )
}

/** Content of one menu section: the day panel (Patients) or a list (Encounters, Billing...). */
export function GroundworkProviderSection({ section }: { section: string }) {
  if (section === 'Patients') {
    return (
      <>
        <GroundworkHeading title="Good morning, Dr. Braga" copy="Here’s where the day stands." status="8 patients today" />
        <div className="homepage-bb-prov-stats">
          {PROVIDER_STATS.map((stat) => (
            <div className="homepage-bb-prov-stat" key={stat.label}>
              <span className="homepage-bb-prov-stat-label">{stat.label}</span>
              <strong className="homepage-bb-prov-stat-value">{stat.value}</strong>
              <span className="homepage-bb-prov-stat-sub">{stat.sub}</span>
            </div>
          ))}
        </div>
        <p className="homepage-bb-prov-section">Today’s schedule</p>
        <ProviderVisitList rows={TODAY_SCHEDULE} />
      </>
    )
  }
  const data = GROUNDWORK_SECTION_DATA[section]!
  return (
    <>
      <GroundworkHeading title={data.title} copy={data.copy} status={data.status} />
      <p className="homepage-bb-prov-section">{data.section}</p>
      <ProviderVisitList rows={data.rows} />
    </>
  )
}

export interface GroundworkProviderProps {
  /** Turns on the tour: switches tab at each read (Encounters → Care Plans → ... → Patients). */
  live?: boolean
}

/** Provider Experience "foundation": the Groundwork EHR with the clickable section menu. */
export function GroundworkProvider({ live = false }: GroundworkProviderProps) {
  const [section, setSection] = useState(GROUNDWORK_SECTIONS[0]!)
  const rootRef = useRef<HTMLElement>(null)
  const { tapped, tap } = useTap()

  useTour(live && !prefersReducedMotion(), async (signal) => {
    setSection(GROUNDWORK_SECTIONS[0]!)
    try {
      if (rootRef.current) await whenVisible(rootRef.current, signal)
      for (let index = 1; ; index = (index + 1) % GROUNDWORK_SECTIONS.length) {
        await sleep(TOUR.read, signal)
        await tap(GROUNDWORK_SECTIONS[index]!, signal)
        setSection(GROUNDWORK_SECTIONS[index]!)
      }
    } finally {
      setSection(GROUNDWORK_SECTIONS[0]!)
    }
  })

  return (
    <section className="homepage-bb-app" aria-label="Foundation provider interface" ref={rootRef}>
      <div className="homepage-bb-app-topbar">
        <span className="homepage-bb-app-mark" aria-hidden>
          G
        </span>
        <span className="homepage-bb-app-name">Groundwork EHR</span>
        <span className="homepage-bb-app-search" aria-hidden>
          <MockIcon name="search" size={13} />
          <span>Search patients…</span>
        </span>
        <span className="homepage-bb-app-avatar" aria-hidden>
          RB
        </span>
      </div>
      <div className="homepage-bb-app-layout">
        <nav className="homepage-bb-app-sidebar" aria-label="Groundwork EHR sections">
          <ul>
            {GROUNDWORK_SECTIONS.map((item) => (
              <li key={item}>
                <button
                  aria-current={item === section ? 'page' : undefined}
                  className="homepage-bb-app-nav"
                  data-tapped={dataIf(tapped, item)}
                  onClick={() => setSection(item)}
                  type="button"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="homepage-bb-app-content">
          <GroundworkProviderSection section={section} />
        </div>
      </div>
    </section>
  )
}
