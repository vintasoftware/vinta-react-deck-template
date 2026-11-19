import type { Ref } from 'react'
import { dataIf } from './shared'
import {
  PROVIDERS,
  STATUS_LABEL,
  amountOwed,
  currencyFull,
  currencyWhole,
  visitCount,
  type PayoutStatus,
  type Provider,
} from './payouts.data'

export interface PayRunScreenProps {
  /** Clinicians in the list. Default: the mock's. */
  providers?: readonly Provider[]
  /** Current status of each clinician (id → status). */
  statuses: Record<string, PayoutStatus>
  /** Selected clinician (highlighted row). */
  selectedId: string
  /** Id of the element "tapped" by the tour (shows the tap ring). */
  tapped?: string | null
  /** Click on a row. */
  onSelect?: (id: string) => void
  /** Click on "Approve all ready". */
  onApproveReady?: (ids: string[]) => void
  /** Ref of the scrollable container (the tour scrolls this screen). */
  scrollRef?: Ref<HTMLDivElement>
}

/** "Payouts" screen: period, 4 numbers, bulk approval button and clinicians table. */
export function PayRunScreen({
  providers = PROVIDERS,
  statuses,
  selectedId,
  tapped = null,
  onSelect,
  onApproveReady,
  scrollRef,
}: PayRunScreenProps) {
  const ready = providers.filter((p) => statuses[p.id] === 'ready')
  const approved = providers.filter((p) => statuses[p.id] === 'approved')
  const review = providers.filter((p) => statuses[p.id] === 'review')
  const toPay = providers.reduce((sum, p) => sum + amountOwed(p), 0)
  const signedVisits = providers.reduce((sum, p) => sum + visitCount(p), 0)

  return (
    <div className="homepage-bb-po-main" ref={scrollRef}>
      <div className="homepage-bb-po-head">
        <div>
          <p className="homepage-bb-tl-kicker">Pay period · Sep 14–20</p>
          <h3 className="homepage-bb-po-title">Provider payouts</h3>
        </div>
        <button
          className="homepage-bb-po-action"
          data-tapped={dataIf(tapped, 'approve-ready')}
          disabled={ready.length === 0}
          onClick={() => onApproveReady?.(ready.map((p) => p.id))}
          type="button"
        >
          {ready.length > 0 ? `Approve all ready (${ready.length})` : 'All ready approved'}
        </button>
      </div>
      <dl className="homepage-bb-po-stats">
        <div>
          <dt>To pay</dt>
          <dd>{currencyWhole.format(toPay)}</dd>
        </div>
        <div>
          <dt>Signed visits</dt>
          <dd>{signedVisits}</dd>
        </div>
        <div>
          <dt>Approved</dt>
          <dd>
            {approved.length} of {providers.length}
          </dd>
        </div>
        <div data-attention={review.length > 0 || undefined}>
          <dt>Needs review</dt>
          <dd>{review.length}</dd>
        </div>
      </dl>
      <table className="homepage-bb-po-table homepage-bb-po-table--payouts">
        <thead>
          <tr>
            <th scope="col">Clinician</th>
            <th scope="col">Visits</th>
            <th scope="col">Amount</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {providers.map((provider) => (
            <tr key={provider.id} data-selected={provider.id === selectedId || undefined}>
              <th scope="row">
                <button
                  aria-pressed={provider.id === selectedId}
                  className="homepage-bb-po-row"
                  data-tapped={dataIf(tapped, provider.id)}
                  onClick={() => onSelect?.(provider.id)}
                  type="button"
                >
                  <img decoding="async" height={160} width={160} alt="" className="homepage-bb-po-avatar" src={provider.photo} />
                  <span className="homepage-bb-po-who">
                    <span className="homepage-bb-po-name">{provider.name}</span>
                    <span className="homepage-bb-po-specialty">{provider.specialty}</span>
                  </span>
                </button>
              </th>
              <td>{visitCount(provider)}</td>
              <td>{currencyFull.format(amountOwed(provider))}</td>
              <td>
                <span className="homepage-bb-po-status" data-status={statuses[provider.id]}>
                  {STATUS_LABEL[statuses[provider.id]]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
