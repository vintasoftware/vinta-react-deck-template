import type { Meta, StoryObj } from '@storybook/react-vite'
import { Stat } from './Stat'

const meta = {
  title: 'Elements/Stat',
  component: Stat,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    mode: {
      control: 'radio',
      options: ['light', 'invert-blue', 'invert-navy'],
    },
  },
} satisfies Meta<typeof Stat>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {
  args: {
    value: '42%',
    label: 'fewer no-shows',
    mode: 'light',
  },
}

export const InvertBlue: Story = {
  args: {
    value: '42%',
    label: 'fewer no-shows',
    mode: 'invert-blue',
  },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--surface-invert-blue)', padding: 48 }}>
        <Story />
      </div>
    ),
  ],
}

export const InvertNavy: Story = {
  args: {
    value: '42%',
    label: 'fewer no-shows',
    mode: 'invert-navy',
  },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--surface-invert-navy)', padding: 48 }}>
        <Story />
      </div>
    ),
  ],
}

export const AllModes: Story = {
  args: {
    value: '9',
    label: 'weeks from kickoff to launch',
  },
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      <div style={{ background: 'var(--surface-page)', padding: 48 }}>
        <Stat value="9" label="weeks from kickoff to launch" mode="light" />
      </div>
      <div style={{ background: 'var(--surface-invert-blue)', padding: 48 }}>
        <Stat value="9" label="weeks from kickoff to launch" mode="invert-blue" />
      </div>
      <div style={{ background: 'var(--surface-invert-navy)', padding: 48 }}>
        <Stat value="9" label="weeks from kickoff to launch" mode="invert-navy" />
      </div>
    </div>
  ),
}
