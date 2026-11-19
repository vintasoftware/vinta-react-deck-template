import type { Meta, StoryObj } from '@storybook/react-vite'
import { SlideBuildingBlocks } from './SlideBuildingBlocks'

const meta = {
  title: 'Patterns/SlideBuildingBlocks',
  component: SlideBuildingBlocks,
  parameters: { layout: 'fullscreen' },
  argTypes: { filter: { control: 'radio', options: ['all', 'patient', 'practice'] } },
} satisfies Meta<typeof SlideBuildingBlocks>

export default meta
type Story = StoryObj<typeof meta>

/** Animated: the counter counts up, the names switch every ~850ms and the filter cycles on its own (All → Patient → Practice). */
export const Animated: Story = { args: {} }

/** Static image (to export PNG/PDF): no name switching and no filter cycle. */
export const StaticAll: Story = { args: { autoplay: false, cycleFilters: false } }
export const StaticPatient: Story = { args: { autoplay: false, cycleFilters: false, filter: 'patient' } }
export const StaticPractice: Story = { args: { autoplay: false, cycleFilters: false, filter: 'practice' } }

/** For slide clips: slow (one name switch every ~2.8 s), fixed filter, no counter. Record with `npm run render-clip`. */
const SLOW = { countUp: false, cycleFilters: false, cycleMs: 2800, settleMs: 1800 } as const
export const SlowAll: Story = { args: { ...SLOW, filter: 'all' } }
export const SlowPatient: Story = { args: { ...SLOW, filter: 'patient' } }
export const SlowPractice: Story = { args: { ...SLOW, filter: 'practice' } }
