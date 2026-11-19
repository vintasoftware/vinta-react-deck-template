import { storySlides, type StoryModule } from "./story";

/**
 * The pattern gallery (served at `/patterns`): every example of every design-system pattern, one
 * slide per story in `patterns/<Name>/<Name>.stories.tsx`. A reference to pick from — to use a
 * pattern in your deck, import it from `@/components` in a `src/slides/` file (or name it in a
 * markdown slide). See CATALOG.md.
 */
const modules = import.meta.glob<StoryModule>("./patterns/*/*.stories.tsx", { eager: true });

export const patternSlides = storySlides(modules, "pat");
