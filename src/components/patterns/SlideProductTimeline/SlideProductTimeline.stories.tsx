import type { Meta, StoryObj } from '@storybook/react-vite'
import { SlideProductTimeline } from './SlideProductTimeline'

const meta = {
  title: 'Patterns/SlideProductTimeline',
  component: SlideProductTimeline,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideProductTimeline>

export default meta
type Story = StoryObj<typeof meta>

const A = '/assets/timeline-alt-01'
const bars = Array.from({ length: 6 }, () => 'Click to add Pre-title')

/** Real assets exported from Figma (node 427:630) */
export const ProductTimelineAlt01: Story = {
  name: 'Product Timeline | Alt 01',
  args: {
    title: 'MVP Journey',
    subtitle: 'Detailed development roadmap from foundation to billing migration',
    header: <img src={`${A}/header-band.png`} alt="" />,
    phases: [
      { label: 'phase 01', title: 'product discovery', duration: 'week 1', accent: 'purple', bars, guides: <img src={`${A}/column-1.svg`} alt="" /> },
      { label: 'phase 02', title: 'design & development', duration: 'week 2', accent: 'mint', bars, guides: <img src={`${A}/column-2.svg`} alt="" /> },
      { label: 'phase 03', title: 'mvp launch', duration: '1 week', accent: 'blue', bars, guides: <img src={`${A}/column-3.svg`} alt="" /> },
    ],
  },
}
