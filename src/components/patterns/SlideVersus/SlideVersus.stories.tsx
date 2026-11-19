import type { Meta, StoryObj } from '@/components/story'
import { SlideVersus } from './SlideVersus'

const meta = {
  title: 'Patterns/SlideVersus',
  component: SlideVersus,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideVersus>

export default meta
type Story = StoryObj<typeof meta>

/** Sample copy. */
export const Default: Story = {
  args: {
    eyebrow: 'SAMPLE COPY | OPTIONS',
    title: 'In-house hire',
    accent: 'vs Vinta squad',
    left: {
      title: 'In-house hire',
      items: [
        '6 to 9 months to hire and ramp up',
        'Senior people pulled off the roadmap',
        'Delivery process built from scratch',
        'Key knowledge sits with a few people',
      ],
    },
    right: {
      title: 'Vinta squad',
      items: [
        'A squad ready in 2 to 3 weeks',
        'Senior engineers and a PM from day one',
        'Weekly demos from week 1',
        'Two engineers know every module',
      ],
    },
  },
}
