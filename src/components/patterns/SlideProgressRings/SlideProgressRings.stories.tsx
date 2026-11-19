import type { Meta, StoryObj } from '@/components/story'
import { SlideProgressRings } from './SlideProgressRings'

const meta = {
  title: 'Patterns/SlideProgressRings',
  component: SlideProgressRings,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideProgressRings>

export default meta
type Story = StoryObj<typeof meta>

/** Sample data is fictional. */
export const Default: Story = {
  args: {
    eyebrow: 'SAMPLE DATA | CONVERSION',
    title: 'Conversion',
    accent: 'from call to contract',
    rings: [
      { value: 92, label: 'Discovery to proposal', description: 'Teams that saw a prototype asked for a scope' },
      { value: 71, label: 'Proposal to signed SOW', description: 'Proposals that turned into a contract' },
      { value: 48, label: 'Pilot to full team', description: 'Clients that grew from a pilot to a squad' },
    ],
  },
}

export const TwoRings: Story = {
  args: {
    ...Default.args,
    rings: [
      { value: 86, label: 'Tickets closed in SLA', description: 'Support requests answered inside the agreed window' },
      { value: 64, label: 'Test coverage', description: 'Lines covered by automated tests' },
    ],
  },
}
