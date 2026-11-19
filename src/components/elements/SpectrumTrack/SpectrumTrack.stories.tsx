import type { Meta, StoryObj } from '@storybook/react-vite'
import { SpectrumTrack } from './SpectrumTrack'

const meta = {
  title: 'Elements/SpectrumTrack',
  component: SpectrumTrack,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof SpectrumTrack>

export default meta
type Story = StoryObj<typeof meta>

export const ConfidenceProgression: Story = {
  name: 'Confidence progression',
  args: { leftLabel: 'UNKNOWNS', rightLabel: 'CONFIDENCE' },
  render: (args) => (
    <div style={{ width: 1392 }}>
      <SpectrumTrack {...args} />
    </div>
  ),
}

export const RiskProgression: Story = {
  name: 'Risk progression',
  args: { leftLabel: 'LOW RISK', rightLabel: 'HIGH RISK' },
  render: (args) => (
    <div style={{ width: 1392 }}>
      <SpectrumTrack {...args} />
    </div>
  ),
}
