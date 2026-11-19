import type { Meta, StoryObj } from '@/components/story'
import { SlideMaintenanceServices } from './SlideMaintenanceServices'

const meta = {
  title: 'Patterns/SlideMaintenanceServices',
  component: SlideMaintenanceServices,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideMaintenanceServices>

export default meta
type Story = StoryObj<typeof meta>

/** Content and background of frame 427:974 */
export const MaintenanceServices: Story = {
  args: {
    title: 'Maintenance Services',
    description: 'For teams that are pausing product development but still need the application to remain stable and supported.',
    background: <img src="/assets/maintenance/background.png" alt="" />,
    coverage: {
      label: 'Service Coverage',
      items: [
        'Bug fixes for existing features',
        'Incident response and resolution during business hours',
        'Minor changes to API integrations, such as request/response changes, field or endpoint renaming, and field removal',
        'Critical library and dependency updates related to vulnerabilities',
      ],
    },
    exclusions: {
      label: 'Exclusions',
      items: [
        'Feature development',
        'Technical feasibility assessments',
        'Product reporting or strategic analysis',
        'Design deliverables, studies, or explorations',
        'Ongoing product advisory or Q&A',
        'Roadmap planning, scoping, or estimation',
        'On-call support (outside brazilian business hours)',
      ],
    },
    note: {
      label: 'Note:',
      text: 'Non-functional issues such as security, performance optimization, scalability, regulatory adjustments, etc., will only be addressed if they can be resolved with minor fixes that take only a few hours to implement.',
    },
  },
}
