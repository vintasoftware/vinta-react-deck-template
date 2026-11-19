/* "Foundation" intake form (Groundwork EHR): 4 sections, "Save and continue", thank-you screen.
   Port of `te` / `ee` / `O` / `k` from the site bundle. */
import { useEffect, useRef, useState } from 'react'
import './blocks.css'
import { INTAKE_SECTIONS, type IntakeField } from './intake.data'
import { TOUR, dataIf, prefersReducedMotion, sleep, smoothScrollTo, useTap, useTour, whenVisible } from './shared'

/** Field label, with an asterisk when required. */
export function FieldLabel({ label, required }: { label: string; required?: boolean }) {
  return (
    <span className="homepage-bb-fi-label">
      {label}
      {required ? (
        <span className="homepage-bb-fi-required" aria-label="required">
          *
        </span>
      ) : null}
    </span>
  )
}

/** Glyph on the right of the field: arrow (dropdown) or calendar (date). */
export function FieldGlyph({ name }: { name: 'chevron' | 'calendar' }) {
  return (
    <svg
      aria-hidden
      className="homepage-bb-fi-glyph"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {name === 'chevron' ? (
        <path d="m6 9 6 6 6-6" />
      ) : (
        <>
          <rect height="16" rx="2" width="18" x="3" y="5" />
          <path d="M3 10h18M8 3v4M16 3v4" />
        </>
      )}
    </svg>
  )
}

/** One form field (text, date, list, choice or upload), visual only. */
export function IntakeFieldView({ field }: { field: IntakeField }) {
  if (field.kind === 'choice') {
    return (
      <div className="homepage-bb-fi-field homepage-bb-fi-field--wide">
        <FieldLabel label={field.label} required={field.required} />
        <span
          className="homepage-bb-fi-options"
          data-multiple={field.multiple ? '' : undefined}
          data-stacked={field.options.some((option) => option.length > 24) ? '' : undefined}
        >
          {field.options.map((option) => (
            <span className="homepage-bb-fi-option" data-picked={field.picked.includes(option) ? '' : undefined} key={option}>
              <span className="homepage-bb-fi-tick" aria-hidden />
              {option}
            </span>
          ))}
        </span>
      </div>
    )
  }
  if (field.kind === 'upload') {
    return (
      <div className="homepage-bb-fi-field homepage-bb-fi-field--wide">
        <FieldLabel label={field.label} />
        <span className="homepage-bb-fi-uploads">
          {field.options.map((option) => (
            <span className="homepage-bb-fi-upload" key={option}>
              <strong>{option}</strong>
              Drag a photo here or browse
            </span>
          ))}
        </span>
      </div>
    )
  }
  const wide = field.kind === 'area' || field.wide
  return (
    <div className={wide ? 'homepage-bb-fi-field homepage-bb-fi-field--wide' : 'homepage-bb-fi-field'}>
      <FieldLabel label={field.label} required={field.required} />
      <span className="homepage-bb-fi-input" data-empty={field.value ? undefined : ''} data-kind={field.kind}>
        <span>{field.value ?? field.hint}</span>
        {field.kind === 'select' ? <FieldGlyph name="chevron" /> : null}
        {field.kind === 'date' ? <FieldGlyph name="calendar" /> : null}
      </span>
    </div>
  )
}

export interface FoundationIntakeProps {
  /** Turns on the tour: scrolls the section, taps "Save and continue", reaches "Thank you" and starts over. */
  live?: boolean
}

/** "Foundation" intake: the generic Groundwork EHR sectioned form. */
export function FoundationIntake({ live = false }: FoundationIntakeProps) {
  const [sectionIndex, setSectionIndex] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [savedSections, setSavedSections] = useState<Set<number>>(() => new Set())
  const formRef = useRef<HTMLDivElement>(null)
  const { tapped, tap } = useTap()
  const section = INTAKE_SECTIONS[sectionIndex]!
  const isLast = sectionIndex === INTAKE_SECTIONS.length - 1

  useEffect(() => {
    formRef.current?.scrollTo({ top: 0 })
  }, [sectionIndex, submitted])

  useTour(live && !prefersReducedMotion(), async (signal) => {
    const reset = () => {
      setSubmitted(false)
      setSectionIndex(0)
      setSavedSections(new Set())
    }
    reset()
    try {
      if (formRef.current) await whenVisible(formRef.current, signal)
      for (;;) {
        for (let index = 0; index < INTAKE_SECTIONS.length; index += 1) {
          await sleep(TOUR.lead, signal)
          const form = formRef.current
          if (form) await smoothScrollTo(form, form.scrollHeight, TOUR.scroll, signal)
          await sleep(TOUR.lead, signal)
          await tap('advance', signal)
          setSavedSections((previous) => new Set(previous).add(index))
          if (index === INTAKE_SECTIONS.length - 1) setSubmitted(true)
          else setSectionIndex(index + 1)
        }
        await sleep(TOUR.read, signal)
        await tap('edit', signal)
        reset()
      }
    } finally {
      reset()
    }
  })

  const goToSection = (index: number) => {
    setSubmitted(false)
    setSectionIndex(index)
  }

  return (
    <section className="homepage-bb-app homepage-bb-fi" aria-label="Foundation intake interface">
      <div className="homepage-bb-app-topbar">
        <span className="homepage-bb-app-mark" aria-hidden>
          G
        </span>
        <span className="homepage-bb-app-name">Groundwork EHR</span>
        <span className="homepage-bb-app-avatar" aria-hidden>
          AB
        </span>
      </div>
      <div className="homepage-bb-app-layout">
        <nav className="homepage-bb-app-sidebar" aria-label="Intake form sections">
          <ol className="homepage-bb-fi-sections">
            {INTAKE_SECTIONS.map((item, index) => (
              <li key={item.title}>
                <button
                  aria-current={index === sectionIndex && !submitted ? 'step' : undefined}
                  className="homepage-bb-fi-section"
                  data-saved={savedSections.has(index) ? '' : undefined}
                  onClick={() => goToSection(index)}
                  type="button"
                >
                  <span className="homepage-bb-fi-section-index" aria-hidden>
                    {index + 1}
                  </span>
                  <span className="homepage-bb-fi-section-label">{item.title}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>
        <div className="homepage-bb-fi-main">
          {submitted ? (
            <div className="homepage-bb-fi-form" ref={formRef}>
              <p className="homepage-bb-fi-eyebrow">Form submitted</p>
              <h3 className="homepage-bb-app-title homepage-bb-app-title--flush">Thank you</h3>
              <p className="homepage-bb-app-copy">
                Your responses were saved to your chart. Please arrive 15 minutes before your appointment and bring a photo ID and
                your insurance card.
              </p>
            </div>
          ) : (
            <div className="homepage-bb-fi-form" ref={formRef}>
              <p className="homepage-bb-fi-eyebrow">
                Section {sectionIndex + 1} of {INTAKE_SECTIONS.length}
              </p>
              <h3 className="homepage-bb-app-title homepage-bb-app-title--flush">{section.title}</h3>
              <p className="homepage-bb-app-copy">
                Please complete all fields marked with <span className="homepage-bb-fi-required">*</span>
              </p>
              <span className="homepage-bb-fi-progress" aria-hidden>
                <span style={{ width: `${((sectionIndex + 1) / INTAKE_SECTIONS.length) * 100}%` }} />
              </span>
              <div className="homepage-bb-fi-grid">
                {section.fields.map((field) => (
                  <IntakeFieldView field={field} key={field.label} />
                ))}
              </div>
            </div>
          )}
          <div className="homepage-bb-fi-actions">
            {submitted ? (
              <button className="homepage-bb-fi-button" data-tapped={dataIf(tapped, 'edit')} onClick={() => goToSection(0)} type="button">
                Edit responses
              </button>
            ) : (
              <>
                <button
                  className="homepage-bb-fi-button homepage-bb-fi-button--primary"
                  data-tapped={dataIf(tapped, 'advance')}
                  onClick={() => {
                    setSavedSections((previous) => new Set(previous).add(sectionIndex))
                    if (isLast) setSubmitted(true)
                    else setSectionIndex(sectionIndex + 1)
                  }}
                  type="button"
                >
                  {isLast ? 'Submit form' : 'Save and continue'}
                </button>
                <button
                  className="homepage-bb-fi-button"
                  disabled={sectionIndex === 0}
                  onClick={() => goToSection(sectionIndex - 1)}
                  type="button"
                >
                  Back
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
