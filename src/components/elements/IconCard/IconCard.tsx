import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import type { AccentColor } from '../../shared/types'
import { IconBadge } from '../IconBadge'
import { Tag } from '../Tag'
import styles from './IconCard.module.css'

export type IconCardVariant = 'icon-inline' | 'icon-top'

export interface IconCardProps {
  variant?: IconCardVariant
  icon: LucideIcon
  accent?: AccentColor
  title: ReactNode
  /** Optional — not every card has a description (see the "What we heard" reference) */
  description?: ReactNode
  /** Optional — outline TagGroup/Tag, when the card needs to list topics */
  tags?: string[]
  /** Overrides the default IconBadge size for this variant */
  iconSize?: number
}

const DEFAULT_ICON_SIZE: Record<IconCardVariant, number> = {
  'icon-inline': 48,
  'icon-top': 72,
}

/** White card = IconBadge + title (accent) + optional description + optional
 *  tags (layout.md — "What we heard"). icon-inline = icon beside the
 *  title · icon-top = icon above, title in uppercase DM Mono. */
export function IconCard({
  variant = 'icon-inline',
  icon,
  accent = 'blue',
  title,
  description,
  tags,
  iconSize,
}: IconCardProps) {
  const badge = <IconBadge shape="square" accent={accent} icon={icon} size={iconSize ?? DEFAULT_ICON_SIZE[variant]} />

  return (
    <div className={styles.card} data-variant={variant}>
      <div className={styles.shape} data-mode="light" data-accent={accent}>
        {variant === 'icon-inline' ? (
          <div className={styles.header}>
            {badge}
            <h4 className={styles.title}>{title}</h4>
          </div>
        ) : (
          <>
            {badge}
            <h4 className={styles.title}>{title}</h4>
          </>
        )}

        {description && <p className={styles.description}>{description}</p>}

        {tags && tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map((tag) => (
              <Tag key={tag} variant="outline" mode="light">
                {tag}
              </Tag>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
