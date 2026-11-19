import type { Meta, StoryObj } from '@storybook/react-vite'
import { ContactCard } from './ContactCard'

const meta = {
  title: 'Elements/ContactCard',
  component: ContactCard,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ContactCard>

export default meta
type Story = StoryObj<typeof meta>

const A = '/assets/closing'

/** No avatar: the Figma photo is a real person; the card adjusts without it (CATALOG.md, "Content and asset limits"). */
export const Default: Story = {
  args: {
    name: 'Alex Example',
    role: 'Expansion lead',
    lines: [
      { icon: <img src={`${A}/icon-linkedin.svg`} alt="" />, text: '/alex-example' },
      { icon: <img src={`${A}/icon-phone.svg`} alt="" />, text: '+1 (555) 010-0123' },
      { icon: <img src={`${A}/icon-mail.svg`} alt="" />, text: 'alex@example.com' },
    ],
  },
}
