import type { Meta, StoryObj } from '@/components/story'
import { SlideWhoIsVinta } from './SlideWhoIsVinta'
import { ImageFrame } from '../../elements/ImageFrame'

const meta = {
  title: 'Patterns/SlideWhoIsVinta',
  component: SlideWhoIsVinta,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideWhoIsVinta>

export default meta
type Story = StoryObj<typeof meta>

const A = '/assets/who-is-vinta'

const baseArgs = {
  title: ['AI and Healthcare product specialists,', 'from strategy to delivery'],
  body: (
    <>
      We design and build EHRs, patient and provider experiences, and interoperable healthcare
      <br />
      products, bringing product, design, and engineering expertise together from day one.
    </>
  ),
  metrics: [
    { label: '13+ years', description: 'Delivering software' },
    { label: '60+ experts', description: 'Full-stack product delivery' },
    { label: 'FHIR-first', description: 'Interoperable healthcare solutions' },
    { label: 'HIPAA-ready', description: 'Compliance-aware development' },
  ],
  logosLabel: 'TRUSTED BY LEADING ORGANIZATIONS',
}

/** Figma copy (427:1213) with the real assets */
export const WhoIsVinta: Story = {
  args: {
    ...baseArgs,
    logo: { name: 'Vinta', src: `${A}/vinta-logo.png`, width: 192, height: 44 },
    badge: { label: 'Clutch Top Web Developers Medical 2026', src: `${A}/badge-clutch.png`, width: 189, height: 204 },
    logos: [
      { name: 'Quilted Health', src: `${A}/client-quilted-health.png` },
      { name: 'Perci Health', src: `${A}/client-perci-health.png` },
      { name: 'Mayo Clinic', src: `${A}/client-mayo-clinic.png` },
      { name: 'Brain Health USA', src: `${A}/client-brain-health-usa.png` },
      { name: 'Unilever', src: `${A}/client-unilever.png` },
      { name: 'United Nations', src: `${A}/client-united-nations.png` },
    ],
  },
}

/** Version with placeholders — logos and seal still without assets */
export const Placeholders: Story = {
  args: {
    ...baseArgs,
    badge: { label: 'Clutch', sublabel: 'TOP WEB DEVELOPERS' },
    logos: [
      { name: 'Quilted Health' },
      { name: 'Perci Health' },
      { name: 'Mayo Clinic' },
      { name: 'Brain Health USA' },
      { name: 'Unilever' },
      { name: 'United Nations' },
    ],
  },
}

/** Swapped product windows: `image` and `secondaryImage` take any node */
export const CustomImages: Story = {
  name: 'Imagens personalizadas',
  args: {
    ...WhoIsVinta.args,
    image: (
      <ImageFrame variant="browser" width={840} height={542}>
        <img src="/assets/intro/background-clean.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </ImageFrame>
    ),
    secondaryImage: <img src="/assets/closing/background.png" alt="" style={{ borderRadius: 24 }} />,
  },
}
