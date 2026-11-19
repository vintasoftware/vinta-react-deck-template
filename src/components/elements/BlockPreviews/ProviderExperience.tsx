/* "Provider Experience" card: Groundwork EHR (foundation) × Tallgrove Health (tailored), with divider and tour.
   Port of `Ke` from the site bundle. */
import './blocks.css'
import { CompareFrame } from './CompareFrame'
import { GroundworkProvider } from './GroundworkApp'
import { TallgroveProvider } from './TallgroveProvider'
import type { BlockPreviewProps } from './types'

/** Clinician workspace comparison. The tour drives both sides and the divider; `onTourEnd` signals the end of each cycle. */
export function ProviderExperience({ live = false, onTourEnd, skipInteractionGate = false }: BlockPreviewProps) {
  return (
    <CompareFrame
      foundation={<GroundworkProvider live={live} />}
      live={live}
      name="Provider Experience"
      skipInteractionGate={skipInteractionGate}
      tailored={<TallgroveProvider live={live} onTourEnd={onTourEnd} />}
    />
  )
}
