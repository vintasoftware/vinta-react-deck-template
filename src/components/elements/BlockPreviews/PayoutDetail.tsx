import type { Ref } from 'react'
import { MockIcon, dataIf } from './shared'
import { STATUS_LABEL, VISIT_TYPES, amountOwed, currencyFull, type PayoutStatus, type Provider } from './payouts.data'

export interface PayoutDetailProps {
  /** Clinician shown. */
  provider: Provider
  /** Current payment status of this clinician. */
  status: PayoutStatus
  /** Touch layout: shows "← Payouts" at the top. */
  touchLayout?: boolean
  /** Id of the element "tapped" by the tour. */
  tapped?: string | null
  /** Click on Approve. */
  onApprove?: (id: string) => void
  /** Ref of the scrollable container (the touch tour scrolls this screen). */
  scrollRef?: Ref<HTMLElement>
}

const CheckMark = () => (
  <span className="homepage-bb-po-check" aria-hidden>
    <MockIcon name="check" size={10} />
  </span>
)

/** Side panel with the payment detail: lines per visit type, total, checks and audit trail. */
export function PayoutDetail({ provider, status, touchLayout = false, tapped = null, onApprove, scrollRef }: PayoutDetailProps) {
  const adjustment = provider.adjustment
  const approveLabel = provider.allSigned ? (adjustment ? 'Approve with adjustment' : 'Approve payout') : 'Approve, hold 1 visit'
  return (
    <aside className="homepage-bb-po-detail" aria-label={`${provider.name} payout`} ref={scrollRef}>
      {touchLayout ? (
        <p className="homepage-bb-po-back" aria-hidden>
          <MockIcon name="arrow-right" size={12} />
          Payouts
        </p>
      ) : null}
      <div className="homepage-bb-po-detail-head">
        <img decoding="async" height={160} width={160} alt="" className="homepage-bb-po-avatar homepage-bb-po-avatar--lg" src={provider.photo} />
        <span className="homepage-bb-po-who">
          <span className="homepage-bb-po-detail-name">{provider.name}</span>
          <span className="homepage-bb-po-detail-meta">
            <span className="homepage-bb-po-specialty">{provider.specialty}</span>
            <span className="homepage-bb-po-status" data-status={status}>
              {STATUS_LABEL[status]}
            </span>
          </span>
        </span>
      </div>
      <ul className="homepage-bb-po-lines" aria-label="Earnings by visit type">
        {VISIT_TYPES.filter((type) => provider.visits[type.key] > 0).map((type) => (
          <li key={type.key}>
            <span>{type.label}</span>
            <span className="homepage-bb-po-rate">
              {provider.visits[type.key]} × {currencyFull.format(type.rate)}
            </span>
            <span>{currencyFull.format(provider.visits[type.key] * type.rate)}</span>
          </li>
        ))}
        {adjustment ? (
          <li data-adjustment={adjustment.amount > 0 ? 'credit' : 'hold'}>
            <span>{adjustment.label}</span>
            <span className="homepage-bb-po-rate">Adjustment · {adjustment.when}</span>
            <span>
              {adjustment.amount > 0 ? '+' : '−'}
              {currencyFull.format(Math.abs(adjustment.amount))}
            </span>
          </li>
        ) : null}
      </ul>
      <p className="homepage-bb-po-total">
        <span>Total</span>
        <span>{currencyFull.format(amountOwed(provider))}</span>
      </p>
      <ul className="homepage-bb-po-checks" aria-label="Checks">
        <li data-ok={provider.allSigned || undefined}>
          <span className="homepage-bb-po-check" aria-hidden>
            {provider.allSigned ? <MockIcon name="check" size={10} /> : '!'}
          </span>
          {provider.allSigned ? 'Every visit signed and coded' : '1 visit waiting on its note'}
        </li>
        <li data-ok>
          <CheckMark />
          Rates match the 2026 contract
        </li>
        <li data-ok>
          <CheckMark />
          Bank details verified
        </li>
      </ul>
      {status === 'approved' ? (
        <ol className="homepage-bb-po-track" aria-label="Payout status">
          <li data-done>
            <CheckMark />
            Approved
          </li>
          <li>
            <span className="homepage-bb-po-check" aria-hidden />
            In Friday’s pay run · 2:00 PM
          </li>
          <li>
            <span className="homepage-bb-po-check" aria-hidden />
            Arrives Mon 21 · Direct deposit
          </li>
        </ol>
      ) : (
        <button
          className="homepage-bb-tl-cta homepage-bb-po-approve"
          data-tapped={dataIf(tapped, 'approve')}
          onClick={() => onApprove?.(provider.id)}
          type="button"
        >
          {approveLabel}
        </button>
      )}
    </aside>
  )
}
