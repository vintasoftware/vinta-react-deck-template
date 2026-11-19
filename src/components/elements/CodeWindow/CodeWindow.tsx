import { Highlight as PrismHighlight, type PrismTheme } from 'prism-react-renderer'
import styles from './CodeWindow.module.css'

/** Syntax colors on the navy window, all from tokens.css (Tier 1/2). Pending design review: code is the one place a
 *  slide shows several accents at once, because each color encodes a token type. */
const THEME: PrismTheme = {
  plain: { color: 'var(--white)', backgroundColor: 'transparent' },
  styles: [
    { types: ['comment', 'prolog', 'doctype', 'cdata'], style: { color: 'var(--slate-400)', fontStyle: 'italic' } },
    { types: ['punctuation', 'operator'], style: { color: 'var(--blue-100)' } },
    { types: ['keyword', 'atrule', 'selector', 'important'], style: { color: 'var(--vivid-turquoise)' } },
    { types: ['string', 'char', 'attr-value', 'regex', 'inserted', 'url'], style: { color: 'var(--accent-mint)' } },
    { types: ['number', 'boolean', 'constant', 'symbol'], style: { color: 'var(--accent-orange-light)' } },
    { types: ['function', 'method'], style: { color: 'var(--vivid-sky)' } },
    { types: ['class-name', 'tag', 'builtin', 'namespace'], style: { color: 'var(--accent-purple-light)' } },
    { types: ['property', 'attr-name', 'variable'], style: { color: 'var(--vivid-aqua)' } },
    { types: ['deleted'], style: { color: 'var(--accent-rose)' } },
  ],
}

export interface CodeWindowProps {
  /** The source. Leading and trailing blank lines are trimmed; keep lines ≤ ~60 characters (regular, split layout). */
  code: string
  /** Prism language id: `tsx` (default), `ts`, `js`, `jsx`, `python`, `json`, `yaml`, `sql`, `go`, `rust`, `kotlin`,
   *  `swift`, `css`, `markup`, `graphql`, `markdown`. Others (bash…) render as plain text. */
  language?: string
  /** Mono label in the window bar, e.g. a file name ("src/intake.ts"). Defaults to the language. */
  filename?: string
  /** regular = DM Mono 24/30 · compact = 18/26, for longer snippets. */
  density?: 'regular' | 'compact'
  /** Background the window sits on: `light` adds the card shadow; `dark` (mesh/night) draws a hairline border instead. */
  surface?: 'light' | 'dark'
}

/** A syntax-highlighted code window in the site look: navy card, mono file label, DM Mono code.
 *  As wide as its parent and as tall as the code, up to the parent's height; long lines wrap. */
export function CodeWindow({ code, language = 'tsx', filename, density = 'regular', surface = 'light' }: CodeWindowProps) {
  return (
    <div className={styles.window} data-surface={surface} data-density={density}>
      <div className={styles.bar}>
        <span className={styles.filename}>{filename ?? language}</span>
        {filename && <span className={styles.language}>{language}</span>}
      </div>
      <PrismHighlight code={code.replace(/^\n+|\s+$/g, '')} language={language} theme={THEME}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre className={styles.code}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </PrismHighlight>
    </div>
  )
}
