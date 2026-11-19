import type { Meta, StoryObj } from '@storybook/react-vite'
import { Divider } from './Divider'

const meta = {
  title: 'Elements/Divider',
  component: Divider,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    scheme: {
      control: 'radio',
      options: ['01', '02', '03', '04'],
    },
  },
} satisfies Meta<typeof Divider>

export default meta
type Story = StoryObj<typeof meta>

const title = (
  <>
    What the first
    <br />release covers
  </>
)

export const Divider01: Story = {
  name: 'Divider 01',
  args: {
    preTitle: 'NEXT SECTION',
    title,
    scheme: '01',
  },
}

export const Divider02: Story = {
  name: 'Divider 02',
  args: {
    preTitle: 'NEXT SECTION',
    title,
    scheme: '02',
  },
}

export const Divider03: Story = {
  name: 'Divider 03',
  args: {
    preTitle: 'NEXT SECTION',
    title,
    scheme: '03',
  },
}

export const Divider04: Story = {
  name: 'Divider 04',
  args: {
    preTitle: 'NEXT SECTION',
    title,
    scheme: '04',
  },
}
