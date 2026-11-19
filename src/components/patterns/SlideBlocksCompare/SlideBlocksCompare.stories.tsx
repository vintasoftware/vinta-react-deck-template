import type { Meta, StoryObj } from '@storybook/react-vite'
import { markInteracted } from '../../elements/BlockPreviews/shared'
import { SlideBlocksCompare } from './SlideBlocksCompare'

markInteracted()

const meta = {
  title: 'Patterns/SlideBlocksCompare',
  component: SlideBlocksCompare,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideBlocksCompare>

export default meta
type Story = StoryObj<typeof meta>

/** Animated: the active card runs its tour and the carousel advances on its own. */
export const Animated: Story = { args: { deck: { skipInteractionGate: true } } }

/** Static image (for PNG/PDF): cards still in their final state. */
export const Static: Story = { args: { deck: { autoplay: false } } }

/** One block at a time, with tour and no advance (to record each card). */
export const RecordConcierge: Story = { args: { deck: { autoplay: false, live: true, startIndex: 1, skipInteractionGate: true } } }
