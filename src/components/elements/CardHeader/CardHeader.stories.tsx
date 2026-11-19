import type { Meta, StoryObj } from '@storybook/react-vite'
import { CardHeader } from './CardHeader'

const meta = {
  title: 'Elements/CardHeader',
  component: CardHeader,
  parameters: { layout: 'centered' },
  argTypes: {
    status: { control: 'radio', options: ['success', 'danger'] },
  },
} satisfies Meta<typeof CardHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Success: Story = {
  args: { status: 'success', label: 'Coverage' },
  decorators: [(Story) => <div style={{ width: 420 }}><Story /></div>],
}

export const Danger: Story = {
  args: { status: 'danger', label: 'Exclusions' },
  decorators: [(Story) => <div style={{ width: 420 }}><Story /></div>],
}
