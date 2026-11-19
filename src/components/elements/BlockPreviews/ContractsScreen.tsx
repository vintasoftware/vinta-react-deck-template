import type { Ref } from 'react'
import { PROVIDERS, contractStatusLabel, type Provider } from './payouts.data'
import { RateCard } from './RateCard'

export interface ContractsScreenProps {
  /** Listed clinicians. Default: the mock's. */
  providers?: readonly Provider[]
  /** Ref of the scrollable container (the touch tour scrolls this screen). */
  scrollRef?: Ref<HTMLDivElement>
}

/** "Contracts" screen: summary, rate card and contracts table. */
export function ContractsScreen({ providers = PROVIDERS, scrollRef }: ContractsScreenProps) {
  const employed = providers.filter((p) => p.contract.kind === 'Employed')
  const renewingSoon = providers.filter((p) => p.contract.soon)
  return (
    <div className="homepage-bb-po-main homepage-bb-po-contracts" aria-label="Contracts" ref={scrollRef} role="region">
      <div className="homepage-bb-po-head">
        <div>
          <p className="homepage-bb-tl-kicker">Agreements · 2026</p>
          <h3 className="homepage-bb-po-title">Contracts</h3>
        </div>
      </div>
      <dl className="homepage-bb-po-stats">
        <div>
          <dt>Active</dt>
          <dd>{providers.length}</dd>
        </div>
        <div>
          <dt>Employed</dt>
          <dd>{employed.length}</dd>
        </div>
        <div>
          <dt>Contractors</dt>
          <dd>{providers.length - employed.length}</dd>
        </div>
        <div data-attention={renewingSoon.length > 0 || undefined}>
          <dt>Renewing soon</dt>
          <dd>{renewingSoon.length}</dd>
        </div>
      </dl>
      <RateCard />
      <table className="homepage-bb-po-table homepage-bb-po-table--contracts">
        <thead>
          <tr>
            <th scope="col">Clinician</th>
            <th scope="col">Renews</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {providers.map((provider) => (
            <tr key={provider.id}>
              <th scope="row">
                <span className="homepage-bb-po-row">
                  <img decoding="async" height={160} width={160} alt="" className="homepage-bb-po-avatar" src={provider.photo} />
                  <span className="homepage-bb-po-who">
                    <span className="homepage-bb-po-name">{provider.name}</span>
                    <span className="homepage-bb-po-specialty">{provider.contract.kind}</span>
                  </span>
                </span>
              </th>
              <td>{provider.contract.renews}</td>
              <td>
                <span className="homepage-bb-po-status" data-status={provider.contract.soon ? 'review' : 'approved'}>
                  {contractStatusLabel(provider)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

