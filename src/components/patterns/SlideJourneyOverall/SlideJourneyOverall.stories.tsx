import type { Meta, StoryObj } from '@storybook/react-vite'
import { SlideJourneyOverall } from './SlideJourneyOverall'

const meta = {
  title: 'Patterns/SlideJourneyOverall',
  component: SlideJourneyOverall,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideJourneyOverall>

export default meta
type Story = StoryObj<typeof meta>

const A = '/assets/journey-overall'
const badge = (n: number) => <img src={`${A}/phase-0${n}.svg`} alt="" width={155} height={155} />

/** Figma copy (427:878): 4 phases in an arc, exported seals */
export const TheJourney: Story = {
  name: 'The Journey',
  args: {
    title: ['The', 'Journey'],
    subtitle: (
      <>
        We start with a quick
        <br />
        <strong>Product Discovery</strong> aiming
        <br />
        for a <strong>Long-Term Product</strong>
        <br />
        <strong>Partnership</strong>
      </>
    ),
    steps: [
      { weeks: 2, title: ['product', 'discovery'], badge: badge(1) },
      { weeks: 3, title: ['DESIGN &', 'DEVELOPMENT'], badge: badge(2) },
      { weeks: 2, title: ['mvp', 'launch'], badge: badge(3) },
      { weeks: 2, title: ['continuous', 'partnership'], badge: badge(4) },
    ],
  },
}
