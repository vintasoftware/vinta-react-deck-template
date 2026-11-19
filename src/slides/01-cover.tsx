import { SlideCover } from "@/components";

export const meta = {
  title: "Cover",
  notes:
    "Speaker notes live here, in each slide's `meta.notes`.\n\nPress P to open the presenter window: it shows these notes, a clock and timer, and the previous/next slides — and stays in sync with this one.",
};

/** Starter cover — swap in your title. Other covers: `variant="split"` (photo) or `"night"`; see CATALOG.md. */
export default function Cover() {
  return (
    <SlideCover
      variant="night"
      eyebrow="EDIT SRC/SLIDES/"
      title="Your title"
      accent="goes here"
      lede="One line on what this deck is for"
      preparedFor="PREPARED FOR YOUR AUDIENCE  ·  2026"
    />
  );
}
