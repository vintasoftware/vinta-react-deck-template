import type { Meta, StoryObj } from '@storybook/react-vite'
import { DisplayTitle } from '../DisplayTitle'
import { Highlight } from './Highlight'

const meta = {
  title: 'Elements/Highlight',
  component: Highlight,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Highlight>

export default meta
type Story = StoryObj<typeof meta>

export const InTitle: Story = {
  args: { children: 'fast-tracking EHR building' },
  render: (args) => (
    <DisplayTitle scale="h1">
      Northwind: <Highlight {...args} />
    </DisplayTitle>
  ),
}

export const OnNavy: Story = {
  args: { children: 'grew every quarter', mode: 'invert-navy' },
  render: (args) => (
    <div style={{ background: 'var(--vivid-navy)', padding: 48 }}>
      <DisplayTitle scale="h1" mode="invert-navy">
        Revenue <Highlight {...args} />
      </DisplayTitle>
    </div>
  ),
}
