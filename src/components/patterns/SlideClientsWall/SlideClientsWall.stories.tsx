import type { Meta, StoryObj } from '@/components/story'
import { SlideClientsWall } from './SlideClientsWall'

const meta = {
  title: 'Patterns/SlideClientsWall',
  component: SlideClientsWall,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideClientsWall>

export default meta
type Story = StoryObj<typeof meta>

const title = 'Teams we’ve built with'
const accent = 'since 2013'

/** The 12 logos of the original template: three full rows. */
export const Default: Story = {
  args: {
    eyebrow: 'OUR CLIENTS',
    title,
    accent,
    clients: [
      'Medplum',
      'Carta',
      'Unilever',
      'UNDP',
      'Quilted Health',
      'Everself',
      'Rewind',
      'Perci Health',
      'PlusPlus',
      'Lastmile',
      'Tesorio',
      'Splendid Spoon',
    ],
  },
}

/** Two full rows, healthcare clients only. */
export const EightClients: Story = {
  args: {
    title,
    accent,
    clients: ['Medplum', 'Mayo Clinic', 'Quilted Health', 'Everself', 'Rewind', 'Perci Health', 'Brain Health USA', 'Origin Therapy'],
  },
}
