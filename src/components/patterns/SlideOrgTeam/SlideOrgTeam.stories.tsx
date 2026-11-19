import type { Meta, StoryObj } from '@storybook/react-vite'
import { Highlight } from '../../elements/Highlight'
import { SlideOrgTeam } from './SlideOrgTeam'

const meta = {
  title: 'Patterns/SlideOrgTeam',
  component: SlideOrgTeam,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideOrgTeam>

export default meta
type Story = StoryObj<typeof meta>

/** Three areas, five open seats. Names are examples next to studio portraits (team slides only). */
export const ThreeAreas: Story = {
  args: {
    eyebrow: 'SAMPLE COPY · THE PEOPLE BEHIND THE PLAN',
    title: (
      <>
        The <Highlight>growth</Highlight> team
      </>
    ),
    groups: [
      {
        label: 'Leadership',
        people: [
          { name: 'Jordan Rivera', role: 'CEO', photo: '/assets/team/team-1.webp' },
          { name: 'Priya Nair', role: 'Head of growth', photo: '/assets/team/team-3.webp' },
        ],
      },
      {
        label: 'Marketing',
        people: [
          { name: 'Product marketing', role: 'To be hired', open: true },
          { name: 'Sam Carter', role: 'Tech copywriter', photo: '/assets/team/team-2.webp' },
          { name: 'Growth analyst', role: 'To be hired', open: true },
          { name: 'Ana Souza', role: 'Visual designer', photo: '/assets/team/teamph-1.webp' },
          { name: 'Web designer', role: 'To be hired', open: true },
        ],
      },
      {
        label: 'Sales & partnerships',
        people: [
          { name: 'Lucas Prado', role: 'Business executive', photo: '/assets/team/teamph-2.webp' },
          { name: 'Business executive', role: 'To be hired', open: true },
        ],
      },
    ],
  },
}

/** Two areas, no photos (dashed placeholders), grid on. */
export const TwoAreasPlaceholders: Story = {
  args: {
    eyebrow: 'SAMPLE COPY · PROJECT TEAM',
    title: 'Who works on the pilot',
    groups: [
      { label: 'Vinta', people: [{ name: 'Jordan Rivera', role: 'Engagement lead' }, { name: 'Sam Carter', role: 'Staff engineer' }, { name: 'Priya Nair', role: 'Product designer' }, { name: 'QA engineer', role: 'Joins in week 3', open: true }] },
      { label: 'Northwind Health', people: [{ name: 'Clinical lead', role: 'Owns the care model' }, { name: 'IT manager', role: 'Access and integrations' }] },
    ],
    grid: true,
  },
}
