import type { Meta, StoryObj } from '@/components/story'
import { SlideTwoColumn } from './SlideTwoColumn'
import { Highlight } from '../../elements/Highlight'

const meta = {
  title: 'Patterns/SlideTwoColumn',
  component: SlideTwoColumn,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    tone: { control: 'radio', options: ['light', 'tint', 'invert-blue', 'invert-navy', 'vivid'] },
    mediaSide: { control: 'radio', options: ['left', 'right'] },
  },
} satisfies Meta<typeof SlideTwoColumn>

export default meta
type Story = StoryObj<typeof meta>

const base = {
  eyebrow: 'THE PRODUCT',
  title: 'Intake, booking and results',
  accent: 'in one patient app',
  lede: 'Patients fill in intake, book and read results in one app; staff see all of it in one queue.',
  bullets: ['Role-based access out of the box', 'Audit trail on every change'],
  cta: 'SEE THE INTAKE FLOW',
  photo: '/assets/team/two-column.webp',
  photoAlt: 'Vinta engineer smiling at work',
}

/** Wash background, CTA as a button. */
export const ImageRight: Story = { args: base }
/** Blue mesh, CTA as a link; photo on the left. */
export const ImageLeftInvertBlue: Story = { args: { ...base, tone: 'invert-blue', mediaSide: 'left' } }
/** Without photo or media: the dashed placeholder. */
export const Placeholder: Story = { args: { ...base, tone: 'invert-navy', photo: undefined } }
/** Back-compat: `tone="vivid"`, title array with `<Highlight>`, `body` instead of `lede`. */
export const Vivid: Story = {
  args: {
    tone: 'vivid',
    eyebrow: base.eyebrow,
    title: ['Intake, booking and results', <Highlight>in one patient app</Highlight>],
    body: base.lede,
    bullets: base.bullets,
    photo: base.photo,
    photoAlt: base.photoAlt,
  },
}
