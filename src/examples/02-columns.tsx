import { Slide, SectionHeader, Columns, NumberedItem, ShapeCluster, InlineCode } from "@/lib";

export const meta = { title: "Example · Four columns" };

/** Content archetype: section header + a 4-column numbered breakdown. */
export default function ExampleColumns() {
  return (
    <Slide bg="white" deco={<ShapeCluster corner="tr" shapes={[10, 8, 6, 9]} cols={2} size={80} />}>
      <SectionHeader
        kicker="Package"
        kickerColor="var(--color-vinta-blue)"
        title="What is vinta-ai-workflows?"
        titleColor="var(--color-vinta-blue)"
        subtitle="A private npm package that bootstraps AI tooling into any repo — then gets out of the way."
      />
      <Columns n={4} gap={56} className="mt-14">
        <NumberedItem num="01" title="Bootstrap">
          One-shot skills scaffold <InlineCode>ai-tools/</InlineCode>, AGENTS.md, sub-agents, per-vendor wiring.
        </NumberedItem>
        <NumberedItem num="02" title="Foundation skills">
          <InlineCode>create-spec</InlineCode> → <InlineCode>plan-feature</InlineCode> → <InlineCode>implement-plan</InlineCode>. Spec to merged code.
        </NumberedItem>
        <NumberedItem num="03" title="Multi-vendor">
          Claude Code, Codex, Cursor, Copilot — same skills, vendor-specific paths.
        </NumberedItem>
        <NumberedItem num="04" title="Sync, no re-bootstrap">
          <InlineCode>vinta-sync-ai-tools</InlineCode> walks releases, asks per change. Opt-outs sticky.
        </NumberedItem>
      </Columns>
    </Slide>
  );
}
