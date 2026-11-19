import type { Meta, StoryObj } from '@storybook/react-vite'
import { SlideWhatWeHeardCards } from './SlideWhatWeHeardCards'

const meta = {
  title: 'Patterns/SlideWhatWeHeardCards',
  component: SlideWhatWeHeardCards,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideWhatWeHeardCards>

export default meta
type Story = StoryObj<typeof meta>

const A = '/assets/what-we-heard'

/** Real assets exported from Figma (node 427:480) */
export const WhatWeHeardB: Story = {
  name: 'What we heard B',
  args: {
    title: 'What we heard',
    cards: [
      { art: <img src={`${A}/card-b1.svg`} alt="" />, title: 'Custom EHR on Medplum with Strong Data Foundations' },
      { art: <img src={`${A}/card-b2.svg`} alt="" />, title: 'Robust Data Ingestion Across Devices and Formats' },
      { art: <img src={`${A}/card-b3.svg`} alt="" />, title: 'AI-Powered Clinical Workflows' },
    ],
    thirdBadge: <img src={`${A}/badge-b3.svg`} alt="" />,
    background: <img src={`${A}/background-b.png`} alt="" />,
  },
}
