import { Fragment, type ReactNode } from 'react'
import type { AccentColor, TextMode } from './types'
import { VividBackground } from '../elements/VividBackground'

/** Tone of the generic slides. One prop resolves the SlideShell mode, the text mode of the elements and the
 *  background, so the three never disagree. Every tone renders the site look:
 *  light / tint = `wash` (light) · invert-blue = `mesh` (blue) · invert-navy = `night` (navy).
 *  vivid = alias of the pattern's own site-look default (most patterns: wash; SlideContent: mesh; SlideBigStat: night). */
export type SlideTone = 'light' | 'tint' | 'invert-blue' | 'invert-navy' | 'vivid'

/** The three site-look backgrounds (`VividBackground` variants). */
export type ToneBackground = 'wash' | 'mesh' | 'night'

export interface ResolvedTone {
  shellMode: 'light' | 'invert-blue' | 'invert-navy'
  textMode: TextMode
  /** Subset accepted by elements that do not know 'light-tint' (e.g. Stat). */
  baseMode: 'light' | 'invert-blue' | 'invert-navy'
  /** Which site-look background the tone uses. */
  variant: ToneBackground
  /** true on mesh/night: tiles and cards switch to glass, accents to turquoise. */
  dark: boolean
  background: ReactNode
}

const MODE_BY_BACKGROUND: Record<ToneBackground, ResolvedTone['shellMode']> = {
  wash: 'light',
  mesh: 'invert-blue',
  night: 'invert-navy',
}

/** Resolves a tone. `vivid` = the background `tone="vivid"` maps to for this pattern (default wash). */
export function resolveTone(tone: SlideTone, vivid: ToneBackground = 'wash'): ResolvedTone {
  const variant: ToneBackground =
    tone === 'vivid' ? vivid : tone === 'invert-blue' ? 'mesh' : tone === 'invert-navy' ? 'night' : 'wash'
  const mode = MODE_BY_BACKGROUND[variant]
  return {
    shellMode: mode,
    textMode: mode,
    baseMode: mode,
    variant,
    dark: variant !== 'wash',
    background: <VividBackground variant={variant} />,
  }
}

/** A title passed as an array of lines (the old API) becomes one node with `<br />` between the lines.
 *  Any other node passes through untouched. */
export function titleLines(title: ReactNode | ReactNode[]): ReactNode {
  if (!Array.isArray(title)) return title
  return title.map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {line}
    </Fragment>
  ))
}

const ACCENT_COLORS: readonly string[] = ['blue', 'cyan', 'purple', 'mint', 'rose', 'orange']

/** True when a value is one of the `AccentColor` names. Lets the patterns that used `accent` as a color
 *  (SlideContent, SlideTwoColumn) keep accepting it while `accent` is now the title's second line. */
export function isAccentColor(value: unknown): value is AccentColor {
  return typeof value === 'string' && ACCENT_COLORS.includes(value)
}
