import { SlideShell } from '../SlideShell'
import { Backdrop } from '../SlideBuildingBlocks/SlideBuildingBlocks'
import { BlocksDeck, type BlocksDeckProps } from '../../elements/BlockPreviews/BlocksDeck'
import styles from './SlideBlocksCompare.module.css'

export interface SlideBlocksCompareProps {
  /** First part of the title (in white). */
  title?: string
  /** End of the title, in a turquoise → teal gradient. */
  accent?: string
  /** Paragraph below the title. */
  lede?: string
  /** Props passed to the carousel (`blocks`, `autoplay`, `live`, `startIndex`, `skipInteractionGate`). */
  deck?: Omit<BlocksDeckProps, 'className' | 'style'>
}

/** "Same block, a different product every time" slide: text on the left and the product carousel on the right.
 *  Port of the home's `.homepage-blocks-compare` section (website.vinta.studio), 1920 × 1080. */
export function SlideBlocksCompare({
  title = 'Same block,',
  accent = 'a different product every time.',
  lede = 'Each block is a workflow we keep refining. Your care model decides how they come together, so custom work goes where it matters most to you.',
  deck,
}: SlideBlocksCompareProps) {
  return (
    <SlideShell mode="invert-blue" safeArea={0} background={<Backdrop floor={false} />}>
      <div className={styles.compare}>
        <div className={styles.copy}>
          <h3 className={styles.title}>
            {title} <span className={styles.accent}>{accent}</span>
          </h3>
          <p className={styles.lede}>{lede}</p>
        </div>
        <div className={styles.deckSlot}>
          <BlocksDeck {...deck} />
        </div>
      </div>
    </SlideShell>
  )
}
