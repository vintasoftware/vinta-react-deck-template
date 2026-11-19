import type { Meta, StoryObj } from '@storybook/react-vite'
import { Layers } from 'lucide-react'
import { VividCard } from './VividCard'
import { IconBadge } from '../IconBadge'
import { Body } from '../Body'

const meta = {
  title: 'Elements/VividCard',
  component: VividCard,
  parameters: { layout: 'centered' },
  argTypes: { surface: { control: 'radio', options: ['white', 'glass', 'navy'] } },
} satisfies Meta<typeof VividCard>

export default meta
type Story = StoryObj<typeof meta>

const content = (mode: 'light' | 'invert-blue' | 'invert-navy', variant: 'gradient' | 'glass') => (
  <>
    <IconBadge variant={variant} shape="square" accent="purple" icon={Layers} size={72} />
    <Body mode={mode} tone="primary">
      A working app on day one, set up for your care model.
    </Body>
  </>
)

export const White: Story = {
  args: { surface: 'white', style: { width: 480 }, children: content('light', 'gradient') },
}

export const Glass: Story = {
  args: { surface: 'glass', style: { width: 480 }, children: content('invert-blue', 'glass') },
  render: (args) => (
    <div style={{ padding: 48, background: 'var(--vivid-blue)' }}>
      <VividCard {...args} />
    </div>
  ),
}

export const Navy: Story = {
  args: { surface: 'navy', style: { width: 480 }, children: content('invert-navy', 'glass') },
}
