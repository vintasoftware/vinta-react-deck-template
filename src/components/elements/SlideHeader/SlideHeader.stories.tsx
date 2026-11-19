import type { Meta, StoryObj } from '@storybook/react-vite'
import { SlideHeader } from './SlideHeader'
import { VividBackground } from '../VividBackground'

const meta = {
  title: 'Elements/SlideHeader',
  component: SlideHeader,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    layout: { control: 'radio', options: ['stacked', 'split'] },
    align: { control: 'radio', options: ['left', 'center'] },
    mode: { control: 'radio', options: ['light', 'invert-blue', 'invert-navy'] },
  },
  decorators: [
    (Story, ctx) => (
      <div style={{ position: 'relative', width: 1920, height: 540 }}>
        <VividBackground variant={ctx.args.mode === 'invert-blue' ? 'mesh' : ctx.args.mode === 'invert-navy' ? 'night' : 'wash'} />
        <div style={{ position: 'relative', padding: '112px 144px' }}>
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof SlideHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Stacked: Story = {
  args: {
    eyebrow: 'WHAT FAST USUALLY HIDES',
    title: 'PHI is serious business.',
    accent: 'We build like it',
    lede: 'AI makes demos easy; healthcare isn’t a sandbox. Your MVP goes live on a HIPAA-ready, FHIR-native foundation.',
  },
}

export const SplitOnMesh: Story = {
  args: {
    eyebrow: 'DEFINE WHAT TO BUILD',
    title: 'Know what to build, what to keep,',
    accent: 'and what it will take to move',
    lede: 'We assess your current EHR, map the workflows your team needs and leave you with a prioritized first release.',
    layout: 'split',
    mode: 'invert-blue',
  },
}

export const Centered: Story = {
  args: {
    title: 'Healthcare products',
    accent: 'we’ve designed and built',
    lede: 'Your care model shouldn’t bend to fit your software.',
    align: 'center',
  },
}
