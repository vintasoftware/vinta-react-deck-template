import type { Meta, StoryObj } from '@storybook/react-vite'
import { NumberedRow } from './NumberedRow'

const meta = {
  title: 'Elements/NumberedRow',
  component: NumberedRow,
  parameters: { layout: 'centered' },
  argTypes: {
    accent: { control: 'radio', options: ['blue', 'cyan', 'purple', 'mint', 'rose', 'orange'] },
    mode: { control: 'radio', options: ['light', 'light-tint', 'invert-blue', 'invert-navy'] },
  },
} satisfies Meta<typeof NumberedRow>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { index: '01', title: 'Where we are today', detail: 'The product, the team and the constraints', meta: '10 MIN' },
  decorators: [(S) => <div style={{ width: 900 }}><S /></div>],
}
