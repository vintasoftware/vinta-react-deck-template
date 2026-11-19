import { Deck, type DeckSlide } from "@/lib";
import { mainSlides } from "./slides/registry";
import { templateSlides } from "./template/registry";
import { patternSlides } from "./components/registry";
import { sampleSlides } from "./samples/registry";

// Path-based decks:
//   /            → your main slides (src/slides/)
//   /patterns    → every design-system pattern, with examples (src/components/patterns/)
//   /samples     → sample presentations built from the patterns (src/samples/)
//   /template    → the 50-slide classic Vinta 2023 template reference (src/template/)
// Slide index still lives in the hash (#/N); capture modes in the query (?shot…).
const segment = window.location.pathname.split("/").filter(Boolean).pop() ?? "";

const DECKS: Record<string, DeckSlide[]> = {
  template: templateSlides,
  patterns: patternSlides,
  samples: sampleSlides,
};
const deck = DECKS[segment] ?? mainSlides;

export function App() {
  return <Deck slides={deck} />;
}
