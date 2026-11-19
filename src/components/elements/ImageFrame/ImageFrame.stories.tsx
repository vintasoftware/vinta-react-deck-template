import type { Meta, StoryObj } from '@storybook/react-vite'
import { ImageFrame } from './ImageFrame'

const meta = {
  title: 'Elements/ImageFrame',
  component: ImageFrame,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'radio', options: ['card', 'browser'] },
  },
} satisfies Meta<typeof ImageFrame>

export default meta
type Story = StoryObj<typeof meta>

export const Card: Story = {
  args: { variant: 'card', width: 892, height: 485 },
}

export const Browser: Story = {
  args: { variant: 'browser', width: 840, height: 542 },
}
