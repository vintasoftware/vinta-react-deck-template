import type { Decorator, Meta, StoryObj } from '@storybook/react-vite'
import { GroundworkProvider } from './GroundworkApp'
import { ProviderExperience } from './ProviderExperience'
import { withPreviewStage } from './PreviewStage'
import { markInteracted } from './shared'
import { TallgroveProvider } from './TallgroveProvider'

// Storybook has no "first interaction": unlocks the divider's sweep.
markInteracted()

const meta = {
  title: 'Elements/BlockPreviews/ProviderExperience',
  component: ProviderExperience,
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
  args: { live: false, skipInteractionGate: true },
  decorators: [withPreviewStage({ width: 840 })],
} satisfies Meta<typeof ProviderExperience>
export default meta
type Story = StoryObj<typeof meta>

/** Static final state: divider at 38%, no tour. */
export const Static: Story = { args: { live: false } }

/** With tour: the divider sweeps, the Groundwork tabs switch and Dr. Braga goes through prep → room → signature → next patient. */
export const Live: Story = { args: { live: true } }

/** One side alone, inside the same comparison frame (`.homepage-bb-pcmp`), to keep the same sizes and height. */
const solo: Decorator = (Story) => (
  <div className="homepage-bb-preview-stage" style={{ width: 840, margin: '48px auto' }}>
    <section className="homepage-bb-pcmp">
      <div className="homepage-bb-pcmp-frame">
        <Story />
      </div>
    </section>
  </div>
)

/** Only the "foundation" side: Groundwork EHR with the section menu. */
export const FoundationOnly: StoryObj<{ live?: boolean }> = {
  render: (args) => <GroundworkProvider live={args.live ?? false} />,
  args: { live: false },
  decorators: [solo],
}

/** Only the "tailored" side: Dr. Braga's screen at Tallgrove Health. */
export const TailoredOnly: StoryObj<{ live?: boolean }> = {
  render: (args) => <TallgroveProvider live={args.live ?? false} />,
  args: { live: false },
  decorators: [solo],
}
