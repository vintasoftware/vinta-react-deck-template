import type { Meta, StoryObj } from '@/components/story'
import { SlideQuote } from './SlideQuote'

const meta = {
  title: 'Patterns/SlideQuote',
  component: SlideQuote,
  parameters: { layout: 'fullscreen' },
  argTypes: { tone: { control: 'radio', options: ['light', 'tint', 'invert-blue', 'invert-navy', 'vivid'] } },
} satisfies Meta<typeof SlideQuote>

export default meta
type Story = StoryObj<typeof meta>

const base = {
  author: 'Alex Morgan',
  role: 'CTO, EXAMPLE HEALTH',
  logo: { name: 'Example Health', width: 240, height: 44 },
}

const quote = 'Lab results reach patients the same afternoon; before, the front desk called each one.'

/** Blue mesh (default tone), full-width quote. */
export const InvertBlue: Story = { args: { ...base, quote } }
/** Wash background. */
export const Light: Story = { args: { ...base, tone: 'light', quote } }
/** Night background. */
export const InvertNavy: Story = { args: { ...base, tone: 'invert-navy', quote } }
/** `tone="vivid"`: wash with the portrait on the violet panel. */
export const Vivid: Story = {
  args: {
    ...base,
    tone: 'vivid',
    quote,
    // No team photo here: a Vinta photo never goes next to a client's name (CLAUDE.md §8). Pass the client's own portrait.
  },
}
