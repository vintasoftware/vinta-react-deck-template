import type { Meta, StoryObj } from '@/components/story'
import { SlideProposedApproach } from './SlideProposedApproach'

const meta = {
  title: 'Patterns/SlideProposedApproach',
  component: SlideProposedApproach,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideProposedApproach>

export default meta
type Story = StoryObj<typeof meta>

/** Figma copy (427:1046, which is a raster): same measurements and line breaks */
export const OurProposedApproach: Story = {
  name: 'Our proposed approach',
  args: {
    title: ['Our proposed', 'approach'],
    subtitle: 'A focused path to a production-ready V1',
    intro: (
      <>
        We will build on the existing product, focusing the engagement on
        <br />
        the work required to launch a secure and dependable V1 with real
        <br />
        users and real PHI.
      </>
    ),
    trackLeftLabel: 'UNKNOWNS',
    trackRightLabel: 'CONFIDENCE',
    stages: [
      {
        label: 'VALIDATE',
        title: 'Validate the existing V1',
        description: (
          <>
            Review the pilot-critical workflows and
            <br />
            code paths to determine what can be kept,
            <br />
            what needs to be strengthened, and what
            <br />
            can be deferred.
          </>
        ),
        saturation: 'tint',
        accent: 'mint',
      },
      {
        label: 'HARDEN',
        title: 'Harden for real-world use',
        description: (
          <>
            Address the most important risks across
            <br />
            Medplum authorization, clinic-level
            <br />
            isolation, production infrastructure,
            <br />
            auditability, and the Athena integration.
          </>
        ),
        saturation: 'tint',
        accent: 'blue',
      },
      {
        label: 'LAUNCH',
        title: 'Launch a reliable V1',
        description: (
          <>
            Validate the complete experience, integrations, and critical
            <br />
            edge cases, address final issues that could create friction
            <br />
            for the first physicians, and support a controlled rollout to
            <br />
            real users.
          </>
        ),
        saturation: 'solid',
      },
    ],
    callout: {
      leftLabel: 'ROUGH ESTIMATE',
      leftValue: '~1-2 months',
      rightLabel: 'FIRST WEEK MILESTONE',
      rightText: 'After the first week, we will share a refined V1 plan, updated forecast, and prioritized delivery sequence.',
    },
  },
}
