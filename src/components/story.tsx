import type { ComponentType, ReactNode } from "react";
import type { DeckSlide } from "@/lib/deck";

// The pattern examples (`patterns/*/*.stories.tsx`) and the sample decks (`src/samples/`) are Storybook stories
// (Component Story Format; `npm run storybook`). `storySlides()` also turns each story into a deck slide, so
// `/patterns` and `/samples` show them in the normal deck runtime (overview, presenter window, export…).

/** The parts of a story's default export the deck needs. */
interface StoryMeta {
  /** "Patterns/SlideCover", "Samples/Northwind Pilot"… The last segment names the slides. */
  title: string;
  component?: ComponentType<Record<string, unknown>>;
  args?: Record<string, unknown>;
  parameters?: { notes?: string };
}

/** The parts of one story (a named export) the deck needs. */
interface Story {
  name?: string;
  args?: Record<string, unknown>;
  render?: (...args: never[]) => ReactNode;
  /** `parameters.notes` become the slide's speaker notes in the presenter window. */
  parameters?: { notes?: string };
}

/** Shape of a story module as loaded by `import.meta.glob`. */
export interface StoryModule {
  default: StoryMeta;
  /** Story export names in source order; added to every `*.stories.tsx` by a plugin in vite.config.ts. */
  __namedExportsOrder?: string[];
  [exportName: string]: unknown;
}

const startCase = (s: string) => s.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/_/g, " ");

/**
 * Turns story modules into deck slides: one slide per story, files in path order, stories in
 * source order. Slide titles read "<file title> · <story name>".
 */
export function storySlides(modules: Record<string, StoryModule>, idPrefix: string): DeckSlide[] {
  return Object.entries(modules)
    .sort(([a], [b]) => a.localeCompare(b))
    .flatMap(([, mod]) => {
      const meta = mod.default;
      const group = meta.title.split("/").pop() ?? meta.title;
      const names = mod.__namedExportsOrder ?? Object.keys(mod).filter((k) => k !== "default");
      return names
        .filter((name) => isStory(mod[name]))
        .map((name): DeckSlide => {
          const story = mod[name] as Story;
          const Comp = meta.component;
          const args = { ...meta.args, ...story.args };
          const render = story.render as (() => ReactNode) | undefined;
          const Component = () => <>{render ? render() : Comp ? <Comp {...args} /> : null}</>;
          Component.displayName = `${group}.${name}`;
          return {
            id: `${idPrefix}-${group.replace(/\W+/g, "-")}-${name}`,
            Component,
            title: `${group} · ${story.name ?? startCase(name)}`,
            notes: story.parameters?.notes ?? meta.parameters?.notes,
          };
        });
    });
}

function isStory(value: unknown): value is Story {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
