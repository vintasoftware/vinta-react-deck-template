import type { Meta, StoryObj } from '@storybook/react-vite'
import { SlideDonutChart } from './SlideDonutChart'

const meta = {
  title: 'Patterns/SlideDonutChart',
  component: SlideDonutChart,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideDonutChart>

export default meta
type Story = StoryObj<typeof meta>

/** Sample data is fictional. */
export const Default: Story = {
  args: {
    eyebrow: 'SAMPLE DATA | BUYERS',
    title: 'Deals by buyer persona',
    accent: 'in 2026',
    segments: [
      { label: 'Founder-led teams', value: 33, detail: '17 deals' },
      { label: 'Clinical owners', value: 31, detail: '16 deals' },
      { label: 'Technical leaders', value: 22, detail: '11 deals' },
      { label: 'Enterprise buyers', value: 14, detail: '7 deals' },
    ],
    takeaways: [
      'Founder-led teams are the biggest group and arrive mostly by referral.',
      'Clinical owners convert best when they see a working prototype.',
      'Enterprise buyers are few, but they come through partners every time.',
    ],
  },
}

export const WithoutTakeaways: Story = {
  args: {
    ...Default.args,
    segments: [
      { label: 'Referral', value: 48, detail: '22 deals' },
      { label: 'Inbound', value: 30, detail: '14 deals' },
      { label: 'Partners', value: 22, detail: '10 deals' },
    ],
    takeaways: undefined,
  },
}
