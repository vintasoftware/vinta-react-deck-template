import type { Meta, StoryObj } from '@/components/story'
import { GitBranch, Bot, KeyRound, CalendarCheck } from 'lucide-react'
import { SlideFeatureCards } from './SlideFeatureCards'

const meta = {
  title: 'Patterns/SlideFeatureCards',
  component: SlideFeatureCards,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideFeatureCards>

export default meta
type Story = StoryObj<typeof meta>

const T = '/assets/team'

export const ThreeCards: Story = {
  args: {
    eyebrow: 'WHAT YOU GET',
    title: 'Built around',
    accent: 'your care model',
    cards: [
      { photo: `${T}/card-a.webp`, icon: GitBranch, title: 'Starter you can fork', text: 'A working app on day one, set up for your care model.' },
      { photo: `${T}/card-b.webp`, icon: Bot, title: 'AI where it helps', text: 'Agents grounded in each record, with a human in the loop.' },
      { photo: `${T}/card-c.webp`, icon: KeyRound, title: 'Security from sprint one', text: 'Access control and audit trails from the first sprint.' },
    ],
  },
}

export const FourCards: Story = {
  args: {
    ...ThreeCards.args,
    cards: [
      ...ThreeCards.args!.cards!,
      { photo: `${T}/rich-glass-a.webp`, icon: CalendarCheck, title: 'Live in four weeks', text: 'Real users on the product before the scope grows.' },
    ],
  },
}
