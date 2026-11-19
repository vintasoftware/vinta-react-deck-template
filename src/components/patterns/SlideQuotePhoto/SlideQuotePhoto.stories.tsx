import type { Meta, StoryObj } from '@storybook/react-vite'
import { SlideQuotePhoto } from './SlideQuotePhoto'

const meta = {
  title: 'Patterns/SlideQuotePhoto',
  component: SlideQuotePhoto,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: { variant: { control: 'radio', options: ['bleed', 'portrait'] } },
} satisfies Meta<typeof SlideQuotePhoto>

export default meta
type Story = StoryObj<typeof meta>

export const Bleed: Story = {
  args: {
    variant: 'bleed',
    eyebrow: 'CLIENT VOICE',
    quote: 'Billing closes the same day now; it used to take a week.',
    author: 'Alex Morgan',
    role: 'CTO, NORTHWIND HEALTH',
    // No team photo here: a Vinta photo never goes next to a client's name (CLAUDE.md §8). Pass the client's own portrait.
  },
}

export const Portrait: Story = {
  args: {
    variant: 'portrait',
    eyebrow: 'CLIENT VOICE',
    quote: 'The first clinic was live in nine weeks and the other eleven followed the plan.',
    author: 'Alex Morgan',
    role: 'CTO, NORTHWIND HEALTH',
    // No team photo here: a Vinta photo never goes next to a client's name (CLAUDE.md §8). Pass the client's own portrait.
  },
}
