import { MockIcon } from './shared'
import { CONCIERGE_COPY, type ScheduleWidgetData } from './concierge.data'

/** "Booked" card the assistant shows after the person picks a day and time. */
export function BookedVisitCard({ schedule }: { schedule: ScheduleWidgetData }) {
  const day = schedule.days.find((d) => d.selected)
  const slot = schedule.slots.find((s) => s.selected)
  if (!day || !slot) return null
  const { booked } = CONCIERGE_COPY

  return (
    <figure className="homepage-bb-tc-visit" aria-label="Booked visit">
      <figcaption className="homepage-bb-tc-visit-kicker">
        <span className="homepage-bb-tc-visit-check" aria-hidden>
          <MockIcon name="check" size={11} />
        </span>
        {booked.kicker}
      </figcaption>
      <p className="homepage-bb-tc-visit-title">{booked.title}</p>
      <p className="homepage-bb-tc-visit-when">
        Thu {day.date} · {slot.time}
      </p>
      <p className="homepage-bb-tc-visit-who">
        {schedule.provider.name} · {booked.location}
      </p>
      <p className="homepage-bb-tc-visit-note">{booked.note}</p>
    </figure>
  )
}
