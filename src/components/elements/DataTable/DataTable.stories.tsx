import type { Meta, StoryObj } from '@storybook/react-vite'
import { DataTable } from './DataTable'

const meta = {
  title: 'Elements/DataTable',
  component: DataTable,
  parameters: { layout: 'centered' },
  argTypes: { mode: { control: 'radio', options: ['light', 'light-tint', 'invert-blue', 'invert-navy'] } },
} satisfies Meta<typeof DataTable>

export default meta
type Story = StoryObj<typeof meta>

export const Comparison: Story = {
  args: {
    columns: [{ title: 'Spark' }, { title: 'Forge', highlight: true }, { title: 'Scale' }],
    rows: [
      { label: 'Duration', cells: ['2 weeks', '4 weeks', '8 weeks'] },
      { label: 'Working prototype', cells: [true, true, true] },
      { label: 'Production-ready V1', cells: [false, true, true] },
      { label: 'Dedicated squad', cells: [false, false, true] },
    ],
  },
  decorators: [(S) => <div style={{ width: 1300 }}><S /></div>],
}
