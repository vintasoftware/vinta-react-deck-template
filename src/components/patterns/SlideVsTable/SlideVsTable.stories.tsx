import type { Meta, StoryObj } from '@/components/story'
import { CodeXml, Compass, Database, Gauge, Workflow, Wallet, Puzzle } from 'lucide-react'
import { SlideVsTable } from './SlideVsTable'

const meta = {
  title: 'Patterns/SlideVsTable',
  component: SlideVsTable,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideVsTable>

export default meta
type Story = StoryObj<typeof meta>

/** The site's section: four rows with a lede and the mono caption over the labels. */
export const FourRows: Story = {
  args: {
    eyebrow: 'WHAT FAST USUALLY HIDES',
    title: 'PHI is serious business.',
    accent: 'We build like it',
    lede: 'AI makes demos easy; healthcare isn’t a sandbox.',
    caption: 'BOTH LOOK DONE. UNDERNEATH:',
    themLabel: 'Vibe-coded builds',
    usLabel: 'Built with Vinta',
    rows: [
      {
        icon: Compass,
        label: 'Starting point',
        them: 'A blank prompt that rebuilds the basics from scratch.',
        us: 'Healthcare foundations shaped to your care model.',
      },
      {
        icon: Workflow,
        label: 'What gets built',
        them: 'A happy-path demo that breaks on the next change.',
        us: 'The workflow that matters, mapped, built and tested.',
      },
      {
        icon: CodeXml,
        label: 'Under the hood',
        them: 'Generated code no one has reviewed.',
        us: 'Every change reviewed by a senior engineer.',
      },
      {
        icon: Database,
        label: 'Patient data',
        them: 'Tools that won’t sign a BAA, and no audit trail.',
        us: 'Access control, audit trail, synthetic data.',
      },
    ],
  },
}

/** Three rows: the cells get room for two full lines. */
export const ThreeRows: Story = {
  args: {
    eyebrow: 'BUY OR BUILD',
    title: 'An EHR that fits',
    accent: 'the way you deliver care',
    lede: 'Off-the-shelf works until your workflow doesn’t.',
    themLabel: 'Off-the-shelf EHR',
    usLabel: 'Custom, built with Vinta',
    rows: [
      {
        icon: Workflow,
        label: 'Workflows',
        them: 'Your team bends its care model to fit the vendor’s screens.',
        us: 'Screens and flows follow how your clinicians already work.',
      },
      {
        icon: Puzzle,
        label: 'Integrations',
        them: 'Only the partners the vendor supports, on its own timeline.',
        us: 'FHIR-native APIs: labs, payers and apps plug in.',
      },
      {
        icon: Wallet,
        label: 'Cost at scale',
        them: 'Per-seat fees that grow with every new provider you hire.',
        us: 'You own the code; costs track usage, not headcount.',
      },
    ],
  },
}

/** Five rows: no lede, short cells (one line each). */
export const FiveRows: Story = {
  args: {
    eyebrow: 'WHAT FAST USUALLY HIDES',
    title: 'PHI is serious business.',
    accent: 'We build like it',
    themLabel: 'Vibe-coded builds',
    usLabel: 'Built with Vinta',
    rows: [
      { icon: Compass, label: 'Starting point', them: 'A blank prompt, every time', us: 'Proven healthcare foundations' },
      { icon: Workflow, label: 'What gets built', them: 'A happy-path demo', us: 'One workflow, built and tested' },
      { icon: CodeXml, label: 'Under the hood', them: 'Unreviewed generated code', us: 'Senior review on every change' },
      { icon: Database, label: 'Patient data', them: 'No BAA, no audit trail', us: 'Access control and audit trail' },
      { icon: Gauge, label: 'After demo day', them: 'Slows down with real users', us: 'A clear plan for launch' },
    ],
  },
}
