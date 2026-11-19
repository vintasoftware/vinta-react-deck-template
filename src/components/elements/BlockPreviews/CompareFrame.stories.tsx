import type { Meta, StoryObj } from '@storybook/react-vite'
import { CompareFrame } from './CompareFrame'
import { withPreviewStage } from './PreviewStage'
import { markInteracted } from './shared'

markInteracted()

/** Sample panel (only to show the divider's clipping). */
function Demo({ title, tone }: { title: string; tone: string }) {
  return (
    <div style={{ height: '100%', display: 'grid', placeItems: 'center', background: tone, font: '600 1.5rem var(--font-sans, sans-serif)', color: 'var(--vinta-ink-950, #0b1020)' }}>
      {title}
    </div>
  )
}

const meta = {
  title: 'Elements/BlockPreviews/CompareFrame',
  component: CompareFrame,
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    name: 'Exemplo',
    live: true,
    skipInteractionGate: true,
    foundation: <Demo title="Foundation" tone="#eef3ff" />,
    tailored: <Demo title="Tailored" tone="#e8f6f3" />,
  },
  decorators: [withPreviewStage({ width: 840 })],
} satisfies Meta<typeof CompareFrame>
export default meta
type Story = StoryObj<typeof meta>

/** The divider sweeps on its own; drag, use the arrows or hover to pause. */
export const Live: Story = {}

/** Divider still at rest (38%). */
export const Static: Story = { args: { live: false } }
