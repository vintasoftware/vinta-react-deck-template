import type { Meta, StoryObj } from '@storybook/react-vite'
import { PersonCard } from './PersonCard'

const meta = {
  title: 'Elements/PersonCard',
  component: PersonCard,
  parameters: { layout: 'centered' },
  argTypes: {
    accent: { control: 'radio', options: ['blue', 'cyan', 'purple', 'mint', 'rose', 'orange'] },
    mode: { control: 'radio', options: ['light', 'light-tint', 'invert-blue', 'invert-navy'] },
  },
} satisfies Meta<typeof PersonCard>

export default meta
type Story = StoryObj<typeof meta>

/** No `src`: initials in the ring. Real portraits never pair with an invented name; pass `/assets/team/team-*.webp` on team slides. */
export const Initials: Story = {
  args: { name: 'Jordan Rivera', role: 'Engagement lead', bio: 'Ten years shipping regulated software.' },
  decorators: [(S) => <div style={{ width: 420 }}><S /></div>],
}

export const OnInvertNavy: Story = {
  args: { name: 'Sam Carter', role: 'Staff engineer', mode: 'invert-navy' },
  decorators: [(S) => <div style={{ width: 420, background: 'var(--surface-invert-navy)', padding: 48 }}><S /></div>],
}
