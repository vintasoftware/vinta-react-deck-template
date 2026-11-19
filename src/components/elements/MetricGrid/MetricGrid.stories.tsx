import type { Meta, StoryObj } from '@storybook/react-vite'
import { MetricGrid } from './MetricGrid'
import { MetricItem } from '../MetricItem'

const meta = {
  title: 'Elements/MetricGrid',
  component: MetricGrid,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof MetricGrid>

export default meta
type Story = StoryObj<typeof meta>

export const FourMetrics: Story = {
  name: 'Two by two',
  args: { children: null },
  render: () => (
    <div style={{ background: 'var(--surface-tint)', padding: 32, width: 600 }}>
      <MetricGrid>
        <MetricItem mode="light-tint" label="13+ years" description="Delivering software" />
        <MetricItem mode="light-tint" label="60+ experts" description="Full-stack product delivery" />
        <MetricItem mode="light-tint" label="FHIR-first" description="Interoperable healthcare solutions" />
        <MetricItem mode="light-tint" label="HIPAA-ready" description="Compliance-aware development" />
      </MetricGrid>
    </div>
  ),
}
