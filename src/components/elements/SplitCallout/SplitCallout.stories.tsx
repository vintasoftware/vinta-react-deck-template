import type { Meta, StoryObj } from '@storybook/react-vite'
import { SplitCallout } from './SplitCallout'

const meta = {
  title: 'Elements/SplitCallout',
  component: SplitCallout,
  parameters: { layout: 'centered' },
  argTypes: {
    accent: { control: 'radio', options: ['blue', 'cyan', 'purple', 'mint', 'rose', 'orange'] },
  },
} satisfies Meta<typeof SplitCallout>

export default meta
type Story = StoryObj<typeof meta>

export const EstimateAndMilestone: Story = {
  name: 'Estimate + milestone',
  args: {
    leftLabel: 'ROUGH ESTIMATE',
    leftValue: '~1-2 months',
    rightLabel: 'FIRST WEEK MILESTONE',
    rightText: 'After the first week, we will share a refined V1 plan, updated forecast, and prioritized delivery sequence.',
    accent: 'orange',
  },
  render: (args) => (
    <div style={{ width: 1392 }}>
      <SplitCallout {...args} />
    </div>
  ),
}

export const StatAndNote: Story = {
  name: 'Stat + note (other accent)',
  args: {
    leftLabel: 'TEAM SIZE',
    leftValue: '4 people',
    rightLabel: 'HEADS UP',
    rightText: 'Two of the four are ramping up this sprint, so early velocity will be lower than the steady-state estimate.',
    accent: 'purple',
  },
  render: (args) => (
    <div style={{ width: 1392 }}>
      <SplitCallout {...args} />
    </div>
  ),
}
