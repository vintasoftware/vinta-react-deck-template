import type { Meta, StoryObj } from '@/components/story'
import { Users } from 'lucide-react'
import { Highlight } from '../../elements/Highlight'
import { SlideProfileCards } from './SlideProfileCards'

const meta = {
  title: 'Patterns/SlideProfileCards',
  component: SlideProfileCards,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideProfileCards>

export default meta
type Story = StoryObj<typeof meta>

/** An ideal customer profile: four attributes and two pains (fictional). */
export const FourAttributes: Story = {
  args: {
    eyebrow: 'SAMPLE COPY · ICPS · 1 OF 5 · PROFILE',
    title: '1 · Specialty clinic in expansion',
    persona: { label: 'Focus persona', value: 'Clinician owner', icon: Users },
    lede: (
      <>
        A growing US specialty clinic <Highlight>whose technology became the bottleneck</Highlight>, with no technical team to fix it.
      </>
    ),
    attributes: [
      { label: 'Segment', value: 'Specialty care provider' },
      { label: 'Size', value: '10 to 100', big: true, detail: 'providers, in more than one site' },
      { label: 'Tech stack', value: 'Off-the-shelf or custom that does not scale' },
      { label: 'Tech team', value: 'None, or very small' },
    ],
    pains: [
      { text: 'The operation hits the system: wrong billing, workflows the EHR does not cover.' },
      { text: 'Technical execution already failed once, with a bad vendor or a CTO change.' },
    ],
  },
}

/** Five attributes with icon tiles, three pains, no persona chip, grid on. */
export const FiveAttributesIcons: Story = {
  args: {
    eyebrow: 'SAMPLE COPY · ICPS · 2 OF 5 · PROFILE',
    title: '2 · Health network modernizing',
    lede: 'A care-delivery organization with more than 100 providers and a budget to modernize the patient experience.',
    attributes: [
      { label: 'Segment', value: 'Multi-site care network' },
      { label: 'Size', value: '100+', big: true, detail: 'providers across states' },
      { label: 'Maturity', value: 'Established internal IT' },
      { label: 'Tech stack', value: 'Enterprise EHR plus legacy portals' },
      { label: 'Decides', value: 'CIO with a buying committee' },
    ],
    painsLabel: 'WHAT THEY STRUGGLE WITH',
    pains: [
      { text: 'Vendors compared on price; references requested.' },
      { text: 'Patient experience lags the clinical core.' },
      { text: 'Long procurement, many stakeholders.' },
    ],
    grid: true,
  },
}
