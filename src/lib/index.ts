// The slideshow runtime — what turns a list of slides into a presentation:
//   import { Deck, type DeckSlide } from "@/lib";
// Slides themselves are built from the design-system patterns in @/components.

// Deck runtime: navigation, overview, presenter window, capture modes
export * from "./deck";

// Markdown slide parsing (used by the markdown-slide loader in @/components/markdown)
export * from "./markdown/parse";
