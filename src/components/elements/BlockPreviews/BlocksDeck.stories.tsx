import type { Decorator, Meta, StoryObj } from '@storybook/react-vite'
import { BlocksDeck } from './BlocksDeck'
import { BLOCKS } from './blocks.data'
import { PreviewCard } from './PreviewCard'
import { markInteracted } from './shared'

markInteracted()

/** Fixed-width stage (the deck scales the mocks' UI to fit: base 840 px). */
const stage =
  (width: number): Decorator =>
  (Story) => (
    <div style={{ width, margin: '48px auto' }}>
      <Story />
    </div>
  )

const meta = {
  title: 'Elements/BlockPreviews/BlocksDeck',
  component: BlocksDeck,
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
  args: { autoplay: true, skipInteractionGate: true, startIndex: 0 },
  argTypes: { startIndex: { control: { type: 'number', min: 0, max: BLOCKS.length - 1 } } },
  decorators: [stage(880)],
} satisfies Meta<typeof BlocksDeck>
export default meta
type Story = StoryObj<typeof meta>

/** As on the site: the active card runs its tour and, when it ends, advances on its own (pauses on mouse/focus). */
export const Autoplay: Story = {}

/** No auto-advance and no tour: cards still in their final state; navigation by arrows, dots or click. */
export const Static: Story = { args: { autoplay: false } }

/** Tour on for the active card only, without advancing (good for recording one block at a time). */
export const TourWithoutAdvance: Story = { args: { autoplay: false, live: true } }

export const StartAtConcierge: Story = { args: { autoplay: false, startIndex: 1 } }
export const StartAtIntake: Story = { args: { autoplay: false, startIndex: 2 } }
export const StartAtPayouts: Story = { args: { autoplay: false, startIndex: 3 } }

/** A single card (no stack, no bar), for standalone slides. `index`: 0 Provider Experience · 1 AI Concierge · 2 Patient Intake · 3 Provider Payouts. */
export const SingleCard: StoryObj<{ index: number }> = {
  args: { index: 0 },
  argTypes: { index: { control: { type: 'number', min: 0, max: BLOCKS.length - 1 } } },
  render: ({ index }) => (
    <PreviewCard
      block={BLOCKS[index]}
      live
      skipInteractionGate
      onTourEnd={() => {
        // registry for the clip recorder to measure the length of one tour cycle
        const w = window as unknown as { __tourEnds?: number[] }
        ;(w.__tourEnds ||= []).push(performance.now())
      }}
    />
  ),
  decorators: [stage(880)],
}
