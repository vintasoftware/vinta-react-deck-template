import type { Meta, StoryObj } from '@storybook/react-vite'
import { BulletList } from './BulletList'

const meta = {
  title: 'Elements/BulletList',
  component: BulletList,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'radio', options: ['dot', 'check', 'number'] },
    accent: { control: 'radio', options: ['blue', 'cyan', 'purple', 'mint', 'rose', 'orange'] },
    mode: { control: 'radio', options: ['light', 'light-tint', 'invert-blue', 'invert-navy'] },
  },
} satisfies Meta<typeof BulletList>

export default meta
type Story = StoryObj<typeof meta>

const items = [
  'A working V1 in front of real users',
  'Security and compliance built in from week one',
  'A team that stays after launch',
]

export const Dots: Story = { args: { items, variant: 'dot' }, decorators: [(S) => <div style={{ width: 720 }}><S /></div>] }
export const Checks: Story = { args: { items, variant: 'check', accent: 'mint' }, decorators: [(S) => <div style={{ width: 720 }}><S /></div>] }
export const Numbered: Story = { args: { items, variant: 'number', accent: 'purple' }, decorators: [(S) => <div style={{ width: 720 }}><S /></div>] }
export const OnInvertNavy: Story = {
  args: { items, variant: 'check', accent: 'cyan', mode: 'invert-navy' },
  decorators: [(S) => <div style={{ width: 720, background: 'var(--surface-invert-navy)', padding: 48 }}><S /></div>],
}
