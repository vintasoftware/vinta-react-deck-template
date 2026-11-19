import type { Meta, StoryObj } from '@/components/story'
import { SlideInvestmentPlans } from './SlideInvestmentPlans'

const meta = {
  title: 'Patterns/SlideInvestmentPlans',
  component: SlideInvestmentPlans,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideInvestmentPlans>

export default meta
type Story = StoryObj<typeof meta>

/** Content and assets of frame 427:1384 (Investment proposal | 01) */
export const InvestmentProposal01: Story = {
  name: 'Investment proposal | 01',
  args: {
    kicker: 'MVP AI FAST-TRACK — INVESTMENT',
    title: 'Choose the sprint that fits your goal',
    background: <img src="/assets/shared/sprint-background.svg" alt="" />,
    footerStrip: <img src="/assets/shared/footer-strip-14.svg" alt="" />,
    plans: [
      {
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
      {
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
    ],
  },
}
