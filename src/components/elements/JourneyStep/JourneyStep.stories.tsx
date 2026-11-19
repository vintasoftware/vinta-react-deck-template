import type { Meta, StoryObj } from '@storybook/react-vite'
import { Compass, Map, Rocket, CheckCircle } from 'lucide-react'
import { JourneyStep } from './JourneyStep'

const meta = {
  title: 'Elements/JourneyStep',
  component: JourneyStep,
  parameters: { layout: 'centered' },
  argTypes: {
    accent: { control: 'radio', options: ['blue', 'cyan', 'purple', 'mint', 'rose', 'orange'] },
  },
} satisfies Meta<typeof JourneyStep>

export default meta
type Story = StoryObj<typeof meta>

export const Single: Story = {
  args: { index: 1, weeks: 2, title: 'Discovery', icon: Compass, accent: 'orange' },
}

export const List: Story = {
  args: { index: 1, weeks: 2, title: '', icon: Compass },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, width: 480 }}>
      <JourneyStep index={1} weeks={2} title="Discovery" icon={Compass} accent="orange" />
      <JourneyStep index={2} weeks={3} title="Mapping" icon={Map} accent="blue" />
      <JourneyStep index={3} weeks={4} title="Build" icon={Rocket} accent="purple" />
      <JourneyStep index={4} weeks={1} title="Launch" icon={CheckCircle} accent="mint" />
    </div>
  ),
}
