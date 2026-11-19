/* "Tailored" Provider Experience (Tallgrove Health): day queue, prep, in-room scribe, single signature and next patient.
   Port of `Le`, `Re`, `ze`, `Be`, `Ve` and `He` from the site bundle. */
import { useEffect, useRef, useState } from 'react'
import './blocks.css'
import { TALLGROVE_VISITS, TREND_ARROWS, VISIT_STEPS, type TallgroveVisitData } from './provider.data'
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

interface StepProps {
  /** Id of the element "tapped" by the tour (highlights the button). */
  tapped: string | null
}

/** Patient header (photo, name, age and reason). */
export function VisitPatient({ visit }: { visit: TallgroveVisitData }) {
  return (
    <div className="homepage-bb-tl-patient">
      <img decoding="async" height={160} width={160} alt="" className="homepage-bb-tl-patient-photo" src={visit.photo} />
      <div>
        <h3 className="homepage-bb-tl-title">{visit.name}</h3>
        <p className="homepage-bb-tl-meta">
          {visit.age} · {visit.reason}
        </p>
      </div>
    </div>
  )
}

/** Stage 1: what to know before walking into the room. */
export function VisitPrep({ tapped, visit, onStart }: StepProps & { visit: TallgroveVisitData; onStart: () => void }) {
  return (
    <>
      <p className="homepage-bb-tl-kicker">Before you walk in · {visit.time}</p>
      <VisitPatient visit={visit} />
      {visit.allergy ? <p className="homepage-bb-tl-allergy">Allergic to {visit.allergy}</p> : null}
      <blockquote className="homepage-bb-tl-words">
        <p className="homepage-bb-tl-label">In their words</p>
        <p>“{visit.words}”</p>
      </blockquote>
      <p className="homepage-bb-tl-label">What changed</p>
      <div className="homepage-bb-tl-changes">
        {visit.changes.map((change) => (
          <div className="homepage-bb-tl-change" data-trend={change.trend} key={change.label}>
            <span className="homepage-bb-tl-change-label">{change.label}</span>
            <strong>
              {change.value}
              <span aria-hidden> {TREND_ARROWS[change.trend]}</span>
            </strong>
            <span className="homepage-bb-tl-change-was">{change.was}</span>
          </div>
        ))}
      </div>
      <p className="homepage-bb-tl-label">Still open</p>
      <ul className="homepage-bb-tl-open">
        {visit.open.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <button className="homepage-bb-tl-cta" data-tapped={dataIf(tapped, 'next')} onClick={onStart} type="button">
        Start visit
      </button>
    </>
  )
}

/** Stage 2: live transcript and the SOAP note writing itself. */
export function VisitInTheRoom({ tapped, visit, onEnd }: StepProps & { visit: TallgroveVisitData; onEnd: () => void }) {
  return (
    <>
      <p className="homepage-bb-tl-kicker">
        <span className="homepage-bb-tl-live" aria-hidden />
        In the room · scribe listening
      </p>
      <h3 className="homepage-bb-tl-title">{visit.name}</h3>
      <ol className="homepage-bb-tl-transcript" aria-label="Live transcript">
        {visit.transcript.map((line) => (
          <li data-provider={line.who === 'Dr. Braga' ? '' : undefined} key={line.text}>
            <span className="homepage-bb-tl-who">{line.who}</span>
            {line.text}
          </li>
        ))}
      </ol>
      <p className="homepage-bb-tl-label">Note, drafting itself</p>
      <dl className="homepage-bb-tl-note">
        {visit.note.map((line) => (
          <div key={line.step}>
            <dt>{line.step}</dt>
            <dd>{line.text}</dd>
          </div>
        ))}
      </dl>
      <button className="homepage-bb-tl-cta" data-tapped={dataIf(tapped, 'next')} onClick={onEnd} type="button">
        End visit and review
      </button>
    </>
  )
}

/** Stage 3: all the visit's orders, one signature (before and after signing). */
export function VisitWrapUp({
  tapped,
  visit,
  declined,
  signed,
  onToggle,
  onSign,
  onNext,
}: StepProps & {
  visit: TallgroveVisitData
  /** `<visit id>-<order text>` keys of the unchecked orders. */
  declined: Set<string>
  signed: boolean
  onToggle: (key: string) => void
  onSign: () => void
  onNext: () => void
}) {
  const sending = visit.orders.filter((order) => !declined.has(`${visit.id}-${order.text}`))
  if (signed) {
    return (
      <>
        <p className="homepage-bb-tl-kicker">Wrap-up · signed</p>
        <h3 className="homepage-bb-tl-title">Sent, all at once</h3>
        <ul className="homepage-bb-tl-sent">
          {sending.map((order) => (
            <li key={order.text}>
              <span className="homepage-bb-tl-order-kind">{order.kind}</span>
              {order.text}
            </li>
          ))}
        </ul>
        <p className="homepage-bb-tl-meta">Pharmacy, patient app and billing updated from one signature.</p>
        <button className="homepage-bb-tl-cta" data-tapped={dataIf(tapped, 'next')} onClick={onNext} type="button">
          Next patient
        </button>
      </>
    )
  }
  return (
    <>
      <p className="homepage-bb-tl-kicker">Wrap-up · one sign-off</p>
      <h3 className="homepage-bb-tl-title">Everything the visit decided</h3>
      <ul className="homepage-bb-tl-orders">
        {visit.orders.map((order) => {
          const key = `${visit.id}-${order.text}`
          const included = !declined.has(key)
          return (
            <li key={key}>
              <button
                aria-pressed={included}
                className="homepage-bb-tl-order"
                data-tapped={dataIf(tapped, key)}
                onClick={() => onToggle(key)}
                type="button"
              >
                <span className="homepage-bb-tl-order-check" aria-hidden />
                <span className="homepage-bb-tl-order-kind">{order.kind}</span>
                <span className="homepage-bb-tl-order-text">{order.text}</span>
              </button>
            </li>
          )
        })}
      </ul>
      <button
        className="homepage-bb-tl-cta"
        data-tapped={dataIf(tapped, 'next')}
        disabled={sending.length === 0}
        onClick={onSign}
        type="button"
      >
        Sign and send {sending.length}
      </button>
    </>
  )
}

/** Stage 4: the next patient (or the end of the list). */
export function VisitNextPatient({
  tapped,
  next,
  onOpen,
}: StepProps & { next: TallgroveVisitData | null; onOpen: () => void }) {
  if (next) {
    return (
      <>
        <p className="homepage-bb-tl-kicker">Up next · {next.time}</p>
        <VisitPatient visit={next} />
        <p className="homepage-bb-tl-label">Worth knowing before you go in</p>
        <ul className="homepage-bb-tl-open">
          {next.open.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <button className="homepage-bb-tl-cta" data-tapped={dataIf(tapped, 'next')} onClick={onOpen} type="button">
          Open prep
        </button>
      </>
    )
  }
  return (
    <>
      <p className="homepage-bb-tl-kicker">Next patient</p>
      <h3 className="homepage-bb-tl-title">That’s the list for now</h3>
      <p className="homepage-bb-tl-meta">Five more this afternoon, prepped the same way.</p>
      <button className="homepage-bb-tl-cta" data-tapped={dataIf(tapped, 'next')} onClick={onOpen} type="button">
        Back to the first visit
      </button>
    </>
  )
}

export interface TallgroveProviderProps {
  /** Turns on the tour: goes through prep → room → signature → next patient. */
  live?: boolean
  /** Called at the end of each tour cycle. */
  onTourEnd?: () => void
}

/** "Tailored" Provider Experience: Dr. Braga's day at Tallgrove Health. */
export function TallgroveProvider({ live = false, onTourEnd }: TallgroveProviderProps) {
  const [visitIndex, setVisitIndex] = useState(0)
  const [stepIndex, setStepIndex] = useState(0)
  const [declined, setDeclined] = useState<Set<string>>(() => new Set())
  const [signed, setSigned] = useState<Set<string>>(() => new Set())
  const contentRef = useRef<HTMLDivElement>(null)
  const { tapped, tap } = useTap()
  const onTourEndRef = useRef(onTourEnd)
  onTourEndRef.current = onTourEnd
  const visit = TALLGROVE_VISITS[visitIndex]!
  const nextVisit = TALLGROVE_VISITS[visitIndex + 1] ?? null

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0 })
  }, [visitIndex, stepIndex])

  const goToVisit = (index: number) => {
    setVisitIndex(index)
    setStepIndex(0)
  }

  useTour(live && !prefersReducedMotion(), async (signal) => {
    const firstVisit = TALLGROVE_VISITS[0]!
    const reset = () => {
      setVisitIndex(0)
      setStepIndex(0)
      setDeclined(new Set())
      setSigned(new Set())
    }
    // Reads, scrolls to the end of the stage and taps the button.
    const readAndTap = async (id: string) => {
      const content = contentRef.current
      await sleep(TOUR.read, signal)
      if (content) await smoothScrollTo(content, content.scrollHeight, TOUR.scroll, signal)
      await tap(id, signal)
    }
    reset()
    try {
      if (contentRef.current) await whenVisible(contentRef.current, signal)
      for (;;) {
        await readAndTap('next')
        setStepIndex(1)
        await readAndTap('next')
        setStepIndex(2)
        const lastOrder = firstVisit.orders[firstVisit.orders.length - 1]
        if (lastOrder) {
          const key = `${firstVisit.id}-${lastOrder.text}`
          await sleep(TOUR.lead, signal)
          await tap(key, signal)
          setDeclined(new Set([key]))
        }
        await readAndTap('next')
        setSigned(new Set([firstVisit.id]))
        await readAndTap('next')
        setStepIndex(3)
        await readAndTap('next')
        setVisitIndex(1)
        setStepIndex(0)
        await sleep(TOUR.read, signal)
        reset()
        onTourEndRef.current?.()
      }
    } finally {
      reset()
    }
  })

  return (
    <section className="homepage-bb-tl" aria-label="Tailored provider interface">
      <header className="homepage-bb-tl-topbar">
        <span className="homepage-bb-tl-clinician">Dr. Braga · Thursday</span>
        <span className="homepage-bb-tl-brand">
          <TallgroveMark />
          <TallgroveName />
        </span>
      </header>
      <div className="homepage-bb-tl-body">
        <nav aria-label="Today’s visits" className="homepage-bb-tl-queue">
          <p className="homepage-bb-tl-label">Today</p>
          <ol>
            {TALLGROVE_VISITS.map((item, index) => (
              <li key={item.id}>
                <button
                  aria-current={index === visitIndex ? 'true' : undefined}
                  className="homepage-bb-tl-queue-item"
                  onClick={() => goToVisit(index)}
                  type="button"
                >
                  <img decoding="async" height={160} width={160} alt="" className="homepage-bb-tl-queue-photo" src={item.photo} />
                  <span className="homepage-bb-tl-queue-time">{item.time}</span>
                  <span className="homepage-bb-tl-queue-name">{item.name}</span>
                  <span className="homepage-bb-tl-queue-state">
                    {signed.has(item.id) ? 'Signed' : index === visitIndex ? 'With you' : 'Waiting'}
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <p className="homepage-bb-tl-queue-more">+5 this afternoon</p>
        </nav>
        <div className="homepage-bb-tl-content" ref={contentRef}>
          {stepIndex === 0 ? <VisitPrep onStart={() => setStepIndex(1)} tapped={tapped} visit={visit} /> : null}
          {stepIndex === 1 ? <VisitInTheRoom onEnd={() => setStepIndex(2)} tapped={tapped} visit={visit} /> : null}
          {stepIndex === 2 ? (
            <VisitWrapUp
              declined={declined}
              onNext={() => setStepIndex(3)}
              onSign={() => setSigned((previous) => new Set(previous).add(visit.id))}
              onToggle={(key) =>
                setDeclined((previous) => {
                  const next = new Set(previous)
                  if (next.has(key)) next.delete(key)
                  else next.add(key)
                  return next
                })
              }
              signed={signed.has(visit.id)}
              tapped={tapped}
              visit={visit}
            />
          ) : null}
          {stepIndex === 3 ? (
            <VisitNextPatient next={nextVisit} onOpen={() => goToVisit(nextVisit ? visitIndex + 1 : 0)} tapped={tapped} />
          ) : null}
        </div>
        <nav aria-label="Visit steps" className="homepage-bb-tl-steps">
          <p className="homepage-bb-tl-label">This visit</p>
          <p className="homepage-bb-tl-steps-who">{visit.name}</p>
          <ol>
            {VISIT_STEPS.map((label, index) => (
              <li key={label}>
                <button
                  aria-current={index === stepIndex ? 'step' : undefined}
                  className="homepage-bb-tl-step"
                  data-done={index < stepIndex ? '' : undefined}
                  onClick={() => setStepIndex(index)}
                  type="button"
                >
                  <span className="homepage-bb-tl-step-index">{index + 1}</span>
                  <span className="homepage-bb-tl-step-label">{label}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  )
}
