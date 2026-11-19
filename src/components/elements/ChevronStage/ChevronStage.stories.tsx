import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChevronStage } from './ChevronStage'

const meta = {
  title: 'Elements/ChevronStage',
  component: ChevronStage,
  parameters: { layout: 'centered' },
  argTypes: {
    saturation: { control: 'radio', options: ['tint', 'mid', 'solid'] },
    accent: { control: 'radio', options: ['blue', 'purple', 'mint'] },
  },
} satisfies Meta<typeof ChevronStage>

export default meta
type Story = StoryObj<typeof meta>

export const Tint: Story = {
  args: {
    index: 1,
    label: 'VALIDATE',
    title: 'Validate the existing V1',
    description:
      'Review the pilot-critical workflows and code paths to determine what can be kept, what needs to be strengthened, and what can be deferred.',
    saturation: 'tint',
    accent: 'mint',
  },
  decorators: [(Story) => <div style={{ width: 460 }}><Story /></div>],
}

export const Mid: Story = {
  args: {
    index: 2,
    label: 'HARDEN',
    title: 'Harden for real-world use',
    description: 'Address the most important risks across the integration surface.',
    saturation: 'mid',
    accent: 'blue',
  },
  decorators: [(Story) => <div style={{ width: 460 }}><Story /></div>],
}

export const Solid: Story = {
  args: {
    index: 3,
    label: 'LAUNCH',
    title: 'Launch a reliable V1',
    description:
      'Validate the complete experience, integrations, and critical edge cases, address final issues that could create friction for the first physicians, and support a controlled rollout to real users.',
    saturation: 'solid',
    accent: 'blue',
  },
  decorators: [(Story) => <div style={{ width: 460 }}><Story /></div>],
}

export const Row: Story = {
  args: { index: 1, label: 'VALIDATE', title: '', description: '' },
  render: () => (
    <div style={{ display: 'flex', width: 1392 }}>
      <div style={{ flex: 1 }}>
        <ChevronStage
          index={1}
          label="VALIDATE"
          accent="mint"
          saturation="tint"
          title="Validate the existing V1"
          description="Review the pilot-critical workflows and code paths to determine what can be kept, what needs to be strengthened, and what can be deferred."
        />
      </div>
      <div style={{ flex: 1, marginLeft: -56 }}>
        <ChevronStage
          index={2}
          label="HARDEN"
          accent="blue"
          saturation="tint"
          title="Harden for real-world use"
          description="Address the most important risks across Medplum authorization, clinic-level isolation, production infrastructure, auditability, and the Athena integration."
        />
      </div>
      <div style={{ flex: 1, marginLeft: -56 }}>
        <ChevronStage
          index={3}
          label="LAUNCH"
          accent="blue"
          saturation="solid"
          title="Launch a reliable V1"
          description="Validate the complete experience, integrations, and critical edge cases, address final issues that could create friction for the first physicians, and support a controlled rollout to real users."
        />
      </div>
    </div>
  ),
}
