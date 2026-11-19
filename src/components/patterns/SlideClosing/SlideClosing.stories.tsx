import type { Meta, StoryObj } from '@/components/story'
import { SlideClosing } from './SlideClosing'

const meta = {
  title: 'Patterns/SlideClosing',
  component: SlideClosing,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideClosing>

export default meta
type Story = StoryObj<typeof meta>

const A = '/assets/closing'

const contact = {
  name: 'Alex Example',
  role: 'Expansion lead',
  lines: [
    { icon: <img src={`${A}/icon-linkedin.svg`} alt="" />, text: '/alex-example' },
    { icon: <img src={`${A}/icon-phone.svg`} alt="" />, text: '+1 (555) 010-0123' },
    { icon: <img src={`${A}/icon-mail.svg`} alt="" />, text: 'alex@example.com' },
  ],
}

/** Real assets exported from Figma (node 427:1178) */
export const ThankYou: Story = {
  args: {
    title: 'Thank you!',
    // No avatar: the Figma photo is a real person; the card adjusts without it (CLAUDE.md §8).
    contact,
    background: <img src={`${A}/background.png`} alt="" />,
    rules: [<img key="1" src={`${A}/rule-1.svg`} alt="" />, <img key="2" src={`${A}/rule-2.svg`} alt="" />],
    logo: <img src={`${A}/vinta-wordmark.svg`} alt="Vinta" />,
  },
}

/** No assets — what the team uses before having a photo/art */
export const Placeholders: Story = {
  args: { title: 'Thank you!', contact },
}
