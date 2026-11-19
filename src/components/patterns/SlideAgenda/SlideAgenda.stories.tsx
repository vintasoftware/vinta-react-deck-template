import type { Meta, StoryObj } from '@storybook/react-vite'
import { SlideAgenda } from './SlideAgenda'
import { Highlight } from '../../elements/Highlight'

const meta = {
  title: 'Patterns/SlideAgenda',
  component: SlideAgenda,
  parameters: { layout: 'fullscreen' },
  argTypes: { tone: { control: 'radio', options: ['light', 'tint', 'invert-blue', 'invert-navy', 'vivid'] } },
} satisfies Meta<typeof SlideAgenda>

export default meta
type Story = StoryObj<typeof meta>

const items = [
  { title: 'Where we are today', detail: 'The product, the team and the constraints', meta: '10 MIN' },
  { title: 'What we heard from you', detail: 'Goals, risks and open questions', meta: '15 MIN' },
  { title: 'Our proposed approach', detail: 'Validate, harden and launch a reliable V1', meta: '20 MIN' },
  { title: 'Timeline and investment', detail: 'Sprints, team and next steps', meta: '15 MIN' },
]

const base = { eyebrow: 'NORTHWIND HEALTH · KICKOFF', title: "Today's", accent: 'agenda', items }

/** Wash background, white cards. */
export const Light: Story = { args: { ...base, photo: '/assets/team/agenda.webp', photoAlt: 'Two Vinta teammates talking over a laptop' } }
/** Blue mesh, glass cards; no photo. */
export const InvertBlue: Story = { args: { ...base, tone: 'invert-blue' } }
/** Night background, glass cards. */
export const InvertNavy: Story = { args: { ...base, tone: 'invert-navy', photo: '/assets/team/agenda.webp', photoAlt: 'Two Vinta teammates talking over a laptop' } }
/** Back-compat: the old `title` array with a `<Highlight>` inside still works. */
export const Vivid: Story = {
  args: {
    tone: 'vivid',
    eyebrow: 'NORTHWIND HEALTH · KICKOFF',
    title: [
      <>
        Agen<Highlight>da</Highlight>
      </>,
    ],
    photo: '/assets/team/agenda.webp',
    photoAlt: 'Two Vinta teammates talking over a laptop',
    items,
  },
}
