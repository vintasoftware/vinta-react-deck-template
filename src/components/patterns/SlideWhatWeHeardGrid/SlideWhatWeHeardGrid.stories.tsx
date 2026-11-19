import type { Meta, StoryObj } from '@/components/story'
import { SlideWhatWeHeardGrid } from './SlideWhatWeHeardGrid'

const meta = {
  title: 'Patterns/SlideWhatWeHeardGrid',
  component: SlideWhatWeHeardGrid,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideWhatWeHeardGrid>

export default meta
type Story = StoryObj<typeof meta>

const A = '/assets/what-we-heard'
const move = 'Move off Healthie into a single custom portal, with all workflows owned by Cartwheel and backed by Medplum.'

/** Real assets exported from Figma (node 427:385) */
export const WhatWeHeardGrid: Story = {
  name: 'What we heard (grid)',
  args: {
    title: ['What', 'we heard'],
    summary: (
      <>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pellentesque id arcu id luctus. Donec at hendrerit mi, in commodo nibh.{' '}
        <strong>Vivamus luctus tellus quis ligula lacinia.</strong>
      </>
    ),
    cards: [
      { art: <img src={`${A}/card-a1.svg`} alt="" />, title: <>Centralized clinician &<br />admin experience</>, description: move },
      { art: <img src={`${A}/card-a2.svg`} alt="" />, title: <>Best-in-class scheduling<br />& charting</>, description: 'Highly reliable scheduling (including recurring appointments) and a strong clinical documentation experience.' },
      { art: <img src={`${A}/card-a3.svg`} alt="" />, title: <>Flexible migration &<br />rollout strategy</>, description: move },
      { art: <img src={`${A}/card-a4.svg`} alt="" />, title: <>Flexible migration &<br />rollout strategy</>, description: move },
    ],
    background: <img src={`${A}/background-a.png`} alt="" />,
  },
}
