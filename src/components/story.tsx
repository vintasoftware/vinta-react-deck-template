import type { ComponentProps, JSXElementConstructor, ReactNode } from "react";
import type { DeckSlide } from "@/lib/deck";

// The pattern examples (`patterns/*/*.stories.tsx`) and the sample decks (`src/samples/`) keep the
// Component Story Format they were written in for the vinta-slidedeck Storybook. There is no
// Storybook here: these minimal types stand in for `@storybook/react-vite`, and `storySlides()`
// turns each story into a deck slide, so `/patterns` and `/samples` browse them with the normal
// deck runtime (overview, presenter window, export…).

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyComponent = JSXElementConstructor<any>;

/** The default export of a story file. */
export interface Meta<C extends AnyComponent = AnyComponent> {
  /** "Patterns/SlideCover", "Samples/Northwind Pilot"… The last segment names the slides. */
  title: string;
  /** Rendered with each story's `args` when the story has no `render`. */
  component?: C;
  args?: Partial<ComponentProps<C>>;
  tags?: string[];
  parameters?: StoryParameters;
  /** Storybook controls config. Kept for reference; unused here. */
  argTypes?: Record<string, unknown>;
}

export interface StoryParameters {
  /** Speaker notes for the presenter window (`p`). */
  notes?: string;
  [key: string]: unknown;
}

type RequiredKeys<T> = { [K in keyof T]-?: object extends Pick<T, K> ? never : K }[keyof T];
/** The story's args: the component's props, with the required ones the meta's `args` doesn't cover still required. */
type StoryArgs<M, P> = [Exclude<RequiredKeys<P>, M extends { args: infer A } ? keyof A : never>] extends [infer Missing extends keyof P]
  ? [Missing] extends [never]
    ? { args?: Partial<P> }
    : { args: Partial<P> & Pick<P, Missing> }
  : never;

interface StoryBase {
  /** Label in the overview / HUD. Defaults to the export name ("TwoColumns" → "Two Columns"). */
  name?: string;
  render?: () => ReactNode;
  parameters?: StoryParameters;
}

/**
 * One named export of a story file = one slide. As in Storybook, `args` is required when the
 * component has required props the meta's `args` doesn't cover.
 */
export type StoryObj<M = Meta> = StoryBase &
  (M extends { component: infer C extends AnyComponent } ? StoryArgs<M, ComponentProps<C>> : { args?: Record<string, unknown> });

/** Shape of a story module as loaded by `import.meta.glob`. */
export interface StoryModule {
  default: Meta;
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
          const story = mod[name] as StoryBase & { args?: Record<string, unknown> };
          const Comp = meta.component;
          const args = { ...meta.args, ...story.args };
          const Component = () => <>{story.render ? story.render() : Comp ? <Comp {...args} /> : null}</>;
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

function isStory(value: unknown): value is StoryBase {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
