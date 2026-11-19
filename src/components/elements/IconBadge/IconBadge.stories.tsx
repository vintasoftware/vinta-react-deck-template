import type { Meta, StoryObj } from '@storybook/react-vite'
import { MessageSquare } from 'lucide-react'
import { IconBadge } from './IconBadge'

const meta = {
  title: 'Elements/IconBadge',
  component: IconBadge,
  parameters: { layout: 'centered' },
  argTypes: {
    shape: { control: 'radio', options: ['square', 'circle'] },
    accent: { control: 'radio', options: ['blue', 'cyan', 'purple', 'mint', 'rose', 'orange'] },
  },
} satisfies Meta<typeof IconBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Circle: Story = {
  args: { shape: 'circle', accent: 'blue', icon: MessageSquare },
}

export const Square: Story = {
  args: { shape: 'square', accent: 'purple', icon: MessageSquare },
}

export const Large: Story = {
  args: { shape: 'circle', accent: 'orange', icon: MessageSquare, size: 245 },
}

export const AllAccents: Story = {
  args: { icon: MessageSquare },
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      {(['blue', 'cyan', 'purple', 'mint', 'rose', 'orange'] as const).map((accent) => (
        <IconBadge key={accent} accent={accent} icon={MessageSquare} />
      ))}
    </div>
  ),
}

const ACCENTS = ['blue', 'cyan', 'purple', 'mint', 'rose', 'orange'] as const

/** The tile styles of the vivid layouts. glass sits on a dark background. */
export const TileVariants: Story = {
  args: { icon: MessageSquare },
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      {(['gradient', 'pale', 'white', 'ring'] as const).map((variant) => (
        <div key={variant} style={{ display: 'flex', gap: 16 }}>
          {ACCENTS.map((accent) => (
            <IconBadge key={accent} variant={variant} shape="square" accent={accent} icon={MessageSquare} size={72} />
          ))}
        </div>
      ))}
      <div style={{ display: 'flex', gap: 16, padding: 24, background: 'var(--vivid-blue)' }}>
        {ACCENTS.map((accent) => (
          <IconBadge key={accent} variant="glass" shape="square" accent={accent} icon={MessageSquare} size={72} />
        ))}
      </div>
    </div>
  ),
}
