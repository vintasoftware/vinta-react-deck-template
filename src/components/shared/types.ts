/**
 * Types shared across elements (Eyebrow, Subtitle, MetricItem, Tag…).
 * See tokens.css — "Configurable accent" — for how each combination resolves.
 */

/** Semantic background role of the element — the same values used in [data-mode]
 *  in tokens.css. 'light-tint' = content on the tint surface (#f1f6ff),
 *  not pure white (e.g. Who is Vinta). */
export type TextMode = 'light' | 'light-tint' | 'invert-blue' | 'invert-navy'

/** blue = structural primary; the others are the secondary accents of the
 *  harness §1.2, uso equivalente (layout.md — "Acento laranja confirmado"). */
export type AccentColor = 'blue' | 'cyan' | 'purple' | 'mint' | 'rose' | 'orange'
