import type { Meta, StoryObj } from '@storybook/react-vite'
import { LogoStrip } from './LogoStrip'

const meta = {
  title: 'Elements/LogoStrip',
  component: LogoStrip,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof LogoStrip>

export default meta
type Story = StoryObj<typeof meta>

export const WhoIsVinta: Story = {
  args: {
    label: 'TRUSTED BY LEADING ORGANIZATIONS',
    logos: [
      { name: 'Quilted Health' },
      { name: 'Perci Health' },
      { name: 'Mayo Clinic' },
      { name: 'Brain Health USA' },
      { name: 'Unilever' },
      { name: 'United Nations' },
    ],
  },
}
