/* Before/after comparison frame ("Foundation block" × "Tailored block") with a draggable divider.
   The divider sweeps between both ends on its own when `live`; dragging, hovering or focusing pauses the sweep.
   Port of `We` (hook) and `Ge` (component) from the site bundle. */
import { useEffect, useRef, type ReactNode, type RefObject } from 'react'
import './blocks.css'
import { hasInteracted, whenInteracted } from './shared'

/** Divider positions, in % of the width: rest and limits of the automatic sweep. */
const SLIDER = { rest: 38, low: 14, high: 62 }
/** Duration (ms) of one end-to-end sweep of the divider and the pause at the ends. */
const SWEEP_MS = 3000
const HOLD_MS = 1000

const axisOf = (rect: DOMRect) => ({ start: rect.left, end: rect.right, size: rect.width })

/**
 * Wires the frame's divider: position (`--homepage-bb-cmp`), automatic sweep, drag, keyboard and focus.
 * `root` must contain `.homepage-bb-pcmp-divider`, both `.homepage-bb-pcmp-pane` and both labels.
 */
export function useCompareSlider(root: RefObject<HTMLElement | null>, live = true, skipInteractionGate = false) {
  const liveRef = useRef(live)
  const resumeRef = useRef<() => void>(() => {})

  useEffect(() => {
    liveRef.current = live
    resumeRef.current()
  }, [live])

  useEffect(() => {
    const rootEl = root.current
    const divider = rootEl?.querySelector<HTMLButtonElement>('.homepage-bb-pcmp-divider')
    if (!rootEl || !divider) return
    const frameEl = rootEl.querySelector('.homepage-bb-pcmp-frame') ?? rootEl

    const state = { position: SLIDER.rest, direction: 1, hold: 0, last: 0, frame: 0 }
    const range = { low: SLIDER.low, high: SLIDER.high }
    const flags = { visible: false, hover: false, touch: false }
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let width = rootEl.clientWidth
    let lastSync = 0

    // The sweep must not cover the labels: limits the ends to each label's width (+24px).
    const measureRange = () => {
      const { size } = axisOf(rootEl.getBoundingClientRect())
      const foundationLabel = rootEl.querySelector('.homepage-bb-pcmp-label--foundation')
      const tailoredLabel = rootEl.querySelector('.homepage-bb-pcmp-label--tailored')
      if (!size || !foundationLabel || !tailoredLabel) return
      const percentOf = (el: Element) => ((axisOf(el.getBoundingClientRect()).size + 24) / size) * 100
      range.low = Math.max(SLIDER.low, percentOf(foundationLabel))
      range.high = Math.min(SLIDER.high, 100 - percentOf(tailoredLabel))
    }

    // Only the visible side of each panel takes focus: the rest is `inert`/tabindex -1.
    const syncInteractivity = () => {
      const rootAxis = axisOf(rootEl.getBoundingClientRect())
      const edge = rootAxis.start + rootAxis.size * (state.position / 100)
      rootEl.querySelectorAll<HTMLElement>('.homepage-bb-pcmp-pane').forEach((pane) => {
        const isTailored = pane.classList.contains('homepage-bb-pcmp-pane--tailored')
        const covered = isTailored ? state.position === 100 : state.position === 0
        if (pane.inert !== covered) pane.inert = covered
        pane.querySelectorAll('button').forEach((button) => {
          const box = axisOf(button.getBoundingClientRect())
          const onVisibleSide = isTailored ? box.end > edge : box.start < edge
          if (!covered && onVisibleSide && box.size > 0) {
            if (button.hasAttribute('tabindex')) button.removeAttribute('tabindex')
          } else if (button.getAttribute('tabindex') !== '-1') {
            button.setAttribute('tabindex', '-1')
          }
        })
      })
    }

    const cssTargets = [rootEl, ...rootEl.querySelectorAll<HTMLElement>('.homepage-bb-pcmp-pane')]
    const shiftTargets = [
      ...rootEl.querySelectorAll<HTMLElement>(
        '.homepage-bb-pcmp-label--foundation, .homepage-bb-pcmp-label--tailored, .homepage-bb-pcmp-divider',
      ),
    ]

    const setPosition = (value: number, sync = true) => {
      state.position = Math.max(0, Math.min(100, value))
      const rounded = Math.round(state.position)
      for (const el of cssTargets) el.style.setProperty('--homepage-bb-cmp', `${state.position}%`)
      const offset = ((state.position - SLIDER.rest) / 100) * width
      for (const el of shiftTargets) el.style.translate = `${offset}px 0`
      const valueNow = String(rounded)
      if (divider.getAttribute('aria-valuenow') !== valueNow) {
        divider.setAttribute('aria-valuenow', valueNow)
        divider.setAttribute('aria-valuetext', `${rounded}% Foundation, ${100 - rounded}% Tailored`)
      }
      if (sync) syncInteractivity()
    }

    const isPaused = () =>
      (!skipInteractionGate && !hasInteracted()) ||
      !liveRef.current ||
      reducedMotion.matches ||
      !flags.visible ||
      document.hidden ||
      flags.hover ||
      flags.touch ||
      (document.hasFocus() && rootEl.contains(document.activeElement))

    // Sweep: sinusoidal motion between `range.low` and `range.high`, pausing at the ends.
    const tick = (timestamp: number) => {
      state.frame = 0
      if (isPaused()) {
        state.last = 0
        syncInteractivity()
        return
      }
      if (timestamp - lastSync > 250) {
        lastSync = timestamp
        syncInteractivity()
      }
      const delta = state.last ? Math.min(timestamp - state.last, 64) : 0
      state.last = timestamp
      if (state.hold > 0) {
        state.hold = Math.max(0, state.hold - delta)
      } else if (state.position < range.low || state.position > range.high) {
        // Outside the range (e.g. after a drag): eases back inside.
        const gap = (state.position < range.low ? range.low : range.high) - state.position
        setPosition(state.position + Math.sign(gap) * Math.min(Math.abs(gap), delta * 0.02), false)
      } else {
        const span = range.high - range.low
        const normalized = (state.position - range.low) / span
        let phase = Math.acos(1 - 2 * normalized) / Math.PI
        phase = Math.max(0, Math.min(1, phase + (state.direction * delta) / SWEEP_MS))
        setPosition(range.low + (span / 2) * (1 - Math.cos(Math.PI * phase)), false)
        if (phase === 0 || phase === 1) {
          state.direction = phase === 1 ? -1 : 1
          state.hold = HOLD_MS
          syncInteractivity()
        }
      }
      state.frame = requestAnimationFrame(tick)
    }

    const resume = () => {
      if (state.frame || isPaused()) return
      state.last = 0
      state.frame = requestAnimationFrame(tick)
    }
    resumeRef.current = resume

    // Keyboard focus on a control hidden behind the divider: makes room for it.
    const revealFocused = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement) || target === divider) return
      const pane = target.closest('.homepage-bb-pcmp-pane')
      if (!pane) return
      const box = axisOf(target.getBoundingClientRect())
      const rootAxis = axisOf(rootEl.getBoundingClientRect())
      if (pane.classList.contains('homepage-bb-pcmp-pane--tailored')) {
        setPosition(Math.min(state.position, (100 * (box.start - rootAxis.start - 8)) / rootAxis.size))
      } else {
        setPosition(Math.max(state.position, (100 * (box.end - rootAxis.start + 8)) / rootAxis.size))
      }
    }

    const drag = { x: 0, frame: 0, bounds: axisOf(rootEl.getBoundingClientRect()) }
    const applyDrag = () => {
      drag.frame = 0
      state.hold = 0
      setPosition(((drag.x - drag.bounds.start) / drag.bounds.size) * 100, false)
    }
    const queueDrag = (event: PointerEvent) => {
      drag.x = event.clientX
      drag.frame ||= requestAnimationFrame(applyDrag)
    }
    const onDividerDown = (event: PointerEvent) => {
      divider.setPointerCapture(event.pointerId)
      drag.bounds = axisOf(rootEl.getBoundingClientRect())
      queueDrag(event)
    }
    const onDividerMove = (event: PointerEvent) => {
      if (divider.hasPointerCapture(event.pointerId)) queueDrag(event)
    }
    const onDragEnd = () => {
      if (drag.frame) {
        cancelAnimationFrame(drag.frame)
        applyDrag()
      }
      syncInteractivity()
    }
    const onKeyDown = (event: KeyboardEvent) => {
      const next = { ArrowLeft: state.position - 2, ArrowRight: state.position + 2, Home: 0, End: 100 }[event.key as 'Home']
      if (next !== undefined) {
        event.preventDefault()
        state.hold = 0
        setPosition(next)
      }
    }
    const onPointerEnter = (event: PointerEvent) => {
      if (event.pointerType !== 'touch') flags.hover = true
    }
    const onPointerLeave = () => {
      flags.hover = false
      resume()
    }
    const onTouchStart = (event: PointerEvent) => {
      if (event.pointerType === 'touch') flags.touch = true
    }
    const onTouchEnd = () => {
      flags.touch = false
      resume()
    }
    const onFocusIn = (event: FocusEvent) => revealFocused(event.target)
    const onFocusChange = () => queueMicrotask(resume)
    const onResize = () => {
      width = rootEl.clientWidth
      measureRange()
      setPosition(state.position)
    }
    const onReducedMotionChange = () => {
      if (reducedMotion.matches) setPosition(SLIDER.rest)
      resume()
    }

    const visibility = new IntersectionObserver((entries) => {
      flags.visible = entries.some((entry) => entry.isIntersecting)
      resume()
    })
    visibility.observe(rootEl)
    const mutations = new MutationObserver(() => syncInteractivity())
    mutations.observe(frameEl, { childList: true, subtree: true })
    const resizes = new ResizeObserver(onResize)
    resizes.observe(rootEl)

    divider.addEventListener('pointerdown', onDividerDown)
    divider.addEventListener('pointermove', onDividerMove)
    divider.addEventListener('lostpointercapture', onDragEnd)
    divider.addEventListener('keydown', onKeyDown)
    rootEl.addEventListener('pointerenter', onPointerEnter)
    rootEl.addEventListener('pointerleave', onPointerLeave)
    rootEl.addEventListener('pointerdown', onTouchStart)
    rootEl.addEventListener('focusin', onFocusIn)
    rootEl.addEventListener('focusout', onFocusChange)
    window.addEventListener('pointerup', onTouchEnd)
    window.addEventListener('pointercancel', onTouchEnd)
    window.addEventListener('focus', onFocusChange)
    window.addEventListener('blur', onFocusChange)
    document.addEventListener('visibilitychange', resume)
    reducedMotion.addEventListener('change', onReducedMotionChange)
    // Without the "first interaction" gate (Storybook, clips), starts right away.
    let cancelInteractionWait = () => {}
    if (skipInteractionGate) resume()
    else cancelInteractionWait = whenInteracted(resume)

    measureRange()
    setPosition(SLIDER.rest)

    return () => {
      resumeRef.current = () => {}
      cancelAnimationFrame(state.frame)
      cancelAnimationFrame(drag.frame)
      visibility.disconnect()
      mutations.disconnect()
      resizes.disconnect()
      cancelInteractionWait()
      divider.removeEventListener('pointerdown', onDividerDown)
      divider.removeEventListener('pointermove', onDividerMove)
      divider.removeEventListener('lostpointercapture', onDragEnd)
      divider.removeEventListener('keydown', onKeyDown)
      rootEl.removeEventListener('pointerenter', onPointerEnter)
      rootEl.removeEventListener('pointerleave', onPointerLeave)
      rootEl.removeEventListener('pointerdown', onTouchStart)
      rootEl.removeEventListener('focusin', onFocusIn)
      rootEl.removeEventListener('focusout', onFocusChange)
      window.removeEventListener('pointerup', onTouchEnd)
      window.removeEventListener('pointercancel', onTouchEnd)
      window.removeEventListener('focus', onFocusChange)
      window.removeEventListener('blur', onFocusChange)
      document.removeEventListener('visibilitychange', resume)
      reducedMotion.removeEventListener('change', onReducedMotionChange)
    }
  }, [root, skipInteractionGate])
}

/** Draggable divider (blue bar + handle). The `useCompareSlider` hook finds it by class. */
export function CompareHandle() {
  return (
    <button
      aria-label="Adjust Foundation and Tailored comparison"
      aria-orientation="vertical"
      aria-valuemax={100}
      aria-valuemin={0}
      className="homepage-bb-pcmp-divider"
      role="separator"
      type="button"
    >
      <span className="homepage-bb-pcmp-grip">
        <span />
      </span>
    </button>
  )
}

export interface CompareFrameProps {
  /** Block name, used in the accessible label. */
  name: string
  /** Left panel content ("foundation" block). */
  foundation: ReactNode
  /** Right panel content ("tailored" block). */
  tailored: ReactNode
  /** Turns on the divider's automatic sweep. Off, the divider stays at 38%. */
  live?: boolean
  /** Does not wait for the person's first interaction to start the sweep (Storybook, recorded clips). */
  skipInteractionGate?: boolean
}

/** "Foundation block × Tailored block" frame: two panels clipped by a divider. Needs the container's width and height (see `.homepage-bb-pcmp`). */
export function CompareFrame({ name, foundation, tailored, live = true, skipInteractionGate = false }: CompareFrameProps) {
  const rootRef = useRef<HTMLElement>(null)
  useCompareSlider(rootRef, live, skipInteractionGate)
  return (
    <section aria-label={`${name}, foundation and tailored`} className="homepage-bb-pcmp" ref={rootRef}>
      <div className="homepage-bb-pcmp-legends">
        <p className="homepage-bb-pcmp-label homepage-bb-pcmp-label--foundation">
          Foundation<span className="homepage-bb-pcmp-label-kind"> block</span>
        </p>
        <p className="homepage-bb-pcmp-label homepage-bb-pcmp-label--tailored">
          Tailored<span className="homepage-bb-pcmp-label-kind"> block</span>
        </p>
      </div>
      <div className="homepage-bb-pcmp-frame">
        <div className="homepage-bb-pcmp-pane homepage-bb-pcmp-pane--foundation">{foundation}</div>
        <div className="homepage-bb-pcmp-pane homepage-bb-pcmp-pane--tailored">{tailored}</div>
      </div>
      <CompareHandle />
    </section>
  )
}
