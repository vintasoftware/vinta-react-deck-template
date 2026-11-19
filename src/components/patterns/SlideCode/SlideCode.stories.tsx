import type { Meta, StoryObj } from '@storybook/react-vite'
import { SlideCode } from './SlideCode'

const meta = {
  title: 'Patterns/SlideCode',
  component: SlideCode,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SlideCode>

export default meta
type Story = StoryObj<typeof meta>

const intake = `import { createIntake } from '@/intake'

// One intake per visit type; fields come from the form builder.
export async function startIntake(visitId: string) {
  const intake = await createIntake({
    visitId,
    sections: ['about-you', 'visit-reason', 'medications'],
    saveDrafts: true,
  })
  return intake.url
}`

/** Navy (default), header at the left. */
export const SplitNavy: Story = {
  args: {
    eyebrow: 'SAMPLE CODE · INTAKE',
    title: 'One call',
    accent: 'starts an intake',
    lede: 'The form builder defines the fields; the app only says which sections a visit needs.',
    code: intake,
    language: 'ts',
    filename: 'src/visits/startIntake.ts',
  },
}

/** Light wash: the window gets the card shadow. */
export const SplitLight: Story = { args: { ...SplitNavy.args, tone: 'light' } }

/** Blue mesh, header on top, code full width. */
export const StackedInvertBlue: Story = {
  args: {
    tone: 'invert-blue',
    layout: 'stacked',
    eyebrow: 'SAMPLE CODE · API',
    title: 'Results reach the patient',
    accent: 'the same afternoon',
    code: `await fetch('https://api.example.com/v1/results', {
  method: 'POST',
  headers: { Authorization: \`Bearer \${token}\` },
  body: JSON.stringify({ visitId: 'visit_0042', notify: 'patient' }),
})`,
    language: 'ts',
    filename: 'publish a result',
  },
}

/** Compact density for a longer snippet. */
export const Compact: Story = {
  args: {
    eyebrow: 'SAMPLE CODE · RULES',
    title: 'Eligibility',
    accent: 'as plain rules',
    lede: 'Each rule is a small pure function, so the clinic team can review them line by line.',
    density: 'compact',
    language: 'python',
    filename: 'eligibility/rules.py',
    code: `from dataclasses import dataclass


@dataclass
class Visit:
    kind: str
    minutes: int
    first_visit: bool


def needs_intake(visit: Visit) -> bool:
    """New patients and long visits always get an intake."""
    return visit.first_visit or visit.minutes >= 45


def can_book_online(visit: Visit) -> bool:
    if visit.kind == "procedure":
        return False
    return visit.minutes <= 60


RULES = [needs_intake, can_book_online]


def evaluate(visit: Visit) -> dict[str, bool]:
    return {rule.__name__: rule(visit) for rule in RULES}`,
  },
}
