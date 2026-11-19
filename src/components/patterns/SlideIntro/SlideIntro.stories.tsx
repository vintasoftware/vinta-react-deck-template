import type { Meta, StoryObj } from '@storybook/react-vite'
import { SlideIntro } from './SlideIntro'

const meta = {
  title: 'Patterns/SlideIntro',
  component: SlideIntro,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideIntro>

export default meta
type Story = StoryObj<typeof meta>

export const MVPFastTrack: Story = {
  name: 'Intro to project',
  args: {
    eyebrow: 'A FOCUSED SPRINT',
    eyebrowAccent: 'orange',
    title: ['MVP', 'AI Fast-track'],
    subtitle: 'A working MVP',
    highlight: 'in 4 weeks',
    highlightAccent: 'orange',
    tags: ['4 WEEKS', 'FIXED PRICE'],
  },
}

/** Figma art (node 427:1289): clean background + UI card as the `image` slot (default) */
export const MVPFastTrackFigmaArt: Story = {
  name: 'Intro to project · Figma art',
  args: {
    ...MVPFastTrack.args,
    background: <img src="/assets/intro/background-clean.png" alt="" />,
    imageFrame: false,
  },
}

/** Same art, with the `image` slot swapped for another image */
export const MVPFastTrackCustomImage: Story = {
  name: 'Intro to project · Imagem personalizada',
  args: {
    ...MVPFastTrackFigmaArt.args,
    image: <img src="/assets/who-is-vinta/window-main.png" alt="" />,
  },
}
