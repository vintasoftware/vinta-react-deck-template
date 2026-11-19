import type { Meta, StoryObj } from '@storybook/react-vite'
import { Eyebrow } from './Eyebrow'

const meta = {
  title: 'Elements/Eyebrow',
  component: Eyebrow,
  parameters: { layout: 'centered' },
  argTypes: {
    mode: { control: 'radio', options: ['light', 'light-tint', 'invert-blue', 'invert-navy'] },
    accent: { control: 'radio', options: ['blue', 'cyan', 'purple', 'mint', 'rose', 'orange'] },
  },
} satisfies Meta<typeof Eyebrow>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {
  args: { children: 'A FOCUSED SPRINT', mode: 'light', accent: 'blue' },
}

export const OnInvertBlue: Story = {
  args: { children: 'A FOCUSED SPRINT', mode: 'invert-blue', accent: 'orange' },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--surface-invert-blue)', padding: 32 }}>
        <Story />
      </div>
    ),
  ],
}

export const AllAccents: Story = {
  args: { children: 'A FOCUSED SPRINT', mode: 'invert-blue' },
  render: () => (
    <div style={{ background: 'var(--surface-invert-blue)', padding: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['blue', 'cyan', 'purple', 'mint', 'rose', 'orange'] as const).map((accent) => (
        <Eyebrow key={accent} mode="invert-blue" accent={accent}>
          ACCENT {accent.toUpperCase()}
        </Eyebrow>
      ))}
    </div>
  ),
}
