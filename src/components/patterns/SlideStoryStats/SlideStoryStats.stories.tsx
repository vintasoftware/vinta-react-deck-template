import type { Meta, StoryObj } from '@storybook/react-vite'
import { SlideStoryStats } from './SlideStoryStats'

const meta = {
  title: 'Patterns/SlideStoryStats',
  component: SlideStoryStats,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideStoryStats>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    eyebrow: 'OUR STORY',
    title: 'Thirteen years of',
    accent: 'shipping software',
    paragraphs: [
      'We started in 2013 building Django products for US startups, and kept the same senior engineers as the work grew.',
      'Since then we have moved into healthcare: EHRs, patient apps and integrations that handle real PHI.',
    ],
    stats: [
      { value: '4.9/5', label: 'average rating on Clutch', link: true },
      { value: '13+', label: 'years delivering software' },
      { value: '60+', label: 'full-stack experts' },
      { value: '30+', label: 'healthcare products' },
    ],
    photo: '/assets/team/points.webp',
    photoAlt: 'Two engineers reviewing work at a laptop',
    photoPosition: '45% 50%',
    badge: 'SINCE 2013',
  },
}

export const OneParagraph: Story = {
  args: {
    eyebrow: 'WHO WE ARE',
    title: 'A product team',
    accent: 'for healthcare builders',
    paragraphs: [
      'We design and build clinical platforms, patient apps and integrations, with senior engineers who stay with your product after launch.',
    ],
    stats: [
      { value: '30+', label: 'healthcare products shipped' },
      { value: '13+', label: 'years delivering software' },
      { value: '60+', label: 'full-stack experts' },
      { value: '4.9/5', label: 'average rating on Clutch', link: true },
    ],
    photo: '/assets/team/rich-list.webp',
    photoAlt: 'Three colleagues around a laptop on a sofa',
    badge: 'SINCE 2013',
  },
}
