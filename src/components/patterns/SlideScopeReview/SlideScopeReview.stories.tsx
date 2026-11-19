import type { Meta, StoryObj } from '@storybook/react-vite'
import { SlideScopeReview } from './SlideScopeReview'

const meta = {
  title: 'Patterns/SlideScopeReview',
  component: SlideScopeReview,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideScopeReview>

export default meta
type Story = StoryObj<typeof meta>

/** Real content of frame 427:1048 */
export const ScopeReview: Story = {
  args: {
    title: 'Scope review',
    coverageLabel: 'Scope Coverage',
    groups: [
      {
        label: 'Must-have',
        tone: 'blue',
        tags: ['Client charting', 'Smart Scheduling', 'Reports', 'Claims Submission', 'User Management', 'Notifications', '42 CFR pt 2 Compliance', 'Assessments', 'Inventory Management', 'Protocols', 'Tasks'],
      },
      {
        label: 'Nice-to-have',
        tone: 'lilac',
        tags: ['AI-powered notes', 'Messages', 'Document Management', 'Analytics', 'Referrals', 'Invoices', 'Superbill', 'AI-Assisted Intake', 'Voice Intake Mapping'],
      },
      { label: 'Integrations', tone: 'indigo', tags: ['ePrescribing', 'Lab', 'SMS / Fax', 'Telehealth'] },
    ],
    concernsLabel: 'Main Concerns',
    concerns: [
      {
        title: 'Inventory Management',
        lead: 'Largest operational and technical uncertainty in the current scope.',
        detail: 'Complexity may vary significantly depending on inventory workflows, compliance controls, and operational depth.',
      },
      {
        title: '42 CFR Part 2 Compliance',
        lead: 'Consent management, disclosure restrictions, auditability, and SUD data segmentation may require significant workflow validation.',
        detail: 'Implementation complexity depends heavily on consent and disclosure requirements.',
      },
    ],
    approachLabel: 'Recommended Approach',
    approaches: [
      {
        title: 'Product Discovery',
        lead: 'Recommended to validate workflows, define MVP boundaries, and clarify implementation complexity before development begins.',
      },
      {
        title: 'Timeline Expectations',
        lead: 'Based on the current unprioritized scope, the initial MVP is expected to require 6+ months.',
        detail: 'Timeline expectations may vary depending on scope prioritization and Discovery findings.',
      },
    ],
    background: <img src="/assets/scope-review/background.png" alt="" />,
  },
}
