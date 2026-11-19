import type { Meta, StoryObj } from '@storybook/react-vite'
import { SlideTwoPanels } from './SlideTwoPanels'

const meta = {
  title: 'Patterns/SlideTwoPanels',
  component: SlideTwoPanels,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideTwoPanels>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    eyebrow: 'ONE PLATFORM',
    title: 'Built for the practice',
    accent: 'and for the patient',
    tabs: ['Patient intake', 'Clinical visit', 'Ongoing care', 'Billing', 'Admin'],
    activeTab: 3,
    panels: [
      {
        label: 'FOR THE PRACTICE',
        accent: 'blue',
        items: [
          { text: 'Insurance eligibility check' },
          { text: 'Claims submission' },
          { text: 'Charge capture and coding' },
          { text: 'Patient billing' },
          { text: 'Provider payouts' },
          { text: 'Voice and fax' },
        ],
      },
      {
        label: 'FOR PATIENTS',
        accent: 'mint',
        items: [
          { text: 'Cost estimates' },
          { text: 'Statements and payments' },
          { text: 'Payment plans' },
          { text: 'Appointment scheduling' },
        ],
      },
    ],
  },
}
