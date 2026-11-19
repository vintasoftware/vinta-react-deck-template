import type { Decorator, Meta, StoryObj } from '@storybook/react-vite'
import { FoundationIntake } from './IntakeForm'
import { Intake } from './Intake'
import { withPreviewStage } from './PreviewStage'
import { markInteracted } from './shared'
import { TallgroveIntake } from './TallgroveIntake'

// Storybook has no "first interaction": unlocks the divider's sweep.
markInteracted()

const meta = {
  title: 'Elements/BlockPreviews/Intake',
  component: Intake,
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
  args: { live: false, skipInteractionGate: true },
  decorators: [withPreviewStage({ width: 840 })],
} satisfies Meta<typeof Intake>
export default meta
type Story = StoryObj<typeof meta>

/** Static final state: divider at 38%, no tour. */
export const Static: Story = { args: { live: false } }

/** With tour: the form goes through its 4 sections; Tallgrove confirms details, reason, medications and issues the check-in pass. */
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

/** Only the "foundation" side: the generic Groundwork EHR form. */
export const FoundationOnly: StoryObj<{ live?: boolean }> = {
  render: (args) => <FoundationIntake live={args.live ?? false} />,
  args: { live: false },
  decorators: [solo],
}

/** Only the "tailored" side: Tallgrove Health's 4-step flow. */
export const TailoredOnly: StoryObj<{ live?: boolean }> = {
  render: (args) => <TallgroveIntake live={args.live ?? false} />,
  args: { live: false },
  decorators: [solo],
}
