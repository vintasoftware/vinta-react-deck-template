import type { Meta, StoryObj } from '@/components/story'
import {
  ArrowLeftRight,
  BotMessageSquare,
  ClipboardPlus,
  Clock,
  Compass,
  FileCheck,
  IdCard,
  ScanSearch,
  Stethoscope,
  Timer,
  Workflow,
} from 'lucide-react'
import { SlideServiceMenu } from './SlideServiceMenu'

const meta = {
  title: 'Patterns/SlideServiceMenu',
  component: SlideServiceMenu,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: { background: { control: 'radio', options: ['wash', 'mesh'] } },
} satisfies Meta<typeof SlideServiceMenu>

export default meta
type Story = StoryObj<typeof meta>

/** Home page look: two groups and the teal "Not only healthcare" side card. */
export const TwoGroupsWithSideCard: Story = {
  args: {
    title: 'Where healthcare gets complex,',
    accent: 'we get to work',
    groups: [
      {
        label: 'BUILD YOUR PRODUCT',
        items: [
          {
            icon: Timer,
            name: 'MVP AI Fast-track',
            text: 'A working MVP in 4 weeks',
            highlight: true,
            chips: [
              { label: '4 weeks', icon: Clock },
              { label: 'Fixed price', icon: FileCheck },
            ],
          },
          { icon: BotMessageSquare, name: 'AI Agents & LLMs', text: 'Grounded in the record' },
          { icon: ClipboardPlus, name: 'EHR Development', text: 'New or modernized EHR' },
        ],
      },
      {
        label: 'CONNECT AND PLAN',
        items: [
          { icon: ArrowLeftRight, name: 'Integrations & Interop', text: 'FHIR-native data flows' },
          { icon: IdCard, name: 'CMS Interoperability', text: 'Paperless patient intake' },
          { icon: Compass, name: 'Healthcare Discovery', text: 'A validated prototype' },
          { icon: Stethoscope, name: 'Medplum Development', text: 'Senior FHIR engineers' },
        ],
      },
    ],
    sideCard: {
      eyebrow: 'ALL OUR SERVICES',
      title: (
        <>
          Not only
          <br />
          healthcare
        </>
      ),
      text: 'We also build custom software for legaltech, fintech, retail and government.',
      cta: 'Explore all services',
    },
  },
}

/** Services page look: three groups on the blue mesh, one highlighted service with chips. */
export const ThreeGroupsOnMesh: Story = {
  args: {
    background: 'mesh',
    title: 'Find the service that',
    accent: 'fits where you are',
    lede: 'Launch a new idea, modernize your EHR or connect what you run.',
    groups: [
      {
        label: 'SHAPE THE PRODUCT',
        items: [
          { icon: Timer, name: 'MVP AI Fast-track', text: 'A working MVP in 4 weeks' },
          {
            icon: ScanSearch,
            name: 'Product Framing',
            text: 'An MVP scope in 3 days',
            highlight: true,
            chips: [{ label: '3 days', icon: Clock }, 'Story map'],
          },
          { icon: Compass, name: 'Healthcare Discovery', text: 'A validated prototype' },
        ],
      },
      {
        label: 'BUILD THE CLINICAL CORE',
        items: [
          { icon: ClipboardPlus, name: 'EHR Development', text: 'Build or modernize' },
          { icon: Stethoscope, name: 'Medplum Development', text: 'Medplum partner team' },
          { icon: BotMessageSquare, name: 'AI Agents', text: 'Automation for care teams' },
        ],
      },
      {
        label: 'CONNECT THE ECOSYSTEM',
        items: [
          { icon: Workflow, name: 'Integration & Interop', text: 'EHRs, labs and payers' },
          { icon: IdCard, name: 'CMS Interoperability', text: 'Based on CMS.gov rules' },
        ],
      },
    ],
  },
}
