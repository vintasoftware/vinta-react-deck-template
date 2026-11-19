import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tag } from './Tag'

const meta = {
  title: 'Elements/Tag',
  component: Tag,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'radio', options: ['outline', 'filled'] },
    mode: { control: 'radio', options: ['light', 'light-tint', 'invert-blue', 'invert-navy'] },
    accent: { control: 'radio', options: ['blue', 'purple', 'mint'] },
  },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const OutlineOnInvertBlue: Story = {
  args: { children: '4 WEEKS', variant: 'outline', mode: 'invert-blue' },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--surface-invert-blue)', padding: 32 }}>
        <Story />
      </div>
    ),
  ],
}

export const FilledVariants: Story = {
  args: { children: 'FHIR-first' },
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <Tag variant="filled" accent="blue">FHIR-first</Tag>
      <Tag variant="filled" accent="purple">Fixed price</Tag>
      <Tag variant="filled" accent="mint">HIPAA-ready</Tag>
    </div>
  ),
}

export const Glass: Story = {
  args: { children: 'FIXED PRICE', variant: 'glass' },
  decorators: [
    (Story) => (
      <div style={{ padding: 40, background: 'var(--vivid-blue)' }}>
        <Story />
      </div>
    ),
  ],
}

export const Small: Story = {
  args: { children: 'Care Flow Map', variant: 'filled', size: 'sm' },
}
