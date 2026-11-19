import type { Meta, StoryObj } from '@storybook/react-vite'
import { SlideSprintSteps } from './SlideSprintSteps'

const meta = {
  title: 'Patterns/SlideSprintSteps',
  component: SlideSprintSteps,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideSprintSteps>

export default meta
type Story = StoryObj<typeof meta>

/** Content and assets of frame 427:1314 (Product Timeline | Alt 02) */
export const ProductTimelineAlt02: Story = {
  name: 'Product Timeline | Alt 02',
  args: {
    eyebrow: 'MVP AI FAST-TRACK',
    title: 'How the sprint works',
    subtitle: 'From a focused idea to a working product in five steps.',
    background: <img src="/assets/shared/sprint-background.svg" alt="" />,
    footerStrip: <img src="/assets/shared/footer-strip-14.svg" alt="" />,
    steps: [
      { index: 1, title: 'Map', accent: 'teal', lines: ['Align on the core problem,', 'user journey, golden path,', 'and success criteria.'] },
      { index: 2, title: 'Shape', accent: 'aqua', lines: ['Define the lean MVP', 'scope, data model, and', 'experience needed to', 'make the core workflow', 'real.'] },
      { index: 3, title: 'Build', accent: 'sky', lines: ['Agentic engineering turns', 'the golden path into a', 'functioning end-to-end', 'product.'] },
      { index: 4, title: 'Reality Check', accent: 'blue', lines: ['We deploy to a live private', 'URL and walk you through', 'what works, what is', 'intentionally', 'pre-production, and what', 'it takes to go from this', 'launch to an audit-ready', 'one.'] },
      { index: 5, title: 'Demo & Handoff', accent: 'navy', lines: ['Demo the product, hand', 'over the repository and', 'assets, and define the', 'next phase of', 'development.'] },
    ],
  },
}
