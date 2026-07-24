import { Slide, Place, Grid, Shape, Logo, BigTitle, Body } from "@/lib";

export const meta = { title: "Thank you" };

const FADED = [16, 10, 7, 15, 13, 19, 20, 9, 3];

/** Starter closing slide. */
export default function Thanks() {
  return (
    <Slide bg="blue" pad={false}>
      <Place x={1360} y={0} w={560} h={1080}>
        <Grid cols={3} rows={3} gap={0} className="h-full w-full opacity-25">
          {FADED.map((n, i) => (
            <Shape key={i} n={n} tone="white" fit="cover" />
          ))}
        </Grid>
      </Place>

      <Place x={96} y={96} w={1100} h={888}>
        <div className="flex h-full flex-col justify-between">
          <Logo tone="white" height={44} />
          <BigTitle color="#fff">Thank you!</BigTitle>
          <Body size={20} className="text-white/90">
            contact@vintasoftware.com
          </Body>
        </div>
      </Place>
    </Slide>
  );
}
