import type { Meta, StoryObj } from '@storybook/react-vite'
import { PhotoSlot } from './PhotoSlot'

const meta = {
  title: 'Elements/PhotoSlot',
  component: PhotoSlot,
  parameters: { layout: 'centered' },
  argTypes: {
    overlay: { control: 'radio', options: ['none', 'blue', 'veil', 'fade'] },
    radius: { control: 'radio', options: ['none', 'sm', 'md', 'lg', 'circle'] },
    placeholder: { control: 'radio', options: ['light', 'dark'] },
  },
} satisfies Meta<typeof PhotoSlot>

export default meta
type Story = StoryObj<typeof meta>

const PHOTO = '/assets/journey-single-step/photo-1.png'

export const Photo: Story = { args: { src: PHOTO, alt: 'Team at work', width: 640, height: 420, radius: 'lg' } }
export const BlueOverlay: Story = { args: { ...Photo.args, overlay: 'blue' } }
export const Veil: Story = { args: { ...Photo.args, overlay: 'veil' } }
export const Circle: Story = { args: { src: PHOTO, alt: 'Portrait', width: 420, height: 420, radius: 'circle' } }
export const Placeholder: Story = { args: { alt: 'PLACEHOLDER: 640 × 420', width: 640, height: 420, radius: 'lg' } }
export const PlaceholderDark: Story = {
  args: { ...Placeholder.args, placeholder: 'dark' },
  render: (args) => (
    <div style={{ padding: 40, background: 'var(--vivid-blue)' }}>
      <PhotoSlot {...args} />
    </div>
  ),
}
