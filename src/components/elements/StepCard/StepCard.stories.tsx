import type { Meta, StoryObj } from '@storybook/react-vite'
import { StepCard } from './StepCard'

const meta = {
  title: 'Elements/StepCard',
  component: StepCard,
  parameters: { layout: 'centered' },
  argTypes: { accent: { control: 'radio', options: ['teal', 'aqua', 'sky', 'blue', 'navy'] } },
  decorators: [(Story) => <div style={{ padding: 24, background: 'var(--surface-mist)' }}><Story /></div>],
} satisfies Meta<typeof StepCard>

export default meta
type Story = StoryObj<typeof meta>

export const Map: Story = {
  args: { index: 1, title: 'Map', accent: 'teal', lines: ['Align on the core problem,', 'user journey, golden path,', 'and success criteria.'] },
}
export const RealityCheck: Story = {
  args: {
    index: 4,
    title: 'Reality Check',
    accent: 'blue',
    lines: ['We deploy to a live private', 'URL and walk you through', 'what works, what is', 'intentionally', 'pre-production, and what', 'it takes to go from this', 'launch to an audit-ready', 'one.'],
  },
}
