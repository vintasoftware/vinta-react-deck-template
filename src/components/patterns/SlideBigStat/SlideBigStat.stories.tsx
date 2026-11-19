import type { Meta, StoryObj } from '@storybook/react-vite'
import { SlideBigStat } from './SlideBigStat'
import { Highlight } from '../../elements/Highlight'

const meta = {
  title: 'Patterns/SlideBigStat',
  component: SlideBigStat,
  parameters: { layout: 'fullscreen' },
  argTypes: { tone: { control: 'radio', options: ['light', 'tint', 'invert-blue', 'invert-navy', 'vivid'] } },
} satisfies Meta<typeof SlideBigStat>

export default meta
type Story = StoryObj<typeof meta>

const base = {
  eyebrow: 'RESULTS',
  title: 'What the first release',
  accent: 'delivered',
  stats: [
    { value: '9', label: 'WEEKS FROM KICKOFF TO LAUNCH' },
    { value: '38%', label: 'FEWER NO-SHOWS AFTER LAUNCH' },
    { value: '4.7', label: 'PATIENT APP RATING' },
  ],
}

/** Default tone: night background. */
export const InvertNavy: Story = { args: base }
/** Wash background, blue numbers; no photo. */
export const Light: Story = { args: { ...base, tone: 'light' } }
/** Blue mesh, one number. */
export const OneNumber: Story = { args: { ...base, tone: 'invert-blue', stats: [base.stats[0]] } }
/** Back-compat: `tone="vivid"` (night), title array with `<Highlight>`. */
export const Vivid: Story = {
  args: {
    ...base,
    tone: 'vivid',
    accent: undefined,
    title: [
      <>
        What the first <Highlight mode="invert-navy">release</Highlight>
      </>,
      <Highlight mode="invert-navy">delivered</Highlight>,
    ],
  },
}
