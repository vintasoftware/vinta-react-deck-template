import type { Meta, StoryObj } from '@storybook/react-vite'
import { Kicker } from './Kicker'

const meta = {
  title: 'Elements/Kicker',
  component: Kicker,
  parameters: { layout: 'centered' },
  argTypes: { align: { control: 'radio', options: ['left', 'center'] } },
} satisfies Meta<typeof Kicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { children: 'MVP AI FAST-TRACK' } }
