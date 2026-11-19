import type { Meta, StoryObj } from '@/components/story'
import { SlideCaseStudy } from './SlideCaseStudy'
import { getCaseStudy } from './cases'

/** One story per published case (vintasoftware.com/clients). In a deck: `<SlideCaseStudy {...getCaseStudy('medplum')} />`. */
const meta = {
  title: 'Patterns/SlideCaseStudy',
  component: SlideCaseStudy,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideCaseStudy>

export default meta
type Story = StoryObj<typeof meta>

export const Medplum: Story = { args: getCaseStudy('medplum') }
export const UnSocialProtectionOrg: Story = { args: getCaseStudy('un-social-protection-org') }
export const QuiltedHealth: Story = { args: getCaseStudy('quilted-health') }
export const EverselfBariendo: Story = { args: getCaseStudy('everself-bariendo') }
export const Rewind: Story = { args: getCaseStudy('rewind') }
export const UnileverProductDiscovery: Story = { args: getCaseStudy('unilever-product-discovery') }
export const PerciHealth: Story = { args: getCaseStudy('perci-health') }
export const BrainHealthUsa: Story = { args: getCaseStudy('brain-health-usa') }
export const Altlegal: Story = { args: getCaseStudy('altlegal') }
export const Carta: Story = { args: getCaseStudy('carta') }
export const PatientCareMarketplace: Story = { args: getCaseStudy('patient-care-marketplace') }
export const ProptechStartup: Story = { args: getCaseStudy('proptech-startup') }
export const HealthcareTransferCenter: Story = { args: getCaseStudy('healthcare-transfer-center') }
export const ChildCareEhr: Story = { args: getCaseStudy('child-care-ehr') }
export const Lastmile: Story = { args: getCaseStudy('lastmile') }
export const Plusplus: Story = { args: getCaseStudy('plusplus') }
export const Bentobox: Story = { args: getCaseStudy('bentobox') }
export const CodeUnion: Story = { args: getCaseStudy('code-union') }
export const Stacklist: Story = { args: getCaseStudy('stacklist') }
export const Qikbook: Story = { args: getCaseStudy('qikbook') }
export const Inflr: Story = { args: getCaseStudy('inflr') }
export const Wytk: Story = { args: getCaseStudy('wytk') }
export const SplendidSpoon: Story = { args: getCaseStudy('splendid-spoon') }
export const NewCrop: Story = { args: getCaseStudy('new-crop') }
export const Axilent: Story = { args: getCaseStudy('axilent') }
export const Mamaefit: Story = { args: getCaseStudy('mamaefit') }
export const Closer: Story = { args: getCaseStudy('closer') }
export const Elife: Story = { args: getCaseStudy('elife') }
export const HummingHomes: Story = { args: getCaseStudy('humming-homes') }
export const Tesorio: Story = { args: getCaseStudy('tesorio') }
