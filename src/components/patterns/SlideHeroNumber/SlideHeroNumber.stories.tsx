import type { Meta, StoryObj } from '@/components/story'
import { SlideHeroNumber } from './SlideHeroNumber'

const meta = {
  title: 'Patterns/SlideHeroNumber',
  component: SlideHeroNumber,
  parameters: { layout: 'fullscreen' },
  argTypes: { background: { control: 'radio', options: ['mesh', 'night'] } },
} satisfies Meta<typeof SlideHeroNumber>

export default meta
type Story = StoryObj<typeof meta>

/** Sample data is fictional. */
export const Default: Story = {
  args: {
    eyebrow: 'KEY FINDING | SAMPLE',
    title: 'Output fell by half while',
    accent: 'demand stayed flat',
    previous: '37',
    value: '17',
    caption: 'articles published, 2025 vs 2026 so far',
    points: [
      'Content output fell exactly where inbound depends on it.',
      'Inbound brings volume, but fewer deals reach the final stages.',
    ],
  },
}

export const BeforeAfterNight: Story = {
  args: {
    eyebrow: 'KEY FINDING | SAMPLE',
    title: 'Releases now ship',
    accent: 'every week',
    previous: '3',
    value: '13',
    caption: 'releases per quarter, before and after the engagement',
    points: ['Smaller releases made every review faster.', 'Rollbacks dropped to one in the last quarter.'],
    background: 'night',
  },
}
