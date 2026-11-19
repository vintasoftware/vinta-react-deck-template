import type { ReactNode } from 'react'
import { Mail, Phone, CalendarDays } from 'lucide-react'
import { SlideShell } from '../SlideShell'
import { VividBackground } from '../../elements/VividBackground'
import { SlideHeader } from '../../elements/SlideHeader'
import { Eyebrow } from '../../elements/Eyebrow'
import { Body } from '../../elements/Body'
import { PhotoSlot } from '../../elements/PhotoSlot'
import { IconBadge } from '../../elements/IconBadge'
import styles from './SlideBookCall.module.css'

export interface BookCallContact {
  /** ≤ ~22 characters. */
  name: string
  /** ≤ ~28 characters. */
  role: string
  email?: string
  phone?: string
  /** Booking link shown as text, e.g. "vinta.studio/book". */
  link?: string
  /** Portrait at the top of the card (cropped to 464×300). Leave out to drop the photo. */
  photo?: string
  /** CSS object-position for the portrait, e.g. "50% 30%". */
  photoPosition?: string
}

export interface SlideBookCallProps {
  /** Mono label above the title. Default "BOOK A CALL". */
  eyebrow?: string
  /** Title, line 1 (white). ≤ ~22 characters per line. */
  title: ReactNode
  /** Title, line 2 in turquoise. */
  accent?: ReactNode
  /** One or two sentences, ≤ ~120 characters. */
  text?: ReactNode
  /** Email shown under the text, underlined. */
  email?: string
  /** Words before the email. Default "Prefer email? Write to". */
  emailLabel?: string
  /** Round portraits at the bottom of the band (2–5). Default: four studio portraits of the team. */
  avatars?: string[]
  /** The person to talk to, shown in the white card at the right. */
  contact?: BookCallContact
  /** Replaces the whole content of the white card (QR code, calendar screenshot…). Wins over `contact`. */
  card?: ReactNode
}

const DEFAULT_AVATARS = [
  '/assets/team/team-1.webp',
  '/assets/team/team-3.webp',
  '/assets/team/teamph-2.webp',
  '/assets/team/team-2.webp',
]

function ContactBlock({ contact }: { contact: BookCallContact }) {
  const rows = [
    contact.email && { icon: Mail, text: contact.email },
    contact.phone && { icon: Phone, text: contact.phone },
    contact.link && { icon: CalendarDays, text: contact.link },
  ].filter(Boolean) as { icon: typeof Mail; text: string }[]
  return (
    <div className={styles.contact} data-photo={contact.photo ? 'true' : 'false'}>
      <Eyebrow size="md" tick={false}>
        YOUR CONTACT
      </Eyebrow>
      {contact.photo && (
        <div className={styles.portrait}>
          <PhotoSlot src={contact.photo} alt={contact.name} width="100%" height={300} radius="md" position={contact.photoPosition} />
        </div>
      )}
      <div className={styles.person}>
        <Body tone="primary" ink="vivid">
          {contact.name}
        </Body>
        <Body weight="regular">{contact.role}</Body>
      </div>
      {rows.length > 0 && (
        <ul className={styles.rows}>
          {rows.map((r) => (
            <li key={r.text} className={styles.row}>
              <IconBadge variant="white" shape="square" accent="blue" icon={r.icon} size={56} />
              <Body tone="primary" ink="vivid" weight="regular">
                {r.text}
              </Body>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

/** Closing slide in the site's booking style: a big rounded blue band with eyebrow, two-tone title, text,
 *  an email line and the team's portraits; a white card at the right with the contact (or any slot). */
export function SlideBookCall({
  eyebrow = 'BOOK A CALL',
  title,
  accent,
  text,
  email,
  emailLabel = 'Prefer email? Write to',
  avatars = DEFAULT_AVATARS,
  contact,
  card,
}: SlideBookCallProps) {
  const cardContent = card ?? (contact ? <ContactBlock contact={contact} /> : <PhotoSlot width="100%" height="100%" radius="md" />)
  return (
    <SlideShell mode="light" safeArea={144} background={<VividBackground variant="wash" />}>
      <div className={styles.body}>
        <div className={styles.band}>
          <VividBackground variant="mesh" />
          <div className={styles.bandContent}>
            <div className={styles.copy}>
              <SlideHeader eyebrow={eyebrow} title={title} accent={accent} lede={text} mode="invert-blue" />
              {email && (
                <Body mode="invert-blue" weight="regular">
                  {emailLabel} <span className={styles.email}>{email}</span>.
                </Body>
              )}
            </div>
            <div className={styles.footer}>
              <div className={styles.avatars}>
                {avatars.map((src) => (
                  <span key={src} className={styles.avatar}>
                    <PhotoSlot src={src} width={112} height={112} radius="circle" position="50% 25%" />
                  </span>
                ))}
              </div>
              <img className={styles.wordmark} src="/assets/shared/vinta-wordmark-white.svg" alt="Vinta" />
            </div>
          </div>
        </div>
        <div className={styles.card}>{cardContent}</div>
      </div>
    </SlideShell>
  )
}
