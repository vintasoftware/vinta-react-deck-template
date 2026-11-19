import { VISIT_TYPES, currencyFull, type VisitType } from './payouts.data'

export interface RateCardProps {
  /** Rates per visit type. Default: the mock's 2026 rate card. */
  rates?: readonly VisitType[]
}

/** "2026 rate card" card from the Contracts screen. */
export function RateCard({ rates = VISIT_TYPES }: RateCardProps) {
  return (
    <section className="homepage-bb-po-ratecard" aria-label="2026 rate card">
      <p className="homepage-bb-po-subhead">2026 rate card</p>
      <ul className="homepage-bb-po-lines">
        {rates.map((type) => (
          <li key={type.key}>
            <span>{type.label}</span>
            <span className="homepage-bb-po-rate">Per signed visit</span>
            <span>{currencyFull.format(type.rate)}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
