import type { Meta, StoryObj } from '@storybook/react-vite'
import { PhaseHeader } from './PhaseHeader'

const meta = {
  title: 'Elements/PhaseHeader',
  component: PhaseHeader,
  parameters: { layout: 'centered' },
  argTypes: { accent: { control: 'radio', options: ['purple', 'mint', 'blue'] } },
  decorators: [(Story) => <div style={{ width: 540 }}><Story /></div>],
} satisfies Meta<typeof PhaseHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Discovery: Story = { args: { label: 'phase 01', title: 'product discovery', duration: 'week 1', accent: 'purple' } }
export const Development: Story = { args: { label: 'phase 02', title: 'design & development', duration: 'week 2', accent: 'mint' } }
export const Launch: Story = { args: { label: 'phase 03', title: 'mvp launch', duration: '1 week', accent: 'blue' } }
