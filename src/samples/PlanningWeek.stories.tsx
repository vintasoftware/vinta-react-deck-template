import type { Meta, StoryObj } from '@/components/story'
import { CalendarCheck, Flag, Users } from 'lucide-react'
import { SlideCover } from '../components/patterns/SlideCover'
import { SlideAgenda } from '../components/patterns/SlideAgenda'
import { SlideStatement } from '../components/patterns/SlideStatement'
import { SlideStatRows } from '../components/patterns/SlideStatRows'
import { SlideNumberedGrid } from '../components/patterns/SlideNumberedGrid'
import { SlideIconCards } from '../components/patterns/SlideIconCards'
import { SlideStatTable } from '../components/patterns/SlideStatTable'
import { SlideProfileCards } from '../components/patterns/SlideProfileCards'
import { SlideDataTable } from '../components/patterns/SlideDataTable'
import { SlideNumberedList } from '../components/patterns/SlideNumberedList'
import { SlideFunnel } from '../components/patterns/SlideFunnel'
import { SlideMonthTimeline } from '../components/patterns/SlideMonthTimeline'
import { SlideOrgTeam } from '../components/patterns/SlideOrgTeam'
import { Highlight } from '../components/elements/Highlight'

/**
 * Sample presentation: the summary of an internal strategic planning week. Every number, client, event and
 * person is fictional; names next to studio portraits are examples.
 */
const meta = {
  title: 'Samples/Planning Week',
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
      variant="night"
      eyebrow="GROWTH 2027 · WEEK SUMMARY"
      title="Strategic"
      accent="planning week"
      lede="What we defined from Monday to Thursday, and what starts now"
      preparedFor="FRIDAY, NOVEMBER 13"
    />
  ),
}

export const Week: Story = {
  name: '02 The week',
  render: () => (
    <SlideAgenda
      eyebrow="STRATEGIC PLANNING 2027"
      title="The week"
      accent="day by day"
      items={[
        { title: '2026 retrospective', detail: 'What did we learn, and what limits our growth?', meta: 'MON 9' },
        { title: 'Goals, profiles and offers', detail: 'Where do we want to grow, and what comes first?', meta: 'TUE 10' },
        { title: 'Demand and conversion plan', detail: 'How do we generate and convert those deals?', meta: 'WED 11' },
        { title: 'Capacity and operations', detail: 'How will the team deliver it?', meta: 'THU 12' },
        { title: 'Final plan and next steps', detail: 'What starts now, and how do we follow it?', meta: 'FRI 13' },
      ]}
    />
  ),
}

export const Retrospective: Story = {
  name: '03 Retrospective',
  render: () => (
    <SlideStatement
      background="mesh"
      eyebrow="DAY 1 · MONDAY, NOVEMBER 9"
      title="The 2026"
      accent="retrospective"
      lede="What 2026 showed in progress and in risk, and the actions the team raised for each bottleneck."
    />
  ),
}

export const Progress: Story = {
  name: '04 What shows progress',
  render: () => (
    <SlideStatRows
      eyebrow="DAY 1 · 2026 RETROSPECTIVE"
      title="What shows progress"
      rows={[
        { value: '9% → 61%', title: 'The shift to healthcare is done', text: 'Share of healthcare deals in the final stages, 2023 to 2026.' },
        { value: '72%', title: 'Conversion above the benchmark', text: 'From active interest to final stages, against a 45% market benchmark.' },
        { value: '7', unit: 'clients', title: 'Most new clients in the series', text: 'Against 3, 5 and 4 in the previous years.' },
        { value: '48 → 31', unit: 'days', title: 'Deals close faster', text: 'Days to win, 2025 to 2026, with more deals won.' },
        { value: '12 → 25', unit: 'deals', title: 'Inbound gained volume', text: 'Deals from search and AI answers, 2025 to 2026.' },
      ]}
    />
  ),
}

export const Risks: Story = {
  name: '05 What shows risk',
  render: () => (
    <SlideStatRows
      eyebrow="DAY 1 · 2026 RETROSPECTIVE"
      title="What shows risk"
      accent="and where it comes from"
      lede="The same funnel, read from the losses."
      tone="danger"
      rows={[
        { value: '0 of 6', title: 'No inbound deal closed', text: 'Six inbound deals reached the final stages in 2026; none converted.' },
        { value: '44%', unit: 'of losses', title: 'Timing is the main reason we lose', text: 'No demand and unresponsive together: the proposal arrives too early.' },
        { value: '70%', unit: 'of clients', title: 'Referrals depend on one partner', text: 'And referrals from that partner fell quarter after quarter.' },
        { value: '8', unit: 'closures', title: 'More engagements ended', text: 'The highest number in the series, five by the client’s decision.' },
      ]}
    />
  ),
}

export const Actions: Story = {
  name: '06 Actions for the bottlenecks',
  render: () => (
    <SlideNumberedGrid
      eyebrow="DAY 1 · ACTIONS · 01 INBOUND AND BUYING JOURNEY"
      title="Stay with the lead until it is ready to choose"
      cards={[
        { title: 'Content for leads still exploring', bullets: ['Top- and mid-funnel articles on specific workflows', 'Comparison tracks between platforms', 'A decision tree that maps the path for each lead'] },
        { title: 'Help the lead prepare before the call', bullets: ['Timeline and budget calculators on the site', 'A quiz on the service pages that points to a path', 'A sizing assistant on the blog, still to validate'] },
        { title: 'Nurture until the moment of purchase', bullets: ['An e-mail sequence per journey stage', 'A short video on how we work, one cut per page', 'Consulting material sent after the call'] },
        { title: 'Proposals that help the client decide', bullets: ['A live demo, so the lead sees flows working', 'The middle path in build vs. buy', 'Something the lead can forward to whoever approves the budget'] },
      ]}
    />
  ),
}

export const Horizons: Story = {
  name: '07 Three horizons',
  render: () => (
    <SlideIconCards
      eyebrow="DAY 2 · THREE HORIZONS"
      title="Where each offer"
      accent="fits in 2027"
      lede="Every service, product and partnership sits in one horizon, with its own measure and share of effort."
      cards={[
        { label: 'H1 · 70% OF EFFORT', title: 'Defend and extend the core', text: 'Discovery and custom builds. Measured by new clients, conversion, renewal and margin.' },
        { label: 'H2 · 20% OF EFFORT', title: 'Build the next engines', text: 'Fast-track builds, our own EHR and partner integrations. Measured by new pipeline.' },
        { label: 'H3 · 10% OF EFFORT', title: 'Create viable options', text: 'Fractional CTO, AI agents and new partners. Measured by hypotheses tested.' },
      ]}
    />
  ),
}

export const Targets: Story = {
  name: '08 Targets by horizon',
  render: () => (
    <SlideStatTable
      eyebrow="DAY 2 · THREE HORIZONS · 2027 TARGETS"
      title="The 2027 targets by horizon"
      badge="REFERENCE · TO REFINE"
      hero={{ value: '$3.6M', caption: <>of revenue in 2027, <b>6% above</b> the $3.4M of 2026</> }}
      stats={[
        { value: '$2.4M', caption: 'from the current portfolio, 67% of the total' },
        { value: '$1.2M', caption: <>from <b>12 new projects</b>, 33% of the total</> },
      ]}
      table={{
        columns: [{ header: 'Horizon' }, { header: 'New projects' }, { header: 'Revenue', align: 'right' }],
        rows: [
          [{ chip: 'H1' }, '6 discoveries, 4 with development', '$560k'],
          [{ chip: 'H1' }, '1 long-term enterprise engagement', '$340k'],
          [{ chip: 'H2', tone: 'navy' }, '4 fast-track builds, 2 with development', '$220k'],
          [{ chip: 'H3', tone: 'pale' }, 'No project target', ''],
          [{ chip: 'OUT', tone: 'muted' }, '1 custom software, non-healthcare', '$80k'],
        ],
        total: [{ chip: 'TOTAL', tone: 'ink' }, <><b>12</b> new projects</>, '$1.2M'],
      }}
    />
  ),
}

export const Profile: Story = {
  name: '09 Customer profile',
  render: () => (
    <SlideProfileCards
      eyebrow="DAY 2 · PROFILES · 1 OF 4"
      title="1 · Specialty clinic in expansion"
      persona={{ label: 'Focus persona', value: 'Clinician owner', icon: Users }}
      lede={
        <>
          A growing specialty clinic <Highlight>whose technology became the bottleneck</Highlight>, with no technical team to fix it.
        </>
      }
      attributes={[
        { label: 'Segment', value: 'Specialty care provider' },
        { label: 'Size', value: '10 to 100', big: true, detail: 'providers, in more than one site' },
        { label: 'Tech stack', value: 'Off-the-shelf, or custom that does not scale' },
        { label: 'Tech team', value: 'None, or very small' },
      ]}
      pains={[
        { text: 'The operation outgrew the system: billing errors, workflows the EHR does not cover.' },
        { text: 'A first attempt already failed, with a weak vendor or a change of CTO.' },
      ]}
    />
  ),
}

export const Priority: Story = {
  name: '10 Profiles in priority order',
  render: () => (
    <SlideDataTable
      eyebrow="DAY 2 · PROFILES · PRIORITY"
      title="The profiles"
      accent="in priority order"
      columns={[
        { header: 'PROFILE', width: 4.4 },
        { header: 'PERSONA', width: 3 },
        { header: 'ENTRY OFFER', width: 3, style: 'tag' },
        { header: 'SOURCE', width: 3 },
      ]}
      rows={[
        ['1 · Specialty clinic in expansion', 'Clinician owner', 'Discovery', 'Referral, inbound'],
        ['2 · Health network modernizing', 'Healthcare director', 'Proof of concept', 'Events, outbound'],
        ['3 · Company led by an advisor', 'Technical advisor', 'Discovery', 'Events, referral'],
        ['4 · Digital health startup', 'Non-clinical founder', 'Fast-track', 'Inbound, events'],
      ]}
    />
  ),
}

export const HowWePlanned: Story = {
  name: '11 How we built the plan',
  render: () => (
    <SlideNumberedList
      eyebrow="DAY 3 · HOW WE BUILT THE PLAN"
      title="From the funnel"
      accent="to each month's actions"
      items={[
        { title: 'Starting point', text: 'The priority profiles and the project mix behind the 2027 revenue hypothesis.' },
        { title: 'Funnel targets', text: 'The 2026 conversion rates, to size how many deals each stage needs.' },
        { title: 'Buying journey', text: 'How each profile buys, to find the actions that help it convert.' },
        { title: 'Schedule', text: 'Those actions, plus partnerships and events, spread month by month.' },
        { title: 'Routine', text: 'What runs all year and supports every goal.' },
      ]}
    />
  ),
}

export const Funnel: Story = {
  name: '12 The funnel',
  render: () => (
    <SlideFunnel
      eyebrow="DAY 3 · OPPORTUNITY VOLUME"
      title="The funnel"
      accent="the 2027 goals require"
      lede="Nine sales, not twelve: the enterprise deal is already in negotiation and two builds carry over from 2026."
      stages={[
        { label: 'ACTIVE INTEREST', value: '64', description: 'Deals with a real need, from referral, inbound and events.' },
        { label: 'FINAL STAGES', value: '46', description: 'Deals that reach scope, estimate and a proposal.' },
        { label: 'SALES', value: '9', description: 'New healthcare projects signed during the year.' },
      ]}
    />
  ),
}

export const FirstQuarter: Story = {
  name: '13 First quarter',
  render: () => (
    <SlideMonthTimeline
      eyebrow="DAY 3 · Q1 · JANUARY TO MARCH"
      title="Q1 revolves around the spring conference"
      columns={[
        { label: 'January', items: ['Conference communication plan', 'Side-event logistics', 'Plan the client video testimonials'] },
        { label: 'February', items: ['Side-event invitations', 'Define the next-step offer after discovery'] },
        { label: 'March', items: ['Communication before and after the conference', 'Post-conference follow-ups'] },
      ]}
      bars={[
        { label: 'Enterprise engagement signed', from: 0 },
        { label: 'Nurture sequence for the middle of the funnel', from: 0, to: 2 },
        { label: 'Reactivation campaign', from: 0, to: 1 },
        { label: 'Spring conference, with a partner side event', from: 2 },
      ]}
    />
  ),
}

export const TeamRoles: Story = {
  name: '14 The team',
  render: () => (
    <SlideOrgTeam
      eyebrow="DAY 4 · CAPACITY"
      title="Who owns what in 2027"
      groups={[
        {
          label: 'Leadership',
          people: [
            { name: 'Jordan Rivera', role: 'CEO · product and board goals', photo: `${T}/team-1.webp` },
            { name: 'Priya Nair', role: 'Head of growth · pipeline and KPIs', photo: `${T}/team-3.webp` },
          ],
        },
        {
          label: 'Marketing',
          people: [
            { name: 'Sam Carter', role: 'Tech copywriter', photo: `${T}/team-2.webp` },
            { name: 'Ana Souza', role: 'Visual designer', photo: `${T}/teamph-1.webp` },
            { name: 'Product marketing', role: 'To be hired', open: true },
          ],
        },
        {
          label: 'Sales',
          people: [
            { name: 'Lucas Prado', role: 'Business executive', photo: `${T}/teamph-2.webp` },
            { name: 'Business executive', role: 'To be hired', open: true },
          ],
        },
      ]}
    />
  ),
}

export const Stack: Story = {
  name: '15 Sales and marketing stack',
  render: () => (
    <SlideNumberedGrid
      eyebrow="DAY 4 · CAPACITY"
      title="The sales and marketing stack"
      cards={[
        { title: 'Already solid', bullets: ['Current tools serve the team, with AI filling many gaps', 'CRM migration done in 2026', 'An agent-driven site flow that works'] },
        { title: 'In progress', bullets: ['Automating the sales routines that are still manual', 'Agents for content production and search monitoring', 'Competitor monitoring reports'] },
        { title: 'To explore', bullets: ['Social analytics and monitoring', 'Building lead lists', 'Spotting buying-intent signals'] },
      ]}
    />
  ),
}

export const Wrap: Story = {
  name: '16 What starts now',
  render: () => (
    <SlideStatement
      background="night"
      eyebrow="FRIDAY · NEXT STEPS"
      title="The plan is set,"
      accent="now it starts"
      pills={[
        { icon: Flag, label: 'OWNERS NAMED' },
        { icon: CalendarCheck, label: 'MONTHLY KPI REVIEW' },
        { icon: Users, label: 'HIRING IN Q1' },
      ]}
    />
  ),
}
