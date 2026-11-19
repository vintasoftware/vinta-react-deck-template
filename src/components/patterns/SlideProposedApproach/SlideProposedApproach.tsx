import { Fragment, type ReactNode } from 'react'
import { SlideShell } from '../SlideShell'
import { SpectrumTrack } from '../../elements/SpectrumTrack'
import { ChevronStage, type ChevronEdge, type ChevronSaturation } from '../../elements/ChevronStage'
import type { TagFilledAccent } from '../../elements/Tag'
import { SplitCallout } from '../../elements/SplitCallout'
import styles from './SlideProposedApproach.module.css'

export interface ProposedApproachStage {
  /** ex.: "VALIDATE" */
  label: string
  title: ReactNode
  /** Use <br /> to repeat the Figma line breaks */
  description: ReactNode
  saturation: ChevronSaturation
  accent?: TagFilledAccent
}

export interface SlideProposedApproachProps {
  /** Each item becomes one line of the title */
  title: ReactNode[]
  subtitle: ReactNode
  /** Supporting text to the right of the title (use <br /> for the breaks) */
  intro: ReactNode
  trackLeftLabel: string
  trackRightLabel: string
  stages: ProposedApproachStage[]
  callout: {
    leftLabel: string
    leftValue: ReactNode
    rightLabel: string
    rightText: ReactNode
  }
  /** Subtle arcs in the top-right corner (exported from Figma) */
  background?: ReactNode
}

/** Width of each stage in Figma (3 stages, 1792 in total + 43px of
 *  overlap per joint). With another number of stages, splits evenly. */
const STAGE_WIDTHS: Record<number, number[]> = { 3: [556, 599, 723] }

/** pattern = faithful copy of the "Product Timeline | Alt 03" screen (427:1046). The
 *  Figma is a single raster, so the measurements come from reading pixels; only
 *  elementos existentes: SpectrumTrack, ChevronStage×N, SplitCallout. */
export function SlideProposedApproach({
  title,
  subtitle,
  intro,
  trackLeftLabel,
  trackRightLabel,
  stages,
  callout,
  background,
}: SlideProposedApproachProps) {
  const widths = STAGE_WIDTHS[stages.length]
  return (
    <SlideShell
      mode="light"
      safeArea={64}
      background={
        background ?? (
          <div className={styles.bg}>
            <div className={styles.arcs} />
            <div className={styles.strip} />
          </div>
        )
      }
    >
      <div className={styles.canvas}>
        <h1 className={styles.title}>
          {title.map((line, i) => (
            <Fragment key={i}>
              {i > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </h1>
        <p className={styles.subtitle}>{subtitle}</p>
        <p className={styles.intro}>{intro}</p>

        <div className={styles.track}>
          <SpectrumTrack leftLabel={trackLeftLabel} rightLabel={trackRightLabel} />
        </div>

        <div className={styles.stages}>
          {stages.map((stage, i) => {
            const edge: ChevronEdge = i === 0 ? 'first' : i === stages.length - 1 ? 'last' : 'middle'
            return (
              <div
                key={i}
                className={styles.stage}
                style={widths ? { width: widths[i], flex: 'none' } : undefined}
              >
                <ChevronStage
                  index={i + 1}
                  label={stage.label}
                  title={stage.title}
                  description={stage.description}
                  saturation={stage.saturation}
                  accent={stage.accent}
                  edge={edge}
                />
              </div>
            )
          })}
        </div>

        <div className={styles.callout}>
          <SplitCallout
            leftLabel={callout.leftLabel}
            leftValue={callout.leftValue}
            rightLabel={callout.rightLabel}
            rightText={callout.rightText}
            accent="orange"
          />
        </div>
      </div>
    </SlideShell>
  )
}
