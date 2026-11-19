import type { Meta, StoryObj } from '@/components/story'
import { CalendarDays, ClipboardCheck, Megaphone, PencilRuler, Receipt, UsersRound } from 'lucide-react'
import { SlideCover } from '../components/patterns/SlideCover'
import { SlideStoryStats } from '../components/patterns/SlideStoryStats'
import { SlideDataTable } from '../components/patterns/SlideDataTable'
import { SlideIconCards } from '../components/patterns/SlideIconCards'
import { SlideNumberedGrid } from '../components/patterns/SlideNumberedGrid'
import { SlideProductShowcase } from '../components/patterns/SlideProductShowcase'
import { SlideStepPath } from '../components/patterns/SlideStepPath'
import { SlidePhotoBand } from '../components/patterns/SlidePhotoBand'
import { SlideBookCall } from '../components/patterns/SlideBookCall'

/** Sample presentation: a partnership conversation with an infrastructure partner. Partner, clients and people are fictional. */
const meta = {
  title: 'Samples/Partnership',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const T = '/assets/team'

export const Cover: Story = {
  name: '01 Cover',
  render: () => (
    <SlideCover
      variant="mesh"
      eyebrow="PARTNERSHIP CONVERSATION"
      title="Vinta"
      accent="+ Lumen API"
      lede="Healthcare products built on modern infrastructure"
      tags={['WHO WE ARE', 'CLIENTS', 'NEXT STEPS']}
    />
  ),
}

export const WhoWeAre: Story = {
  name: '02 Who we are',
  render: () => (
    <SlideStoryStats
      eyebrow="WHO WE ARE"
      title="Healthcare product"
      accent="specialists"
      paragraphs={[
        'We design and build EHRs, patient and provider experiences and interoperable healthcare products.',
        'Product, design and engineering work together from day one, from a fast MVP to an audit-ready product.',
      ]}
      stats={[
        { value: '13+', label: 'years delivering software' },
        { value: '60+', label: 'full-stack experts' },
        { value: '30+', label: 'healthcare products' },
        { value: '4.9/5', label: 'average rating on Clutch', link: true },
      ]}
      photo={`${T}/points.webp`}
      photoAlt="Two engineers reviewing work at a laptop"
      photoPosition="45% 50%"
      badge="SINCE 2013"
    />
  ),
}

export const TrackRecord: Story = {
  name: '03 Track record',
  render: () => (
    <SlideDataTable
      eyebrow="TRACK RECORD"
      title="Healthcare products"
      accent="we've built"
      columns={[
        { header: 'CLIENT', width: 3 },
        { header: 'SEGMENT', width: 3 },
        { header: 'STARTING POINT', width: 2.4, style: 'tag' },
        { header: 'WHAT WE BUILT', width: 6 },
      ]}
      rows={[
        ['Northwind Clinics', 'Virtual primary care', 'Replace EHR', 'A custom EHR uniting messaging, fax and scheduling'],
        ['Cedar Sleep', 'Virtual sleep clinic', { value: 'From scratch', style: 'tag-solid' }, 'End-to-end care, from intake to insurance claims'],
        ['Willow Maternity', 'Midwife-led care', 'Rebuild legacy', 'Replaced a 12-year-old EHR with a modern build'],
        ['Atlas Ortho Group', 'Multi-site orthopedics', 'Replace EHR', 'An EHR designed around how the practice runs'],
        ['Harbor Health', 'Hospital system', 'New experience', 'Real-time visibility into transfers across sites'],
      ]}
    />
  ),
}

export const InPractice: Story = {
  name: '04 Lumen in practice',
  render: () => (
    <SlideIconCards
      eyebrow="LUMEN IN PRACTICE"
      title="Where we work together"
      accent="and where we could"
      lede="One client already live on Lumen, two more that could share it."
      cards={[
        { label: 'LIVE ON LUMEN', title: 'Cedar Sleep', text: 'Eligibility checks in production, with failed checks triaged by payer and error code.' },
        { label: 'POTENTIAL CLIENT', title: 'Atlas Ortho Group', text: 'Evaluating a move from its current clearinghouse, starting with eligibility.' },
        { label: 'POTENTIAL CLIENT', title: 'Willow Maternity', text: "Billing built into the EHR, ahead of next year's coding change." },
      ]}
    />
  ),
}

export const FitTogether: Story = {
  name: '05 Where we fit',
  render: () => (
    <SlideNumberedGrid
      eyebrow="PARTNERSHIP"
      title="Where Lumen and Vinta"
      accent="fit together"
      cards={[
        { title: 'API-first, built for engineering teams', bullets: ['For our clients: a modern API that fits FHIR projects, with no EDI files', 'For Lumen: we take on the integration for teams without engineering time'] },
        { title: 'Transactions from Lumen, experience from Vinta', bullets: ['For our clients: each team shapes its own intake and billing flow', 'For Lumen: a way into more kinds of healthcare products'] },
        { title: 'Flexibility that grows with the client', bullets: ['For our clients: sandbox, pay-as-you-go and volume plans on one stack', 'For Lumen: a path into clients of every size and stage'] },
        { title: 'Already working side by side', bullets: ['For our clients: a listed implementation partner and a shared channel', 'For Lumen: a partner that knows the product and raises questions early'] },
      ]}
    />
  ),
}

export const BuildingBlocks: Story = {
  name: '06 Building blocks',
  render: () => (
    <SlideProductShowcase
      eyebrow="COLLABORATION PATHS · BUILDING BLOCKS"
      title="A shared path"
      accent="into more products"
      lede="Modular foundations for the workflows healthcare products share, on FHIR and EHR agnostic. Lumen plugs into intake and billing."
    />
  ),
}

export const Paths: Story = {
  name: '07 Collaboration paths',
  render: () => (
    <SlideStepPath
      eyebrow="COLLABORATION PATHS"
      title="From one block"
      accent="to a joint offer"
      steps={[
        { icon: ClipboardCheck, label: 'ALREADY IN PRACTICE', title: 'Intake block', text: 'Paperless intake that confirms coverage in real time, before care begins.' },
        { icon: Receipt, label: 'NEXT', title: 'Billing block', text: 'Built from client workflows, ready for eligibility, claims and remittances.' },
        { icon: Megaphone, label: 'GROWING TOGETHER', title: 'Joint campaigns', text: 'A webinar, a shared case study and co-marketing around the blocks.' },
      ]}
    />
  ),
}

export const Events: Story = {
  name: '08 Events',
  render: () => (
    <SlidePhotoBand
      photo={`${T}/rich-band.webp`}
      photoAlt="Three people standing together"
      eyebrow="COLLABORATION PATHS · EVENTS"
      title="A stronger presence"
      accent="at the spring conference"
      cards={[
        { icon: CalendarDays, title: 'A side event', text: 'A happy hour that brings the partners and their teams together.' },
        { icon: UsersRound, title: 'A shared guest list', text: 'Each partner invites the clients and leads closest to them.' },
        { icon: PencilRuler, title: 'An open format', text: 'Still early: we would like Lumen to help shape it.' },
      ]}
    />
  ),
}

export const ThankYou: Story = {
  name: '09 Thank you',
  render: () => (
    <SlideBookCall
      eyebrow="GET IN TOUCH"
      title="Thank you,"
      accent="let's keep building"
      text="Questions, ideas or a client to introduce? Write to us and we will set up the next call."
      email="hello@example.com"
      contact={{ name: 'Jordan Rivera', role: 'Head of Growth', email: 'jordan@example.com', link: 'example.com' }}
    />
  ),
}
