import type { Meta, StoryObj } from '@storybook/react-vite'
import { PricingCard } from './PricingCard'

const meta = {
  title: 'Elements/PricingCard',
  component: PricingCard,
  parameters: { layout: 'centered' },
  argTypes: {
    tone: { control: 'radio', options: ['light', 'accent'] },
    size: { control: 'radio', options: ['md', 'lg'] },
  },
  decorators: [(Story) => <div style={{ padding: 24, background: 'var(--surface-mist)' }}><Story /></div>],
} satisfies Meta<typeof PricingCard>

export default meta
type Story = StoryObj<typeof meta>

export const Spark: Story = {
  args: {
    tone: 'light',
    size: 'md',
    title: 'Spark',
    description: ['Turn a focused idea into something real and demoable', 'now.'],
    rows: [
      { label: 'PRICE', value: '$ 5,000', price: true },
      { label: 'TIMELINE', value: '5 working days' },
      { label: 'SCOPE', value: '1 core workflow' },
      { label: 'DESIGN', value: 'Toolkit-driven' },
      { label: 'BEST FOR', value: 'Get the idea real and demoable' },
    ],
  },
}

export const Forge: Story = {
  args: {
    tone: 'accent',
    size: 'md',
    title: 'Forge',
    description: ['A broader functional surface and more design attention', 'for pilots or fundraising.'],
    rows: [
      { label: 'PRICE', value: '$ 9,000', price: true },
      { label: 'TIMELINE', value: '10 working days' },
      { label: 'SCOPE', value: '2–3 connected workflows' },
      { label: 'DESIGN', value: 'Light design layer + senior design review' },
      { label: 'BEST FOR', value: <>Build a broader surface for pilots or<br />fundraising</> },
    ],
  },
}

export const Summary: Story = {
  args: {
    tone: 'light',
    size: 'lg',
    rows: [
      { label: 'PRICE', value: '$ 9,000', price: true },
      { label: 'TIMELINE', value: '10 working days' },
      { label: 'SCOPE', value: '1 core workflow' },
      { label: 'DESIGN', value: 'Light design layer + senior design review' },
    ],
  },
}
