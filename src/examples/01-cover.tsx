import { Slide, Place, Grid, Shape, Logo, Title, Row, MetaRow } from "@/lib";

export const meta = { title: "Example · Cover" };

const MOSAIC = [16, 10, 7, 15, 13, 19, 20, 9, 3, 8, 22, 2, 11, 21, 17, 1];

/** Cover archetype: a shape-mosaic panel + logo, title and meta strip. */
export default function ExampleCover() {
  return (
    <Slide bg="white" pad={false}>
      {/* Right: 4×4 shape mosaic on a soft panel */}
      <Place x={1200} y={0} w={720} h={1080}>
        <div className="h-full w-full bg-vinta-gray-light">
          <Grid cols={4} rows={4} gap={0} className="h-full w-full">
            {MOSAIC.map((n, i) => (
              <Shape key={i} n={n} fit="cover" />
            ))}
          </Grid>
        </div>
      </Place>

      {/* Left: brand, title, meta */}
      <Place x={96} y={96} w={1000} h={888}>
        <div className="flex h-full flex-col justify-between">
          <div>
            <Row gap={6} className="mb-8">
              {[6, 21, 3].map((n) => (
                <div key={n} style={{ width: 60, height: 60 }}>
                  <Shape n={n} />
                </div>
              ))}
            </Row>
            <Logo height={44} />
            <Title className="mt-12">
              vinta-ai-
              {"\n"}
              <span className="text-vinta-blue">workflows</span>
            </Title>
          </div>
          <MetaRow
            className="border-t border-vinta-gray pt-8"
            items={[
              { label: "Topic", value: "The harness" },
              { label: "Audience", value: "Engineers" },
              { label: "Date", value: "2026" },
            ]}
          />
        </div>
      </Place>
    </Slide>
  );
}
