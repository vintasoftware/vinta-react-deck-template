import type { ComponentType } from "react";
import type { DeckSlide, SlideMeta } from "@/lib";

/**
 * A second, small deck of *semantic* example slides authored purely from the
 * high-level components — the reference an AI (or you) mimics when creating new
 * slides. View it at `?examples`. Same drop-a-file convention as the template.
 */
const modules = import.meta.glob<{ default: ComponentType; meta?: SlideMeta }>(
  "./[0-9]*.tsx",
  { eager: true },
);

export const exampleSlides: DeckSlide[] = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, mod]) => ({
    id: "ex-" + path.replace(/^\.\//, "").replace(/\.tsx$/, ""),
    Component: mod.default,
    ...(mod.meta ?? {}),
  }));
