import type { Meta, StoryObj } from '@storybook/react-vite'
import { Blocks, CalendarCheck, KeyRound } from 'lucide-react'
import { SlideStatCards } from './SlideStatCards'

const meta = {
  title: 'Patterns/SlideStatCards',
  component: SlideStatCards,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideStatCards>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    eyebrow: 'IN NUMBERS',
    title: 'Three numbers behind',
    accent: 'the four-week MVP',
    lede: 'The blocks we start from, the time to a live product and who owns the code at the end.',
    stats: [
      { icon: Blocks, value: '42', label: 'BUILDING BLOCKS' },
      { icon: CalendarCheck, value: '4 wks', label: 'TO A LIVE PRODUCT' },
      { icon: KeyRound, value: 'Yours', label: 'THE REPO FROM DAY ONE' },
    ],
  },
}
