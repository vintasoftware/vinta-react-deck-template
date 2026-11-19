import type { Meta, StoryObj } from '@/components/story'
import { SlideIconCards } from './SlideIconCards'

const meta = {
  title: 'Patterns/SlideIconCards',
  component: SlideIconCards,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideIconCards>

export default meta
type Story = StoryObj<typeof meta>

export const FourCards: Story = {
  args: {
    eyebrow: 'WHAT WE ADD',
    title: 'What you keep',
    accent: 'after launch',
    lede: 'Four things that stay with your team when the engagement ends.',
    cards: [
      { title: 'Your own repository', text: 'Full code ownership from day one, with docs and a runbook.' },
      { title: 'Senior team', text: 'The engineers who built it keep supporting it after launch.' },
      { title: 'Security built in', text: 'Access control and audit trails from the first sprint.' },
      { title: 'Next-step proposal', text: 'A written plan for what to build after launch.' },
    ],
  },
}

export const ThreeCards: Story = {
  args: {
    eyebrow: 'WHAT WE ADD',
    title: 'What you keep',
    accent: 'after launch',
    lede: 'Three things that stay with Northwind Health when the engagement ends.',
    cards: [
      { title: 'Your own repository', text: 'Full code ownership from day one, with docs, a runbook and a handover session.' },
      { title: 'Senior team', text: 'The engineers who built it keep supporting it after launch.' },
      { title: 'Security built in', text: 'Access control and audit trails in place from the first sprint.' },
    ],
  },
}
