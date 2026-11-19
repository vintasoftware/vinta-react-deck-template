/* The animated Provider Experience mock sized for a slide's UI slot (cover B, product showcase).
   Same stage class as the site, so blocks.css applies; the tour runs live, also inside the artifact. */
import { ProviderExperience } from './ProviderExperience'
import './blocks.css'

export interface ProductSlotProps {
  /** Run the animated tour (default) or show the final static state. */
  live?: boolean
}

export function ProductSlot({ live = true }: ProductSlotProps) {
  return (
    <div className="homepage-bb-preview-stage" style={{ width: 928, background: 'transparent' }}>
      <ProviderExperience live={live} skipInteractionGate />
    </div>
  )
}
