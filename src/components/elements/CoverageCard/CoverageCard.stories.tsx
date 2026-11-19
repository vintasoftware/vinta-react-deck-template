import type { Meta, StoryObj } from '@storybook/react-vite'
import { CoverageCard } from './CoverageCard'

const meta = {
  title: 'Elements/CoverageCard',
  component: CoverageCard,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof CoverageCard>

export default meta
type Story = StoryObj<typeof meta>

export const Coverage: Story = {
  args: {
    status: 'success',
    label: 'Coverage',
    items: [
      'Bug fixes for existing features and security patches',
      'Monthly infrastructure review',
      'Priority support with next-business-day response',
    ],
  },
  decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>],
}

export const Exclusions: Story = {
  args: {
    status: 'danger',
    label: 'Exclusions',
    items: ['New feature development', 'Third-party integrations not covered by the original scope'],
  },
  decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>],
}

export const BothSideBySide: Story = {
  name: 'Both, side by side',
  args: { status: 'success', label: 'Coverage', items: [] },
  render: () => (
    <div style={{ display: 'flex', gap: 24, width: 1000 }}>
      <div style={{ flex: 1 }}>
        <CoverageCard
          status="success"
          label="Coverage"
          items={['Bug fixes for existing features and security patches', 'Monthly infrastructure review']}
        />
      </div>
      <div style={{ flex: 1 }}>
        <CoverageCard status="danger" label="Exclusions" items={['New feature development']} />
      </div>
    </div>
  ),
}
