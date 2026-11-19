import type { Meta, StoryObj } from '@/components/story'
import { SlideTeamPhotos } from './SlideTeamPhotos'

const meta = {
  title: 'Patterns/SlideTeamPhotos',
  component: SlideTeamPhotos,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideTeamPhotos>

export default meta
type Story = StoryObj<typeof meta>

const T = '/assets/team'

export const Three: Story = {
  args: {
    eyebrow: 'YOUR TEAM',
    title: 'The people',
    accent: 'who will build it',
    lede: 'A small senior team that stays with you from the first sprint to launch.',
    people: [
      { photo: `${T}/teamph-1.webp`, role: 'ENGAGEMENT LEAD', name: 'Jordan Rivera', text: 'Ten years shipping regulated software.' },
      { photo: `${T}/teamph-2.webp`, role: 'STAFF ENGINEER', name: 'Sam Carter', text: 'Owns architecture and delivery quality.' },
      { photo: `${T}/teamph-3.webp`, role: 'PRODUCT DESIGNER', name: 'Priya Nair', text: 'Turns messy workflows into clear screens.' },
    ],
  },
}

export const Four: Story = {
  args: {
    ...Three.args,
    people: [
      ...Three.args!.people!,
      { role: 'QA ENGINEER', name: 'Alex Moreau', text: 'Keeps every release safe to ship.' },
    ],
  },
}
