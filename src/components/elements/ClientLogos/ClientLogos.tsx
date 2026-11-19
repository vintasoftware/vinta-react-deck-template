import { CLIENTS, type ClientEntry, type ClientLogoTone } from '../Logo/clients'
import styles from './ClientLogos.module.css'

const TONE_LABEL: Record<ClientLogoTone, string> = { muted: 'Muted #657ca1', color: 'Brand color', ink: 'Ink #172235', white: 'White (dark backgrounds)' }

function Card({ client }: { client: ClientEntry }) {
  return (
    <article className={styles.card}>
      <header className={styles.head}>
        <h3 className={styles.name}>{client.name}</h3>
        {client.aka && <p className={styles.aka}>also: {client.aka.join(', ')}</p>}
      </header>
      <div className={styles.logos}>
        {client.logos.map((logo) => (
          <figure key={logo.src} className={styles.logo} data-tone={logo.tone}>
            <div className={styles.swatch}>
              <img src={logo.src} alt={`${client.name} logo`} />
            </div>
            <figcaption>
              {TONE_LABEL[logo.tone]}
              {logo.variant ? ` · ${logo.variant}` : ''}
              <code>{logo.src.split('/').pop()}</code>
            </figcaption>
          </figure>
        ))}
      </div>
      <footer className={styles.foot}>
        {client.caseUrl ? (
          <a href={client.caseUrl} target="_blank" rel="noreferrer">
            {client.caseTitle ?? 'Case study'} →
          </a>
        ) : (
          <span className={styles.none}>No case page on the site</span>
        )}
        {client.note && <p className={styles.note}>{client.note}</p>}
      </footer>
    </article>
  )
}

/** Catalog of client logos by name, each with the link to its case page. Source: the website.vinta.studio home. */
export function ClientLogos() {
  return (
    <div className={styles.grid}>
      {CLIENTS.map((client) => (
        <Card key={client.name} client={client} />
      ))}
    </div>
  )
}
