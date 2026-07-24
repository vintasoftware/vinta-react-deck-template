import { Slide, Place, Grid, Shape, Logo, Title, MetaRow } from "@/lib";

export const meta = { title: "Cover" };

const MOSAIC = [16, 10, 7, 15, 13, 19, 20, 9, 3, 8, 22, 2, 11, 21, 17, 1];

/** Starter cover — edit the title and meta, or replace this file entirely. */
export default function Cover() {
  return (
    <Slide bg="white" pad={false}>
      <Place x={1200} y={0} w={720} h={1080}>
        <div className="h-full w-full bg-vinta-gray-light">
          <Grid cols={4} rows={4} gap={0} className="h-full w-full">
            {MOSAIC.map((n, i) => (
              <Shape key={i} n={n} fit="cover" />
            ))}
          </Grid>
        </div>
      </Place>

      <Place x={96} y={96} w={1000} h={888}>
        <div className="flex h-full flex-col justify-between">
          <div>
            <Logo height={44} />
            <Title className="mt-12">
              Your presentation
              {"\n"}
              <span className="text-vinta-blue">title</span>
            </Title>
          </div>
          <MetaRow
            className="border-t border-vinta-gray pt-8"
            items={[
              { label: "Topic", value: "Edit src/slides/" },
              { label: "Audience", value: "—" },
              { label: "Date", value: "2026" },
            ]}
          />
        </div>
      </Place>
    </Slide>
  );
}
