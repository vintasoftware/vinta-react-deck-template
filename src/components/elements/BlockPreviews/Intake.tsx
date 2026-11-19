/* "Patient Intake" card: Groundwork EHR form (foundation) × Tallgrove Health flow (tailored), with divider and tour.
   Port of `qe` from the site bundle. */
import './blocks.css'
import { CompareFrame } from './CompareFrame'
import { FoundationIntake } from './IntakeForm'
import { TallgroveIntake } from './TallgroveIntake'
import type { BlockPreviewProps } from './types'

/** Patient intake comparison. The tour drives both sides and the divider; `onTourEnd` signals the end of each cycle. */
export function Intake({ live = false, onTourEnd, skipInteractionGate = false }: BlockPreviewProps) {
  return (
    <CompareFrame
      foundation={<FoundationIntake live={live} />}
      live={live}
      name="Patient Intake"
      skipInteractionGate={skipInteractionGate}
      tailored={<TallgroveIntake live={live} onTourEnd={onTourEnd} />}
    />
  )
}
