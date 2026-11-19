# Known issues

Carried over from vinta-slidedeck where they still apply, plus what is specific to this repo.

## Design system

- Team photos in `public/assets/team/` are real Vinta employees; the names next to the portraits in stories are
  examples. Never pair a team photo with a client's name (quotes, cases). The optimized source library and the
  cropping script stay in vinta-slidedeck (`assets/team-photos/`, `npm run team-photos`); full-size originals are in
  the Drive folder `team-photos-originals`.
- Carta, PlusPlus, Lastmile, Tesorio and Splendid Spoon only have a white logo in `Logo/clients.ts` (from the case
  library): use them on dark backgrounds.
- The vivid patterns use the DS title size (H1, 60px) instead of the templates' 64px, and the vivid layouts
  (`SlideCover`, `SlideStatement`, `SlideFeatureCards`… and `tone="vivid"`) use the DS type scale, so their text is
  smaller than in the Claude Design templates they came from (titles 76 → 60, card text 26–28 → 30, numbers 104–176
  → 120).
- Some vivid layouts approximate a template detail with the nearest element style: `VividCard` always has the large
  shadow, the navy review card is flat (template: gradient), the glass number chips are lighter than the template's
  navy-tinted ones, and `IconBadge` `ring` has a single blue.
- `SlideCode` / `CodeWindow` were added in this repo (vinta-slidedeck has no code slide). They use only existing
  tokens, but the syntax colors (several accents on one slide) are pending design review. The highlighter has no
  `bash`/shell grammar: those snippets render as plain text.

## Artifacts (`npm run build-deck`)

- Images are embedded as base64, so every 1920×1080 background photo adds to the file (the starter deck is ~2 MB).
  The script warns above 25 MB.
- `build-deck` finds images by rendering each slide for 1.5 s. An animation that loads an image after that ends up
  without it, and the script's offline check reports the missing path.
- The presenter window (`p`) opens a second window of the same page; inside a claude.ai artifact, pop-ups may be
  blocked. Present from `npm run dev` when you need speaker notes.

## Exports (`npm run export`)

- Animated product mocks are captured with reduced motion (a still frame).
- Box shadows are dropped in the PDF (Chromium prints large blurred shadows as gray boxes); the PPTX background keeps them.

## Storybook and the gallery

- Ported without slidedeck's Vitest (`@storybook/addon-vitest`) and Chromatic addons, so stories aren't run as
  tests; the a11y addon reports in the Storybook UI only (`a11y.test: 'todo'`).
- `npm run render-clip` records through Storybook's dev server with virtual time; it restarts a session that hangs
  and keeps going from the last saved frame. Over 20 MB, Google Slides rejects the MP4 (raise `--crf` or lower
  `--seconds`).
- `npm run sync-harness` (regenerates the token reference in `docs/foundations.md` from `tokens.css`) isn't ported:
  update that section by hand when a token changes.
- Storybook's dev server compiles each story on first open, so the first `npm run gallery` takes a few minutes;
  later runs can use `--skip-existing`.

## Repository

- `output/` (artifacts), `export/` (PDF/PPTX), `gallery/` and `storybook-static/` are gitignored.
