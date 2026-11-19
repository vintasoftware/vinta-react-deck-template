/* Mock stage for stories and clips: fixed width, like the site's `.homepage-bb-preview-stage`
   (the mocks have max-width 58rem and their own height; the stage only sets the width and a light background). */
import type { CSSProperties, ReactNode } from 'react'
import './blocks.css'

export interface PreviewStageProps {
  /** Stage width in px (default 928 = 58rem, the mocks' natural width). */
  width?: number
  /** Stage background color (default: the site's white). */
  background?: string
  children: ReactNode
}

export function PreviewStage({ width = 928, background = 'var(--homepage-section-white)', children }: PreviewStageProps) {
  const style: CSSProperties = { width, background, boxSizing: 'content-box' }
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--vinta-surface-tint)', padding: 32, boxSizing: 'border-box' }}>
      <div className="homepage-bb-preview-stage" style={style}>
        {children}
      </div>
    </div>
  )
}

/** Storybook decorator: `decorators: [withPreviewStage()]`. */
export function withPreviewStage(props: Omit<PreviewStageProps, 'children'> = {}) {
  return (Story: () => ReactNode) => <PreviewStage {...props}>{Story()}</PreviewStage>
}
