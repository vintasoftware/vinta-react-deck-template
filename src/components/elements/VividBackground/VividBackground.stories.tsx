import type { Meta, StoryObj } from '@storybook/react-vite'
import { VividBackground } from './VividBackground'

const meta = {
  title: 'Elements/VividBackground',
  component: VividBackground,
  parameters: { layout: 'fullscreen' },
  argTypes: { variant: { control: 'radio', options: ['wash', 'mesh', 'night', 'green', 'purple'], glow: { control: 'radio', options: ['none', 'horizon'] } } },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', width: 1920, height: 1080 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof VividBackground>

export default meta
type Story = StoryObj<typeof meta>

export const Wash: Story = { args: { variant: 'wash' } }
export const Mesh: Story = { args: { variant: 'mesh' } }
export const Night: Story = { args: { variant: 'night' } }
export const NightHorizon: Story = { args: { variant: 'night', glow: 'horizon' } }
export const Green: Story = { args: { variant: 'green' } }
export const Purple: Story = { args: { variant: 'purple' } }
