import type { Meta, StoryObj } from '@storybook/react-vite'
import { SlideBookCall } from './SlideBookCall'
import { PhotoSlot } from '../../elements/PhotoSlot'
import { Body } from '../../elements/Body'

const meta = {
  title: 'Patterns/SlideBookCall',
  component: SlideBookCall,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideBookCall>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Talk to the team',
    accent: 'that would build it',
    text: 'We walk through your workflows and tell you what a first release would cover.',
    email: 'hello@example.com',
    contact: {
      name: 'Jordan Rivera',
      role: 'Partner, Healthcare',
      email: 'jordan@example.com',
      phone: '+1 (555) 014-2290',
      link: 'example.com/book',
      // No portrait: a studio photo never pairs with an invented name. Pass `photo` with the real contact's portrait.
    },
  },
}

export const NoPhoto: Story = {
  args: {
    eyebrow: 'NEXT STEP',
    title: 'Book 30 minutes',
    accent: 'with the engineers',
    text: 'Bring your workflow questions; the engineers who would build it answer them.',
    email: 'hello@example.com',
    contact: {
      name: 'Jordan Rivera',
      role: 'Partner, Healthcare',
      email: 'jordan@example.com',
      phone: '+1 (555) 014-2290',
    },
  },
}

/** `card` replaces the contact: here a dashed slot for a QR code. */
export const CustomCard: Story = {
  args: {
    title: 'Book your',
    accent: 'discovery call',
    text: 'Pick a time that works for your team. We will send the agenda the day before.',
    email: 'hello@example.com',
    card: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <PhotoSlot width="100%" height={464} radius="md" alt="QR code placeholder" />
        <Body tone="primary" ink="vivid">
          Scan to pick a time
        </Body>
        <Body weight="regular">Or open example.com/book on any device.</Body>
      </div>
    ),
  },
}
