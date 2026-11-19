import { Slide19 } from "@/template";

export const meta = {
  title: "Start here",
  notes:
    "Three steps to a deck:\n1. Add a slide file under src/slides/.\n2. Pick a pattern from /patterns (or a classic layout from /template).\n3. Check the CATALOG.md files and AUTHORING.md for props and tokens.",
};

/** Onboarding — delete this once you're building. Layout: template Slide19 (see CATALOG.md). */
export default function StartHere() {
  return (
    <Slide19
      title="Build your deck"
      subtitle="This deck lives at / (src/slides/)."
      body="Import a ready layout and pass your content as props, or compose from the @/lib primitives for a bespoke slide."
      items={[
        {
          number: "01",
          title: "Add a slide",
          text: "Drop src/slides/NN-name.tsx or .md.\nIt auto-appears, ordered by filename.",
        },
        {
          number: "02",
          title: "Pick a layout",
          text: 'Browse /patterns (the site look) or\n/template (the classic 50) and import it.',
        },
        {
          number: "03",
          title: "Read the guide",
          text: "Props live in the two CATALOG.md files;\nAUTHORING.md covers tokens and recipes.",
        },
      ]}
    />
  );
}
