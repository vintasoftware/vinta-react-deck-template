import type { Meta, StoryObj } from '@storybook/react-vite'
import { Quote } from './Quote'

const meta = {
  title: 'Elements/Quote',
  component: Quote,
  parameters: { layout: 'centered' },
  argTypes: {
    mode: { control: 'radio', options: ['light', 'light-tint', 'invert-blue', 'invert-navy'] },
    accent: { control: 'radio', options: ['blue', 'cyan', 'purple', 'mint', 'rose', 'orange'] },
  },
} satisfies Meta<typeof Quote>

export default meta
type Story = StoryObj<typeof meta>

const args = {
  children: 'We went from a spreadsheet to a working scheduler in six weeks.',
  author: 'Alex Morgan',
  role: 'CTO, EXAMPLE HEALTH',
}

export const Light: Story = { args, decorators: [(S) => <div style={{ width: 1100 }}><S /></div>] }
export const OnInvertBlue: Story = {
  args: { ...args, mode: 'invert-blue', accent: 'orange' },
  decorators: [(S) => <div style={{ width: 1100, background: 'var(--surface-invert-blue)', padding: 64 }}><S /></div>],
}
