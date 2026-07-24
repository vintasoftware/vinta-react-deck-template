import { Slide, Columns, Kicker, Heading, Body, CardBlue, Subheading, InlineCode, Watermark } from "@/lib";

export const meta = { title: "Example · Blue two-column" };

/** Blue step slide: kicker + heading + body on the left, a detail card on the right. */
export default function ExampleBlueCards() {
  return (
    <Slide
      bg="blue"
      deco={<Watermark items={[{ n: 10, x: 1720, y: -20 }, { n: 22, x: 1560, y: 60, size: 150 }, { n: 19, x: -20, y: 900 }]} />}
    >
      <Columns n={2} gap={80} align="center" className="h-full">
        <div>
          <Kicker className="mb-3 text-white/80">Step 1</Kicker>
          <Heading color="#fff">create-spec</Heading>
          <Body size={20} className="mt-5 text-white/90">
            Interview before drafting. Never turn a vague prompt into a plausible-sounding spec by guessing.
          </Body>
          <Body size={20} className="mt-4 text-white/90">
            Output: <InlineCode onBlue>ai-plans/YYYY-MM-DD-FEATURE_SPEC.md</InlineCode>
          </Body>
        </div>
        <CardBlue>
          <Subheading color="#fff" className="mb-3">Fixed sections</Subheading>
          <ul className="list-disc space-y-1.5 pl-5 text-[17px] text-white/95">
            <li>Business Context, Hypothesis</li>
            <li>Objectives, Use-cases</li>
            <li>State transitions</li>
            <li>Acceptance scenarios</li>
            <li>Negative scope</li>
            <li>Alternatives considered</li>
            <li>Open questions, Risks</li>
          </ul>
        </CardBlue>
      </Columns>
    </Slide>
  );
}
