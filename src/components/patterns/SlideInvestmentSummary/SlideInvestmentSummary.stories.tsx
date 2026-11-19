import type { Meta, StoryObj } from '@storybook/react-vite'
import { SlideInvestmentSummary } from './SlideInvestmentSummary'

const meta = {
  title: 'Patterns/SlideInvestmentSummary',
  component: SlideInvestmentSummary,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideInvestmentSummary>

export default meta
type Story = StoryObj<typeof meta>

/** Content and assets of frame 427:1432 (Investment proposal | 02) */
export const InvestmentProposal02: Story = {
  name: 'Investment proposal | 02',
  args: {
    kicker: 'MVP AI FAST-TRACK',
    title: 'Investment',
    background: <img src="/assets/shared/sprint-background.svg" alt="" />,
    footerStrip: <img src="/assets/shared/footer-strip-14.svg" alt="" />,
    rows: [
      { label: 'PRICE', value: '$ 9,000', price: true },
      { label: 'TIMELINE', value: '10 working days' },
      { label: 'SCOPE', value: '1 core workflow' },
      { label: 'DESIGN', value: 'Light design layer + senior design review' },
    ],
    startDateLabel: 'START DATE:',
    startDate: 'August 24th',
  },
}
