import type { Meta, StoryObj } from '@/components/story'
import { Users, KeyRound, CalendarCheck, Handshake, MessageSquareText, ClipboardPenLine, Blocks } from 'lucide-react'
import { SlidePointsPhoto } from './SlidePointsPhoto'

const meta = {
  title: 'Patterns/SlidePointsPhoto',
  component: SlidePointsPhoto,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: { frame: { control: 'radio', options: ['bleed', 'card'] } },
} satisfies Meta<typeof SlidePointsPhoto>

export default meta
type Story = StoryObj<typeof meta>

export const Bleed: Story = {
  args: {
    frame: 'bleed',
    eyebrow: 'WHY VINTA',
    title: 'Why healthcare teams',
    accent: 'build with us',
    photo: '/assets/team/points.webp',
    photoAlt: 'Three engineers around two laptops',
    points: [
      { icon: Users, title: 'Senior engineers only', text: 'The people you meet are the people who build.' },
      { icon: KeyRound, title: 'Security from sprint one', text: 'Access control and audit trails from the first sprint.' },
      { icon: CalendarCheck, title: 'Live in four weeks', text: 'A working product with real users before the scope grows.' },
      { icon: Handshake, title: 'A partner after launch', text: 'Support and the next release, with the same team.' },
    ],
  },
}

export const Card: Story = {
  args: {
    frame: 'card',
    eyebrow: 'WHAT WE DO',
    title: 'Services that',
    accent: 'fit your stack',
    photo: '/assets/team/rich-list.webp',
    photoAlt: 'Three colleagues on a sofa',
    points: [
      { icon: MessageSquareText, title: 'AI agents and LLM integrations', text: 'Agents that support patients and care teams.' },
      { icon: ClipboardPenLine, title: 'EHR development', text: 'A new clinical platform, or a modern one you already run.' },
      { icon: Blocks, title: 'Medplum development', text: 'Senior engineers fluent in Medplum and FHIR.' },
    ],
  },
}
