import type { Meta, StoryObj } from '@storybook/react-vite'
import { SlideBarChart } from './SlideBarChart'

const meta = {
  title: 'Patterns/SlideBarChart',
  component: SlideBarChart,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideBarChart>

export default meta
type Story = StoryObj<typeof meta>

const quarters = (values: number[], projectLast = false) =>
  values.map((value, i) => ({ label: `Q${i + 1}`, value, projected: projectLast && i === values.length - 1 }))

/** Original sample content (fictional data). */
export const Default: Story = {
  args: {
    eyebrow: 'SAMPLE DATA | DELIVERY',
    title: 'Projects delivered by quarter',
    accent: 'year over year',
    groups: [
      { label: '2024', bars: quarters([4, 6, 8, 9]) },
      { label: '2025', bars: quarters([9, 11, 10, 14]) },
      { label: '2026', bars: quarters([12, 15, 16, 13], true) },
    ],
    legend: { actual: 'Projects delivered', projected: '* Projected at the current pace' },
  },
}

export const TwoGroups: Story = {
  args: {
    eyebrow: 'SAMPLE DATA | SUPPORT',
    title: 'Tickets closed per quarter',
    accent: 'half the backlog',
    groups: [
      { label: '2025', bars: quarters([42, 38, 51, 47]) },
      { label: '2026', bars: quarters([55, 61, 66, 70], true) },
    ],
    legend: { actual: 'Tickets closed', projected: '* Projected at the current pace' },
  },
}
