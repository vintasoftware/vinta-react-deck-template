import { Slide04 } from "@/template";

export const meta = {
  title: "Cover",
  notes:
    "Speaker notes live here, in each slide's `meta.notes`.\n\nPress P to open the presenter window: it shows these notes, a clock and timer, and the previous/next slides — and stays in sync with this one.",
};

/** Starter cover — swap in your title and meta, or pick another cover in CATALOG.md (04, 05, 07). */
export default function Cover() {
  return (
    <Slide04
      line1="Your"
      line2="title here"
      meta={[
        { label: "Topic", value: "Edit src/slides/" },
        { label: "Audience", value: "—" },
        { label: "Date", value: "2026" },
      ]}
    />
  );
}
