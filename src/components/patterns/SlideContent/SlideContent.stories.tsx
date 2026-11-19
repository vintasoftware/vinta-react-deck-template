import type { Meta, StoryObj } from '@/components/story'
import { Stethoscope, KeyRound, Users, Handshake } from 'lucide-react'
import { SlideContent } from './SlideContent'
import { Highlight } from '../../elements/Highlight'

const meta = {
  title: 'Patterns/SlideContent',
  component: SlideContent,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    tone: { control: 'radio', options: ['light', 'tint', 'invert-blue', 'invert-navy', 'vivid'] },
    bulletVariant: { control: 'radio', options: ['dot', 'check', 'number'] },
  },
} satisfies Meta<typeof SlideContent>

export default meta
type Story = StoryObj<typeof meta>

const base = {
  eyebrow: 'WHY VINTA',
  title: 'Senior engineers,',
  accent: 'a V1 in 10 weeks',
  lede: 'The engineers you meet in the first call build the product and stay after launch.',
  bullets: [
    'A working V1 in front of real users by week 10',
    'Access control and audit trail from the first sprint',
    'The same senior engineers from kickoff to launch',
    'Support and the next release with the same team',
  ],
}

/** Wash background, photo and a white card of points (dots). */
export const Light: Story = { args: { ...base, photo: '/assets/team/content.webp', photoAlt: 'Vinta team at a table among plants' } }
/** bulletVariant="number": numbered circles joined by a line; no photo, so the card sits centered. */
export const Numbered: Story = {
  args: {
    eyebrow: 'OUR APPROACH',
    title: 'A launch built',
    accent: 'step by step',
    lede: 'We start small, learn from real users, then scale what works.',
    bullets: [
      'Weeks 1-2: map the journeys with your team and agree on scope',
      'Weeks 3-6: build the core flows on a secure foundation',
      'Weeks 7-8: pilot with real users and harden the product',
      'Weeks 9-10: roll out with training and support',
    ],
    bulletVariant: 'number',
  },
}
/** bulletVariant="check": one icon tile per point (the only story that uses tiles). */
export const IconTiles: Story = {
  args: { ...base, bulletVariant: 'check', bulletIcons: [Stethoscope, KeyRound, Users, Handshake] },
}
/** Night background, glass card. */
export const InvertNavy: Story = { args: { ...base, tone: 'invert-navy' } }
/** Back-compat: `tone="vivid"` (blue mesh), title as an array of lines with a `<Highlight>`. */
export const Vivid: Story = {
  args: {
    ...base,
    tone: 'vivid',
    accent: undefined,
    title: ['Senior engineers,', <Highlight mode="invert-blue">a V1 in 10 weeks</Highlight>],
    photo: '/assets/team/content.webp',
    photoAlt: 'Vinta team at a table among plants',
  },
}
