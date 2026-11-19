import { useEffect, useLayoutEffect, useMemo, useRef, useState, type PointerEvent } from 'react'
import { SlideShell } from '../SlideShell'
import styles from './SlideBuildingBlocks.module.css'

export type BlockAudience = 'patient' | 'practice'
/** [block name, audience] */
export type BuildingBlock = [name: string, audience: BlockAudience]
export type BlockFilter = 'all' | BlockAudience
/** Cube that carries a name: column/row of the isometric grid and the side the wire leaves from. */
export interface NamedSlot {
  column: number
  row: number
  side: 'up' | 'down'
}

export interface SlideBuildingBlocksProps {
  /** Final number of the animated counter (shows `${count}+`). */
  count?: number
  /** Text beside the counter. */
  claim?: string
  /** Subtitle on the right, on two lines. */
  lede?: [string, string]
  /** Filter pill labels. */
  filterLabels?: Record<BlockFilter, string>
  /** Full list of blocks; each one is patient or practice. */
  blocks?: BuildingBlock[]
  /** The 16 named cubes (grid position). */
  slots?: NamedSlot[]
  /** Filtro inicial. */
  filter?: BlockFilter
  /** Switches one name every ~850ms (the named cubes "breathe"). Turn off for a static image. */
  autoplay?: boolean
  /** Cycles All → Patient → Practice on its own (to present without a mouse). */
  cycleFilters?: boolean
  /** Duration of each filter in the automatic cycle (ms). */
  filterDwellMs?: number
  /** Interval between one name switch and the next (ms). Default = the site's; use 2800 in slide clips (slow). */
  cycleMs?: number
  /** How long the old name stays visible while leaving (ms). Follows `cycleMs`. */
  settleMs?: number
  /** The counter goes from 0 to `count` on mount. Turn off for looping clips (it already starts at 50+). */
  countUp?: boolean
}

/* Isometric geometry identical to the site's (viewBox 1680 × 560). */
const L = 46
const BT = L * Math.sqrt(3)
const XT = L * 1.5
const COLS = 21
const CELLS = 126
const ORIGIN_X = 40
const ORIGIN_Y = 118
const VIEW_W = 1680
const VIEW_H = 560
const LAMP_RADIUS = 115
const CYCLE_MS = 850
const SETTLE_MS = 650
const STRIDE = 7

const cellPos = (column: number, row: number) => ({ x: ORIGIN_X + column * BT + (row % 2) * (BT / 2), y: ORIGIN_Y + row * XT })

function cubePoints(x: number, y: number, n = L) {
  const r = (n * Math.sqrt(3)) / 2
  const pts = (list: number[][]) => list.map(([px, py]) => `${px},${py}`).join(' ')
  return {
    top: pts([[x, y - n], [x + r, y - n / 2], [x, y], [x - r, y - n / 2]]),
    left: pts([[x - r, y - n / 2], [x, y], [x, y + n], [x - r, y + n / 2]]),
    right: pts([[x + r, y - n / 2], [x, y], [x, y + n], [x + r, y + n / 2]]),
  }
}

export const DEFAULT_BLOCKS: BuildingBlock[] = [
  ['Self-intake forms', 'patient'], ['Claims submission', 'practice'], ['Care plans', 'patient'], ['E‑prescribing', 'practice'],
  ['Workflow builder', 'practice'], ['Appointment scheduling', 'patient'], ['Lab orders', 'practice'], ['Cost estimates', 'patient'],
  ['Role-based access', 'practice'], ['AI clinical copilot', 'practice'], ['Insurance info', 'patient'], ['Remote monitoring', 'practice'],
  ['AI chat concierge', 'patient'], ['Provider payouts', 'practice'], ['Consent management', 'patient'], ['Clinical documentation', 'practice'],
  ['Telehealth access', 'patient'], ['Eligibility check', 'practice'], ['Patient dashboard', 'patient'], ['Referrals', 'practice'],
  ['Prescriptions', 'patient'], ['Audit & compliance', 'practice'], ['Statements & payments', 'patient'], ['Caseload matching', 'practice'],
  ['Health data sharing', 'patient'], ['Forms builder', 'practice'], ['SMS & voice', 'patient'], ['Staff messaging', 'practice'],
  ['Labs & results', 'patient'], ['Reporting', 'practice'], ['Appointment reminders', 'patient'], ['Diagnoses (ICD-10)', 'practice'],
  ['Profile & chart', 'practice'], ['Payment flexibility', 'patient'], ['Charge capture / CPT', 'practice'], ['Self-registration', 'patient'],
  ['Inbox & worklists', 'practice'], ['Voice & fax', 'practice'], ['Consent records', 'practice'], ['Provider messaging', 'patient'],
  ['Care plan management', 'practice'], ['Health record access', 'patient'],
]

export const DEFAULT_SLOTS: NamedSlot[] = [
  { column: 1, row: 2, side: 'up' }, { column: 3, row: 0, side: 'up' }, { column: 3, row: 4, side: 'down' }, { column: 5, row: 2, side: 'up' },
  { column: 6, row: 5, side: 'down' }, { column: 8, row: 1, side: 'up' }, { column: 7, row: 3, side: 'down' }, { column: 10, row: 3, side: 'up' },
  { column: 9, row: 5, side: 'down' }, { column: 12, row: 0, side: 'up' }, { column: 12, row: 4, side: 'down' }, { column: 14, row: 2, side: 'up' },
  { column: 15, row: 4, side: 'down' }, { column: 17, row: 1, side: 'up' }, { column: 18, row: 3, side: 'down' }, { column: 19, row: 0, side: 'up' },
]

const DEFAULT_LABELS: Record<BlockFilter, string> = { all: 'All blocks', patient: 'The patient', practice: 'The practice' }
const FILTER_ORDER: BlockFilter[] = ['all', 'patient', 'practice']

interface Lit {
  block: number
  previous?: number
  since: number
}

function Cube({ x, y, audience, state }: { x: number; y: number; audience: BlockAudience; state?: 'in' | 'out' }) {
  const p = cubePoints(x, y)
  return (
    <g className={styles.cube} data-audience={audience} data-state={state} style={{ transformOrigin: `${x}px ${y}px` }}>
      <polygon className={styles.faceLeft} points={p.left} />
      <polygon className={styles.faceRight} points={p.right} />
      <polygon className={styles.faceTop} points={p.top} />
      <polyline className={styles.cubeEdge} points={`${x},${y - L} ${x},${y} ${x},${y + L}`} />
    </g>
  )
}

const STARS: [number, string, string, number][] = [
  [12, '2%', '4%', 0], [8, '96%', '3%', 1], [8, '4%', '16%', 2], [10, '97%', '14%', 3], [10, '1%', '30%', 4], [8, '95%', '28%', 5],
  [8, '3%', '44%', 6], [12, '98%', '42%', 7], [12, '2%', '58%', 8], [8, '96%', '56%', 9], [8, '4%', '72%', 10], [10, '97%', '70%', 11],
  [10, '1%', '86%', 12], [8, '95%', '84%', 13], [8, '3%', '97%', 14], [12, '97%', '96%', 15],
]

/** Building blocks field: isometric cubes that light up and switch names, with an All / Patient / Practice filter.
 *  Port of the site's home component (website.vinta.studio), 1920 × 1080. Everything comes from props. */
export function SlideBuildingBlocks({
  count = 50,
  claim = 'building blocks across the care journey',
  lede = ['From the first form a patient fills in', 'to the claim that closes the visit.'],
  filterLabels = DEFAULT_LABELS,
  blocks = DEFAULT_BLOCKS,
  slots = DEFAULT_SLOTS,
  filter: initialFilter = 'all',
  autoplay = true,
  cycleFilters = true,
  cycleMs = CYCLE_MS,
  settleMs = SETTLE_MS,
  filterDwellMs = 7000,
  countUp = true,
}: SlideBuildingBlocksProps) {
  const total = blocks.length
  const patientIdx = useMemo(() => blocks.flatMap(([, a], i) => (a === 'patient' ? [i] : [])), [blocks])
  const practiceIdx = useMemo(() => blocks.flatMap(([, a], i) => (a === 'practice' ? [i] : [])), [blocks])
  const namedSet = useMemo(() => new Set(slots.map((s) => `${s.column}-${s.row}`)), [slots])
  const cells = useMemo(
    () =>
      Array.from({ length: CELLS }, (_, t) => {
        const row = Math.floor(t / COLS)
        const column = t % COLS
        const list = (column + row) % 2 === 0 ? patientIdx : practiceIdx
        return { column, row, ...cellPos(column, row), block: list[(column * 7 + row * 11) % list.length], named: namedSet.has(`${column}-${row}`) }
      }),
    [patientIdx, practiceIdx, namedSet],
  )
  const quiet = useMemo(() => cells.filter((c) => !c.named && (c.column * 5 + c.row * 3) % 3 === 0), [cells])

  const [filter, setFilter] = useState<BlockFilter>(initialFilter)
  const [auto, setAuto] = useState(cycleFilters)
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null)
  const [lit, setLit] = useState<Lit[]>(() =>
    slots.map((_, t) => ({ block: (t % 2 === 0 ? patientIdx : practiceIdx)[Math.floor(t / 2) % (t % 2 === 0 ? patientIdx : practiceIdx).length], since: 0 })),
  )
  const cursor = useRef(slots.length)
  const turn = useRef(0)
  const countRef = useRef<HTMLSpanElement>(null)
  const raf = useRef(0)

  /* Counter 0 → count+ on mount. */
  useEffect(() => {
    const el = countRef.current
    if (!el) return
    if (!autoplay || !countUp) {
      el.textContent = `${count}+`
      return
    }
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 1600)
      const eased = 1 - Math.pow(1 - p, 3)
      el.textContent = p >= 1 ? `${count}+` : String(Math.round(eased * count))
      if (p < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [count, autoplay, countUp])

  /* A named cube switches block every CYCLE_MS (as on the site), without repeating visible names. */
  useEffect(() => {
    if (!autoplay || pointer) return
    const id = setInterval(() => {
      setLit((prev) => {
        const slot = (turn.current * STRIDE) % slots.length
        turn.current += 1
        const used = new Set(prev.map((p) => p.block))
        const patientCount = prev.filter((p, i) => i !== slot && blocks[p.block][1] === 'patient').length
        const want: BlockAudience = filter === 'all' ? (patientCount < (slots.length - 1) / 2 ? 'patient' : 'practice') : filter
        let next = cursor.current % total
        let guard = 0
        while ((used.has(next) || blocks[next][1] !== want) && guard < total) {
          next = (next + 1) % total
          guard += 1
        }
        cursor.current = next + 1
        const now = Date.now()
        return prev.map((p, i) => (i === slot ? { block: next, previous: p.block, since: now } : p.previous !== undefined && now - p.since >= settleMs ? { block: p.block, since: p.since } : p))
      })
    }, cycleMs)
    return () => clearInterval(id)
  }, [autoplay, pointer, filter, blocks, slots.length, total, cycleMs, settleMs])

  /* When filtering, the other audience's cubes switch to blocks of the chosen audience. */
  useEffect(() => {
    if (filter === 'all') return
    setLit((prev) => {
      const used = new Set(prev.map((p) => p.block))
      const free = blocks.map((b, i) => ({ b, i })).filter(({ b, i }) => b[1] === filter && !used.has(i)).map(({ i }) => i)
      return prev.map((p) => (blocks[p.block][1] === filter || free.length === 0 ? p : { block: free.shift() as number, previous: p.block, since: Date.now() }))
    })
  }, [filter, blocks])

  /* Presenting without a mouse: All → Patient → Practice in a loop. */
  useEffect(() => {
    if (!autoplay || !auto) return
    const id = setInterval(() => setFilter((f) => FILTER_ORDER[(FILTER_ORDER.indexOf(f) + 1) % FILTER_ORDER.length]), filterDwellMs)
    return () => clearInterval(id)
  }, [autoplay, auto, filterDwellMs])

  const pick = (f: BlockFilter) => {
    setAuto(false)
    setFilter(f)
  }

  const onMove = (e: PointerEvent<SVGSVGElement>) => {
    if (e.pointerType !== 'mouse') return
    const svg = e.currentTarget
    const ctm = svg.getScreenCTM()
    if (!ctm) return
    const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse())
    setPointer({ x: pt.x, y: pt.y })
  }

  const lamps = pointer ? cells.filter((c) => Math.hypot(c.x - pointer.x, c.y - pointer.y) < LAMP_RADIUS) : []
  const nearest = lamps.reduce<(typeof cells)[number] | null>((best, c) => (!best || Math.hypot(c.x - pointer!.x, c.y - pointer!.y) < Math.hypot(best.x - pointer!.x, best.y - pointer!.y) ? c : best), null)
  const lampBlock = (() => {
    if (!nearest) return null
    const slotIdx = slots.findIndex((s) => s.column === nearest.column && s.row === nearest.row)
    let b = slotIdx >= 0 ? lit[slotIdx].block : nearest.block
    if (slotIdx < 0) {
      const taken = new Set(lit.map((l) => l.block))
      while (taken.has(b)) b = (b + 1) % total
    }
    const item = blocks[b]
    return filter === 'all' || item[1] === filter ? item : null
  })()
  const lampKeys = new Set(lamps.map((c) => `${c.column}-${c.row}`))

  /* Hides chips that overlap. */
  const namesRef = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const root = namesRef.current
    if (!root) return
    const run = () => {
      const tags = [...root.querySelectorAll<HTMLElement>('[data-tag]')]
      tags.sort((a, b) => Number(b.hasAttribute('data-held')) - Number(a.hasAttribute('data-held')))
      const placed: DOMRect[] = []
      for (const tag of tags) {
        tag.removeAttribute('data-clash')
        const r = tag.getBoundingClientRect()
        if (placed.some((p) => r.left < p.right + 6 && r.right > p.left - 6 && r.top < p.bottom + 4 && r.bottom > p.top - 4)) tag.setAttribute('data-clash', '')
        else placed.push(r)
      }
    }
    run()
    const ro = new ResizeObserver(run)
    ro.observe(root)
    return () => ro.disconnect()
  }, [lit, nearest])

  const heldKey = nearest ? `${nearest.column}-${nearest.row}` : ''

  return (
    <SlideShell mode="invert-blue" safeArea={0} background={<Backdrop />}>
      <div className={styles.field} data-filter={filter}>
        <div className={styles.head}>
          <h3 className={styles.title}>
            <span className={styles.count} ref={countRef} aria-hidden="true">
              0
            </span>
            <span className={styles.claim}>{claim}</span>
          </h3>
          <div className={styles.side}>
            <p className={styles.lede}>
              <span>{lede[0]}</span>
              <span>{lede[1]}</span>
            </p>
            <div className={styles.toggle} data-mode={filter} role="group" aria-label="Show building blocks for">
              <span className={styles.thumb} aria-hidden="true" />
              {FILTER_ORDER.map((f) => (
                <button key={f} type="button" className={styles.option} data-mode={f} aria-pressed={filter === f} onClick={() => pick(f)}>
                  {f === 'all' ? null : <span className={styles.keyCube} aria-hidden="true" />}
                  {filterLabels[f]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.canvas}>
          <svg className={styles.svg} viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} aria-hidden="true" onPointerMove={onMove} onPointerLeave={() => setPointer(null)}>
            <defs>
              <radialGradient id="bb-fade" cx="50%" cy="55%" r="60%">
                <stop offset="0%" stopColor="#fff" stopOpacity="1" />
                <stop offset="100%" stopColor="#fff" stopOpacity="0" />
              </radialGradient>
              <mask id="bb-mask">
                <rect fill="url(#bb-fade)" width={VIEW_W} height={VIEW_H} x="0" y="0" />
              </mask>
            </defs>
            <g className={styles.grid} mask="url(#bb-mask)">
              {cells.map(({ x, y }, i) => {
                const p = cubePoints(x, y)
                return (
                  <g key={i}>
                    <polygon points={p.top} />
                    <polygon points={p.left} />
                    <polygon points={p.right} />
                  </g>
                )
              })}
            </g>
            {quiet.map((c, i) =>
              lampKeys.has(`${c.column}-${c.row}`) ? null : (
                <g key={`q-${c.column}-${c.row}`} className={styles.quiet} data-audience={blocks[c.block][1]} style={{ ['--i' as string]: i }}>
                  <Cube x={c.x} y={c.y} audience={blocks[c.block][1]} />
                </g>
              ),
            )}
            {lamps.map((c) =>
              c.named ? null : (
                <g key={`l-${c.column}-${c.row}`} className={styles.lamp} data-audience={blocks[c.block][1]} data-nearest={nearest === c ? '' : undefined}>
                  <Cube x={c.x} y={c.y} audience={blocks[c.block][1]} />
                </g>
              ),
            )}
            {slots.map((s, i) => {
              const { x, y } = cellPos(s.column, s.row)
              const cur = lit[i]
              const aud = blocks[cur.block][1]
              return (
                <g key={i} className={styles.place} data-audience={aud} data-held={heldKey === `${s.column}-${s.row}` ? '' : undefined}>
                  {cur.previous === undefined ? null : <Cube key={`out-${cur.previous}`} x={x} y={y} audience={blocks[cur.previous][1]} state="out" />}
                  <g className={styles.named} data-audience={aud} key={`in-${cur.block}`}>
                    <Cube x={x} y={y} audience={aud} state="in" />
                  </g>
                </g>
              )
            })}
            {slots.map((s, i) => {
              const { x, y } = cellPos(s.column, s.row)
              const cur = lit[i]
              const up = s.side === 'up'
              const edge = up ? y - L : y + L
              const end = up ? edge - 44 : edge + 40
              return (
                <g key={`n-${i}-${cur.block}`} className={styles.nameTag} data-audience={blocks[cur.block][1]} data-held={heldKey === `${s.column}-${s.row}` ? '' : undefined}>
                  <line className={styles.lead} x1={x} x2={x} y1={edge} y2={end} />
                  <circle className={styles.dot} cx={x} cy={end} r="3" />
                </g>
              )
            })}
          </svg>

          <div className={styles.names} ref={namesRef} aria-hidden="true">
            {slots.map((s, i) => {
              const { x, y } = cellPos(s.column, s.row)
              const cur = lit[i]
              const top = s.side === 'up' ? y - L - 44 : y + L + 40
              return (
                <span
                  key={`${i}-${cur.block}`}
                  className={styles.tag}
                  data-tag=""
                  data-audience={blocks[cur.block][1]}
                  data-end={s.column >= 16 ? '' : undefined}
                  data-held={heldKey === `${s.column}-${s.row}` ? '' : undefined}
                  style={{ left: `${(x / VIEW_W) * 100}%`, top: `${(top / VIEW_H) * 100}%` }}
                >
                  {blocks[cur.block][0]}
                </span>
              )
            })}
          </div>
          {nearest && lampBlock && !nearest.named ? (
            <span
              className={`${styles.tag} ${styles.tagLamp}`}
              data-audience={lampBlock[1]}
              data-held=""
              style={{ left: `${(nearest.x / VIEW_W) * 100}%`, top: `${((nearest.y - L - 14) / VIEW_H) * 100}%` }}
            >
              {lampBlock[0]}
            </span>
          ) : null}
        </div>
      </div>
    </SlideShell>
  )
}

/** Section background: blurred blue blots, grid, twinkling stars and the field's dark floor.
 *  `floor={false}` removes the dark floor (used by SlideBlocksCompare); the default does not change the look. */
export function Backdrop({ floor = true }: { floor?: boolean }) {
  return (
    <div className={styles.backdrop}>
      <div className={styles.glow} />
      <div className={styles.lines} />
      <svg className={styles.stars} preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <symbol id="bb-star" viewBox="-10 -10 20 20">
            <path d="M0-10C.9-2.6 2.6-.9 10 0 2.6.9.9 2.6 0 10-.9 2.6-2.6.9-10 0-2.6-.9-.9-2.6 0-10Z" fill="currentColor" />
          </symbol>
        </defs>
        {STARS.map(([size, x, y, i]) => (
          <use key={i} href="#bb-star" width={size} height={size} x={x} y={y} style={{ ['--i' as string]: i }} />
        ))}
      </svg>
      {floor ? <div className={styles.floor} /> : null}
    </div>
  )
}
