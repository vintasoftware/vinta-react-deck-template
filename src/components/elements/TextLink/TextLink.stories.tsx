import type { Meta, StoryObj } from '@storybook/react-vite'
import { TextLink } from './TextLink'

const meta = {
  title: 'Elements/TextLink',
  component: TextLink,
  parameters: { layout: 'centered' },
  argTypes: {
    mode: { control: 'radio', options: ['light', 'light-tint', 'invert-blue', 'invert-navy'] },
    accent: { control: 'radio', options: ['blue', 'cyan', 'purple', 'mint', 'rose', 'orange'] },
    variant: { control: 'radio', options: ['text', 'button'] },
  },
} satisfies Meta<typeof TextLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'VIEW THE FULL CASE STUDY', mode: 'light', accent: 'blue' },
}

export const Button: Story = {
  args: { children: 'VIEW THE FULL CASE STUDY', mode: 'light', accent: 'blue', variant: 'button' },
}

export const OnInvertNavy: Story = {
  args: { children: 'VIEW THE FULL CASE STUDY', mode: 'invert-navy', accent: 'cyan' },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--surface-invert-navy)', padding: 32 }}>
        <Story />
      </div>
    ),
  ],
}
