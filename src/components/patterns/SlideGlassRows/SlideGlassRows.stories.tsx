import type { Meta, StoryObj } from '@/components/story'
import { Database, Users, FileText, Settings } from 'lucide-react'
import { SlideGlassRows } from './SlideGlassRows'

const meta = {
  title: 'Patterns/SlideGlassRows',
  component: SlideGlassRows,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: { color: { control: 'radio', options: ['green', 'purple'] } },
} satisfies Meta<typeof SlideGlassRows>

export default meta
type Story = StoryObj<typeof meta>

const rows = [
  { icon: Database, title: 'Your data', text: 'One longitudinal record per patient.' },
  { icon: Users, title: 'Your people', text: 'Roles and permissions that match your org.' },
  { icon: FileText, title: 'Your documents', text: 'Notes, forms and consents in one place.' },
  { icon: Settings, title: 'Your rules', text: 'Workflows you can change without a release.' },
]

export const Green: Story = {
  args: {
    color: 'green',
    eyebrow: 'THE FOUNDATION',
    title: 'The data model',
    accent: 'comes first',
    lede: 'Start with the data model, then shape the product around how your team works.',
    photo: '/assets/team/rich-glass-a.webp',
    photoAlt: 'Vinta team working together',
    rows,
  },
}

export const Purple: Story = {
  args: {
    color: 'purple',
    eyebrow: 'THE FOUNDATION',
    title: 'The data model',
    accent: 'comes first',
    lede: 'Start with the data model, then shape the product around how your team works.',
    photo: '/assets/team/rich-glass-b.webp',
    photoAlt: 'Vinta team working together',
    rows,
  },
}
