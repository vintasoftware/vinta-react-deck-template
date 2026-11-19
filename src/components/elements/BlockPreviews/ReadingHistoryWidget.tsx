import { MockIcon } from './shared'
import type { ReadingHistoryWidgetData } from './concierge.data'

/** Reading history as a line chart with a target zone ("tailored" card version, `homepage-bb-tc-ldl*`). */
export function ReadingHistoryWidget({ widget }: { widget: ReadingHistoryWidgetData }) {
  const readings = widget.readings
  const latest = readings.find((r) => r.latest) ?? readings[readings.length - 1]
  const first = readings[0]
  if (!latest || !first) return null

  const { floor, ceiling } = widget.window
  const xPercent = (index: number) => ((index + 0.5) / readings.length) * 100
  const yPercent = (value: number) => ((ceiling - value) / (ceiling - floor)) * 100
  const linePoints = readings.map((r, i) => `${xPercent(i)},${yPercent(r.value)}`).join(' ')
  const areaPoints = `${xPercent(0)},100 ${linePoints} ${xPercent(readings.length - 1)},100`
  const delta = first.value - latest.value
  const toGo = latest.value - widget.target

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
          <span aria-hidden>↓</span> {delta} since {first.label}
        </p>
      </div>
      <div className="homepage-bb-tc-ldl-chart" aria-hidden>
        <span className="homepage-bb-tc-ldl-zone" style={{ top: `${yPercent(widget.target)}%` }}>
          <span>Target zone · under {widget.target}</span>
        </span>
        <svg className="homepage-bb-tc-ldl-plot" preserveAspectRatio="none" viewBox="0 0 100 100">
          <polygon className="homepage-bb-tc-ldl-area" points={areaPoints} />
          <polyline className="homepage-bb-tc-ldl-line" points={linePoints} />
        </svg>
        {readings.map((r, i) => (
          <span
            className="homepage-bb-tc-ldl-dot"
            data-latest={r === latest ? '' : undefined}
            key={r.label}
            style={{ left: `${xPercent(i)}%`, top: `${yPercent(r.value)}%` }}
          >
            <span className="homepage-bb-tc-ldl-dot-value">{r.value}</span>
          </span>
        ))}
      </div>
      <ul className="homepage-bb-tc-ldl-months" aria-hidden>
        {readings.map((r) => (
          <li key={r.label}>{r.label}</li>
        ))}
      </ul>
      <p className="homepage-bb-tc-ldl-note">
        {widget.target - latest.value < 0 ? `${toGo} ${widget.unit} to go to reach your target.` : 'In your target zone.'}
      </p>
      <ul className="homepage-bb-tc-ldl-suggest" aria-label="Suggested questions">
        {widget.suggestions.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </figure>
  )
}

/** Reading history as bars (the block's generic version, `homepage-bb-ldl*`). */
export function ReadingHistoryBarsWidget({ widget }: { widget: ReadingHistoryWidgetData }) {
  const latest = widget.readings.find((r) => r.latest) ?? widget.readings[widget.readings.length - 1]
  const targetBottom = (widget.target / widget.scaleMax) * 100

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
          <span className="homepage-bb-ldl-target" style={{ bottom: `${targetBottom}%` }} aria-hidden />
          <ul className="homepage-bb-ldl-bars">
            {widget.readings.map((r) => (
              <li className="homepage-bb-ldl-bar-col" key={r.label}>
                <span
                  className="homepage-bb-ldl-bar"
                  data-latest={r.latest ? 'true' : undefined}
                  style={{ height: `${(r.value / widget.scaleMax) * 100}%` }}
                >
                  <span className="homepage-bb-ldl-bar-value">{r.value}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <ul className="homepage-bb-ldl-labels" aria-hidden>
          {widget.readings.map((r) => (
            <li key={r.label}>{r.label}</li>
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
