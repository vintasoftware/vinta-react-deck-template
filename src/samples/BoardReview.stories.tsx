import type { Meta, StoryObj } from '@storybook/react-vite'
import { SlideCover } from '../components/patterns/SlideCover'
import { SlideNumberedGrid } from '../components/patterns/SlideNumberedGrid'
import { SlideAgenda } from '../components/patterns/SlideAgenda'
import { SlideHeroNumber } from '../components/patterns/SlideHeroNumber'
import { SlideBarChart } from '../components/patterns/SlideBarChart'
import { SlideStatTable } from '../components/patterns/SlideStatTable'
import { SlideLineChart } from '../components/patterns/SlideLineChart'
import { SlideVersus } from '../components/patterns/SlideVersus'
import { SlideStatRows } from '../components/patterns/SlideStatRows'
import { SlideMonthTimeline } from '../components/patterns/SlideMonthTimeline'
import { SlideBigStat } from '../components/patterns/SlideBigStat'
import { SlideContent } from '../components/patterns/SlideContent'
import { SlideIconCards } from '../components/patterns/SlideIconCards'

/** Sample presentation: a revenue plan taken to the board. Every number, client and project is fictional. */
const meta = {
  title: 'Samples/Board Review',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const quarters = (values: number[], projected = false) => values.map((value, i) => ({ label: `Q${i + 1}`, value, projected }))

export const Cover: Story = {
  name: '01 Cover',
  render: () => (
    <SlideCover
      variant="night"
      eyebrow="DAY 2 · BOARD ALIGNMENT"
      title="Revenue plan"
      accent="for 2027"
      lede="Revenue, projects, budget and expectations for next year"
      preparedFor="TUESDAY, NOVEMBER 10"
    />
  ),
}

export const HowToRead: Story = {
  name: '02 How to read each point',
  render: () => (
    <SlideNumberedGrid
      eyebrow="DAY 2 · BOARD ALIGNMENT"
      title="How to read each point"
      lede="Every point today comes with one of these two statuses."
      cards={[
        { title: 'Reference to refine', bullets: ['A starting point, not a final number', 'The group adjusts it during the week, with what the retrospective showed', 'Revenue and the project mix come with this status'] },
        { title: 'Pending a decision', bullets: ['Still open: we bring options, not an answer', 'Needs a decision before it enters the plan', 'Positioning, marketing and team come with this status'] },
      ]}
    />
  ),
}

export const Agenda: Story = {
  name: '03 Agenda',
  render: () => (
    <SlideAgenda
      eyebrow="DAY 2 · BOARD ALIGNMENT"
      title="Today's"
      accent="points"
      items={[
        { title: 'Revenue', detail: 'How much we want to bill in 2027', meta: 'TO REFINE' },
        { title: 'Number and mix of projects', detail: 'How many new projects, of which kind and when', meta: 'TO REFINE' },
        { title: 'Positioning and marketing', detail: 'What demand we need and how we measure it', meta: 'DECISION' },
        { title: 'Team', detail: 'What we expect from each area', meta: 'DECISION' },
      ]}
    />
  ),
}

export const Revenue: Story = {
  name: '04 Revenue',
  render: () => (
    <SlideHeroNumber
      eyebrow="01 · REVENUE · TO REFINE"
      title="Revenue"
      accent="for 2027"
      previous="3.4"
      value="3.6"
      caption="$ million in revenue, 2026 vs the 2027 hypothesis (+6%)"
      points={[
        '$300k a month on average, from $255k in January to a $340k peak in September.',
        'The total and the split by client and month are a reference for the group to refine.',
      ]}
    />
  ),
}

export const ByQuarter: Story = {
  name: '05 Revenue by quarter',
  render: () => (
    <SlideBarChart
      eyebrow="01 · REVENUE · TO REFINE"
      title="Revenue by quarter"
      accent="2025 to 2027, in $ thousands"
      groups={[
        { label: '2025', bars: quarters([700, 760, 810, 830]) },
        { label: '2026', bars: quarters([800, 830, 870, 900]) },
        { label: '2027', bars: quarters([795, 900, 968, 937], true) },
      ]}
      legend={{ actual: 'Revenue', projected: '* 2027 is the hypothesis' }}
    />
  ),
}

export const Sources: Story = {
  name: '06 Where revenue comes from',
  render: () => (
    <SlideStatTable
      eyebrow="01 · REVENUE · 2027"
      title="Where the revenue comes from"
      badge="REFERENCE · TO REFINE"
      hero={{ value: '$3.6M', caption: <>of revenue in 2027, <b>6% above</b> the $3.4M of 2026</> }}
      stats={[
        { value: '$2.4M', caption: 'from the current portfolio, 67% of the total' },
        { value: '$1.2M', caption: <>from <b>12 new projects</b>, 33% of the total</> },
      ]}
      table={{
        columns: [{ header: 'Source' }, { header: 'Detail' }, { header: 'Revenue', align: 'right' }],
        rows: [
          [{ chip: 'CURRENT' }, 'Four ongoing contracts at today’s monthly value', '$2.4M'],
          [{ chip: 'NEW', tone: 'navy' }, '6 discoveries, 4 continuing into development', '$560k'],
          [{ chip: 'NEW', tone: 'navy' }, '1 long-term enterprise engagement', '$340k'],
          [{ chip: 'NEW', tone: 'navy' }, '4 fast-track builds, 2 continuing into development', '$220k'],
          [{ chip: 'OUT', tone: 'muted' }, '1 custom software, non-healthcare', '$80k'],
        ],
        total: [{ chip: 'TOTAL', tone: 'ink' }, <><b>12</b> new projects + 4 contracts</>, '$3.6M'],
      }}
    />
  ),
}

export const ByMonth: Story = {
  name: '07 Revenue by month',
  render: () => (
    <SlideLineChart
      eyebrow="01 · REVENUE · TO REFINE"
      title="Revenue in 2027"
      accent="month by month, in $ thousands"
      labels={['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']}
      primary={{ label: 'Total revenue', values: [255, 268, 272, 290, 302, 308, 310, 318, 340, 312, 318, 307] }}
      reference={{ label: 'Current portfolio', values: [200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200] }}
      stats={[
        { value: '$340k', label: 'PEAK, IN SEPTEMBER' },
        { value: '$200k', label: 'FROM THE PORTFOLIO, EVERY MONTH' },
      ]}
    />
  ),
}

export const HowProjectsStart: Story = {
  name: '08 How projects start',
  render: () => (
    <SlideVersus
      eyebrow="02 · NUMBER AND MIX OF PROJECTS"
      title="How projects start"
      accent="two entry formats"
      vsLabel="OR"
      left={{
        title: 'Fast-track build',
        items: ['30 days, about $20k', 'Assessment while already building', 'Then we help the client go to market', 'Returns in a quarter for a 4-month build'],
      }}
      right={{
        title: 'Discovery',
        items: ['About $8k, then development', 'Deep workflow and technical analysis', 'A working prototype and an estimate', 'About 4 months of development at $25k'],
      }}
    />
  ),
}

export const NewProjects: Story = {
  name: '09 New projects',
  render: () => (
    <SlideStatRows
      eyebrow="02 · NUMBER AND MIX OF PROJECTS"
      title="New projects in 2027"
      lede="Twelve new projects add $1.2M: the starting point for the rest of the morning."
      rows={[
        { value: '6', unit: 'projects', title: 'Discovery', text: '$8k each; four continue into development at $25k a month.' },
        { value: '4', unit: 'projects', title: 'Fast-track build', text: '$20k each; two return for development within the year.' },
        { value: '1', unit: 'project', title: 'Long-term enterprise', text: 'About $28k a month, January to December.' },
        { value: '1', unit: 'project', title: 'Custom software, non-healthcare', text: '$20k a month, September to December.' },
      ]}
    />
  ),
}

export const WhenTheyStart: Story = {
  name: '10 When each project starts',
  render: () => (
    <SlideMonthTimeline
      eyebrow="02 · NUMBER AND MIX OF PROJECTS"
      title="When each project starts"
      columns={[
        { label: 'Q1', items: ['Enterprise engagement kicks off', 'Discoveries 01 and 02', 'Fast-track 01'] },
        { label: 'Q2', items: ['Discoveries 03 and 04', 'Fast-track 01 returns for development'] },
        { label: 'Q3', items: ['Discovery 05', 'Fast-tracks 02 and 03', 'Non-healthcare project starts'] },
        { label: 'Q4', items: ['Discovery 06', 'Fast-track 04, development moves to 2028'] },
      ]}
      bars={[
        { label: 'Enterprise engagement, all year', from: 0, to: 3 },
        { label: 'Development after the discoveries', from: 1, to: 3 },
        { label: 'Non-healthcare build', from: 2, to: 3 },
      ]}
    />
  ),
}

export const Demand: Story = {
  name: '11 Demand to attract',
  render: () => (
    <SlideBigStat
      tone="light"
      eyebrow="03 · POSITIONING AND MARKETING"
      title="The demand"
      accent="we need to attract"
      stats={[
        { value: '$1.2M', label: 'EXPECTED FROM NEW PROJECTS' },
        { value: '6', label: 'DISCOVERIES, 4 WITH DEVELOPMENT' },
        { value: '4', label: 'FAST-TRACK BUILDS' },
      ]}
    />
  ),
}

export const Positioning: Story = {
  name: '12 Positioning',
  render: () => (
    <SlideContent
      eyebrow="03 · POSITIONING AND MARKETING"
      title="Build vs. buy:"
      accent="the middle path"
      lede="Start from a proven foundation, reuse components and customize what sets the operation apart."
      bullets={[
        'Founders starting a product: the fast-track is the easiest entry',
        'Clinics that outgrew their tool: start from the operational pain',
        'Technical buyers: drawn by our platform expertise',
      ]}
    />
  ),
}

export const MarketingGoals: Story = {
  name: '13 Marketing expectations',
  render: () => (
    <SlideNumberedGrid
      eyebrow="03 · POSITIONING AND MARKETING"
      title="Marketing expectations"
      accent="for 2027"
      cards={[
        { title: 'Grow qualified inbound', bullets: ['Coordinated build vs. buy campaigns', 'Fast-track for new founders, the EHR for small practices', 'More search, content, campaigns and partnerships'] },
        { title: 'Sharpen the commercial position', bullets: ['Building blocks as a way to own custom software without starting from zero', 'Concrete gains in time, budget and flexibility'] },
        { title: 'Raise pipeline conversion', bullets: ['Reactivate opportunities with the new services', 'Proposals with demos, cases and delivery in phases'] },
      ]}
    />
  ),
}

export const Actions: Story = {
  name: '14 Actions',
  render: () => (
    <SlideNumberedGrid
      eyebrow="03 · POSITIONING AND MARKETING"
      title="The actions we have in mind"
      cards={[
        { title: 'Events: a stronger presence', bullets: ['Three industry conferences, with more talk about our own product', 'Community happy hours as a core channel', 'A side event with our closest partners'] },
        { title: 'Webinars: the build vs. buy middle path', bullets: ['Guests from partner companies', 'Clients who already went through a fast-track', 'One topic per quarter, recorded for nurturing'] },
        { title: 'Content: a sharper top of funnel', bullets: ['Inbound content more specific than today', 'Boosted with retargeting', 'Comparison pages for the main alternatives'] },
        { title: 'Ads and outbound: modest, on the pain', bullets: ['No generic ads: the pains of off-the-shelf tools', 'Well-segmented campaigns, in outbound and ads', 'Arguments already proven in recent deals'] },
      ]}
    />
  ),
}

export const Measures: Story = {
  name: '15 How we measure',
  render: () => (
    <SlideIconCards
      eyebrow="03 · POSITIONING AND MARKETING"
      title="How we measure"
      accent="marketing in 2027"
      lede="Marketing answers for the quality, progress and conversion of the pipeline, not only for leads."
      cards={[
        { label: 'INDICATOR 1', title: 'Qualified opportunities', text: 'Generated for fast-track and discovery. Target to be defined this week.' },
        { label: 'INDICATOR 2', title: 'Conversion into development', text: 'Share of those entries that become a development project. Target to be defined.' },
        { label: 'INDICATOR 3', title: 'Proposals closed', text: 'Proposals backed by the building blocks and the EHR. Target to be defined.' },
      ]}
    />
  ),
}

export const Team: Story = {
  name: '16 Team expectations',
  render: () => (
    <SlideNumberedGrid
      eyebrow="04 · TEAM"
      title="What we expect"
      accent="from each area"
      cards={[
        { title: 'Marketing: more qualified demand', bullets: ['Coordinated campaigns across the offer', 'Inbound aligned to fast-track and discovery', 'Strong positioning before the first call'] },
        { title: 'Sales: a better pipeline', bullets: ['Qualify better and read the buying moment', 'Work leads that are still defining scope', 'Realistic proposals that convert into development'] },
        { title: 'Strategy: technical edge as a sales edge', bullets: ['Clear priority profiles, positioning and offers', 'Campaigns sized to the real delivery capacity'] },
      ]}
    />
  ),
}
