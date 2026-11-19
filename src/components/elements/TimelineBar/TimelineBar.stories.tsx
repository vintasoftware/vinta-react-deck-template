import type { Meta, StoryObj } from '@storybook/react-vite'
import { TimelineBar } from './TimelineBar'

const meta = {
  title: 'Elements/TimelineBar',
  component: TimelineBar,
  parameters: { layout: 'centered' },
  argTypes: { accent: { control: 'radio', options: ['purple', 'mint', 'blue'] } },
} satisfies Meta<typeof TimelineBar>

export default meta
type Story = StoryObj<typeof meta>

export const Purple: Story = { args: { children: 'Click to add Pre-title', accent: 'purple' } }
export const Mint: Story = { args: { children: 'Click to add Pre-title', accent: 'mint' } }
export const Blue: Story = { args: { children: 'Click to add Pre-title', accent: 'blue' } }
