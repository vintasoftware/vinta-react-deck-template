/* Fictional data for the "Provider Payouts" mock (Tallgrove Health), taken from the site bundle. Nothing here is real PHI. */
import { IMAGES } from './shared'

/** Visit types that generate earnings per clinician. */
export type VisitTypeKey = 'followUp' | 'newPatient' | 'telehealth'

export interface VisitType {
  key: VisitTypeKey
  label: string
  /** Valor pago por visita assinada (USD). */
  rate: number
}

/** Payment state of a clinician in the cycle. */
export type PayoutStatus = 'review' | 'ready' | 'approved'

export interface PayoutAdjustment {
  label: string
  /** When it happened (e.g. "Thu 15"). */
  when: string
  /** Positive = credit, negative = holdback (USD). */
  amount: number
}

export interface ProviderContract {
  kind: 'Employed' | 'Contractor'
  renews: string
  /** Contract expires soon. */
  soon?: boolean
}

export interface Provider {
  id: string
  /** Photo path (public/assets/blocks). */
  photo: string
  name: string
  specialty: string
  visits: Record<VisitTypeKey, number>
  adjustment?: PayoutAdjustment
  /** All visits signed and coded. */
  allSigned: boolean
  status: PayoutStatus
  contract: ProviderContract
}

/** Rate card 2026. */
export const VISIT_TYPES: readonly VisitType[] = [
  { key: 'followUp', label: 'Follow-up visits', rate: 140 },
  { key: 'newPatient', label: 'New patient visits', rate: 260 },
  { key: 'telehealth', label: 'Telehealth check-ins', rate: 120 },
]

const photo = (file: string) => `/assets/blocks/${file}.webp`

export const PROVIDERS: readonly Provider[] = [
  {
    id: 'braga',
    photo: IMAGES.clinicianBraga,
    name: 'Dr. Rita Braga',
    specialty: 'Cardiology',
    visits: { followUp: 9, newPatient: 3, telehealth: 2 },
    adjustment: { label: 'Late-note hold released', when: 'Thu 15', amount: 100 },
    allSigned: true,
    status: 'review',
    contract: { kind: 'Employed', renews: 'Mar 1, 2027' },
  },
  {
    id: 'okafor',
    photo: photo('clinician-okafor'),
    name: 'Dr. Dana Okafor',
    specialty: 'Primary care',
    visits: { followUp: 14, newPatient: 2, telehealth: 5 },
    allSigned: true,
    status: 'ready',
    contract: { kind: 'Employed', renews: 'Jan 1, 2027' },
  },
  {
    id: 'haddad',
    photo: photo('clinician-haddad'),
    name: 'Dr. Omar Haddad',
    specialty: 'Pediatrics',
    visits: { followUp: 12, newPatient: 3, telehealth: 2 },
    adjustment: { label: 'Unsigned note held', when: 'Tue 16', amount: -140 },
    allSigned: false,
    status: 'review',
    contract: { kind: 'Contractor', renews: 'Nov 30, 2026', soon: true },
  },
  {
    id: 'costa',
    photo: photo('clinician-costa'),
    name: 'Lena Costa, NP',
    specialty: 'Primary care',
    visits: { followUp: 10, newPatient: 1, telehealth: 9 },
    allSigned: true,
    status: 'ready',
    contract: { kind: 'Employed', renews: 'Jun 1, 2027' },
  },
  {
    id: 'cruz',
    photo: photo('clinician-cruz'),
    name: 'Dr. Daniel Cruz',
    specialty: 'Endocrinology',
    visits: { followUp: 8, newPatient: 2, telehealth: 3 },
    allSigned: true,
    status: 'ready',
    contract: { kind: 'Contractor', renews: 'Oct 31, 2026', soon: true },
  },
  {
    id: 'brooks',
    photo: photo('clinician-brooks'),
    name: 'Nia Brooks, RD',
    specialty: 'Nutrition',
    visits: { followUp: 4, newPatient: 0, telehealth: 8 },
    allSigned: true,
    status: 'ready',
    contract: { kind: 'Contractor', renews: 'Apr 15, 2027' },
  },
  {
    id: 'nair',
    photo: photo('clinician-nair'),
    name: 'Dr. Priya Nair',
    specialty: 'Dermatology',
    visits: { followUp: 5, newPatient: 2, telehealth: 1 },
    allSigned: true,
    status: 'ready',
    contract: { kind: 'Employed', renews: 'Feb 1, 2027' },
  },
  {
    id: 'reyes',
    photo: IMAGES.clinicianReyes,
    name: 'Dr. Sofia Reyes',
    specialty: 'Behavioral health',
    visits: { followUp: 6, newPatient: 1, telehealth: 6 },
    allSigned: true,
    status: 'approved',
    contract: { kind: 'Employed', renews: 'Aug 1, 2027' },
  },
  {
    id: 'mehta',
    photo: photo('clinician-mehta'),
    name: 'Arjun Mehta, PA',
    specialty: 'Urgent care',
    visits: { followUp: 11, newPatient: 4, telehealth: 0 },
    allSigned: true,
    status: 'approved',
    contract: { kind: 'Employed', renews: 'May 1, 2027' },
  },
]

export const STATUS_LABEL: Record<PayoutStatus, string> = {
  review: 'Needs review',
  ready: 'Ready',
  approved: 'Approved',
}

export const contractStatusLabel = (provider: Provider) => (provider.contract.soon ? 'Renews soon' : 'Active')

/** Touch layout tour timings (ms). */
export const TOUCH_TOUR = { lead: 1200, down: 3200, rest: 900, up: 1600, tap: 450, read: 2600, readScroll: 1800, settle: 1000, contracts: 4200, home: 1200 }

export const currencyFull = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
export const currencyWhole = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

/** The clinician's total signed visits. */
export const visitCount = (provider: Provider) => VISIT_TYPES.reduce((sum, type) => sum + provider.visits[type.key], 0)

/** Amount to pay: visits × rate + adjustment. */
export const amountOwed = (provider: Provider) =>
  VISIT_TYPES.reduce((sum, type) => sum + provider.visits[type.key] * type.rate, 0) + (provider.adjustment?.amount ?? 0)
