/* Carousel product card (`homepage-deck-card`): title + scaled mock.
   Port of `Yt` (which mock per `block.id`), `Zt` (UI scale) and the card inside `Qt`. */
import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import type { BlockData } from './blocks.data'
import type { BlockPreviewProps } from './types'
import { Concierge } from './Concierge'
import { Intake } from './Intake'
import { Payouts } from './Payouts'
import { ProviderExperience } from './ProviderExperience'
import './blocks.css'

/** `inert` attribute (React 18 only passes strings through). */
const inertAttr = (inert: boolean) => (inert ? { inert: '' } : {}) as Record<string, string>

/** Picks and renders the right mock for the block (like `Yt` on the site). */
export function PreviewBody({
  block,
  live = false,
  onTourEnd,
  touchLayout,
  skipInteractionGate,
}: { block: BlockData } & BlockPreviewProps) {
  const common = { live, onTourEnd, touchLayout, skipInteractionGate }
  if (block.id === 'intake') return <Intake {...common} />
  if (block.id === 'provider-experience') return <ProviderExperience {...common} />
  // `Payouts` already brings the `homepage-bb-solo` section with the "Tailored block" label (as the site's `Yt` does around `ht`).
  if (block.id === 'provider-payouts') return <Payouts {...common} />
  if (block.preview.kind === 'concierge') {
    return (
      <div className="homepage-bb-tc-stage">
        <p className="homepage-bb-pcmp-label homepage-bb-pcmp-label--tailored">Tailored block</p>
        <Concierge {...common} preview={block.preview} />
      </div>
    )
  }
  // Blocks without their own mock do not exist in this carousel (the site falls back to a generic "Groundwork EHR" shell).
  return null
}

/** Keeps `--homepage-bb-ui-scale` = stage width / UI base width (`--homepage-deck-ui-width`), like `Zt`. */
export function useUiScale<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)
  useLayoutEffect(() => {
    const root = ref.current
    const stage = root?.querySelector<HTMLElement>('.homepage-bb-preview-stage')
    if (!root || !stage) return
    const update = () => {
      const base = parseFloat(getComputedStyle(root).getPropertyValue('--homepage-deck-ui-width'))
      if (base > 0) root.style.setProperty('--homepage-bb-ui-scale', String(stage.clientWidth / base))
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(stage)
    return () => observer.disconnect()
  }, [])
  return ref
}

export interface DeckCardProps extends BlockPreviewProps {
  block: BlockData
  /** Position in the stack: 0 = active; 1, 2… = behind (scale/offset come from the CSS). */
  place?: number
  /** Exit animation (flick) of the card that just passed. */
  leaving?: boolean
  /** Accessible "N of M" label of the active card. */
  ariaLabel?: string
}

/** The card itself (used by the carousel stack). Only the active card (`place` 0) is interactive. */
export function DeckCard({ block, place = 0, leaving, ariaLabel, live, onTourEnd, touchLayout, skipInteractionGate }: DeckCardProps) {
  const active = place === 0
  return (
    <div
      aria-hidden={!active || undefined}
      aria-label={active ? ariaLabel : undefined}
      aria-roledescription={active ? 'slide' : undefined}
      className="homepage-deck-card"
      data-block={block.id}
      data-leaving={leaving ? '' : undefined}
      data-place={active ? 'active' : 'away'}
      role={active ? 'group' : undefined}
      style={{ '--homepage-deck-place': place } as CSSProperties}
    >
      <div className="homepage-deck-card-body" {...inertAttr(!active)}>
        <h3 className="homepage-deck-name">{block.label}</h3>
        <div className="homepage-bb-preview-stage">
          <div className="homepage-bb-tab-panel-content" {...inertAttr(true)}>
            <PreviewBody block={block} live={live} onTourEnd={onTourEnd} touchLayout={touchLayout} skipInteractionGate={skipInteractionGate} />
          </div>
        </div>
      </div>
    </div>
  )
}

export interface PreviewCardProps extends BlockPreviewProps {
  /** Block to show (use `BLOCKS[i]` from blocks.data). */
  block: BlockData
  /** Card width in px; the mock scales itself (base 840 px). Default 880. */
  width?: number
  /** Extra content below the card (optional). */
  children?: ReactNode
}

/** A single card: the `homepage-deck-card` frame with the title and the scaled mock inside. */
export function PreviewCard({ block, width = 880, live, onTourEnd, touchLayout, skipInteractionGate, children }: PreviewCardProps) {
  const ref = useUiScale()
  return (
    <div className="homepage-deck" data-block={block.id} ref={ref} style={{ width }}>
      <div style={{ display: 'grid' }}>
        <DeckCard block={block} place={0} live={live} onTourEnd={onTourEnd} touchLayout={touchLayout} skipInteractionGate={skipInteractionGate} />
      </div>
      {children}
    </div>
  )
}
