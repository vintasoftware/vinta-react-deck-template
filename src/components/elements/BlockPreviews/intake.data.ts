/* Fictional data for the "Patient Intake" mock (site website.vinta.studio). No real patient data. */

/** Plain text field, date, dropdown or text area of the intake form. */
export interface IntakeTextField {
  kind: 'text' | 'date' | 'select' | 'area'
  label: string
  /** Prefilled value. */
  value?: string
  /** Placeholder text when the field is empty. */
  hint?: string
  required?: boolean
  /** Spans the full row of the grid. */
  wide?: boolean
}

/** Choice field (radio or multiple choice). */
export interface IntakeChoiceField {
  kind: 'choice'
  label: string
  options: string[]
  picked: string[]
  /** Multiple choice (checkboxes) instead of radio. */
  multiple?: boolean
  required?: boolean
}

/** Upload field (insurance card photos). */
export interface IntakeUploadField {
  kind: 'upload'
  label: string
  options: string[]
}

export type IntakeField = IntakeTextField | IntakeChoiceField | IntakeUploadField

export interface IntakeSection {
  title: string
  fields: IntakeField[]
}

/** The 4 sections of the "foundation" form (Demographics → Consent). */
export const INTAKE_SECTIONS: IntakeSection[] = [
  {
    title: 'Demographics',
    fields: [
      { kind: 'text', label: 'First name', value: 'Ava', required: true },
      { kind: 'text', label: 'Last name', value: 'Bennett', required: true },
      { kind: 'date', label: 'Date of birth', value: '03/14/1974', required: true },
      { kind: 'select', label: 'Preferred language', value: 'English' },
      { kind: 'text', label: 'Phone', value: '(555) 014-2290', required: true },
      { kind: 'text', label: 'Email', hint: 'name@example.com' },
      { kind: 'text', label: 'Street address', hint: 'Street and number', required: true, wide: true },
      { kind: 'text', label: 'City', hint: 'City' },
      { kind: 'select', label: 'State', hint: 'Select…' },
    ],
  },
  {
    title: 'Medical history',
    fields: [
      { kind: 'area', label: 'Reason for visit', hint: 'Describe your symptoms', required: true },
      { kind: 'text', label: 'Allergies', value: 'Penicillin', required: true, wide: true },
      { kind: 'area', label: 'Current medications', value: 'Lisinopril 10 mg' },
      {
        kind: 'choice',
        multiple: true,
        label: 'Past conditions',
        options: ['Hypertension', 'Diabetes', 'Asthma', 'Heart disease', 'High cholesterol', 'Other'],
        picked: ['Hypertension'],
      },
      { kind: 'choice', label: 'Tobacco use', options: ['Never', 'Former', 'Current'], picked: ['Never'] },
    ],
  },
  {
    title: 'Insurance',
    fields: [
      { kind: 'select', label: 'Insurance carrier', value: 'Aetna', required: true },
      { kind: 'text', label: 'Member ID', value: 'AET-0482-1193', required: true },
      { kind: 'text', label: 'Group number', hint: 'Optional' },
      { kind: 'choice', label: 'Policy holder', options: ['Self', 'Spouse', 'Parent'], picked: ['Self'], required: true },
      { kind: 'upload', label: 'Insurance card', options: ['Front of card', 'Back of card'] },
    ],
  },
  {
    title: 'Consent',
    fields: [
      {
        kind: 'choice',
        multiple: true,
        label: 'Acknowledgements',
        options: [
          'I consent to evaluation and treatment',
          'I have read the Notice of Privacy Practices',
          'I authorize release of information to my insurer',
        ],
        picked: [],
        required: true,
      },
      { kind: 'text', label: 'Signature', hint: 'Type your full legal name', required: true, wide: true },
      { kind: 'date', label: 'Date', value: '09/30/2026', required: true },
    ],
  },
]

/** Steps of the "tailored" flow (Tallgrove Health). */
export const TALLGROVE_INTAKE_STEPS = ['About you', 'Your visit', 'Medications', 'Check-in']

/** Visit reasons offered in step 2. */
export const VISIT_REASONS = ['Blood pressure follow-up', 'Dizziness', 'Medication question', 'Something new']

/** Reasons already checked at the start of step 2 (and when the tour restarts). */
export const INITIAL_VISIT_REASONS = ['Blood pressure follow-up', 'Dizziness']

export interface IntakeMedication {
  name: string
  detail: string
}

/** Medications listed in step 3. */
export const INTAKE_MEDICATIONS: IntakeMedication[] = [
  { name: 'Lisinopril 10 mg', detail: 'Once a day · last filled Sep 12' },
  { name: 'Vitamin D3 1,000 IU', detail: 'Once a day · over the counter' },
]

/** Decorative check-in code (21×21, generated with a fixed seed so it is identical on every render). */
export const CHECKIN_CODE = (() => {
  const finder = (x: number, y: number) =>
    `M${x} ${y}h7v7h-7zM${x + 1} ${y + 1}v5h5v-5zM${x + 2} ${y + 2}h3v3h-3z`
  let seed = 7
  const modules: string[] = []
  for (let row = 0; row < 21; row += 1) {
    for (let col = 0; col < 21; col += 1) {
      const inFinder = (col < 8 && row < 8) || (col > 12 && row < 8) || (col < 8 && row > 12)
      seed = (seed * 9301 + 49297) % 233280
      if (!inFinder && seed / 233280 < 0.48) modules.push(`M${col} ${row}h1v1h-1z`)
    }
  }
  return { size: 21, path: [finder(0, 0), finder(14, 0), finder(0, 14), ...modules].join('') }
})()
