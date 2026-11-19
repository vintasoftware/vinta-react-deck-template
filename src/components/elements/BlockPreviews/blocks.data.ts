import type { ConciergePreview } from './concierge.data'

/* Data for the "Same block, a different product every time" carousel blocks
   (port of the `_t` array from the site bundle, identical text and order). All fictional. */

/** Icons of the site's tabs/chips (reference; the deck carousel does not draw them). */
export type BlockIconName =
  | 'provider'
  | 'concierge'
  | 'intake'
  | 'billing'
  | 'calendar'
  | 'form'
  | 'inbox'
  | 'widget'
  | 'grow'
  | 'audit'
  | 'eligible'
  | 'qr'
  | 'next'

export interface BlockChip {
  label: string
  icon: BlockIconName
}

/* ---------- previews per block type ---------- */

export interface ProviderScheduleRow {
  time: string
  initials: string
  patient: string
  reason: string
}
export interface ProviderPreviewData {
  kind: 'provider'
  status: string
  schedule: ProviderScheduleRow[]
}

/** Concierge conversation: the type comes from `concierge.data` (the same one `Concierge` takes in `preview`). */
export type ConciergePreviewData = ConciergePreview

export interface IntakePreviewData {
  kind: 'intake'
  steps: { label: string; state: string }[]
}

export interface BillingPreviewData {
  kind: 'billing'
  claims: { patient: string; service: string; status: string; amount: string }[]
}

export type BlockPreviewData = ProviderPreviewData | ConciergePreviewData | IntakePreviewData | BillingPreviewData

export type BlockId = 'provider-experience' | 'ai-concierge' | 'intake' | 'provider-payouts'

/** A carousel block: supporting text + product mock data. */
export interface BlockData {
  /** Decides which mock renders (see `PreviewBody`) and the color of the glow behind the deck. */
  id: BlockId | (string & {})
  /** Card title. */
  label: string
  tabDescription: string
  icon: BlockIconName
  description: string
  /** Part of `description` the site highlights. */
  highlight: string
  bullets: string[]
  chips: BlockChip[]
  moreFrom?: 'provider' | 'patient'
  preview: BlockPreviewData
}

export const BLOCKS: BlockData[] = [
  {
    id: 'provider-experience',
    label: 'Provider Experience',
    tabDescription: 'Clinical workspace',
    icon: 'provider',
    description:
      'A working provider toolset with schedule, visits, charting and tasks already connected, shaped by us around how your clinicians work.',
    highlight: 'shaped by us around how your clinicians work',
    bullets: [
      'Put the day’s patients and tasks in one view',
      'Surface the right context at the point of care',
      'Hand work between providers without losing it.',
    ],
    chips: [
      { label: 'Schedule management', icon: 'calendar' },
      { label: 'Clinical documentation', icon: 'form' },
      { label: 'Tasks & worklists', icon: 'inbox' },
    ],
    moreFrom: 'provider',
    preview: {
      kind: 'provider',
      status: '8 patients today',
      schedule: [
        { time: '09:30', initials: 'AS', patient: 'Ana Souza', reason: 'Follow-up · Hypertension' },
        { time: '10:15', initials: 'ML', patient: 'Maya Lee', reason: 'Lab review · Lipid panel' },
        { time: '11:00', initials: 'JB', patient: 'Jon Bell', reason: 'New patient · Intake complete' },
      ],
    },
  },
  {
    id: 'ai-concierge',
    label: 'AI Concierge',
    tabDescription: 'Patient guidance',
    icon: 'concierge',
    description:
      'A working AI concierge that answers from each patient’s record and charts results with contextual widgets, refined by us to fit every encounter.',
    highlight: 'refined by us to fit every encounter',
    bullets: [
      'Explain results in plain language',
      'Book and prepare visits with inline widgets',
      'Escalate to people when it matters.',
    ],
    chips: [
      { label: 'Interactive widgets', icon: 'widget' },
      { label: 'Generated charts', icon: 'grow' },
      { label: 'In-chat booking', icon: 'calendar' },
      { label: 'Audit trail', icon: 'audit' },
    ],
    preview: {
      kind: 'concierge',
      turns: [
        { from: 'patient', text: 'I’ve been logging my blood pressure at home. How does it look?' },
        { from: 'assistant', text: 'Your readings are back in your target zone.' },
        {
          widget: {
            kind: 'reading-history',
            title: 'Home blood pressure',
            source: 'Systolic · last reading Sep 28',
            unit: 'mmHg',
            status: 'In range',
            target: 135,
            targetLabel: 'Target < 135',
            scaleMax: 160,
            window: { floor: 115, ceiling: 160 },
            readings: [
              { label: 'Jun', value: 151 },
              { label: 'Jul', value: 146 },
              { label: 'Aug', value: 142 },
              { label: 'Sep', value: 134, latest: true },
            ],
            suggestions: ['What do these numbers mean?', 'See every reading'],
          },
        },
        {
          from: 'assistant',
          text: 'Dr. Braga has seen your log and would like to check in about the dizziness. I can set that up right here. Pick a time that works.',
        },
        {
          widget: {
            kind: 'schedule',
            title: 'Schedule a visit',
            provider: { initials: 'RB', name: 'Dr. Rita Braga', role: 'Cardiology · Follow-up' },
            days: [
              { day: 'Mo', date: '28' },
              { day: 'Tu', date: '29' },
              { day: 'We', date: '30' },
              { day: 'Th', date: '1', selected: true },
              { day: 'Fr', date: '2' },
            ],
            slotLabel: 'Morning',
            slots: [{ time: '8:30 AM' }, { time: '9:30 AM', selected: true }, { time: '10:30 AM' }],
          },
        },
        { from: 'patient', text: 'Thursday at 9:30 works.' },
        { from: 'assistant', text: 'Booked for Thu 1, 9:30 AM with Dr. Braga. The details are on their way to your email.' },
      ],
    },
  },
  {
    id: 'intake',
    label: 'Patient Intake',
    tabDescription: 'Patient onboarding',
    icon: 'intake',
    description:
      'A working intake flow that takes each patient from first form to a booked, ready visit without dropping off, built by us around your patients and your care.',
    highlight: 'built by us around your patients and your care',
    bullets: [
      'Collect patient information before the visit',
      'Route intake to the right care team',
      'Connect intake to what happens next.',
    ],
    chips: [
      { label: 'Self-registration', icon: 'form' },
      { label: 'Eligibility check', icon: 'eligible' },
      { label: 'SMART Health Cards', icon: 'qr' },
    ],
    moreFrom: 'patient',
    preview: {
      kind: 'intake',
      steps: [
        { label: 'Patient details', state: 'Complete' },
        { label: 'Clinical history', state: 'In progress' },
        { label: 'Insurance', state: 'Upcoming' },
      ],
    },
  },
  {
    id: 'provider-payouts',
    label: 'Provider Payouts',
    tabDescription: 'Revenue cycle',
    icon: 'billing',
    description:
      'A working payouts flow that turns each signed visit into what every clinician is owed, paid on time and designed by us for the reality of your clinicians.',
    highlight: 'designed by us for the reality of your clinicians',
    bullets: [
      'Total each clinician’s signed visits',
      'Apply contract rates and adjustments',
      'Pay and track every payout.',
    ],
    chips: [
      { label: 'Visit-based earnings', icon: 'grow' },
      { label: 'Contract rates', icon: 'form' },
      { label: 'One-step approval', icon: 'audit' },
      { label: 'Payout tracking', icon: 'next' },
    ],
    preview: {
      kind: 'billing',
      claims: [{ patient: 'Dr. Rita Braga', service: 'Week of Sep 14', status: 'Ready', amount: '$2,380.00' }],
    },
  },
]
