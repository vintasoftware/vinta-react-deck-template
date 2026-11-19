import type { Meta, StoryObj } from '@storybook/react-vite'
import { SlideBeforeAfter } from './SlideBeforeAfter'

const meta = {
  title: 'Patterns/SlideBeforeAfter',
  component: SlideBeforeAfter,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideBeforeAfter>

export default meta
type Story = StoryObj<typeof meta>

/** Sample data is fictional. */
export const Default: Story = {
  args: {
    eyebrow: 'SAMPLE DATA | RESULTS',
    title: 'Before and after',
    accent: 'the new process',
    rows: [
      { label: 'Release cycle', before: 6, after: 2, unit: 'weeks', delta: '−67%' },
      { label: 'Open bugs', before: 50, after: 12, unit: 'bugs', delta: '−76%' },
      { label: 'Onboarding time', before: 14, after: 3, unit: 'days', delta: '−79%' },
    ],
  },
}

/** Delta computed from the values; an increase gets "+". */
export const ComputedDelta: Story = {
  args: {
    ...Default.args,
    rows: [
      { label: 'Page load', before: 4.2, after: 1.1, unit: 's' },
      { label: 'Deploys per week', before: 2, after: 9, unit: 'deploys' },
    ],
  },
}
