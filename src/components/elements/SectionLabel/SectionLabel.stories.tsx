import type { Meta, StoryObj } from '@storybook/react-vite'
import { SectionLabel } from './SectionLabel'

const meta = {
  title: 'Elements/SectionLabel',
  component: SectionLabel,
  parameters: { layout: 'centered' },
  argTypes: {
    accent: { control: 'radio', options: ['blue', 'orange', 'sky'] },
    emphasis: { control: 'radio', options: ['strong', 'soft'] },
  },
} satisfies Meta<typeof SectionLabel>

export default meta
type Story = StoryObj<typeof meta>

export const ScopeCoverage: Story = { args: { children: 'Scope Coverage', accent: 'blue' } }
export const MainConcerns: Story = { args: { children: 'Main Concerns', accent: 'orange' } }
export const RecommendedApproach: Story = { args: { children: 'Recommended Approach', accent: 'sky', emphasis: 'soft' } }
