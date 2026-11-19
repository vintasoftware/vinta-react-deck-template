import type { Meta, StoryObj } from '@storybook/react-vite'
import { PenTool, Rocket, Search } from 'lucide-react'
import { SlideJourneySingleStep } from './SlideJourneySingleStep'

const meta = {
  title: 'Patterns/SlideJourneySingleStep',
  component: SlideJourneySingleStep,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideJourneySingleStep>

export default meta
type Story = StoryObj<typeof meta>

const A = '/assets/journey-single-step'

const baseArgs = {
  title: ['The', 'Journey'],
  subtitle: (
    <>
      From <strong>Product Discovery</strong> to <strong>Long-Term Product Partnership</strong>
    </>
  ),
}

/** Real assets exported from Figma (node 427:810) */
export const ProductDiscovery: Story = {
  name: 'Phase 01 · Product Discovery',
  args: {
    ...baseArgs,
    phase: {
      index: 1,
      weeks: 2,
      title: ['Product', 'Discovery'],
      icon: Search,
      accent: 'purple',
      badge: <img src={`${A}/phase-badge.svg`} alt="" width={155} height={155} />,
    },
  },
}

/** No assets — what the team uses before having the photos */
export const Placeholders: Story = {
  args: { ...baseArgs, phase: { index: 1, weeks: 2, title: ['Product', 'Discovery'], icon: Search, accent: 'purple' } },
}

/** Phases 02 and 03: same template, seal as an IconBadge (Figma only has phase 01).
 *  Background/photos reused from phase 01 until the art for the others exists. */
export const DesignAndDevelopment: Story = {
  name: 'Phase 02 · Design & Development',
  args: {
    ...baseArgs,
    phase: { index: 2, weeks: 2, title: ['Design &', 'Development'], icon: PenTool, accent: 'mint' },
  },
}

export const MvpLaunch: Story = {
  name: 'Phase 03 · MVP Launch',
  args: {
    ...baseArgs,
    phase: { index: 3, weeks: 1, title: ['MVP', 'Launch'], icon: Rocket, accent: 'blue' },
  },
}

/** Swapped photos: the `photos` slot takes any image, cropped to a circle.
 *  photoTreatment="duotone" gives raw photos Figma's grayscale + tint. */
export const CustomPhotos: Story = {
  name: 'Fotos personalizadas',
  args: {
    ...baseArgs,
    phase: {
      index: 1,
      weeks: 2,
      title: ['Product', 'Discovery'],
      icon: Search,
      accent: 'purple',
      badge: <img src={`${A}/phase-badge.svg`} alt="" width={155} height={155} />,
    },
    photos: [
      <img src="/assets/who-is-vinta/window-secondary.png" alt="" style={{ objectPosition: 'center top' }} />,
      <img src="/assets/who-is-vinta/window-main.png" alt="" style={{ objectPosition: 'left top' }} />,
    ],
    photoTreatment: 'duotone',
  },
}
