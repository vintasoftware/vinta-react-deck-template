import type { Meta, StoryObj } from '@storybook/react-vite'
import { AppWindow, FileText, GitBranch, Compass } from 'lucide-react'
import { SlideDeliverables } from './SlideDeliverables'

const meta = {
  title: 'Patterns/SlideDeliverables',
  component: SlideDeliverables,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideDeliverables>

export default meta
type Story = StoryObj<typeof meta>

export const FourDeliverables: Story = {
  args: {
    eyebrow: 'WHAT YOU GET',
    title: 'What you keep',
    accent: 'after week four',
    lede: 'The MVP runs, the repository is yours and the next phase is written down.',
    photo: '/assets/team/rich-deliver.webp',
    photoAlt: 'Three colleagues on a sofa with a laptop',
    lead: 'At the end of the MVP AI Fast-track you get:',
    deliverables: [
      { icon: AppWindow, label: 'Working MVP' },
      { icon: FileText, label: 'Product documentation' },
      { icon: GitBranch, label: 'Repository & assets' },
      { icon: Compass, label: 'Next-phase proposal' },
    ],
  },
}
