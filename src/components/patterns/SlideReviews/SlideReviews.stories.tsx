import type { Meta, StoryObj } from '@/components/story'
import { SlideReviews } from './SlideReviews'

const meta = {
  title: 'Patterns/SlideReviews',
  component: SlideReviews,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideReviews>

export default meta
type Story = StoryObj<typeof meta>

export const ThreeReviews: Story = {
  args: {
    eyebrow: 'OUR REVIEWS',
    title: 'Why healthcare teams',
    accent: 'keep building with us',
    reviews: [
      {
        quote: 'They knew FHIR better than our vendor did.',
        name: 'Dana Whitfield',
        role: 'CTO, Northwind Health',
      },
      {
        highlight: true,
        quote: 'Patients now book in two taps instead of a phone call.',
        name: 'Marcus Leong',
        role: 'VP Product, Brightpath',
      },
      {
        quote: 'Our intake form went from 14 screens to 4.',
        name: 'Elena Duarte',
        role: 'COO, Clearwater Care',
      },
    ],
  },
}
