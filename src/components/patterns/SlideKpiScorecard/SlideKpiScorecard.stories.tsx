import type { Meta, StoryObj } from '@storybook/react-vite'
import { Banknote, Clock, Layers, Target, ThumbsUp, Users } from 'lucide-react'
import { SlideKpiScorecard } from './SlideKpiScorecard'

const meta = {
  title: 'Patterns/SlideKpiScorecard',
  component: SlideKpiScorecard,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideKpiScorecard>

export default meta
type Story = StoryObj<typeof meta>

const base = {
  eyebrow: 'SAMPLE DATA | Q3 REVIEW',
  title: 'Quarterly scorecard',
  accent: 'at a glance',
  kpis: [
    { icon: Banknote, label: 'REVENUE', value: '$4.8M', delta: '+12% vs Q2' },
    { icon: Layers, label: 'ACTIVE PROJECTS', value: '18', delta: '+3 vs Q2' },
    { icon: Target, label: 'ON-TIME DELIVERY', value: '94%', delta: '+4 pts vs Q2' },
    { icon: ThumbsUp, label: 'CLIENT NPS', value: '68', delta: '+9 vs Q2' },
    { icon: Users, label: 'AVG. TEAM SIZE', value: '7.5', delta: '−0.5 vs Q2', trend: 'down' },
    { icon: Clock, label: 'CYCLE TIME', value: '11 days', delta: '−2 days vs Q2', trend: 'down' },
    ],
} satisfies Story['args']

/** Sample data (fictional), as in the original "kpi-scorecard" template. */
export const Default: Story = { args: base }

/** Three KPIs: a single row, centered in the frame. */
export const ThreeKpis: Story = {
  args: { ...base, kpis: base.kpis.slice(0, 3) },
}

/** Four KPIs: laid out 2 × 2. */
export const FourKpis: Story = {
  args: { ...base, kpis: base.kpis.slice(0, 4) },
}
