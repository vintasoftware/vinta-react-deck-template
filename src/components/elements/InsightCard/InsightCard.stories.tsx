import type { Meta, StoryObj } from '@storybook/react-vite'
import { InsightCard } from './InsightCard'

const meta = {
  title: 'Elements/InsightCard',
  component: InsightCard,
  parameters: { layout: 'centered' },
  argTypes: { tone: { control: 'radio', options: ['concern', 'recommendation'] } },
} satisfies Meta<typeof InsightCard>

export default meta
type Story = StoryObj<typeof meta>

export const Concern: Story = {
  args: {
    tone: 'concern',
    title: 'Inventory Management',
    lead: 'Largest operational and technical uncertainty in the current scope.',
    detail: 'Complexity may vary significantly depending on inventory workflows, compliance controls, and operational depth.',
  },
  decorators: [(Story) => <div style={{ width: 524, height: 370 }}><Story /></div>],
}

export const Recommendation: Story = {
  args: {
    tone: 'recommendation',
    title: 'Product Discovery',
    lead: 'Recommended to validate workflows, define MVP boundaries, and clarify implementation complexity before development begins.',
  },
  decorators: [(Story) => <div style={{ width: 524, height: 254 }}><Story /></div>],
}
