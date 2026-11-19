import type { Meta, StoryObj } from '@storybook/react-vite'
import { ClientLogos } from './ClientLogos'

const meta = {
  title: 'Elements/ClientLogos',
  component: ClientLogos,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ClientLogos>

export default meta
type Story = StoryObj<typeof meta>

/** Every client logo extracted from the site's home, by name, with the link to the case.
 *  In code: `clientLogo('Medplum')` or `getClient('Everself')` (src/components/elements/Logo/clients.ts). */
export const Catalog: Story = {}
