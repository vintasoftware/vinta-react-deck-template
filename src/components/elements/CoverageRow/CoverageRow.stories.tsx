import type { Meta, StoryObj } from '@storybook/react-vite'
import { CoverageRow } from './CoverageRow'

const meta = {
  title: 'Elements/CoverageRow',
  component: CoverageRow,
  parameters: { layout: 'centered' },
  argTypes: {
    status: { control: 'radio', options: ['success', 'danger'] },
  },
} satisfies Meta<typeof CoverageRow>

export default meta
type Story = StoryObj<typeof meta>

export const Success: Story = {
  args: { status: 'success', children: 'Bug fixes for existing features and security patches' },
  decorators: [(Story) => <div style={{ width: 420 }}><Story /></div>],
}

export const Danger: Story = {
  args: { status: 'danger', children: 'New feature development' },
  decorators: [(Story) => <div style={{ width: 420 }}><Story /></div>],
}

export const MultiLine: Story = {
  name: 'Multi-line',
  args: {
    status: 'success',
    children: 'Monthly infrastructure review, including performance tuning and cost optimization across all environments',
  },
  decorators: [(Story) => <div style={{ width: 420 }}><Story /></div>],
}
