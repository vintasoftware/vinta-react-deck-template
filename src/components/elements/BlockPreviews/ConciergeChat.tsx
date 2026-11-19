import { forwardRef } from 'react'
import {
  TAILORED_CONVERSATION,
  type ConciergePreview,
  type ReadingHistoryWidgetData,
  type ScheduleWidgetData,
} from './concierge.data'
import { BookedVisitCard } from './BookedVisitCard'
import { ReadingHistoryBarsWidget, ReadingHistoryWidget } from './ReadingHistoryWidget'
import { ScheduleWidget } from './ScheduleWidget'

/** The block's generic conversation (turns and widgets straight from `preview.turns`; readings bar widget). */
export function ConciergeChat({ preview }: { preview: ConciergePreview }) {
  return (
    <ol className="homepage-bb-chat" aria-label="Conversation">
      {preview.turns.map((turn, index) =>
        'widget' in turn ? (
          <li className="homepage-bb-chat-widget" key={`widget-${index}`}>
            {turn.widget.kind === 'reading-history' ? (
              <ReadingHistoryBarsWidget widget={turn.widget} />
            ) : (
              <ScheduleWidget widget={turn.widget} />
            )}
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

function findReadings(preview: ConciergePreview): ReadingHistoryWidgetData | undefined {
  for (const turn of preview.turns) {
    if ('widget' in turn && turn.widget.kind === 'reading-history') return turn.widget
  }
}

function findSchedule(preview: ConciergePreview): ScheduleWidgetData | undefined {
  for (const turn of preview.turns) {
    if ('widget' in turn && turn.widget.kind === 'schedule') return turn.widget
  }
}

/** Scrollable conversation area of the "tailored" card: fixed text, widgets taken from `preview`. */
export const ConciergeTailoredChat = forwardRef<HTMLDivElement, { preview: ConciergePreview }>(function ConciergeTailoredChat(
  { preview },
  ref,
) {
  const readings = findReadings(preview)
  const schedule = findSchedule(preview)
  const canBook = schedule?.days.some((d) => d.selected) && schedule.slots.some((s) => s.selected)

  return (
    <div aria-label="Tallgrove care assistant conversation" className="homepage-bb-tc-scroll" ref={ref} role="region" tabIndex={0}>
      <ol className="homepage-bb-chat" aria-label="Conversation">
        {TAILORED_CONVERSATION.map((step, index) => {
          if ('text' in step) {
            return (
              <li className="homepage-bb-chat-message" data-from={step.from} key={index}>
                {step.text}
              </li>
            )
          }
          if (step.widget === 'reading-history' && readings) {
            return (
              <li className="homepage-bb-chat-widget" key={index}>
                <ReadingHistoryWidget widget={readings} />
              </li>
            )
          }
          if (step.widget === 'schedule' && schedule) {
            return (
              <li className="homepage-bb-chat-widget" key={index}>
                <ScheduleWidget widget={schedule} />
              </li>
            )
          }
          if (step.widget === 'booked-visit' && schedule && canBook) {
            return (
              <li className="homepage-bb-chat-widget" key={index}>
                <BookedVisitCard schedule={schedule} />
              </li>
            )
          }
          return null
        })}
      </ol>
    </div>
  )
})
