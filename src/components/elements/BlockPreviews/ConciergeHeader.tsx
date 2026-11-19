import { IMAGES, TallgroveMark, TallgroveName } from './shared'
import { CONCIERGE_COPY } from './concierge.data'

/** Card header (Tallgrove brand, "Care team online" and the patient). */
export function ConciergeHeader() {
  return (
    <header className="homepage-bb-tc-bar">
      <span className="homepage-bb-tl-brand">
        <TallgroveMark />
        <span className="homepage-bb-tc-identity">
          <TallgroveName />
          <span className="homepage-bb-tc-role">
            <span className="homepage-bb-concierge-presence" aria-hidden />
            {CONCIERGE_COPY.presence}
          </span>
        </span>
      </span>
      <span className="homepage-bb-tc-patient">
        <span>
          <span className="homepage-bb-tc-patient-name">{CONCIERGE_COPY.patientName}</span>
          <span className="homepage-bb-tc-patient-meta">{CONCIERGE_COPY.patientMeta}</span>
        </span>
        <img decoding="async" height={160} width={160} alt="" className="homepage-bb-tc-patient-photo" src={IMAGES.patientAva} />
      </span>
    </header>
  )
}
