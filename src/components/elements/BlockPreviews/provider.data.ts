/* Fictional data for the "Provider Experience" mock (Groundwork EHR × Tallgrove Health). No real patient data. */
import { IMAGES } from './shared'

/* ---------- Groundwork EHR (foundation) ---------- */

export type PillStatus = 'confirmed' | 'awaiting' | 'flag'

export interface ProviderStat {
  label: string
  value: string
  sub: string
}

export interface ProviderRow {
  initials: string
  name: string
  detail: string
  meta: string
  status: PillStatus
  statusLabel: string
}

export interface ProviderSectionData {
  title: string
  copy: string
  status: string
  section: string
  rows: ProviderRow[]
}

/** Groundwork EHR side menu sections (the first, Patients, is the day panel). */
export const GROUNDWORK_SECTIONS = ['Patients', 'Encounters', 'Care Plans', 'Medications', 'Results', 'Billing']

export const PROVIDER_STATS: ProviderStat[] = [
  { label: 'Appts today', value: '8', sub: '2 to confirm' },
  { label: 'Messages', value: '3', sub: 'oldest 6h' },
  { label: 'Results', value: '5', sub: '1 abnormal' },
  { label: 'Refills', value: '2', sub: 'both routine' },
]

export const TODAY_SCHEDULE: ProviderRow[] = [
  { initials: 'AB', name: 'Ava Bennett', detail: 'Follow-up · Hypertension', meta: '9:30', status: 'confirmed', statusLabel: 'Confirmed' },
  { initials: 'MS', name: 'Miguel Santos', detail: 'Annual wellness visit', meta: '11:00', status: 'confirmed', statusLabel: 'Confirmed' },
  { initials: 'GL', name: 'Grace Lin', detail: 'Telehealth · Medication review', meta: '2:00', status: 'awaiting', statusLabel: 'Awaiting patient' },
]

/** Content of the other sections (everything but Patients). */
export const GROUNDWORK_SECTION_DATA: Record<string, ProviderSectionData> = {
  Encounters: {
    title: 'Encounters',
    copy: 'Today’s visits and their notes.',
    status: '2 open notes',
    section: 'Today',
    rows: [
      { ...TODAY_SCHEDULE[0]!, status: 'awaiting', statusLabel: 'Note open' },
      { ...TODAY_SCHEDULE[1]!, status: 'awaiting', statusLabel: 'Not started' },
      { ...TODAY_SCHEDULE[2]!, status: 'awaiting', statusLabel: 'Not started' },
      { initials: 'JB', name: 'Jon Bell', detail: 'New patient · Intake complete', meta: 'Yesterday', status: 'confirmed', statusLabel: 'Signed' },
    ],
  },
  'Care Plans': {
    title: 'Care plans',
    copy: 'Active plans across your panel.',
    status: '12 active',
    section: 'Recently updated',
    rows: [
      { initials: 'AB', name: 'Ava Bennett', detail: 'Hypertension management', meta: '3 of 4 goals', status: 'confirmed', statusLabel: 'On track' },
      { initials: 'MS', name: 'Miguel Santos', detail: 'Weight & metabolic health', meta: '4 of 5 goals', status: 'confirmed', statusLabel: 'On track' },
      { initials: 'GL', name: 'Grace Lin', detail: 'Cardiovascular risk', meta: '1 of 3 goals', status: 'flag', statusLabel: 'Needs update' },
    ],
  },
  Medications: {
    title: 'Medications',
    copy: 'Refill requests and active prescriptions.',
    status: '2 refills',
    section: 'Prescriptions',
    rows: [
      { initials: 'AB', name: 'Lisinopril 10 mg', detail: 'Ava Bennett · Once daily', meta: 'Due in 4 days', status: 'awaiting', statusLabel: 'Refill due' },
      { initials: 'AB', name: 'Aspirin 81 mg', detail: 'Ava Bennett · Once daily', meta: 'Ongoing', status: 'confirmed', statusLabel: 'Active' },
      { initials: 'MS', name: 'Metformin 500 mg', detail: 'Miguel Santos · Twice daily', meta: 'Due in 9 days', status: 'awaiting', statusLabel: 'Refill due' },
      { initials: 'GL', name: 'Atorvastatin 20 mg', detail: 'Grace Lin · Nightly', meta: 'Ongoing', status: 'confirmed', statusLabel: 'Active' },
    ],
  },
  Results: {
    title: 'Results',
    copy: 'New results waiting for review.',
    status: '5 new',
    section: 'Unreviewed',
    rows: [
      { initials: 'GL', name: 'Lipid panel', detail: 'Grace Lin · LDL 162 mg/dL', meta: 'Today', status: 'flag', statusLabel: 'High' },
      { initials: 'MS', name: 'HbA1c', detail: 'Miguel Santos · 5.6%', meta: 'Today', status: 'confirmed', statusLabel: 'Normal' },
      { initials: 'AB', name: 'Kidney function', detail: 'Ava Bennett · eGFR 94', meta: 'Yesterday', status: 'confirmed', statusLabel: 'Normal' },
      { initials: 'AB', name: 'Basic metabolic panel', detail: 'Ava Bennett · Within range', meta: 'Yesterday', status: 'confirmed', statusLabel: 'Normal' },
    ],
  },
  Billing: {
    title: 'Billing',
    copy: 'Claims from this week’s visits.',
    status: '4 claims',
    section: 'This week',
    rows: [
      { initials: 'AB', name: 'CLM-2041 · $180.00', detail: 'Ava Bennett · Follow-up', meta: 'Oct 1', status: 'awaiting', statusLabel: 'Submitted' },
      { initials: 'MS', name: 'CLM-2040 · $240.00', detail: 'Miguel Santos · Wellness visit', meta: 'Sep 30', status: 'confirmed', statusLabel: 'Paid' },
      { initials: 'JB', name: 'CLM-2039 · $210.00', detail: 'Jon Bell · New patient', meta: 'Sep 30', status: 'confirmed', statusLabel: 'Paid' },
      { initials: 'GL', name: 'CLM-2038 · $120.00', detail: 'Grace Lin · Telehealth', meta: 'Sep 29', status: 'flag', statusLabel: 'Needs review' },
    ],
  },
}

/* ---------- Tallgrove Health (tailored) ---------- */

export type Trend = 'up' | 'down' | 'flat'

export interface VisitChange {
  label: string
  value: string
  was: string
  trend: Trend
}

export interface TranscriptLine {
  who: string
  text: string
}

export interface NoteLine {
  /** SOAP letter (S, O, A, P). */
  step: string
  text: string
}

export interface VisitOrder {
  kind: string
  text: string
}

export interface TallgroveVisitData {
  id: string
  time: string
  name: string
  photo: string
  age: number
  reason: string
  allergy: string | null
  words: string
  changes: VisitChange[]
  open: string[]
  transcript: TranscriptLine[]
  note: NoteLine[]
  orders: VisitOrder[]
}

/** Dr. Braga's 3 visits of the day. */
export const TALLGROVE_VISITS: TallgroveVisitData[] = [
  {
    id: 'ava',
    time: '9:30',
    name: 'Ava Bennett',
    photo: IMAGES.patientAva,
    age: 52,
    reason: 'Follow-up · Hypertension',
    allergy: 'Penicillin',
    words: 'The headaches are gone since the new dose, but I get dizzy when I stand up.',
    changes: [
      { label: 'Blood pressure', value: '134/86', was: '142/90 in August', trend: 'down' },
      { label: 'Home readings', value: '12', was: 'logged since last visit', trend: 'flat' },
    ],
    open: ['Lisinopril refill due in 4 days', 'Asked about lowering the dose'],
    transcript: [
      { who: 'Dr. Braga', text: 'How have the headaches been since we changed the dose?' },
      { who: 'Ava', text: 'Gone, mostly. But I get light-headed getting out of bed.' },
      { who: 'Dr. Braga', text: 'Let’s take your pressure standing up, then.' },
    ],
    note: [
      { step: 'S', text: 'Dizziness on standing for two weeks; headaches resolved' },
      { step: 'O', text: 'BP 134/86 seated, 118/76 standing' },
      { step: 'A', text: 'Hypertension, controlled; orthostatic symptoms' },
      { step: 'P', text: 'Lower lisinopril, home log, recheck in six weeks' },
    ],
    orders: [
      { kind: 'Prescription', text: 'Lisinopril 10 mg → 5 mg daily' },
      { kind: 'Task', text: 'Home blood pressure log, 2 weeks' },
      { kind: 'Follow-up', text: 'Visit in 6 weeks' },
      { kind: 'Billing', text: '99214 suggested' },
    ],
  },
  {
    id: 'miguel',
    time: '11:00',
    name: 'Miguel Santos',
    photo: IMAGES.patientMiguel,
    age: 45,
    reason: 'Annual wellness visit',
    allergy: null,
    words: 'Just my yearly check. I’ve been walking a lot more this year.',
    changes: [
      { label: 'HbA1c', value: '5.6%', was: '5.9% last year', trend: 'down' },
      { label: 'Weight', value: '182 lb', was: '190 lb last year', trend: 'down' },
    ],
    open: ['Colon cancer screening due', 'No flu shot on record'],
    transcript: [
      { who: 'Dr. Braga', text: 'Your sugar numbers came down. What changed?' },
      { who: 'Miguel', text: 'I walk to work now, most days. Forty minutes each way.' },
      { who: 'Dr. Braga', text: 'That shows. Let’s get your screening booked too.' },
    ],
    note: [
      { step: 'S', text: 'Feels well; walking 80 minutes a day' },
      { step: 'O', text: 'BP 122/78, BMI 26.1, HbA1c 5.6%' },
      { step: 'A', text: 'Prediabetes, improving; screening due' },
      { step: 'P', text: 'Colonoscopy referral, flu shot, annual recheck' },
    ],
    orders: [
      { kind: 'Referral', text: 'Colonoscopy, GI clinic' },
      { kind: 'Vaccine', text: 'Flu shot, today' },
      { kind: 'Follow-up', text: 'Annual visit, next year' },
      { kind: 'Billing', text: '99396 suggested' },
    ],
  },
  {
    id: 'grace',
    time: '2:00',
    name: 'Grace Lin',
    photo: IMAGES.patientGrace,
    age: 61,
    reason: 'Telehealth · Medication review',
    allergy: 'Sulfa drugs',
    words: 'I saw my cholesterol went up again. Should I be worried?',
    changes: [
      { label: 'LDL', value: '162', was: '141 mg/dL in March', trend: 'up' },
      { label: 'Atorvastatin', value: '5 of 7', was: 'days taken last week', trend: 'flat' },
    ],
    open: ['LDL above target of 100', 'Takes the statin in the morning'],
    transcript: [
      { who: 'Dr. Braga', text: 'When do you usually take the atorvastatin?' },
      { who: 'Grace', text: 'With breakfast, when I remember it.' },
      { who: 'Dr. Braga', text: 'Let’s move it to bedtime and raise the dose.' },
    ],
    note: [
      { step: 'S', text: 'Worried about LDL; misses doses' },
      { step: 'O', text: 'LDL 162 mg/dL, up from 141' },
      { step: 'A', text: 'Hyperlipidemia, above target' },
      { step: 'P', text: 'Raise statin, bedtime dosing, recheck lipids' },
    ],
    orders: [
      { kind: 'Prescription', text: 'Atorvastatin 20 mg → 40 mg nightly' },
      { kind: 'Lab', text: 'Lipid panel in 6 weeks' },
      { kind: 'Message', text: 'Dosing reminder to the patient app' },
      { kind: 'Billing', text: '99213 suggested' },
    ],
  },
]

/** Steps of each visit (right column). */
export const VISIT_STEPS = ['Prep', 'In the room', 'Wrap-up', 'Next patient']

export const TREND_ARROWS: Record<Trend, string> = { up: '↑', down: '↓', flat: '·' }
