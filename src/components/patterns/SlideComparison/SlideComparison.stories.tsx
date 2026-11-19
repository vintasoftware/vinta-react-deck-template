import type { Meta, StoryObj } from '@storybook/react-vite'
import { SlideComparison } from './SlideComparison'
import { Highlight } from '../../elements/Highlight'

const meta = {
  title: 'Patterns/SlideComparison',
  component: SlideComparison,
  parameters: { layout: 'fullscreen' },
  argTypes: { tone: { control: 'radio', options: ['light', 'tint', 'invert-blue', 'invert-navy', 'vivid'] } },
} satisfies Meta<typeof SlideComparison>

export default meta
type Story = StoryObj<typeof meta>

const base = {
  eyebrow: 'OPTIONS',
  title: 'Three sprint sizes,',
  accent: 'one price each',
  table: {
    columns: [{ title: 'Spark' }, { title: 'Forge', highlight: true }, { title: 'Scale' }],
    rows: [
      { label: 'Duration', cells: ['5 working days', '10 working days', '8 weeks'] },
      { label: 'Working prototype', cells: [true, true, true] },
      { label: 'Production-ready V1', cells: [false, true, true] },
      { label: 'Dedicated squad', cells: [false, false, true] },
      { label: 'Investment', cells: ['$ 5,000', '$ 9,000', 'Custom'] },
    ],
  },
  note: 'Prices are estimates and depend on the scope confirmed in discovery.',
}

/** Wash background, white table card. */
export const Light: Story = { args: base }
/** Blue mesh, glass table card. */
export const InvertBlue: Story = { args: { ...base, tone: 'invert-blue' } }
/** Night background, six rows (tighter rows). */
export const InvertNavy: Story = {
  args: { ...base, tone: 'invert-navy', table: { ...base.table, rows: [...base.table.rows, { label: 'Post-launch support', cells: [false, true, true] }] } },
}
/** Back-compat: one-line title with a `<Highlight>`. */
export const Vivid: Story = {
  args: {
    ...base,
    tone: 'vivid',
    accent: undefined,
    title: [
      <>
        Three sprint sizes, <Highlight>one price each</Highlight>
      </>,
    ],
  },
}
