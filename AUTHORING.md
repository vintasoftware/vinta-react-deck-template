# Authoring Vinta slides

This repo is the **Vinta presentation design system** (`@/components`) plus a **runnable slideshow**
(`@/lib`). Making a slide = picking a pattern and passing it your content, in a `.tsx` or `.md` file. This
guide is written so an AI (or a person) can generate correct, on-brand slides from it alone; the pattern list,
props, limits and design rules are in **[src/components/CATALOG.md](src/components/CATALOG.md)**.

---

## Run it

```bash
npm install
npm run dev            # slideshow at http://localhost:5173
npm run build          # typecheck + production build
```

**Slideshow controls:** `←/→`, `Space` or a click move (a click on the left third goes back) · `Home/End` jump to ends · type a number then
`Enter` to jump · `f` fullscreen · `o` overview grid · `p` presenter window · `#/N` deep-links slide N.

**Presenter mode:** press `p` (or the `⧉` button in the HUD) to open the speaker's console in a small
separate window — keep it on your laptop screen and put the deck window on the projector. It shows the
clock and an elapsed timer (pause/reset), the slide number, the current slide with the previous and next
ones, the slide's **speaker notes** (`meta.notes`), and navigation (previous/next, a "go to" list, the
overview grid, plus all the keyboard shortcuts). The two windows follow each other, whichever one you
navigate in. It is the same deck at `?presenter`, so both windows must be in the same browser.

**Decks (by URL path):**
- `/` → **your slides** (`src/slides/`) — this is where you build your presentation.
- `/patterns` → every pattern, one slide per example (`src/components/patterns/*/*.stories.tsx`).
- `/samples` → complete sample presentations built from the patterns (`src/samples/`, fictional data).

**URL modes (handy for screenshots):** `?solo=N` one slide, chromeless · `?shot=N` one slide at native
1920×1080 from the origin · `?print` every slide stacked. They apply to whichever deck the path selects
(e.g. `/patterns?shot=12`).

**Sharing:** `npm run build-deck -- --shots` turns your deck into one self-contained HTML to publish as a
private Claude artifact (the publish-deck skill walks through the scan and the publish); `npm run export`
writes a PDF and an editable PPTX; `npm run render-clip -- <story-id>` records an animated pattern as a looping
video for use outside the deck (Storybook running, `ffmpeg` installed).

---

## Add a slide

1. Create `src/slides/NN-name.tsx` (or `.md`). Files are auto-discovered and **ordered by filename** — no
   registry edit. Use a two-digit prefix, e.g. `04-results.tsx`.
2. `export default` a component that renders a pattern from `@/components`.
3. Optionally `export const meta = { title, notes }` — `title` shows in the overview and HUD; `notes` are your
   speaker notes (plain text, `\n` for line breaks), shown only in the presenter window (`p`).

```tsx
import { Search, PenTool, Rocket } from "lucide-react";
import { SlideStepPath } from "@/components";

export const meta = { title: "How we work", notes: "One week per phase." };

export default function HowWeWork() {
  return (
    <SlideStepPath
      eyebrow="OUR APPROACH"
      title="Three phases,"
      accent="one team"
      steps={[
        { icon: Search, label: "WEEK 1", title: "Discover", text: "Interviews and a scoped spec." },
        { icon: PenTool, label: "WEEK 2", title: "Design", text: "Flows validated with real users." },
        { icon: Rocket, label: "WEEKS 3–4", title: "Ship", text: "A working MVP in production." },
      ]}
    />
  );
}
```

**No-code path:** write `src/slides/NN-name.md` — frontmatter `template: SlideAgenda` picks the pattern and the
markdown body fills it (paragraph above `#` = eyebrow, `#` title, a second `#` = accent line, paragraphs, lists,
`##` sections, images, code fences, tables). End the file with an `<!-- … -->` comment for speaker notes. See
**[MARKDOWN.md](MARKDOWN.md)**. Prefer `.md` for plain content; use `.tsx` for icons, logic or bespoke slides.

---

## Picking and filling a pattern

- **Pick** in the template gallery (`npm run gallery`), Storybook (`npm run storybook`) or at `/patterns` (press
  `o`); `CATALOG.md` lists every pattern with its use, main props and limits, grouped by family, plus the typical
  sales-deck sequence. `/samples` (or *Samples* in Storybook) shows whole decks.
- **Fill** from the examples in `patterns/<Name>/<Name>.stories.tsx` — every story's `args` is a working set of
  props. Prop types and JSDoc are in `patterns/<Name>/<Name>.tsx` (Storybook's *Docs* tab shows them).
- **Two-tone titles:** `title` (line 1, ink) + `accent` (line 2, blue; turquoise on dark). Headers sit at the top.
- **Generic patterns take `tone`** (`light` · `invert-blue` · `invert-navy`) to switch background; change the
  tone instead of touching colors. Others have `variant` / `background`.
- **Respect the limits** (items per slide, characters per line): if content overflows, cut the content, not the
  font size. If no pattern fits, say so instead of inventing a style.
- **Photos:** `/assets/team/<key>.webp` for team photos (keys and rules in CATALOG.md — never next to a client's
  name); client images in `public/assets/clients/<client>/`; client logos by name from `Logo/clients.ts`.
- **Always fictional data** in examples and placeholders — never PHI.

### Code slides

`SlideCode` shows a highlighted snippet in a navy code window; `layout="split"` (header left) or `"stacked"`
(header on top), `density="compact"` for longer snippets, `filename` for the window label.

```tsx
<SlideCode
  eyebrow="THE API"
  title="One call"
  accent="starts an intake"
  language="ts"
  filename="src/visits/startIntake.ts"
  code={`export async function startIntake(visitId: string) {
  return createIntake({ visitId, sections: ['about-you'] })
}`}
/>
```

In markdown, a fenced block on a `template: SlideCode` slide is the code (its language tag sets `language`).

### Bespoke slides

When no pattern fits and the user agrees to a new composition, build it from elements inside
`<SlideShell mode safeArea background={<VividBackground variant="wash" />}>` with `SlideHeader` on top
(padding `112px 144px 120px`), tokens only. `SlideShell` is what scopes the design-system styles (`.vds`), so
every slide needs it. A slide that would be reused belongs in `src/components/patterns/` as a new pattern, with
a story and an entry in `scripts/gallery-catalog.mjs` — see CATALOG.md, "Creating a new element or pattern".

---

## How it fits together

- `src/lib/` (`@/lib`) — the runtime: `Deck` (navigation, overview, HUD, capture modes), the presenter window and
  its sync, the markdown parser. Slides are plain components rendered on a 1920×1080 stage.
- `src/components/` (`@/components`) — patterns, elements and their Storybook stories, tokens (`tokens.css`), the
  markdown → pattern mappers (`markdown.tsx`, `markdownSlide.tsx`) and the stories → slides adapter behind
  `/patterns` and `/samples` (`story.tsx`). `src/foundations/` and `src/stories/` are Storybook's foundations pages.
- `.storybook/` — Storybook config (tokens on the whole page, no Tailwind); `scripts/gallery*.mjs` — the gallery.
- `src/slides/` — your deck; `src/samples/` — sample decks; `src/artifact/` — what `build-deck` adds to the artifact.
- Tailwind styles only the deck chrome; slides use CSS Modules and the tokens (see `src/index.css`).
