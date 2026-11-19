import styles from './TagCard.module.css'

/** Each theme is a Figma card: solid blue · soft lilac · solid indigo */
export type TagCardTone = 'blue' | 'lilac' | 'indigo'

export interface TagCardProps {
  label: string
  tags: string[]
  tone?: TagCardTone
}

/** Colored card with a dot + uppercase label and pills
 *  (Scope review: Must-have / Nice-to-have / Integrations). Measurements from
 *  Figma, already at the slide's final scale (original frame at 0.65). */
export function TagCard({ label, tags, tone = 'blue' }: TagCardProps) {
  return (
    <section className={styles.card} data-tone={tone}>
      <header className={styles.header}>
        <span className={styles.dot} aria-hidden="true" />
        <h4 className={styles.label}>{label}</h4>
      </header>
      <ul className={styles.tags}>
        {tags.map((tag) => (
          <li key={tag} className={styles.pill}>
            {tag}
          </li>
        ))}
      </ul>
    </section>
  )
}
