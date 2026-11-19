import type { Meta, StoryObj } from '@storybook/react-vite'
import { Logo } from './Logo'

const meta = {
  title: 'Elements/Logo',
  component: Logo,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Logo>

export default meta
type Story = StoryObj<typeof meta>

export const Placeholder: Story = {
  args: { name: 'Vinta', width: 192, height: 44 },
}

export const Small: Story = {
  args: { name: 'Mayo Clinic', width: 120, height: 32 },
}
