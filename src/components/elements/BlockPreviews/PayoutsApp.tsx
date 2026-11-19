import { useRef, useState } from 'react'
import {
  TOUR,
  TallgroveMark,
  TallgroveName,
  dataIf,
  prefersReducedMotion,
  sleep,
  smoothScrollTo,
  useTap,
  useTour,
  whenVisible,
} from './shared'
import { PROVIDERS, TOUCH_TOUR, type PayoutStatus } from './payouts.data'
import { PayRunScreen } from './PayRunScreen'
import { PayoutDetail } from './PayoutDetail'
import { ContractsScreen } from './ContractsScreen'

type Screen = 'payouts' | 'payout' | 'contracts'

export interface PayoutsAppProps {
  /** Touch layout: one screen at a time (list, detail, contracts) instead of list + panel. */
  touchLayout?: boolean
  /** Turns on the tour (cursor, clicks, scrolling). */
  tour?: boolean
  /** Called at the end of each tour cycle. */
  onTourEnd?: () => void
}

const initialStatuses = () => Object.fromEntries(PROVIDERS.map((p) => [p.id, p.status])) as Record<string, PayoutStatus>

/** The whole Tallgrove "Payouts · Contracts · Statements" app, without the card frame. */
export function PayoutsApp({ touchLayout = false, tour = false, onTourEnd }: PayoutsAppProps) {
  const [screen, setScreen] = useState<Screen>('payouts')
  const [touchTapped, setTouchTapped] = useState<string | null>(null)
  const mainRef = useRef<HTMLDivElement>(null)
  const detailRef = useRef<HTMLElement>(null)
  const contractsRef = useRef<HTMLDivElement>(null)
  const onTourEndRef = useRef(onTourEnd)
  onTourEndRef.current = onTourEnd

  const [statuses, setStatuses] = useState(initialStatuses)
  const [selectedId, setSelectedId] = useState(PROVIDERS[0].id)
  const selected = PROVIDERS.find((p) => p.id === selectedId) ?? PROVIDERS[0]

  const approve = (ids: string[]) => setStatuses((prev) => ({ ...prev, ...Object.fromEntries(ids.map((id) => [id, 'approved' as const])) }))
  const cursor = useTap()

  // Desktop tour: approves the ones that need review, one by one, then "Approve all ready".
  useTour(tour && !touchLayout && !prefersReducedMotion(), async (signal) => {
    const main = mainRef.current
    if (!main) return
    const inReview = PROVIDERS.filter((p) => p.status === 'review')
    const ready = PROVIDERS.filter((p) => p.status === 'ready')
    const reset = () => {
      setStatuses(initialStatuses())
      setSelectedId(PROVIDERS[0].id)
    }
    reset()
    try {
      await whenVisible(main, signal)
      for (;;) {
        for (const provider of inReview) {
          await sleep(TOUR.read, signal)
          if (provider.id !== PROVIDERS[0].id) {
            await cursor.tap(provider.id, signal)
            setSelectedId(provider.id)
            await sleep(TOUR.read, signal)
          }
          await cursor.tap('approve', signal)
          approve([provider.id])
        }
        await sleep(TOUR.read, signal)
        await cursor.tap('approve-ready', signal)
        approve(ready.map((p) => p.id))
        await sleep(TOUR.read, signal)
        reset()
        await sleep(TOUR.lead, signal)
        onTourEndRef.current?.()
      }
    } finally {
      reset()
    }
  })

  const tapped = touchTapped ?? cursor.tapped

  // Touch tour: scrolls the list, opens the detail, scrolls, opens Contracts and scrolls.
  useTour(tour && touchLayout && !prefersReducedMotion(), async (signal) => {
    const main = mainRef.current
    if (!main) return
    const tapOn = async (id: string) => {
      setTouchTapped(id)
      await sleep(TOUCH_TOUR.tap, signal)
      setTouchTapped(null)
    }
    const reset = () => {
      setScreen('payouts')
      setSelectedId(PROVIDERS[0].id)
      main.scrollTop = 0
    }
    reset()
    try {
      await whenVisible(main, signal)
      for (;;) {
        await sleep(TOUCH_TOUR.lead, signal)
        await smoothScrollTo(main, main.scrollHeight, TOUCH_TOUR.down, signal)
        await sleep(TOUCH_TOUR.rest, signal)
        await smoothScrollTo(main, 0, TOUCH_TOUR.up, signal)
        await tapOn(PROVIDERS[0].id)
        setSelectedId(PROVIDERS[0].id)
        setScreen('payout')
        const detail = detailRef.current
        if (detail) {
          detail.scrollTop = 0
          await sleep(TOUCH_TOUR.read, signal)
          await smoothScrollTo(detail, detail.scrollHeight, TOUCH_TOUR.readScroll, signal)
        }
        await sleep(TOUCH_TOUR.read, signal)
        await tapOn('contracts')
        setScreen('contracts')
        const contracts = contractsRef.current
        if (contracts) {
          contracts.scrollTop = 0
          await sleep(TOUCH_TOUR.settle, signal)
          await smoothScrollTo(contracts, contracts.scrollHeight, TOUCH_TOUR.contracts, signal)
        }
        await sleep(TOUCH_TOUR.read, signal)
        reset()
        await sleep(TOUCH_TOUR.home, signal)
        onTourEndRef.current?.()
      }
    } finally {
      setTouchTapped(null)
      reset()
    }
  })

  return (
    <section aria-label="Tailored payouts interface" className="homepage-bb-tl homepage-bb-po" data-screen={touchLayout ? screen : undefined}>
      <header className="homepage-bb-tl-topbar homepage-bb-po-topbar">
        <span className="homepage-bb-tl-brand">
          <TallgroveMark />
          <TallgroveName />
        </span>
        <nav className="homepage-bb-po-nav" aria-hidden>
          <span className="homepage-bb-po-nav-item" data-on={screen !== 'contracts' || undefined}>
            Payouts
          </span>
          <span className="homepage-bb-po-nav-item" data-on={screen === 'contracts' || undefined} data-tapped={dataIf(tapped, 'contracts')}>
            Contracts
          </span>
          <span className="homepage-bb-po-nav-item">Statements</span>
        </nav>
        <span className="homepage-bb-tl-clinician">Pay run · Fri 18, 2:00 PM</span>
      </header>
      <div className="homepage-bb-po-body">
        <PayRunScreen
          onApproveReady={approve}
          onSelect={setSelectedId}
          scrollRef={mainRef}
          selectedId={selected.id}
          statuses={statuses}
          tapped={tapped}
        />
        <PayoutDetail
          onApprove={(id) => approve([id])}
          provider={selected}
          scrollRef={detailRef}
          status={statuses[selected.id]}
          tapped={tapped}
          touchLayout={touchLayout}
        />
        {touchLayout ? <ContractsScreen scrollRef={contractsRef} /> : null}
      </div>
    </section>
  )
}
