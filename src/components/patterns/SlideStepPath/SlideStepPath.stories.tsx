import type { Meta, StoryObj } from '@/components/story'
import { Search, ClipboardList, CodeXml, KeyRound, Send } from 'lucide-react'
import { SlideStepPath } from './SlideStepPath'

const meta = {
  title: 'Patterns/SlideStepPath',
  component: SlideStepPath,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideStepPath>

export default meta
type Story = StoryObj<typeof meta>

export const ThreeSteps: Story = {
  args: {
    eyebrow: 'HOW IT WORKS',
    title: 'Kickoff to handoff',
    accent: 'in three weeks',
    steps: [
      { icon: Search, label: 'DAY 1', title: 'Kickoff', text: 'We walk through the starter and align on each block and the integration.' },
      { icon: CodeXml, label: 'WEEKS 1–2', title: 'Build', text: 'We build what was agreed, with regular check-ins to keep progress in step.' },
      { icon: Send, label: 'WEEK 3', title: 'Handoff', text: 'We hand over access, code, docs and a video walkthrough of the platform.' },
    ],
  },
}

export const FourSteps: Story = {
  args: {
    eyebrow: 'HOW IT WORKS',
    title: 'Kickoff to handoff',
    accent: 'in four weeks',
    steps: [
      { icon: Search, label: 'DAY 1', title: 'Kickoff', text: 'We walk through the starter and align on each block and the integration.' },
      { icon: ClipboardList, label: 'WEEK 1', title: 'Close the scope', text: 'We agree on the light customizations, configuration and the integration.' },
      { icon: CodeXml, label: 'WEEKS 2–3', title: 'Build', text: 'We build what was agreed, with regular check-ins to keep progress in step.' },
      { icon: Send, label: 'WEEK 4', title: 'Handoff', text: 'We verify the hardened base and hand over access, code, docs and a video.' },
    ],
  },
}

export const FiveSteps: Story = {
  args: {
    eyebrow: 'HOW IT WORKS',
    title: 'Kickoff to handoff',
    accent: 'in five weeks',
    steps: [
      { icon: Search, label: 'DAY 1', title: 'Kickoff', text: 'Walk through the starter and align on each block.' },
      { icon: ClipboardList, label: 'WEEK 1', title: 'Scope', text: 'Agree on customizations and the integration.' },
      { icon: CodeXml, label: 'WEEKS 2–3', title: 'Build', text: 'Build what was agreed, with weekly check-ins.' },
      { icon: KeyRound, label: 'WEEK 4', title: 'Harden', text: 'Security review, audit trails and load tests.' },
      { icon: Send, label: 'WEEK 5', title: 'Handoff', text: 'Hand over access, code, docs and a walkthrough.' },
    ],
  },
}
