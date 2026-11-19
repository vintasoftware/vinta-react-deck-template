import type { Meta, StoryObj } from '@/components/story'
import { SlideStatRows } from './SlideStatRows'

const meta = {
  title: 'Patterns/SlideStatRows',
  component: SlideStatRows,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideStatRows>

export default meta
type Story = StoryObj<typeof meta>

/** Five facts that show progress (fictional retrospective data). */
export const Progress: Story = {
  args: {
    eyebrow: 'SAMPLE DATA · 2026 RETROSPECTIVE',
    title: 'What shows progress',
    rows: [
      { value: '7% → 67%', title: 'The shift to healthcare is done', text: 'Share of healthcare deals in active interest and final stages, 2023 to 2026. Bad-fit losses fell from 47% to 19%.' },
      { value: '77% · 22%', title: 'Conversions above the market benchmark', text: 'Active interest to final stages at 77% (benchmark 47%) and final stages to sale at 22% (benchmark 19%).' },
      { value: '8', unit: 'clients', title: 'Most new clients in the series', text: 'Against 4, 7 and 5 in the previous years.' },
      { value: '51 → 29', unit: 'days', title: 'Deals close faster', text: 'Days to win, 2025 to 2026. Under 50 days the market win rate rises to 47%.' },
      { value: '10 → 27', unit: 'deals', title: 'Inbound gained volume', text: 'Deals from search and AI answers, 2025 to 2026, projected at 32 to 37 by year end.' },
    ],
  },
}

/** Four risks in the danger tone, with a two-line title and a lede. */
export const Risks: Story = {
  args: {
    eyebrow: 'SAMPLE DATA · 2026 RETROSPECTIVE',
    title: 'What shows risk',
    accent: 'and where it comes from',
    lede: 'The same funnel, read from the losses.',
    tone: 'danger',
    rows: [
      { value: '0 of 8', title: 'No inbound deal closed in final stages', text: 'Eight inbound deals reached final stages in 2026; none converted.' },
      { value: '47%', unit: 'of losses', title: 'Timing is the main reason we lose', text: 'No demand and unresponsive together. In healthcare, 52% (15 of 29).' },
      { value: '3 of 4', title: 'Discovery projects that did not renew', text: 'Three of the four non-renewals were discovery-only engagements.' },
      { value: '9', unit: 'closures', title: 'Engagements ended in 2026', text: 'Six by the client’s decision, three by ours.' },
    ],
  },
}

/** Three rows with the 64px grid on. */
export const ThreeRowsGrid: Story = {
  args: { ...Progress.args, rows: Progress.args.rows.slice(0, 3), accent: 'after the first quarter', grid: true },
}
