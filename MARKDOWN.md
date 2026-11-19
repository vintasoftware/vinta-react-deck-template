# Markdown slides

Write a slide as a `.md` file instead of a `.tsx` component. The file picks a layout — a
**design-system pattern** by name (`template: SlideAgenda`, see [Patterns](#patterns)) or one of the 50
**classic layouts** by number (`template: 12`) — and its markdown fills that layout's props. Same brand,
same layouts, no JSX.

```md
<!-- src/slides/04-numbers.md -->
---
template: 12
---

# Our year in numbers

Two lines of
supporting copy.

A second
paragraph.

## 200+
Worldwide offices

## 10M
Active users
```

- Put it in `src/slides/` as `NN-name.md`. Markdown and `.tsx` slides are discovered together and
  **ordered by filename**, so you can mix them freely.
- Browse `/patterns` (or `/template` for the classic layouts) to choose a layout, then look it up in the
  tables below (props in `src/components/CATALOG.md` and `src/template/CATALOG.md`).
- A mistake (bad YAML, unknown layout, misspelled key) never breaks the deck: that slide renders as an
  error card naming the file and the problem.

---

## Frontmatter

| Key | Required | Meaning |
|---|---|---|
| `template` | yes | A pattern name (`SlideAgenda`, `agenda`, `slide-agenda` and `Agenda` all work) or a classic layout number `1`–`50` (`19`, `"19"` and `Slide19` all work). |
| `title` | no | Label in the overview grid / HUD. Defaults to the `#` heading. **Not** the slide's title text. |
| `notes` | no | Speaker notes for the presenter window. Usually easier as a closing comment — see [Speaker notes](#speaker-notes). |
| `props` | no | Raw layout props, exactly as in CATALOG.md. They **override** whatever the body produced. |

Any other top-level key is reported as an error — layout props always go under `props:`.

```md
---
template: 39
props:
  fontSize: 28
  language: tsx
---
```

## Body

The body is read as a small, predictable structure:

| Markdown | Becomes |
|---|---|
| a paragraph **above** the `#` heading | the **kicker** (eyebrow) |
| `# Heading` | the **title** |
| a second `# Heading` right after the first | the title's **accent line** (patterns' two-tone titles). In classic layouts it opens a section, as before |
| paragraphs | **body** text. Each line break is kept as a hard break (like `\n` in a prop); a blank line starts a new paragraph |
| first paragraph, in layouts that have a lead/subtitle | the **lead** (the rest is body) |
| `- item` / `1. item` | **list** items (indent a line to continue an item) |
| `- Label: value` | **label/value pairs** (meta, contacts) |
| `## Heading` + text | a **section** → one card / numbered item / stat / person |
| `![alt](img-….png)` on its own line | a **photo** (bare names resolve from `public/assets/`) |
| ```` ```ts ```` fenced block | **code** + its language |
| a `| pipe | table |` | **chart data** |
| `<!-- comment -->` at the **end** of the file | **speaker notes** (see below) |
| any other `<!-- comment -->` | ignored |

Inline formatting (`**bold**`, `*italic*`, `` `code` ``, `[links](…)`) is flattened to plain text — the
layouts style their own text. Anything the body can't express (a gauge's exact `percent`, a custom
chart color) goes under `props:`.

**Section headings and numbers.** In numbered layouts, items are numbered `01`, `02`… automatically;
start a heading with a number (`## 05 Plan`) to set that item's label yourself.

---

## Speaker notes

End the slide with an HTML comment and it becomes the slide's speaker notes, shown only in the
presenter window (press `p`), never on the slide:

```md
---
template: 6
---
# Part two —

the rollout

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

## Patterns

Name any design-system pattern in `template:` (props and limits in `src/components/CATALOG.md`). Every
site-look pattern opens with the same header, read from the body:

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

| Markdown | Header prop |
|---|---|
| paragraph above `#` | `eyebrow` |
| `#` | `title` (line 1, ink) |
| a second `#` right after it | `accent` (line 2, blue / turquoise) |
| first paragraph | `lede` |

Then, per pattern ("lines" are the lines of a section's text and list, in order):

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

**Every other pattern** (`SlideStepPath`, `SlideIconCards`, `SlideCaseStudy`, `SlideClosing`…) takes its content
from `props:` only — and patterns built on icons need a `.tsx` slide, since an icon is a component, not text.
`variant`, `tone`, `background` and other options always go under `props:`. A pattern missing a required
part (no sections, no table…) renders as an error card naming the file, like any other markdown mistake.
Images: a bare `photo.webp` resolves from `public/assets/`; the team photos are `team/<key>.webp`.

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

---

## Per-layout mapping (classic layouts)

Items beyond a layout's slot count are ignored, exactly as with props. Layouts 01–03 and 50 take no content.

| Layout | Body → props |
|---|---|
| 04 cover | `#` → `line1` · first paragraph → `line2` · `- Label: value` → `meta` |
| 05, 07 cover | `#` → `title` · `- Label: value` → `meta` |
| 06 divider | `#` → `line1` · first paragraph → `line2` |
| 08 | `#` → `title` · first `##` → `heading`, its text → `body` · image → `photo` |
| 09, 21, 29, 30 | `#` → `title` · paragraphs → `body` · image → `photo` |
| 10 | `#` → `title` · paragraphs → `intro` · list → `items` (an ordered list gets `01. ` prefixes) |
| 11 | `#` → `title` · first paragraph → `overlayTitle`, rest → `overlayBody` · `##` sections → `features` |
| 12 | `#` → `title` · paragraphs → `body[]` · `## value` + caption → `stats` |
| 13, 22 | `#` → `title` · paragraphs → `body` · `## value` + caption → `stats` |
| 14 | list items (or `##` headings) → numbered `items` |
| 15 | `##` sections → `cards` |
| 16 | `#` → `title` · list → `items` |
| 17 | `#` → `title` · paragraphs → `body` · `##` sections → `cards` |
| 18 | `##` sections → numbered `items` |
| 19 | `#` → `title` · first paragraph → `subtitle`, rest → `body` · `##` sections → numbered `items` |
| 20 | kicker paragraph → `kicker` · `#` → `statement` |
| 23 bar chart | `#` → `title` · paragraphs → `body` · `\| label \| value \|` table or `- label: value` → `data` (a non-numeric value like `$120,000 USD` becomes the bar's label) |
| 24 pie chart | `#` → `title` · table or `- label: value` → `data` (brand colors assigned in order) |
| 25 column chart | `#` → `title` · table: header cells after the first → `series`, rows → `groups` |
| 26 gauges | `## stat` → `stat` (a `%` stat also sets the gauge), first line → `title`, rest → `caption` |
| 27 | `#` → `title` · paragraphs → `body[]` |
| 28 | `#` → `title` · images → `photos` |
| 31 | images → `photos` |
| 32 | `#` → `title` · list → `labels` · image → `graphic` |
| 33 | `#` → `title` · `##` sections → `cards` |
| 34 | `#` → `title` · list → `items` · image → `photo` |
| 35, 36, 37 code | `#` → `title` · code fence → `code` + `language` |
| 38 | as 35 · list → `topics` |
| 39 | as 35 · first paragraph → `subtitle` |
| 40, 41 | as 35 · paragraphs → `body[]` |
| 42 team | `#` → `title` · paragraphs → `body` · `## Name` + role line → `people` |
| 43 team | as 42, plus two more lines per person → `line1`, `line2` |
| 44 team | `#` → `title` · `## Name` + role, line1, line2 → `people` |
| 45, 48 closing | `#` → `title` · `- Label: value` → `contacts` |
| 46 closing | `#` → `title` · list → `contacts` |
| 47 closing | kicker paragraph → `title` (eyebrow) · `#` → `subtitle` (big title) · `- Label: value` → `contacts` |
| 49 closing | `#` → `title` · paragraphs → `body` · first list item → `email` |

## Examples

**Numbered items (19)**
```md
---
template: 19
---
# How we work

**Small teams, short loops.**

We ship weekly and
measure everything.

## Discover
Interview-driven specs.

## Plan
Phased delivery.

## Ship
Stacked branches.
```

**Bar chart (23)**
```md
---
template: 23
---
# Revenue by region
Bars scale to the data.

| Region | Revenue |
|---|---|
| Brazil | $120,000 USD |
| USA | 80000 |
```

**Code (39)**
````md
---
template: 39
---
# Compose functions

Right to left, like math.

```ts
const compose = (...fns) => (x) =>
  fns.reduceRight((v, f) => f(v), x);
```
````

**Closing (47)**
```md
---
template: 47
---
Questions?

# Thank you!

- Email: hello@vinta.com.br
- Site: vinta.com.br
```

---

## How it works

- `src/lib/markdown/parse.ts` — parses frontmatter (YAML) and the body into a generic structure
  (`MdDoc`: kicker, title, accent, paragraphs, list, sections, images, code, table). Exported from `@/lib`.
- `src/template/markdown.tsx` — `MARKDOWN_TEMPLATES`, the classic per-layout mapping table above (each entry is
  type-checked against that layout's props), and `markdownSlide()`, which turns a file into a deck slide.
- `src/components/markdown.tsx` — `PATTERN_TEMPLATES`: every `Slide*` pattern by name, with the body mappers
  of the pattern table above (also type-checked against each pattern's props).
- `src/slides/registry.ts` — globs `NN-*.md` alongside `NN-*.tsx`.

Need something a layout can't do? Write that slide as `.tsx` (see AUTHORING.md).
