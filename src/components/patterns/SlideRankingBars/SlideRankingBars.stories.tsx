import type { Meta, StoryObj } from '@/components/story'
import { Target } from 'lucide-react'
import { SlideRankingBars } from './SlideRankingBars'

const meta = {
  title: 'Patterns/SlideRankingBars',
  component: SlideRankingBars,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideRankingBars>

export default meta
type Story = StoryObj<typeof meta>

/** Original sample content (fictional data). */
export const Default: Story = {
  args: {
    eyebrow: 'SAMPLE DATA | LOST DEALS',
    title: 'Why deals are lost',
    accent: 'ranked by share',
    rows: [
      { label: 'Budget', value: 28, valueLabel: '28% · 10' },
      { label: 'No decision yet', value: 22, valueLabel: '22% · 8' },
      { label: 'Chose another vendor', value: 19, valueLabel: '19% · 7' },
      { label: 'Built in-house', value: 14, valueLabel: '14% · 5' },
      { label: 'Timing', value: 11, valueLabel: '11% · 4' },
      { label: 'Other', value: 6, valueLabel: '6% · 2' },
    ],
    callout: { icon: Target, value: '28%', text: 'of lost deals cite budget, the top reason by far.' },
  },
}

export const WithoutCallout: Story = {
  args: {
    eyebrow: 'SAMPLE DATA | SUPPORT',
    title: 'What patients ask about',
    accent: 'top topics',
    rows: [
      { label: 'Billing', value: 34 },
      { label: 'Rescheduling', value: 27 },
      { label: 'Lab results', value: 18 },
      { label: 'Prescriptions', value: 13 },
      { label: 'Other', value: 8 },
    ],
  },
}
