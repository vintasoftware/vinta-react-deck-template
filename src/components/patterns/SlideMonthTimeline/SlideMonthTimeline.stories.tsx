import type { Meta, StoryObj } from '@storybook/react-vite'
import { SlideMonthTimeline } from './SlideMonthTimeline'

const meta = {
  title: 'Patterns/SlideMonthTimeline',
  component: SlideMonthTimeline,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideMonthTimeline>

export default meta
type Story = StoryObj<typeof meta>

/** A quarter month by month, with four floating bars (fictional plan). */
export const Quarter: Story = {
  args: {
    eyebrow: 'SAMPLE COPY · Q1 · JANUARY TO MARCH',
    title: 'Q1 revolves around the conference',
    columns: [
      { label: 'January', items: ['Conference communication plan', 'Side-event logistics', 'Product marketing supporting the EHR launch', 'Plan the video testimonials, 2 to 3 per quarter'] },
      { label: 'February', items: ['Conference communication plan', 'Side-event invitations', 'Define the next-step offer after discovery'] },
      { label: 'March', items: ['Pre- and post-conference communication', 'Post-conference follow-ups'] },
    ],
    bars: [
      { label: 'Northwind Health signed', from: 0 },
      { label: 'Nurture sequence for the middle of the funnel', from: 0 },
      { label: 'Reactivation campaign', from: 0, to: 1 },
      { label: 'Conference in Nashville, March 14 to 17, with a side event', from: 2 },
    ],
  },
}

/** Four phases with no bars and a two-line title. */
export const FourPhases: Story = {
  args: {
    eyebrow: 'SAMPLE COPY · ROLLOUT',
    title: 'Twelve clinics',
    accent: 'in four waves',
    columns: [
      { label: 'Wave 1', items: ['Two pilot clinics', 'Intake and scheduling live', 'Weekly feedback sessions'] },
      { label: 'Wave 2', items: ['Four more clinics', 'Results and messaging', 'Train the front desk'] },
      { label: 'Wave 3', items: ['Remaining six clinics', 'Billing on the new platform'] },
      { label: 'Wave 4', items: ['Retire the old portal', 'Handover and runbook'] },
    ],
    grid: true,
  },
}
