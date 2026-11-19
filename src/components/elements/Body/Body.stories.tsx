import type { Meta, StoryObj } from '@storybook/react-vite'
import { Body } from './Body'

const meta = {
  title: 'Elements/Body',
  component: Body,
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'radio', options: ['h4', 'body'] },
    tone: { control: 'radio', options: ['primary', 'secondary', 'muted'] },
    mode: { control: 'radio', options: ['light', 'light-tint', 'invert-blue', 'invert-navy'] },
  },
} satisfies Meta<typeof Body>

export default meta
type Story = StoryObj<typeof meta>

const text = 'We build on the existing product and focus the engagement on the work required to launch a secure, dependable V1 with real users.'

export const Descriptive: Story = {
  args: { children: text, size: 'h4', tone: 'secondary' },
  decorators: [(Story) => <div style={{ width: 760 }}><Story /></div>],
}

export const SmallNote: Story = {
  args: { children: 'Estimate based on the scope reviewed on the discovery call.', size: 'body', tone: 'muted' },
  decorators: [(Story) => <div style={{ width: 560 }}><Story /></div>],
}

export const OnInvertNavy: Story = {
  args: { children: text, mode: 'invert-navy', tone: 'secondary' },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--surface-invert-navy)', padding: 48, width: 760 }}>
        <Story />
      </div>
    ),
  ],
}

/** Medium title + regular supporting text, as in the cards of the vivid layouts. */
export const VividTitleAndText: Story = {
  args: { children: 'Starter you can fork' },
  render: () => (
    <div style={{ display: 'grid', gap: 8, width: 520 }}>
      <Body tone="primary" ink="vivid">Starter you can fork</Body>
      <Body weight="regular">A working app on day one, set up for your care model.</Body>
    </div>
  ),
}
