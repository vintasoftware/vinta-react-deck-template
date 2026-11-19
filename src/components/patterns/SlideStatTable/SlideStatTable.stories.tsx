import type { Meta, StoryObj } from '@storybook/react-vite'
import { SlideStatTable } from './SlideStatTable'

const meta = {
  title: 'Patterns/SlideStatTable',
  component: SlideStatTable,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideStatTable>

export default meta
type Story = StoryObj<typeof meta>

/** Revenue target broken down by horizon (fictional numbers). */
export const Default: Story = {
  args: {
    eyebrow: 'SAMPLE DATA · THREE HORIZONS · 2027 TARGETS',
    title: 'The 2027 targets by horizon',
    badge: 'REFERENCE · TO REFINE',
    hero: { value: '$5.1M', caption: <>of revenue in 2027, <b>6.2% above</b> the $4.8M of 2026</> },
    stats: [
      { value: '$3.4M', caption: 'from the current portfolio, 67% of the total' },
      { value: '$1.7M', caption: <>from <b>14 new projects</b>, 33% of the total</> },
    ],
    table: {
      columns: [{ header: 'Horizon' }, { header: 'New projects' }, { header: 'Revenue', align: 'right' }],
      rows: [
        [{ chip: 'H1' }, '8 healthcare discoveries, 6 with development', '$718k'],
        [{ chip: 'H1' }, '1 long-term enterprise engagement', '$420k'],
        [{ chip: 'H2', tone: 'navy' }, '4 MVP AI Fast-tracks, 2 with development', '$316k'],
        [{ chip: 'H3', tone: 'pale' }, 'No project target', ''],
        [{ chip: 'OUT', tone: 'muted' }, '1 custom software, non-healthcare', '$256k'],
      ],
      total: [{ chip: 'TOTAL', tone: 'ink' }, <><b>14</b> new projects</>, '$1.7M'],
    },
  },
}

/** Without the badge and the secondary numbers: a two-line title and a four-row table. */
export const HeroOnly: Story = {
  args: {
    eyebrow: 'SAMPLE DATA · PIPELINE',
    title: 'Where the pipeline',
    accent: 'stands this quarter',
    hero: { value: '76', caption: <>opportunities in <b>active interest</b>, up from 51 a year ago</> },
    table: {
      columns: [{ header: 'Profile' }, { header: 'Active', align: 'right' }, { header: 'Final', align: 'right' }, { header: 'Won', align: 'right' }],
      rows: [
        ['Specialty clinic in expansion', '49', '22', '6'],
        ['Health network modernizing', '12', '7', '2'],
        ['Digital health startup', '9', '4', '2'],
        ['Advisor-led company', '6', '3', '1'],
      ],
      total: ['Total', '76', '36', '11'],
    },
    grid: true,
  },
}
