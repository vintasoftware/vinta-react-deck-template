import type { Meta, StoryObj } from '@storybook/react-vite'
import { StepRail } from './StepRail'

const meta = {
  title: 'Elements/StepRail',
  component: StepRail,
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{ padding: 24, background: 'var(--surface-mist)' }}><Story /></div>],
} satisfies Meta<typeof StepRail>

export default meta
type Story = StoryObj<typeof meta>

export const FiveSteps: Story = { args: {} }
