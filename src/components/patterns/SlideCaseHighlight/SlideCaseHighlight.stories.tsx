import type { Meta, StoryObj } from '@storybook/react-vite'
import { Users, CalendarCheck, ClipboardList } from 'lucide-react'
import { SlideCaseHighlight } from './SlideCaseHighlight'

const meta = {
  title: 'Patterns/SlideCaseHighlight',
  component: SlideCaseHighlight,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: { variant: { control: 'radio', options: ['split', 'band'] } },
} satisfies Meta<typeof SlideCaseHighlight>

export default meta
type Story = StoryObj<typeof meta>

export const Split: Story = {
  args: {
    variant: 'split',
    eyebrow: 'CASE STUDY | PORTLAND, OR',
    title: 'Northwind Health:',
    accent: 'booking and results in one app',
    lede: 'Booking, lab results and secure messaging replaced three separate tools; Northwind’s own team now ships changes to it.',
    numbers: [
      { value: '9 wks', label: 'KICKOFF TO LAUNCH' },
      { value: '38%', label: 'FEWER NO-SHOWS' },
    ],
    // No team photo here: a Vinta photo never goes next to a client's name (CLAUDE.md §8). Pass the client's own portrait.
  },
}

export const Band: Story = {
  args: {
    variant: 'band',
    eyebrow: 'CASE STUDY | PORTLAND, OR',
    title: 'Northwind Health:',
    accent: 'booking and results in one app',
    lede: 'Booking, lab results and secure messaging replaced three separate tools.',
    numbers: [
      { icon: Users, value: '12', label: 'CLINICIANS ONBOARDED' },
      { icon: CalendarCheck, value: '9 wks', label: 'KICKOFF TO LAUNCH' },
      { icon: ClipboardList, value: '38%', label: 'FEWER NO-SHOWS' },
    ],
    // No team photo here: a Vinta photo never goes next to a client's name (CLAUDE.md §8). Pass the client's own portrait.
  },
}
