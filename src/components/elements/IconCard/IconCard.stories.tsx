import type { Meta, StoryObj } from '@storybook/react-vite'
import { MessageSquare, Users, CalendarCheck, Stethoscope, ClipboardList } from 'lucide-react'
import { IconCard } from './IconCard'

const meta = {
  title: 'Elements/IconCard',
  component: IconCard,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'radio', options: ['icon-inline', 'icon-top'] },
    accent: { control: 'radio', options: ['blue', 'cyan', 'purple', 'mint', 'rose', 'orange'] },
  },
} satisfies Meta<typeof IconCard>

export default meta
type Story = StoryObj<typeof meta>

export const IconInline: Story = {
  args: {
    variant: 'icon-inline',
    icon: MessageSquare,
    accent: 'blue',
    title: 'Clear communication',
    description: 'Physicians want fewer clicks and more context at the point of care.',
  },
  decorators: [(Story) => <div style={{ width: 340 }}><Story /></div>],
}

export const IconTop: Story = {
  args: {
    variant: 'icon-top',
    icon: Stethoscope,
    accent: 'blue',
    title: 'Clinical visit',
    description: 'Charting, orders and notes on one screen.',
  },
  decorators: [(Story) => <div style={{ width: 340 }}><Story /></div>],
}

export const IconTopWithTags: Story = {
  name: 'Icon-top with tags',
  args: {
    variant: 'icon-top',
    icon: Stethoscope,
    accent: 'blue',
    title: 'Clinical visit',
    description: 'Charting, orders and notes on one screen.',
    tags: ['Intake', 'Scheduling', 'Charting', 'Billing', 'Messaging', 'Referrals'],
  },
  decorators: [(Story) => <div style={{ width: 340 }}><Story /></div>],
}

export const IconTopNoDescription: Story = {
  name: 'Icon-top, title only',
  args: {
    variant: 'icon-top',
    icon: ClipboardList,
    accent: 'blue',
    title: 'Patient intake',
  },
  decorators: [(Story) => <div style={{ width: 340 }}><Story /></div>],
}

export const Grid: Story = {
  args: { icon: Users, title: '' },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, width: 1100 }}>
      <IconCard
        variant="icon-top"
        icon={Stethoscope}
        accent="blue"
        title="Clinical visit"
        description="Charting, orders and notes on one screen."
        tags={['Intake', 'Scheduling', 'Charting', 'Billing', 'Messaging', 'Referrals']}
      />
      <IconCard variant="icon-top" icon={MessageSquare} accent="blue" title="Secure messaging" description="Patients and care teams in one thread." />
      <IconCard variant="icon-top" icon={CalendarCheck} accent="blue" title="Scheduling" description="Booking, reminders and waitlists." />
    </div>
  ),
}
