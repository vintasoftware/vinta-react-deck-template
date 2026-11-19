import type { Meta, StoryObj } from '@storybook/react-vite'
import { SlideFunnel } from './SlideFunnel'

const meta = {
  title: 'Patterns/SlideFunnel',
  component: SlideFunnel,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideFunnel>

export default meta
type Story = StoryObj<typeof meta>

/** Original sample content (fictional data). */
export const Default: Story = {
  args: {
    eyebrow: 'SAMPLE DATA | PIPELINE',
    title: 'Pipeline stages',
    accent: 'from lead to proposal',
    lede: 'Most leads stall before a scope conversation.',
    stages: [
      { label: 'LEADS', value: '1,240', description: 'Everyone who showed interest: inbound, referrals and events.' },
      { label: 'QUALIFIED', value: '312', description: 'Leads with a real need, budget and a decision maker in the room.' },
      { label: 'PROPOSALS', value: '64', description: 'Conversations that reached scope, estimate and a commercial proposal.' },
    ],
  },
}

export const FourStages: Story = {
  args: {
    eyebrow: 'SAMPLE DATA | ONBOARDING',
    title: 'Where new users',
    accent: 'drop off',
    stages: [
      { label: 'SIGN-UPS', value: '8,400', description: 'Accounts created in the first month after launch.' },
      { label: 'PROFILE DONE', value: '5,120', description: 'Finished the intake form and verified their email.' },
      { label: 'FIRST VISIT', value: '2,310', description: 'Booked and attended a first appointment.' },
      { label: 'RETURNING', value: '1,480', description: 'Came back for a second visit within 60 days.' },
    ],
  },
}
