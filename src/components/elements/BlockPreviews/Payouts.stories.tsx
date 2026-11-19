import { useEffect } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Payouts } from './Payouts'
import { markInteracted } from './shared'

/** Fixed-width stage, like the site's `.homepage-bb-preview-stage`. */
const meta = {
  title: 'Elements/BlockPreviews/Payouts',
  component: Payouts,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => {
      useEffect(() => markInteracted(), [])
      return (
        <div style={{ width: 928, margin: '48px auto' }}>
          <Story />
        </div>
      )
    },
  ],
} satisfies Meta<typeof Payouts>

export default meta
type Story = StoryObj<typeof meta>

/** Static final state (how the card looks without the tour). */
export const Static: Story = { args: { live: false } }

/** Live tour: approves Braga and Haddad, then "Approve all ready". */
export const Live: Story = { args: { live: true, skipInteractionGate: true } }

/** Touch layout (one screen at a time), with the scrolling tour. */
export const Touch: Story = {
  args: { live: true, touchLayout: true, skipInteractionGate: true },
  decorators: [
    (Story) => (
      <div style={{ width: 420, margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
}
