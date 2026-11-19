import type { Meta, StoryObj } from '@/components/story'
import { SlideNumberedList } from './SlideNumberedList'

const meta = {
  title: 'Patterns/SlideNumberedList',
  component: SlideNumberedList,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideNumberedList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    eyebrow: 'HOW WE WORK',
    title: 'The team habits',
    accent: 'that shape our work',
    lede: 'Four habits we hold each other to on every project.',
    items: [
      { title: 'Own the outcome', text: 'We take responsibility for context, raise risks early and keep the work moving.' },
      { title: 'Question the obvious', text: 'We challenge assumptions and look for simpler paths to hard problems.' },
      { title: 'Keep decisions visible', text: 'We document tradeoffs so you always know what is being built and why.' },
      { title: 'Build as one team', text: 'Clients, designers and engineers stay connected from the first sprint.' },
    ],
  },
}

export const ThreeStepsActive: Story = {
  args: {
    eyebrow: 'NEXT STEPS',
    title: 'From this call',
    accent: 'to a first release',
    lede: 'A short path to a plan you can take to your board, with no commitment until the scope is clear.',
    activeIndex: 0,
    items: [
      { title: 'Discovery workshop', text: 'Two sessions with your team to map workflows, users and constraints.' },
      { title: 'Scope and estimate', text: 'A prioritized first release with a timeline and a fixed budget range.' },
      { title: 'Kick-off', text: 'The team that estimated the work starts building it in the first sprint.' },
    ],
  },
}

export const FiveItems: Story = {
  args: {
    eyebrow: 'OUR PRINCIPLES',
    title: 'What you can expect',
    accent: 'from day one',
    lede: 'The same habits on every engagement, from a two-week sprint to a multi-year platform.',
    items: [
      { title: 'Senior people only', text: 'The engineers you meet are the ones who build.' },
      { title: 'Security by default', text: 'Access control and audit trails from the first sprint.' },
      { title: 'Weekly demos', text: 'Working software in front of you every week.' },
      { title: 'Shared backlog', text: 'One board, one source of truth for priorities.' },
      { title: 'Clean handover', text: 'Docs and runbooks your team can own on day one.' },
    ],
  },
}
