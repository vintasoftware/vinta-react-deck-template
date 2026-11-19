import type { Meta, StoryObj } from '@/components/story'
import { SlideFaq } from './SlideFaq'

const meta = {
  title: 'Patterns/SlideFaq',
  component: SlideFaq,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: { open: { control: { type: 'number', min: 0, max: 5 } } },
} satisfies Meta<typeof SlideFaq>

export default meta
type Story = StoryObj<typeof meta>

const fastTrack = [
  {
    question: 'What is the MVP AI Fast-track?',
    answer:
      'A fixed-price service to build a working healthcare MVP in 4 weeks. A product manager, a developer and a designer use AI agents on healthcare-ready foundations, on a HIPAA-ready, FHIR-native stack.',
  },
  {
    question: 'How much does it cost?',
    answer: 'One fixed price for the four weeks, agreed before we start. No hourly billing and no surprise change orders.',
  },
  {
    question: 'How long does it take?',
    answer: 'Four weeks from kickoff to handoff, with a demo at the end of every week so you can steer what comes next.',
  },
  {
    question: 'What does the sprint cover?',
    answer: 'Mapping, scoping, the build on proven blocks, a reality check with real users and a handoff with a plan to launch.',
  },
  {
    question: 'Who is it for?',
    answer: 'Founders and product teams who need a working product in front of users before they raise or hire.',
  },
  {
    question: 'Do I need a spec to start?',
    answer: 'No. The first two days map your users and workflows with you; the spec comes out of that.',
  },
]

/** The site's Fast-track FAQ: six questions, the first one open. */
export const SixQuestions: Story = {
  args: {
    title: 'Questions,',
    accent: 'answered plainly',
    lede: 'Straight answers on timing, price, data and what you own at the end.',
    items: fastTrack,
    open: 0,
  },
}

/** Same slide with another answer open: one slide per question you want to walk through. */
export const ThirdOpen: Story = {
  args: { ...SixQuestions.args, open: 2 },
}

/** EHR page: a three-line title and four questions. */
export const FourQuestions: Story = {
  args: {
    title: 'Questions about',
    accent: 'building an EHR',
    lede: 'Straight answers on choosing, building and migrating.',
    open: 1,
    items: [
      {
        question: 'Off-the-shelf EHR or custom development?',
        answer: 'Start from the workflows you need to support. We compare how each option handles your specialty, billing and integrations, including recurring costs, before recommending a path.',
      },
      {
        question: 'Do we need to replace our entire EHR?',
        answer:
          'Usually not. We move one proven workflow at a time, so the old system keeps running until each part of the new one is stable. You decide when to retire it.',
      },
      {
        question: 'Can you assess a legacy system first?',
        answer: 'Yes. A short discovery maps the system, its data and its risks, and ends with a recommendation and an estimate.',
      },
      {
        question: 'Can we validate a smaller product first?',
        answer: 'Yes. Many teams start with one workflow or an MVP, prove it with users and grow from there.',
      },
    ],
  },
}
