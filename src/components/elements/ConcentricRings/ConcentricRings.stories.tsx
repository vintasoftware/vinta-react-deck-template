import type { Meta, StoryObj } from '@storybook/react-vite'
import { ConcentricRings } from './ConcentricRings'
import { VividBackground } from '../VividBackground'

const meta = {
  title: 'Elements/ConcentricRings',
  component: ConcentricRings,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', width: 1920, height: 1080 }}>
        <VividBackground variant="mesh" />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ConcentricRings>

export default meta
type Story = StoryObj<typeof meta>

/** As on the statement slide: four rings at the right with a turquoise glow. */
export const Statement: Story = { args: { cx: 1500, cy: 540, sizes: [800, 600, 400, 200], glow: 960 } }

/** As around the portrait of the quote slide. */
export const Portrait: Story = { args: { cx: 480, cy: 540, sizes: [768, 672], glow: 760, tone: 'mixed' } }
