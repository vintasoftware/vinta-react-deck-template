/* Shared base of the product mocks (port of website.vinta.studio, Homepage.*.js bundle, opening section).
   Readable names; the logic and timings are the site's. The CSS (homepage-bb-* classes) is in blocks.css. */
import { useEffect, useId, useLayoutEffect, useState, type ReactNode, type SVGProps } from 'react'
import './blocks.css'

/* ---------- ambiente ---------- */

const TOUCH_QUERY = '(max-width: 991px), (pointer: coarse)'

/** Touch layout: narrow screens or a device without a mouse (the site simplifies the mocks in that case). */
export function useTouchLayout() {
  const [touch, setTouch] = useState(false)
  useLayoutEffect(() => {
    if (typeof window.matchMedia !== 'function') return
    const mq = window.matchMedia(TOUCH_QUERY)
    const on = () => setTouch(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return touch
}

export function prefersReducedMotion() {
  return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches
}

/* ---------- "first interaction": the tour only starts after the person touches the page ---------- */

const INTERACTION_EVENTS = ['pointermove', 'pointerdown', 'keydown', 'touchstart', 'wheel']
let interacted = false
const waiting = new Set<() => void>()

function fireInteraction() {
  if (interacted) return
  interacted = true
  for (const ev of INTERACTION_EVENTS) window.removeEventListener(ev, fireInteraction, true)
  window.removeEventListener('scroll', fireInteraction)
  for (const cb of waiting) cb()
  waiting.clear()
}

export const hasInteracted = () => interacted

/** Runs `cb` on the first interaction (or right away, if it already happened). Returns the cancel function. */
export function whenInteracted(cb: () => void) {
  if (interacted) {
    cb()
    return () => {}
  }
  if (!waiting.size) {
    for (const ev of INTERACTION_EVENTS) window.addEventListener(ev, fireInteraction, { capture: true, passive: true })
    window.addEventListener('scroll', fireInteraction, { passive: true })
  }
  waiting.add(cb)
  return () => {
    waiting.delete(cb)
  }
}

/** Recorded clips and Storybook have no "first interaction": marks it as already interacted. */
export function markInteracted() {
  fireInteraction()
}

/* ---------- tour engine (cancellable async sequences) ---------- */

export const TOUR_ABORTED = new Error('tour aborted')

/** Waits `ms` or rejects if the tour is cancelled. */
export function sleep(ms: number, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal.aborted) return reject(TOUR_ABORTED)
    const id = window.setTimeout(resolve, ms)
    signal.addEventListener(
      'abort',
      () => {
        window.clearTimeout(id)
        reject(TOUR_ABORTED)
      },
      { once: true },
    )
  })
}

/** Waits for the element to be more than 50% on screen. */
export function whenVisible(el: Element, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal.aborted) return reject(TOUR_ABORTED)
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.intersectionRatio > 0.5)) {
          io.disconnect()
          resolve()
        }
      },
      { threshold: [0, 0.5] },
    )
    io.observe(el)
    signal.addEventListener(
      'abort',
      () => {
        io.disconnect()
        reject(TOUR_ABORTED)
      },
      { once: true },
    )
  })
}

const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2)

/** Scrolls `el` to `top` in `duration` ms, with ease in-out. */
export function smoothScrollTo(el: HTMLElement, top: number, duration: number, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal.aborted) return reject(TOUR_ABORTED)
    const from = el.scrollTop
    const to = Math.max(0, Math.min(top, el.scrollHeight - el.clientHeight))
    if (Math.abs(to - from) < 2) return resolve()
    let start = 0
    let raf = 0
    const frame = (now: number) => {
      start ||= now
      const p = Math.min(1, (now - start) / duration)
      el.scrollTop = from + (to - from) * easeInOut(p)
      if (p < 1) raf = requestAnimationFrame(frame)
      else resolve()
    }
    raf = requestAnimationFrame(frame)
    signal.addEventListener(
      'abort',
      () => {
        cancelAnimationFrame(raf)
        reject(TOUR_ABORTED)
      },
      { once: true },
    )
  })
}

/** Tour timings (ms): lead pause, cursor tap, read, scroll. */
export const TOUR = { lead: 1200, tap: 700, read: 2800, scroll: 2400 }

/** Tour "tapped element" state: `tap(id, signal)` marks the id for TOUR.tap ms and releases it. */
export function useTap() {
  const [tapped, setTapped] = useState<string | null>(null)
  return {
    tapped,
    tap: async (id: string, signal: AbortSignal) => {
      setTapped(id)
      try {
        await sleep(TOUR.tap, signal)
      } finally {
        setTapped(null)
      }
    },
  }
}

/** Boolean data attribute: '' when a and b are equal, otherwise undefined (renders as data-x="" or disappears). */
export const dataIf = (a: unknown, b: unknown) => (a === b ? '' : undefined)

/** Runs `run(signal)` while `enabled`; cancels on disable/unmount and ignores the abort. */
export function useTour(enabled: boolean, run: (signal: AbortSignal) => Promise<void>) {
  useEffect(() => {
    if (!enabled) return
    const controller = new AbortController()
    run(controller.signal).catch((e) => {
      if (e !== TOUR_ABORTED) throw e
    })
    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled])
}

/* ---------- fictional "Tallgrove Health" product brand ---------- */

export function TallgroveMark() {
  const id = useId()
  return (
    <span className="homepage-bb-tl-mark" aria-hidden>
      <svg fill="none" viewBox="0 0 32 32">
        <defs>
          <linearGradient id={id} x1="0" x2="0.6" y1="0" y2="1">
            <stop offset="0" stopColor="var(--homepage-bb-feature-blue)" />
            <stop offset="1" stopColor="var(--homepage-bb-tl-brand)" />
          </linearGradient>
        </defs>
        <path
          d="M16 2.5c1.4 1.6 2.6 3.2 2.6 4.6 1.5.8 2.4 2.2 2.4 3.7 1.5 1 2.4 2.6 2.4 4.3 1.3 1.1 2 2.6 2 4.1 0 2.6-2.3 4.3-5.4 4.3H12c-3.1 0-5.4-1.7-5.4-4.3 0-1.5.7-3 2-4.1 0-1.7.9-3.3 2.4-4.3 0-1.5.9-2.9 2.4-3.7 0-1.4 1.2-3 2.6-4.6Z"
          fill={`url(#${id})`}
        />
        <g strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 7.5v16M16 12.5l-2.4-1.9M16 16.5l3-2.3M16 20.4l-3.6-2.7M16 23.4l3.4-2.4" stroke="var(--homepage-bb-tl-on-brand)" strokeWidth="1.35" />
          <path d="M16 23.5V29" stroke="var(--homepage-bb-tl-brand-strong)" strokeWidth="1.6" />
          <path d="M9.5 29.2c4.2-1.3 8.8-1.3 13 0" stroke="var(--homepage-bb-tl-brand)" strokeWidth="1.5" />
        </g>
      </svg>
    </span>
  )
}

export function TallgroveName() {
  return (
    <span className="homepage-bb-tl-name">
      Tallgrove<span className="homepage-bb-tl-name-field"> Health</span>
    </span>
  )
}

/* ---------- mock images (public/assets/blocks) ---------- */

export const IMAGES = {
  patientAva: '/assets/blocks/patient-ava.webp',
  patientGrace: '/assets/blocks/patient-grace.webp',
  patientMiguel: '/assets/blocks/patient-miguel.webp',
  clinicianBraga: '/assets/blocks/clinician-braga.webp',
  clinicianReyes: '/assets/blocks/clinician-reyes.webp',
}

/* ---------- mock icons ---------- */

const ICON_NODES: Record<string, { node: ReactNode; box?: number; illustrated?: boolean }> = {
  'arrow-right': { node: <><path d="M4 12h16" /><path d="m14 6 6 6-6 6" /></> },
  'arrow-up-right': { node: <><path d="M7 17 17 7" /><path d="M7 7h10v10" /></> },
  check: { node: <path d="m5 12 4 4L19 6" /> },
  search: { node: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></> },
  spark: { node: <><path d="m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3Z" /><path d="m19 15 .75 2.25L22 18l-2.25.75L19 21l-.75-2.25L16 18l2.25-.75L19 15Z" /></> },
  'speaker-off-circle': {
    node: (
      <>
        <circle cx="12" cy="12" r="11.61" strokeWidth="0.774" />
        <g strokeWidth="0.86">
          <path d="M6.07 9.67H8.29L12.39 6.6V17.4L8.29 14.33H6.07V9.67Z" />
          <path d="M14.7 10.28A1.8 1.8 0 0 1 14.7 13.72" />
          <path d="M14.65 7.15A5.01 5.01 0 0 1 14.65 16.85" />
          <path d="M5.77 5.77 18.24 18.24" />
        </g>
      </>
    ),
  },
  'record-vitals': {
    box: 64,
    illustrated: true,
    node: (
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 18.8C5.8 29.6 7.9 43 17.4 50.2c9.7 7.4 27.2 6.7 36-2.2" stroke="var(--vinta-mint-300)" strokeWidth="2" opacity=".8" />
        <path d="M17.2 8.7c7.1-2 24.5-1.8 29.8 2.6 4.5 3.8 3.2 29.9-.4 37.3-2.6 5.4-25.9 5.6-31.2 1.2-4.1-3.5-3.5-35.9 1.8-41.1Z" fill="var(--vinta-surface-tint)" stroke="var(--vinta-blue-700)" strokeWidth="2.5" />
        <circle cx="28.7" cy="21.1" r="5.1" stroke="var(--vinta-blue-700)" strokeWidth="2.4" />
        <path d="M20.6 34.2c2.5-5.7 14.4-5.9 17.2-.2" stroke="var(--vinta-blue-700)" strokeWidth="2.4" />
        <path d="M19.3 41.7h6.3l2.7-4.2 4.1 8 3.1-4.1h8.2" stroke="var(--vinta-blue-700)" strokeWidth="2.3" />
        <path d="M46.7 16.1c4.9 1.3 8.5 5.2 8.8 9.9M55.6 26l-4.4-2.4m4.4 2.4 2.1-4.6" stroke="var(--vinta-mint-300)" strokeWidth="2.4" />
      </g>
    ),
  },
}

export type MockIconName = keyof typeof ICON_NODES

/** Mock icon (1.75 stroke, unless it is illustrated). More icons: see the site bundle (table `w`). */
export function MockIcon({ name, size = 20, ...rest }: { name: MockIconName; size?: number } & SVGProps<SVGSVGElement>) {
  const { node, box = 24, illustrated } = ICON_NODES[name]
  return (
    <svg aria-hidden="true" fill="none" height={size} viewBox={`0 0 ${box} ${box}`} width={size} {...(illustrated ? {} : { stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '1.75' })} {...rest}>
      {node}
    </svg>
  )
}
