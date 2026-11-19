import type { Meta, StoryObj } from '@storybook/react-vite'
import { Compass, CodeXml, Send } from 'lucide-react'
import { SlidePhotoBand } from './SlidePhotoBand'

const meta = {
  title: 'Patterns/SlidePhotoBand',
  component: SlidePhotoBand,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlidePhotoBand>

export default meta
type Story = StoryObj<typeof meta>

export const ThreeCards: Story = {
  args: {
    photo: '/assets/team/rich-band.webp',
    photoAlt: 'Three people standing together',
    eyebrow: 'HOW WE WORK',
    title: 'Three steps',
    accent: 'from idea to launch',
    cards: [
      { icon: Compass, title: 'Discover', text: 'Map the problem, the users and the golden path.' },
      { icon: CodeXml, title: 'Build', text: 'Ship a working V1 in weeks, with real data.' },
      { icon: Send, title: 'Launch', text: 'Harden, hand over and plan what comes next.' },
    ],
  },
}
