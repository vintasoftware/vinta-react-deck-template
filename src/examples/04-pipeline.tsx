import { Slide, SectionHeader, Pipeline, Step, ShapeCluster } from "@/lib";

export const meta = { title: "Example · Pipeline" };

/** Process archetype: section header + a three-step pipeline of artifacts. */
export default function ExamplePipeline() {
  return (
    <Slide bg="white" deco={<ShapeCluster corner="tr" shapes={[6, 4, 12]} size={70} gap={8} />}>
      <SectionHeader
        title="Mental model"
        subtitle="Three foundation skills move a feature from raw prompt to merged code. Each leaves a durable artifact for the next."
      />
      <Pipeline className="mt-16">
        <Step name="create-spec" artifact="YYYY-MM-DD-FEATURE_SPEC.md">
          What + why. Interview-driven.
        </Step>
        <Step name="plan-feature" artifact="YYYY-MM-DD-FEATURE_PLAN.md">
          How + when. Phased delivery.
        </Step>
        <Step name="implement-plan" artifact="plan/<feature>/phase-1, 2, 3…">
          Stacked branches. One PR per phase.
        </Step>
      </Pipeline>
    </Slide>
  );
}
