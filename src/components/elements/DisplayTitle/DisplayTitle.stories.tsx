import type { CSSProperties } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { DisplayTitle } from './DisplayTitle'

const meta = {
  title: 'Elements/DisplayTitle',
  component: DisplayTitle,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    mode: { control: 'radio', options: ['light', 'light-tint', 'invert-blue', 'invert-navy'] },
    scale: { control: 'radio', options: ['display', 'cover', 'h1', 'h2'] },
  },
} satisfies Meta<typeof DisplayTitle>

export default meta
type Story = StoryObj<typeof meta>

/* Real background (same asset as Divider scheme 01) only to give usage context
   in this story — the element itself is still just text, it owns no background. */
const coverBackground: CSSProperties = {
  backgroundImage: 'url(/assets/dividers/divider-01-bg.png)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: 64,
}

export const Display: Story = {
  args: {
    mode: 'invert-blue',
    scale: 'display',
    children: (
      <>
        MVP
        <br />
        AI Fast-track
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div style={coverBackground}>
        <Story />
      </div>
    ),
  ],
}

export const Cover: Story = {
  args: {
    mode: 'invert-blue',
    scale: 'cover',
    children: 'Thank you',
  },
  decorators: [
    (Story) => (
      <div style={coverBackground}>
        <Story />
      </div>
    ),
  ],
}

export const H2OnLightTint: Story = {
  name: 'H2 (Light Tint)',
  args: {
    mode: 'light-tint',
    scale: 'h2',
    children: (
      <>
        AI and Healthcare product specialists,
        <br />
        from strategy to delivery
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--surface-tint)', padding: 64 }}>
        <Story />
      </div>
    ),
  ],
}
