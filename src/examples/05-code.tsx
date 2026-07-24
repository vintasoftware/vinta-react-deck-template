import { Slide, Place, Heading, Body, CodeBlock, ShapeCluster } from "@/lib";

export const meta = { title: "Example · Code" };

const SAMPLE = `// implement-plan drives each phase to completion
async function runPhase(phase, ctx) {
  const prompt = compose(AGENTS_MD, ctx.goals, phase.body);
  const model = pickModel(phase.suggestion, ctx.runtime);
  const agent = spawn(phase.agentType ?? "implementer");

  const result = await agent.run(prompt);  // inner + outer gates
  await review(result, { layers: 3 });     // 3 review layers
  return commit(result);                   // never on red
}`;

/** Code archetype: a heading/lead on the left, a syntax-highlighted window on the right. */
export default function ExampleCode() {
  return (
    <Slide bg="white" deco={<ShapeCluster corner="tl" shapes={[13, 7]} size={70} gap={8} />}>
      <Place x={96} y={300} w={620}>
        <Heading>The per-phase loop</Heading>
        <Body size={20} className="mt-5 text-vinta-muted">
          The orchestrator never edits files — it composes a token-efficient prompt, picks a model,
          spawns an agent, and gates the result through three review layers.
        </Body>
      </Place>
      <Place x={780} y={150} w={1044} h={780}>
        <CodeBlock language="js" code={SAMPLE} fontSize={24} />
      </Place>
    </Slide>
  );
}
