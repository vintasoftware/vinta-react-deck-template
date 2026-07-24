import { Slide, SectionHeader, Columns, NumberedItem, ShapeCluster, InlineCode } from "@/lib";

export const meta = { title: "Start here" };

/** Onboarding — delete this once you're building. */
export default function StartHere() {
  return (
    <Slide bg="white" deco={<ShapeCluster corner="tr" shapes={[10, 8, 6, 9]} cols={2} size={80} />}>
      <SectionHeader
        kicker="This is your deck"
        kickerColor="var(--color-vinta-blue)"
        title="Build with the template"
        titleColor="var(--color-vinta-blue)"
        subtitle="This deck lives at / (src/slides/). Compose slides from the component library — an AI can generate them from AUTHORING.md."
      />
      <Columns n={4} gap={56} className="mt-14">
        <NumberedItem num="01" title="Add a slide">
          Drop <InlineCode>src/slides/NN-name.tsx</InlineCode>. It auto-appears, ordered by filename.
        </NumberedItem>
        <NumberedItem num="02" title="Browse the template">
          Open <InlineCode>/template</InlineCode> for all 50 official layouts to copy from.
        </NumberedItem>
        <NumberedItem num="03" title="Copy patterns">
          <InlineCode>/examples</InlineCode> shows cover, columns, cards, pipeline, code and thanks.
        </NumberedItem>
        <NumberedItem num="04" title="Read the guide">
          <InlineCode>AUTHORING.md</InlineCode> — component catalog, tokens and recipes.
        </NumberedItem>
      </Columns>
    </Slide>
  );
}
