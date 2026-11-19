import type { ReactNode } from 'react'
import { SlideShell } from '../SlideShell'
import { VividBackground } from '../../elements/VividBackground'
import { SlideHeader } from '../../elements/SlideHeader'
import { clientLogo, getClient } from '../../elements/Logo'
import styles from './SlideClientsWall.module.css'

export interface SlideClientsWallProps {
  /** Mono label above the title. Default "OUR CLIENTS". */
  eyebrow?: string
  /** Title, line 1 (ink). A title that already wraps words in `<Highlight>` still works. */
  title: ReactNode
  /** Title, line 2 in the accent color (blue on light, turquoise on dark): the site's two-tone title. */
  accent?: ReactNode
  /** One or two sentences under the title. */
  lede?: ReactNode
  /** Client names from the logo catalog (`Logo/clients.ts`, name or alias, case-insensitive),
   *  in display order. 4 per row, up to 12. A name missing from the catalog shows as text. */
  clients: string[]
}

/** Wall of client logos on the night vivid background: glass cards, 4 per row, logos in white.
 *  An incomplete last row is centered. */
export function SlideClientsWall({ eyebrow = 'OUR CLIENTS', title, accent, lede, clients }: SlideClientsWallProps) {
  return (
    <SlideShell mode="invert-navy" safeArea={144} background={<VividBackground variant="night" />}>
      <div className={styles.body}>
        <SlideHeader eyebrow={eyebrow} title={title} accent={accent} lede={lede} mode="invert-navy" />
        <div className={styles.fill}>
          <ul className={styles.wall}>
            {clients.map((name) => {
              const src = clientLogo(name)
              const label = getClient(name)?.name ?? name
              return (
                <li key={name} className={styles.cell}>
                  {src ? <img className={styles.logo} src={src} alt={`${label} logo`} /> : <span className={styles.name}>{label}</span>}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </SlideShell>
  )
}
