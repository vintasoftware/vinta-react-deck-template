import { storySlides, type StoryModule } from "@/components/story";

/**
 * Sample presentations (served at `/samples`): complete decks built only from the design-system
 * patterns, with fictional data. Copy their structure when starting a deck in `src/slides/`.
 */
const modules = import.meta.glob<StoryModule>("./*.stories.tsx", { eager: true });

export const sampleSlides = storySlides(modules, "sample");
