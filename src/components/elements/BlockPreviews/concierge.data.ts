/* Data for the "AI Concierge" card (the site's `ai-concierge` block, `preview.kind === 'concierge'`).
   All data is fictional (made-up patients and doctor). */

/** One reading in the history (one point/bar of the chart). */
export interface ReadingPoint {
  /** Axis label (e.g. month). */
  label: string
  value: number
  /** Marks the most recent reading (highlighted in the chart). */
  latest?: boolean
}

/** Inline "reading history" widget (home blood pressure). */
export interface ReadingHistoryWidgetData {
  kind: 'reading-history'
  title: string
  /** Context line below the title (e.g. "Systolic · last reading Sep 28"). */
  source: string
  unit: string
  /** Status badge in the corner (e.g. "In range"). */
  status: string
  /** Target value: below it the reading is "in the zone". */
  target: number
  targetLabel: string
  /** Top of the bar scale (bar variant). */
  scaleMax: number
  /** Vertical window of the line chart (tailored variant). */
  window: { floor: number; ceiling: number }
  readings: ReadingPoint[]
  /** Perguntas sugeridas (chips). */
  suggestions: string[]
}

export interface ScheduleDay {
  /** Abbreviated weekday (e.g. "Mo"). */
  day: string
  /** Day of the month (e.g. "28"). */
  date: string
  selected?: boolean
}

export interface ScheduleSlot {
  time: string
  selected?: boolean
}

/** Widget inline "agendar consulta". */
export interface ScheduleWidgetData {
  kind: 'schedule'
  title: string
  provider: { initials: string; name: string; role: string }
  days: ScheduleDay[]
  slotLabel: string
  slots: ScheduleSlot[]
}

export type ConciergeWidget = ReadingHistoryWidgetData | ScheduleWidgetData

export interface ConciergeMessageTurn {
  from: 'patient' | 'assistant'
  text: string
}

export interface ConciergeWidgetTurn {
  widget: ConciergeWidget
}

/** One conversation turn: a message or an inline widget. */
export type ConciergeTurn = ConciergeMessageTurn | ConciergeWidgetTurn

/** Concierge preview data: the conversation (and widgets) the card shows. */
export interface ConciergePreview {
  kind: 'concierge'
  turns: ConciergeTurn[]
}

export const DEFAULT_CONCIERGE_PREVIEW: ConciergePreview = {
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
}

/* ---------- "Tailored" card conversation (Qe): fixed text on the site; the widgets come from the preview ---------- */

/** Where each widget enters the tailored card's conversation. */
export type TailoredStep =
  | { from: 'patient' | 'assistant'; text: string }
  | { widget: 'reading-history' | 'schedule' | 'booked-visit' }

export const TAILORED_CONVERSATION: TailoredStep[] = [
  { from: 'patient', text: 'Hi Dr. Braga! I’ve been logging my blood pressure at home. How does it look?' },
  {
    from: 'assistant',
    text: 'Hi Ava, I’m the care assistant on Dr. Braga’s team. She’s with patients this morning, so I’ll walk you through it. Good news first: since the new dose, your readings are back in your target zone.',
  },
  { widget: 'reading-history' },
  { from: 'patient', text: 'Oh, good. I do get a bit dizzy when I stand up, though. Should I worry?' },
  {
    from: 'assistant',
    text: 'Thanks for telling me. Dr. Braga has seen your log and would like to check your pressure in person, standing up, to see whether the dose needs a change. Here’s her week. Pick whatever suits you.',
  },
  { widget: 'schedule' },
  { from: 'patient', text: 'Thursday at 9:30 works for me.' },
  { widget: 'booked-visit' },
  { from: 'patient', text: 'Perfect, thank you!' },
  {
    from: 'assistant',
    text: 'You’re all set, Ava. Nice work keeping that log. If the dizziness gets worse before Thursday, write here and the team will see it right away.',
  },
]

/** Text of the header, the booked visit card and the message field of the tailored card. */
export const CONCIERGE_COPY = {
  presence: 'Care team online',
  patientName: 'Ava Bennett',
  patientMeta: 'Dr. Braga · Cardiology',
  composerPlaceholder: 'Ask about your care…',
  booked: {
    kicker: 'Booked',
    title: 'Blood pressure follow-up',
    location: 'Tallgrove Health, Alder St',
    note: 'Until then, stand up slowly and keep logging. Your check-in forms arrive on Wednesday.',
  },
}

/** Concierge tour timings (ms): pause, scroll to the end, read, scroll back. */
export const CONCIERGE_TOUR = { lead: 1000, scrollDown: 7000, read: 1500, scrollUp: 5000 }
