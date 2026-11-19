import type { Meta, StoryObj } from '@/components/story'
import { SlideDataTable } from './SlideDataTable'

const meta = {
  title: 'Patterns/SlideDataTable',
  component: SlideDataTable,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideDataTable>

export default meta
type Story = StoryObj<typeof meta>

const hosted = { value: 'Hosted', style: 'tag-solid' } as const
const none = { value: '0', style: 'muted' } as const

/** Sample data (fictional), as in the original "table-scorecard" template. */
export const Default: Story = {
  args: {
    eyebrow: 'SAMPLE DATA | EVENTS',
    title: 'Events and what',
    accent: 'they produced',
    columns: [
      { header: 'EVENT', width: 560 },
      { header: 'TYPE', width: 220, style: 'tag' },
      { header: 'REGISTERED', width: 220 },
      { header: 'PRESENT', width: 200 },
      { header: 'NEW DEALS', width: 220, style: 'strong' },
      { header: 'WON', width: 192, style: 'badge' },
    ],
    rows: [
      ['Digital Health Forum', 'Attended', '—', '—', 9, 1],
      ['Founders Roundtable', hosted, 25, 13, 6, 2],
      ['Product Demo Day', hosted, 48, 31, 11, 3],
      ['Open Source Meetup', 'Attended', '—', '—', 4, none],
      ['Care Operations Summit', 'Attended', '—', '—', 7, 1],
    ],
  },
}

/** Fewer columns, plain text and tags only. */
export const Simple: Story = {
  args: {
    eyebrow: 'SAMPLE DATA | ROLLOUT',
    title: 'Where each clinic',
    accent: 'stands today',
    columns: [
      { header: 'CLINIC', width: 2 },
      { header: 'STATUS', style: 'tag' },
      { header: 'USERS' },
      { header: 'GO-LIVE' },
    ],
    rows: [
      ['North Clinic', { value: 'Live', style: 'tag-solid' }, 42, 'Mar 2026'],
      ['Harbor Clinic', { value: 'Live', style: 'tag-solid' }, 31, 'Apr 2026'],
      ['Hillside Clinic', 'Pilot', 12, 'Jun 2026'],
      ['Riverside Clinic', 'Planned', '—', 'Aug 2026'],
    ],
  },
}
