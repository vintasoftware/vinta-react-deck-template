/* "AI Concierge" card (port of `Qe` from the site bundle). The conversation is fixed; the widgets come from `preview`. */
import { useRef } from 'react'
import { MockIcon, prefersReducedMotion, smoothScrollTo, sleep, useTour, whenVisible } from './shared'
import type { BlockPreviewProps } from './types'
import { CONCIERGE_COPY, CONCIERGE_TOUR, DEFAULT_CONCIERGE_PREVIEW, type ConciergePreview } from './concierge.data'
import { ConciergeHeader } from './ConciergeHeader'
import { ConciergeTailoredChat } from './ConciergeChat'

export type {
  ConciergePreview,
  ConciergeTurn,
  ConciergeWidget,
  ReadingHistoryWidgetData,
  ScheduleWidgetData,
} from './concierge.data'

export interface ConciergeProps extends BlockPreviewProps {
  /** Concierge conversation and widgets. Omitted: uses `DEFAULT_CONCIERGE_PREVIEW` (site data). */
  preview?: ConciergePreview
}

/**
 * Concierge card: Tallgrove header, conversation with inline widgets and a message field.
 * `live` turns on the tour (scrolls the conversation to the end and back, in a loop; calls `onTourEnd` on each pass).
 * `touchLayout` and `skipInteractionGate` do not change this card (the site does not use them here either).
 */
export function Concierge({ preview = DEFAULT_CONCIERGE_PREVIEW, live = false, onTourEnd }: ConciergeProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const onTourEndRef = useRef(onTourEnd)
  onTourEndRef.current = onTourEnd

  useTour(live && !prefersReducedMotion(), async (signal) => {
    const scroller = scrollRef.current
    if (!scroller) return
    scroller.scrollTop = 0
    await whenVisible(scroller, signal)
    for (;;) {
      await sleep(CONCIERGE_TOUR.lead, signal)
      await smoothScrollTo(scroller, scroller.scrollHeight, CONCIERGE_TOUR.scrollDown, signal)
      await sleep(CONCIERGE_TOUR.read, signal)
      await smoothScrollTo(scroller, 0, CONCIERGE_TOUR.scrollUp, signal)
      onTourEndRef.current?.()
    }
  })

  return (
    <section className="homepage-bb-tc" aria-label="Tailored concierge interface">
      <ConciergeHeader />
      <div className="homepage-bb-tc-pane">
        <ConciergeTailoredChat preview={preview} ref={scrollRef} />
        <div className="homepage-bb-tc-composer" aria-hidden>
          <span className="homepage-bb-tc-field">{CONCIERGE_COPY.composerPlaceholder}</span>
          <span className="homepage-bb-tc-send">
            <MockIcon name="arrow-up-right" size={14} />
          </span>
        </div>
      </div>
    </section>
  )
}

