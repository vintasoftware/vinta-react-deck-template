import { Deck, type DeckSlide } from "@/lib";
import { mainSlides } from "./slides/registry";
import { patternSlides } from "./components/registry";
import { sampleSlides } from "./samples/registry";

// Path-based decks:
//   /            → your main slides (src/slides/)
//   /patterns    → every design-system pattern, with examples (src/components/patterns/)
//   /samples     → sample presentations built from the patterns (src/samples/)
// Slide index still lives in the hash (#/N); capture modes in the query (?shot…).
// A self-contained artifact (npm run build-deck) has no meaningful path: it names its deck in
// `window.__DECK_NAME__` instead.
declare global {
  interface Window {
    __DECK_NAME__?: string;
  }
}
const segment = window.__DECK_NAME__ ?? window.location.pathname.split("/").filter(Boolean).pop() ?? "";

const DECKS: Record<string, DeckSlide[]> = {
  patterns: patternSlides,
  samples: sampleSlides,
};
const deck = DECKS[segment] ?? mainSlides;

export function App() {
  return <Deck slides={deck} />;
}
