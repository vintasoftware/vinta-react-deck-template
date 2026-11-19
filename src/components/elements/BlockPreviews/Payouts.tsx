import { useEffect, useState } from 'react'
import { hasInteracted, whenInteracted } from './shared'
import type { BlockPreviewProps } from './types'
import { PayoutsApp } from './PayoutsApp'

/** The tour only starts after the first interaction, unless `skipInteractionGate` waives it. */
function useInteractionGate(skip: boolean) {
  const [open, setOpen] = useState(() => skip || hasInteracted())
  useEffect(() => {
    if (open) return
    return whenInteracted(() => setOpen(true))
  }, [open])
  return skip || open
}

/** "Provider Payouts, tailored" card: "Tailored block" label + frame with the Tallgrove payouts app. */
export function Payouts({ live = false, onTourEnd, touchLayout = false, skipInteractionGate = false }: BlockPreviewProps) {
  const tourOn = useInteractionGate(skipInteractionGate)
  return (
    <section aria-label="Provider Payouts, tailored" className="homepage-bb-solo">
      <p className="homepage-bb-pcmp-label homepage-bb-pcmp-label--tailored">Tailored block</p>
      <div className="homepage-bb-solo-frame">
        <PayoutsApp onTourEnd={onTourEnd} touchLayout={touchLayout} tour={live && tourOn} />
      </div>
    </section>
  )
}
