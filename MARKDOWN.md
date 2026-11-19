# Markdown slides

Write a slide as a `.md` file instead of a `.tsx` component. The file names a pattern
(`template: SlideAgenda`) and its markdown fills that pattern's props. Same brand, same patterns, no JSX.

```md
<!-- src/slides/04-numbers.md -->
---
template: SlideBigStat
props:
  tone: invert-navy
---
RESULTS

# What changed
# in 90 days

## 42%
Faster intake

## 3x
More visits
```

- Put it in `src/slides/` as `NN-name.md`. Markdown and `.tsx` slides are discovered together and
  **ordered by filename**, so you can mix them freely.
- Browse `/patterns` to choose a pattern, then look it up in the [table below](#per-pattern-mapping) (props and
  limits in `src/components/CATALOG.md`).
- A mistake (bad YAML, unknown pattern, misspelled key, a pattern missing a required part) never breaks the deck:
  that slide renders as an error card naming the file and the problem.

---

## Frontmatter

| Key | Required | Meaning |
|---|---|---|
| `template` | yes | A pattern name: `SlideAgenda`, `agenda`, `slide-agenda` and `Agenda` all work. |
| `title` | no | Label in the overview grid / HUD. Defaults to the `#` heading. **Not** the slide's title text. |
| `notes` | no | Speaker notes for the presenter window. Usually easier as a closing comment — see [Speaker notes](#speaker-notes). |
| `props` | no | Raw pattern props, exactly as in the pattern's `.tsx`. They **override** whatever the body produced. |

Any other top-level key is reported as an error — pattern props always go under `props:`.

```md
---
template: SlideCode
props:
  filename: src/intake.ts
  density: compact
---
```

## Body

The body is read as a small, predictable structure:

| Markdown | Becomes |
|---|---|
| a paragraph **above** the `#` heading | the **eyebrow** |
| `# Heading` | the **title** (line 1) |
| a second `# Heading` right after the first | the title's **accent line** (line 2, blue / turquoise) |
| first paragraph | the **lede** (later paragraphs are body text, in patterns that have it) |
| paragraphs | text. Each line break is kept as a hard break; a blank line starts a new paragraph |
| `- item` / `1. item` | **list** items (indent a line to continue an item) |
| `- Label: value` | **label/value pairs** (chart data) |
| `## Heading` + text | a **section** → one item / card / stat / person / question |
| `![alt](team/two-column.webp)` on its own line | a **photo** (bare names resolve from `public/assets/`) |
| ```` ```ts ```` fenced block | **code** + its language |
| a `| pipe | table |` | **table / chart data** |
| `<!-- comment -->` at the **end** of the file | **speaker notes** (see below) |
| any other `<!-- comment -->` | ignored |

Inline formatting (`**bold**`, `*italic*`, `` `code` ``, `[links](…)`) is flattened to plain text — the
patterns style their own text. Anything the body can't express (`tone`, `variant`, a highlighted index) goes
under `props:`.

---

## Speaker notes

End the slide with an HTML comment and it becomes the slide's speaker notes, shown only in the
presenter window (press `p`), never on the slide:

```md
---
template: SlideStatement
---
# Part two —
# the rollout

<!--
Pause here. Ask who has shipped with feature flags before.
Then: three phases, one PR each.
-->
```

- Only comments **after all the content** count; a comment followed by more content is just an author
  comment (handy for commenting out a block). Several closing comments are joined with a blank line.
- Notes read like markdown prose: wrapped lines join into one paragraph; blank lines, list items
  (`-`, `1.`) and explicit breaks (two trailing spaces or a trailing `\`) stay as line breaks.
  Other markdown is shown as written.
- Frontmatter `notes:` works too; if both are present, the frontmatter notes come first.

---

## Per-pattern mapping

Every pattern reads the header above (eyebrow, title, accent, lede); then ("lines" are the lines of a section's
text and list, in order):

| Pattern | Body → props |
|---|---|
| `SlideCover` | list → `tags` · image → `photo` (and `variant: split`) |
| `SlideStatement` | paragraphs after the lede → `text` |
| `SlideAgenda` | `## title` + lines `detail`, `meta` → `items` (or a plain list → item titles) · image → `photo` |
| `SlideContent` | list → `bullets` · image → `photo` |
| `SlideTwoColumn` | paragraphs after the lede → `body` · list → `bullets` · image → `photo` |
| `SlideQuote` | first paragraph → `quote` · second paragraph's lines → `author`, `role` · image → `photo` |
| `SlideBigStat` | `## value` + text → `stats` (`label`) · image → `photo` |
| `SlideFaq` | `## question` + text → `items` (`answer`) |
| `SlideNumberedList` | `## title` + text → `items` |
| `SlideNumberedGrid` | `## title` + list → `cards` (`bullets`) |
| `SlideStatRows` | `## value` + lines `title`, `text…` → `rows` |
| `SlideVersus` | first `##` + list → `left`, second → `right` |
| `SlideComparison` | table: header row → `columns` (first cell → `labelHeader`), rows → `rows` (`✓`/`yes` = check, `—`/`no` = dash) · paragraphs after the lede → `note` |
| `SlideDataTable` | table: header → `columns`, rows → `rows` |
| `SlideTeam` | `## name` + lines `role`, `bio…` (+ an image → `src`) → `people` |
| `SlideRankingBars` | `\| label \| value \|` table or `- label: value` → `rows` (a value like `28% · 10` keeps its text) |
| `SlideDonutChart` | table or `- label: value` → `segments` · a list next to a table → `takeaways` |
| `SlideProgressRings` | `## 92%` + lines `label`, `description…` → `rings` |
| `SlideHeroNumber` | first `##` → `value` (`## 37 → 17` also sets `previous`), its text → `caption` · list → `points` |
| `SlideFunnel` | `## label` + lines `value`, `description…` → `stages` |
| `SlideBarChart` | table: header cells after the first → bar labels, each row → a group |
| `SlideLineChart` | table: first column → `labels`, second → `primary`, third (optional) → `reference` |
| `SlideCode` | the first fenced block → `code`, its tag → `language` (`filename`, `density`, `layout` under `props:`) |

**Every other pattern** (`SlideStepPath`, `SlideIconCards`, `SlideCaseStudy`, `SlideClosing`…) takes its content
from `props:` only — and patterns built on icons need a `.tsx` slide, since an icon is a component, not text.
Images: a bare `photo.webp` resolves from `public/assets/`; the team photos are `team/<key>.webp`.

## Examples

**Agenda**
```md
---
template: SlideAgenda
---
NORTHWIND HEALTH · KICKOFF

# Today's
# agenda

What we'll cover in the next hour.

## Where we are today
The product, the team and the constraints
10 MIN

## What we heard from you
Goals, risks and open questions
15 MIN
```

**One number that matters**
```md
---
template: SlideHeroNumber
props:
  background: night
---
# Less, but
# better

## 37 → 17
articles published, 2025 vs 2026 so far

- Two editors instead of five
- Every piece reviewed by a clinician
```

**Code**
````md
---
template: SlideCode
props:
  filename: src/compose.ts
---
# Compose
# functions

Right to left, like math.

```ts
const compose = (...fns) => (x) =>
  fns.reduceRight((v, f) => f(v), x);
```
````

**Bar chart**
```md
---
template: SlideBarChart
---
# Revenue
# by quarter

| Year | Q1 | Q2 | Q3 |
|---|---|---|---|
| 2025 | 10 | 12 | 15 |
| 2026 | 14 | 18 | 21 |
```

---

## How it works

- `src/lib/markdown/parse.ts` — parses frontmatter (YAML) and the body into a generic structure
  (`MdDoc`: kicker, title, accent, paragraphs, list, sections, images, code, table). Exported from `@/lib`.
- `src/components/markdown.tsx` — `PATTERN_TEMPLATES`: every `Slide*` pattern by name, with the body mappers
  of the table above (each type-checked against its pattern's props).
- `src/components/markdownSlide.tsx` — `markdownSlide()`, which turns a file into a deck slide (and the error card).
- `src/slides/registry.ts` — globs `NN-*.md` alongside `NN-*.tsx`.

Need something a pattern can't do from markdown? Write that slide as `.tsx` (see AUTHORING.md).
