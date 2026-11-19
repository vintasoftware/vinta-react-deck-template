import type { Meta, StoryObj } from '@/components/story'
import { SlideProductShowcase } from './SlideProductShowcase'

const meta = {
  title: 'Patterns/SlideProductShowcase',
  component: SlideProductShowcase,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideProductShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    eyebrow: 'PROVIDER EXPERIENCE',
    title: 'Same block,',
    accent: 'a new product each time',
    lede: 'Each block is a workflow we keep refining. Your care model decides how they come together.',
  },
}
