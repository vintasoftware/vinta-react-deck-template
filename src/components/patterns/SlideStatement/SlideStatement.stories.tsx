import type { Meta, StoryObj } from '@/components/story'
import { CalendarCheck, Receipt, ShieldCheck } from 'lucide-react'
import { SlideStatement } from './SlideStatement'

const meta = {
  title: 'Patterns/SlideStatement',
  component: SlideStatement,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: { background: { control: 'radio', options: ['mesh', 'night'] } },
} satisfies Meta<typeof SlideStatement>

export default meta
type Story = StoryObj<typeof meta>

export const Mesh: Story = {
  args: {
    background: 'mesh',
    eyebrow: 'NORTHWIND HEALTH · PROPOSAL',
    title: 'Built around',
    accent: 'your care model',
    lede: 'A care platform built on proven blocks, shaped around how your clinicians already work.',
  },
}

/** Story id kept as `blue-art` for continuity; it now renders on the night background. */
export const BlueArt: Story = {
  name: 'Night',
  args: {
    background: 'night',
    eyebrow: 'WHY IT WORKS',
    title: 'A focused idea, built into',
    accent: 'software people trust',
    pills: [
      { icon: CalendarCheck, label: '4 WEEKS' },
      { icon: Receipt, label: 'FIXED PRICE' },
      { icon: ShieldCheck, label: 'FHIR + HIPAA' },
    ],
  },
}
