import type { Meta, StoryObj } from '@storybook/react-vite'
import { Subtitle, SubtitleAccent } from './Subtitle'

const meta = {
  title: 'Elements/Subtitle',
  component: Subtitle,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Subtitle>

export default meta
type Story = StoryObj<typeof meta>

export const OnInvertBlue: Story = {
  args: { children: null },
  render: () => (
    <div style={{ background: 'var(--surface-invert-blue)', padding: 48 }}>
      <Subtitle mode="invert-blue">
        A working MVP <SubtitleAccent mode="invert-blue" accent="orange">in 4 weeks</SubtitleAccent>
      </Subtitle>
    </div>
  ),
}

export const OnLightTint: Story = {
  args: { children: null },
  render: () => (
    <div style={{ background: 'var(--surface-tint)', padding: 48 }}>
      <Subtitle mode="light-tint">
        From idea to working MVP <SubtitleAccent mode="light-tint" accent="purple">in 4 weeks</SubtitleAccent>
      </Subtitle>
    </div>
  ),
}
