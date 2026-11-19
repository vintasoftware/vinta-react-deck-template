import type { Meta, StoryObj } from '@storybook/react-vite'
import { TagCard } from './TagCard'

const meta = {
  title: 'Elements/TagCard',
  component: TagCard,
  parameters: { layout: 'centered' },
  argTypes: { tone: { control: 'radio', options: ['blue', 'lilac', 'indigo'] } },
} satisfies Meta<typeof TagCard>

export default meta
type Story = StoryObj<typeof meta>

const frame = (h: number) => [(Story: () => JSX.Element) => (
  <div style={{ width: 602, height: h }}>
    <Story />
  </div>
)]

export const MustHave: Story = {
  args: {
    label: 'Must-have',
    tone: 'blue',
    tags: ['Client charting', 'Smart Scheduling', 'Reports', 'Claims Submission', 'User Management', 'Notifications', '42 CFR pt 2 Compliance', 'Assessments', 'Inventory Management', 'Protocols', 'Tasks'],
  },
  decorators: frame(314),
}
export const NiceToHave: Story = {
  args: {
    label: 'Nice-to-have',
    tone: 'lilac',
    tags: ['AI-powered notes', 'Messages', 'Document Management', 'Analytics', 'Referrals', 'Invoices', 'Superbill', 'AI-Assisted Intake', 'Voice Intake Mapping'],
  },
  decorators: frame(255),
}
export const Integrations: Story = {
  args: { label: 'Integrations', tone: 'indigo', tags: ['ePrescribing', 'Lab', 'SMS / Fax', 'Telehealth'] },
  decorators: frame(119),
}
