import type { Meta, StoryObj } from '@storybook/react-vite'
import { SlideCover } from './SlideCover'

const meta = {
  title: 'Patterns/SlideCover',
  component: SlideCover,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: { variant: { control: 'radio', options: ['mesh', 'split', 'night'] } },
} satisfies Meta<typeof SlideCover>

export default meta
type Story = StoryObj<typeof meta>

export const Mesh: Story = {
  args: {
    variant: 'mesh',
    eyebrow: 'A FOCUSED SPRINT',
    title: 'MVP AI',
    accent: 'Fast-track',
    lede: 'A working MVP in 4 weeks',
    tags: ['4 WEEKS', 'FIXED PRICE', 'FHIR + HIPAA'],
  },
}

export const Split: Story = {
  args: {
    variant: 'split',
    eyebrow: 'A FOCUSED SPRINT',
    title: 'MVP AI',
    accent: 'Fast-track',
    lede: 'A working MVP in 4 weeks',
    tags: ['4 WEEKS', 'FIXED PRICE', 'FHIR + HIPAA'],
    photo: '/assets/team/cover-split.webp',
    photoAlt: 'Engineer working on a laptop',
  },
}

export const Night: Story = {
  args: {
    variant: 'night',
    eyebrow: 'A FOCUSED SPRINT',
    title: 'MVP AI',
    accent: 'Fast-track',
    lede: 'A working MVP in 4 weeks',
    tags: ['4 WEEKS', 'FIXED PRICE', 'FHIR + HIPAA'],
    preparedFor: 'PREPARED FOR NORTHWIND HEALTH  ·  MAY 2026',
  },
}
