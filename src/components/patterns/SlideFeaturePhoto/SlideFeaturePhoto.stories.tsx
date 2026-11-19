import type { Meta, StoryObj } from '@/components/story'
import { Stethoscope, CalendarCheck, KeyRound } from 'lucide-react'
import { SlideFeaturePhoto } from './SlideFeaturePhoto'

const meta = {
  title: 'Patterns/SlideFeaturePhoto',
  component: SlideFeaturePhoto,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideFeaturePhoto>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    eyebrow: 'PROVIDER APP FORK',
    title: 'Your own EHR,',
    accent: 'live in one month',
    points: [
      { icon: Stethoscope, text: 'A live EHR, configured to how your care model works' },
      { icon: CalendarCheck, text: 'A fixed budget and a known date, about four weeks' },
      { icon: KeyRound, text: 'The repository is yours from day one' },
    ],
    photo: '/assets/team/rich-feature.webp',
    photoAlt: 'Vinta team working together',
    stat: { label: 'TIME TO LAUNCH', value: '4 weeks' },
  },
}
