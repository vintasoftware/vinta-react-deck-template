import type { Meta, StoryObj } from '@/components/story'
import { SlideTeam } from './SlideTeam'
import { Highlight } from '../../elements/Highlight'

const meta = {
  title: 'Patterns/SlideTeam',
  component: SlideTeam,
  parameters: { layout: 'fullscreen' },
  argTypes: { tone: { control: 'radio', options: ['light', 'tint', 'invert-blue', 'invert-navy', 'vivid'] } },
} satisfies Meta<typeof SlideTeam>

export default meta
type Story = StoryObj<typeof meta>

const people = [
  { name: 'Jordan Rivera', role: 'Engagement lead', bio: 'Ten years shipping regulated software.' },
  { name: 'Sam Carter', role: 'Staff engineer', bio: 'Owns architecture and delivery quality.' },
  { name: 'Priya Nair', role: 'Product designer', bio: 'Turns messy workflows into clear screens.' },
]
const withPhotos = people.map((person, i) => ({ ...person, src: `/assets/team/team-${i + 1}.webp` }))

const base = { eyebrow: 'YOUR TEAM', title: 'The people who', accent: 'will build it' }

/** Default tone (tint = wash), portraits in accent rings. */
export const Three: Story = { args: { ...base, people: withPhotos } }
/** Four people without photos: initials in the rings. */
export const Four: Story = {
  args: { ...base, tone: 'light', people: [...people, { name: 'Chris Lee', role: 'QA lead', bio: 'Keeps every release boring.' }] },
}
/** Night background, glass cards. */
export const InvertNavy: Story = { args: { ...base, tone: 'invert-navy', people: withPhotos } }
/** Back-compat: one-line title with a `<Highlight>`. */
export const Vivid: Story = {
  args: {
    tone: 'vivid',
    eyebrow: 'YOUR TEAM',
    title: (
      <>
        The people who <Highlight>will build it</Highlight>
      </>
    ),
    people: withPhotos,
  },
}
