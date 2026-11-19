# Markdown slides

Write a slide as a `.md` file instead of a `.tsx` component. The file picks one of the 50 template
layouts and its markdown fills that layout's props — same brand, same pixel-faithful layouts, no JSX.

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
- Browse `/template` to choose a layout, then look it up in the table below (props in `src/template/CATALOG.md`).
- A mistake (bad YAML, unknown layout, misspelled key) never breaks the deck: that slide renders as an
  error card naming the file and the problem.

---

## Frontmatter

| Key | Required | Meaning |
|---|---|---|
| `template` | yes | Layout number `1`–`50` (`19`, `"19"` and `Slide19` all work). |
| `title` | no | Label in the overview grid / HUD. Defaults to the `#` heading. **Not** the slide's title text. |
| `notes` | no | Speaker notes (not rendered). |
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
| paragraphs | **body** text. Each line break is kept as a hard break (like `\n` in a prop); a blank line starts a new paragraph |
| first paragraph, in layouts that have a lead/subtitle | the **lead** (the rest is body) |
| `- item` / `1. item` | **list** items (indent a line to continue an item) |
| `- Label: value` | **label/value pairs** (meta, contacts) |
| `## Heading` + text | a **section** → one card / numbered item / stat / person |
| `![alt](img-….png)` on its own line | a **photo** (bare names resolve from `public/assets/`) |
| ```` ```ts ```` fenced block | **code** + its language |
| a `| pipe | table |` | **chart data** |
| `<!-- comment -->` | ignored |

Inline formatting (`**bold**`, `*italic*`, `` `code` ``, `[links](…)`) is flattened to plain text — the
layouts style their own text. Anything the body can't express (a gauge's exact `percent`, a custom
chart color) goes under `props:`.

**Section headings and numbers.** In numbered layouts, items are numbered `01`, `02`… automatically;
start a heading with a number (`## 05 Plan`) to set that item's label yourself.

---

## Per-layout mapping

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
  (`MdDoc`: kicker, title, paragraphs, list, sections, images, code, table). Exported from `@/lib`.
- `src/template/markdown.tsx` — `MARKDOWN_TEMPLATES`, the per-layout mapping table above (each entry is
  type-checked against that layout's props), and `markdownSlide()`, which turns a file into a deck slide.
- `src/slides/registry.ts` — globs `NN-*.md` alongside `NN-*.tsx`.

Need something a layout can't do? Write that slide as `.tsx` (see AUTHORING.md).
