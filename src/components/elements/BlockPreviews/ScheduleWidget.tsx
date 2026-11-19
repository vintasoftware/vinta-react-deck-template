import { MockIcon } from './shared'
import type { ScheduleWidgetData } from './concierge.data'

/** Inline scheduling widget (days + times). The site's `homepage-bb-schedule*` classes. */
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
