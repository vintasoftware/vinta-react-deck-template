import type { Decorator, Meta, StoryObj } from '@storybook/react-vite'
import { Concierge } from './Concierge'
import { ReadingHistoryBarsWidget, ReadingHistoryWidget } from './ReadingHistoryWidget'
import { ScheduleWidget } from './ScheduleWidget'
import { BookedVisitCard } from './BookedVisitCard'
import { ConciergeChat } from './ConciergeChat'
import { ConciergeHeader } from './ConciergeHeader'
import { DEFAULT_CONCIERGE_PREVIEW } from './concierge.data'
import type { ReadingHistoryWidgetData, ScheduleWidgetData } from './concierge.data'
import { markInteracted } from './shared'

markInteracted()

const readings = DEFAULT_CONCIERGE_PREVIEW.turns.flatMap((t) => ('widget' in t && t.widget.kind === 'reading-history' ? [t.widget] : []))[0] as ReadingHistoryWidgetData
const schedule = DEFAULT_CONCIERGE_PREVIEW.turns.flatMap((t) => ('widget' in t && t.widget.kind === 'schedule' ? [t.widget] : []))[0] as ScheduleWidgetData

/** Fixed-width stage similar to the site's `.homepage-bb-preview-stage` (840 px wide UI). */
const stage = (width: number): Decorator => (Story) => (
  <div style={{ width, margin: '48px auto', fontSize: 16 }}>
    <Story />
  </div>
)

const meta = {
  title: 'Elements/BlockPreviews/Concierge',
  component: Concierge,
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
  args: { live: false },
  decorators: [stage(840)],
} satisfies Meta<typeof Concierge>
export default meta
type Story = StoryObj<typeof meta>

/** Static final state (no tour). */
export const Static: Story = { args: { live: false } }

/** With tour: the conversation scrolls to the end and back, in a loop. */
export const Live: Story = { args: { live: true } }

const widgetFrame: Decorator = (Story) => (
  <div style={{ width: 420, margin: '48px auto' }}>
    <Story />
  </div>
)

/** Readings chart (tailored card version). */
export const ReadingHistory: StoryObj = {
  render: () => (
    <div className="homepage-bb-tc" style={{ height: 'auto', border: 0, background: 'none', boxShadow: 'none' }}>
      <ReadingHistoryWidget widget={readings} />
    </div>
  ),
  decorators: [widgetFrame],
}

/** Readings bar chart (generic version). */
export const ReadingHistoryBars: StoryObj = {
  render: () => <ReadingHistoryBarsWidget widget={readings} />,
  decorators: [widgetFrame],
}

/** Scheduling widget. */
export const Schedule: StoryObj = {
  render: () => <ScheduleWidget widget={schedule} />,
  decorators: [widgetFrame],
}

/** Booked visit card. */
export const BookedVisit: StoryObj = {
  render: () => (
    <div className="homepage-bb-tc" style={{ height: 'auto', border: 0, background: 'none', boxShadow: 'none' }}>
      <BookedVisitCard schedule={schedule} />
    </div>
  ),
  decorators: [widgetFrame],
}

/** Generic conversation (preview turns, without the Tallgrove header). */
export const GenericChat: StoryObj = {
  render: () => <ConciergeChat preview={DEFAULT_CONCIERGE_PREVIEW} />,
  decorators: [widgetFrame],
}

/** Only the card header. */
export const Header: StoryObj = {
  render: () => (
    <div className="homepage-bb-tc" style={{ height: 'auto' }}>
      <ConciergeHeader />
    </div>
  ),
}
