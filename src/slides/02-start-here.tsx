import { FilePlus2, LayoutTemplate, Presentation } from "lucide-react";
import { SlideStepPath } from "@/components";

export const meta = {
  title: "Start here",
  notes:
    "Three steps to a deck:\n1. Add a slide file under src/slides/.\n2. Pick a pattern from /patterns (CATALOG.md has props and limits).\n3. Present with P for the presenter window, or publish it as an artifact.",
};

/** Onboarding — delete this once you're building. Pattern: SlideStepPath (see src/components/CATALOG.md). */
export default function StartHere() {
  return (
    <SlideStepPath
      eyebrow="THIS DECK LIVES IN SRC/SLIDES/"
      title="Build your deck"
      accent="in three steps"
      steps={[
        {
          icon: FilePlus2,
          label: "STEP 1",
          title: "Add a slide",
          text: "Drop src/slides/NN-name.tsx or .md. It shows up on its own, ordered by filename.",
        },
        {
          icon: LayoutTemplate,
          label: "STEP 2",
          title: "Pick a pattern",
          text: "Browse /patterns and /samples, then import it from @/components and pass your content.",
        },
        {
          icon: Presentation,
          label: "STEP 3",
          title: "Present or share",
          text: "Press P for the presenter window, or publish the deck as a Claude artifact link.",
        },
      ]}
    />
  );
}
