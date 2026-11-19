---
name: create-deck
description: >-
  Build or extend a Vinta deck (sales, planning, partnership, internal) with this
  repo's design-system patterns, then deliver it as a Claude artifact. Use whenever
  the user wants a new presentation, proposal, deck or slides, to add or change
  slides, or to turn notes/outline/content into on-brand Vinta slides.
---

# Create a Vinta deck

The deck is built from the **design-system patterns** in `src/components/` (`@/components`): ~70 whole-slide
patterns in the Vinta site look. **Read `src/components/CATALOG.md` before starting** — the rules that never
change, the pattern catalog with props and limits, the elements, and the content/asset limits. Do not invent color,
font, size or icon; if no pattern fits, say so instead of creating a style. Write code and docs in English; slide copy
in whatever language the user asks for (ask if the brief doesn't say — Portuguese runs longer, so recheck limits).
(Workflow ported from vinta-slidedeck's new-deck skill.)

**One repository per deck.** Each deck is its own copy of the template repository
`vintasoftware/vinta-react-deck-template` (GitHub's "Use this template"; a workflow renames the copy on its first
push). The deck's slides are files in `src/slides/` (`.tsx` or `.md`) — never Storybook stories. Storybook, the
template gallery, `/patterns` and `/samples` are references to pick patterns from. If the git remote is the template
repository itself, don't build a client deck there: ask the user to create a repository from the template first
(unless they say they are only trying things out or improving the template).

| Where | What | Folder |
|---|---|---|
| `/` (`npm run dev`, :5173) | **The user's deck** — author here | `src/slides/` |
| `/patterns` | Every pattern, one slide per example | `src/components/patterns/` |
| `/samples` | Sample presentations with fictional data | `src/samples/` |
| `npm run gallery` (:6007) | Template gallery for non-technical users: templates by use, limits, samples, the deck | `scripts/gallery*.mjs` |
| `npm run storybook` (:6006) | Every pattern and element with props (*Docs* tab), foundations | `.storybook/` |

`npm install` once, then `npm run dev` (→ http://localhost:5173).

## Working style: ask early, write less

- **Move with what you have.** Reuse patterns, the samples' structure and the client logos in
  `src/components/elements/Logo/clients.ts`; fill gaps with **clearly fictitious** placeholders instead of blocking.
- **Ask only questions whose answers change the work**, before writing, in **one** round, with options and a
  recommended default. Skip what you can infer.
- **Confirm cheaply before building:** propose the outline and get an OK; then fix only what fails, never
  regenerate whole slides or decks.
- **Short status updates**; no recaps of what the user already said; no new docs or files nobody asked for.

## 1. Gather the brief (only what's missing)

- Client and industry; who will be watching; goal (proposal, results, kickoff, planning…).
- Deck language.
- Which sections. If the user doesn't say, propose the typical sequence (CATALOG.md): Cover → Agenda → Who we are
  → What we heard → Why us → Approach / phases → Investment → Case → FAQ → Book a call.
- Real content: copy, numbers, prices, phase names, contact. Whatever is missing becomes a clearly fictitious example.
- Images: client logo, photos, screenshots — ask for the files; without them, use the patterns' placeholders.
- Real patient data (PHI) never goes in.

## 2. Pick the patterns and propose the outline

Use the CATALOG.md tables (and the gallery for a visual pick, if the user wants to see options); prefer the
site-look, vivid and generic patterns for new content; use the Figma
"Classic" screens only when the user asks for the original approved screens (fixed number of items). Code goes in
`SlideCode`. Write titles two-tone: `title` (line 1) + `accent` (line 2). Respect the text and item limits.

Show the outline (one line per slide: number, pattern, gist) and get an OK before writing slides. If the user already
gave a full sequence and content, skip the confirmation and build.

## 3. Build the slides

One file per slide in `src/slides/` (two-digit prefix = order; auto-discovered). Remove the starter slides
(`01-cover`…`05-thanks`) or rewrite them for the deck.

```tsx
// src/slides/04-results.tsx
import { SlideBigStat } from "@/components";

export const meta = { title: "Results", notes: "Pause on the 42%." };

export default function Results() {
  return (
    <SlideBigStat
      tone="invert-navy"
      eyebrow="RESULTS"
      title="What changed"
      accent="in 90 days"
      stats={[{ value: "42%", label: "Faster intake" }, { value: "3x", label: "More visits" }]}
    />
  );
}
```

- Copy props from the pattern's examples in `patterns/<Name>/<Name>.stories.tsx`; types and JSDoc in `<Name>.tsx`.
- **Markdown** for plain content slides: `src/slides/NN-name.md` with `template: SlideBigStat` — paragraph above `#` =
  eyebrow, `#` title, second `#` = accent, `##` sections = items, tables = data, closing comment = notes, `props:`
  for the rest. Mapping per pattern in **MARKDOWN.md**. Use `.tsx` for icons, logic or bespoke slides.
- **Speaker notes** in `meta.notes` (or the closing comment): shown only in the presenter window (`p`).
- **Client images** in `public/assets/clients/<client>/`, passed as `/assets/clients/<client>/file.webp`.
- **Team photos** (`/assets/team/<key>.webp`) are real Vinta people: team slides only, never next to a client's
  name (quotes, cases) — see CATALOG.md.
- **Bespoke slide** only when the user agrees no pattern fits: elements inside `<SlideShell>` with `SlideHeader`,
  tokens only (AUTHORING.md). Never per-deck CSS; a missing capability is a gap to report.

## 4. Verify

1. `npx tsc -b` clean.
2. Look at every slide at native size: `http://localhost:5173/?shot=N` (or `?print` for all). Check text cut off
   or overflowing its box, dead space, wrong logo, color outside the palette, leftover starter or SAMPLE text.
3. Fix and repeat only what failed.

## 5. Deliver

- **Share as a link (default):** follow the **publish-deck** skill — `npm run build-deck -- --shots --name "<Deck>"`,
  scan `text.txt`, check the previews, ask for the OK, publish the artifact and hand over the link. Later changes:
  edit the slides and run publish-deck again; it republishes to the same link.
- **Present live:** `npm run dev`, open `/`, `f` for fullscreen, `p` for the presenter window.
- **PDF / PowerPoint:** `npm run export` (editable PPTX, selectable PDF) into `export/`.
- **An animation as a video** (e.g. the building-blocks map for an email or Google Slides):
  `npm run render-clip -- <story-id> --out <name>` with Storybook running records a looping MP4 + cover PNG in
  `output/exports/clips/` (`--transparent` for a WebM with alpha, `--selector` for one element; needs `ffmpeg`).
  Story ids are in Storybook's URL (`?path=/story/<id>`), e.g. `patterns-slidebuildingblocks--animated`.
- Tell the user what is still a fictitious placeholder and what depends on them (logos, photos, numbers).
- Do not run git or push without an explicit request.

## 6. Offer an anonymized sample

When the user is done (deck published, or they say it's finished), ask once whether they'd like to contribute an
anonymized version to the sample presentations. No → stop. Yes (this is the explicit request git needs) →
the sample goes to the **template repository** (`vintasoftware/vinta-react-deck-template`), not this deck's
repository: work in a checkout of the template (clone it next to this one if there isn't one).
1. Copy the deck to the template's `src/samples/<Name>.stories.tsx` as stories, one per slide in order (`title:
   'Samples/<Name>'`, `name: '01 Cover'`…, each `render: () => <Pattern … />`; see the existing samples), with a
   generic name. (Samples are stories so they show in Storybook and the gallery; decks themselves never are.)
2. Anonymize: client name, logos and client images, people, emails, phones, prices, real numbers, dates and
   internal project names become clearly fictional (Northwind-style). Never PHI. Team photos only as CATALOG.md
   allows. Keep the slide sequence and pattern choices: that is what the sample is for.
3. Copy any images the sample needs that the template doesn't have (anonymized ones only), then `npx tsc -b` and
   check the new slides at `/samples` in the template.
4. Show the user a short list of what was replaced and get an OK.
5. In the template checkout: new branch off `main`, commit only the sample (and its images), push and open a PR
   against `vintasoftware/vinta-react-deck-template`. Hand over the PR link.

## Deck-level tasks

- **Reorder:** rename files (the `NN-` prefix drives order).
- **Change a slide:** edit only that file; keep its pattern unless the user asks for another.
- **Controls:** `←/→` move, `o` overview grid, `f` fullscreen, `p` presenter window (clock, timer, notes,
  previous/next slides; synced with the deck window), number + `Enter` to jump.
