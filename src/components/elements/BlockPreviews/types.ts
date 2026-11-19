/** Common props of the carousel product mocks (as on the site: `live` turns on the animated tour). */
export interface BlockPreviewProps {
  /** Turns on the animated tour (cursor, clicks, scrolling). Off = static final state. */
  live?: boolean
  /** Called when the tour finishes a cycle (the carousel uses it to advance the card). */
  onTourEnd?: () => void
  /** Simplified touch layout (narrow screens). */
  touchLayout?: boolean
  /** Skips the "only starts after the first interaction" gate (Storybook and recorded clips). */
  skipInteractionGate?: boolean
}
