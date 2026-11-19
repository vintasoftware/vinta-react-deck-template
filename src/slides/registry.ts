import type { ComponentType } from "react";
import type { DeckSlide, SlideMeta } from "@/lib/deck";
import { markdownSlide } from "@/template/markdown";

/**
 * Your main deck (served at `/`). Author it here, one file per slide:
 *   - `NN-name.tsx` — `export default` a component (and optionally
 *     `export const meta = { title }`). See AUTHORING.md.
 *   - `NN-name.md`  — markdown that fills one of the 50 template layouts
 *     (`template: NN` in its frontmatter). See MARKDOWN.md.
 * Both kinds are auto-discovered and ordered together by filename — no
 * registry edit needed. Browse `/template` for all 50 layouts.
 */
const modules = import.meta.glob<{ default: ComponentType; meta?: SlideMeta }>(
  "./[0-9]*.tsx",
  { eager: true },
);

const markdown = import.meta.glob<string>("./[0-9]*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const idOf = (path: string) => path.replace(/^\.\//, "").replace(/\.(tsx|md)$/, "");

export const mainSlides: DeckSlide[] = [
  ...Object.entries(modules).map(([path, mod]): [string, DeckSlide] => [
    path,
    { id: idOf(path), Component: mod.default, ...(mod.meta ?? {}) },
  ]),
  ...Object.entries(markdown).map(([path, source]): [string, DeckSlide] => [
    path,
    markdownSlide(idOf(path), source),
  ]),
]
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, slide]) => slide);
