import type { Meta, StoryObj } from '@storybook/react-vite'
import { Foundations } from './Foundations'

const meta = {
  title: 'Foundations',
  component: Foundations,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Foundations>

export default meta
type Story = StoryObj<typeof meta>

export const Tokens: Story = {}
