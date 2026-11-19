/* Product card carousel ("deck") from the site's home: a stack of cards (the active one in front, 2 behind),
   bar with arrows and dots, exit flick, pause on mouse/focus/touch and advance when the card's tour ends.
   Port of `Qt` (website.vinta.studio). */
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type TouchEvent } from 'react'
import { BLOCKS, type BlockData } from './blocks.data'
import { DeckCard, useUiScale } from './PreviewCard'
import { prefersReducedMotion, useTouchLayout } from './shared'
import './blocks.css'

export interface BlocksDeckProps {
  /** Carousel blocks (default: the site's 4, in `blocks.data`). */
  blocks?: BlockData[]
  /** Turns on the active card's animated tour and the auto-advance when the tour ends. Off = cards still in their final state, manual navigation only. */
  autoplay?: boolean
  /** Turns on the active card's tour independently of the auto-advance (default: same as `autoplay`). */
  live?: boolean
  /** Card inicial (0 = primeiro). */
  startIndex?: number
  /** Does not wait for the page's first interaction to start the tours (Storybook, recorded clips). */
  skipInteractionGate?: boolean
  /** Extra class on the root element. */
  className?: string
  /** Extra style on the root element (e.g. `width`). */
  style?: CSSProperties
}

/** Duration of the card's exit animation (flick), in ms; the site clears the "leaving" state a little after it ends (480 ms). */
const LEAVE_MS = 520
/** Minimum distance (px) of a horizontal drag to count as a card change. */
const SWIPE_MIN = 48

function ArrowIcon({ d }: { d: string }) {
  return (
    <svg aria-hidden fill="none" viewBox="0 0 20 20">
      <path d={d} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
    </svg>
  )
}

const visuallyHidden: CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  margin: -1,
  padding: 0,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
  border: 0,
}

export function BlocksDeck({ blocks = BLOCKS, autoplay = true, live, startIndex = 0, skipInteractionGate, className, style }: BlocksDeckProps) {
  const count = blocks.length
  const [index, setIndex] = useState(() => ((startIndex % count) + count) % count)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [inView, setInView] = useState(false)
  const [pressed, setPressed] = useState(false)
  const [leavingIndex, setLeavingIndex] = useState<number | null>(null)
  const touchLayout = useTouchLayout()
  const reduced = prefersReducedMotion()
  const rootRef = useUiScale()
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const swiped = useRef(false)
  const leaveTimer = useRef<ReturnType<typeof setTimeout>>()
  const current = blocks[index]
  /* Only advances on its own when nobody is interacting (mouse over, keyboard focus, finger on screen) and the deck is visible. */
  const canAdvance = autoplay && !hovered && !focused && !pressed && inView && !reduced
  const tourLive = live ?? autoplay

  useEffect(() => () => clearTimeout(leaveTimer.current), [])

  const goTo = (target: number) => {
    const next = ((target % count) + count) % count
    if (next === index) return
    setLeavingIndex(index)
    clearTimeout(leaveTimer.current)
    leaveTimer.current = setTimeout(() => setLeavingIndex(null), LEAVE_MS)
    setIndex(next)
  }
  const onTourEnd = () => {
    if (canAdvance) goTo(index + 1)
  }

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const observer = new IntersectionObserver(([entry]) => setInView(!!entry?.isIntersecting), { threshold: 0.35 })
    observer.observe(root)
    return () => observer.disconnect()
  }, [rootRef])

  function onKeyDown(event: KeyboardEvent) {
    if (event.target !== event.currentTarget) return
    const step = ({ ArrowRight: 1, ArrowLeft: -1 } as Record<string, number>)[event.key]
    if (step) {
      event.preventDefault()
      goTo(index + step)
    }
  }
  function onTouchStart(event: TouchEvent) {
    setPressed(true)
    const touch = event.touches[0]
    touchStart.current = touch ? { x: touch.clientX, y: touch.clientY } : null
  }
  function onTouchEnd(event: TouchEvent) {
    if (event.touches.length > 0) return
    setPressed(false)
    const start = touchStart.current
    const touch = event.changedTouches[0]
    touchStart.current = null
    if (!start || !touch) return
    const dx = touch.clientX - start.x
    if (Math.abs(dx) > SWIPE_MIN && Math.abs(dx) > Math.abs(touch.clientY - start.y) * 1.5) {
      swiped.current = true
      goTo(index + (dx < 0 ? 1 : -1))
    }
  }
  function onStackClick() {
    if (swiped.current) swiped.current = false
    else goTo(index + 1)
  }

  return (
    <div
      className={['homepage-deck', className].filter(Boolean).join(' ')}
      data-block={current.id}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false)
      }}
      onFocusCapture={(event) => {
        if ((event.target as HTMLElement).matches(':focus-visible')) setFocused(true)
      }}
      onPointerEnter={(event) => {
        if (event.pointerType !== 'touch') setHovered(true)
      }}
      onPointerLeave={() => setHovered(false)}
      ref={rootRef}
      style={style}
    >
      <div
        aria-label="Healthcare building blocks"
        aria-roledescription="carousel"
        className="homepage-deck-stack"
        id="homepage-deck-stack"
        onClick={onStackClick}
        onKeyDown={onKeyDown}
        onTouchCancel={onTouchEnd}
        onTouchEnd={onTouchEnd}
        onTouchStart={onTouchStart}
        role="group"
        tabIndex={0}
      >
        {blocks.map((block, i) => {
          const place = (i - index + count) % count
          const active = place === 0
          return (
            <DeckCard
              ariaLabel={`${block.label}, ${i + 1} of ${count}`}
              block={block}
              key={block.id}
              leaving={leavingIndex === i && !reduced}
              live={active && tourLive}
              onTourEnd={active ? onTourEnd : undefined}
              place={place}
              skipInteractionGate={skipInteractionGate}
              touchLayout={touchLayout}
            />
          )
        })}
      </div>

      <div className="homepage-deck-bar">
        <button aria-controls="homepage-deck-stack" aria-label="Previous building block" className="homepage-deck-control" onClick={() => goTo(index - 1)} type="button">
          <ArrowIcon d="M16 10H4M9 5l-5 5 5 5" />
        </button>
        <ul aria-label="Building blocks" className="homepage-deck-dots">
          {blocks.map((block, i) => (
            <li key={block.id}>
              <button
                aria-controls="homepage-deck-stack"
                aria-current={i === index ? 'true' : undefined}
                aria-label={`Show ${block.label}`}
                className="homepage-deck-dot"
                onClick={() => goTo(i)}
                type="button"
              />
            </li>
          ))}
        </ul>
        <button aria-controls="homepage-deck-stack" aria-label="Next building block" className="homepage-deck-control" onClick={() => goTo(index + 1)} type="button">
          <ArrowIcon d="M4 10h12M11 5l5 5-5 5" />
        </button>
      </div>

      <p aria-live="polite" role="status" style={visuallyHidden}>
        {current.label}, {index + 1} of {count}
      </p>
    </div>
  )
}
