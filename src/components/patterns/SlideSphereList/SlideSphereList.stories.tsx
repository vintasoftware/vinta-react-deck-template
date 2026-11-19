import type { Meta, StoryObj } from '@storybook/react-vite'
import { House, MessageSquareText, Lightbulb, Clock, CalendarCheck, Star } from 'lucide-react'
import { SlideSphereList } from './SlideSphereList'

const meta = {
  title: 'Patterns/SlideSphereList',
  component: SlideSphereList,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: { emphasis: { control: 'radio', options: ['title', 'number'] } },
} satisfies Meta<typeof SlideSphereList>

export default meta
type Story = StoryObj<typeof meta>

export const Agenda: Story = {
  args: {
    emphasis: 'title',
    eyebrow: 'NORTHWIND HEALTH · KICKOFF',
    title: 'Today’s',
    accent: 'agenda',
    lede: 'Four topics, 60 minutes, one decision at the end.',
    items: [
      { icon: House, title: 'Where we are today', detail: 'The product, the team and the constraints', meta: '10 MIN' },
      { icon: MessageSquareText, title: 'What we heard from you', detail: 'Goals, risks and open questions', meta: '15 MIN' },
      { icon: Lightbulb, title: 'Our proposed approach', detail: 'Validate, harden and launch a reliable V1', meta: '20 MIN' },
      { icon: Clock, title: 'Timeline and investment', detail: 'Sprints, team and next steps', meta: '15 MIN' },
    ],
  },
}

export const Stats: Story = {
  args: {
    emphasis: 'number',
    eyebrow: 'RESULTS',
    title: 'What it',
    accent: 'delivered',
    lede: 'The first release, measured one quarter after launch.',
    items: [
      { icon: Clock, title: '9 weeks', detail: 'From kickoff to launch' },
      { icon: CalendarCheck, title: '38%', detail: 'Fewer no-shows after launch' },
      { icon: Star, title: '4.7', detail: 'Patient app rating' },
    ],
  },
}
