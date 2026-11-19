import type { Meta, StoryObj } from '@storybook/react-vite'
import { SlideStackedBars } from './SlideStackedBars'

const meta = {
  title: 'Patterns/SlideStackedBars',
  component: SlideStackedBars,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideStackedBars>

export default meta
type Story = StoryObj<typeof meta>

/** Original sample content (fictional data). */
export const Default: Story = {
  args: {
    eyebrow: 'SAMPLE DATA | PIPELINE',
    title: 'Where our projects come from',
    accent: 'share of deals by year',
    columns: [
      { label: '2023', caption: '24 deals' },
      { label: '2024', caption: '34 deals' },
      { label: '2025', caption: '46 deals' },
      { label: '2026 YTD', caption: '39 deals' },
    ],
    series: [
      { label: 'Referral', values: [45, 56, 62, 50] },
      { label: 'Inbound', values: [25, 24, 22, 32] },
      { label: 'Partners', values: [22, 12, 8, 10] },
      { label: 'Outbound', values: [8, 8, 8, 8] },
    ],
  },
}

export const ThreeSeries: Story = {
  args: {
    eyebrow: 'SAMPLE DATA | EFFORT',
    title: 'Where the sprint hours go',
    accent: 'by phase',
    columns: [{ label: 'DISCOVERY' }, { label: 'BUILD' }, { label: 'LAUNCH' }],
    series: [
      { label: 'Engineering', values: [30, 65, 50] },
      { label: 'Design', values: [45, 20, 15] },
      { label: 'QA', values: [25, 15, 35], color: 'turquoise' },
    ],
  },
}
