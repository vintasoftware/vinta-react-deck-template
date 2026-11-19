import type { Meta, StoryObj } from '@/components/story'
import { SlideNumberedGrid } from './SlideNumberedGrid'

const meta = {
  title: 'Patterns/SlideNumberedGrid',
  component: SlideNumberedGrid,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideNumberedGrid>

export default meta
type Story = StoryObj<typeof meta>

/** Four workstreams, 2 × 2 (fictional plan). */
export const FourCards: Story = {
  args: {
    eyebrow: 'SAMPLE COPY · ACTIONS · 01 INBOUND',
    title: 'Stay with the lead until it is ready to choose',
    cards: [
      { title: 'Content for leads still exploring', bullets: ['Top- and mid-funnel articles on specific workflows, produced with agents', 'Comparison tracks, such as Medplum versus other platforms', 'A decision tree that maps the path for each lead'] },
      { title: 'Help the lead prepare before the call', bullets: ['Timeline and budget calculators and checklists on the site', 'A quiz on the service pages that points to a path and captures the contact', 'A blog agent that sizes the project, still to validate'] },
      { title: 'Nurture until the moment of purchase', bullets: ['An e-mail sequence per journey stage, personalized with AI', 'A video that explains how we work and answers the common questions', 'Consulting material sent after the call'] },
      { title: 'Proposals that help the client decide', bullets: ['A live demo of the EHR and the building blocks, so the lead sees flows working', 'The middle path in build vs. buy: ready software with your own code', 'Something the lead can forward to partners and whoever approves the budget'] },
    ],
  },
}

/** Three cards in one row, with a two-line title. */
export const ThreeCards: Story = {
  args: {
    eyebrow: 'SAMPLE COPY · ACTIONS · 02 CONVERSION',
    title: 'Convert better',
    accent: 'and depend less on referrals',
    cards: FourCards.args.cards.slice(0, 3),
  },
}

/** Two cards side by side with the grid on. */
export const TwoCardsGrid: Story = {
  args: { ...ThreeCards.args, cards: FourCards.args.cards.slice(0, 2), grid: true },
}
