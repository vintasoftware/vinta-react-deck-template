/* AI Concierge conversation widgets (reading history, trend, scheduling) and the message list.
   Port of `ye`, `be`, `xe` and `Se` from the site bundle. The full Concierge mock lives in another file;
   these pieces are exported so they can be used standalone in slides. */
import './blocks.css'
import { MockIcon } from './shared'

export interface ReadingPoint {
  label: string
  value: number
  /** Most recent reading (highlighted). */
  latest?: boolean
}

/** Readings bar widget (`homepage-bb-ldl`). */
export interface ReadingHistoryWidgetData {
  kind: 'reading-history'
  title: string
  source: string
  unit: string
  status: string
  target: number
  targetLabel: string
  /** Value that maps to 100% of the chart height. */
  scaleMax: number
  /** Vertical range of the trend chart. */
  window: { floor: number; ceiling: number }
  readings: ReadingPoint[]
  suggestions: string[]
}

export interface ScheduleDay {
  day: string
  date: string
  selected?: boolean
}

export interface ScheduleSlot {
  time: string
  selected?: boolean
}

/** Scheduling widget inside the chat. */
export interface ScheduleWidgetData {
  kind: 'schedule'
  title: string
  provider: { initials: string; name: string; role: string }
  days: ScheduleDay[]
  slotLabel: string
  slots: ScheduleSlot[]
}

export type ChatWidget = ReadingHistoryWidgetData | ScheduleWidgetData

export type ChatTurn = { from: 'patient' | 'assistant'; text: string } | { widget: ChatWidget }

/** Readings bar chart with a target line. */
export function ReadingHistoryWidget({ widget }: { widget: ReadingHistoryWidgetData }) {
  const latest = widget.readings.find((reading) => reading.latest) ?? widget.readings[widget.readings.length - 1]
  const targetPercent = (widget.target / widget.scaleMax) * 100
  return (
    <figure className="homepage-bb-ldl" aria-label={`${widget.title} history widget`}>
      <figcaption className="homepage-bb-ldl-head">
        <span className="homepage-bb-ldl-title">
          <MockIcon name="record-vitals" size={13} />
          {widget.title}
        </span>
        <span className="homepage-bb-ldl-status">{widget.status}</span>
      </figcaption>
      {latest ? (
        <p className="homepage-bb-ldl-value">
          {latest.value}
          <span className="homepage-bb-ldl-unit"> {widget.unit}</span>
        </p>
      ) : null}
      <div className="homepage-bb-ldl-chart">
        <div className="homepage-bb-ldl-plot">
          <span className="homepage-bb-ldl-target" style={{ bottom: `${targetPercent}%` }} aria-hidden />
          <ul className="homepage-bb-ldl-bars">
            {widget.readings.map((reading) => (
              <li className="homepage-bb-ldl-bar-col" key={reading.label}>
                <span
                  className="homepage-bb-ldl-bar"
                  data-latest={reading.latest ? 'true' : undefined}
                  style={{ height: `${(reading.value / widget.scaleMax) * 100}%` }}
                >
                  <span className="homepage-bb-ldl-bar-value">{reading.value}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <ul className="homepage-bb-ldl-labels" aria-hidden>
          {widget.readings.map((reading) => (
            <li key={reading.label}>{reading.label}</li>
          ))}
        </ul>
        <p className="homepage-bb-ldl-legend">
          <span className="homepage-bb-ldl-legend-line" aria-hidden />
          {widget.targetLabel} {widget.unit}
        </p>
      </div>
    </figure>
  )
}

/** Trend area chart (target zone, points, suggested questions). */
export function ReadingTrendWidget({ widget }: { widget: ReadingHistoryWidgetData }) {
  const readings = widget.readings
  const latest = readings.find((reading) => reading.latest) ?? readings[readings.length - 1]
  const first = readings[0]
  if (!latest || !first) return null
  const { floor, ceiling } = widget.window
  const xPercent = (index: number) => ((index + 0.5) / readings.length) * 100
  const yPercent = (value: number) => ((ceiling - value) / (ceiling - floor)) * 100
  const line = readings.map((reading, index) => `${xPercent(index)},${yPercent(reading.value)}`).join(' ')
  const area = `${xPercent(0)},100 ${line} ${xPercent(readings.length - 1)},100`
  const drop = first.value - latest.value
  return (
    <figure className="homepage-bb-tc-ldl" aria-label={`${widget.title} trend`}>
      <figcaption className="homepage-bb-tc-ldl-head">
        <span>
          <span className="homepage-bb-tc-ldl-title">{widget.title}</span>
          <span className="homepage-bb-tc-ldl-meta">{widget.source}</span>
        </span>
        <span className="homepage-bb-tc-ldl-status" data-in-range={latest.value <= widget.target ? '' : undefined}>
          {widget.status}
        </span>
      </figcaption>
      <div className="homepage-bb-tc-ldl-reading">
        <p className="homepage-bb-tc-ldl-value">
          {latest.value}
          <span className="homepage-bb-tc-ldl-unit"> {widget.unit}</span>
        </p>
        <p className="homepage-bb-tc-ldl-delta">
          <span aria-hidden>↓</span> {drop} since {first.label}
        </p>
      </div>
      <div className="homepage-bb-tc-ldl-chart" aria-hidden>
        <span className="homepage-bb-tc-ldl-zone" style={{ top: `${yPercent(widget.target)}%` }}>
          <span>Target zone · under {widget.target}</span>
        </span>
        <svg className="homepage-bb-tc-ldl-plot" preserveAspectRatio="none" viewBox="0 0 100 100">
          <polygon className="homepage-bb-tc-ldl-area" points={area} />
          <polyline className="homepage-bb-tc-ldl-line" points={line} />
        </svg>
        {readings.map((reading, index) => (
          <span
            className="homepage-bb-tc-ldl-dot"
            data-latest={reading === latest ? '' : undefined}
            key={reading.label}
            style={{ left: `${xPercent(index)}%`, top: `${yPercent(reading.value)}%` }}
          >
            <span className="homepage-bb-tc-ldl-dot-value">{reading.value}</span>
          </span>
        ))}
      </div>
      <ul className="homepage-bb-tc-ldl-months" aria-hidden>
        {readings.map((reading) => (
          <li key={reading.label}>{reading.label}</li>
        ))}
      </ul>
      <p className="homepage-bb-tc-ldl-note">
        {widget.target - latest.value < 0 ? `${latest.value - widget.target} ${widget.unit} to go to reach your target.` : 'In your target zone.'}
      </p>
      <ul className="homepage-bb-tc-ldl-suggest" aria-label="Suggested questions">
        {widget.suggestions.map((suggestion) => (
          <li key={suggestion}>{suggestion}</li>
        ))}
      </ul>
    </figure>
  )
}

/** "Schedule a visit" widget: doctor, days and times. */
export function ScheduleWidget({ widget }: { widget: ScheduleWidgetData }) {
  return (
    <figure className="homepage-bb-schedule" aria-label={`${widget.title} widget`}>
      <figcaption className="homepage-bb-schedule-head">
        <MockIcon name="spark" size={13} />
        {widget.title}
      </figcaption>
      <div className="homepage-bb-schedule-provider">
        <span className="homepage-bb-schedule-avatar" aria-hidden>
          {widget.provider.initials}
        </span>
        <span className="homepage-bb-schedule-provider-text">
          <span className="homepage-bb-schedule-provider-name">{widget.provider.name}</span>
          <span className="homepage-bb-schedule-provider-role">{widget.provider.role}</span>
        </span>
        <span className="homepage-bb-schedule-check" aria-hidden>
          <MockIcon name="check" size={12} />
        </span>
      </div>
      <ul className="homepage-bb-schedule-days" aria-label="Select a day">
        {widget.days.map((day) => (
          <li className="homepage-bb-schedule-day" data-selected={day.selected ? 'true' : undefined} key={day.date}>
            <span className="homepage-bb-schedule-day-name">{day.day}</span>
            <span className="homepage-bb-schedule-day-date">{day.date}</span>
          </li>
        ))}
      </ul>
      <p className="homepage-bb-schedule-slot-label">{widget.slotLabel}</p>
      <ul className="homepage-bb-schedule-slots" aria-label="Select a time">
        {widget.slots.map((slot) => (
          <li className="homepage-bb-schedule-slot" data-selected={slot.selected ? 'true' : undefined} key={slot.time}>
            {slot.time}
          </li>
        ))}
      </ul>
    </figure>
  )
}

/** Static conversation: messages and inline widgets. */
export function ChatTranscript({ turns }: { turns: ChatTurn[] }) {
  return (
    <ol className="homepage-bb-chat" aria-label="Conversation">
      {turns.map((turn, index) =>
        'widget' in turn ? (
          <li className="homepage-bb-chat-widget" key={`widget-${index}`}>
            {turn.widget.kind === 'reading-history' ? <ReadingHistoryWidget widget={turn.widget} /> : <ScheduleWidget widget={turn.widget} />}
          </li>
        ) : (
          <li className="homepage-bb-chat-message" data-from={turn.from} key={turn.text}>
            {turn.text}
          </li>
        ),
      )}
    </ol>
  )
}
