import type { Meta, StoryObj } from '@storybook/react-vite'
import { MetricItem } from './MetricItem'

const meta = {
  title: 'Elements/MetricItem',
  component: MetricItem,
  parameters: { layout: 'centered' },
  argTypes: {
    mode: { control: 'radio', options: ['light', 'light-tint', 'invert-blue', 'invert-navy'] },
    accent: { control: 'radio', options: ['blue', 'cyan', 'purple', 'mint', 'rose', 'orange'] },
  },
} satisfies Meta<typeof MetricItem>

export default meta
type Story = StoryObj<typeof meta>

export const OnLightTint: Story = {
  args: {
    label: '13+ years',
    description: 'Delivering software',
    mode: 'light-tint',
    accent: 'blue',
  },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--surface-tint)', padding: 32 }}>
        <Story />
      </div>
    ),
  ],
}
