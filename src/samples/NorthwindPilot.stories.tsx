import type { Meta, StoryObj } from '@/components/story'
import { SlideIntro } from '../components/patterns/SlideIntro'
import { SlideAgenda } from '../components/patterns/SlideAgenda'
import { SlideWhatWeHeardCards } from '../components/patterns/SlideWhatWeHeardCards'
import { SlideContent } from '../components/patterns/SlideContent'
import { SlideComparison } from '../components/patterns/SlideComparison'
import { SlideBigStat } from '../components/patterns/SlideBigStat'
import { SlideClosing } from '../components/patterns/SlideClosing'

const meta = {
  title: 'Samples/Northwind Pilot',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const WWH = '/assets/what-we-heard'
const CLOSING = '/assets/closing'

/** 1 · Capa */
export const Cover: Story = {
  name: '01 Cover',
  render: () => (
    <SlideIntro
      eyebrow="PROPOSAL FOR NORTHWIND CLINICS"
      eyebrowAccent="orange"
      title={['Northwind', 'Portal']}
      subtitle="One front door for 12 clinics,"
      highlight="in 10 weeks"
      highlightAccent="orange"
      tags={['PATIENT PORTAL', '10 WEEKS']}
      background={<img src="/assets/intro/background-clean.png" alt="" />}
      showImage={false}
    />
  ),
}

/** 2 · Agenda */
export const Agenda: Story = {
  name: '02 Agenda',
  render: () => (
    <SlideAgenda
      eyebrow="TODAY"
      title={['Agenda']}
      items={[
        { title: 'Where Northwind is today', detail: '12 clinics, one patient experience to unify', meta: '10 MIN' },
        { title: 'What we heard from you', detail: 'Goals, risks and open questions', meta: '15 MIN' },
        { title: 'Our proposed approach', detail: 'A portal your patients use from week 10', meta: '20 MIN' },
        { title: 'Plans and next steps', detail: 'Spark, Forge and Scale compared', meta: '15 MIN' },
      ]}
    />
  ),
}

/** 3 · What we heard */
export const WhatWeHeard: Story = {
  name: '03 What we heard',
  render: () => (
    <SlideWhatWeHeardCards
      title="What we heard"
      cards={[
        { art: <img src={`${WWH}/card-b1.svg`} alt="" />, title: 'One portal for all 12 clinics' },
        { art: <img src={`${WWH}/card-b2.svg`} alt="" />, title: 'Booking that cuts no-shows' },
        { art: <img src={`${WWH}/card-b3.svg`} alt="" />, title: 'Launch in 10 weeks, privacy first' },
      ]}
      thirdBadge={<img src={`${WWH}/badge-b3.svg`} alt="" />}
      background={<img src={`${WWH}/background-b.png`} alt="" />}
    />
  ),
}

/** 4 · Abordagem proposta */
export const Approach: Story = {
  name: '04 Proposed approach',
  render: () => (
    <SlideContent
      eyebrow="OUR APPROACH"
      title="A portal built"
      accent="clinic by clinic"
      lead="We start with two pilot clinics, learn from real patients, then roll out to the rest of the network."
      bullets={[
        'Weeks 1-2: map patient journeys with clinic staff and agree on a clear scope',
        'Weeks 3-6: build booking, test results and secure messaging',
        'Weeks 7-8: pilot in two clinics, collect feedback and harden the product',
        'Weeks 9-10: roll out to all 12 units with training and support',
      ]}
      bulletVariant="number"
    />
  ),
}

/** 5 · Planos */
export const Plans: Story = {
  name: '05 Plans',
  render: () => (
    <SlideComparison
      eyebrow="PLANS"
      title="Choose the plan"
      accent="for Northwind"
      table={{
        columns: [{ title: 'Spark' }, { title: 'Forge', highlight: true }, { title: 'Scale' }],
        rows: [
          { label: 'Clinics at launch', cells: ['2', '6', '12'] },
          { label: 'Appointment booking', cells: [true, true, true] },
          { label: 'Results and messaging', cells: [false, true, true] },
          { label: 'Dedicated squad', cells: [false, false, true] },
          { label: 'Timeline', cells: ['4 weeks', '8 weeks', '10 weeks'] },
        ],
      }}
      note="Final scope and investment are confirmed after the discovery week."
    />
  ),
}

/** 6 · Case numbers */
export const Impact: Story = {
  name: '06 Impact',
  render: () => (
    <SlideBigStat
      eyebrow="A PREVIOUS CASE"
      title="What a similar"
      accent="network achieved"
      stats={[
        { value: '9', label: 'WEEKS FROM KICKOFF TO LAUNCH' },
        { value: '38%', label: 'FEWER MISSED APPOINTMENTS' },
        { value: '4.7', label: 'AVERAGE PATIENT APP RATING' },
      ]}
    />
  ),
}

/** 7 · Encerramento */
export const Closing: Story = {
  name: '07 Closing',
  render: () => (
    <SlideClosing
      title="Thank you!"
      contact={{
        name: 'Alex Example',
        role: 'Expansion lead',
        lines: [
          { icon: <img src={`${CLOSING}/icon-linkedin.svg`} alt="" />, text: '/alex-example' },
          { icon: <img src={`${CLOSING}/icon-phone.svg`} alt="" />, text: '+1 (555) 010-0123' },
          { icon: <img src={`${CLOSING}/icon-mail.svg`} alt="" />, text: 'alex@example.com' },
        ],
      }}
      background={<img src={`${CLOSING}/background.png`} alt="" />}
      rules={[<img key="1" src={`${CLOSING}/rule-1.svg`} alt="" />, <img key="2" src={`${CLOSING}/rule-2.svg`} alt="" />]}
      logo={<img src={`${CLOSING}/vinta-wordmark.svg`} alt="Vinta" />}
    />
  ),
}
