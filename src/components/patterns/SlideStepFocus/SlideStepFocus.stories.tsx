import type { Meta, StoryObj } from '@storybook/react-vite'
import { BookMarked, Compass, FileText, Layers, Users } from 'lucide-react'
import { SlideStepFocus, type FocusStep } from './SlideStepFocus'

const meta = {
  title: 'Patterns/SlideStepFocus',
  component: SlideStepFocus,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    variant: { control: 'radio', options: ['focus', 'stages'] },
    background: { control: 'radio', options: ['wash', 'mesh'] },
    active: { control: { type: 'number', min: 0, max: 4 } },
  },
} satisfies Meta<typeof SlideStepFocus>

export default meta
type Story = StoryObj<typeof meta>

/** The same steps on every slide of the sequence; only `active` changes. */
const sprint: FocusStep[] = [
  {
    label: 'Map',
    duration: 'DAYS 1–2',
    title: 'Start from the real problem',
    text: 'We map your users, your care model and the workflows the MVP has to prove.',
    yourPart: { text: 'A half-day war room and a 1-hour journey review.', note: '≈5 h of your time' },
  },
  {
    label: 'Shape',
    duration: 'DAYS 3–5',
    title: 'Shape the first release',
    text: 'The map becomes a scoped backlog and a clickable flow you can react to.',
    yourPart: { text: 'Two short reviews of the flow and the backlog.', note: '≈2 h of your time' },
  },
  {
    label: 'Build',
    duration: 'WEEKS 2–3',
    title: 'Build on proven blocks',
    text: 'AI agents write on FHIR-native blocks; a senior engineer reviews every change.',
    yourPart: { text: 'A weekly 30-minute demo to steer what comes next.', note: '≈1 h per week' },
  },
  {
    label: 'Reality Check',
    duration: 'WEEK 4',
    title: 'Put it in front of users',
    text: 'Providers and patients try the MVP on synthetic data, and we fix what breaks.',
    yourPart: { icon: Users, text: 'Invite three to five testers and join one session.', note: '≈3 h of your time' },
  },
  {
    label: 'Demo & Handoff',
    duration: 'WEEK 4',
    title: 'Own what we built',
    text: 'You get the running MVP, the code and a written plan to launch with real data.',
    yourPart: { text: 'A 1-hour demo and handoff call with your team.', note: '≈1 h of your time' },
  },
]

const sprintDeliverables = {
  title: 'At the end of the MVP AI Fast-track you get:',
  items: [
    { icon: Layers, label: 'Working MVP' },
    { icon: FileText, label: 'Product docs' },
    { icon: BookMarked, label: 'Code & assets' },
    { icon: Compass, label: 'Next-phase plan' },
  ],
}

export const FocusFirstStep: Story = {
  args: {
    eyebrow: 'HOW THE SPRINT WORKS',
    title: 'Five steps',
    accent: 'from map to handoff',
    steps: sprint,
    active: 0,
  },
}

/** Same slide, third step, on the blue mesh (the site's look). */
export const FocusBuildOnMesh: Story = {
  args: { ...FocusFirstStep.args, background: 'mesh', active: 2 },
}

/** With the deliverables bar under the detail (use it on the last step only). */
export const FocusWithDeliverables: Story = {
  args: { ...FocusFirstStep.args, active: 4, deliverables: sprintDeliverables },
}

const migration: FocusStep[] = [
  {
    label: 'Map your exit',
    title: 'Know what it takes to leave',
    text: 'We map what your practice relies on today: records, daily workflows, connected tools and vendor contracts.',
    milestone: 'Your exit plan is mapped.',
    rows: [
      { label: 'Intake', status: 'Current EHR' },
      { label: 'Charting', status: 'Current EHR' },
      { label: 'Billing', status: 'Current EHR' },
    ],
  },
  {
    label: 'Pilot one workflow',
    title: 'Prove one workflow first',
    text: 'One workflow moves to the new platform while the rest keep running on the old EHR.',
    milestone: 'Intake runs on the new platform.',
    rows: [
      { label: 'Intake', status: 'New platform', done: true },
      { label: 'Charting', status: 'Current EHR' },
      { label: 'Billing', status: 'Current EHR' },
    ],
  },
  {
    label: 'Expand in stages',
    title: 'Move the rest, one by one',
    text: 'Each next workflow moves only after the last one is stable, with a checkpoint before every switch.',
    milestone: 'Daily care runs on the new platform.',
    rows: [
      { label: 'Intake', status: 'New platform', done: true },
      { label: 'Charting', status: 'New platform', done: true },
      { label: 'Billing', status: 'Current EHR' },
    ],
  },
  {
    label: 'Retire the old EHR',
    title: 'Switch the old system off',
    text: 'Records are archived, contracts wind down and your team works in one system.',
    milestone: 'The old EHR is retired.',
    rows: [
      { label: 'Intake', status: 'New platform', done: true },
      { label: 'Charting', status: 'New platform', done: true },
      { label: 'Billing', status: 'New platform', done: true },
    ],
  },
]

export const StagesPilot: Story = {
  args: {
    variant: 'stages',
    eyebrow: 'MIGRATE OFF YOUR EHR',
    title: 'Leave your old EHR',
    accent: 'one proven workflow at a time',
    steps: migration,
    active: 1,
  },
}

/** Split header (title left, lede right) on the blue mesh, as on the site. */
export const StagesOnMesh: Story = {
  args: {
    ...StagesPilot.args,
    background: 'mesh',
    active: 0,
    lede: 'Your practice still has patients to see. We move each workflow in stages, with clear checkpoints.',
  },
}
