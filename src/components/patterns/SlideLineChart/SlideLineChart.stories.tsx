import type { Meta, StoryObj } from '@storybook/react-vite'
import { SlideLineChart } from './SlideLineChart'

const meta = {
  title: 'Patterns/SlideLineChart',
  component: SlideLineChart,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideLineChart>

export default meta
type Story = StoryObj<typeof meta>

/** Original sample content (fictional data). */
export const Default: Story = {
  args: {
    eyebrow: 'SAMPLE DATA | VELOCITY',
    title: 'Delivery pace',
    accent: 'keeps climbing',
    labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'],
    primary: { label: 'Story points delivered', values: [12, 15, 14, 19, 22, 21, 27, 31] },
    reference: { label: 'Plan', values: [10, 11, 13, 12, 14, 16, 15, 18] },
    stats: [
      { value: '31', label: 'POINTS IN WEEK 8' },
      { value: '19', label: 'MORE POINTS THAN WEEK 1' },
    ],
  },
}

export const SixMonths: Story = {
  args: {
    eyebrow: 'SAMPLE DATA | ADOPTION',
    title: 'Weekly active clinics',
    accent: 'after launch',
    labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'],
    primary: { label: 'Active clinics', values: [40, 85, 130, 190, 260, 340] },
    reference: { label: 'Target', values: [50, 100, 150, 200, 250, 300] },
    stats: [
      { value: '340', label: 'CLINICS IN JUNE' },
      { value: '40', label: 'CLINICS ABOVE THE JUNE TARGET' },
    ],
  },
}
