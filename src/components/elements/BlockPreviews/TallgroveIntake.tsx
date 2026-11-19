/* "Tailored" intake (Tallgrove Health): 4-step flow with prefilled data, patient voice and check-in pass.
   Port of `M`, `ie`, `ae`, `oe`, `le` and `ce` from the site bundle. */
import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react'
import './blocks.css'
import {
  CHECKIN_CODE,
  INITIAL_VISIT_REASONS,
  INTAKE_MEDICATIONS,
  TALLGROVE_INTAKE_STEPS,
  VISIT_REASONS,
} from './intake.data'
import {
  IMAGES,
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

/** Toggles a value in a set kept in state. */
export const toggleInSet =
  (setter: Dispatch<SetStateAction<Set<string>>>) =>
  (value: string) =>
    setter((previous) => {
      const next = new Set(previous)
      if (next.has(value)) next.delete(value)
      else next.add(value)
      return next
    })

interface StepProps {
  /** Id of the element "tapped" by the tour (highlights the button). */
  tapped: string | null
}

/** Step 1: confirms the details that came from the chart. */
export function AboutYouStep({ tapped, onNext }: StepProps & { onNext: () => void }) {
  return (
    <>
      <p className="homepage-bb-tl-kicker">Step 1 of 4 · About you</p>
      <h3 className="homepage-bb-tl-title">Is this still you, Ava?</h3>
      <p className="homepage-bb-tl-meta">We filled this in from your last visit. Change only what’s new.</p>
      <div className="homepage-bb-ti-record">
        <div className="homepage-bb-ti-record-head">
          <img decoding="async" height={160} width={160} alt="" className="homepage-bb-ti-avatar" src={IMAGES.patientAva} />
          <span>
            <strong>Ava Bennett</strong>
            <span>Born March 14, 1974</span>
          </span>
        </div>
        <dl className="homepage-bb-ti-facts">
          <div>
            <dt>Phone</dt>
            <dd>(555) 014-2290</dd>
          </div>
          <div>
            <dt>Address</dt>
            <dd>48 Clinton St, Portland</dd>
          </div>
          <div>
            <dt>Insurance</dt>
            <dd>Aetna · ending 1193</dd>
          </div>
        </dl>
        <p className="homepage-bb-ti-source">Filled in from your record · March 2026</p>
      </div>
      <button className="homepage-bb-tl-cta" data-tapped={dataIf(tapped, 'next')} onClick={onNext} type="button">
        Yes, that’s me
      </button>
    </>
  )
}

/** Step 2: visit reasons, "in your own words" and voice. */
export function VisitReasonStep({
  tapped,
  picked,
  onToggle,
  onNext,
}: StepProps & { picked: Set<string>; onToggle: (reason: string) => void; onNext: () => void }) {
  return (
    <>
      <p className="homepage-bb-tl-kicker">Step 2 of 4 · Your visit</p>
      <h3 className="homepage-bb-tl-title">What would you like Dr. Braga to know?</h3>
      <div className="homepage-bb-ti-reasons">
        {VISIT_REASONS.map((reason) => (
          <button
            aria-pressed={picked.has(reason)}
            className="homepage-bb-ti-reason"
            data-tapped={dataIf(tapped, reason)}
            key={reason}
            onClick={() => onToggle(reason)}
            type="button"
          >
            {reason}
          </button>
        ))}
      </div>
      <blockquote className="homepage-bb-tl-words">
        <p className="homepage-bb-tl-label">In your words</p>
        <p>The headaches are gone since the new dose, but I get dizzy when I stand up.</p>
      </blockquote>
      <p className="homepage-bb-ti-voice">
        <svg aria-hidden fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
          <rect height="12" rx="3" width="6" x="9" y="3" />
          <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
        </svg>
        Or say it out loud. Dr. Braga reads it before you walk in.
      </p>
      <button className="homepage-bb-tl-cta" data-tapped={dataIf(tapped, 'next')} onClick={onNext} type="button">
        Continue
      </button>
    </>
  )
}

/** Step 3: confirms the medications still being taken. */
export function MedicationsStep({
  tapped,
  stopped,
  onToggle,
  onNext,
}: StepProps & { stopped: Set<string>; onToggle: (name: string) => void; onNext: () => void }) {
  return (
    <>
      <p className="homepage-bb-tl-kicker">Step 3 of 4 · Medications</p>
      <h3 className="homepage-bb-tl-title">Still taking these?</h3>
      <p className="homepage-bb-tl-meta">From your pharmacy. Tap one you’ve stopped.</p>
      <ul className="homepage-bb-ti-meds">
        {INTAKE_MEDICATIONS.map((medication) => {
          const stillTaking = !stopped.has(medication.name)
          return (
            <li key={medication.name}>
              <button
                aria-pressed={stillTaking}
                className="homepage-bb-ti-med"
                data-tapped={dataIf(tapped, medication.name)}
                onClick={() => onToggle(medication.name)}
                type="button"
              >
                <span className="homepage-bb-ti-med-text">
                  <strong>{medication.name}</strong>
                  <span>{medication.detail}</span>
                </span>
                <span className="homepage-bb-ti-med-state">{stillTaking ? 'Still taking' : 'Stopped'}</span>
              </button>
            </li>
          )
        })}
      </ul>
      <p className="homepage-bb-tl-allergy">Allergic to Penicillin</p>
      <button className="homepage-bb-tl-cta" data-tapped={dataIf(tapped, 'next')} onClick={onNext} type="button">
        Looks right
      </button>
    </>
  )
}

/** Step 4: check-in pass with a code. */
export function CheckedInStep({ tapped, onRestart }: StepProps & { onRestart: () => void }) {
  return (
    <>
      <p className="homepage-bb-tl-kicker">Step 4 of 4 · Checked in</p>
      <h3 className="homepage-bb-tl-title">See you Thursday, Ava</h3>
      <div className="homepage-bb-ti-pass">
        <div className="homepage-bb-ti-pass-band">
          <TallgroveMark />
          <TallgroveName />
          <span className="homepage-bb-ti-pass-kind">Check-in pass</span>
        </div>
        <div className="homepage-bb-ti-pass-body">
          <span className="homepage-bb-ti-pass-when">
            <strong>Thursday, 9:30</strong>
            <span>Dr. Braga · Follow-up</span>
            <span>Scan at the front desk</span>
          </span>
          <svg
            aria-label="Check-in code"
            className="homepage-bb-ti-code"
            role="img"
            viewBox={`-1 -1 ${CHECKIN_CODE.size + 2} ${CHECKIN_CODE.size + 2}`}
          >
            <path d={CHECKIN_CODE.path} fill="currentColor" fillRule="evenodd" />
          </svg>
        </div>
      </div>
      <p className="homepage-bb-tl-meta">Your answers are already in Dr. Braga’s prep for the visit.</p>
      <button className="homepage-bb-tl-cta" data-tapped={dataIf(tapped, 'next')} onClick={onRestart} type="button">
        Review my answers
      </button>
    </>
  )
}

export interface TallgroveIntakeProps {
  /** Turns on the tour: goes through the 4 steps, checks a reason, stops a medication and starts over. */
  live?: boolean
  /** Called at the end of each tour cycle. */
  onTourEnd?: () => void
}

/** "Tailored" intake: Tallgrove Health's patient flow. */
export function TallgroveIntake({ live = false, onTourEnd }: TallgroveIntakeProps) {
  const [stepIndex, setStepIndex] = useState(0)
  const [reasons, setReasons] = useState<Set<string>>(() => new Set(INITIAL_VISIT_REASONS))
  const [stopped, setStopped] = useState<Set<string>>(() => new Set())
  const contentRef = useRef<HTMLDivElement>(null)
  const { tapped, tap } = useTap()
  const onTourEndRef = useRef(onTourEnd)
  onTourEndRef.current = onTourEnd
  const minutesLeft = TALLGROVE_INTAKE_STEPS.length - 1 - stepIndex

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0 })
  }, [stepIndex])

  useTour(live && !prefersReducedMotion(), async (signal) => {
    const reset = () => {
      setStepIndex(0)
      setReasons(new Set(INITIAL_VISIT_REASONS))
      setStopped(new Set())
    }
    // Reads, scrolls to the end of the step and taps the button.
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
        await sleep(TOUR.lead, signal)
        await tap('Medication question', signal)
        toggleInSet(setReasons)('Medication question')
        await readAndTap('next')
        setStepIndex(2)
        await sleep(TOUR.lead, signal)
        await tap(INTAKE_MEDICATIONS[1]!.name, signal)
        toggleInSet(setStopped)(INTAKE_MEDICATIONS[1]!.name)
        await readAndTap('next')
        setStepIndex(3)
        await readAndTap('next')
        reset()
        onTourEndRef.current?.()
      }
    } finally {
      reset()
    }
  })

  return (
    <section className="homepage-bb-tl" aria-label="Tailored intake interface">
      <header className="homepage-bb-tl-topbar">
        <span className="homepage-bb-tl-clinician">Visit prep · Ava Bennett</span>
        <span className="homepage-bb-tl-brand">
          <TallgroveMark />
          <TallgroveName />
        </span>
      </header>
      <div className="homepage-bb-tl-body">
        <aside aria-label="Your visit" className="homepage-bb-tl-queue homepage-bb-ti-visit">
          <p className="homepage-bb-tl-label">Your visit</p>
          <p className="homepage-bb-ti-cal">
            <span className="homepage-bb-ti-cal-day">Thu</span>
            <span className="homepage-bb-ti-cal-date">1</span>
          </p>
          <p className="homepage-bb-ti-visit-time">October · 9:30 AM</p>
          <p className="homepage-bb-ti-visit-line">Dr. Braga</p>
          <p className="homepage-bb-ti-visit-line">Follow-up · Hypertension</p>
          <p className="homepage-bb-ti-visit-line">Tallgrove Health, Alder St</p>
          <p className="homepage-bb-ti-visit-saved">{minutesLeft > 0 ? `Saved as you go · about ${minutesLeft} min left` : 'All done'}</p>
          <p className="homepage-bb-tl-label">Need to change it?</p>
          <p className="homepage-bb-ti-visit-line">Reply to any reminder to move it.</p>
        </aside>
        <div className="homepage-bb-tl-content" ref={contentRef}>
          {stepIndex === 0 ? <AboutYouStep onNext={() => setStepIndex(1)} tapped={tapped} /> : null}
          {stepIndex === 1 ? (
            <VisitReasonStep onNext={() => setStepIndex(2)} onToggle={toggleInSet(setReasons)} picked={reasons} tapped={tapped} />
          ) : null}
          {stepIndex === 2 ? (
            <MedicationsStep onNext={() => setStepIndex(3)} onToggle={toggleInSet(setStopped)} stopped={stopped} tapped={tapped} />
          ) : null}
          {stepIndex === 3 ? <CheckedInStep onRestart={() => setStepIndex(0)} tapped={tapped} /> : null}
        </div>
        <nav aria-label="Visit prep steps" className="homepage-bb-tl-steps">
          <p className="homepage-bb-tl-label">Before your visit</p>
          <p className="homepage-bb-tl-steps-who">Ava Bennett</p>
          <ol>
            {TALLGROVE_INTAKE_STEPS.map((label, index) => (
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
