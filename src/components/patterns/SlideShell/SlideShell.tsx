import type { CSSProperties, ReactNode } from 'react'
import styles from './SlideShell.module.css'

/** Same [data-mode] vocabulary already used by Divider/Stat — reuses
 *  the existing semantic roles in tokens.css, nothing new. */
export type SlideMode = 'light' | 'invert-blue' | 'invert-navy'

/** 'dense' (~64px, content slides — Who is Vinta/Client-case in layout.md)
 *  · 'hero' (~200px, covers/Divider — already the --slide-safe-area-hero token)
 *  · number (px) for screens with their own margin (e.g. Intro ~118). */
export type SlideSafeArea = 'dense' | 'hero' | number

export interface SlideShellProps {
  mode?: SlideMode
  safeArea?: SlideSafeArea
  /** Optional background slot — color/gradient/image, behind the content. Without
   *  it, uses the mode's surface (--color-surface). */
  background?: ReactNode
  children: ReactNode
}

const SAFE_AREA_PRESET: Record<'dense' | 'hero', string> = {
  // layout.md — "Global layout rules": ~64px on dense slides. The harness
  // --slide-safe-area token (160) is the more generic estimate; here
  // I use layout.md's more specific value without creating/changing a token.
  dense: '64px',
  hero: 'var(--slide-safe-area-hero)',
}

export function SlideShell({ mode = 'light', safeArea = 'dense', background, children }: SlideShellProps) {
  const resolvedSafeArea = typeof safeArea === 'number' ? `${safeArea}px` : SAFE_AREA_PRESET[safeArea]
  const style = { '--shell-safe-area': resolvedSafeArea } as CSSProperties

  return (
    // `vds` scopes the design-system tokens and base styles (src/index.css); `data-slide` marks the
    // 1920×1080 slide root for the deck runtime and the PDF/PPTX exporter.
    <div className={`vds ${styles.shell}`} data-slide data-mode={mode} style={style}>
      {background && (
        <div className={styles.background} aria-hidden="true">
          {background}
        </div>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  )
}
