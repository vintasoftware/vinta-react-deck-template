import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArtCard } from './ArtCard'

const meta = {
  title: 'Elements/ArtCard',
  component: ArtCard,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ padding: 80, background: 'var(--surface-invert-blue)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ArtCard>

export default meta
type Story = StoryObj<typeof meta>

const A = '/assets/what-we-heard'

/** What we heard B — title at the bottom, big seal */
export const TitleOnly: Story = {
  args: {
    size: 'lg',
    art: <img src={`${A}/card-b1.svg`} alt="" />,
    width: 474,
    height: 522,
    title: 'Custom EHR on Medplum with Strong Data Foundations',
    titleBox: { left: 36, top: 354, width: 419 },
  },
}

/** What we heard A — title + dashed line (in the art) + description */
export const WithDescription: Story = {
  args: {
    size: 'md',
    art: <img src={`${A}/card-a1.svg`} alt="" />,
    width: 425,
    height: 452,
    title: (
      <>
        Centralized clinician &<br />
        admin experience
      </>
    ),
    titleBox: { left: 32, top: 61, width: 300 },
    description: 'Move off Healthie into a single custom portal, with all workflows owned by Cartwheel and backed by Medplum.',
    descriptionBox: { left: 31.6, bottom: 40, width: 347.3 },
  },
}
