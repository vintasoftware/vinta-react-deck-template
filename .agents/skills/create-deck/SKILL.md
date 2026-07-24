---
name: create-deck
description: >-
  Build or extend a Vinta-branded slide deck using the React + Tailwind template
  in vinta-react-deck-template/. Use whenever the user wants to create a
  presentation, add or design slides, turn notes/outline/content into slides, or
  restyle content to the Vinta 2023 brand. Covers layouts, colors, fonts, photos
  and code blocks. Adapts the official template's "Dicas para melhor uso".
---

# Create a Vinta deck

The presentation system lives in **`vinta-react-deck-template/`** (a React + Tailwind app). Three
decks by URL:

| URL | Deck | Folder | Role |
|---|---|---|---|
| `/` | **Your deck** — author here | `src/slides/` | what you build |
| `/template` | 50 official Vinta layouts | `src/template/` | reference / copy from |
| `/examples` | component patterns | `src/examples/` | reference / copy from |

Build a deck by **adapting an existing layout** and filling it with content — never by inventing a new
visual style. Everything imports from the single entrypoint **`@/lib`**.

## Workflow

1. `cd vinta-react-deck-template` — run `npm install` once, then `npm run dev` (→ http://localhost:5173, your deck at `/`).
2. **Pick a layout.** Browse `/template` (all 50) and `/examples` (cover, columns, cards, pipeline, stat, team, code, thanks). Find the closest match to the content.
3. **Add the slide.** Create `src/slides/NN-name.tsx` (two-digit prefix sets the order; auto-discovered, no registry edit). Start by copying the closest `src/template/NN.tsx` or `src/examples/*.tsx`, then replace its content.
4. Keep the `<Slide>` (a fixed 1920×1080 canvas). Prefer flow layout components over absolute `<Place>`.
5. **Verify.** Screenshot at native size via `http://localhost:5173/?shot=N`, and run `npx tsc -b`.

For a runnable starting point, copy the closest real slide from `src/template/` or `src/examples/`
rather than writing one from scratch. The slide anatomy, full component catalog, design tokens and
archetype recipes live in **`vinta-react-deck-template/AUTHORING.md`** (with a minimal-slide walkthrough
in § Add a slide) — read it for anything beyond the brand rules below.

---

## Brand rules — adapted from the official template's "Dicas para melhor uso deste Template"

**01 · The slides — reuse layouts, don't reinvent.** There is an extensive set of ready layouts
(`/template`, `/examples`); prefer adapting one over designing something new. Change only the *content*
(text, photos, code), not the visual system. Compose from the layout and content components — the full
catalog is in AUTHORING.md § Component catalog.

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
deck). Do **not** edit `src/template/` — it is the shared reference deck everyone copies from; copy a
slide into `src/slides/` and edit it there instead. Even in custom slides, respect the defined patterns —
spacing (~96px slide padding), the type scale, and the color tokens.

**06 · Codes — use the built-in `<CodeBlock>`.** Code is a real, editable, syntax-highlighted
component (via `prism-react-renderer`) — no external tools or pasted screenshots. Choose the theme by
background, set the `language`, and pass the source as `code`; size and position it with `<Place>`:
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
- **Present:** `npm run dev`, open `/`, press `f` for fullscreen, `←/→` to move, `o` for the overview grid.
- **Turn an outline into a deck:** map each section to the closest layout from `/template`/`/examples`, create one `src/slides/NN-*.tsx` per slide, then screenshot-check each with `?shot=N`.
