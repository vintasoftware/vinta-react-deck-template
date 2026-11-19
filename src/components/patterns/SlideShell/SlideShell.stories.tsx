import type { Meta, StoryObj } from '@storybook/react-vite'
import { SlideShell } from './SlideShell'

const meta = {
  title: 'Patterns/SlideShell',
  component: SlideShell,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    mode: { control: 'radio', options: ['light', 'invert-blue', 'invert-navy'] },
  },
} satisfies Meta<typeof SlideShell>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {
  args: {
    mode: 'light',
    safeArea: 'dense',
    children: <div style={{ padding: 32 }}>Slide content goes here.</div>,
  },
}

export const InvertBlue: Story = {
  args: {
    mode: 'invert-blue',
    safeArea: 'hero',
    children: <div style={{ padding: 32 }}>Slide content goes here.</div>,
  },
}
