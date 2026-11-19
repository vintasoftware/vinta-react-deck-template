---
name: create-deck
description: >-
  Build or extend a Vinta-branded slide deck using the React + Tailwind template
  in vinta-react-deck-template/. Use whenever the user wants to create a
  presentation, add or design slides, turn notes/outline/content into slides, or
  restyle content to the Vinta brand — the current site look (design-system
  patterns) or the classic Vinta 2023 layouts. Covers layouts, colors, fonts,
  photos, icons and code blocks. Adapts the official template's "Dicas para melhor uso".
---

# Create a Vinta deck

The presentation system lives in **`vinta-react-deck-template/`** (a React app). Decks by URL:

| URL | Deck | Folder | Role |
|---|---|---|---|
| `/` | **Your deck** — author here | `src/slides/` | what you build |
| `/patterns` | Every design-system pattern, with examples | `src/components/patterns/` | **pick from here first** |
| `/samples` | Sample presentations built from the patterns | `src/samples/` | structure to copy |
| `/template` | 50 classic Vinta 2023 layouts | `src/template/` | reference / copy from |

Build a deck by **importing a ready layout and passing your content as props** — never by inventing a new
visual style. Two kits, one deck runtime:

- **Design-system patterns** (`@/components`) — the current Vinta look (vintasoftware.com), ported from
  vinta-slidedeck: ~70 whole-slide patterns (`SlideCover`, `SlideAgenda`, `SlideStepPath`, charts, case
  studies, closings…) built from elements, with two-tone titles and Lucide icons. Catalog with each pattern's
  use, props and item/character limits, plus the design rules: **`src/components/CATALOG.md`**. **Default to
  these for new decks.**
- **Classic layouts** (`@/template`, primitives in `@/lib`) — the 50 official Vinta 2023 slides as
  parametrized components (`Slide01`–`Slide50`); per-slide props in **`src/template/CATALOG.md`**. Use them
  when the user asks for the 2023 look or for a layout only they have (e.g. code windows).

Keep one kit per slide; mixing kits across slides of one deck works but looks inconsistent, so avoid it unless asked.

## Workflow

1. `cd vinta-react-deck-template` — run `npm install` once, then `npm run dev` (→ http://localhost:5173, your deck at `/`).
2. **Pick a layout.** Browse `/patterns` (press `o` for the grid) and skim **`src/components/CATALOG.md`** to
   find the closest pattern — `/samples` shows typical deck sequences. (Classic: `/template` and
   `src/template/CATALOG.md`.)
3. **Add the slide.** Create `src/slides/NN-name.tsx` (two-digit prefix sets the order; auto-discovered, no registry edit). `export default` a component that renders the pattern with your content:

   ```tsx
   import { SlideBigStat } from "@/components";
   export const meta = { title: "Our numbers", notes: "Pause on the 42%." };
   export default function Metrics() {
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

   Pattern props are typed and documented (JSDoc) in `src/components/patterns/<Name>/<Name>.tsx`; the
   `<Name>.stories.tsx` next to it has ready examples to copy. Respect each pattern's item limits.
   (Classic: `import { Slide12 } from "@/template"` — every prop optional, listed in its CATALOG.md.)

   **Or write it in markdown:** `src/slides/NN-name.md` with `template: SlideBigStat` (or a classic
   number, `template: 12`) in its frontmatter; the body (paragraph above `#` = eyebrow, `#` title, a second
   `#` = accent line, paragraphs, lists, `##` sections, images, code fences, tables) fills the layout, and
   `props:` in the frontmatter sets anything else (`tone`, `variant`…). The mappings are in **`MARKDOWN.md`**.
   Prefer `.md` for plain content slides; use `.tsx` when you need icons, logic or bespoke composition.
4. **Only for bespoke slides:** compose design-system elements inside `<SlideShell>` with `SlideHeader` on
   top (CATALOG.md, "Composing a slide without a pattern"). Classic: copy `src/template/NN.tsx` into
   `src/slides/` and edit the copy. Both canvases are a fixed 1920×1080.
5. **Verify.** Screenshot at native size via `http://localhost:5173/?shot=N`, and run `npx tsc -b`. Look for
   text overflowing its box and dead space.

Reach for a pattern (or parametrized layout) first; drop to elements or raw `@/lib` primitives only for
bespoke slides. The slide anatomy, full component catalog, design tokens and
archetype recipes live in **`vinta-react-deck-template/AUTHORING.md`** — read it for anything beyond the brand rules below.

---

## Design-system rules (patterns, `@/components`)

The full list is in `src/components/CATALOG.md` ("Rules that never change"); the ones that matter most:

- **Tokens only.** Colors, sizes, radii and spacing come from `src/components/tokens.css` — no loose hex or
  `px` in new CSS. Something missing? Stop and tell the user instead of approximating.
- **One accent per slide** (brand blue by default); a second color only when it encodes meaning. Change a
  generic pattern's `tone` (`light` · `invert-blue` · `invert-navy`) instead of touching colors.
- **Two-tone titles:** `title` (line 1) + `accent` (line 2). Header at the top, never vertically centered.
- **Icons:** Lucide only (`lucide-react`, `strokeWidth={1.5}`), every icon different and concrete; no icon per bullet.
- **Anti-wall-of-text:** title + up to ~3 blocks, lists ≤ 5 items; check each pattern's character limits.
- **Fonts:** DM Sans and DM Mono, already loaded. **Photos:** `/assets/team/<key>.webp` for team shots (keys and
  usage rules in CATALOG.md); client logos by name from `Logo/clients.ts`.
- **Always fictional data** in examples — never real patient data or any PHI.

## Brand rules for the classic layouts — adapted from the official template's "Dicas para melhor uso deste Template"

**01 · The slides — reuse layouts, don't reinvent.** There is an extensive set of ready layouts
(`/template`, all 50 parametrized as `Slide01`–`Slide50`); import the closest one and pass your content as
props (**`src/template/CATALOG.md`** lists every slide's props and an example) rather than designing
something new. Change only the *content* (text, photos, code), never the visual system.

**02 · Default font — fonts are already wired.** DM Sans (body) and JetBrains Mono (code) load
automatically. Use the typography components (AUTHORING.md § Typography) or `font-sans`/`font-mono`.
Never hardcode another font or paste inline font styles.

**03 · Hexadecimals — use the brand tokens, not raw hex.** The palette is exposed as Tailwind tokens
(`vinta-blue`, `vinta-blue-section`, `vinta-gray`, `vinta-gray-light`, `vinta-ink`, …) — write
`text-vinta-blue`, `bg-vinta-blue`, `border-vinta-gray`, never the raw value. Canonical hex lives in
`src/index.css`; AUTHORING.md § Design tokens lists them. `<Slide bg="white|blue|blue-section|gray|ink">`
sets the background **and** the correct default text color (white on blue, ink on white) for you.

**04 · Our pictures — use the Vinta photo bank.** `public/assets/` holds the Vinta/Contraponto photos.
Place one with `<Photo src="img-….png" />` inside a sized `<Place>` box (cover-cropped by default; pass
`inner` for a pixel-exact window). Add your own photos to `public/assets/` and reference them the same
way. Decoration tiles: `<Shape n={1..24} />` (24 tiles) and `<ShapeCluster corner="tr" shapes={[…]} />`;
the vector wordmark is `<Logo tone="blue|white" />`.

**05 · Make a copy — build your own deck, keep the patterns.** Author only in `src/slides/` (the `/`
deck). Do **not** edit `src/template/` — it is the shared, pixel-faithful reference everyone imports from;
`import` its layouts and pass props, or (for structural changes) copy a slide into `src/slides/` and edit
the copy. Even in custom slides, respect the defined patterns — spacing (~96px slide padding), the type
scale, and the color tokens.

**06 · Codes — use the built-in `<CodeBlock>`.** Code is a real, editable, syntax-highlighted
component (via `prism-react-renderer`) — no external tools or pasted screenshots. Do not render
more than 60 characthers per line. Choose the theme by background, set the `language`, and pass 
the source as `code`; size and position it with `<Place>`:
- **Blue / dark background** → `theme="dark"`
- **White background** → `theme="light"`

Optional props: `fontSize` (px), `dots` (the window's traffic-light dots, on by default).

```tsx
<Place x={780} y={150} w={1044} h={780}>
  <CodeBlock
    language="ts"
    theme="dark"
    code={`const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x);`}
  />
</Place>
```

---

## Deck-level tasks

- **Set the cover/closing:** edit `src/slides/01-cover.tsx` and the closing slide (title, `MetaRow`, contact).
- **Reorder:** rename files (the `NN-` prefix drives order).
- **Present:** `npm run dev`, open `/`, press `f` for fullscreen, `←/→` to move, `o` for the overview grid, `p` for the presenter window (clock, timer, notes, previous/next slides; synced with the deck window).
- **Speaker notes:** add `notes` to a slide's `meta` (`export const meta = { title: "…", notes: "…" }`). Plain text, `\n` for line breaks; shown only in the presenter window, never on the slide.
- **Turn an outline into a deck:** map each section to the closest pattern from `/patterns` (the typical sales sequence is in CATALOG.md; `/samples` has full examples), create one `src/slides/NN-*.md` (or `.tsx`) per slide, then screenshot-check each with `?shot=N`.
- **Export:** `npm run export` (PDF + editable PPTX of `/` into `export/`); `--format pdf|pptx`, `--deck patterns|samples|template`.
